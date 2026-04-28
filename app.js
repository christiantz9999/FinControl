/* ============================================================
   FinControl - JavaScript Principal
   Gestão completa: navegação, dados, modais, gráficos
   ============================================================ */

'use strict';

/* ===================== STATE ===================== */
const App = {
  currentPage: 'dashboard',
  charts: {},
  data: {
    transactions: [],
    categories: [],
    budgets: [],
    goals: [],
    fiscalDocs: [],
    contacts: [],
    events: [],
    notasFiscais: [],
    impostos: []
  },
  user: { name: 'João Silva', email: 'joao@email.com', plan: 'Pro' }
};

/* ===================== SEED DATA ===================== */
function seedData() {
  const months = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
  const now = new Date();
  const y = now.getFullYear();
  const m = now.getMonth();

  App.data.categories = [
    { id:1, name:'Salário',        type:'income',  color:'#10b981', icon:'💼' },
    { id:2, name:'Freelance',      type:'income',  color:'#2563eb', icon:'💻' },
    { id:3, name:'Investimentos',  type:'income',  color:'#8b5cf6', icon:'📈' },
    { id:4, name:'Outros',         type:'income',  color:'#06b6d4', icon:'💰' },
    { id:5, name:'Moradia',        type:'expense', color:'#ef4444', icon:'🏠' },
    { id:6, name:'Alimentação',    type:'expense', color:'#f97316', icon:'🍽️' },
    { id:7, name:'Transporte',     type:'expense', color:'#f59e0b', icon:'🚗' },
    { id:8, name:'Saúde',          type:'expense', color:'#ec4899', icon:'🏥' },
    { id:9, name:'Educação',       type:'expense', color:'#3b82f6', icon:'📚' },
    { id:10,name:'Lazer',          type:'expense', color:'#a855f7', icon:'🎮' },
    { id:11,name:'Impostos',       type:'expense', color:'#64748b', icon:'📋' },
    { id:12,name:'Serviços',       type:'expense', color:'#0891b2', icon:'⚡' }
  ];

  App.data.transactions = [
    { id:1,  date:`${y}-${String(m+1).padStart(2,'0')}-05`, desc:'Salário Mensal',        category:1,  type:'income',  amount:8500,  status:'confirmed', account:'Conta Corrente' },
    { id:2,  date:`${y}-${String(m+1).padStart(2,'0')}-08`, desc:'Projeto Web - Cliente A',category:2, type:'income',  amount:2200,  status:'confirmed', account:'Conta Corrente' },
    { id:3,  date:`${y}-${String(m+1).padStart(2,'0')}-10`, desc:'Aluguel',               category:5,  type:'expense', amount:1800,  status:'confirmed', account:'Conta Corrente' },
    { id:4,  date:`${y}-${String(m+1).padStart(2,'0')}-12`, desc:'Supermercado',          category:6,  type:'expense', amount:650,   status:'confirmed', account:'Cartão Crédito' },
    { id:5,  date:`${y}-${String(m+1).padStart(2,'0')}-14`, desc:'Plano de Saúde',        category:8,  type:'expense', amount:420,   status:'confirmed', account:'Débito Automático' },
    { id:6,  date:`${y}-${String(m+1).padStart(2,'0')}-15`, desc:'Dividendos FII',        category:3,  type:'income',  amount:380,   status:'confirmed', account:'Corretora' },
    { id:7,  date:`${y}-${String(m+1).padStart(2,'0')}-16`, desc:'Combustível',           category:7,  type:'expense', amount:280,   status:'confirmed', account:'Cartão Crédito' },
    { id:8,  date:`${y}-${String(m+1).padStart(2,'0')}-18`, desc:'Curso Online',          category:9,  type:'expense', amount:199,   status:'confirmed', account:'Cartão Crédito' },
    { id:9,  date:`${y}-${String(m+1).padStart(2,'0')}-20`, desc:'Restaurante',           category:6,  type:'expense', amount:145,   status:'confirmed', account:'Cartão Crédito' },
    { id:10, date:`${y}-${String(m+1).padStart(2,'0')}-22`, desc:'Freelance - App Mobile',category:2,  type:'income',  amount:3500,  status:'pending',   account:'Conta Corrente' },
    { id:11, date:`${y}-${String(m+1).padStart(2,'0')}-23`, desc:'Energia Elétrica',      category:12, type:'expense', amount:210,   status:'confirmed', account:'Débito Automático' },
    { id:12, date:`${y}-${String(m+1).padStart(2,'0')}-24`, desc:'Internet',              category:12, type:'expense', amount:120,   status:'confirmed', account:'Débito Automático' },
    { id:13, date:`${y}-${String(m+1).padStart(2,'0')}-25`, desc:'IRPF Mensal',           category:11, type:'expense', amount:890,   status:'confirmed', account:'Conta Corrente' },
    { id:14, date:`${y}-${String(m+1).padStart(2,'0')}-26`, desc:'Academia',              category:10, type:'expense', amount:99,    status:'confirmed', account:'Cartão Crédito' },
    { id:15, date:`${y}-${String(m+1).padStart(2,'0')}-28`, desc:'Cinema',                category:10, type:'expense', amount:75,    status:'confirmed', account:'Cartão Crédito' }
  ];

  App.data.budgets = [
    { id:1, category:5,  limit:1900, spent:1800 },
    { id:2, category:6,  limit:800,  spent:795  },
    { id:3, category:7,  limit:400,  spent:280  },
    { id:4, category:8,  limit:500,  spent:420  },
    { id:5, category:9,  limit:300,  spent:199  },
    { id:6, category:10, limit:200,  spent:174  },
    { id:7, category:12, limit:400,  spent:330  }
  ];

  App.data.goals = [
    { id:1, name:'Reserva de Emergência', target:30000, current:18500, deadline:`${y+1}-06-01`, color:'#10b981', icon:'🛡️' },
    { id:2, name:'Viagem Europa',          target:15000, current:4200,  deadline:`${y+1}-12-01`, color:'#2563eb', icon:'✈️' },
    { id:3, name:'Notebook Novo',          target:6000,  current:3800,  deadline:`${y}-09-01`,   color:'#8b5cf6', icon:'💻' },
    { id:4, name:'Investimento Imóvel',    target:80000, current:22000, deadline:`${y+3}-01-01`, color:'#f59e0b', icon:'🏡' }
  ];

  App.data.events = [
    { id:1, date:`${y}-${String(m+1).padStart(2,'0')}-05`, title:'Receber Salário',        type:'income',  amount:8500 },
    { id:2, date:`${y}-${String(m+1).padStart(2,'0')}-10`, title:'Pagar Aluguel',          type:'expense', amount:1800 },
    { id:3, date:`${y}-${String(m+1).padStart(2,'0')}-15`, title:'Vencimento Cartão',      type:'expense', amount:1850 },
    { id:4, date:`${y}-${String(m+1).padStart(2,'0')}-20`, title:'Freelance Recebimento',  type:'income',  amount:3500 },
    { id:5, date:`${y}-${String(m+1).padStart(2,'0')}-25`, title:'IRPF Vencimento',        type:'expense', amount:890  },
    { id:6, date:`${y}-${String(m+1).padStart(2,'0')}-28`, title:'Plano de Saúde',         type:'expense', amount:420  }
  ];

  App.data.notasFiscais = [
    { id:1, number:'NFS-001', client:'Tech Solutions Ltda',   date:`${y}-${String(m+1).padStart(2,'0')}-08`, value:2200,  status:'emitida',   type:'servico',  iss:110,   ir:176  },
    { id:2, number:'NFS-002', client:'Digital Agency ME',     date:`${y}-${String(m+1).padStart(2,'0')}-22`, value:3500,  status:'pendente',  type:'servico',  iss:175,   ir:280  },
    { id:3, number:'NFS-003', client:'Startup XYZ',           date:`${y}-${String(m-1+1).padStart(2,'0')}-15`, value:1800, status:'paga',     type:'servico',  iss:90,    ir:144  },
    { id:4, number:'NFS-004', client:'E-commerce Brasil',     date:`${y}-${String(m-1+1).padStart(2,'0')}-28`, value:4200, status:'paga',     type:'servico',  iss:210,   ir:336  },
    { id:5, number:'NFS-005', client:'Consultoria Alpha',     date:`${y}-${String(m+1).padStart(2,'0')}-02`, value:5000,  status:'cancelada', type:'servico',  iss:250,   ir:400  }
  ];

  App.data.impostos = [
    { id:1, name:'IRPF',      competencia:`${months[m]}/${y}`, vencimento:`${y}-${String(m+1).padStart(2,'0')}-30`, valor:890,  status:'pago',     tipo:'federal' },
    { id:2, name:'ISS',       competencia:`${months[m]}/${y}`, vencimento:`${y}-${String(m+1).padStart(2,'0')}-15`, valor:285,  status:'pendente', tipo:'municipal' },
    { id:3, name:'INSS',      competencia:`${months[m]}/${y}`, vencimento:`${y}-${String(m+1).padStart(2,'0')}-20`, valor:660,  status:'pago',     tipo:'federal' },
    { id:4, name:'CSLL',      competencia:`${months[m]}/${y}`, vencimento:`${y}-${String(m+1).padStart(2,'0')}-31`, valor:120,  status:'pendente', tipo:'federal' },
    { id:5, name:'PIS/COFINS',competencia:`${months[m]}/${y}`, vencimento:`${y}-${String(m+1).padStart(2,'0')}-25`, valor:340,  status:'pendente', tipo:'federal' },
    { id:6, name:'IRPF',      competencia:`${months[m-1]}/${y}`, vencimento:`${y}-${String(m).padStart(2,'0')}-30`, valor:850, status:'pago',     tipo:'federal' },
    { id:7, name:'ISS',       competencia:`${months[m-1]}/${y}`, vencimento:`${y}-${String(m).padStart(2,'0')}-15`, valor:270, status:'pago',     tipo:'municipal' }
  ];

  App.data.contacts = [
    { id:1, name:'Tech Solutions Ltda',  type:'client',   email:'contato@techsolutions.com', phone:'(11) 99999-0001', total:2200  },
    { id:2, name:'Digital Agency ME',    type:'client',   email:'fin@digitalagency.com',     phone:'(11) 99999-0002', total:3500  },
    { id:3, name:'Startup XYZ',          type:'client',   email:'rh@startupxyz.com',         phone:'(21) 99999-0003', total:6000  },
    { id:4, name:'Fornecedor Cloud',     type:'supplier', email:'billing@cloud.com',          phone:'(11) 3000-0001', total:1200  },
    { id:5, name:'Escritório Contábil',  type:'supplier', email:'adm@contabil.com',           phone:'(11) 3000-0002', total:800   }
  ];
}

/* ===================== UTILS ===================== */
const fmt = {
  currency: (v) => new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(v||0),
  date: (s) => {
    if (!s) return '';
    const [y,m,d] = s.split('-');
    return `${d}/${m}/${y}`;
  },
  pct: (v,t) => t ? ((v/t)*100).toFixed(1)+'%' : '0%',
  num: (v) => new Intl.NumberFormat('pt-BR').format(v||0)
};

function getCat(id) { return App.data.categories.find(c=>c.id===id)||{name:'—',color:'#94a3b8',icon:'📌'}; }

function calcTotals() {
  const txs = App.data.transactions;
  const income  = txs.filter(t=>t.type==='income').reduce((s,t)=>s+t.amount,0);
  const expense = txs.filter(t=>t.type==='expense').reduce((s,t)=>s+t.amount,0);
  return { income, expense, balance: income - expense };
}

function genId(arr) { return arr.length ? Math.max(...arr.map(a=>a.id))+1 : 1; }

/* ===================== NAVIGATION ===================== */
function navigate(page) {
  document.querySelectorAll('.page-content').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

  const target = document.getElementById('page-'+page);
  if (target) target.classList.add('active');

  const navItem = document.querySelector(`[data-page="${page}"]`);
  if (navItem) navItem.classList.add('active');

  const titles = {
    dashboard: 'Dashboard',
    transactions: 'Lançamentos',
    income: 'Receitas',
    expenses: 'Despesas',
    budget: 'Orçamento',
    goals: 'Metas',
    agenda: 'Agenda Financeira',
    reports: 'Relatórios',
    fiscal: 'Módulo Fiscal',
    contacts: 'Clientes & Fornecedores',
    settings: 'Configurações'
  };

  document.getElementById('page-title').textContent = titles[page] || page;
  App.currentPage = page;

  // Close sidebar on mobile
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebar-overlay').classList.remove('open');

  // Render page
  renderPage(page);

  // Scroll to top
  window.scrollTo(0,0);
}

function renderPage(page) {
  switch(page) {
    case 'dashboard':    renderDashboard();    break;
    case 'transactions': renderTransactions(); break;
    case 'income':       renderIncome();       break;
    case 'expenses':     renderExpenses();     break;
    case 'budget':       renderBudget();       break;
    case 'goals':        renderGoals();        break;
    case 'agenda':       renderAgenda();       break;
    case 'reports':      renderReports();      break;
    case 'fiscal':       renderFiscal();       break;
    case 'contacts':     renderContacts();     break;
    case 'settings':     renderSettings();     break;
  }
}

/* ===================== DASHBOARD ===================== */
function renderDashboard() {
  const { income, expense, balance } = calcTotals();
  const savings = income > 0 ? ((balance/income)*100).toFixed(1) : 0;

  // KPIs
  document.getElementById('kpi-balance').textContent  = fmt.currency(balance);
  document.getElementById('kpi-income').textContent   = fmt.currency(income);
  document.getElementById('kpi-expense').textContent  = fmt.currency(expense);
  document.getElementById('kpi-savings').textContent  = savings + '%';

  // Recent transactions
  const tbody = document.getElementById('dash-recent-tbody');
  const recent = [...App.data.transactions].sort((a,b)=>b.date.localeCompare(a.date)).slice(0,6);
  tbody.innerHTML = recent.map(t => {
    const cat = getCat(t.category);
    return `<tr>
      <td><span style="font-size:1.1rem">${cat.icon}</span></td>
      <td><span class="td-main">${t.desc}</span></td>
      <td>${fmt.date(t.date)}</td>
      <td><span class="badge badge-${t.type==='income'?'success':'danger'}">${t.type==='income'?'Receita':'Despesa'}</span></td>
      <td class="font-bold ${t.type==='income'?'text-success':'text-danger'}">${t.type==='income'?'+':'−'}${fmt.currency(t.amount)}</td>
    </tr>`;
  }).join('');

  // Goals preview
  const goalsEl = document.getElementById('dash-goals');
  goalsEl.innerHTML = App.data.goals.slice(0,3).map(g => {
    const pct = Math.min((g.current/g.target)*100, 100);
    return `<div class="mb-4">
      <div class="flex justify-between items-center mb-1">
        <span class="text-sm font-semibold">${g.icon} ${g.name}</span>
        <span class="text-xs text-muted">${fmt.currency(g.current)} / ${fmt.currency(g.target)}</span>
      </div>
      <div class="progress"><div class="progress-bar" style="width:${pct}%;background:${g.color}"></div></div>
      <div class="text-xs text-muted mt-1">${pct.toFixed(1)}% concluído</div>
    </div>`;
  }).join('');

  // Upcoming events
  const evEl = document.getElementById('dash-events');
  const upcoming = App.data.events.slice(0,4);
  evEl.innerHTML = upcoming.map(e => `
    <div class="stat-row">
      <div>
        <div class="text-sm font-semibold">${e.title}</div>
        <div class="text-xs text-muted">${fmt.date(e.date)}</div>
      </div>
      <span class="font-bold ${e.type==='income'?'text-success':'text-danger'}">${e.type==='income'?'+':'−'}${fmt.currency(e.amount)}</span>
    </div>
  `).join('');

  // Charts
  renderDashboardCharts(income, expense);
}

function renderDashboardCharts(income, expense) {
  // Donut chart - expense by category
  const expCats = {};
  App.data.transactions.filter(t=>t.type==='expense').forEach(t => {
    const c = getCat(t.category);
    expCats[c.name] = (expCats[c.name]||0) + t.amount;
  });

  const donutCtx = document.getElementById('chart-donut');
  if (donutCtx) {
    if (App.charts.donut) App.charts.donut.destroy();
    App.charts.donut = new Chart(donutCtx, {
      type: 'doughnut',
      data: {
        labels: Object.keys(expCats),
        datasets: [{ data: Object.values(expCats), backgroundColor: ['#ef4444','#f97316','#f59e0b','#ec4899','#3b82f6','#a855f7','#0891b2'], borderWidth: 2, borderColor: '#fff' }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom', labels: { font: { size: 11 }, padding: 12 } } },
        cutout: '68%'
      }
    });
  }

  // Bar chart - income vs expense (last 6 months)
  const barCtx = document.getElementById('chart-bar');
  if (barCtx) {
    if (App.charts.bar) App.charts.bar.destroy();
    const labels = ['Nov','Dez','Jan','Fev','Mar','Abr'];
    const incData = [7200,8100,7800,8500,9200,income];
    const expData = [5100,6200,5800,6100,5500,expense];
    App.charts.bar = new Chart(barCtx, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          { label: 'Receitas', data: incData, backgroundColor: '#10b981', borderRadius: 6, borderSkipped: false },
          { label: 'Despesas', data: expData, backgroundColor: '#ef4444', borderRadius: 6, borderSkipped: false }
        ]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { position: 'top', labels: { font: { size: 12 } } } },
        scales: {
          y: { beginAtZero: true, grid: { color: '#f1f5f9' }, ticks: { callback: v => 'R$'+fmt.num(v) } },
          x: { grid: { display: false } }
        }
      }
    });
  }
}

/* ===================== TRANSACTIONS ===================== */
function renderTransactions(filter) {
  let txs = [...App.data.transactions].sort((a,b) => b.date.localeCompare(a.date));
  if (filter) {
    const q = filter.toLowerCase();
    txs = txs.filter(t => t.desc.toLowerCase().includes(q) || getCat(t.category).name.toLowerCase().includes(q));
  }

  const tbody = document.getElementById('tx-tbody');
  if (!tbody) return;

  if (!txs.length) {
    tbody.innerHTML = `<tr><td colspan="7"><div class="empty-state"><div class="empty-icon">📋</div><h3>Nenhum lançamento encontrado</h3></div></td></tr>`;
    return;
  }

  tbody.innerHTML = txs.map(t => {
    const cat = getCat(t.category);
    return `<tr>
      <td>${fmt.date(t.date)}</td>
      <td><span class="td-main">${t.desc}</span></td>
      <td><span style="display:inline-flex;align-items:center;gap:6px"><span class="dot" style="background:${cat.color}"></span>${cat.name}</span></td>
      <td><span class="badge badge-${t.type==='income'?'success':'danger'}">${t.type==='income'?'Receita':'Despesa'}</span></td>
      <td class="font-bold ${t.type==='income'?'text-success':'text-danger'}">${t.type==='income'?'+':'−'}${fmt.currency(t.amount)}</td>
      <td><span class="badge badge-${t.status==='confirmed'?'success':t.status==='pending'?'warning':'gray'}">${t.status==='confirmed'?'Confirmado':t.status==='pending'?'Pendente':'Cancelado'}</span></td>
      <td>
        <div class="flex gap-2">
          <button class="btn btn-ghost btn-sm btn-icon" onclick="editTransaction(${t.id})" title="Editar">✏️</button>
          <button class="btn btn-ghost btn-sm btn-icon" onclick="deleteTransaction(${t.id})" title="Excluir">🗑️</button>
        </div>
      </td>
    </tr>`;
  }).join('');
}

function editTransaction(id) {
  const t = App.data.transactions.find(x=>x.id===id);
  if (!t) return;
  openTransactionModal(t);
}

function deleteTransaction(id) {
  if (!confirm('Deseja excluir este lançamento?')) return;
  App.data.transactions = App.data.transactions.filter(t=>t.id!==id);
  renderTransactions();
  showToast('Lançamento excluído', 'success');
}

/* ===================== INCOME ===================== */
function renderIncome() {
  const incomes = App.data.transactions.filter(t=>t.type==='income').sort((a,b)=>b.date.localeCompare(a.date));
  const total = incomes.reduce((s,t)=>s+t.amount,0);
  const confirmed = incomes.filter(t=>t.status==='confirmed').reduce((s,t)=>s+t.amount,0);
  const pending   = incomes.filter(t=>t.status==='pending').reduce((s,t)=>s+t.amount,0);

  const el = document.getElementById('income-content');
  if (!el) return;

  el.innerHTML = `
    <div class="kpi-grid mb-6">
      <div class="kpi-card green">
        <div class="kpi-top"><div class="kpi-icon green">💰</div></div>
        <div class="kpi-value">${fmt.currency(total)}</div>
        <div class="kpi-label">Total de Receitas</div>
      </div>
      <div class="kpi-card blue">
        <div class="kpi-top"><div class="kpi-icon blue">✅</div></div>
        <div class="kpi-value">${fmt.currency(confirmed)}</div>
        <div class="kpi-label">Confirmadas</div>
      </div>
      <div class="kpi-card amber">
        <div class="kpi-top"><div class="kpi-icon amber">⏳</div></div>
        <div class="kpi-value">${fmt.currency(pending)}</div>
        <div class="kpi-label">Pendentes</div>
      </div>
      <div class="kpi-card purple">
        <div class="kpi-top"><div class="kpi-icon purple">📊</div></div>
        <div class="kpi-value">${incomes.length}</div>
        <div class="kpi-label">Lançamentos</div>
      </div>
    </div>
    <div class="card">
      <div class="card-header">
        <span class="card-title">Receitas do Período</span>
        <button class="btn btn-primary btn-sm" onclick="openTransactionModal(null,'income')">+ Nova Receita</button>
      </div>
      <div class="card-body" style="padding:0">
        <div class="table-wrapper">
          <table>
            <thead><tr><th>Data</th><th>Descrição</th><th>Categoria</th><th>Conta</th><th>Valor</th><th>Status</th><th>Ações</th></tr></thead>
            <tbody>
              ${incomes.map(t => {
                const cat = getCat(t.category);
                return `<tr>
                  <td>${fmt.date(t.date)}</td>
                  <td><span class="td-main">${t.desc}</span></td>
                  <td><span style="display:inline-flex;align-items:center;gap:6px"><span class="dot" style="background:${cat.color}"></span>${cat.name}</span></td>
                  <td class="text-sm">${t.account}</td>
                  <td class="font-bold text-success">+${fmt.currency(t.amount)}</td>
                  <td><span class="badge badge-${t.status==='confirmed'?'success':'warning'}">${t.status==='confirmed'?'Confirmado':'Pendente'}</span></td>
                  <td><div class="flex gap-2">
                    <button class="btn btn-ghost btn-sm btn-icon" onclick="editTransaction(${t.id})">✏️</button>
                    <button class="btn btn-ghost btn-sm btn-icon" onclick="deleteTransaction(${t.id})">🗑️</button>
                  </div></td>
                </tr>`;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>`;
}

/* ===================== EXPENSES ===================== */
function renderExpenses() {
  const expenses = App.data.transactions.filter(t=>t.type==='expense').sort((a,b)=>b.date.localeCompare(a.date));
  const total = expenses.reduce((s,t)=>s+t.amount,0);

  const el = document.getElementById('expenses-content');
  if (!el) return;

  // Group by category
  const byCat = {};
  expenses.forEach(t => {
    const c = getCat(t.category);
    if (!byCat[c.name]) byCat[c.name] = { cat:c, total:0, count:0 };
    byCat[c.name].total += t.amount;
    byCat[c.name].count++;
  });

  el.innerHTML = `
    <div class="kpi-grid mb-6">
      <div class="kpi-card red">
        <div class="kpi-top"><div class="kpi-icon red">💸</div></div>
        <div class="kpi-value">${fmt.currency(total)}</div>
        <div class="kpi-label">Total de Despesas</div>
      </div>
      <div class="kpi-card amber">
        <div class="kpi-top"><div class="kpi-icon amber">📂</div></div>
        <div class="kpi-value">${Object.keys(byCat).length}</div>
        <div class="kpi-label">Categorias</div>
      </div>
      <div class="kpi-card purple">
        <div class="kpi-top"><div class="kpi-icon purple">📋</div></div>
        <div class="kpi-value">${expenses.length}</div>
        <div class="kpi-label">Lançamentos</div>
      </div>
      <div class="kpi-card blue">
        <div class="kpi-top"><div class="kpi-icon blue">📅</div></div>
        <div class="kpi-value">${fmt.currency(total/30)}</div>
        <div class="kpi-label">Média Diária</div>
      </div>
    </div>
    <div class="grid-2 mb-5">
      <div class="card">
        <div class="card-header"><span class="card-title">Por Categoria</span></div>
        <div class="card-body">
          ${Object.values(byCat).sort((a,b)=>b.total-a.total).map(({cat,total:t,count}) => `
            <div class="mb-3">
              <div class="flex justify-between items-center mb-1">
                <span class="text-sm font-semibold">${cat.icon} ${cat.name} <span class="text-xs text-muted">(${count})</span></span>
                <span class="text-sm font-bold text-danger">${fmt.currency(t)}</span>
              </div>
              <div class="progress"><div class="progress-bar red" style="width:${((t/total)*100).toFixed(1)}%"></div></div>
            </div>
          `).join('')}
        </div>
      </div>
      <div class="card">
        <div class="card-header"><span class="card-title">Distribuição</span></div>
        <div class="card-body"><div class="chart-container" style="height:260px"><canvas id="chart-exp-pie"></canvas></div></div>
      </div>
    </div>
    <div class="card">
      <div class="card-header">
        <span class="card-title">Todas as Despesas</span>
        <button class="btn btn-danger btn-sm" onclick="openTransactionModal(null,'expense')">+ Nova Despesa</button>
      </div>
      <div class="card-body" style="padding:0">
        <div class="table-wrapper">
          <table>
            <thead><tr><th>Data</th><th>Descrição</th><th>Categoria</th><th>Conta</th><th>Valor</th><th>Ações</th></tr></thead>
            <tbody>
              ${expenses.map(t => {
                const cat = getCat(t.category);
                return `<tr>
                  <td>${fmt.date(t.date)}</td>
                  <td><span class="td-main">${t.desc}</span></td>
                  <td><span style="display:inline-flex;align-items:center;gap:6px"><span class="dot" style="background:${cat.color}"></span>${cat.name}</span></td>
                  <td class="text-sm">${t.account}</td>
                  <td class="font-bold text-danger">−${fmt.currency(t.amount)}</td>
                  <td><div class="flex gap-2">
                    <button class="btn btn-ghost btn-sm btn-icon" onclick="editTransaction(${t.id})">✏️</button>
                    <button class="btn btn-ghost btn-sm btn-icon" onclick="deleteTransaction(${t.id})">🗑️</button>
                  </div></td>
                </tr>`;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>`;

  // Pie chart
  setTimeout(() => {
    const ctx = document.getElementById('chart-exp-pie');
    if (ctx) {
      if (App.charts.expPie) App.charts.expPie.destroy();
      const vals = Object.values(byCat);
      App.charts.expPie = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: vals.map(v=>v.cat.name),
          datasets: [{ data: vals.map(v=>v.total), backgroundColor: vals.map(v=>v.cat.color), borderWidth: 2, borderColor: '#fff' }]
        },
        options: { responsive:true, maintainAspectRatio:false, plugins:{ legend:{ position:'bottom', labels:{ font:{size:11}, padding:10 } } } }
      });
    }
  }, 100);
}

/* ===================== BUDGET ===================== */
function renderBudget() {
  const el = document.getElementById('budget-content');
  if (!el) return;

  const totalLimit = App.data.budgets.reduce((s,b)=>s+b.limit,0);
  const totalSpent = App.data.budgets.reduce((s,b)=>s+b.spent,0);
  const overBudget = App.data.budgets.filter(b=>b.spent>b.limit).length;

  el.innerHTML = `
    <div class="kpi-grid mb-6">
      <div class="kpi-card blue">
        <div class="kpi-top"><div class="kpi-icon blue">🎯</div></div>
        <div class="kpi-value">${fmt.currency(totalLimit)}</div>
        <div class="kpi-label">Orçamento Total</div>
      </div>
      <div class="kpi-card amber">
        <div class="kpi-top"><div class="kpi-icon amber">💸</div></div>
        <div class="kpi-value">${fmt.currency(totalSpent)}</div>
        <div class="kpi-label">Gasto até Agora</div>
      </div>
      <div class="kpi-card green">
        <div class="kpi-top"><div class="kpi-icon green">✅</div></div>
        <div class="kpi-value">${fmt.currency(totalLimit-totalSpent)}</div>
        <div class="kpi-label">Saldo Disponível</div>
      </div>
      <div class="kpi-card red">
        <div class="kpi-top"><div class="kpi-icon red">⚠️</div></div>
        <div class="kpi-value">${overBudget}</div>
        <div class="kpi-label">Acima do Limite</div>
      </div>
    </div>
    <div class="card">
      <div class="card-header">
        <span class="card-title">Orçamentos por Categoria</span>
        <button class="btn btn-primary btn-sm" onclick="openBudgetModal()">+ Novo Orçamento</button>
      </div>
      <div class="card-body">
        ${App.data.budgets.map(b => {
          const cat = getCat(b.category);
          const pct = Math.min((b.spent/b.limit)*100,100);
          const over = b.spent > b.limit;
          const color = over ? 'red' : pct > 80 ? 'amber' : 'green';
          return `
          <div class="mb-5">
            <div class="flex justify-between items-center mb-2">
              <div class="flex items-center gap-2">
                <span style="font-size:1.1rem">${cat.icon}</span>
                <span class="font-semibold">${cat.name}</span>
                ${over ? '<span class="badge badge-danger">Acima do limite</span>' : ''}
              </div>
              <div class="text-sm text-muted">${fmt.currency(b.spent)} / ${fmt.currency(b.limit)}</div>
            </div>
            <div class="progress" style="height:12px">
              <div class="progress-bar ${color}" style="width:${pct}%"></div>
            </div>
            <div class="flex justify-between mt-1">
              <span class="text-xs text-muted">${pct.toFixed(1)}% utilizado</span>
              <span class="text-xs ${over?'text-danger':'text-success'}">${over?'−'+fmt.currency(b.spent-b.limit):'+'+fmt.currency(b.limit-b.spent)} restante</span>
            </div>
          </div>`;
        }).join('')}
      </div>
    </div>`;
}

/* ===================== GOALS ===================== */
function renderGoals() {
  const el = document.getElementById('goals-content');
  if (!el) return;

  el.innerHTML = `
    <div class="page-header">
      <div class="page-header-info"><h2>Minhas Metas</h2><p>Acompanhe o progresso dos seus objetivos financeiros</p></div>
      <div class="page-header-actions"><button class="btn btn-primary" onclick="openGoalModal()">+ Nova Meta</button></div>
    </div>
    <div class="grid-auto">
      ${App.data.goals.map(g => {
        const pct = Math.min((g.current/g.target)*100,100);
        const remaining = g.target - g.current;
        const daysLeft = Math.max(0, Math.ceil((new Date(g.deadline)-new Date())/(1000*60*60*24)));
        return `
        <div class="card">
          <div class="card-body">
            <div class="flex justify-between items-center mb-3">
              <div class="flex items-center gap-2">
                <span style="font-size:1.8rem">${g.icon}</span>
                <div>
                  <div class="font-bold">${g.name}</div>
                  <div class="text-xs text-muted">Prazo: ${fmt.date(g.deadline)} · ${daysLeft} dias</div>
                </div>
              </div>
              <div class="dropdown">
                <button class="btn btn-ghost btn-sm btn-icon" onclick="toggleDropdown('goal-dd-${g.id}')">⋯</button>
                <div class="dropdown-menu" id="goal-dd-${g.id}">
                  <div class="dropdown-item" onclick="editGoal(${g.id})">✏️ Editar</div>
                  <div class="dropdown-item" onclick="addGoalAmount(${g.id})">💰 Adicionar Valor</div>
                  <div class="dropdown-divider"></div>
                  <div class="dropdown-item danger" onclick="deleteGoal(${g.id})">🗑️ Excluir</div>
                </div>
              </div>
            </div>
            <div class="mb-2">
              <div class="flex justify-between text-sm mb-1">
                <span class="text-muted">Progresso</span>
                <span class="font-bold">${pct.toFixed(1)}%</span>
              </div>
              <div class="progress" style="height:10px">
                <div class="progress-bar" style="width:${pct}%;background:${g.color}"></div>
              </div>
            </div>
            <div class="flex justify-between mt-3">
              <div><div class="text-xs text-muted">Acumulado</div><div class="font-bold text-success">${fmt.currency(g.current)}</div></div>
              <div style="text-align:right"><div class="text-xs text-muted">Faltam</div><div class="font-bold text-danger">${fmt.currency(remaining)}</div></div>
            </div>
          </div>
        </div>`;
      }).join('')}
    </div>`;
}

function deleteGoal(id) {
  if (!confirm('Excluir esta meta?')) return;
  App.data.goals = App.data.goals.filter(g=>g.id!==id);
  renderGoals();
  showToast('Meta excluída', 'success');
}

function addGoalAmount(id) {
  const g = App.data.goals.find(x=>x.id===id);
  if (!g) return;
  const v = parseFloat(prompt(`Adicionar valor à meta "${g.name}":`));
  if (isNaN(v) || v<=0) return;
  g.current = Math.min(g.current+v, g.target);
  renderGoals();
  showToast('Valor adicionado!', 'success');
}

/* ===================== AGENDA ===================== */
function renderAgenda() {
  const el = document.getElementById('agenda-content');
  if (!el) return;

  const now = new Date();
  const y = now.getFullYear();
  const m = now.getMonth();
  const monthNames = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];

  const firstDay = new Date(y, m, 1).getDay();
  const daysInMonth = new Date(y, m+1, 0).getDate();
  const today = now.getDate();

  // Build calendar cells
  let cells = '';
  for (let i=0; i<firstDay; i++) cells += `<div class="cal-day other-month"></div>`;
  for (let d=1; d<=daysInMonth; d++) {
    const dateStr = `${y}-${String(m+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    const hasEv = App.data.events.some(e=>e.date===dateStr);
    cells += `<div class="cal-day ${d===today?'today':''} ${hasEv?'has-event':''}" onclick="showDayEvents('${dateStr}')">${d}</div>`;
  }

  const upcoming = App.data.events.sort((a,b)=>a.date.localeCompare(b.date));

  el.innerHTML = `
    <div class="grid-2">
      <div class="card">
        <div class="card-header">
          <span class="card-title">📅 ${monthNames[m]} ${y}</span>
          <button class="btn btn-primary btn-sm" onclick="openEventModal()">+ Evento</button>
        </div>
        <div class="card-body">
          <div class="calendar-grid mb-2">
            ${['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'].map(d=>`<div class="cal-header">${d}</div>`).join('')}
            ${cells}
          </div>
          <div class="mt-3 flex gap-3 text-xs text-muted">
            <span>🟢 Tem evento</span>
            <span>🔵 Hoje</span>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-header"><span class="card-title">Próximos Compromissos</span></div>
        <div class="card-body">
          <div class="timeline">
            ${upcoming.map(e => `
              <div class="timeline-item">
                <div class="timeline-dot" style="background:${e.type==='income'?'#ecfdf5':'#fef2f2'}">
                  <span style="font-size:.9rem">${e.type==='income'?'💰':'💸'}</span>
                </div>
                <div class="timeline-content">
                  <div class="t-title">${e.title}</div>
                  <div class="t-sub ${e.type==='income'?'text-success':'text-danger'} font-bold">${e.type==='income'?'+':'−'}${fmt.currency(e.amount)}</div>
                  <div class="t-time">${fmt.date(e.date)}</div>
                </div>
                <button class="btn btn-ghost btn-sm btn-icon" onclick="deleteEvent(${e.id})">🗑️</button>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>`;
}

function deleteEvent(id) {
  App.data.events = App.data.events.filter(e=>e.id!==id);
  renderAgenda();
  showToast('Evento removido', 'success');
}

function showDayEvents(date) {
  const evs = App.data.events.filter(e=>e.date===date);
  if (!evs.length) { showToast('Nenhum evento neste dia', 'info'); return; }
  alert(evs.map(e=>`${e.title}: ${fmt.currency(e.amount)}`).join('\n'));
}

/* ===================== REPORTS ===================== */
function renderReports() {
  const el = document.getElementById('reports-content');
  if (!el) return;

  const { income, expense, balance } = calcTotals();
  const savings = income > 0 ? ((balance/income)*100).toFixed(1) : 0;

  el.innerHTML = `
    <div class="tabs" id="report-tabs">
      <button class="tab-btn active" onclick="switchReportTab('overview',this)">Visão Geral</button>
      <button class="tab-btn" onclick="switchReportTab('cashflow',this)">Fluxo de Caixa</button>
      <button class="tab-btn" onclick="switchReportTab('categories',this)">Por Categoria</button>
    </div>
    <div id="report-overview" class="tab-content active">
      <div class="kpi-grid mb-5">
        <div class="kpi-card green"><div class="kpi-top"><div class="kpi-icon green">📈</div><span class="kpi-trend up">▲ 8.2%</span></div><div class="kpi-value">${fmt.currency(income)}</div><div class="kpi-label">Receita Total</div></div>
        <div class="kpi-card red"><div class="kpi-top"><div class="kpi-icon red">📉</div><span class="kpi-trend down">▲ 3.1%</span></div><div class="kpi-value">${fmt.currency(expense)}</div><div class="kpi-label">Despesa Total</div></div>
        <div class="kpi-card blue"><div class="kpi-top"><div class="kpi-icon blue">💎</div><span class="kpi-trend up">▲ 12.5%</span></div><div class="kpi-value">${fmt.currency(balance)}</div><div class="kpi-label">Saldo Líquido</div></div>
        <div class="kpi-card purple"><div class="kpi-top"><div class="kpi-icon purple">🏦</div></div><div class="kpi-value">${savings}%</div><div class="kpi-label">Taxa de Poupança</div></div>
      </div>
      <div class="card">
        <div class="card-header"><span class="card-title">Evolução Mensal — Últimos 6 Meses</span></div>
        <div class="card-body"><div class="chart-container" style="height:300px"><canvas id="chart-report-line"></canvas></div></div>
      </div>
    </div>
    <div id="report-cashflow" class="tab-content">
      <div class="card">
        <div class="card-header"><span class="card-title">Fluxo de Caixa Mensal</span></div>
        <div class="card-body"><div class="chart-container" style="height:320px"><canvas id="chart-cashflow"></canvas></div></div>
      </div>
    </div>
    <div id="report-categories" class="tab-content">
      <div class="grid-2">
        <div class="card">
          <div class="card-header"><span class="card-title">Receitas por Categoria</span></div>
          <div class="card-body"><div class="chart-container" style="height:260px"><canvas id="chart-inc-cat"></canvas></div></div>
        </div>
        <div class="card">
          <div class="card-header"><span class="card-title">Despesas por Categoria</span></div>
          <div class="card-body"><div class="chart-container" style="height:260px"><canvas id="chart-exp-cat"></canvas></div></div>
        </div>
      </div>
    </div>`;

  setTimeout(() => renderReportCharts(), 100);
}

function switchReportTab(id, btn) {
  document.querySelectorAll('#report-tabs .tab-btn').forEach(b=>b.classList.remove('active'));
  document.querySelectorAll('#reports-content .tab-content').forEach(t=>t.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('report-'+id).classList.add('active');
  setTimeout(() => renderReportCharts(), 100);
}

function renderReportCharts() {
  const lineCtx = document.getElementById('chart-report-line');
  if (lineCtx && !lineCtx._rendered) {
    lineCtx._rendered = true;
    new Chart(lineCtx, {
      type: 'line',
      data: {
        labels: ['Nov','Dez','Jan','Fev','Mar','Abr'],
        datasets: [
          { label:'Receitas', data:[7200,8100,7800,8500,9200,14580], borderColor:'#10b981', backgroundColor:'rgba(16,185,129,.1)', fill:true, tension:.4, pointRadius:5 },
          { label:'Despesas', data:[5100,6200,5800,6100,5500,4888],  borderColor:'#ef4444', backgroundColor:'rgba(239,68,68,.1)',   fill:true, tension:.4, pointRadius:5 }
        ]
      },
      options: { responsive:true, maintainAspectRatio:false, plugins:{ legend:{ position:'top' } }, scales:{ y:{ beginAtZero:true, grid:{ color:'#f1f5f9' } }, x:{ grid:{ display:false } } } }
    });
  }

  const cfCtx = document.getElementById('chart-cashflow');
  if (cfCtx && !cfCtx._rendered) {
    cfCtx._rendered = true;
    new Chart(cfCtx, {
      type: 'bar',
      data: {
        labels: ['Nov','Dez','Jan','Fev','Mar','Abr'],
        datasets: [{ label:'Saldo Líquido', data:[2100,1900,2000,2400,3700,9692], backgroundColor: d => d.raw>=0?'#10b981':'#ef4444', borderRadius:6 }]
      },
      options: { responsive:true, maintainAspectRatio:false, plugins:{ legend:{ display:false } }, scales:{ y:{ grid:{ color:'#f1f5f9' } }, x:{ grid:{ display:false } } } }
    });
  }

  const incCatCtx = document.getElementById('chart-inc-cat');
  if (incCatCtx && !incCatCtx._rendered) {
    incCatCtx._rendered = true;
    const incCats = {};
    App.data.transactions.filter(t=>t.type==='income').forEach(t=>{ const c=getCat(t.category); incCats[c.name]=(incCats[c.name]||0)+t.amount; });
    new Chart(incCatCtx, { type:'doughnut', data:{ labels:Object.keys(incCats), datasets:[{ data:Object.values(incCats), backgroundColor:['#10b981','#2563eb','#8b5cf6','#06b6d4'], borderWidth:2, borderColor:'#fff' }] }, options:{ responsive:true, maintainAspectRatio:false, plugins:{ legend:{ position:'bottom', labels:{ font:{size:11}, padding:10 } } }, cutout:'60%' } });
  }

  const expCatCtx = document.getElementById('chart-exp-cat');
  if (expCatCtx && !expCatCtx._rendered) {
    expCatCtx._rendered = true;
    const expCats = {};
    App.data.transactions.filter(t=>t.type==='expense').forEach(t=>{ const c=getCat(t.category); expCats[c.name]=(expCats[c.name]||0)+t.amount; });
    new Chart(expCatCtx, { type:'doughnut', data:{ labels:Object.keys(expCats), datasets:[{ data:Object.values(expCats), backgroundColor:['#ef4444','#f97316','#f59e0b','#ec4899','#3b82f6','#a855f7','#0891b2'], borderWidth:2, borderColor:'#fff' }] }, options:{ responsive:true, maintainAspectRatio:false, plugins:{ legend:{ position:'bottom', labels:{ font:{size:11}, padding:10 } } }, cutout:'60%' } });
  }
}

/* ===================== FISCAL MODULE ===================== */
function renderFiscal() {
  const el = document.getElementById('fiscal-content');
  if (!el) return;

  const totalNF = App.data.notasFiscais.reduce((s,n)=>s+n.value,0);
  const totalImp = App.data.impostos.reduce((s,i)=>s+i.valor,0);
  const pendImp = App.data.impostos.filter(i=>i.status==='pendente').reduce((s,i)=>s+i.valor,0);
  const paidImp = App.data.impostos.filter(i=>i.status==='pago').reduce((s,i)=>s+i.valor,0);

  el.innerHTML = `
    <div class="kpi-grid mb-6">
      <div class="kpi-card blue">
        <div class="kpi-top"><div class="kpi-icon blue">🧾</div></div>
        <div class="kpi-value">${App.data.notasFiscais.length}</div>
        <div class="kpi-label">Notas Fiscais</div>
      </div>
      <div class="kpi-card green">
        <div class="kpi-top"><div class="kpi-icon green">💰</div></div>
        <div class="kpi-value">${fmt.currency(totalNF)}</div>
        <div class="kpi-label">Faturamento NF</div>
      </div>
      <div class="kpi-card amber">
        <div class="kpi-top"><div class="kpi-icon amber">⚠️</div></div>
        <div class="kpi-value">${fmt.currency(pendImp)}</div>
        <div class="kpi-label">Impostos Pendentes</div>
      </div>
      <div class="kpi-card purple">
        <div class="kpi-top"><div class="kpi-icon purple">✅</div></div>
        <div class="kpi-value">${fmt.currency(paidImp)}</div>
        <div class="kpi-label">Impostos Pagos</div>
      </div>
    </div>

    <div class="tabs" id="fiscal-tabs">
      <button class="tab-btn active" onclick="switchFiscalTab('nf',this)">Notas Fiscais</button>
      <button class="tab-btn" onclick="switchFiscalTab('impostos',this)">Impostos & Tributos</button>
      <button class="tab-btn" onclick="switchFiscalTab('simples',this)">Simples Nacional</button>
      <button class="tab-btn" onclick="switchFiscalTab('irpf',this)">IRPF</button>
    </div>

    <div id="fiscal-nf" class="tab-content active">
      <div class="card">
        <div class="card-header">
          <span class="card-title">Notas Fiscais de Serviço</span>
          <button class="btn btn-primary btn-sm" onclick="openNFModal()">+ Emitir NFS-e</button>
        </div>
        <div class="card-body" style="padding:0">
          <div class="table-wrapper">
            <table>
              <thead><tr><th>Número</th><th>Cliente</th><th>Data</th><th>Valor</th><th>ISS</th><th>IR Retido</th><th>Status</th><th>Ações</th></tr></thead>
              <tbody>
                ${App.data.notasFiscais.map(n => `<tr>
                  <td class="td-main">${n.number}</td>
                  <td>${n.client}</td>
                  <td>${fmt.date(n.date)}</td>
                  <td class="font-bold">${fmt.currency(n.value)}</td>
                  <td class="text-warning">${fmt.currency(n.iss)}</td>
                  <td class="text-danger">${fmt.currency(n.ir)}</td>
                  <td><span class="badge badge-${n.status==='emitida'?'primary':n.status==='paga'?'success':n.status==='pendente'?'warning':'gray'}">${n.status.charAt(0).toUpperCase()+n.status.slice(1)}</span></td>
                  <td><div class="flex gap-2">
                    <button class="btn btn-ghost btn-sm btn-icon" onclick="viewNF(${n.id})" title="Visualizar">👁️</button>
                    <button class="btn btn-ghost btn-sm btn-icon" onclick="deleteNF(${n.id})" title="Excluir">🗑️</button>
                  </div></td>
                </tr>`).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div id="fiscal-impostos" class="tab-content">
      <div class="card">
        <div class="card-header">
          <span class="card-title">Controle de Impostos e Tributos</span>
          <button class="btn btn-primary btn-sm" onclick="openImpostoModal()">+ Lançar Imposto</button>
        </div>
        <div class="card-body" style="padding:0">
          <div class="table-wrapper">
            <table>
              <thead><tr><th>Tributo</th><th>Competência</th><th>Vencimento</th><th>Valor</th><th>Tipo</th><th>Status</th><th>Ações</th></tr></thead>
              <tbody>
                ${App.data.impostos.map(i => `<tr>
                  <td class="td-main">${i.name}</td>
                  <td>${i.competencia}</td>
                  <td>${fmt.date(i.vencimento)}</td>
                  <td class="font-bold text-danger">${fmt.currency(i.valor)}</td>
                  <td><span class="badge badge-${i.tipo==='federal'?'primary':i.tipo==='municipal'?'info':'warning'}">${i.tipo.charAt(0).toUpperCase()+i.tipo.slice(1)}</span></td>
                  <td><span class="badge badge-${i.status==='pago'?'success':'warning'}">${i.status==='pago'?'Pago':'Pendente'}</span></td>
                  <td><div class="flex gap-2">
                    ${i.status==='pendente'?`<button class="btn btn-secondary btn-sm" onclick="markImpostoPago(${i.id})">✅ Pagar</button>`:''}
                    <button class="btn btn-ghost btn-sm btn-icon" onclick="deleteImposto(${i.id})">🗑️</button>
                  </div></td>
                </tr>`).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div id="fiscal-simples" class="tab-content">
      <div class="grid-2">
        <div class="card">
          <div class="card-header"><span class="card-title">Calculadora Simples Nacional</span></div>
          <div class="card-body">
            <div class="form-group">
              <label class="form-label">Receita Bruta Anual (R$)</label>
              <input type="number" class="form-control" id="simples-receita" placeholder="Ex: 180000" oninput="calcSimples()">
            </div>
            <div class="form-group">
              <label class="form-label">Anexo do Simples Nacional</label>
              <select class="form-control" id="simples-anexo" onchange="calcSimples()">
                <option value="3">Anexo III — Serviços em geral</option>
                <option value="4">Anexo IV — Construção civil, limpeza</option>
                <option value="5">Anexo V — Serviços intelectuais</option>
              </select>
            </div>
            <div id="simples-result" class="mt-4"></div>
          </div>
        </div>
        <div class="card">
          <div class="card-header"><span class="card-title">Faixas do Simples Nacional</span></div>
          <div class="card-body">
            ${[
              { faixa:'1ª Faixa', receita:'Até R$ 180.000',     aliq:'6,00%',  desc:'Alíquota efetiva mínima' },
              { faixa:'2ª Faixa', receita:'Até R$ 360.000',     aliq:'11,20%', desc:'Parcela a deduzir: R$ 9.360' },
              { faixa:'3ª Faixa', receita:'Até R$ 720.000',     aliq:'13,50%', desc:'Parcela a deduzir: R$ 17.640' },
              { faixa:'4ª Faixa', receita:'Até R$ 1.800.000',   aliq:'16,00%', desc:'Parcela a deduzir: R$ 35.640' },
              { faixa:'5ª Faixa', receita:'Até R$ 3.600.000',   aliq:'21,00%', desc:'Parcela a deduzir: R$ 125.640' },
              { faixa:'6ª Faixa', receita:'Até R$ 4.800.000',   aliq:'33,00%', desc:'Parcela a deduzir: R$ 648.000' }
            ].map(f=>`
              <div class="tax-band">
                <div><div class="font-semibold text-sm">${f.faixa}</div><div class="text-xs text-muted">${f.receita}</div></div>
                <div style="text-align:right"><div class="font-bold text-primary-color">${f.aliq}</div><div class="text-xs text-muted">${f.desc}</div></div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>

    <div id="fiscal-irpf" class="tab-content">
      <div class="grid-2">
        <div class="card">
          <div class="card-header"><span class="card-title">Calculadora IRPF 2025</span></div>
          <div class="card-body">
            <div class="form-group">
              <label class="form-label">Rendimento Tributável Mensal (R$)</label>
              <input type="number" class="form-control" id="irpf-rendimento" placeholder="Ex: 8500" oninput="calcIRPF()">
            </div>
            <div class="form-group">
              <label class="form-label">Dependentes</label>
              <input type="number" class="form-control" id="irpf-dep" value="0" min="0" oninput="calcIRPF()">
            </div>
            <div class="form-group">
              <label class="form-label">Contribuição INSS (R$)</label>
              <input type="number" class="form-control" id="irpf-inss" placeholder="Ex: 660" oninput="calcIRPF()">
            </div>
            <div id="irpf-result" class="mt-4"></div>
          </div>
        </div>
        <div class="card">
          <div class="card-header"><span class="card-title">Tabela Progressiva IRPF 2025</span></div>
          <div class="card-body">
            ${[
              { faixa:'Isento',             base:'Até R$ 2.259,20',   aliq:'—',    ded:'—' },
              { faixa:'1ª Faixa',           base:'Até R$ 2.826,65',   aliq:'7,5%', ded:'R$ 169,44' },
              { faixa:'2ª Faixa',           base:'Até R$ 3.751,05',   aliq:'15%',  ded:'R$ 381,44' },
              { faixa:'3ª Faixa',           base:'Até R$ 4.664,68',   aliq:'22,5%',ded:'R$ 662,77' },
              { faixa:'4ª Faixa (máxima)',  base:'Acima de R$ 4.664,68',aliq:'27,5%',ded:'R$ 896,00' }
            ].map(f=>`
              <div class="tax-band">
                <div><div class="font-semibold text-sm">${f.faixa}</div><div class="text-xs text-muted">${f.base}</div></div>
                <div style="text-align:right"><div class="font-bold text-primary-color">${f.aliq}</div><div class="text-xs text-muted">Dedução: ${f.ded}</div></div>
              </div>
            `).join('')}
            <div class="alert alert-info mt-3">
              <span>ℹ️</span>
              <span class="text-sm">Dedução por dependente: <strong>R$ 189,59/mês</strong>. Desconto simplificado: <strong>R$ 564,80/mês</strong>.</span>
            </div>
          </div>
        </div>
      </div>
    </div>`;
}

function switchFiscalTab(id, btn) {
  document.querySelectorAll('#fiscal-tabs .tab-btn').forEach(b=>b.classList.remove('active'));
  document.querySelectorAll('#fiscal-content .tab-content').forEach(t=>t.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('fiscal-'+id).classList.add('active');
}

function calcSimples() {
  const receita = parseFloat(document.getElementById('simples-receita')?.value)||0;
  const el = document.getElementById('simples-result');
  if (!el || receita<=0) { if(el) el.innerHTML=''; return; }

  // Simplified Simples Nacional Annex III calculation
  let aliq=0, ded=0;
  if (receita<=180000)      { aliq=0.06;  ded=0; }
  else if (receita<=360000) { aliq=0.112; ded=9360; }
  else if (receita<=720000) { aliq=0.135; ded=17640; }
  else if (receita<=1800000){ aliq=0.16;  ded=35640; }
  else if (receita<=3600000){ aliq=0.21;  ded=125640; }
  else                       { aliq=0.33;  ded=648000; }

  const efetiva = ((receita*aliq - ded)/receita)*100;
  const mensal  = (receita/12) * (efetiva/100);
  const anual   = receita * (efetiva/100);

  el.innerHTML = `
    <div class="alert alert-success">
      <div>
        <div class="font-bold mb-2">Resultado do Cálculo</div>
        <div class="stat-row"><span class="stat-label">Alíquota Nominal</span><span class="stat-value">${(aliq*100).toFixed(2)}%</span></div>
        <div class="stat-row"><span class="stat-label">Alíquota Efetiva</span><span class="stat-value text-primary-color">${efetiva.toFixed(2)}%</span></div>
        <div class="stat-row"><span class="stat-label">DAS Mensal Estimado</span><span class="stat-value text-danger">${fmt.currency(mensal)}</span></div>
        <div class="stat-row"><span class="stat-label">DAS Anual Estimado</span><span class="stat-value text-danger">${fmt.currency(anual)}</span></div>
      </div>
    </div>`;
}

function calcIRPF() {
  const rend = parseFloat(document.getElementById('irpf-rendimento')?.value)||0;
  const dep  = parseInt(document.getElementById('irpf-dep')?.value)||0;
  const inss = parseFloat(document.getElementById('irpf-inss')?.value)||0;
  const el   = document.getElementById('irpf-result');
  if (!el || rend<=0) { if(el) el.innerHTML=''; return; }

  const dedDep = dep * 189.59;
  const base   = Math.max(0, rend - inss - dedDep);

  let aliq=0, ded=0;
  if (base<=2259.20)      { aliq=0;     ded=0; }
  else if (base<=2826.65) { aliq=0.075; ded=169.44; }
  else if (base<=3751.05) { aliq=0.15;  ded=381.44; }
  else if (base<=4664.68) { aliq=0.225; ded=662.77; }
  else                     { aliq=0.275; ded=896.00; }

  const irBruto  = base * aliq - ded;
  const irLiq    = Math.max(0, irBruto);
  const liquido  = rend - inss - irLiq;

  el.innerHTML = `
    <div class="alert alert-info">
      <div style="width:100%">
        <div class="font-bold mb-2">Resultado IRPF</div>
        <div class="stat-row"><span class="stat-label">Base de Cálculo</span><span class="stat-value">${fmt.currency(base)}</span></div>
        <div class="stat-row"><span class="stat-label">Alíquota Aplicada</span><span class="stat-value">${(aliq*100).toFixed(1)}%</span></div>
        <div class="stat-row"><span class="stat-label">IRPF a Recolher</span><span class="stat-value text-danger">${fmt.currency(irLiq)}</span></div>
        <div class="stat-row"><span class="stat-label">Rendimento Líquido</span><span class="stat-value text-success">${fmt.currency(liquido)}</span></div>
      </div>
    </div>`;
}

function markImpostoPago(id) {
  const i = App.data.impostos.find(x=>x.id===id);
  if (!i) return;
  i.status = 'pago';
  renderFiscal();
  showToast('Imposto marcado como pago!', 'success');
}

function deleteNF(id) {
  if (!confirm('Excluir esta nota fiscal?')) return;
  App.data.notasFiscais = App.data.notasFiscais.filter(n=>n.id!==id);
  renderFiscal();
  showToast('Nota fiscal excluída', 'success');
}

function deleteImposto(id) {
  if (!confirm('Excluir este lançamento de imposto?')) return;
  App.data.impostos = App.data.impostos.filter(i=>i.id!==id);
  renderFiscal();
  showToast('Imposto excluído', 'success');
}

function viewNF(id) {
  const n = App.data.notasFiscais.find(x=>x.id===id);
  if (!n) return;
  const modal = document.getElementById('modal-view-nf');
  document.getElementById('nf-view-content').innerHTML = `
    <div style="border:2px solid var(--border);border-radius:var(--radius-lg);padding:24px;font-family:monospace">
      <div style="text-align:center;margin-bottom:20px">
        <div style="font-size:1.5rem;font-weight:800;color:var(--primary)">FinControl</div>
        <div style="font-size:.875rem;color:var(--text-muted)">NOTA FISCAL DE SERVIÇOS ELETRÔNICA</div>
        <div style="font-size:1.2rem;font-weight:700;margin-top:8px">${n.number}</div>
      </div>
      <div class="stat-row"><span class="stat-label">Cliente</span><span class="stat-value">${n.client}</span></div>
      <div class="stat-row"><span class="stat-label">Data de Emissão</span><span class="stat-value">${fmt.date(n.date)}</span></div>
      <div class="stat-row"><span class="stat-label">Tipo</span><span class="stat-value">Prestação de Serviços</span></div>
      <div class="stat-row"><span class="stat-label">Valor dos Serviços</span><span class="stat-value font-bold">${fmt.currency(n.value)}</span></div>
      <div class="stat-row"><span class="stat-label">ISS (5%)</span><span class="stat-value text-warning">${fmt.currency(n.iss)}</span></div>
      <div class="stat-row"><span class="stat-label">IR Retido (8%)</span><span class="stat-value text-danger">${fmt.currency(n.ir)}</span></div>
      <div class="stat-row" style="border-top:2px solid var(--border);padding-top:12px;margin-top:8px">
        <span class="stat-label font-bold">Valor Líquido</span>
        <span class="stat-value font-bold text-success">${fmt.currency(n.value - n.iss - n.ir)}</span>
      </div>
      <div style="margin-top:16px;padding:12px;background:var(--bg);border-radius:var(--radius);text-align:center">
        <span class="badge badge-${n.status==='emitida'?'primary':n.status==='paga'?'success':n.status==='pendente'?'warning':'gray'}" style="font-size:.9rem;padding:6px 16px">${n.status.toUpperCase()}</span>
      </div>
    </div>`;
  openModal('modal-view-nf');
}

/* ===================== CONTACTS ===================== */
function renderContacts() {
  const el = document.getElementById('contacts-content');
  if (!el) return;

  const clients   = App.data.contacts.filter(c=>c.type==='client');
  const suppliers = App.data.contacts.filter(c=>c.type==='supplier');

  el.innerHTML = `
    <div class="kpi-grid mb-6">
      <div class="kpi-card blue"><div class="kpi-top"><div class="kpi-icon blue">👥</div></div><div class="kpi-value">${clients.length}</div><div class="kpi-label">Clientes</div></div>
      <div class="kpi-card amber"><div class="kpi-top"><div class="kpi-icon amber">🏢</div></div><div class="kpi-value">${suppliers.length}</div><div class="kpi-label">Fornecedores</div></div>
      <div class="kpi-card green"><div class="kpi-top"><div class="kpi-icon green">💰</div></div><div class="kpi-value">${fmt.currency(clients.reduce((s,c)=>s+c.total,0))}</div><div class="kpi-label">Faturamento Clientes</div></div>
      <div class="kpi-card red"><div class="kpi-top"><div class="kpi-icon red">💸</div></div><div class="kpi-value">${fmt.currency(suppliers.reduce((s,c)=>s+c.total,0))}</div><div class="kpi-label">Custo Fornecedores</div></div>
    </div>
    <div class="card">
      <div class="card-header">
        <span class="card-title">Clientes & Fornecedores</span>
        <button class="btn btn-primary btn-sm" onclick="openContactModal()">+ Novo Contato</button>
      </div>
      <div class="card-body" style="padding:0">
        <div class="table-wrapper">
          <table>
            <thead><tr><th>Nome</th><th>Tipo</th><th>E-mail</th><th>Telefone</th><th>Total</th><th>Ações</th></tr></thead>
            <tbody>
              ${App.data.contacts.map(c=>`<tr>
                <td class="td-main">${c.name}</td>
                <td><span class="badge badge-${c.type==='client'?'primary':'warning'}">${c.type==='client'?'Cliente':'Fornecedor'}</span></td>
                <td class="text-sm">${c.email}</td>
                <td class="text-sm">${c.phone}</td>
                <td class="font-bold ${c.type==='client'?'text-success':'text-danger'}">${fmt.currency(c.total)}</td>
                <td><div class="flex gap-2">
                  <button class="btn btn-ghost btn-sm btn-icon" onclick="deleteContact(${c.id})">🗑️</button>
                </div></td>
              </tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>`;
}

function deleteContact(id) {
  if (!confirm('Excluir este contato?')) return;
  App.data.contacts = App.data.contacts.filter(c=>c.id!==id);
  renderContacts();
  showToast('Contato excluído', 'success');
}

/* ===================== SETTINGS ===================== */
function renderSettings() {
  const el = document.getElementById('settings-content');
  if (!el) return;

  el.innerHTML = `
    <div class="grid-2">
      <div class="card">
        <div class="card-header"><span class="card-title">👤 Perfil do Usuário</span></div>
        <div class="card-body">
          <div style="display:flex;align-items:center;gap:16px;margin-bottom:24px">
            <div class="user-avatar" style="width:64px;height:64px;font-size:1.4rem">JS</div>
            <div>
              <div class="font-bold">${App.user.name}</div>
              <div class="text-sm text-muted">${App.user.email}</div>
              <span class="badge badge-primary mt-1">Plano ${App.user.plan}</span>
            </div>
          </div>
          <div class="form-group"><label class="form-label">Nome Completo</label><input type="text" class="form-control" value="${App.user.name}" id="set-name"></div>
          <div class="form-group"><label class="form-label">E-mail</label><input type="email" class="form-control" value="${App.user.email}" id="set-email"></div>
          <div class="form-group"><label class="form-label">CPF/CNPJ</label><input type="text" class="form-control" placeholder="000.000.000-00"></div>
          <button class="btn btn-primary" onclick="saveSettings()">Salvar Alterações</button>
        </div>
      </div>
      <div class="card">
        <div class="card-header"><span class="card-title">🔒 Segurança</span></div>
        <div class="card-body">
          <div class="form-group"><label class="form-label">Senha Atual</label><input type="password" class="form-control" placeholder="••••••••"></div>
          <div class="form-group"><label class="form-label">Nova Senha</label><input type="password" class="form-control" placeholder="••••••••"></div>
          <div class="form-group"><label class="form-label">Confirmar Nova Senha</label><input type="password" class="form-control" placeholder="••••••••"></div>
          <button class="btn btn-outline" onclick="showToast('Senha alterada com sucesso!','success')">Alterar Senha</button>
        </div>
      </div>
      <div class="card">
        <div class="card-header"><span class="card-title">🏦 Contas Bancárias</span></div>
        <div class="card-body">
          ${['Conta Corrente','Cartão de Crédito','Poupança','Corretora'].map(a=>`
            <div class="stat-row">
              <div class="flex items-center gap-2"><span>🏦</span><span class="font-semibold text-sm">${a}</span></div>
              <button class="btn btn-ghost btn-sm">Editar</button>
            </div>
          `).join('')}
          <button class="btn btn-outline mt-3 w-full" onclick="showToast('Conta adicionada!','success')">+ Adicionar Conta</button>
        </div>
      </div>
      <div class="card">
        <div class="card-header"><span class="card-title">🔔 Notificações</span></div>
        <div class="card-body">
          ${[
            { label:'Vencimento de contas', desc:'Alerta 3 dias antes', checked:true },
            { label:'Metas atingidas',      desc:'Quando atingir 100%', checked:true },
            { label:'Orçamento excedido',   desc:'Ao ultrapassar o limite', checked:true },
            { label:'Relatório mensal',     desc:'Todo dia 1º do mês', checked:false },
            { label:'Novas notas fiscais',  desc:'Ao emitir NFS-e', checked:true }
          ].map((n,i)=>`
            <div class="stat-row">
              <div><div class="font-semibold text-sm">${n.label}</div><div class="text-xs text-muted">${n.desc}</div></div>
              <label style="position:relative;display:inline-block;width:44px;height:24px;cursor:pointer">
                <input type="checkbox" ${n.checked?'checked':''} style="opacity:0;width:0;height:0" onchange="showToast('Preferência salva','info')">
                <span style="position:absolute;inset:0;background:${n.checked?'var(--secondary)':'var(--border)'};border-radius:99px;transition:.2s"></span>
                <span style="position:absolute;top:2px;left:${n.checked?'22px':'2px'};width:20px;height:20px;background:#fff;border-radius:50%;transition:.2s;box-shadow:0 1px 3px rgba(0,0,0,.2)"></span>
              </label>
            </div>
          `).join('')}
        </div>
      </div>
    </div>`;
}

function saveSettings() {
  App.user.name  = document.getElementById('set-name')?.value  || App.user.name;
  App.user.email = document.getElementById('set-email')?.value || App.user.email;
  showToast('Configurações salvas com sucesso!', 'success');
}

/* ===================== MODALS ===================== */
function openModal(id) {
  const el = document.getElementById(id);
  if (el) { el.classList.add('open'); document.body.style.overflow='hidden'; }
}

function closeModal(id) {
  const el = document.getElementById(id);
  if (el) { el.classList.remove('open'); document.body.style.overflow=''; }
}

function openTransactionModal(tx, forceType) {
  const isEdit = !!tx;
  const type   = tx?.type || forceType || 'income';

  document.getElementById('tx-modal-title').textContent = isEdit ? 'Editar Lançamento' : (type==='income'?'Nova Receita':'Nova Despesa');
  document.getElementById('tx-id').value       = tx?.id || '';
  document.getElementById('tx-type').value     = tx?.type || type;
  document.getElementById('tx-desc').value     = tx?.desc || '';
  document.getElementById('tx-amount').value   = tx?.amount || '';
  document.getElementById('tx-date').value     = tx?.date || new Date().toISOString().split('T')[0];
  document.getElementById('tx-status').value   = tx?.status || 'confirmed';
  document.getElementById('tx-account').value  = tx?.account || 'Conta Corrente';

  // Populate category select
  const catSel = document.getElementById('tx-category');
  catSel.innerHTML = App.data.categories.filter(c=>c.type===(tx?.type||type)).map(c=>`<option value="${c.id}" ${tx?.category===c.id?'selected':''}>${c.icon} ${c.name}</option>`).join('');

  openModal('modal-transaction');
}

function saveTransaction() {
  const id     = document.getElementById('tx-id').value;
  const type   = document.getElementById('tx-type').value;
  const desc   = document.getElementById('tx-desc').value.trim();
  const amount = parseFloat(document.getElementById('tx-amount').value);
  const date   = document.getElementById('tx-date').value;
  const cat    = parseInt(document.getElementById('tx-category').value);
  const status = document.getElementById('tx-status').value;
  const acct   = document.getElementById('tx-account').value;

  if (!desc || isNaN(amount) || amount<=0 || !date) { showToast('Preencha todos os campos obrigatórios', 'error'); return; }

  if (id) {
    const t = App.data.transactions.find(x=>x.id===parseInt(id));
    if (t) { t.type=type; t.desc=desc; t.amount=amount; t.date=date; t.category=cat; t.status=status; t.account=acct; }
  } else {
    App.data.transactions.push({ id:genId(App.data.transactions), type, desc, amount, date, category:cat, status, account:acct });
  }

  closeModal('modal-transaction');
  renderPage(App.currentPage);
  showToast(id?'Lançamento atualizado!':'Lançamento adicionado!', 'success');
}

function openNFModal() {
  document.getElementById('nf-number').value  = `NFS-${String(App.data.notasFiscais.length+1).padStart(3,'0')}`;
  document.getElementById('nf-date').value    = new Date().toISOString().split('T')[0];
  document.getElementById('nf-client').value  = '';
  document.getElementById('nf-value').value   = '';
  openModal('modal-nf');
}

function saveNF() {
  const number = document.getElementById('nf-number').value.trim();
  const client = document.getElementById('nf-client').value.trim();
  const value  = parseFloat(document.getElementById('nf-value').value);
  const date   = document.getElementById('nf-date').value;

  if (!number || !client || isNaN(value) || value<=0 || !date) { showToast('Preencha todos os campos', 'error'); return; }

  App.data.notasFiscais.push({
    id: genId(App.data.notasFiscais), number, client, date, value,
    status: 'emitida', type: 'servico',
    iss: value * 0.05, ir: value * 0.08
  });

  closeModal('modal-nf');
  renderFiscal();
  showToast('Nota fiscal emitida com sucesso!', 'success');
}

function openImpostoModal() {
  document.getElementById('imp-name').value        = '';
  document.getElementById('imp-competencia').value = '';
  document.getElementById('imp-vencimento').value  = new Date().toISOString().split('T')[0];
  document.getElementById('imp-valor').value       = '';
  document.getElementById('imp-tipo').value        = 'federal';
  openModal('modal-imposto');
}

function saveImposto() {
  const name        = document.getElementById('imp-name').value.trim();
  const competencia = document.getElementById('imp-competencia').value.trim();
  const vencimento  = document.getElementById('imp-vencimento').value;
  const valor       = parseFloat(document.getElementById('imp-valor').value);
  const tipo        = document.getElementById('imp-tipo').value;

  if (!name || !competencia || !vencimento || isNaN(valor) || valor<=0) { showToast('Preencha todos os campos', 'error'); return; }

  App.data.impostos.push({ id:genId(App.data.impostos), name, competencia, vencimento, valor, tipo, status:'pendente' });
  closeModal('modal-imposto');
  renderFiscal();
  showToast('Imposto lançado com sucesso!', 'success');
}

function openBudgetModal() {
  openModal('modal-budget');
}

function saveBudget() {
  const cat   = parseInt(document.getElementById('bud-category').value);
  const limit = parseFloat(document.getElementById('bud-limit').value);
  if (isNaN(limit)||limit<=0) { showToast('Informe um valor válido','error'); return; }
  const existing = App.data.budgets.find(b=>b.category===cat);
  if (existing) { existing.limit=limit; } else { App.data.budgets.push({ id:genId(App.data.budgets), category:cat, limit, spent:0 }); }
  closeModal('modal-budget');
  renderBudget();
  showToast('Orçamento salvo!', 'success');
}

function openGoalModal() {
  openModal('modal-goal');
}

function saveGoal() {
  const name     = document.getElementById('goal-name').value.trim();
  const target   = parseFloat(document.getElementById('goal-target').value);
  const current  = parseFloat(document.getElementById('goal-current').value)||0;
  const deadline = document.getElementById('goal-deadline').value;
  const icon     = document.getElementById('goal-icon').value||'🎯';
  const color    = document.getElementById('goal-color').value||'#2563eb';

  if (!name||isNaN(target)||target<=0||!deadline) { showToast('Preencha todos os campos','error'); return; }
  App.data.goals.push({ id:genId(App.data.goals), name, target, current, deadline, icon, color });
  closeModal('modal-goal');
  renderGoals();
  showToast('Meta criada com sucesso!', 'success');
}

function openEventModal() {
  openModal('modal-event');
}

function saveEvent() {
  const title  = document.getElementById('ev-title').value.trim();
  const date   = document.getElementById('ev-date').value;
  const type   = document.getElementById('ev-type').value;
  const amount = parseFloat(document.getElementById('ev-amount').value);

  if (!title||!date||isNaN(amount)||amount<=0) { showToast('Preencha todos os campos','error'); return; }
  App.data.events.push({ id:genId(App.data.events), title, date, type, amount });
  closeModal('modal-event');
  renderAgenda();
  showToast('Evento adicionado!', 'success');
}

function openContactModal() {
  openModal('modal-contact');
}

function saveContact() {
  const name  = document.getElementById('con-name').value.trim();
  const type  = document.getElementById('con-type').value;
  const email = document.getElementById('con-email').value.trim();
  const phone = document.getElementById('con-phone').value.trim();
  if (!name) { showToast('Informe o nome','error'); return; }
  App.data.contacts.push({ id:genId(App.data.contacts), name, type, email, phone, total:0 });
  closeModal('modal-contact');
  renderContacts();
  showToast('Contato adicionado!', 'success');
}

/* ===================== TOAST ===================== */
function showToast(msg, type='info') {
  const icons = { success:'✅', error:'❌', warning:'⚠️', info:'ℹ️' };
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${icons[type]||'ℹ️'}</span><span>${msg}</span>`;
  container.appendChild(toast);
  setTimeout(() => { toast.style.opacity='0'; toast.style.transform='translateX(100%)'; toast.style.transition='.3s'; setTimeout(()=>toast.remove(), 300); }, 3000);
}

/* ===================== DROPDOWN ===================== */
function toggleDropdown(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const isOpen = el.classList.contains('open');
  document.querySelectorAll('.dropdown-menu.open').forEach(d=>d.classList.remove('open'));
  if (!isOpen) el.classList.add('open');
}

document.addEventListener('click', (e) => {
  if (!e.target.closest('.dropdown')) {
    document.querySelectorAll('.dropdown-menu.open').forEach(d=>d.classList.remove('open'));
  }
});

/* ===================== SIDEBAR TOGGLE ===================== */
function toggleSidebar() {
  const sidebar  = document.getElementById('sidebar');
  const overlay  = document.getElementById('sidebar-overlay');
  sidebar.classList.toggle('open');
  overlay.classList.toggle('open');
}

/* ===================== GLOBAL SEARCH ===================== */
function globalSearch(q) {
  if (!q.trim()) return;
  navigate('transactions');
  setTimeout(() => renderTransactions(q), 100);
}

/* ===================== INIT ===================== */
document.addEventListener('DOMContentLoaded', () => {
  seedData();
  navigate('dashboard');

  // Close modals on overlay click
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal(overlay.id);
    });
  });

  // Keyboard ESC closes modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.open').forEach(m => closeModal(m.id));
    }
  });

  // Sidebar overlay click
  document.getElementById('sidebar-overlay').addEventListener('click', () => {
    document.getElementById('sidebar').classList.remove('open');
    document.getElementById('sidebar-overlay').classList.remove('open');
  });

  // Topbar search
  const searchInput = document.querySelector('.topbar-search input');
  if (searchInput) {
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') globalSearch(e.target.value);
    });
  }
});
