# FinControl — Sistema de Gestão Financeira Inteligente

![FinControl](https://img.shields.io/badge/FinControl-v1.0.0-2563eb?style=for-the-badge)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

> Aplicação web completa de gestão financeira pessoal e empresarial, com módulo fiscal integrado. Desenvolvida em HTML, CSS e JavaScript puro — sem dependências de back-end, pronta para hospedar no GitHub Pages.

---

## Funcionalidades

### Dashboard
- KPIs em tempo real: saldo, receitas, despesas e taxa de poupança
- Gráfico de barras comparativo (receitas vs despesas — últimos 6 meses)
- Gráfico de rosca por categoria de despesa
- Lançamentos recentes
- Prévia de metas e próximos eventos da agenda

### Lançamentos
- Cadastro completo de receitas e despesas
- Filtro por tipo, categoria e período
- Edição e exclusão inline
- Exportação para CSV

### Receitas
- Visão consolidada de todas as entradas
- KPIs: total, confirmadas, pendentes e quantidade
- Tabela detalhada com ações

### Despesas
- Análise por categoria com barras de progresso
- Gráfico de pizza por categoria
- Média diária de gastos
- Tabela completa com filtros

### Orçamento
- Limites mensais por categoria
- Indicadores visuais de uso (verde / amarelo / vermelho)
- Alertas de orçamento excedido

### Metas Financeiras
- Criação de metas com ícone, cor e prazo
- Barra de progresso individual
- Adição de valores e acompanhamento em tempo real

### Agenda Financeira
- Calendário mensal com marcação de eventos
- Timeline de próximos compromissos
- Cadastro de eventos de pagamento e recebimento

### Relatórios
- Visão geral com evolução mensal (gráfico de linha)
- Fluxo de caixa mensal (gráfico de barras)
- Distribuição por categoria (receitas e despesas)
- Impressão e exportação

### Módulo Fiscal
- **Notas Fiscais de Serviço (NFS-e):** emissão, visualização, controle de status
- **Impostos e Tributos:** IRPF, ISS, INSS, CSLL, PIS/COFINS, DAS — com controle de vencimento e pagamento
- **Calculadora Simples Nacional:** alíquota efetiva e DAS estimado por faixa de receita
- **Calculadora IRPF 2025:** tabela progressiva com dedução por dependentes e INSS
- **Faixas tributárias atualizadas** para Simples Nacional e IRPF

### Clientes & Fornecedores
- Cadastro de clientes e fornecedores
- Controle de faturamento por contato

### Configurações
- Perfil do usuário
- Segurança (alteração de senha)
- Contas bancárias
- Preferências de notificação

---

## Tecnologias Utilizadas

| Tecnologia | Versão | Finalidade |
|---|---|---|
| HTML5 | — | Estrutura e semântica |
| CSS3 | — | Estilização e responsividade |
| JavaScript ES6+ | — | Lógica e interatividade |
| Chart.js | 4.4.0 | Gráficos e visualizações |
| Google Fonts (Inter) | — | Tipografia profissional |

---

## Como Hospedar no GitHub Pages

1. Faça o fork ou upload deste repositório no GitHub
2. Acesse **Settings → Pages**
3. Em **Source**, selecione `main` branch e pasta `/ (root)`
4. Clique em **Save**
5. Aguarde alguns minutos e acesse a URL gerada

---

## Estrutura do Projeto

```
fincontrol/
├── index.html          # Aplicação principal (SPA)
├── css/
│   └── style.css       # Estilos globais e componentes
├── js/
│   └── app.js          # Lógica completa da aplicação
└── README.md           # Documentação
```

---

## Licença

MIT License — livre para uso pessoal e comercial.
