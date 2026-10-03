/**
 * LifeOS Personal Dashboard - PWA Client Logic
 * Handles Projects, Fitness Tracker, School Deadlines, Habits, and Offline Storage.
 */

// Storage Key
const STORAGE_KEY = 'lifeos_dashboard_v1';

// Default Sample Data
const DEFAULT_DATA = {
  user: {
    name: 'Tomáš',
    gymWeeklyGoal: 4,
    theme: 'dark'
  },
  gym: {
    split: [
      { day: 1, dayName: 'Pondělí', focus: 'Push (Hrudník, Ramena, Triceps)', rest: false },
      { day: 2, dayName: 'Úterý', focus: 'Pull (Záda, Biceps, Zadní ramena)', rest: false },
      { day: 3, dayName: 'Středa', focus: 'Odpočinek / Regenerace', rest: true },
      { day: 4, dayName: 'Čtvrtek', focus: 'Legs (Dřepy, Hamstringy, Lýtka)', rest: false },
      { day: 5, dayName: 'Pátek', focus: 'Vrchní tělo / Slabiny', rest: false },
      { day: 6, dayName: 'Sobota', focus: 'Kardio / Běh / Procházka', rest: false },
      { day: 0, dayName: 'Neděle', focus: 'Rest day & Příprava na týden', rest: true }
    ],
    logs: [
      {
        id: 'log_1',
        date: getRelativeDateStr(-2),
        type: 'Push',
        duration: 65,
        rating: 5,
        exercises: 'Bench press: 4x8 (80 kg)\nIncline DB Press: 3x10 (28 kg)\nTlaky na ramena: 4x10 (22 kg)\nTriceps lano na kladce: 3x15'
      },
      {
        id: 'log_2',
        date: getRelativeDateStr(-1),
        type: 'Pull',
        duration: 70,
        rating: 4,
        exercises: 'Shyby: 4x8 (vlastní váha)\nMrtvý tah: 3x6 (120 kg)\nPřítahy činky v předklonu: 4x10 (60 kg)\nBiceps velká činka: 3x12 (30 kg)'
      }
    ]
  },
  projects: [
    {
      id: 'proj_1',
      title: 'Osobní PWA Dashboard',
      description: 'Vývoj moderního osobního dashboardu s offline podporou, sledováním tréninků a školy.',
      category: 'Frontend / PWA',
      status: 'in_progress',
      progress: 75,
      deadline: getRelativeDateStr(5),
      url: 'https://github.com',
      tasks: [
        { id: 't1', text: 'Návrh UI a responzivních layoutů', done: true },
        { id: 't2', text: 'Implementace Service Workera a PWA', done: true },
        { id: 't3', text: 'Lokální synchronizace a export JSON', done: true },
        { id: 't4', text: 'Testování instalace na mobilu', done: false }
      ]
    },
    {
      id: 'proj_2',
      title: 'Semestrální aplikace do školy',
      description: 'Backend v Node.js/C# s relační databází a REST API.',
      category: 'Škola / Backend',
      status: 'in_progress',
      progress: 40,
      deadline: getRelativeDateStr(14),
      url: '',
      tasks: [
        { id: 't21', text: 'ERD schéma databáze', done: true },
        { id: 't22', text: 'Autentizace uživatelů (JWT)', done: false },
        { id: 't23', text: 'CRUD endpointy pro produkty', done: false }
      ]
    },
    {
      id: 'proj_3',
      title: 'Optimalizace tréninkového plánu & Strava',
      description: 'Příprava jídelníčku na objem a sledování progresivního přetížení ve fitku.',
      category: 'Osobní',
      status: 'planned',
      progress: 20,
      deadline: getRelativeDateStr(25),
      url: '',
      tasks: [
        { id: 't31', text: 'Výpočet denního kalorického příjmu', done: true },
        { id: 't32', text: 'Nákupní seznam suplementů', done: false }
      ]
    }
  ],
  school: [
    {
      id: 'sch_1',
      subject: 'Databázové systémy',
      title: 'Odevzdání konceptuálního modelu (ERD)',
      type: 'Semestrálka',
      deadline: getRelativeDateStr(3),
      priority: 'high',
      status: 'in_progress',
      notes: 'Zkontrolovat kardinality a normalizaci do 3NF. Odevzdat PDF do školního systému.'
    },
    {
      id: 'sch_2',
      subject: 'Matematická analýza',
      title: 'První zápočtový test (Derivace a integrály)',
      type: 'Zápočet',
      deadline: getRelativeDateStr(6),
      priority: 'high',
      status: 'pending',
      notes: 'Procvičit substituce a per-partes. Potřeba získat min. 15 bodů ze 20.'
    },
    {
      id: 'sch_3',
      subject: 'Softwarové inženýrství',
      title: 'Prezentace architektury projektu',
      type: 'Prezentace',
      deadline: getRelativeDateStr(11),
      priority: 'medium',
      status: 'pending',
      notes: 'Připravit 10 slidů s UML diagramy komponent.'
    },
    {
      id: 'sch_4',
      subject: 'Anglický jazyk B2',
      title: 'Esej: Tech trends in 2026',
      type: 'Domácí úkol',
      deadline: getRelativeDateStr(-3),
      priority: 'low',
      status: 'done',
      notes: 'Splněno v minulém týdnu.'
    }
  ],
  habits: [
    { id: 'h_gym', text: 'Trénink ve fitku / sport' },
    { id: 'h_study', text: 'Učení do školy (min. 45 min)' },
    { id: 'h_code', text: 'Práce na projektu / programování' },
    { id: 'h_water', text: 'Vypít 2.5 litru čisté vody' },
    { id: 'h_sleep', text: 'Kvalitní spánek 7 - 8 hodin' }
  ],
  habitLogs: {}
};

// Helper: relative ISO date YYYY-MM-DD
function getRelativeDateStr(daysOffset) {
  const d = new Date();
  d.setDate(d.getDate() + daysOffset);
  return d.toISOString().split('T')[0];
}

function getTodayStr() {
  return new Date().toISOString().split('T')[0];
}

// App State
let state = loadState();
let deferredPrompt = null;
let currentProjectFilter = 'all';
let currentSchoolFilter = 'pending';

// State Management
function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      // Ensure structure integrity
      return {
        ...DEFAULT_DATA,
        ...parsed,
        user: { ...DEFAULT_DATA.user, ...(parsed.user || {}) },
        gym: { ...DEFAULT_DATA.gym, ...(parsed.gym || {}) },
        habitLogs: parsed.habitLogs || {}
      };
    }
  } catch (err) {
    console.error('Error loading data from localStorage:', err);
  }
  return JSON.parse(JSON.stringify(DEFAULT_DATA));
}

function saveState(skipRemoteSync = false) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error('Failed to save state:', err);
  }
  if (!skipRemoteSync && typeof debouncePushToSupabase === 'function' && supabaseClient && currentUser) {
    debouncePushToSupabase();
  }
}

// ==========================================================================
// INITIALIZATION
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initClock();
  initNavigation();
  initPWA();
  initHabitsToday();
  renderAllViews();
  setupEventListeners();
  initSupabase();
});

// ==========================================================================
// CLOCK & GREETING
// ==========================================================================
function initClock() {
  updateClock();
  setInterval(updateClock, 1000);
}

function updateClock() {
  const now = new Date();
  
  // Date format Czech
  const dateOptions = { weekday: 'long', day: 'numeric', month: 'long' };
  const dateString = now.toLocaleDateString('cs-CZ', dateOptions);
  // Capitalize first letter
  const formattedDate = dateString.charAt(0).toUpperCase() + dateString.slice(1);
  
  const timeString = now.toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit' });

  const dateEl = document.getElementById('current-date');
  const timeEl = document.getElementById('current-time');
  if (dateEl) dateEl.textContent = formattedDate;
  if (timeEl) timeEl.textContent = timeString;

  // Greeting based on hour
  const hours = now.getHours();
  let greeting = 'Ahoj';
  if (hours >= 5 && hours < 12) greeting = 'Dobré ráno';
  else if (hours >= 12 && hours < 18) greeting = 'Dobré odpoledne';
  else if (hours >= 18 && hours < 22) greeting = 'Dobrý večer';
  else greeting = 'Klidnou noc';

  const userName = state.user?.name || 'Tome';
  const greetingEl = document.getElementById('greeting-title');
  if (greetingEl) {
    greetingEl.textContent = `${greeting}, ${userName}! 👋`;
  }
}

// ==========================================================================
// THEME
// ==========================================================================
function initTheme() {
  const theme = state.user.theme || 'dark';
  applyTheme(theme);

  const toggleBtn = document.getElementById('theme-toggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const nextTheme = state.user.theme === 'dark' ? 'light' : 'dark';
      state.user.theme = nextTheme;
      saveState();
      applyTheme(nextTheme);
    });
  }
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const sunIcon = document.getElementById('theme-icon-sun');
  const moonIcon = document.getElementById('theme-icon-moon');
  if (sunIcon && moonIcon) {
    if (theme === 'dark') {
      sunIcon.classList.remove('hidden');
      moonIcon.classList.add('hidden');
    } else {
      sunIcon.classList.add('hidden');
      moonIcon.classList.remove('hidden');
    }
  }
}

// ==========================================================================
// NAVIGATION (Sidebar, Bottom Nav & Tab switching)
// ==========================================================================
function initNavigation() {
  const allNavButtons = document.querySelectorAll('[data-tab]');
  allNavButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const tabId = btn.getAttribute('data-tab');
      switchTab(tabId);
    });
  });

  // Jump from metrics cards
  const jumpCards = document.querySelectorAll('[data-tab-jump]');
  jumpCards.forEach(card => {
    card.addEventListener('click', () => {
      const targetTab = card.getAttribute('data-tab-jump');
      switchTab(targetTab);
    });
  });

  // Mobile drawer toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const sidebar = document.getElementById('sidebar');
  if (mobileMenuBtn && sidebar) {
    mobileMenuBtn.addEventListener('click', () => {
      sidebar.classList.toggle('mobile-open');
    });

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
      if (sidebar.classList.contains('mobile-open') &&
          !sidebar.contains(e.target) &&
          !mobileMenuBtn.contains(e.target)) {
        sidebar.classList.remove('mobile-open');
      }
    });
  }
}

function switchTab(tabId) {
  // Update view contents
  const allContents = document.querySelectorAll('.tab-content');
  allContents.forEach(content => content.classList.remove('active'));

  const targetContent = document.getElementById(`view-${tabId}`);
  if (targetContent) {
    targetContent.classList.add('active');
  }

  // Update Nav Buttons active state
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId);
  });
  document.querySelectorAll('.bottom-nav-item').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId);
  });

  // Close mobile sidebar if open
  const sidebar = document.getElementById('sidebar');
  if (sidebar) sidebar.classList.remove('mobile-open');

  // Scroll to top
  const container = document.querySelector('.content-container');
  if (container) container.scrollTop = 0;
}

// ==========================================================================
// HABITS TODAY
// ==========================================================================
function initHabitsToday() {
  const today = getTodayStr();
  if (!state.habitLogs[today]) {
    state.habitLogs[today] = [];
  }
}

function toggleHabit(habitId) {
  const today = getTodayStr();
  if (!state.habitLogs[today]) state.habitLogs[today] = [];

  const index = state.habitLogs[today].indexOf(habitId);
  if (index > -1) {
    state.habitLogs[today].splice(index, 1);
  } else {
    state.habitLogs[today].push(habitId);
  }

  saveState();
  renderHabitsWidget();
  updateMetrics();
}

// ==========================================================================
// RENDER VIEWS
// ==========================================================================
function renderAllViews() {
  renderOverview();
  renderProjects();
  renderGym();
  renderSchool();
  renderSettings();
  updateMetrics();
  updateSidebarBadges();
}

// Update Top KPI Metrics
function updateMetrics() {
  // 1. Projects
  const inProgressProjects = state.projects.filter(p => p.status === 'in_progress').length;
  const avgProgress = state.projects.length > 0 
    ? Math.round(state.projects.reduce((acc, p) => acc + (p.progress || 0), 0) / state.projects.length) 
    : 0;
  
  const metricProjCount = document.getElementById('metric-projects-count');
  const metricProjSub = document.getElementById('metric-projects-sub');
  const metricProjBar = document.getElementById('metric-projects-bar');
  if (metricProjCount) metricProjCount.textContent = inProgressProjects;
  if (metricProjSub) metricProjSub.textContent = `průměr ${avgProgress}%`;
  if (metricProjBar) metricProjBar.style.width = `${avgProgress}%`;

  // 2. Gym this week
  const workoutsThisWeek = getWorkoutsThisWeekCount();
  const goal = state.user?.gymWeeklyGoal || 4;
  const gymPct = Math.min(100, Math.round((workoutsThisWeek / goal) * 100));

  const metricGymCount = document.getElementById('metric-gym-count');
  const metricGymBar = document.getElementById('metric-gym-bar');
  if (metricGymCount) metricGymCount.textContent = `${workoutsThisWeek} / ${goal}`;
  if (metricGymBar) metricGymBar.style.width = `${gymPct}%`;

  // 3. School Deadlines
  const pendingSchool = state.school.filter(s => s.status !== 'done');
  const urgentCount = pendingSchool.filter(s => getDaysRemaining(s.deadline) <= 7 && getDaysRemaining(s.deadline) >= 0).length;

  const metricSchoolPending = document.getElementById('metric-school-pending');
  const metricSchoolUrgent = document.getElementById('metric-school-urgent');
  const metricSchoolBar = document.getElementById('metric-school-bar');
  if (metricSchoolPending) metricSchoolPending.textContent = pendingSchool.length;
  if (metricSchoolUrgent) metricSchoolUrgent.textContent = `${urgentCount} tento týden`;
  if (metricSchoolBar) {
    const doneRatio = state.school.length > 0 
      ? Math.round(((state.school.length - pendingSchool.length) / state.school.length) * 100) 
      : 100;
    metricSchoolBar.style.width = `${doneRatio}%`;
  }

  // 4. Habits Today
  const today = getTodayStr();
  const doneHabits = (state.habitLogs[today] || []).length;
  const totalHabits = state.habits.length;
  const habitPct = totalHabits > 0 ? Math.round((doneHabits / totalHabits) * 100) : 0;

  const metricHabitsCount = document.getElementById('metric-habits-count');
  const metricHabitsPct = document.getElementById('metric-habits-pct');
  const metricHabitsBar = document.getElementById('metric-habits-bar');
  if (metricHabitsCount) metricHabitsCount.textContent = `${doneHabits} / ${totalHabits}`;
  if (metricHabitsPct) metricHabitsPct.textContent = `${habitPct} %`;
  if (metricHabitsBar) metricHabitsBar.style.width = `${habitPct}%`;
}

function updateSidebarBadges() {
  const sidebarProjects = document.getElementById('sidebar-projects-count');
  const sidebarGym = document.getElementById('sidebar-gym-streak');
  const sidebarSchool = document.getElementById('sidebar-school-count');

  if (sidebarProjects) {
    sidebarProjects.textContent = state.projects.filter(p => p.status === 'in_progress').length;
  }
  if (sidebarGym) {
    const done = getWorkoutsThisWeekCount();
    const goal = state.user?.gymWeeklyGoal || 4;
    sidebarGym.textContent = `${done}/${goal}`;
  }
  if (sidebarSchool) {
    sidebarSchool.textContent = state.school.filter(s => s.status !== 'done').length;
  }
}

// ==========================================================================
// 1. OVERVIEW RENDERING
// ==========================================================================
function renderOverview() {
  renderTodayGymWidget();
  renderHabitsWidget();
  renderOverviewDeadlines();
  renderOverviewProjects();
}

function renderTodayGymWidget() {
  const now = new Date();
  const dayIndex = now.getDay(); // 0 is Sunday, 1 is Monday...
  
  const splitDay = state.gym.split.find(s => s.day === dayIndex) || { dayName: 'Dnes', focus: 'Odpočinek', rest: true };
  const todayStr = getTodayStr();
  const isCompletedToday = state.gym.logs.some(l => l.date === todayStr);

  const titleEl = document.getElementById('today-split-title');
  const descEl = document.getElementById('today-split-desc');
  const boxEl = document.getElementById('today-workout-box');
  const btnEl = document.getElementById('btn-toggle-today-workout');
  const btnLabel = document.getElementById('today-workout-btn-label');
  const badgeDay = document.getElementById('today-day-name');

  if (badgeDay) badgeDay.textContent = splitDay.dayName;
  if (titleEl) titleEl.textContent = splitDay.focus;
  if (descEl) descEl.textContent = splitDay.rest ? 'Regenerace a doplnění sil' : 'Naplánovaný trénink pro dnešní den';

  if (boxEl) {
    boxEl.classList.toggle('completed', isCompletedToday);
  }

  if (btnLabel && btnEl) {
    if (isCompletedToday) {
      btnLabel.textContent = 'Dnes odcvičeno ✓';
      btnEl.classList.remove('btn-accent');
      btnEl.classList.add('btn-secondary');
    } else {
      btnLabel.textContent = splitDay.rest ? 'Zaznamenat cvičení' : 'Označit odcvičeno';
      btnEl.classList.add('btn-accent');
      btnEl.classList.remove('btn-secondary');
    }
  }
}

function renderHabitsWidget() {
  const container = document.getElementById('overview-habits-list');
  const counterText = document.getElementById('habits-counter-text');
  if (!container) return;

  const today = getTodayStr();
  const doneList = state.habitLogs[today] || [];

  if (counterText) {
    counterText.textContent = `${doneList.length} z ${state.habits.length} splněno`;
  }

  if (state.habits.length === 0) {
    container.innerHTML = '<p class="text-muted text-sm">Zatím žádné denní návyky. Přidej si nový!</p>';
    return;
  }

  container.innerHTML = state.habits.map(habit => {
    const isDone = doneList.includes(habit.id);
    return `
      <div class="habit-item ${isDone ? 'done' : ''}" data-habit-id="${habit.id}">
        <div class="habit-left">
          <div class="custom-checkbox">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <span class="habit-text">${escapeHtml(habit.text)}</span>
        </div>
      </div>
    `;
  }).join('');

  // Attach click events
  container.querySelectorAll('.habit-item').forEach(item => {
    item.addEventListener('click', () => {
      const habitId = item.getAttribute('data-habit-id');
      toggleHabit(habitId);
    });
  });
}

function renderOverviewDeadlines() {
  const container = document.getElementById('overview-deadlines-list');
  if (!container) return;

  // Filter not done, sort by deadline ascending
  const items = state.school
    .filter(s => s.status !== 'done')
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
    .slice(0, 4);

  if (items.length === 0) {
    container.innerHTML = '<p class="text-muted text-sm">Všechny školní úkoly máš splněné! 🎉</p>';
    return;
  }

  container.innerHTML = items.map(item => {
    const days = getDaysRemaining(item.deadline);
    let countdownBadgeClass = 'warning';
    let countdownText = `Za ${days} dní`;

    if (days < 0) {
      countdownBadgeClass = 'danger';
      countdownText = 'Po termínu!';
    } else if (days === 0) {
      countdownBadgeClass = 'danger';
      countdownText = 'Dnes!';
    } else if (days === 1) {
      countdownBadgeClass = 'warning';
      countdownText = 'Zítra!';
    }

    return `
      <div class="urgent-item ${days <= 1 ? 'danger' : ''}">
        <div class="urgent-details">
          <span class="urgent-subject">${escapeHtml(item.subject)} • ${escapeHtml(item.type)}</span>
          <span class="urgent-title">${escapeHtml(item.title)}</span>
        </div>
        <span class="urgent-countdown ${countdownBadgeClass}">${countdownText}</span>
      </div>
    `;
  }).join('');
}

function renderOverviewProjects() {
  const container = document.getElementById('overview-projects-list');
  if (!container) return;

  const items = state.projects.filter(p => p.status === 'in_progress').slice(0, 3);
  if (items.length === 0) {
    container.innerHTML = '<p class="text-muted text-sm">Žádný projekt v řešení. Můžeš založit nový!</p>';
    return;
  }

  container.innerHTML = items.map(proj => {
    return `
      <div class="overview-project-row">
        <div class="overview-project-top">
          <span class="overview-project-title">${escapeHtml(proj.title)}</span>
          <span class="badge badge-indigo">${proj.progress || 0}%</span>
        </div>
        <div class="progress-bar">
          <div class="progress-fill fill-indigo" style="width: ${proj.progress || 0}%"></div>
        </div>
      </div>
    `;
  }).join('');
}

// ==========================================================================
// 2. PROJECTS RENDERING
// ==========================================================================
function renderProjects() {
  const grid = document.getElementById('projects-grid');
  const searchInput = document.getElementById('project-search-input');
  const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';

  // Update counts
  document.getElementById('count-proj-all').textContent = state.projects.length;
  document.getElementById('count-proj-progress').textContent = state.projects.filter(p => p.status === 'in_progress').length;
  document.getElementById('count-proj-planned').textContent = state.projects.filter(p => p.status === 'planned').length;
  document.getElementById('count-proj-done').textContent = state.projects.filter(p => p.status === 'completed').length;

  let filtered = state.projects;
  if (currentProjectFilter !== 'all') {
    filtered = filtered.filter(p => p.status === currentProjectFilter);
  }

  if (searchTerm) {
    filtered = filtered.filter(p => 
      p.title.toLowerCase().includes(searchTerm) || 
      (p.description && p.description.toLowerCase().includes(searchTerm)) ||
      (p.category && p.category.toLowerCase().includes(searchTerm))
    );
  }

  if (!grid) return;

  if (filtered.length === 0) {
    grid.innerHTML = '<div class="card" style="grid-column: 1/-1; text-align: center; padding: 40px;"><p class="text-muted">Žádné projekty neodpovídají zadanému filtru.</p></div>';
    return;
  }

  grid.innerHTML = filtered.map(proj => {
    const tasks = proj.tasks || [];
    const doneTasksCount = tasks.filter(t => t.done).length;

    let statusBadge = '<span class="badge badge-indigo">V řešení</span>';
    if (proj.status === 'completed') statusBadge = '<span class="badge badge-success">Dokončeno</span>';
    if (proj.status === 'planned') statusBadge = '<span class="badge badge-warning">Plánováno</span>';

    return `
      <div class="project-card" data-project-id="${proj.id}">
        <div class="project-card-header">
          <div class="project-title-area">
            <h3>${escapeHtml(proj.title)}</h3>
            ${proj.category ? `<span class="project-tag">${escapeHtml(proj.category)}</span>` : ''}
          </div>
          ${statusBadge}
        </div>

        ${proj.description ? `<p class="project-card-desc">${escapeHtml(proj.description)}</p>` : ''}

        <div class="project-progress-section">
          <div class="progress-header">
            <span>Postup</span>
            <span>${proj.progress || 0}%</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill fill-indigo" style="width: ${proj.progress || 0}%"></div>
          </div>
        </div>

        <div class="project-tasks-summary">
          <div class="task-list-header">
            <span>Dílčí úkoly</span>
            <span>${doneTasksCount} / ${tasks.length}</span>
          </div>
          <div class="project-subtasks">
            ${tasks.map(t => `
              <div class="subtask-item ${t.done ? 'done' : ''}" data-task-id="${t.id}" data-project-id="${proj.id}">
                <div class="custom-checkbox">
                  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span>${escapeHtml(t.text)}</span>
              </div>
            `).join('')}
          </div>
          <form class="add-subtask-form" data-project-id="${proj.id}">
            <input type="text" class="subtask-input" placeholder="+ Nový podúkol..." required>
            <button type="submit" class="btn btn-sm btn-secondary">Přidat</button>
          </form>
        </div>

        <div class="project-footer">
          <div class="project-deadline-meta">
            ${proj.deadline ? `📅 ${proj.deadline}` : 'Bez termínu'}
            ${proj.url ? ` • <a href="${escapeHtml(proj.url)}" target="_blank" rel="noopener">Odkaz ↗</a>` : ''}
          </div>
          <div class="project-card-actions">
            <button class="btn btn-sm btn-secondary btn-edit-project" data-id="${proj.id}">Upravit</button>
            <button class="btn btn-sm btn-danger btn-delete-project" data-id="${proj.id}">Smazat</button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Event handlers for project cards
  grid.querySelectorAll('.subtask-item').forEach(el => {
    el.addEventListener('click', () => {
      const projId = el.getAttribute('data-project-id');
      const taskId = el.getAttribute('data-task-id');
      toggleProjectSubtask(projId, taskId);
    });
  });

  grid.querySelectorAll('.add-subtask-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const projId = form.getAttribute('data-project-id');
      const input = form.querySelector('.subtask-input');
      if (input && input.value.trim()) {
        addProjectSubtask(projId, input.value.trim());
        input.value = '';
      }
    });
  });

  grid.querySelectorAll('.btn-edit-project').forEach(btn => {
    btn.addEventListener('click', () => {
      const projId = btn.getAttribute('data-id');
      openProjectModal(projId);
    });
  });

  grid.querySelectorAll('.btn-delete-project').forEach(btn => {
    btn.addEventListener('click', () => {
      const projId = btn.getAttribute('data-id');
      deleteProject(projId);
    });
  });
}

function toggleProjectSubtask(projId, taskId) {
  const proj = state.projects.find(p => p.id === projId);
  if (!proj || !proj.tasks) return;
  const task = proj.tasks.find(t => t.id === taskId);
  if (!task) return;
  task.done = !task.done;

  // Auto-adjust progress if tasks exist
  const doneCount = proj.tasks.filter(t => t.done).length;
  proj.progress = Math.round((doneCount / proj.tasks.length) * 100);
  if (proj.progress === 100) proj.status = 'completed';
  else if (proj.status === 'completed' && proj.progress < 100) proj.status = 'in_progress';

  saveState();
  renderProjects();
  renderOverview();
  updateMetrics();
}

function addProjectSubtask(projId, text) {
  const proj = state.projects.find(p => p.id === projId);
  if (!proj) return;
  if (!proj.tasks) proj.tasks = [];
  proj.tasks.push({
    id: 't_' + Date.now(),
    text,
    done: false
  });

  // Re-calculate progress
  const doneCount = proj.tasks.filter(t => t.done).length;
  proj.progress = Math.round((doneCount / proj.tasks.length) * 100);

  saveState();
  renderProjects();
  showToast('Podúkol přidán');
}

function deleteProject(projId) {
  if (!confirm('Opravdu chceš tento projekt smazat?')) return;
  state.projects = state.projects.filter(p => p.id !== projId);
  saveState();
  renderProjects();
  renderOverview();
  updateMetrics();
  updateSidebarBadges();
  showToast('Projekt byl smazán');
}

// ==========================================================================
// 3. GYM & FITNESS RENDERING
// ==========================================================================
function renderGym() {
  renderWeeklySplitGrid();
  renderWorkoutLogs();
}

function renderWeeklySplitGrid() {
  const container = document.getElementById('days-split-container');
  const badge = document.getElementById('gym-weekly-progress-badge');
  if (!container) return;

  const currentDayIndex = new Date().getDay();
  const workoutsCount = getWorkoutsThisWeekCount();
  const goal = state.user?.gymWeeklyGoal || 4;

  if (badge) {
    badge.textContent = `Tento týden: ${workoutsCount} / ${goal} tréninků`;
  }

  // Split order: Monday(1) to Sunday(0)
  const sortedSplit = [...state.gym.split].sort((a, b) => {
    const aOrder = a.day === 0 ? 7 : a.day;
    const bOrder = b.day === 0 ? 7 : b.day;
    return aOrder - bOrder;
  });

  container.innerHTML = sortedSplit.map(dayItem => {
    const isToday = dayItem.day === currentDayIndex;
    return `
      <div class="day-card ${isToday ? 'today' : ''} ${dayItem.rest ? 'rest' : ''}">
        <span class="day-name">${dayItem.dayName.substring(0, 2)}</span>
        <span class="day-focus">${escapeHtml(dayItem.focus)}</span>
        <div class="day-check-indicator ${dayItem.rest ? '' : ''}">
          ${dayItem.rest ? '💤' : '🏋️'}
        </div>
      </div>
    `;
  }).join('');
}

function renderWorkoutLogs() {
  const container = document.getElementById('workout-logs-list');
  const countEl = document.getElementById('gym-logs-count');
  if (!container) return;

  const logs = [...state.gym.logs].sort((a, b) => new Date(b.date) - new Date(a.date));

  if (countEl) countEl.textContent = `${logs.length} záznamů`;

  if (logs.length === 0) {
    container.innerHTML = '<div class="card" style="grid-column: 1/-1; text-align: center; padding: 40px;"><p class="text-muted">Zatím nemáš žádné zaznamenané tréninky. Klikni na „Zapsat trénink“!</p></div>';
    return;
  }

  container.innerHTML = logs.map(log => {
    const stars = '⭐'.repeat(log.rating || 4);
    return `
      <div class="workout-log-card">
        <div class="log-card-header">
          <div>
            <h4 class="log-type-title">${escapeHtml(log.type)}</h4>
            <span class="log-date">📅 ${log.date}</span>
          </div>
          <span>${stars}</span>
        </div>
        <div class="log-meta-row">
          <span>⏱️ ${log.duration || 60} minut</span>
        </div>
        ${log.exercises ? `
          <div class="log-exercises-box">${escapeHtml(log.exercises)}</div>
        ` : ''}
        <div style="display: flex; justify-content: flex-end; margin-top: auto;">
          <button class="btn btn-sm btn-danger btn-delete-workout" data-id="${log.id}">Smazat</button>
        </div>
      </div>
    `;
  }).join('');

  container.querySelectorAll('.btn-delete-workout').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      deleteWorkoutLog(id);
    });
  });
}

function deleteWorkoutLog(id) {
  if (!confirm('Opravdu smazat tento trénink?')) return;
  state.gym.logs = state.gym.logs.filter(l => l.id !== id);
  saveState();
  renderGym();
  renderOverview();
  updateMetrics();
  updateSidebarBadges();
  showToast('Záznam tréninku smazán');
}

function getWorkoutsThisWeekCount() {
  const now = new Date();
  const day = now.getDay();
  // Monday of this week
  const diff = now.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(now.setDate(diff));
  monday.setHours(0, 0, 0, 0);

  return state.gym.logs.filter(l => {
    const logDate = new Date(l.date);
    return logDate >= monday;
  }).length;
}

// ==========================================================================
// 4. SCHOOL RENDERING
// ==========================================================================
function renderSchool() {
  const grid = document.getElementById('school-items-grid');
  const searchInput = document.getElementById('school-search-input');
  const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';

  // Update counts
  const pendingItems = state.school.filter(s => s.status !== 'done');
  document.getElementById('count-school-active').textContent = pendingItems.length;
  document.getElementById('count-school-urgent').textContent = pendingItems.filter(s => getDaysRemaining(s.deadline) <= 7 && getDaysRemaining(s.deadline) >= 0).length;
  document.getElementById('count-school-done').textContent = state.school.filter(s => s.status === 'done').length;
  document.getElementById('count-school-all').textContent = state.school.length;

  let filtered = state.school;
  if (currentSchoolFilter === 'pending') {
    filtered = filtered.filter(s => s.status !== 'done');
  } else if (currentSchoolFilter === 'urgent') {
    filtered = filtered.filter(s => s.status !== 'done' && getDaysRemaining(s.deadline) <= 7);
  } else if (currentSchoolFilter === 'done') {
    filtered = filtered.filter(s => s.status === 'done');
  }

  if (searchTerm) {
    filtered = filtered.filter(s =>
      s.subject.toLowerCase().includes(searchTerm) ||
      s.title.toLowerCase().includes(searchTerm) ||
      (s.notes && s.notes.toLowerCase().includes(searchTerm))
    );
  }

  // Sort by deadline ascending
  filtered.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

  if (!grid) return;

  if (filtered.length === 0) {
    grid.innerHTML = '<div class="card" style="grid-column: 1/-1; text-align: center; padding: 40px;"><p class="text-muted">Žádné školní povinnosti neodpovídají filtru.</p></div>';
    return;
  }

  grid.innerHTML = filtered.map(item => {
    const days = getDaysRemaining(item.deadline);
    const isDone = item.status === 'done';

    let priorityBadge = '<span class="tag-priority-medium">🟡 Střední priorita</span>';
    if (item.priority === 'high') priorityBadge = '<span class="tag-priority-high">🔴 Vysoká priorita</span>';
    if (item.priority === 'low') priorityBadge = '<span class="tag-priority-low">🟢 Nízká priorita</span>';

    let countdownBadge = `<span class="urgent-countdown warning">Zbývá ${days} dní</span>`;
    if (days < 0 && !isDone) countdownBadge = '<span class="urgent-countdown danger">Po termínu!</span>';
    else if (days === 0 && !isDone) countdownBadge = '<span class="urgent-countdown danger">Dnes!</span>';
    else if (days === 1 && !isDone) countdownBadge = '<span class="urgent-countdown warning">Zítra!</span>';
    else if (isDone) countdownBadge = '<span class="badge badge-success">Splněno ✓</span>';

    return `
      <div class="school-card ${isDone ? 'done' : ''}" data-id="${item.id}">
        <div class="school-card-header">
          <div>
            <span class="school-subject-badge">${escapeHtml(item.subject)} • ${escapeHtml(item.type)}</span>
            <h3 class="school-title">${escapeHtml(item.title)}</h3>
          </div>
          ${countdownBadge}
        </div>

        <div class="school-meta-tags">
          ${priorityBadge}
          <span class="badge">Termín: ${item.deadline}</span>
        </div>

        ${item.notes ? `<div class="school-notes-box">${escapeHtml(item.notes)}</div>` : ''}

        <div class="school-footer">
          <button class="btn btn-sm ${isDone ? 'btn-secondary' : 'btn-accent'} btn-toggle-school-status" data-id="${item.id}">
            ${isDone ? 'Vrátit do řešení' : 'Označit splněno ✓'}
          </button>
          <div style="display: flex; gap: 6px;">
            <button class="btn btn-sm btn-secondary btn-edit-school" data-id="${item.id}">Upravit</button>
            <button class="btn btn-sm btn-danger btn-delete-school" data-id="${item.id}">Smazat</button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  grid.querySelectorAll('.btn-toggle-school-status').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      toggleSchoolStatus(id);
    });
  });

  grid.querySelectorAll('.btn-edit-school').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      openSchoolModal(id);
    });
  });

  grid.querySelectorAll('.btn-delete-school').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      deleteSchoolItem(id);
    });
  });
}

function toggleSchoolStatus(id) {
  const item = state.school.find(s => s.id === id);
  if (!item) return;
  item.status = item.status === 'done' ? 'in_progress' : 'done';
  saveState();
  renderSchool();
  renderOverview();
  updateMetrics();
  updateSidebarBadges();
  showToast(item.status === 'done' ? 'Školní úkol splněn! 🎉' : 'Úkol vrácen k vypracování');
}

function deleteSchoolItem(id) {
  if (!confirm('Opravdu smazat tento školní termín?')) return;
  state.school = state.school.filter(s => s.id !== id);
  saveState();
  renderSchool();
  renderOverview();
  updateMetrics();
  updateSidebarBadges();
  showToast('Školní položka smazána');
}

// ==========================================================================
// 5. SETTINGS & HABITS RENDERING
// ==========================================================================
function renderSettings() {
  const nameInput = document.getElementById('setting-user-name');
  const gymGoalInput = document.getElementById('setting-gym-goal');
  if (nameInput) nameInput.value = state.user?.name || '';
  if (gymGoalInput) gymGoalInput.value = state.user?.gymWeeklyGoal || 4;

  // Render manage habits list
  const habitsContainer = document.getElementById('settings-habits-list');
  if (!habitsContainer) return;

  habitsContainer.innerHTML = state.habits.map(h => `
    <div class="settings-habit-item">
      <span>${escapeHtml(h.text)}</span>
      <button class="btn btn-sm btn-danger btn-del-habit" data-id="${h.id}">&times;</button>
    </div>
  `).join('');

  habitsContainer.querySelectorAll('.btn-del-habit').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      state.habits = state.habits.filter(h => h.id !== id);
      saveState();
      renderSettings();
      renderHabitsWidget();
      updateMetrics();
      showToast('Návyk smazán');
    });
  });
}

// ==========================================================================
// MODALS LOGIC
// ==========================================================================
function openProjectModal(projectId = null) {
  const modal = document.getElementById('modal-project');
  const form = document.getElementById('form-project');
  const titleEl = document.getElementById('modal-project-title');
  const progressVal = document.getElementById('proj-progress-val');
  if (!modal || !form) return;

  form.reset();

  if (projectId) {
    const proj = state.projects.find(p => p.id === projectId);
    if (!proj) return;
    titleEl.textContent = 'Upravit projekt';
    document.getElementById('proj-id').value = proj.id;
    document.getElementById('proj-title').value = proj.title;
    document.getElementById('proj-category').value = proj.category || '';
    document.getElementById('proj-status').value = proj.status || 'in_progress';
    document.getElementById('proj-progress').value = proj.progress || 0;
    progressVal.textContent = `${proj.progress || 0} %`;
    document.getElementById('proj-deadline').value = proj.deadline || '';
    document.getElementById('proj-url').value = proj.url || '';
    document.getElementById('proj-desc').value = proj.description || '';
  } else {
    titleEl.textContent = 'Nový projekt';
    document.getElementById('proj-id').value = '';
    progressVal.textContent = '0 %';
  }

  modal.showModal();
}

function openWorkoutModal() {
  const modal = document.getElementById('modal-workout');
  const form = document.getElementById('form-workout');
  if (!modal || !form) return;

  form.reset();
  document.getElementById('workout-date').value = getTodayStr();

  // Try to default workout type to today's split focus
  const dayIndex = new Date().getDay();
  const splitDay = state.gym.split.find(s => s.day === dayIndex);
  if (splitDay && !splitDay.rest) {
    const select = document.getElementById('workout-type');
    for (let opt of select.options) {
      if (splitDay.focus.includes(opt.value)) {
        select.value = opt.value;
        break;
      }
    }
  }

  modal.showModal();
}

function openSchoolModal(schoolId = null) {
  const modal = document.getElementById('modal-school');
  const form = document.getElementById('form-school');
  const titleEl = document.getElementById('modal-school-title');
  if (!modal || !form) return;

  form.reset();
  if (schoolId) {
    const item = state.school.find(s => s.id === schoolId);
    if (!item) return;
    titleEl.textContent = 'Upravit školní povinnost';
    document.getElementById('school-id').value = item.id;
    document.getElementById('school-subject').value = item.subject;
    document.getElementById('school-type').value = item.type;
    document.getElementById('school-task-title').value = item.title;
    document.getElementById('school-deadline').value = item.deadline;
    document.getElementById('school-priority').value = item.priority || 'medium';
    document.getElementById('school-status').value = item.status || 'pending';
    document.getElementById('school-notes').value = item.notes || '';
  } else {
    titleEl.textContent = 'Přidat školní povinnost';
    document.getElementById('school-id').value = '';
    document.getElementById('school-deadline').value = getRelativeDateStr(7);
  }

  modal.showModal();
}

function openSplitModal() {
  const modal = document.getElementById('modal-split');
  const listContainer = document.getElementById('split-edit-list');
  if (!modal || !listContainer) return;

  const sortedSplit = [...state.gym.split].sort((a, b) => {
    const aOrder = a.day === 0 ? 7 : a.day;
    const bOrder = b.day === 0 ? 7 : b.day;
    return aOrder - bOrder;
  });

  listContainer.innerHTML = sortedSplit.map(s => `
    <div class="split-edit-row" data-day="${s.day}">
      <span class="split-day-label">${s.dayName}:</span>
      <input type="text" class="form-input split-focus-input" value="${escapeHtml(s.focus)}" placeholder="Zaměření dne">
      <label style="display: flex; align-items: center; gap: 4px; font-size: 12px; white-space: nowrap;">
        <input type="checkbox" class="split-rest-check" ${s.rest ? 'checked' : ''}> Rest
      </label>
    </div>
  `).join('');

  modal.showModal();
}

// ==========================================================================
// EVENT LISTENERS SETUP
// ==========================================================================
function setupEventListeners() {
  // --- Modals Trigger Buttons ---
  const btnOpenProj = document.getElementById('btn-open-project-modal');
  if (btnOpenProj) btnOpenProj.addEventListener('click', () => openProjectModal());

  const btnOpenWorkout = document.getElementById('btn-open-workout-modal');
  if (btnOpenWorkout) btnOpenWorkout.addEventListener('click', openWorkoutModal);

  const btnQuickWorkout = document.getElementById('btn-quick-workout');
  if (btnQuickWorkout) btnQuickWorkout.addEventListener('click', openWorkoutModal);

  const btnToggleTodayWorkout = document.getElementById('btn-toggle-today-workout');
  if (btnToggleTodayWorkout) {
    btnToggleTodayWorkout.addEventListener('click', () => {
      const todayStr = getTodayStr();
      const existing = state.gym.logs.find(l => l.date === todayStr);
      if (existing) {
        showToast('Dnešní trénink už je zaznamenán! 💪');
      } else {
        openWorkoutModal();
      }
    });
  }

  const btnOpenSchool = document.getElementById('btn-open-school-modal');
  if (btnOpenSchool) btnOpenSchool.addEventListener('click', () => openSchoolModal());

  const btnQuickSchool = document.getElementById('btn-quick-school');
  if (btnQuickSchool) btnQuickSchool.addEventListener('click', () => openSchoolModal());

  const btnEditSplit = document.getElementById('btn-edit-split');
  if (btnEditSplit) btnEditSplit.addEventListener('click', openSplitModal);

  const btnAddHabitShortcut = document.getElementById('btn-add-habit-shortcut');
  if (btnAddHabitShortcut) {
    btnAddHabitShortcut.addEventListener('click', () => {
      switchTab('settings');
      const input = document.getElementById('new-habit-text');
      if (input) input.focus();
    });
  }

  // --- Modal Close Buttons ---
  setupModalClose('modal-project', 'modal-project-close', 'modal-project-cancel');
  setupModalClose('modal-workout', 'modal-workout-close', 'modal-workout-cancel');
  setupModalClose('modal-school', 'modal-school-close', 'modal-school-cancel');
  setupModalClose('modal-split', 'modal-split-close', 'modal-split-cancel');

  // --- Range slider listener ---
  const rangeInput = document.getElementById('proj-progress');
  const rangeVal = document.getElementById('proj-progress-val');
  if (rangeInput && rangeVal) {
    rangeInput.addEventListener('input', (e) => {
      rangeVal.textContent = `${e.target.value} %`;
    });
  }

  // --- Form Submissions ---
  // 1. Project Form
  const formProject = document.getElementById('form-project');
  if (formProject) {
    formProject.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = document.getElementById('proj-id').value;
      const title = document.getElementById('proj-title').value.trim();
      const category = document.getElementById('proj-category').value.trim();
      const status = document.getElementById('proj-status').value;
      const progress = parseInt(document.getElementById('proj-progress').value, 10);
      const deadline = document.getElementById('proj-deadline').value;
      const url = document.getElementById('proj-url').value.trim();
      const desc = document.getElementById('proj-desc').value.trim();

      if (id) {
        // Edit existing
        const proj = state.projects.find(p => p.id === id);
        if (proj) {
          proj.title = title;
          proj.category = category;
          proj.status = status;
          proj.progress = progress;
          proj.deadline = deadline;
          proj.url = url;
          proj.description = desc;
        }
      } else {
        // Create new
        state.projects.push({
          id: 'proj_' + Date.now(),
          title,
          category,
          status,
          progress,
          deadline,
          url,
          description: desc,
          tasks: []
        });
      }

      saveState();
      document.getElementById('modal-project').close();
      renderProjects();
      renderOverview();
      updateMetrics();
      updateSidebarBadges();
      showToast('Projekt byl úspěšně uložen');
    });
  }

  // 2. Workout Form
  const formWorkout = document.getElementById('form-workout');
  if (formWorkout) {
    formWorkout.addEventListener('submit', (e) => {
      e.preventDefault();
      const date = document.getElementById('workout-date').value;
      const duration = parseInt(document.getElementById('workout-duration').value, 10) || 60;
      const type = document.getElementById('workout-type').value;
      const rating = parseInt(document.getElementById('workout-rating').value, 10) || 4;
      const notes = document.getElementById('workout-notes').value.trim();

      state.gym.logs.unshift({
        id: 'log_' + Date.now(),
        date,
        duration,
        type,
        rating,
        exercises: notes
      });

      // Also mark gym habit done for that day
      if (date === getTodayStr()) {
        const gymHabit = state.habits.find(h => h.id === 'h_gym');
        if (gymHabit) {
          if (!state.habitLogs[date]) state.habitLogs[date] = [];
          if (!state.habitLogs[date].includes(gymHabit.id)) {
            state.habitLogs[date].push(gymHabit.id);
          }
        }
      }

      saveState();
      document.getElementById('modal-workout').close();
      renderGym();
      renderOverview();
      updateMetrics();
      updateSidebarBadges();
      showToast('Trénink byl úspěšně zaznamenán! 🏋️');
    });
  }

  // 3. School Form
  const formSchool = document.getElementById('form-school');
  if (formSchool) {
    formSchool.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = document.getElementById('school-id').value;
      const subject = document.getElementById('school-subject').value.trim();
      const type = document.getElementById('school-type').value;
      const title = document.getElementById('school-task-title').value.trim();
      const deadline = document.getElementById('school-deadline').value;
      const priority = document.getElementById('school-priority').value;
      const status = document.getElementById('school-status').value;
      const notes = document.getElementById('school-notes').value.trim();

      if (id) {
        const item = state.school.find(s => s.id === id);
        if (item) {
          item.subject = subject;
          item.type = type;
          item.title = title;
          item.deadline = deadline;
          item.priority = priority;
          item.status = status;
          item.notes = notes;
        }
      } else {
        state.school.push({
          id: 'sch_' + Date.now(),
          subject,
          type,
          title,
          deadline,
          priority,
          status,
          notes
        });
      }

      saveState();
      document.getElementById('modal-school').close();
      renderSchool();
      renderOverview();
      updateMetrics();
      updateSidebarBadges();
      showToast('Školní termín byl uložen');
    });
  }

  // 4. Split Form
  const formSplit = document.getElementById('form-split');
  if (formSplit) {
    formSplit.addEventListener('submit', (e) => {
      e.preventDefault();
      const rows = document.querySelectorAll('.split-edit-row');
      rows.forEach(row => {
        const day = parseInt(row.getAttribute('data-day'), 10);
        const focusInput = row.querySelector('.split-focus-input');
        const restCheck = row.querySelector('.split-rest-check');
        const splitItem = state.gym.split.find(s => s.day === day);
        if (splitItem) {
          splitItem.focus = focusInput.value.trim() || 'Volný den';
          splitItem.rest = restCheck.checked;
        }
      });

      saveState();
      document.getElementById('modal-split').close();
      renderGym();
      renderOverview();
      showToast('Týdenní plán upraven');
    });
  }

  // --- Search & Filters ---
  const projSearch = document.getElementById('project-search-input');
  if (projSearch) projSearch.addEventListener('input', renderProjects);

  const projFilters = document.querySelectorAll('#project-filters .filter-pill');
  projFilters.forEach(btn => {
    btn.addEventListener('click', () => {
      projFilters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentProjectFilter = btn.getAttribute('data-filter');
      renderProjects();
    });
  });

  const schoolSearch = document.getElementById('school-search-input');
  if (schoolSearch) schoolSearch.addEventListener('input', renderSchool);

  const schoolFilters = document.querySelectorAll('#school-filters .filter-pill');
  schoolFilters.forEach(btn => {
    btn.addEventListener('click', () => {
      schoolFilters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentSchoolFilter = btn.getAttribute('data-filter');
      renderSchool();
    });
  });

  // --- Settings: Profile save ---
  const btnSaveProfile = document.getElementById('btn-save-profile');
  if (btnSaveProfile) {
    btnSaveProfile.addEventListener('click', () => {
      const name = document.getElementById('setting-user-name').value.trim();
      const goal = parseInt(document.getElementById('setting-gym-goal').value, 10);
      if (name) state.user.name = name;
      if (goal && goal >= 1 && goal <= 7) state.user.gymWeeklyGoal = goal;

      saveState();
      updateClock();
      updateMetrics();
      renderGym();
      showToast('Profil uložen');
    });
  }

  // --- Settings: Add Habit ---
  const btnAddHabit = document.getElementById('btn-add-habit');
  const inputNewHabit = document.getElementById('new-habit-text');
  if (btnAddHabit && inputNewHabit) {
    btnAddHabit.addEventListener('click', () => {
      const text = inputNewHabit.value.trim();
      if (!text) return;
      state.habits.push({
        id: 'h_' + Date.now(),
        text
      });
      inputNewHabit.value = '';
      saveState();
      renderSettings();
      renderHabitsWidget();
      updateMetrics();
      showToast('Návik přidán do seznamu');
    });
  }

  // --- Settings: Data Backup Export ---
  const btnExport = document.getElementById('btn-export-data');
  if (btnExport) {
    btnExport.addEventListener('click', exportDataJson);
  }

  // --- Settings: Data Backup Import ---
  const fileImport = document.getElementById('file-import-data');
  if (fileImport) {
    fileImport.addEventListener('change', importDataJson);
  }

  // --- Settings: Load Demo Data ---
  const btnLoadSample = document.getElementById('btn-load-sample-data');
  if (btnLoadSample) {
    btnLoadSample.addEventListener('click', () => {
      if (confirm('Chceš načíst ukázková demo data? Tvoje stávající data budou přepsána.')) {
        state = JSON.parse(JSON.stringify(DEFAULT_DATA));
        saveState();
        renderAllViews();
        showToast('Ukázková data obnovena');
      }
    });
  }

  // --- Settings: Reset Data ---
  const btnReset = document.getElementById('btn-reset-data');
  if (btnReset) {
    btnReset.addEventListener('click', () => {
      if (confirm('POZOR: Opravdu chceš vymazat všechna data dashboardu? Tuto akci nelze vzít zpět.')) {
        state = {
          user: { name: 'Uživatel', gymWeeklyGoal: 3, theme: 'dark' },
          gym: { split: DEFAULT_DATA.gym.split, logs: [] },
          projects: [],
          school: [],
          habits: [],
          habitLogs: {}
        };
        saveState();
        renderAllViews();
        showToast('Data byla vymazána');
      }
    });
  }
}

function setupModalClose(modalId, closeBtnId, cancelBtnId) {
  const modal = document.getElementById(modalId);
  const closeBtn = document.getElementById(closeBtnId);
  const cancelBtn = document.getElementById(cancelBtnId);

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => modal.close());
  }
  if (cancelBtn && modal) {
    cancelBtn.addEventListener('click', () => modal.close());
  }
  if (modal) {
    // Click outside backdrop to close
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.close();
    });
  }
}

// ==========================================================================
// DATA EXPORT & IMPORT
// ==========================================================================
function exportDataJson() {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(state, null, 2));
  const downloadAnchor = document.createElement('a');
  const dateStr = getTodayStr();
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', `lifeos-dashboard-zaloha-${dateStr}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
  showToast('Záloha byla stažena do počítače');
}

function importDataJson(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const imported = JSON.parse(event.target.result);
      if (!imported.projects || !imported.gym) {
        throw new Error('Neplatný formát souboru zálohy');
      }
      state = imported;
      saveState();
      renderAllViews();
      showToast('Data byla úspěšně importována!');
    } catch (err) {
      alert('Chyba při čtení JSON souboru: ' + err.message);
    }
  };
  reader.readAsText(file);
}

// ==========================================================================
// PWA & SERVICE WORKER
// ==========================================================================
function initPWA() {
  // 1. Service Worker Registration
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
      .then((reg) => {
        console.log('LifeOS PWA Service Worker registered:', reg.scope);
        const swStatusEl = document.getElementById('sw-status-text');
        if (swStatusEl) swStatusEl.textContent = 'Aktivní (Service Worker)';
      })
      .catch((err) => {
        console.warn('Service Worker registration failed:', err);
        const swStatusEl = document.getElementById('sw-status-text');
        if (swStatusEl) swStatusEl.textContent = 'Nepodporováno v tomto kontextu';
      });
  }

  // 2. Online / Offline status
  const updateOnlineStatus = () => {
    const isOnline = navigator.onLine;
    const dot = document.getElementById('connection-dot');
    const text = document.getElementById('connection-text');
    if (dot) {
      dot.className = `status-indicator-dot ${isOnline ? 'online' : 'offline'}`;
    }
    if (text) {
      text.textContent = isOnline ? 'Online' : 'Offline (PWA)';
    }
  };

  window.addEventListener('online', () => {
    updateOnlineStatus();
    showToast('Opět online! Synchronizováno.');
  });
  window.addEventListener('offline', () => {
    updateOnlineStatus();
    showToast('Jste v offline režimu. Data jsou plně dostupná!');
  });
  updateOnlineStatus();

  // 3. Install Prompt Handling
  const installBtn = document.getElementById('pwa-install-btn');
  const headerInstallBtn = document.getElementById('header-install-btn');

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    if (installBtn) installBtn.classList.remove('hidden');
    if (headerInstallBtn) headerInstallBtn.classList.remove('hidden');
  });

  const triggerInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      showToast('Aplikace byla úspěšně nainstalována! 🎉');
    }
    deferredPrompt = null;
    if (installBtn) installBtn.classList.add('hidden');
    if (headerInstallBtn) headerInstallBtn.classList.add('hidden');
  };

  if (installBtn) installBtn.addEventListener('click', triggerInstall);
  if (headerInstallBtn) headerInstallBtn.addEventListener('click', triggerInstall);

  window.addEventListener('appinstalled', () => {
    showToast('Aplikace je nyní nainstalována na ploše / v systému.');
  });

  // Display Mode Check
  const displayModeEl = document.getElementById('pwa-display-mode');
  if (displayModeEl) {
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
      displayModeEl.textContent = 'Samostatná PWA aplikace';
    } else {
      displayModeEl.textContent = 'Webový prohlížeč';
    }
  }
}

// ==========================================================================
// UTILITY FUNCTIONS
// ==========================================================================
function getDaysRemaining(deadlineStr) {
  if (!deadlineStr) return 999;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(deadlineStr);
  target.setHours(0, 0, 0, 0);
  const diffTime = target - today;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span>${escapeHtml(message)}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// ==========================================================================
// SUPABASE CLOUD & REALTIME SYNCHRONIZATION MODULE
// ==========================================================================
const SB_CONFIG_KEY = 'lifeos_supabase_config_v1';
let supabaseClient = null;
let currentUser = null;
let realtimeChannel = null;
let syncDebounceTimer = null;
let isSyncing = false;

function initSupabase() {
  setupSupabaseUIEventListeners();

  // Load saved credentials
  let config = null;
  try {
    const raw = localStorage.getItem(SB_CONFIG_KEY);
    if (raw) config = JSON.parse(raw);
  } catch (e) {
    console.error('Error reading Supabase config:', e);
  }

  if (config && config.url && config.key) {
    const urlInput = document.getElementById('sb-url');
    const keyInput = document.getElementById('sb-key');
    if (urlInput) urlInput.value = config.url;
    if (keyInput) keyInput.value = config.key;

    createSupabaseClient(config.url, config.key);
  } else {
    updateSyncStatusUI('disconnected');
  }
}

function createSupabaseClient(url, key) {
  if (!window.supabase) {
    console.warn('Supabase SDK not loaded yet. Running in offline/local mode.');
    updateSyncStatusUI('disconnected');
    return;
  }

  try {
    supabaseClient = window.supabase.createClient(url, key, {
      auth: {
        persistSession: true,
        autoRefreshToken: true
      }
    });

    // Check existing session
    supabaseClient.auth.getSession().then(({ data, error }) => {
      if (error) {
        console.warn('Supabase getSession error:', error);
        updateSyncStatusUI('disconnected');
        return;
      }

      if (data && data.session) {
        currentUser = data.session.user;
        updateSyncStatusUI('connected');
        subscribeToSupabaseRealtime();
        // Initial pull to get latest data from cloud
        pullFromSupabase(false, false);
      } else {
        currentUser = null;
        updateSyncStatusUI('disconnected');
      }
    });

    // Listen to Auth State Changes
    supabaseClient.auth.onAuthStateChange((event, session) => {
      if (session && session.user) {
        currentUser = session.user;
        updateSyncStatusUI('connected');
        subscribeToSupabaseRealtime();
      } else {
        currentUser = null;
        if (realtimeChannel && supabaseClient) {
          supabaseClient.removeChannel(realtimeChannel);
          realtimeChannel = null;
        }
        updateSyncStatusUI('disconnected');
      }
    });

  } catch (err) {
    console.error('Failed to initialize Supabase client:', err);
    updateSyncStatusUI('disconnected');
  }
}

function setupSupabaseUIEventListeners() {
  const syncBtn = document.getElementById('cloud-sync-status-btn');
  const openModalBtn = document.getElementById('btn-open-supabase-modal');
  const modal = document.getElementById('modal-supabase');
  const closeBtn = document.getElementById('modal-supabase-close');
  const cancelBtn = document.getElementById('modal-supabase-cancel');
  const closeDialogBtn = document.getElementById('modal-supabase-close-btn');

  const openModal = () => {
    if (modal) modal.showModal();
  };

  if (syncBtn) syncBtn.addEventListener('click', openModal);
  if (openModalBtn) openModalBtn.addEventListener('click', openModal);
  if (closeBtn && modal) closeBtn.addEventListener('click', () => modal.close());
  if (cancelBtn && modal) cancelBtn.addEventListener('click', () => modal.close());
  if (closeDialogBtn && modal) closeDialogBtn.addEventListener('click', () => modal.close());

  // Form Auth Submit (Login)
  const authForm = document.getElementById('form-supabase-auth');
  if (authForm) {
    authForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const url = document.getElementById('sb-url').value.trim();
      const key = document.getElementById('sb-key').value.trim();
      const email = document.getElementById('sb-email').value.trim();
      const password = document.getElementById('sb-password').value;

      await handleSupabaseAuth(url, key, email, password, false);
    });
  }

  // Register Button
  const registerBtn = document.getElementById('btn-sb-register');
  if (registerBtn) {
    registerBtn.addEventListener('click', async () => {
      const url = document.getElementById('sb-url').value.trim();
      const key = document.getElementById('sb-key').value.trim();
      const email = document.getElementById('sb-email').value.trim();
      const password = document.getElementById('sb-password').value;

      if (!url || !key || !email || !password) {
        alert('Prosím vyplň všechna pole: URL, Key, E-mail i Heslo.');
        return;
      }

      await handleSupabaseAuth(url, key, email, password, true);
    });
  }

  // Logout Button
  const logoutBtn = document.getElementById('btn-sb-logout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      if (supabaseClient) {
        await supabaseClient.auth.signOut();
      }
      currentUser = null;
      updateSyncStatusUI('disconnected');
      if (modal) modal.close();
      showToast('Odhlášeno ze Supabase. Aplikace běží lokálně.');
    });
  }

  // Sync Now Buttons
  const syncNowBtn = document.getElementById('btn-sb-sync-now');
  if (syncNowBtn) {
    syncNowBtn.addEventListener('click', () => {
      pullFromSupabase(false, true);
    });
  }

  const forceSyncBtn = document.getElementById('btn-force-sync');
  if (forceSyncBtn) {
    forceSyncBtn.addEventListener('click', () => {
      if (!currentUser) {
        openModal();
      } else {
        pullFromSupabase(false, true);
      }
    });
  }

  // Push Local to Cloud Buttons
  const pushLocalBtn = document.getElementById('btn-sb-push-local');
  if (pushLocalBtn) {
    pushLocalBtn.addEventListener('click', () => {
      pushToSupabase(true);
    });
  }

  const uploadLocalBtn = document.getElementById('btn-upload-local-to-cloud');
  if (uploadLocalBtn) {
    uploadLocalBtn.addEventListener('click', () => {
      if (!currentUser) {
        openModal();
      } else {
        pushToSupabase(true);
      }
    });
  }
}

async function handleSupabaseAuth(url, key, email, password, isRegister) {
  try {
    // Save credentials to localStorage
    localStorage.setItem(SB_CONFIG_KEY, JSON.stringify({ url, key }));

    if (!supabaseClient) {
      createSupabaseClient(url, key);
    }

    if (!supabaseClient) {
      alert('Chyba při inicializaci Supabase klienta. Zkontroluj URL a Key.');
      return;
    }

    updateSyncStatusUI('syncing');

    if (isRegister) {
      const { data, error } = await supabaseClient.auth.signUp({
        email,
        password
      });
      if (error) throw error;
      if (data.session) {
        currentUser = data.session.user;
        showToast('Účet byl vytvořen a přihlášen! 🎉');
        // Initial push of existing local state
        await pushToSupabase(false);
      } else {
        alert('Registrace proběhla! Pokud je vyžadováno potvrzení e-mailu, zkontroluj svou schránku.');
      }
    } else {
      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email,
        password
      });
      if (error) throw error;
      currentUser = data.user;
      showToast(`Vítej zpět! Přihlášen jako ${email}`);
      // Pull fresh data from cloud
      await pullFromSupabase(false, false);
    }

    updateSyncStatusUI('connected');
    const modal = document.getElementById('modal-supabase');
    if (modal) modal.close();

  } catch (err) {
    console.error('Supabase Auth error:', err);
    alert('Chyba přihlášení: ' + (err.message || err));
    updateSyncStatusUI('disconnected');
  }
}

function updateSyncStatusUI(status) {
  const iconEl = document.getElementById('cloud-sync-icon');
  const labelEl = document.getElementById('cloud-sync-label');
  const dotEl = document.getElementById('supabase-status-dot');
  const headingEl = document.getElementById('supabase-status-heading');
  const subEl = document.getElementById('supabase-status-sub');
  const loggedEmailEl = document.getElementById('sb-logged-user-email');
  const loggedInView = document.getElementById('supabase-logged-in-view');
  const authFormView = document.getElementById('supabase-auth-form-view');
  const configBtnLabel = document.getElementById('btn-supabase-config-label');

  if (status === 'connected' && currentUser) {
    if (iconEl) iconEl.textContent = '☁️';
    if (labelEl) labelEl.textContent = 'Cloud Live';
    if (dotEl) {
      dotEl.className = 'status-indicator-dot online';
    }
    if (headingEl) headingEl.textContent = 'Supabase Cloud (Synchronizováno v reálném čase)';
    if (subEl) subEl.textContent = `Přihlášen jako: ${currentUser.email}`;
    if (loggedEmailEl) loggedEmailEl.textContent = currentUser.email;
    if (loggedInView) loggedInView.classList.remove('hidden');
    if (authFormView) authFormView.classList.add('hidden');
    if (configBtnLabel) configBtnLabel.textContent = 'Spravovat Cloud Sync';
  } else if (status === 'syncing') {
    if (iconEl) iconEl.textContent = '🔄';
    if (labelEl) labelEl.textContent = 'Sync...';
    if (dotEl) dotEl.className = 'status-indicator-dot offline';
  } else {
    // Disconnected / Local only
    if (iconEl) iconEl.textContent = '☁️';
    if (labelEl) labelEl.textContent = 'Lokální';
    if (dotEl) dotEl.className = 'status-indicator-dot offline';
    if (headingEl) headingEl.textContent = 'Lokální režim (Bez cloudu)';
    if (subEl) subEl.textContent = 'Připoj svůj Supabase projekt pro synchronizaci mezi zařízeními.';
    if (loggedInView) loggedInView.classList.add('hidden');
    if (authFormView) authFormView.classList.remove('hidden');
    if (configBtnLabel) configBtnLabel.textContent = 'Připojit Supabase Cloud';
  }
}

function subscribeToSupabaseRealtime() {
  if (!supabaseClient || !currentUser) return;

  if (realtimeChannel) {
    try {
      supabaseClient.removeChannel(realtimeChannel);
    } catch (e) {}
    realtimeChannel = null;
  }

  // Subscribe to changes across public schema
  realtimeChannel = supabaseClient.channel('lifeos-realtime-channel')
    .on('postgres_changes', { event: '*', schema: 'public' }, (payload) => {
      console.log('Realtime broadcast received from Supabase:', payload);
      // Automatically pull and refresh views
      pullFromSupabase(true, false);
    })
    .subscribe((status) => {
      console.log('Supabase Realtime Channel Status:', status);
    });
}

function debouncePushToSupabase() {
  if (syncDebounceTimer) clearTimeout(syncDebounceTimer);
  syncDebounceTimer = setTimeout(() => {
    pushToSupabase(false);
  }, 600);
}

// Push local state to Supabase Cloud
async function pushToSupabase(isManual = false) {
  if (!supabaseClient || !currentUser) {
    if (isManual) alert('Nejsi přihlášen k Supabase. Klikni na „Připojit Supabase Cloud“.');
    return;
  }

  updateSyncStatusUI('syncing');

  try {
    const userId = currentUser.id;
    const nowIso = new Date().toISOString();

    // 1. User Settings
    await supabaseClient.from('user_settings').upsert({
      user_id: userId,
      name: state.user?.name || 'Tomáš',
      gym_weekly_goal: state.user?.gymWeeklyGoal || 4,
      theme: state.user?.theme || 'dark',
      updated_at: nowIso
    });

    // 2. Projects
    if (state.projects && state.projects.length > 0) {
      const projectRows = state.projects.map(p => ({
        id: p.id,
        user_id: userId,
        title: p.title,
        description: p.description || '',
        category: p.category || '',
        status: p.status || 'in_progress',
        progress: p.progress || 0,
        deadline: p.deadline || null,
        url: p.url || '',
        tasks: p.tasks || [],
        updated_at: nowIso
      }));
      await supabaseClient.from('projects').upsert(projectRows);
    }

    // 3. Gym Split
    if (state.gym && state.gym.split) {
      const splitRows = state.gym.split.map(s => ({
        id: `split_${userId}_${s.day}`,
        user_id: userId,
        day: s.day,
        day_name: s.dayName,
        focus: s.focus,
        rest: !!s.rest,
        updated_at: nowIso
      }));
      await supabaseClient.from('gym_split').upsert(splitRows);
    }

    // 4. Gym Logs
    if (state.gym && state.gym.logs && state.gym.logs.length > 0) {
      const logRows = state.gym.logs.map(l => ({
        id: l.id,
        user_id: userId,
        date: l.date,
        duration: l.duration || 60,
        type: l.type,
        rating: l.rating || 4,
        exercises: l.exercises || '',
        created_at: nowIso
      }));
      await supabaseClient.from('gym_logs').upsert(logRows);
    }

    // 5. School Items
    if (state.school && state.school.length > 0) {
      const schoolRows = state.school.map(s => ({
        id: s.id,
        user_id: userId,
        subject: s.subject,
        type: s.type,
        title: s.title,
        deadline: s.deadline,
        priority: s.priority || 'medium',
        status: s.status || 'pending',
        notes: s.notes || '',
        updated_at: nowIso
      }));
      await supabaseClient.from('school_items').upsert(schoolRows);
    }

    // 6. Habits
    if (state.habits && state.habits.length > 0) {
      const habitRows = state.habits.map(h => ({
        id: h.id,
        user_id: userId,
        text: h.text,
        updated_at: nowIso
      }));
      await supabaseClient.from('habits').upsert(habitRows);
    }

    // 7. Habit Logs
    if (state.habitLogs) {
      const habitLogRows = [];
      for (const [dateStr, ids] of Object.entries(state.habitLogs)) {
        if (Array.isArray(ids)) {
          ids.forEach(habitId => {
            habitLogRows.push({
              id: `hl_${userId}_${dateStr}_${habitId}`,
              user_id: userId,
              date: dateStr,
              habit_id: habitId,
              created_at: nowIso
            });
          });
        }
      }
      if (habitLogRows.length > 0) {
        await supabaseClient.from('habit_logs').upsert(habitLogRows);
      }
    }

    updateSyncStatusUI('connected');
    if (isManual) {
      showToast('Všechna lokální data byla nahrána do Supabase cloudu! ☁️');
    }

  } catch (err) {
    console.error('Failed to push state to Supabase:', err);
    updateSyncStatusUI('connected');
    if (isManual) {
      alert('Chyba při nahrávání do cloudu: ' + (err.message || err));
    }
  }
}

// Pull latest data from Supabase Cloud
async function pullFromSupabase(isRealtime = false, isManual = false) {
  if (!supabaseClient || !currentUser) {
    if (isManual) alert('Nejsi přihlášen k Supabase.');
    return;
  }

  if (isSyncing) return;
  isSyncing = true;
  updateSyncStatusUI('syncing');

  try {
    const userId = currentUser.id;

    // Parallel fetch from all tables
    const [
      settingsRes,
      projectsRes,
      splitRes,
      logsRes,
      schoolRes,
      habitsRes,
      habitLogsRes
    ] = await Promise.all([
      supabaseClient.from('user_settings').select('*').eq('user_id', userId).maybeSingle(),
      supabaseClient.from('projects').select('*').eq('user_id', userId),
      supabaseClient.from('gym_split').select('*').eq('user_id', userId),
      supabaseClient.from('gym_logs').select('*').eq('user_id', userId).order('date', { ascending: false }),
      supabaseClient.from('school_items').select('*').eq('user_id', userId),
      supabaseClient.from('habits').select('*').eq('user_id', userId),
      supabaseClient.from('habit_logs').select('*').eq('user_id', userId)
    ]);

    // Check if cloud has data
    const hasCloudData = (projectsRes.data && projectsRes.data.length > 0) ||
                         (logsRes.data && logsRes.data.length > 0) ||
                         (schoolRes.data && schoolRes.data.length > 0);

    if (hasCloudData) {
      // 1. Settings
      if (settingsRes.data) {
        state.user.name = settingsRes.data.name || state.user.name;
        state.user.gymWeeklyGoal = settingsRes.data.gym_weekly_goal || state.user.gymWeeklyGoal;
        if (settingsRes.data.theme) {
          state.user.theme = settingsRes.data.theme;
          applyTheme(settingsRes.data.theme);
        }
      }

      // 2. Projects
      if (projectsRes.data) {
        state.projects = projectsRes.data.map(p => ({
          id: p.id,
          title: p.title,
          description: p.description || '',
          category: p.category || '',
          status: p.status || 'in_progress',
          progress: p.progress || 0,
          deadline: p.deadline || '',
          url: p.url || '',
          tasks: Array.isArray(p.tasks) ? p.tasks : []
        }));
      }

      // 3. Gym Split
      if (splitRes.data && splitRes.data.length > 0) {
        state.gym.split = splitRes.data.map(s => ({
          day: s.day,
          dayName: s.day_name,
          focus: s.focus,
          rest: !!s.rest
        }));
      }

      // 4. Gym Logs
      if (logsRes.data) {
        state.gym.logs = logsRes.data.map(l => ({
          id: l.id,
          date: l.date,
          duration: l.duration || 60,
          type: l.type,
          rating: l.rating || 4,
          exercises: l.exercises || ''
        }));
      }

      // 5. School Items
      if (schoolRes.data) {
        state.school = schoolRes.data.map(s => ({
          id: s.id,
          subject: s.subject,
          type: s.type,
          title: s.title,
          deadline: s.deadline,
          priority: s.priority || 'medium',
          status: s.status || 'pending',
          notes: s.notes || ''
        }));
      }

      // 6. Habits
      if (habitsRes.data && habitsRes.data.length > 0) {
        state.habits = habitsRes.data.map(h => ({
          id: h.id,
          text: h.text
        }));
      }

      // 7. Habit Logs
      if (habitLogsRes.data) {
        const remappedLogs = {};
        habitLogsRes.data.forEach(hl => {
          if (!remappedLogs[hl.date]) remappedLogs[hl.date] = [];
          if (!remappedLogs[hl.date].includes(hl.habit_id)) {
            remappedLogs[hl.date].push(hl.habit_id);
          }
        });
        state.habitLogs = remappedLogs;
      }

      // Save locally (skip remote sync to prevent loop)
      saveState(true);
      renderAllViews();

      if (isRealtime) {
        showToast('⚡ Změna z druhého zařízení synchronizována!');
      } else if (isManual) {
        showToast('Aktuální data byla úspěšně stažena z cloudu!');
      }
    } else {
      // If cloud is completely empty, push local state to initialize it!
      console.log('Cloud is empty for this user, pushing local state to initialize...');
      await pushToSupabase(false);
    }

  } catch (err) {
    console.error('Failed to pull from Supabase:', err);
    if (isManual) {
      alert('Chyba při stahování z cloudu: ' + (err.message || err));
    }
  } finally {
    isSyncing = false;
    updateSyncStatusUI('connected');
  }
}

