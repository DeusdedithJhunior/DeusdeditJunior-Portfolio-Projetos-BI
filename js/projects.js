/* ==========================================================
   DADOS DOS PROJETOS — é aqui que você mexe para os dashboards

   Para cada projeto:
   - embed: link do Power BI "Publicar na Web".
       Power BI Service > Arquivo > Incorporar relatório > Publicar na Web (público).
       Cole o link que começa com https://app.powerbi.com/view?r=...
       Deixe "" para desativar o botão (aparece "Em breve").
   - thumb: caminho de uma imagem de capa, ex.: "assets/images/logistica.png".
       Deixe "" para usar o mini-gráfico de barras padrão.
   - bars: alturas (%) das barras do mini-gráfico (só se thumb estiver vazio).
   - area: grupo usado nos botões de filtro (ex.: "Finanças", "Operações").
       Projetos com a mesma area ficam no mesmo botão. Os botões são criados sozinhos.

   Para adicionar um projeto: copie um bloco { ... }, e cole no fim da lista.
   Para tirar: apague o bloco. A ordem aqui é a ordem no site.
   ========================================================== */

const projects = [
  {
    tag: "Logística",
    area: "Operações",
    title: "Análise Logística",
    question: "Quais rotas e entregas trazem resultado? Custo da frota, entregas no prazo e fora do prazo, e lucro por rota.",
    embed: "https://app.powerbi.com/view?r=eyJrIjoiNGQ4ZmIxZTAtODc5MC00MzUyLTg5NDAtNmRjODhiYjk5MTI3IiwidCI6Ijc3ZjkxZjk3LWVlYWMtNGVjMC1iZmY1LWEzMzgyMmIwYTAyOSJ9",
    thumb: "assets/images/relatorios/logistica.webp",
    bars: [45, 70, 55, 90, 65, 80, 50]
  },
  {
    tag: "Logística",
    area: "Operações",
    title: "Gestão de Frota e Entregas",
    question: "O frete está crescendo, entregando no prazo e dando lucro por rota e por veículo?",
    embed: "https://app.powerbi.com/view?r=eyJrIjoiMmYzNzljYzUtM2U5Zi00OWVjLTk0NTctZjQ2ZTA0YjE4M2EwIiwidCI6Ijc3ZjkxZjk3LWVlYWMtNGVjMC1iZmY1LWEzMzgyMmIwYTAyOSJ9",
    thumb: "assets/images/relatorios/gestao-frota-entregas.webp",
    bars: [60, 50, 75, 65, 85, 70, 90]
  },
  {
    tag: "Financeiro",
    area: "Finanças",
    title: "DRE Gerencial e Simulador",
    question: "A empresa dá lucro? Receitas contra custos e despesas, com simulação de cenários.",
    embed: "https://app.powerbi.com/view?r=eyJrIjoiYzQ3NTUwOWMtODUxOC00NTQwLWI3NDUtMWIxNjFmNjYwODYwIiwidCI6Ijc3ZjkxZjk3LWVlYWMtNGVjMC1iZmY1LWEzMzgyMmIwYTAyOSJ9",
    thumb: "assets/images/relatorios/dre.webp",
    bars: [85, 40, 75, 35, 60, 30, 70]
  },
  {
    tag: "Comercial",
    area: "Vendas e clientes",
    title: "Dashboard Comercial",
    question: "Como estão as vendas frente às metas? Cobertura de clientes e desempenho por gerente, supervisor e vendedor.",
    embed: "https://app.powerbi.com/view?r=eyJrIjoiNDkxNDFjZWUtNWFlNy00MmY0LWJhMGQtMmRhMWVhNTMxOTRjIiwidCI6Ijc3ZjkxZjk3LWVlYWMtNGVjMC1iZmY1LWEzMzgyMmIwYTAyOSJ9",
    thumb: "assets/images/relatorios/comercial.webp",
    bars: [30, 50, 65, 55, 80, 70, 95]
  },
  {
    tag: "Vendas",
    area: "Vendas e clientes",
    title: "Análise de Vendas: Desempenho da Equipe",
    question: "Quem vende mais e o que puxa o faturamento? Evolução mensal, margem, positivação de clientes e ranking da equipe de vendas.",
    embed: "https://app.powerbi.com/view?r=eyJrIjoiNTkxY2QxYmQtYjU0Mi00OWI5LTg0OGEtOWUzYzUzNzhjZDRmIiwidCI6Ijc3ZjkxZjk3LWVlYWMtNGVjMC1iZmY1LWEzMzgyMmIwYTAyOSJ9",
    thumb: "assets/images/relatorios/vendas-equipe.webp",
    bars: [40, 60, 50, 75, 85, 70, 90]
  },
  {
    tag: "Recursos Humanos",
    area: "Pessoas",
    title: "People Analytics",
    question: "Como está o time? Contratações, turnover, índice de más contratações, absenteísmo e faltas.",
    embed: "https://app.powerbi.com/view?r=eyJrIjoiMTVhYjc5MWEtM2RjMy00MzY0LWFkY2YtYjMyNDZlNmFjNGExIiwidCI6Ijc3ZjkxZjk3LWVlYWMtNGVjMC1iZmY1LWEzMzgyMmIwYTAyOSJ9",
    thumb: "assets/images/relatorios/people-analytics.webp",
    bars: [55, 75, 40, 65, 85, 45, 60]
  },
  {
    tag: "Clientes",
    area: "Vendas e clientes",
    title: "Dashboard de Clientes",
    question: "Quais clientes fidelizar, valorizar ou desenvolver? Segmentação por receita e frequência de compra.",
    embed: "https://app.powerbi.com/view?r=eyJrIjoiYTMzZjcwMDYtYmZkNi00MmY5LTgyY2MtOTU3NDc4OWZhYWYxIiwidCI6Ijc3ZjkxZjk3LWVlYWMtNGVjMC1iZmY1LWEzMzgyMmIwYTAyOSJ9",
    thumb: "assets/images/relatorios/clientes.webp",
    bars: [70, 55, 90, 40, 75, 50, 85]
  },
  {
    tag: "Projetos",
    area: "Operações",
    title: "Gestão de Projetos",
    question: "Os projetos estão no prazo e no orçamento? Custo e horas contra a linha de base, andamento por projeto e cronograma em Gantt.",
    embed: "https://app.powerbi.com/view?r=eyJrIjoiN2ZhYTJhYTgtM2IxYy00NTgwLWFjZWMtMmZjNzc2YWYxMTY3IiwidCI6Ijc3ZjkxZjk3LWVlYWMtNGVjMC1iZmY1LWEzMzgyMmIwYTAyOSJ9",
    thumb: "assets/images/relatorios/gestao-projetos.webp",
    bars: [50, 65, 80, 60, 75, 55, 70]
  }
];
