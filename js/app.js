/**
 * FinControl - Core Logic
 * Persistência local, Controle de Acesso e Módulo Fiscal
 */

// 1. DATABASE & STORAGE
const db = {
  key: 'fincontrol_data',
  
  // Dados iniciais (Seed)
  seed: {
    transactions: [
      { id: 1, desc: 'Salário Mensal', amount: 8500, date: '2026-04-05', type: 'income', category: 1, status: 'confirmed', account: 'Conta Corrente' },
      { id: 2, desc: 'Aluguel', amount: 1800, date: '2026-04-10', type: 'expense', category: 5, status: 'confirmed', account: 'Conta Corrente' },
      { id: 3, desc: 'Supermercado', amount: 650, date: '2026-04-12', type: 'expense', category: 6, status: 'confirmed', account: 'Cartão de Crédito' },
      { id: 4, desc: 'Freelance Design', amount: 2200, date: '2026-04-15', type: 'income', category: 2, status: 'confirmed', account: 'Conta Corrente' },
      { id: 5, desc: 'Energia Elétrica', amount: 210, date: '2026-04-23', type: 'expense', category: 12, status: 'confirmed', account: 'Débito Automático' }
    ],
    categories: [
      { id: 1, name: 'Salário', icon: '💰', type: 'income', color: '#10b981' },
      { id: 2, name: 'Freelance', icon: '💻', type: 'income', color: '#3b82f6' },
      { id: 3, name: 'Investimentos', icon: '📈', type: 'income', color: '#8b5cf6' },
      { id: 4, name: 'Outros', icon: '✨', type: 'income', color: '#94a3b8' },
      { id: 5, name: 'Moradia', icon: '🏠', type: 'expense', color: '#ef4444' },
      { id: 6, name: 'Alimentação', icon: '🍽️', type: 'expense', color: '#f59e0b' },
      { id: 7, name: 'Transporte', icon: '🚗', type: 'expense', color: '#3b82f6' },
      { id: 8, name: 'Saúde', icon: '🏥', type: 'expense', color: '#10b981' },
      { id: 9, name: 'Educação', icon: '📚', type: 'expense', color: '#8b5cf6' },
      { id: 10, name: 'Lazer', icon: '🎮', type: 'expense', color: '#ec4899' },
      { id: 11, name: 'Impostos', icon: '📋', type: 'expense', color: '#64748b' },
      { id: 12, name: 'Serviços', icon: '⚡', type: 'expense', color: '#06b6d4' }
    ],
    goals: [
      { id: 1, name: 'Reserva de Emergência', target: 30000, current: 18500, deadline: '2027-06-01', icon: '🛡️', color: '#10b981' },
      { id: 2, name: 'Viagem Europa', target: 15000, current: 4200, deadline: '2027-12-01', icon: '✈️', color: '#3b82f6' }
    ],
    nfs: [
      { id: 1, number: 'NFS-001', client: 'Tech Solutions Ltda', date: '2026-04-08', value: 2200, iss: 110, ir: 176, status: 'Emitida', desc: 'Consultoria em TI' }
    ],
    taxes: [
      { id: 1, name: 'DAS Simples', competencia: 'Mar/2026', vencimento: '2026-04-20', valor: 450.50, status: 'pago', tipo: 'federal' },
      { id: 2, name: 'ISS Municipal', competencia: 'Abr/2026', vencimento: '2026-05-10', valor: 110.00, status: 'pendente', tipo: 'municipal' }
    ],
    budgets: [
      { categoryId: 6, limit: 1200 },
      { categoryId: 10, limit: 500 }
    ]
  },

  init() {
    const saved = localStorage.getItem(this.key);
    if (saved) {
      App.data = JSON.parse(saved);
    } else {
      App.data = JSON.parse(JSON.stringify(this.seed));
      this.save();
    }
  },

  save() {
    localStorage.setItem(this.key, JSON.stringify(App.data));
  },

  exportBackup() {
    const dataStr = JSON.stringify(App.data, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fincontrol_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Backup exportado com sucesso!', 'success');
  },

  importBackup(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target.result);
        if (importedData.transactions && importedData.categories) {
          App.data = importedData;
          this.save();
          showToast('Dados restaurados com sucesso!', 'success');
          setTimeout(() => location.reload(), 1500);
        } else {
          throw new Error('Formato inválido');
        }
      } catch (err) {
        showToast('Erro ao importar backup. Arquivo inválido.', 'danger');
      }
    };
    reader.readAsText(file);
  }
};

// 2. AUTHENTICATION (RBAC)
const auth = {
  currentUser: null,
  
  login() {
    const user = document.getElementById('login-user').value.toLowerCase();
    const pass = document.getElementById('login-pass').value;
    const errorEl = document.getElementById('login-error');

    if ((user === 'admin' && pass === 'admin') || (user === 'operador' && pass === 'operador')) {
      this.currentUser = {
        name: user === 'admin' ? 'Administrador' : 'Operador',
        role: user,
        avatar: user.substring(0,2).toUpperCase()
      };
      
      localStorage.setItem('fincontrol_session', JSON.stringify(this.currentUser));
      this.applyPermissions();
      
      document.getElementById('login-screen').style.display = 'none';
      document.getElementById('app').style.display = 'flex';
      
      showToast(`Bem-vindo, ${this.currentUser.name}!`, 'success');
      App.init();
    } else {
      errorEl.style.display = 'block';
    }
  },

  logout() {
    localStorage.removeItem('fincontrol_session');
    location.reload();
  },

  checkSession() {
    const session = localStorage.getItem('fincontrol_session');
    if (session) {
      this.currentUser = JSON.parse(session);
      this.applyPermissions();
      document.getElementById('login-screen').style.display = 'none';
      document.getElementById('app').style.display = 'flex';
      App.init();
    }
  },

  applyPermissions() {
    const body = document.body;
    if (this.currentUser.role === 'admin') {
      body.classList.add('is-admin');
    } else {
      body.classList.remove('is-admin');
    }
    
    // Update user info in sidebar
    document.querySelector('.user-name').textContent = this.currentUser.name;
    document.querySelector('.user-role').textContent = this.currentUser.role === 'admin' ? 'Acesso Total' : 'Operador';
    document.querySelector('.user-avatar').textContent = this.currentUser.avatar;
  }
};

// 3. CORE APPLICATION
const App = {
  data: {},
  currentPage: 'dashboard',
  charts: {},

  init() {
    db.init();
    this.renderPage('dashboard');
    this.updateKPIs();
    this.renderCharts();
    this.renderRecentTransactions();
  },

  updateKPIs() {
    const income = this.data.transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const expense = this.data.transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
    const balance = income - expense;
    const savings = income > 0 ? ((income - expense) / income * 100).toFixed(1) : 0;

    document.getElementById('kpi-balance').textContent = fmt.currency(balance);
    document.getElementById('kpi-income').textContent = fmt.currency(income);
    document.getElementById('kpi-expense').textContent = fmt.currency(expense);
    document.getElementById('kpi-savings').textContent = savings + '%';
  },

  renderRecentTransactions() {
    const tbody = document.getElementById('dash-recent-tbody');
    if (!tbody) return;
    
    const recent = [...this.data.transactions]
      .sort((a,b) => new Date(b.date) - new Date(a.date))
      .slice(0, 6);

    tbody.innerHTML = recent.map(t => {
      const cat = getCat(t.category);
      return `<tr>
        <td><span class="cat-icon-small" style="background:${cat.color}20; color:${cat.color}">${cat.icon}</span></td>
        <td><span class="td-main">${t.desc}</span></td>
        <td>${fmt.date(t.date)}</td>
        <td><span class="badge badge-${t.type==='income'?'success':'danger'}">${t.type==='income'?'Receita':'Despesa'}</span></td>
        <td class="font-bold ${t.type==='income'?'text-success':'text-danger'}">${t.type==='income'?'+':'−'}${fmt.currency(t.amount)}</td>
      </tr>`;
    }).join('');
  },

  renderCharts() {
    // Cleanup old charts
    Object.values(this.charts).forEach(c => c.destroy());

    // 1. Bar Chart (Receitas vs Despesas)
    const ctxBar = document.getElementById('chart-bar');
    if (ctxBar) {
      this.charts.bar = new Chart(ctxBar, {
        type: 'bar',
        data: {
          labels: ['Nov', 'Dez', 'Jan', 'Fev', 'Mar', 'Abr'],
          datasets: [
            { label: 'Receitas', data: [7500, 8200, 6800, 9100, 8500, 14580], backgroundColor: '#10b981', borderRadius: 4 },
            { label: 'Despesas', data: [4200, 5100, 4800, 5600, 5300, 4888], backgroundColor: '#ef4444', borderRadius: 4 }
          ]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'top' } } }
      });
    }

    // 2. Donut Chart (Categorias)
    const ctxDonut = document.getElementById('chart-donut');
    if (ctxDonut) {
      const expenses = this.data.transactions.filter(t => t.type === 'expense');
      const catTotals = {};
      expenses.forEach(t => {
        const cat = getCat(t.category).name;
        catTotals[cat] = (catTotals[cat] || 0) + t.amount;
      });

      this.charts.donut = new Chart(ctxDonut, {
        type: 'doughnut',
        data: {
          labels: Object.keys(catTotals),
          datasets: [{
            data: Object.values(catTotals),
            backgroundColor: ['#ef4444', '#f59e0b', '#3b82f6', '#10b981', '#8b5cf6', '#06b6d4', '#64748b', '#ec4899']
          }]
        },
        options: { responsive: true, maintainAspectRatio: false, cutout: '70%' }
      });
    }
  },

  renderPage(pageId) {
    this.currentPage = pageId;
    
    // Update Sidebar
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    const activeNav = document.querySelector(`.nav-item[data-page="${pageId}"]`);
    if (activeNav) activeNav.classList.add('active');

    // Update Title
    const titles = { 
      dashboard: 'Dashboard', transactions: 'Lançamentos', income: 'Receitas', 
      expenses: 'Despesas', budget: 'Orçamento', goals: 'Metas', 
      agenda: 'Agenda Financeira', reports: 'Relatórios', fiscal: 'Módulo Fiscal',
      contacts: 'Clientes & Fornecedores', settings: 'Configurações', backup: 'Backup'
    };
    document.getElementById('page-title').textContent = titles[pageId] || 'FinControl';

    // Show/Hide Pages
    document.querySelectorAll('.page-content').forEach(el => el.classList.remove('active'));
    const pageEl = document.getElementById(`page-${pageId}`);
    if (pageEl) pageEl.classList.add('active');

    // Special renders
    if (pageId === 'transactions') renderTransactions();
    if (pageId === 'fiscal') renderFiscal();
    if (pageId === 'budget') renderBudget();
    if (pageId === 'goals') renderGoals();
    if (pageId === 'agenda') renderAgenda();
  }
};

// 4. FISCAL MODULE (REAL LOGIC)
function renderFiscal() {
  const container = document.getElementById('fiscal-content');
  container.innerHTML = `
    <div class="fiscal-tabs mb-4">
      <button class="btn btn-ghost active" onclick="switchFiscalTab('nfs')">Notas Fiscais</button>
      <button class="btn btn-ghost" onclick="switchFiscalTab('taxes')">Impostos & Tributos</button>
      <button class="btn btn-ghost" onclick="switchFiscalTab('simples')">Simples Nacional</button>
      <button class="btn btn-ghost" onclick="switchFiscalTab('irpf')">IRPF 2025</button>
    </div>
    <div id="fiscal-tab-content"></div>
  `;
  switchFiscalTab('nfs');
}

function switchFiscalTab(tab) {
  const content = document.getElementById('fiscal-tab-content');
  document.querySelectorAll('.fiscal-tabs .btn').forEach(b => b.classList.remove('active'));
  if (event) event.target.classList.add('active');

  if (tab === 'nfs') {
    content.innerHTML = `
      <div class="card">
        <div class="card-header flex justify-between">
          <span class="card-title">Notas Fiscais de Serviço</span>
          <button class="btn btn-primary btn-sm" onclick="openModal('modal-nf')">+ Emitir NFS-e</button>
        </div>
        <div class="table-wrapper">
          <table>
            <thead>
              <tr><th>Número</th><th>Cliente</th><th>Data</th><th>Valor</th><th>ISS</th><th>Status</th><th>Ações</th></tr>
            </thead>
            <tbody>
              ${App.data.nfs.map(nf => `
                <tr>
                  <td><b>${nf.number}</b></td>
                  <td>${nf.client}</td>
                  <td>${fmt.date(nf.date)}</td>
                  <td>${fmt.currency(nf.value)}</td>
                  <td class="text-danger">-${fmt.currency(nf.iss)}</td>
                  <td><span class="badge badge-${nf.status==='Emitida'?'success':'warning'}">${nf.status}</span></td>
                  <td><button class="btn btn-ghost btn-sm" onclick="viewNF(${nf.id})">👁️</button></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  } else if (tab === 'simples') {
    content.innerHTML = `
      <div class="grid-2">
        <div class="card">
          <div class="card-header"><span class="card-title">Calculadora Simples Nacional</span></div>
          <div class="card-body">
            <div class="form-group">
              <label class="form-label">Receita Bruta Acumulada (12 meses)</label>
              <input type="number" id="simples-receita" class="form-control" placeholder="Ex: 240000" oninput="calcSimples()">
            </div>
            <div id="simples-result" class="mt-4"></div>
          </div>
        </div>
        <div class="card">
          <div class="card-header"><span class="card-title">Tabela Anexo III (Serviços)</span></div>
          <div class="card-body font-sm">
            <div class="stat-row"><span>Até R$ 180.000</span><span>6.00%</span></div>
            <div class="stat-row"><span>Até R$ 360.000</span><span>11.20%</span></div>
            <div class="stat-row"><span>Até R$ 720.000</span><span>13.50%</span></div>
          </div>
        </div>
      </div>
    `;
  }
}

function calcSimples() {
  const rbt12 = parseFloat(document.getElementById('simples-receita').value) || 0;
  let aliqNominal = 0, deducao = 0;

  if (rbt12 <= 180000) { aliqNominal = 0.06; deducao = 0; }
  else if (rbt12 <= 360000) { aliqNominal = 0.112; deducao = 9360; }
  else if (rbt12 <= 720000) { aliqNominal = 0.135; deducao = 17640; }
  else { aliqNominal = 0.16; deducao = 35640; }

  const aliqEfetiva = rbt12 > 0 ? ((rbt12 * aliqNominal - deducao) / rbt12) : 0.06;
  const res = document.getElementById('simples-result');
  res.innerHTML = `
    <div class="alert alert-info">
      <p>Alíquota Efetiva: <b>${(aliqEfetiva * 100).toFixed(2)}%</b></p>
      <p>DAS Estimado (Mensal): <b>${fmt.currency(rbt12/12 * aliqEfetiva)}</b></p>
    </div>
  `;
}

// 5. UTILS
const fmt = {
  currency: (v) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v),
  date: (d) => d.split('-').reverse().join('/')
};

function getCat(id) { return App.data.categories.find(c => c.id == id) || App.data.categories[0]; }

function navigate(page) { App.renderPage(page); }

function toggleSidebar() { document.getElementById('sidebar').classList.toggle('active'); }

function showToast(msg, type='info') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = msg;
  document.getElementById('toast-container').appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

function openModal(id) { document.getElementById(id).classList.add('active'); }
function closeModal(id) { document.getElementById(id).classList.remove('active'); }

// Init on load
window.onload = () => {
  auth.checkSession();
};
