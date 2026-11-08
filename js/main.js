/* Monta os filtros e os cards de projetos (dados em js/projects.js),
   controla o carrossel do celular e a janela do relatório.
   Não precisa mexer aqui: para mudar projetos, edite js/projects.js. */

const grid = document.getElementById("projects-grid");
const filtersBox = document.getElementById("project-filters");
const nav = document.querySelector(".carousel-nav");
const prevBtn = document.getElementById("car-prev");
const nextBtn = document.getElementById("car-next");
const dotsBox = document.getElementById("car-dots");
const modal = document.getElementById("report-modal");
const frame = document.getElementById("report-frame");
const modalTitle = document.getElementById("report-title");
const modalLink = document.getElementById("report-link");

const mobile = window.matchMedia("(max-width: 720px)");
const ALL = "Todos";
let currentArea = ALL;

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

/* ---------- Cards ---------- */
function buildThumb(p) {
  if (p.thumb) {
    const wrap = el("div", "project__thumb project__thumb--img");
    const img = document.createElement("img");
    img.src = p.thumb;
    img.alt = "Prévia do relatório " + p.title;
    img.loading = "lazy";
    wrap.appendChild(img);
    return wrap;
  }
  const wrap = el("div", "project__thumb");
  wrap.setAttribute("aria-hidden", "true");
  const skeleton = el("div", "project__skeleton");
  for (let i = 0; i < 3; i++) skeleton.appendChild(document.createElement("i"));
  const bars = el("div", "bars");
  (p.bars || []).forEach((h) => {
    const bar = document.createElement("i");
    bar.style.height = h + "%";
    bars.appendChild(bar);
  });
  wrap.append(skeleton, bars);
  return wrap;
}

function buildCard(p) {
  const card = el("article", "project");
  card.appendChild(buildThumb(p));

  const body = el("div");
  body.append(el("span", "project__tag", p.tag), el("h3", null, p.title), el("p", null, p.question));
  card.appendChild(body);

  const btn = el("button", "project__btn");
  btn.type = "button";
  if (p.embed) {
    btn.textContent = "Abrir relatório interativo";
    btn.addEventListener("click", () => openReport(p));
  } else {
    btn.textContent = "Em breve";
    btn.disabled = true;
  }
  card.appendChild(btn);
  return card;
}

function renderProjects() {
  const list = currentArea === ALL ? projects : projects.filter((p) => p.area === currentArea);
  grid.replaceChildren(...list.map(buildCard));
  grid.scrollLeft = 0;
  buildDots(list.length);
  updateCarousel();
}

/* ---------- Filtros por área ---------- */
function renderFilters() {
  const areas = [...new Set(projects.map((p) => p.area).filter(Boolean))];
  if (areas.length < 2) { filtersBox.hidden = true; return; } // sem filtros se só houver uma área

  [ALL, ...areas].forEach((area) => {
    const total = area === ALL ? projects.length : projects.filter((p) => p.area === area).length;
    const b = el("button", "filter", area);
    b.type = "button";
    b.setAttribute("aria-pressed", String(area === currentArea));
    b.appendChild(el("span", "filter__count", "(" + total + ")"));
    b.addEventListener("click", () => {
      currentArea = area;
      filtersBox.querySelectorAll(".filter").forEach((f) => f.setAttribute("aria-pressed", String(f === b)));
      renderProjects();
    });
    filtersBox.appendChild(b);
  });
}

/* ---------- Carrossel (só age no celular) ---------- */
function cardStep() {
  const card = grid.querySelector(".project");
  if (!card) return 0;
  const gap = parseFloat(getComputedStyle(grid).columnGap) || 0;
  return card.getBoundingClientRect().width + gap;
}

function currentIndex() {
  const step = cardStep();
  return step ? Math.round(grid.scrollLeft / step) : 0;
}

function goTo(i) {
  const total = grid.children.length;
  const index = Math.max(0, Math.min(i, total - 1));
  grid.scrollTo({ left: index * cardStep() });
}

function buildDots(total) {
  dotsBox.replaceChildren();
  for (let i = 0; i < total; i++) {
    const d = el("button", "carousel-nav__dot");
    d.type = "button";
    d.setAttribute("aria-label", "Ir para o projeto " + (i + 1) + " de " + total);
    d.addEventListener("click", () => goTo(i));
    dotsBox.appendChild(d);
  }
  nav.hidden = total < 2; // um card só não precisa de setas
}

function updateCarousel() {
  const total = grid.children.length;
  const atEnd = grid.scrollLeft + grid.clientWidth >= grid.scrollWidth - 2;
  const i = atEnd ? total - 1 : currentIndex();
  dotsBox.querySelectorAll(".carousel-nav__dot").forEach((d, n) => {
    if (n === i) d.setAttribute("aria-current", "true");
    else d.removeAttribute("aria-current");
  });
  prevBtn.disabled = grid.scrollLeft <= 2;
  nextBtn.disabled = atEnd;
}

let ticking = false;
grid.addEventListener("scroll", () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => { updateCarousel(); ticking = false; });
}, { passive: true });

prevBtn.addEventListener("click", () => goTo(currentIndex() - 1));
nextBtn.addEventListener("click", () => goTo(currentIndex() + 1));

// Setas do teclado quando a lista está em foco (celular/tablet com teclado)
grid.addEventListener("keydown", (e) => {
  if (!mobile.matches) return;
  if (e.key === "ArrowRight") { e.preventDefault(); goTo(currentIndex() + 1); }
  if (e.key === "ArrowLeft") { e.preventDefault(); goTo(currentIndex() - 1); }
});

// Ao virar o celular ou redimensionar, volta ao início para não ficar "no meio" de um card
mobile.addEventListener("change", () => { grid.scrollLeft = 0; updateCarousel(); });

/* ---------- Janela do relatório ---------- */
function openReport(p) {
  modalTitle.textContent = p.title;
  modalLink.href = p.embed;
  frame.title = "Relatório Power BI: " + p.title;
  frame.src = p.embed;
  modal.showModal();
}

function closeReport() { modal.close(); }

modal.addEventListener("close", () => { frame.src = "about:blank"; });
document.getElementById("report-close").addEventListener("click", closeReport);
modal.addEventListener("click", (e) => { if (e.target === modal) closeReport(); }); // clique fora fecha

/* ---------- Formulário de contato (FormSubmit) ----------
   Depois de ativar o FormSubmit (veja o README), troque o e-mail abaixo
   pelo código que eles enviam, para o endereço não ficar no código do site:
   "https://formsubmit.co/ajax/SEU_CODIGO" */
const FORM_ENDPOINT = "https://formsubmit.co/ajax/28ef18c73c192b7474b59398b0db882c";

const form = document.getElementById("contact-form");
const formError = document.getElementById("form-error");
const formSubmit = document.getElementById("form-submit");
const formSuccess = document.getElementById("form-success");
const formSuccessText = document.getElementById("form-success-text");

function showFormError(msg) {
  formError.textContent = msg;
  formError.hidden = false;
}

function validateForm() {
  let firstInvalid = null;
  form.querySelectorAll("[required]").forEach((input) => {
    const ok = input.value.trim() !== "" && input.checkValidity();
    input.closest(".field").classList.toggle("field--invalid", !ok);
    if (!ok && !firstInvalid) firstInvalid = input;
  });
  if (firstInvalid) {
    const email = form.querySelector("#email");
    showFormError(firstInvalid === email && email.value.trim()
      ? "Confira o e-mail: ele parece incompleto."
      : "Preencha nome, e-mail e mensagem para enviar.");
    firstInvalid.focus();
    return false;
  }
  return true;
}

form.querySelectorAll("input, textarea").forEach((input) => {
  input.addEventListener("input", () => {
    input.closest(".field")?.classList.remove("field--invalid");
    formError.hidden = true;
  });
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  formError.hidden = true;
  if (!validateForm()) return;

  const data = Object.fromEntries(new FormData(form));
  if (data._honey) return; // robô preencheu o campo escondido

  formSubmit.disabled = true;
  formSubmit.textContent = "Enviando…";
  try {
    const res = await fetch(FORM_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(data)
    });
    const result = await res.json().catch(() => ({}));
    if (!res.ok || String(result.success) !== "true") throw new Error(result.message || "Falha no envio");

    const firstName = data.nome.trim().split(/\s+/)[0];
    formSuccessText.textContent = "Obrigado, " + firstName + "! Vou analisar o que você me contou e respondo em até 1 dia útil no e-mail informado.";
    form.hidden = true;
    formSuccess.hidden = false;
    formSuccess.focus();
    form.reset();
  } catch (err) {
    showFormError("Não foi possível enviar agora. Tente de novo em alguns minutos ou fale comigo pelo WhatsApp.");
  } finally {
    formSubmit.disabled = false;
    formSubmit.textContent = "Enviar mensagem";
  }
});

document.getElementById("form-again").addEventListener("click", () => {
  formSuccess.hidden = true;
  form.hidden = false;
  form.querySelector("#nome").focus();
});

/* ---------- Painel do topo: abre o relatório de logística ---------- */
const showcase = document.getElementById("showcase-open");
const showcaseProject = projects.find((p) => p.title === "Análise Logística");
if (showcase && showcaseProject && showcaseProject.embed) {
  showcase.addEventListener("click", () => openReport(showcaseProject));
}

/* ---------- Início ---------- */
renderFilters();
renderProjects();
