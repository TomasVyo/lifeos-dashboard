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
      { day: 1, dayName: 'Pondělí', focus: 'Upper A', rest: false },
      { day: 2, dayName: 'Úterý', focus: 'Lower A', rest: false },
      { day: 3, dayName: 'Středa', focus: 'Odpočinek / Regenerace', rest: true },
      { day: 4, dayName: 'Čtvrtek', focus: 'Upper B', rest: false },
      { day: 5, dayName: 'Pátek', focus: 'Lower B', rest: false },
      { day: 6, dayName: 'Sobota', focus: 'Kardio & Mobilita', rest: true },
      { day: 0, dayName: 'Neděle', focus: 'Odpočinek & Příprava', rest: true }
    ],
    exercisesBySplit: {
      'Upper A': [
        'Bench press',
        'Přítahy činky v předklonu',
        'Tlaky na ramena (OHP / Jednoručky)',
        'Stahování horní kladky na hrudník',
        'Bicepsový zdvih s velkou činkou',
        'Tricepsové stlačování kladky'
      ],
      'Lower A': [
        'Dřepy s velkou činkou',
        'Rumunský mrtvý tah (RDL)',
        'Leg press',
        'Zakopávání na stroji',
        'Výpony na lýtka vestoje',
        'Plank / Zdvihy nohou na hrazdě'
      ],
      'Upper B': [
        'Šikmé tlaky s jednoručkami (Incline DB)',
        'Přítahy jednoručky v předklonu (Kroc row)',
        'Upažování s jednoručkami (Laterals)',
        'Shyby na hrazdě',
        'Kladivové bicepsové zdvihy',
        'Dipy na bradlech / Francouzský tlak',
        'Face pulls na zadní ramena'
      ],
      'Lower B': [
        'Přední dřep / Hacken dřep',
        'Bulharské dřepy s jednoručkami',
        'Předkopávání na stroji',
        'Hyperextenze na hamstringy/hýždě',
        'Výpony vsedě',
        'Břicho na kladce / Ab wheel'
      ],
      'Kardio': [
        'Běh na pásu',
        'Veslovací trenažér',
        'Rotoped / Kolo',
        'Chůze do kopce (incline walk)'
      ],
      'Jiné': [
        'Strečink & Mobilita',
        'Funkční kruhový trénink'
      ]
    },
    prExercises: [
      'Bench press',
      'Dřepy s velkou činkou',
      'Rumunský mrtvý tah (RDL)',
      'Tlaky na ramena (OHP / Jednoručky)'
    ],
    logs: [
      {
        id: 'log_1',
        date: getRelativeDateStr(-3),
        type: 'Upper A',
        duration: 65,
        rating: 5,
        exercises: '• Bench press: 4 série (80 kg × 8, 80 kg × 8, 82.5 kg × 7, 85 kg × 6)\n• Přítahy činky v předklonu: 4 série (65 kg × 10, 65 kg × 10, 70 kg × 8, 70 kg × 8)\n• Tlaky na ramena (OHP / Jednoručky): 3 série (24 kg × 10, 24 kg × 8, 22 kg × 10)\n• Stahování horní kladky na hrudník: 3 série (60 kg × 10, 60 kg × 10, 55 kg × 12)\n• Bicepsový zdvih s velkou činkou: 3 série (30 kg × 10, 30 kg × 10, 27.5 kg × 12)\n• Tricepsové stlačování kladky: 3 série (35 kg × 12, 35 kg × 12, 30 kg × 15)'
      },
      {
        id: 'log_2',
        date: getRelativeDateStr(-2),
        type: 'Lower A',
        duration: 70,
        rating: 4,
        exercises: '• Dřepy s velkou činkou: 4 série (100 kg × 6, 100 kg × 6, 105 kg × 5, 95 kg × 8)\n• Rumunský mrtvý tah (RDL): 3 série (90 kg × 8, 95 kg × 8, 95 kg × 8)\n• Leg press: 3 série (180 kg × 10, 180 kg × 10, 160 kg × 12)\n• Zakopávání na stroji: 3 série (45 kg × 12, 45 kg × 12, 40 kg × 12)\n• Výpony na lýtka vestoje: 4 série (70 kg × 15, 70 kg × 15, 70 kg × 12, 60 kg × 15)\n• Plank / Zdvihy nohou na hrazdě: 3 série (3 série × 15)'
      }
    ]
  },
  projects: [
    {
      id: 'proj_pubmate',
      title: 'PubMate',
      description: 'Chytrý hospodský & pivní parťák. Vyhledávání a hodnocení pivnic, správa pivních deníků, sledování útraty a plánování srazů.',
      category: 'Mobilní aplikace / Web',
      status: 'in_progress',
      progress: 50,
      deadline: getRelativeDateStr(14),
      url: 'https://github.com/TomasVyo',
      liveUrl: 'https://pubmate.app',
      techStack: ['React', 'Vite', 'PWA / Offline', 'Leaflet Maps', 'Supabase'],
      devNotes: [
        { id: 'dn_pm1', date: '01.10.2026 14:30', text: 'Vytvořen základní prototyp a offline sync pivních záznamů a hodnocení.' },
        { id: 'dn_pm2', date: '03.10.2026 11:15', text: 'Plánování integrace geolokačního vyhledávání a interaktivní mapy podniků.' }
      ],
      tasks: [
        { id: 't_pm1', text: 'Návrh UI a mobilního rozhraní pro vyhledávání pivnic', done: true },
        { id: 't_pm2', text: 'Katalog piv, hodnocení a zápis návštěv', done: true },
        { id: 't_pm3', text: 'Interaktivní mapa podniků a geolokace', done: false },
        { id: 't_pm4', text: 'Offline mód a synchronizace útraty', done: false }
      ]
    },
    {
      id: 'proj_dockmaster',
      title: 'Dockmaster',
      description: 'Správa a monitoring Docker kontejnerů. Přehledný realtime dashboard stavu, orchestrace služeb, logistika deploymentů a alerty.',
      category: 'DevOps / Backend',
      status: 'in_progress',
      progress: 35,
      deadline: getRelativeDateStr(21),
      url: 'https://github.com/TomasVyo',
      liveUrl: '',
      techStack: ['Node.js', 'Express', 'Docker API', 'WebSockets', 'Tailwind'],
      devNotes: [
        { id: 'dn_dm1', date: '28.09.2026 19:40', text: 'Napojen Docker Engine UNIX socket pro streamování metrik využití paměti a CPU.' }
      ],
      tasks: [
        { id: 't_dm1', text: 'Napojení na Docker Engine REST API socket', done: true },
        { id: 't_dm2', text: 'Realtime dashboard stavu kontejnerů a paměti', done: false },
        { id: 't_dm3', text: 'Automatické restarty a notifikace při pádu', done: false },
        { id: 't_dm4', text: 'Podpora Docker Compose stacků', done: false }
      ]
    },
    {
      id: 'proj_logispace',
      title: 'LogiSpace',
      description: 'Optimalizace skladových prostor a logistické plánování. 3D mapování skladových pozic, správa zásob a dynamické naskladňování.',
      category: 'Logistika / SaaS',
      status: 'planned',
      progress: 15,
      deadline: getRelativeDateStr(45),
      url: '',
      liveUrl: '',
      techStack: ['Three.js', 'TypeScript', 'PostgreSQL', '3D Sklad', 'SaaS'],
      devNotes: [
        { id: 'dn_ls1', date: '25.09.2026 16:20', text: 'Architektonický rozbor regálového systému a 3D zobrazení skladových buněk.' }
      ],
      tasks: [
        { id: 't_ls1', text: 'Analýza parametrů skladů a regálových systémů', done: true },
        { id: 't_ls2', text: 'Návrh databázové struktury skladových lokací', done: false },
        { id: 't_ls3', text: 'Algoritmus optimalizace tras pro vychystávání', done: false },
        { id: 't_ls4', text: 'Generování skladových reportů a štítků', done: false }
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

function formatDateTimeStr(date = new Date()) {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  const hours = String(d.getHours()).padStart(2, '0');
  const mins = String(d.getMinutes()).padStart(2, '0');
  return `${day}.${month}.${year} ${hours}:${mins}`;
}

// App State
let state = loadState();
try {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
} catch (e) {}
let deferredPrompt = null;
let currentProjectFilter = 'all';
let currentProjectViewMode = 'grid'; // 'grid' | 'kanban'
let currentSchoolFilter = 'pending';
let activeWorkout = null;
let activeWorkoutTimerInterval = null;

// Tombstone set for items deleted in current session to prevent race conditions during sync
const recentlyDeletedIds = new Set();
function markAsDeleted(id) {
  if (!id) return;
  recentlyDeletedIds.add(id);
  // Auto-expire after 10 minutes
  setTimeout(() => recentlyDeletedIds.delete(id), 10 * 60 * 1000);
}

// State Management
function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);

      // Projects migration to user's personal projects: PubMate, Dockmaster, LogiSpace
      let projects = Array.isArray(parsed.projects) ? parsed.projects : [];
      const hasOldDemoProjects = projects.some(p => p.id === 'proj_1' || p.id === 'proj_2' || p.id === 'proj_3' || p.title?.includes('Osobní PWA') || p.title?.includes('Semestrální aplikace'));
      const hasPersonalProjects = projects.some(p => p.title === 'PubMate' || p.title === 'Dockmaster' || p.title === 'LogiSpace');

      if (hasOldDemoProjects || !hasPersonalProjects) {
        ['proj_1', 'proj_2', 'proj_3'].forEach(id => markAsDeleted(id));
        projects = JSON.parse(JSON.stringify(DEFAULT_DATA.projects));
      } else {
        // Ensure all existing projects have techStack, devNotes, liveUrl initialized
        projects = projects.map(p => {
          const defaultMatch = DEFAULT_DATA.projects.find(dp => dp.id === p.id || dp.title === p.title);
          return {
            ...p,
            techStack: Array.isArray(p.techStack) && p.techStack.length > 0 ? p.techStack : (defaultMatch ? defaultMatch.techStack : []),
            devNotes: Array.isArray(p.devNotes) && p.devNotes.length > 0 ? p.devNotes : (defaultMatch ? defaultMatch.devNotes : []),
            liveUrl: p.liveUrl !== undefined ? p.liveUrl : (defaultMatch ? defaultMatch.liveUrl : '')
          };
        });
      }

      // Gym split sanitization (strictly ensure 7 days 0..6, respect user's custom focuses)
      let split = (parsed.gym && parsed.gym.split) || DEFAULT_DATA.gym.split;
      if (Array.isArray(split)) {
        split = split.filter(s => s &&
          typeof s.day === 'number' &&
          s.day >= 0 &&
          s.day <= 6 &&
          (!s.dayName || !s.dayName.startsWith('__')) &&
          (!s.focus || (!s.focus.startsWith('{') && !s.focus.startsWith('[')))
        );
      }
      const dayIndices = new Set(Array.isArray(split) ? split.map(s => s.day) : []);
      const hasAll7Days = [0, 1, 2, 3, 4, 5, 6].every(d => dayIndices.has(d));
      if (!Array.isArray(split) || !hasAll7Days || split.length !== 7) {
        const defaultSplit = JSON.parse(JSON.stringify(DEFAULT_DATA.gym.split));
        split = defaultSplit.map(defDay => {
          const existing = (Array.isArray(split) ? split : []).find(v => v.day === defDay.day);
          return existing || defDay;
        });
      }

      // Gym exercises library migration to Upper A / Lower A / Upper B / Lower B
      let exercisesBySplit = parsed.gym && parsed.gym.exercisesBySplit;
      const hasOldExercises = !exercisesBySplit || !exercisesBySplit['Upper A'] || !exercisesBySplit['Lower A'];
      if (hasOldExercises) {
        exercisesBySplit = JSON.parse(JSON.stringify(DEFAULT_DATA.gym.exercisesBySplit));
      }

      // Gym logs type migration (Push/Upper -> Upper A, Pull -> Upper B, Legs/Lower -> Lower A)
      let logs = (parsed.gym && parsed.gym.logs) || DEFAULT_DATA.gym.logs;
      if (Array.isArray(logs) && logs.some(l => l.type === 'Push' || l.type === 'Pull' || l.type === 'Legs' || l.type === 'Upper' || l.type === 'Lower')) {
        logs = logs.map(l => {
          if (l.type === 'Push' || l.type === 'Upper') return { ...l, type: 'Upper A' };
          if (l.type === 'Pull') return { ...l, type: 'Upper B' };
          if (l.type === 'Legs' || l.type === 'Lower') return { ...l, type: 'Lower A' };
          return l;
        });
      }

      const prExercises = (Array.isArray(parsed?.gym?.prExercises) && parsed.gym.prExercises.length > 0)
        ? parsed.gym.prExercises
        : JSON.parse(JSON.stringify(DEFAULT_DATA.gym.prExercises));

      const gymData = {
        ...DEFAULT_DATA.gym,
        ...(parsed.gym || {}),
        split,
        exercisesBySplit,
        prExercises,
        logs
      };

      return {
        ...DEFAULT_DATA,
        ...parsed,
        projects,
        user: { ...DEFAULT_DATA.user, ...(parsed.user || {}) },
        gym: gymData,
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
  initActiveWorkout();
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

  // Update filter counts
  const countAll = document.getElementById('count-proj-all');
  const countProgress = document.getElementById('count-proj-progress');
  const countPlanned = document.getElementById('count-proj-planned');
  const countDone = document.getElementById('count-proj-done');

  if (countAll) countAll.textContent = state.projects.length;
  if (countProgress) countProgress.textContent = state.projects.filter(p => p.status === 'in_progress').length;
  if (countPlanned) countPlanned.textContent = state.projects.filter(p => p.status === 'planned').length;
  if (countDone) countDone.textContent = state.projects.filter(p => p.status === 'completed').length;

  // Always update Kanban columns in background or when active
  renderProjectsKanban(searchTerm);

  if (!grid) return;

  let filtered = state.projects;
  if (currentProjectFilter !== 'all') {
    filtered = filtered.filter(p => p.status === currentProjectFilter);
  }

  if (searchTerm) {
    filtered = filtered.filter(p => 
      p.title.toLowerCase().includes(searchTerm) || 
      (p.description && p.description.toLowerCase().includes(searchTerm)) ||
      (p.category && p.category.toLowerCase().includes(searchTerm)) ||
      (Array.isArray(p.techStack) && p.techStack.some(t => t.toLowerCase().includes(searchTerm)))
    );
  }

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

    // Tech Stack Chips
    const techStackHtml = (Array.isArray(proj.techStack) && proj.techStack.length > 0)
      ? `<div class="project-tech-stack">${proj.techStack.map(tag => `<span class="tech-chip">${escapeHtml(tag)}</span>`).join('')}</div>`
      : '';

    // Direct Links (GitHub & Live Demo)
    let linksHtml = '';
    if (proj.url || proj.liveUrl) {
      linksHtml = '<div class="project-links-row">';
      if (proj.url) {
        linksHtml += `<a href="${escapeHtml(proj.url)}" target="_blank" rel="noopener" class="project-link-badge" title="Otevřít GitHub repozitář">
          <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
          <span>GitHub</span>
        </a>`;
      }
      if (proj.liveUrl) {
        linksHtml += `<a href="${escapeHtml(proj.liveUrl)}" target="_blank" rel="noopener" class="project-link-badge demo-live" title="Otevřít Live aplikaci / demo">
          <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
          <span>Live Demo</span>
        </a>`;
      }
      linksHtml += '</div>';
    }

    const notesCount = (Array.isArray(proj.devNotes) ? proj.devNotes.length : 0);

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
        ${techStackHtml}

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
                <div class="subtask-content">
                  <div class="custom-checkbox">
                    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span>${escapeHtml(t.text)}</span>
                </div>
                <button type="button" class="btn-del-subtask" data-task-id="${t.id}" data-project-id="${proj.id}" title="Smazat podúkol">&times;</button>
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
            ${proj.deadline ? `<span>📅 ${proj.deadline}</span>` : '<span>Bez termínu</span>'}
            ${linksHtml}
          </div>
          <div class="project-card-actions">
            <button type="button" class="btn btn-sm btn-secondary btn-notes-project" data-id="${proj.id}" title="Otevřít vývojářský deník a poznámky">
              📝 Deník (${notesCount})
            </button>
            <button type="button" class="btn btn-sm btn-secondary btn-edit-project" data-id="${proj.id}">Upravit</button>
            <button type="button" class="btn btn-sm btn-danger btn-delete-project" data-id="${proj.id}">Smazat</button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Event handlers for project cards
  grid.querySelectorAll('.subtask-content').forEach(el => {
    el.addEventListener('click', () => {
      const parent = el.closest('.subtask-item');
      if (!parent) return;
      const projId = parent.getAttribute('data-project-id');
      const taskId = parent.getAttribute('data-task-id');
      toggleProjectSubtask(projId, taskId);
    });
  });

  grid.querySelectorAll('.btn-del-subtask').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const projId = btn.getAttribute('data-project-id');
      const taskId = btn.getAttribute('data-task-id');
      deleteProjectSubtask(projId, taskId);
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

  grid.querySelectorAll('.btn-notes-project').forEach(btn => {
    btn.addEventListener('click', () => {
      const projId = btn.getAttribute('data-id');
      openProjectNotesModal(projId);
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

// ==========================================================================
// 2B. KANBAN BOARD RENDERING
// ==========================================================================
function renderProjectsKanban(searchTerm = '') {
  const listPlanned = document.getElementById('kanban-list-planned');
  const listProgress = document.getElementById('kanban-list-progress');
  const listCompleted = document.getElementById('kanban-list-completed');

  const countPlanned = document.getElementById('kanban-count-planned');
  const countProgress = document.getElementById('kanban-count-progress');
  const countCompleted = document.getElementById('kanban-count-completed');

  if (!listPlanned || !listProgress || !listCompleted) return;

  let allProjects = state.projects;
  if (searchTerm) {
    allProjects = allProjects.filter(p =>
      p.title.toLowerCase().includes(searchTerm) ||
      (p.description && p.description.toLowerCase().includes(searchTerm)) ||
      (p.category && p.category.toLowerCase().includes(searchTerm)) ||
      (Array.isArray(p.techStack) && p.techStack.some(t => t.toLowerCase().includes(searchTerm)))
    );
  }

  const planned = allProjects.filter(p => p.status === 'planned');
  const inProgress = allProjects.filter(p => p.status === 'in_progress');
  const completed = allProjects.filter(p => p.status === 'completed');

  if (countPlanned) countPlanned.textContent = planned.length;
  if (countProgress) countProgress.textContent = inProgress.length;
  if (countCompleted) countCompleted.textContent = completed.length;

  const renderKanbanCard = (proj) => {
    const tasks = proj.tasks || [];
    const doneTasksCount = tasks.filter(t => t.done).length;
    const notesCount = (Array.isArray(proj.devNotes) ? proj.devNotes.length : 0);

    const techChips = (Array.isArray(proj.techStack) && proj.techStack.length > 0)
      ? `<div class="project-tech-stack">${proj.techStack.map(t => `<span class="tech-chip">${escapeHtml(t)}</span>`).join('')}</div>`
      : '';

    // Action buttons depending on status
    let moveButtons = '';
    if (proj.status === 'planned') {
      moveButtons = `<button type="button" class="btn-kanban-move" data-id="${proj.id}" data-target-status="in_progress">▶ Začít řešit</button>`;
    } else if (proj.status === 'in_progress') {
      moveButtons = `
        <button type="button" class="btn-kanban-move" data-id="${proj.id}" data-target-status="planned">◀ Plán</button>
        <button type="button" class="btn-kanban-move" data-id="${proj.id}" data-target-status="completed">✓ Hotovo</button>
      `;
    } else if (proj.status === 'completed') {
      moveButtons = `<button type="button" class="btn-kanban-move" data-id="${proj.id}" data-target-status="in_progress">◀ Znovu otevřít</button>`;
    }

    return `
      <div class="kanban-card" data-project-id="${proj.id}">
        <div class="kanban-card-top">
          <h4 class="kanban-card-title">${escapeHtml(proj.title)}</h4>
          ${proj.category ? `<span class="project-tag">${escapeHtml(proj.category)}</span>` : ''}
        </div>

        ${proj.description ? `<p class="kanban-card-desc">${escapeHtml(proj.description)}</p>` : ''}
        ${techChips}

        <div class="project-progress-section" style="margin-top: 4px;">
          <div class="progress-bar">
            <div class="progress-fill fill-indigo" style="width: ${proj.progress || 0}%"></div>
          </div>
        </div>

        <div class="kanban-card-meta">
          <span>📋 ${doneTasksCount}/${tasks.length} úkolů (${proj.progress || 0}%)</span>
          ${proj.deadline ? `<span>📅 ${proj.deadline}</span>` : ''}
        </div>

        <div class="kanban-card-actions">
          <div style="display: flex; gap: 4px;">
            ${moveButtons}
          </div>
          <div style="display: flex; gap: 4px;">
            <button type="button" class="btn btn-sm btn-secondary btn-notes-project" data-id="${proj.id}" title="Vývojářský deník">
              📝 ${notesCount}
            </button>
            <button type="button" class="btn btn-sm btn-secondary btn-edit-project" data-id="${proj.id}" title="Upravit projekt">
              ⚙️
            </button>
          </div>
        </div>
      </div>
    `;
  };

  listPlanned.innerHTML = planned.length > 0 
    ? planned.map(renderKanbanCard).join('') 
    : '<div class="kanban-empty-hint">Žádné plánované projekty</div>';

  listProgress.innerHTML = inProgress.length > 0 
    ? inProgress.map(renderKanbanCard).join('') 
    : '<div class="kanban-empty-hint">Žádné projekty v řešení</div>';

  listCompleted.innerHTML = completed.length > 0 
    ? completed.map(renderKanbanCard).join('') 
    : '<div class="kanban-empty-hint">Žádné dokončené projekty</div>';

  // Event handlers for Kanban move buttons
  const board = document.getElementById('projects-kanban-board');
  if (board) {
    board.querySelectorAll('.btn-kanban-move').forEach(btn => {
      btn.addEventListener('click', () => {
        const projId = btn.getAttribute('data-id');
        const targetStatus = btn.getAttribute('data-target-status');
        moveProjectStatus(projId, targetStatus);
      });
    });

    board.querySelectorAll('.btn-notes-project').forEach(btn => {
      btn.addEventListener('click', () => {
        const projId = btn.getAttribute('data-id');
        openProjectNotesModal(projId);
      });
    });

    board.querySelectorAll('.btn-edit-project').forEach(btn => {
      btn.addEventListener('click', () => {
        const projId = btn.getAttribute('data-id');
        openProjectModal(projId);
      });
    });
  }
}

function switchProjectView(mode) {
  currentProjectViewMode = mode;
  const btnGrid = document.getElementById('btn-project-view-grid');
  const btnKanban = document.getElementById('btn-project-view-kanban');
  const gridEl = document.getElementById('projects-grid');
  const kanbanEl = document.getElementById('projects-kanban-board');
  const filterPills = document.getElementById('project-filters');

  if (mode === 'kanban') {
    if (btnGrid) btnGrid.classList.remove('active');
    if (btnKanban) btnKanban.classList.add('active');
    if (gridEl) gridEl.classList.add('hidden');
    if (kanbanEl) kanbanEl.classList.remove('hidden');
    if (filterPills) filterPills.style.opacity = '0.35';
  } else {
    if (btnGrid) btnGrid.classList.add('active');
    if (btnKanban) btnKanban.classList.remove('active');
    if (gridEl) gridEl.classList.remove('hidden');
    if (kanbanEl) kanbanEl.classList.add('hidden');
    if (filterPills) filterPills.style.opacity = '1';
  }

  renderProjects();
}

function moveProjectStatus(projId, nextStatus) {
  const proj = state.projects.find(p => p.id === projId);
  if (!proj) return;

  proj.status = nextStatus;

  if (nextStatus === 'completed') {
    proj.progress = 100;
    if (proj.tasks) {
      proj.tasks.forEach(t => t.done = true);
    }
  } else if (nextStatus === 'in_progress' && proj.progress === 100) {
    proj.progress = 75;
  }

  saveState();
  renderProjects();
  renderOverview();
  updateMetrics();
  updateSidebarBadges();
  
  const statusLabel = nextStatus === 'in_progress' ? 'V řešení' : (nextStatus === 'completed' ? 'Hotovo' : 'Plánováno');
  showToast(`Projekt „${proj.title}“ přesunut: ${statusLabel}`);
}

function deleteProjectSubtask(projId, taskId) {
  const proj = state.projects.find(p => p.id === projId);
  if (!proj || !proj.tasks) return;

  proj.tasks = proj.tasks.filter(t => t.id !== taskId);

  if (proj.tasks.length > 0) {
    const doneCount = proj.tasks.filter(t => t.done).length;
    proj.progress = Math.round((doneCount / proj.tasks.length) * 100);
  }

  saveState();
  renderProjects();
  renderOverview();
  updateMetrics();
  showToast('Podúkol smazán');
}

// ==========================================================================
// 2C. DEV NOTES / CHANGELOG MODAL
// ==========================================================================
let currentNotesProjectId = null;

function openProjectNotesModal(projId) {
  const modal = document.getElementById('modal-project-notes');
  const proj = state.projects.find(p => p.id === projId);
  if (!modal || !proj) return;

  currentNotesProjectId = projId;
  const idInput = document.getElementById('project-note-proj-id');
  const titleEl = document.getElementById('modal-project-notes-title');
  const subEl = document.getElementById('modal-project-notes-sub');
  const noteInput = document.getElementById('project-note-input');

  if (idInput) idInput.value = projId;
  if (titleEl) titleEl.textContent = `Vývojářský deník: ${proj.title}`;
  if (subEl) subEl.textContent = proj.category ? `Kategorie: ${proj.category}` : 'Zápis nápadů, architektury a milníků';
  if (noteInput) {
    noteInput.value = '';
    setTimeout(() => noteInput.focus(), 100);
  }

  renderProjectDevNotesList(projId);
  modal.showModal();
  markModalInitialState(modal);
}

function renderProjectDevNotesList(projId) {
  const container = document.getElementById('project-dev-notes-list');
  const countEl = document.getElementById('project-notes-count');
  const proj = state.projects.find(p => p.id === projId);
  if (!container || !proj) return;

  const notes = Array.isArray(proj.devNotes) ? [...proj.devNotes] : [];
  if (countEl) countEl.textContent = `${notes.length} záznamů`;

  if (notes.length === 0) {
    container.innerHTML = '<p class="text-muted text-sm" style="text-align: center; padding: 24px;">Zatím žádné záznamy v deníku projektu. Přidej první výše!</p>';
    return;
  }

  // Reverse to show newest notes first
  const reversedNotes = [...notes].reverse();

  container.innerHTML = reversedNotes.map(n => `
    <div class="dev-note-item" data-note-id="${n.id}">
      <div class="dev-note-header">
        <span class="dev-note-date">🗓️ ${escapeHtml(n.date || '')}</span>
        <button type="button" class="btn-del-dev-note" data-note-id="${n.id}" data-proj-id="${proj.id}" title="Smazat záznam">&times;</button>
      </div>
      <div class="dev-note-text">${escapeHtml(n.text || '')}</div>
    </div>
  `).join('');

  container.querySelectorAll('.btn-del-dev-note').forEach(btn => {
    btn.addEventListener('click', () => {
      const pId = btn.getAttribute('data-proj-id');
      const nId = btn.getAttribute('data-note-id');
      deleteProjectDevNote(pId, nId);
    });
  });
}

function addProjectDevNote(projId, text) {
  const proj = state.projects.find(p => p.id === projId);
  if (!proj || !text.trim()) return;

  if (!Array.isArray(proj.devNotes)) {
    proj.devNotes = [];
  }

  proj.devNotes.push({
    id: 'dn_' + Date.now(),
    date: formatDateTimeStr(new Date()),
    text: text.trim()
  });

  saveState();
  renderProjectDevNotesList(projId);
  renderProjects();
  showToast('Záznam zapsán do deníku 📝');
}

function deleteProjectDevNote(projId, noteId) {
  const proj = state.projects.find(p => p.id === projId);
  if (!proj || !proj.devNotes) return;

  proj.devNotes = proj.devNotes.filter(n => n.id !== noteId);
  saveState();
  renderProjectDevNotesList(projId);
  renderProjects();
  showToast('Záznam smazán');
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
  markAsDeleted(projId);
  state.projects = state.projects.filter(p => p.id !== projId);
  saveState(true);
  if (supabaseClient && currentUser) {
    supabaseClient.from('projects').delete().eq('id', projId).eq('user_id', currentUser.id).then(({ error }) => {
      if (error) console.error('Error deleting project from Supabase:', error);
    });
  }
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
  renderActiveWorkoutBanner();
  renderWeeklySplitGrid();
  renderGymAnalytics();
  renderWorkoutLogs();
}

function initActiveWorkout() {
  try {
    const raw = localStorage.getItem('lifeos_active_workout');
    if (raw) {
      activeWorkout = JSON.parse(raw);
      startActiveWorkoutTimer();
      renderActiveWorkoutBanner();
    }
  } catch (e) {
    activeWorkout = null;
  }
}

function sanitizeGymSplit() {
  if (!state.gym || !Array.isArray(state.gym.split)) {
    if (!state.gym) state.gym = {};
    state.gym.split = JSON.parse(JSON.stringify(DEFAULT_DATA.gym.split));
    return;
  }

  // Strictly filter out any items with day > 6, starting with '__' or focus being JSON
  const validDays = state.gym.split.filter(s => {
    return s &&
      typeof s.day === 'number' &&
      s.day >= 0 &&
      s.day <= 6 &&
      (!s.dayName || !s.dayName.startsWith('__')) &&
      (!s.focus || (!s.focus.startsWith('{') && !s.focus.startsWith('[')));
  });

  const dayIndices = new Set(validDays.map(s => s.day));
  const hasAll7Days = [0, 1, 2, 3, 4, 5, 6].every(d => dayIndices.has(d));

  if (validDays.length === 7 && hasAll7Days) {
    state.gym.split = validDays;
  } else {
    const defaultSplit = JSON.parse(JSON.stringify(DEFAULT_DATA.gym.split));
    state.gym.split = defaultSplit.map(defDay => {
      const existing = validDays.find(v => v.day === defDay.day);
      return existing || defDay;
    });
  }
}

function startActiveWorkout(split = null) {
  if (activeWorkout) {
    showToast(`🔥 Trénink (${activeWorkout.split}) již běží! Stopky pokračují.`);
    openWorkoutModal();
    return;
  }

  const chosenSplit = split || getTodaySplitFocus() || 'Upper A';

  // Automatically prepare exercise templates for chosen split with previous weights
  let initialExercises = [];
  const templateNames = (state.gym.exercisesBySplit && state.gym.exercisesBySplit[chosenSplit]) ||
                        (DEFAULT_DATA.gym.exercisesBySplit && DEFAULT_DATA.gym.exercisesBySplit[chosenSplit]) ||
                        [];
  if (templateNames.length > 0) {
    initialExercises = templateNames.map(name => {
      const perf = getLastExercisePerformance(name);
      let initialSets = [{ setNum: 1, weight: '', reps: '' }];
      if (perf && perf.sets && perf.sets.length > 0) {
        initialSets = perf.sets.map((s, idx) => ({
          setNum: idx + 1,
          weight: s.weight,
          reps: s.reps
        }));
      }
      return {
        id: 'ex_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
        name,
        sets: initialSets
      };
    });
  }

  activeWorkout = {
    id: 'log_' + Date.now(),
    startTime: Date.now(),
    split: chosenSplit,
    exercises: initialExercises,
    rating: 4,
    notes: ''
  };

  try {
    localStorage.setItem('lifeos_active_workout', JSON.stringify(activeWorkout));
  } catch (e) {}

  startActiveWorkoutTimer();
  renderActiveWorkoutBanner();
  showToast(`🔥 Trénink (${chosenSplit}) zahájen! Stopky běží. Průběžně zapisuj své série.`);
  openWorkoutModal();
}

function startActiveWorkoutTimer() {
  if (activeWorkoutTimerInterval) clearInterval(activeWorkoutTimerInterval);
  updateActiveWorkoutTimerUI();
  activeWorkoutTimerInterval = setInterval(updateActiveWorkoutTimerUI, 1000);
}

function updateActiveWorkoutTimerUI() {
  if (!activeWorkout) {
    if (activeWorkoutTimerInterval) clearInterval(activeWorkoutTimerInterval);
    return;
  }
  const timerEl = document.getElementById('active-workout-timer');
  const splitEl = document.getElementById('active-workout-split-name');
  if (splitEl) splitEl.textContent = activeWorkout.split || 'Trénink';

  const elapsedSeconds = Math.floor((Date.now() - activeWorkout.startTime) / 1000);
  const hours = Math.floor(elapsedSeconds / 3600);
  const mins = Math.floor((elapsedSeconds % 3600) / 60);
  const secs = elapsedSeconds % 60;

  const formatted = hours > 0
    ? `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
    : `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

  if (timerEl) timerEl.textContent = formatted;
}

function renderActiveWorkoutBanner() {
  const banner = document.getElementById('active-workout-banner');
  if (!banner) return;
  if (activeWorkout) {
    banner.classList.remove('hidden');
    updateActiveWorkoutTimerUI();
  } else {
    banner.classList.add('hidden');
  }
}

function cancelActiveWorkout() {
  if (!confirm('Opravdu chceš běžící trénink zrušit? Pokud jsi už průběžně uložil série, bude záznam odstraněn.')) return;
  if (activeWorkout && activeWorkout.id) {
    state.gym.logs = state.gym.logs.filter(l => l.id !== activeWorkout.id);
    if (supabaseClient && currentUser) {
      supabaseClient.from('gym_logs').delete().eq('id', activeWorkout.id).eq('user_id', currentUser.id).then(() => {});
    }
  }
  if (activeWorkoutTimerInterval) clearInterval(activeWorkoutTimerInterval);
  activeWorkout = null;
  try {
    localStorage.removeItem('lifeos_active_workout');
  } catch (e) {}
  renderActiveWorkoutBanner();
  saveState();
  renderGym();
  renderOverview();
  updateMetrics();
  updateSidebarBadges();
  showToast('Běžící trénink byl zrušen.');
}

function finishActiveWorkout(isFromModal = false) {
  if (!activeWorkout) return;

  const elapsedMinutes = Math.max(1, Math.round((Date.now() - activeWorkout.startTime) / 60000));
  const today = getTodayStr();

  let compiledExercises = '';
  let rating = 4;
  let splitType = activeWorkout.split;

  if (isFromModal) {
    const exercisesArr = [];
    currentWorkoutExercises.forEach(ex => {
      const validSets = ex.sets.filter(s => s.weight !== '' || s.reps !== '');
      if (validSets.length > 0) {
        const setsSummary = validSets.map(s => {
          const w = s.weight ? `${s.weight} kg` : 'vlastní váha';
          const r = s.reps ? `${s.reps}` : 'max';
          return `${w} × ${r}`;
        }).join(', ');
        exercisesArr.push(`• ${ex.name}: ${validSets.length} série (${setsSummary})`);
      }
    });
    const notes = document.getElementById('workout-notes')?.value.trim();
    if (exercisesArr.length > 0) {
      compiledExercises = exercisesArr.join('\n');
      if (notes) compiledExercises += `\nPoznámka: ${notes}`;
    } else {
      compiledExercises = notes;
    }
    rating = parseInt(document.getElementById('workout-rating')?.value || '4', 10);
    splitType = document.getElementById('workout-type')?.value || activeWorkout.split;
  } else {
    // Called from banner outside modal
    const existingLog = state.gym.logs.find(l => l.id === activeWorkout.id);
    if (existingLog) {
      compiledExercises = existingLog.exercises;
      rating = existingLog.rating;
      splitType = existingLog.type;
    } else if (activeWorkout.exercises && activeWorkout.exercises.length > 0) {
      const exercisesArr = [];
      activeWorkout.exercises.forEach(ex => {
        const validSets = ex.sets.filter(s => s.weight !== '' || s.reps !== '');
        if (validSets.length > 0) {
          const setsSummary = validSets.map(s => {
            const w = s.weight ? `${s.weight} kg` : 'vlastní váha';
            const r = s.reps ? `${s.reps}` : 'max';
            return `${w} × ${r}`;
          }).join(', ');
          exercisesArr.push(`• ${ex.name}: ${validSets.length} série (${setsSummary})`);
        }
      });
      compiledExercises = exercisesArr.join('\n');
    }

    if (!confirm(`Chceš dokončit trénink? Celková délka: ${elapsedMinutes} minut.`)) {
      return;
    }
  }

  // Save / Update final log
  const finalLog = {
    id: activeWorkout.id,
    date: today,
    duration: elapsedMinutes,
    type: splitType,
    rating,
    exercises: compiledExercises
  };

  const existingIdx = state.gym.logs.findIndex(l => l.id === activeWorkout.id);
  if (existingIdx >= 0) {
    state.gym.logs[existingIdx] = finalLog;
  } else {
    state.gym.logs.unshift(finalLog);
  }

  // Mark gym habit done today
  const gymHabit = state.habits.find(h => h.id === 'h_gym');
  if (gymHabit) {
    if (!state.habitLogs[today]) state.habitLogs[today] = [];
    if (!state.habitLogs[today].includes(gymHabit.id)) {
      state.habitLogs[today].push(gymHabit.id);
    }
  }

  if (activeWorkoutTimerInterval) clearInterval(activeWorkoutTimerInterval);
  activeWorkout = null;
  try {
    localStorage.removeItem('lifeos_active_workout');
  } catch (e) {}

  const modalWorkout = document.getElementById('modal-workout');
  if (modalWorkout) {
    modalWorkout._initialValues = null;
    modalWorkout.close();
  }

  renderActiveWorkoutBanner();
  saveState();
  renderGym();
  renderOverview();
  updateMetrics();
  updateSidebarBadges();
  showToast(`🎉 Skvělá práce! Trénink (${elapsedMinutes} min) dokončen! 💪`);
}

function getTodaySplitFocus() {
  sanitizeGymSplit();
  const dayIndex = new Date().getDay();
  const dayItem = state.gym.split.find(s => s.day === dayIndex);
  if (dayItem && !dayItem.rest && dayItem.focus) {
    return dayItem.focus;
  }
  return 'Upper A';
}

function calculateGymStats() {
  const logs = (state.gym && state.gym.logs) || [];
  let totalVolumeKg = 0;
  let totalDurationMinutes = 0;
  const currentMonth = new Date().toISOString().substring(0, 7); // YYYY-MM
  let monthVolumeKg = 0;
  const exerciseStats = {}; // name -> { name, maxWeight, maxRepsAtMaxWeight, max1RM, bestDate, history: [] }

  logs.forEach(log => {
    totalDurationMinutes += (log.duration || 60);
    const isThisMonth = log.date && log.date.startsWith(currentMonth);

    if (!log.exercises) return;
    const lines = log.exercises.split('\n');
    lines.forEach(rawLine => {
      const line = rawLine.trim();
      if (!line.includes(':') || line.startsWith('Poznámka:')) return;
      const exName = line.replace(/^[•\-\*]\s*/, '').split(':')[0].trim();
      const parenMatch = line.match(/\((.*?)\)/);
      if (!parenMatch) return;

      if (!exerciseStats[exName]) {
        exerciseStats[exName] = {
          name: exName,
          maxWeight: 0,
          maxRepsAtMaxWeight: 0,
          max1RM: 0,
          bestDate: log.date,
          history: []
        };
      }

      let workoutExVolume = 0;
      const rawSets = parenMatch[1].split(',');
      const parsedSets = [];

      rawSets.forEach(s => {
        const multMatch = s.trim().match(/([\d\.]+)\s*kg\s*[×x\*]\s*(\d+)/i);
        if (multMatch) {
          const w = parseFloat(multMatch[1]);
          const r = parseInt(multMatch[2], 10);
          const volume = w * r;
          totalVolumeKg += volume;
          if (isThisMonth) monthVolumeKg += volume;
          workoutExVolume += volume;
          parsedSets.push({ weight: w, reps: r });

          // 1RM estimation (Epley formula: w * (1 + r / 30))
          const est1RM = Math.round(w * (1 + r / 30));
          if (w > exerciseStats[exName].maxWeight || (w === exerciseStats[exName].maxWeight && r > exerciseStats[exName].maxRepsAtMaxWeight)) {
            exerciseStats[exName].maxWeight = w;
            exerciseStats[exName].maxRepsAtMaxWeight = r;
            exerciseStats[exName].bestDate = log.date;
          }
          if (est1RM > exerciseStats[exName].max1RM) {
            exerciseStats[exName].max1RM = est1RM;
          }
        }
      });

      if (parsedSets.length > 0) {
        exerciseStats[exName].history.push({
          date: log.date,
          type: log.type,
          summary: parenMatch[1].trim(),
          volume: workoutExVolume,
          sets: parsedSets
        });
      }
    });
  });

  return {
    totalVolumeKg: Math.round(totalVolumeKg),
    monthVolumeKg: Math.round(monthVolumeKg),
    totalDurationMinutes,
    totalWorkouts: logs.length,
    exerciseStats
  };
}

function findExerciseStat(targetName, exerciseStats) {
  if (!exerciseStats || !targetName) return null;
  if (exerciseStats[targetName]) return exerciseStats[targetName];

  const lowerTarget = targetName.toLowerCase().trim();
  for (const [name, st] of Object.entries(exerciseStats)) {
    if (name.toLowerCase().trim() === lowerTarget) {
      return st;
    }
  }

  for (const [name, st] of Object.entries(exerciseStats)) {
    const lowerName = name.toLowerCase().trim();
    if (lowerName.includes(lowerTarget) || lowerTarget.includes(lowerName)) {
      return st;
    }
  }

  return null;
}

function getAllKnownGymExercises() {
  const set = new Set();
  if (state.gym && state.gym.exercisesBySplit) {
    Object.values(state.gym.exercisesBySplit).forEach(arr => {
      if (Array.isArray(arr)) arr.forEach(ex => set.add(ex.trim()));
    });
  }
  if (DEFAULT_DATA.gym && DEFAULT_DATA.gym.exercisesBySplit) {
    Object.values(DEFAULT_DATA.gym.exercisesBySplit).forEach(arr => {
      if (Array.isArray(arr)) arr.forEach(ex => set.add(ex.trim()));
    });
  }
  if (state.gym && state.gym.logs) {
    state.gym.logs.forEach(l => {
      if (!l.exercises) return;
      l.exercises.split('\n').forEach(raw => {
        const line = raw.trim();
        if (!line.includes(':') || line.startsWith('Poznámka:')) return;
        const name = line.replace(/^[•\-\*]\s*/, '').split(':')[0].trim();
        if (name) set.add(name);
      });
    });
  }
  if (state.gym && Array.isArray(state.gym.prExercises)) {
    state.gym.prExercises.forEach(ex => set.add(ex.trim()));
  }
  return Array.from(set).filter(Boolean).sort((a, b) => a.localeCompare(b, 'cs'));
}

function renderGymAnalytics() {
  const stats = calculateGymStats();

  const totalVolEl = document.getElementById('stat-total-volume');
  const monthVolEl = document.getElementById('stat-month-volume');
  const totalTimeEl = document.getElementById('stat-total-time');
  const avgDurEl = document.getElementById('stat-avg-duration');
  const totalWorkoutsEl = document.getElementById('stat-total-workouts');
  const totalBadgeEl = document.getElementById('gym-analytics-total-badge');
  const prGrid = document.getElementById('pr-cards-grid');
  const exSelect = document.getElementById('pr-exercise-select');
  const countBadge = document.getElementById('pr-exercises-count');

  if (totalVolEl) totalVolEl.textContent = `${stats.totalVolumeKg.toLocaleString('cs-CZ')} kg`;
  if (monthVolEl) monthVolEl.textContent = `Tento měsíc: ${stats.monthVolumeKg.toLocaleString('cs-CZ')} kg`;

  const hours = Math.round(stats.totalDurationMinutes / 60 * 10) / 10;
  if (totalTimeEl) totalTimeEl.textContent = `${hours} hod`;
  const avgDur = stats.totalWorkouts > 0 ? Math.round(stats.totalDurationMinutes / stats.totalWorkouts) : 0;
  if (avgDurEl) avgDurEl.textContent = `Průměr: ${avgDur} min / trénink`;

  if (totalWorkoutsEl) totalWorkoutsEl.textContent = stats.totalWorkouts;
  if (totalBadgeEl) totalBadgeEl.textContent = `${stats.totalWorkouts} tréninků`;

  if (!state.gym.prExercises || !Array.isArray(state.gym.prExercises)) {
    state.gym.prExercises = JSON.parse(JSON.stringify(DEFAULT_DATA.gym.prExercises));
  }

  if (countBadge) {
    countBadge.textContent = state.gym.prExercises.length;
  }

  // Render Highlighted PR Cards
  if (prGrid) {
    if (state.gym.prExercises.length === 0) {
      prGrid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 26px 16px; border: 1px dashed var(--border-color); border-radius: var(--radius-md); background: rgba(255,255,255,0.01);">
          <p class="text-sm text-muted">Zatím nemáš vybrané žádné cviky pro sledování PR.</p>
          <button type="button" class="btn btn-primary btn-sm" id="btn-empty-pr-configure" style="margin-top: 10px;">
            ⚙️ Vybrat cviky na PR
          </button>
        </div>
      `;
      const emptyBtn = document.getElementById('btn-empty-pr-configure');
      if (emptyBtn) emptyBtn.addEventListener('click', openPrExercisesModal);
    } else {
      const cardsHtml = state.gym.prExercises.map(targetName => {
        const foundStat = findExerciseStat(targetName, stats.exerciseStats);

        if (foundStat && foundStat.maxWeight > 0) {
          return `
            <div class="pr-card" data-exercise="${escapeHtml(targetName)}" title="Klikni pro detailní historii">
              <div class="pr-card-header-row">
                <span class="pr-card-name" title="${escapeHtml(foundStat.name || targetName)}">🏆 ${escapeHtml(foundStat.name || targetName)}</span>
                <button type="button" class="btn-remove-pr-card" data-exercise="${escapeHtml(targetName)}" title="Odebrat z hlavních PR">&times;</button>
              </div>
              <div class="pr-card-main-stat">
                <span class="pr-card-weight">${foundStat.maxWeight} kg</span>
                <span class="pr-card-reps">× ${foundStat.maxRepsAtMaxWeight} reps</span>
              </div>
              <div class="pr-card-meta">
                <span>Odhad 1RM: <strong class="pr-1rm-badge">${foundStat.max1RM} kg</strong></span>
                <span>📅 ${foundStat.bestDate}</span>
              </div>
            </div>
          `;
        } else {
          return `
            <div class="pr-card" style="opacity: 0.72;" data-exercise="${escapeHtml(targetName)}" title="Klikni pro detailní historii">
              <div class="pr-card-header-row">
                <span class="pr-card-name" title="${escapeHtml(targetName)}">🏋️ ${escapeHtml(targetName)}</span>
                <button type="button" class="btn-remove-pr-card" data-exercise="${escapeHtml(targetName)}" title="Odebrat z hlavních PR">&times;</button>
              </div>
              <div class="pr-card-main-stat">
                <span class="pr-card-weight" style="font-size: 15px; color: var(--text-muted); font-weight: 600;">Zatím nezaznamenáno</span>
              </div>
              <div class="pr-card-meta">
                <span>1RM: -</span>
                <span class="text-xs text-muted">Zapiš trénink</span>
              </div>
            </div>
          `;
        }
      }).join('');

      prGrid.innerHTML = cardsHtml;

      // Handle clicking "×" button on PR card
      prGrid.querySelectorAll('.btn-remove-pr-card').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const name = btn.getAttribute('data-exercise');
          state.gym.prExercises = state.gym.prExercises.filter(x => x !== name);
          saveState();
          renderGymAnalytics();
          showToast(`Cvik "${name}" byl odebrán z PR.`);
        });
      });

      // Handle clicking PR card to inspect in Explorer
      prGrid.querySelectorAll('.pr-card').forEach(card => {
        card.addEventListener('click', (e) => {
          if (e.target.closest('.btn-remove-pr-card')) return;
          const name = card.getAttribute('data-exercise');
          if (exSelect && name) {
            let matchedValue = null;
            for (const opt of exSelect.options) {
              if (opt.value.toLowerCase() === name.toLowerCase()) {
                matchedValue = opt.value;
                break;
              }
            }
            if (!matchedValue) {
              for (const opt of exSelect.options) {
                if (opt.value.toLowerCase().includes(name.toLowerCase()) || name.toLowerCase().includes(opt.value.toLowerCase())) {
                  matchedValue = opt.value;
                  break;
                }
              }
            }
            if (matchedValue) {
              exSelect.value = matchedValue;
              renderExerciseExplorerDetails(matchedValue, stats.exerciseStats);
              const explorerBox = document.querySelector('.exercise-explorer-box');
              if (explorerBox) explorerBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
          }
        });
      });
    }
  }

  // Populate Exercise Select Dropdown
  if (exSelect) {
    const sortedExercises = getAllKnownGymExercises();
    const prevSelected = exSelect.value;

    exSelect.innerHTML = sortedExercises.map(name => `
      <option value="${escapeHtml(name)}">${escapeHtml(name)}</option>
    `).join('');

    if (prevSelected && sortedExercises.includes(prevSelected)) {
      exSelect.value = prevSelected;
    } else if (sortedExercises.length > 0) {
      exSelect.value = sortedExercises[0];
    }

    renderExerciseExplorerDetails(exSelect.value, stats.exerciseStats);
  }
}

function renderExerciseExplorerDetails(exerciseName, statsMap = null) {
  const container = document.getElementById('pr-explorer-details');
  const pinBtn = document.getElementById('btn-toggle-explorer-pr');
  if (!container || !exerciseName) return;

  if (pinBtn) {
    const isPinned = state.gym.prExercises && state.gym.prExercises.some(x => x.toLowerCase() === exerciseName.toLowerCase());
    if (isPinned) {
      pinBtn.innerHTML = '★ V PR kartách';
      pinBtn.classList.remove('btn-secondary');
      pinBtn.classList.add('btn-accent');
      pinBtn.title = 'Tento cvik je sledován v hlavních PR kartách. Klikni pro odebrání.';
    } else {
      pinBtn.innerHTML = '⭐ Sledovat v PR';
      pinBtn.classList.remove('btn-accent');
      pinBtn.classList.add('btn-secondary');
      pinBtn.title = 'Přidat tento cvik do hlavních PR karet.';
    }
  }

  if (!statsMap) {
    const s = calculateGymStats();
    statsMap = s.exerciseStats;
  }

  const stat = findExerciseStat(exerciseName, statsMap);
  if (!stat || !stat.history || stat.history.length === 0) {
    container.innerHTML = `
      <p class="text-sm text-muted" style="text-align: center; padding: 16px;">
        Pro cvik <strong>${escapeHtml(exerciseName)}</strong> zatím nemáš žádné zaznamenané výkony v historii tréninků.
      </p>
    `;
    return;
  }

  const historyItems = [...stat.history].reverse().slice(0, 5).map(h => `
    <div class="explorer-timeline-item">
      <div>
        <span class="explorer-timeline-date">📅 ${h.date} (${escapeHtml(h.type)})</span>
        <div class="explorer-timeline-sets" style="margin-top: 2px;">${escapeHtml(h.summary)}</div>
      </div>
      <span class="badge" style="font-size: 11px;">Tonáž: ${h.volume} kg</span>
    </div>
  `).join('');

  container.innerHTML = `
    <div style="display: flex; gap: 16px; margin-bottom: 12px; flex-wrap: wrap; background: rgba(99, 102, 241, 0.08); padding: 10px 14px; border-radius: var(--radius-sm); border-left: 3px solid var(--accent-rose);">
      <div>All-time Max: <strong class="text-rose">${stat.maxWeight} kg × ${stat.maxRepsAtMaxWeight} reps</strong></div>
      <div>Odhadované 1RM: <strong class="pr-1rm-badge">${stat.max1RM} kg</strong></div>
      <div class="text-dim text-xs" style="align-self: center;">Rekord: ${stat.bestDate}</div>
    </div>
    <div class="explorer-history-timeline">
      ${historyItems}
    </div>
  `;
}

function openPrExercisesModal() {
  const modal = document.getElementById('modal-pr-exercises');
  if (!modal) return;
  const filterInput = document.getElementById('pr-exercises-filter-input');
  if (filterInput) filterInput.value = '';
  renderPrSelectionList();
  modal.showModal();
  markModalInitialState(modal);
}

function closePrExercisesModal() {
  const modal = document.getElementById('modal-pr-exercises');
  if (modal) modal.close();
}

function renderPrSelectionList(filterQuery = '') {
  const container = document.getElementById('pr-selection-list');
  if (!container) return;

  const allExercises = getAllKnownGymExercises();
  const currentPr = new Set((state.gym.prExercises || []).map(x => x.toLowerCase()));
  const stats = calculateGymStats();
  const query = (filterQuery || '').toLowerCase().trim();

  const filtered = allExercises.filter(name => !query || name.toLowerCase().includes(query));

  if (filtered.length === 0) {
    container.innerHTML = `<p class="text-sm text-muted" style="text-align: center; padding: 20px;">Žádný cvik neodpovídá hledání "${escapeHtml(filterQuery)}".</p>`;
    return;
  }

  container.innerHTML = filtered.map(name => {
    const isChecked = currentPr.has(name.toLowerCase());
    const stat = findExerciseStat(name, stats.exerciseStats);
    const statBadge = (stat && stat.maxWeight > 0)
      ? `<span class="badge text-xs" style="margin-left: auto; font-weight: 700; color: var(--accent-rose);">${stat.maxWeight} kg</span>`
      : '';

    return `
      <label class="pr-select-item">
        <input type="checkbox" value="${escapeHtml(name)}" class="pr-checkbox-item" ${isChecked ? 'checked' : ''}>
        <span class="pr-select-name">${escapeHtml(name)}</span>
        ${statBadge}
      </label>
    `;
  }).join('');
}

function savePrExercisesSelection() {
  const container = document.getElementById('pr-selection-list');
  if (!container) return;

  const checkedBoxes = container.querySelectorAll('.pr-checkbox-item:checked');
  const selected = Array.from(checkedBoxes).map(cb => cb.value);

  const filterInput = document.getElementById('pr-exercises-filter-input');
  const filterText = filterInput ? filterInput.value.trim().toLowerCase() : '';

  let finalPr = [];
  if (filterText) {
    const keptHidden = (state.gym.prExercises || []).filter(name => !name.toLowerCase().includes(filterText));
    finalPr = Array.from(new Set([...keptHidden, ...selected]));
  } else {
    finalPr = selected;
  }

  state.gym.prExercises = finalPr;
  saveState();
  renderGymAnalytics();
  closePrExercisesModal();
  showToast(`Sledovaná PR uložena (${finalPr.length} cviků)!`);
}

function resetDefaultPrExercises() {
  state.gym.prExercises = JSON.parse(JSON.stringify(DEFAULT_DATA.gym.prExercises));
  saveState();
  renderPrSelectionList();
  renderGymAnalytics();
  showToast('Sledovaná PR vrácena na výchozí hodnoty!');
}

function toggleExercisePrPin(exerciseName) {
  if (!exerciseName) return;
  if (!state.gym.prExercises) state.gym.prExercises = [];

  const existsIdx = state.gym.prExercises.findIndex(x => x.toLowerCase() === exerciseName.toLowerCase());
  if (existsIdx >= 0) {
    state.gym.prExercises.splice(existsIdx, 1);
    showToast(`Cvik "${exerciseName}" odebrán z PR.`);
  } else {
    state.gym.prExercises.push(exerciseName);
    showToast(`Cvik "${exerciseName}" přidán do PR! 🏆`);
  }
  saveState();
  renderGymAnalytics();
}

function getLastExercisePerformance(exerciseName) {
  if (!state.gym || !state.gym.logs || !exerciseName) return null;
  const cleanTarget = exerciseName.toLowerCase().trim();
  const sorted = [...state.gym.logs].sort((a, b) => new Date(b.date) - new Date(a.date));

  for (const log of sorted) {
    if (!log.exercises) continue;
    const lines = log.exercises.split('\n');
    for (const rawLine of lines) {
      const line = rawLine.trim();
      if (!line.includes(':')) continue;
      const exName = line.replace(/^[•\-\*]\s*/, '').split(':')[0].trim();
      if (exName.toLowerCase() === cleanTarget) {
        const parenMatch = line.match(/\((.*?)\)/);
        const sets = [];
        if (parenMatch) {
          const rawSets = parenMatch[1].split(',');
          rawSets.forEach((s, idx) => {
            const str = s.trim();
            const multMatch = str.match(/([\d\.]+)\s*kg\s*[×x\*]\s*(\d+)/i);
            if (multMatch) {
              sets.push({
                setNum: idx + 1,
                weight: parseFloat(multMatch[1]),
                reps: parseInt(multMatch[2], 10)
              });
            } else {
              const kgMatch = str.match(/([\d\.]+)\s*kg/i);
              const repsMatch = str.match(/(\d+)\s*(?:reps|opakov[aá]n[ií])/i);
              sets.push({
                setNum: idx + 1,
                weight: kgMatch ? parseFloat(kgMatch[1]) : '',
                reps: repsMatch ? parseInt(repsMatch[1], 10) : ''
              });
            }
          });
        }
        return {
          date: log.date,
          type: log.type,
          rawSetsSummary: parenMatch ? parenMatch[1].trim() : '',
          sets: sets.length > 0 ? sets : null
        };
      }
    }
  }
  return null;
}

function renderWeeklySplitGrid() {
  const container = document.getElementById('days-split-container');
  const badge = document.getElementById('gym-weekly-progress-badge');
  if (!container) return;

  sanitizeGymSplit();

  const currentDayIndex = new Date().getDay();
  const workoutsCount = getWorkoutsThisWeekCount();
  const goal = state.user?.gymWeeklyGoal || 4;

  if (badge) {
    badge.textContent = `Tento týden: ${workoutsCount} / ${goal} tréninků`;
  }

  // Strictly filter only genuine 7 days (day 0..6, no __ prefix, no JSON string in focus)
  const validDays = state.gym.split.filter(s =>
    s &&
    typeof s.day === 'number' &&
    s.day >= 0 &&
    s.day <= 6 &&
    (!s.dayName || !s.dayName.startsWith('__')) &&
    (!s.focus || (!s.focus.startsWith('{') && !s.focus.startsWith('[')))
  );

  // Split order: Monday(1) to Sunday(0)
  const sortedSplit = [...validDays].sort((a, b) => {
    const aOrder = a.day === 0 ? 7 : a.day;
    const bOrder = b.day === 0 ? 7 : b.day;
    return aOrder - bOrder;
  });

  container.innerHTML = sortedSplit.map(dayItem => {
    const isToday = dayItem.day === currentDayIndex;
    const focus = (dayItem.focus || '').trim();
    const focusLower = focus.toLowerCase();

    // Determine badge theme class
    let badgeClass = 'focus-other';
    if (dayItem.rest || focusLower.includes('odpočinek') || focusLower.includes('rest') || focusLower.includes('volno') || focusLower.includes('regenerace')) {
      badgeClass = 'focus-rest';
    } else if (focusLower.includes('upper') || focusLower.includes('vršek') || focusLower.includes('push') || focusLower.includes('pull')) {
      badgeClass = 'focus-upper';
    } else if (focusLower.includes('lower') || focusLower.includes('spodek') || focusLower.includes('nohy') || focusLower.includes('legs')) {
      badgeClass = 'focus-lower';
    }

    const displayFocus = focus || (dayItem.rest ? 'Volný den' : 'Trénink');

    return `
      <div class="day-card ${isToday ? 'today' : ''} ${dayItem.rest ? 'rest' : ''}" data-day="${dayItem.day}" title="Klikni pro úpravu plánu na ${escapeHtml(dayItem.dayName)}">
        <div class="day-name-row">
          <span class="day-name">${escapeHtml((dayItem.dayName || '').substring(0, 2))}</span>
          ${isToday ? '<span class="day-today-badge">DNES</span>' : ''}
        </div>
        <div class="day-focus-badge ${badgeClass}">${escapeHtml(displayFocus)}</div>
        <div class="day-check-indicator ${dayItem.rest ? 'rest' : ''}">
          ${dayItem.rest ? '💤' : '🏋️'}
        </div>
      </div>
    `;
  }).join('');

  // Make each day card clickable to open split modal directly
  container.querySelectorAll('.day-card').forEach(card => {
    card.addEventListener('click', () => {
      const day = parseInt(card.getAttribute('data-day'), 10);
      openSplitModal(day);
    });
  });
}

function formatWorkoutLogExercisesHtml(rawText) {
  if (!rawText) return '';
  const lines = rawText.split('\n').map(l => l.trim()).filter(Boolean);
  const isBulletList = lines.some(l => l.startsWith('•'));

  if (!isBulletList) {
    return `<div class="log-exercises-box">${escapeHtml(rawText)}</div>`;
  }

  const itemsHtml = lines.map(line => {
    if (line.startsWith('•')) {
      const clean = line.substring(1).trim();
      const colonIdx = clean.indexOf(':');
      if (colonIdx !== -1) {
        const exName = clean.substring(0, colonIdx).trim();
        const details = clean.substring(colonIdx + 1).trim();
        const parenMatch = details.match(/\((.*?)\)/);
        if (parenMatch) {
          const setsPills = parenMatch[1].split(',')
            .map(s => `<span class="log-set-pill">${escapeHtml(s.trim())}</span>`)
            .join('');
          const seriesCount = details.substring(0, parenMatch.index).trim();
          return `
            <div class="log-exercise-item">
              <div class="log-exercise-title">${escapeHtml(exName)} <span class="text-xs text-muted" style="font-weight: 500;">(${escapeHtml(seriesCount)})</span></div>
              <div class="log-exercise-sets-row">${setsPills}</div>
            </div>
          `;
        }
        return `
          <div class="log-exercise-item">
            <div class="log-exercise-title">${escapeHtml(exName)}</div>
            <div class="text-xs text-muted">${escapeHtml(details)}</div>
          </div>
        `;
      }
      return `<div class="log-exercise-item"><div class="log-exercise-title">${escapeHtml(clean)}</div></div>`;
    } else if (line.startsWith('Poznámka:')) {
      return `<div class="text-xs text-muted" style="margin-top: 4px; font-style: italic;">📝 ${escapeHtml(line)}</div>`;
    }
    return `<div class="text-xs text-muted">${escapeHtml(line)}</div>`;
  }).join('');

  return `<div class="log-structured-exercises">${itemsHtml}</div>`;
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
        ${formatWorkoutLogExercisesHtml(log.exercises)}
        <div style="display: flex; gap: 8px; justify-content: flex-end; margin-top: auto;">
          <button class="btn btn-sm btn-secondary btn-edit-workout" data-id="${log.id}">Upravit</button>
          <button class="btn btn-sm btn-danger btn-delete-workout" data-id="${log.id}">Smazat</button>
        </div>
      </div>
    `;
  }).join('');

  container.querySelectorAll('.btn-edit-workout').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      openEditWorkoutModal(id);
    });
  });

  container.querySelectorAll('.btn-delete-workout').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      deleteWorkoutLog(id);
    });
  });
}

function deleteWorkoutLog(id) {
  if (!confirm('Opravdu smazat tento trénink?')) return;
  markAsDeleted(id);
  state.gym.logs = state.gym.logs.filter(l => l.id !== id);
  saveState(true);
  if (supabaseClient && currentUser) {
    supabaseClient.from('gym_logs').delete().eq('id', id).eq('user_id', currentUser.id).then(({ error }) => {
      if (error) console.error('Error deleting gym log from Supabase:', error);
    });
  }
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
  markAsDeleted(id);
  state.school = state.school.filter(s => s.id !== id);
  saveState(true);
  if (supabaseClient && currentUser) {
    supabaseClient.from('school_items').delete().eq('id', id).eq('user_id', currentUser.id).then(({ error }) => {
      if (error) console.error('Error deleting school item from Supabase:', error);
    });
  }
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
      markAsDeleted(id);
      state.habits = state.habits.filter(h => h.id !== id);
      saveState(true);
      if (supabaseClient && currentUser) {
        supabaseClient.from('habits').delete().eq('id', id).eq('user_id', currentUser.id).then(({ error }) => {
          if (error) console.error('Error deleting habit from Supabase:', error);
        });
      }
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
    const liveUrlEl = document.getElementById('proj-live-url');
    if (liveUrlEl) liveUrlEl.value = proj.liveUrl || '';
    const techEl = document.getElementById('proj-tech-stack');
    if (techEl) techEl.value = Array.isArray(proj.techStack) ? proj.techStack.join(', ') : '';
    document.getElementById('proj-desc').value = proj.description || '';
  } else {
    titleEl.textContent = 'Nový projekt';
    document.getElementById('proj-id').value = '';
    progressVal.textContent = '0 %';
    const liveUrlEl = document.getElementById('proj-live-url');
    if (liveUrlEl) liveUrlEl.value = '';
    const techEl = document.getElementById('proj-tech-stack');
    if (techEl) techEl.value = '';
  }

  // Restore draft if any was left in sessionStorage
  const draftKey = `lifeos_draft_proj_${projectId || 'new'}`;
  try {
    const draftRaw = sessionStorage.getItem(draftKey);
    if (draftRaw) {
      const draft = JSON.parse(draftRaw);
      if (draft && draft.desc) {
        document.getElementById('proj-desc').value = draft.desc;
        if (draft.title) document.getElementById('proj-title').value = draft.title;
        if (draft.category) document.getElementById('proj-category').value = draft.category;
        if (draft.techStack) document.getElementById('proj-tech-stack').value = draft.techStack;
        if (draft.liveUrl) document.getElementById('proj-live-url').value = draft.liveUrl;
        if (draft.url) document.getElementById('proj-url').value = draft.url;
        showToast('Obnoven rozepsaný koncept 📝');
      }
    }
  } catch (e) {}

  modal.showModal();
  markModalInitialState(modal);
}

// ==========================================================================
// WORKOUT BUILDER & EXERCISES TEMPLATES
// ==========================================================================
let currentWorkoutExercises = [];

function syncAllSplitDropdowns() {
  if (!state.gym.exercisesBySplit) {
    state.gym.exercisesBySplit = JSON.parse(JSON.stringify(DEFAULT_DATA.gym.exercisesBySplit));
  }
  const splitNames = Object.keys(state.gym.exercisesBySplit);

  const workoutTypeSelect = document.getElementById('workout-type');
  if (workoutTypeSelect) {
    const currentVal = workoutTypeSelect.value;
    workoutTypeSelect.innerHTML = splitNames.map(name => `
      <option value="${escapeHtml(name)}">${escapeHtml(name)}</option>
    `).join('');
    if (splitNames.includes(currentVal)) {
      workoutTypeSelect.value = currentVal;
    } else if (splitNames.length > 0) {
      workoutTypeSelect.value = splitNames[0];
    }
  }

  const manageSplitSelect = document.getElementById('manage-exercises-split-select');
  if (manageSplitSelect) {
    const currentVal = manageSplitSelect.value;
    manageSplitSelect.innerHTML = splitNames.map(name => `
      <option value="${escapeHtml(name)}">${escapeHtml(name)}</option>
    `).join('');
    if (splitNames.includes(currentVal)) {
      manageSplitSelect.value = currentVal;
    } else if (splitNames.length > 0) {
      manageSplitSelect.value = splitNames[0];
    }
  }
}

function openWorkoutModal(forcedSplit = null, forcedDuration = null) {
  const modal = document.getElementById('modal-workout');
  const form = document.getElementById('form-workout');
  const titleEl = document.getElementById('modal-workout-title');
  const editIdInput = document.getElementById('workout-edit-id');
  const submitBtn = document.getElementById('btn-submit-workout');
  const btnModalFinish = document.getElementById('btn-modal-finish-workout');
  if (!modal || !form) return;

  form.reset();
  syncAllSplitDropdowns();

  if (activeWorkout) {
    const elapsedMinutes = Math.max(1, Math.round((Date.now() - activeWorkout.startTime) / 60000));
    if (editIdInput) editIdInput.value = activeWorkout.id;
    if (titleEl) titleEl.textContent = `🔥 Probíhá trénink: ${activeWorkout.split}`;
    if (submitBtn) submitBtn.textContent = '💾 Průběžně uložit (cvičit dál)';
    if (btnModalFinish) btnModalFinish.classList.remove('hidden');

    const dateInput = document.getElementById('workout-date');
    if (dateInput) dateInput.value = getTodayStr();

    const durationInput = document.getElementById('workout-duration');
    if (durationInput) durationInput.value = forcedDuration || elapsedMinutes;

    const ratingSelect = document.getElementById('workout-rating');
    if (ratingSelect) ratingSelect.value = String(activeWorkout.rating || 4);

    const notesField = document.getElementById('workout-notes');
    if (notesField) notesField.value = activeWorkout.notes || '';

    const typeSelect = document.getElementById('workout-type');
    if (typeSelect) {
      typeSelect.value = activeWorkout.split || 'Upper A';
    }

    // Prefill exercises from ongoing active workout
    currentWorkoutExercises = (activeWorkout.exercises && activeWorkout.exercises.length > 0)
      ? JSON.parse(JSON.stringify(activeWorkout.exercises))
      : [];

    if (currentWorkoutExercises.length === 0) {
      const templateNames = (state.gym.exercisesBySplit && state.gym.exercisesBySplit[activeWorkout.split]) || [];
      if (templateNames.length > 0) {
        currentWorkoutExercises = templateNames.map(name => {
          const perf = getLastExercisePerformance(name);
          let initialSets = [{ setNum: 1, weight: '', reps: '' }];
          if (perf && perf.sets && perf.sets.length > 0) {
            initialSets = perf.sets.map((s, idx) => ({
              setNum: idx + 1,
              weight: s.weight,
              reps: s.reps
            }));
          }
          return {
            id: 'ex_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
            name,
            sets: initialSets
          };
        });
      }
    }

    renderWorkoutQuickChips(activeWorkout.split);
    renderWorkoutExercisesBuilder();
  } else {
    if (editIdInput) editIdInput.value = '';
    if (titleEl) titleEl.textContent = 'Zapsat trénink do fitka';
    if (submitBtn) submitBtn.textContent = 'Uložit trénink';
    if (btnModalFinish) btnModalFinish.classList.add('hidden');

    const dateInput = document.getElementById('workout-date');
    if (dateInput) dateInput.value = getTodayStr();

    const durationInput = document.getElementById('workout-duration');
    if (durationInput) durationInput.value = forcedDuration || '60';

    const ratingSelect = document.getElementById('workout-rating');
    if (ratingSelect) ratingSelect.value = '4';

    const notesField = document.getElementById('workout-notes');
    if (notesField) notesField.value = '';

    const typeSelect = document.getElementById('workout-type');
    if (typeSelect) {
      const targetFocus = forcedSplit || getTodaySplitFocus() || 'Upper A';
      const foundOption = Array.from(typeSelect.options).find(o =>
        o.value.toLowerCase() === targetFocus.toLowerCase() ||
        targetFocus.toLowerCase().includes(o.value.toLowerCase()) ||
        o.value.toLowerCase().includes(targetFocus.toLowerCase())
      );
      if (foundOption) {
        typeSelect.value = foundOption.value;
      }
    }

    currentWorkoutExercises = [];
    const selectedType = (typeSelect && typeSelect.value) ? typeSelect.value : 'Upper A';
    renderWorkoutQuickChips(selectedType);
    renderWorkoutExercisesBuilder();
  }

  modal.showModal();
  markModalInitialState(modal);
}

function openEditWorkoutModal(logId) {
  const modal = document.getElementById('modal-workout');
  const form = document.getElementById('form-workout');
  const titleEl = document.getElementById('modal-workout-title');
  const editIdInput = document.getElementById('workout-edit-id');
  const submitBtn = document.getElementById('btn-submit-workout');
  const btnModalFinish = document.getElementById('btn-modal-finish-workout');
  const log = state.gym.logs.find(l => l.id === logId);
  if (!modal || !form || !log) return;

  form.reset();
  syncAllSplitDropdowns();

  if (btnModalFinish) {
    if (activeWorkout && log.id === activeWorkout.id) {
      btnModalFinish.classList.remove('hidden');
    } else {
      btnModalFinish.classList.add('hidden');
    }
  }

  if (editIdInput) editIdInput.value = log.id;
  if (titleEl) titleEl.textContent = `Upravit trénink (${log.date})`;
  if (submitBtn) submitBtn.textContent = 'Uložit změny';

  const dateInput = document.getElementById('workout-date');
  if (dateInput) dateInput.value = log.date;

  const durationInput = document.getElementById('workout-duration');
  if (durationInput) durationInput.value = log.duration || 60;

  const typeSelect = document.getElementById('workout-type');
  if (typeSelect) {
    const foundOption = Array.from(typeSelect.options).find(o => o.value.toLowerCase() === log.type.toLowerCase());
    if (foundOption) {
      typeSelect.value = foundOption.value;
    } else {
      typeSelect.value = log.type;
    }
  }

  const ratingSelect = document.getElementById('workout-rating');
  if (ratingSelect) ratingSelect.value = String(log.rating || 4);

  // Parse exercises from stored log text
  currentWorkoutExercises = [];
  let freeformNotes = '';

  if (log.exercises) {
    const lines = log.exercises.split('\n');
    lines.forEach(rawLine => {
      const line = rawLine.trim();
      if (!line) return;
      if (line.startsWith('Poznámka:')) {
        freeformNotes += line.replace(/^Poznámka:\s*/, '') + '\n';
        return;
      }
      if (line.startsWith('•') || line.includes(':')) {
        const clean = line.replace(/^[•\-\*]\s*/, '').trim();
        const colonIdx = clean.indexOf(':');
        if (colonIdx !== -1) {
          const exName = clean.substring(0, colonIdx).trim();
          const details = clean.substring(colonIdx + 1).trim();
          const parenMatch = details.match(/\((.*?)\)/);
          const sets = [];
          if (parenMatch) {
            const rawSets = parenMatch[1].split(',');
            rawSets.forEach((s, idx) => {
              const str = s.trim();
              const multMatch = str.match(/([\d\.]+)\s*kg\s*[×x\*]\s*(\d+)/i);
              if (multMatch) {
                sets.push({
                  setNum: idx + 1,
                  weight: parseFloat(multMatch[1]),
                  reps: parseInt(multMatch[2], 10)
                });
              } else {
                const kgMatch = str.match(/([\d\.]+)\s*kg/i);
                const repsMatch = str.match(/(\d+)\s*(?:reps|opakov[aá]n[ií])/i);
                sets.push({
                  setNum: idx + 1,
                  weight: kgMatch ? parseFloat(kgMatch[1]) : '',
                  reps: repsMatch ? parseInt(repsMatch[1], 10) : ''
                });
              }
            });
          }
          currentWorkoutExercises.push({
            id: 'ex_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
            name: exName,
            sets: sets.length > 0 ? sets : [{ setNum: 1, weight: '', reps: '' }]
          });
          return;
        }
      }
      freeformNotes += line + '\n';
    });
  }

  const notesInput = document.getElementById('workout-notes');
  if (notesInput) notesInput.value = freeformNotes.trim();

  renderWorkoutQuickChips(typeSelect ? typeSelect.value : log.type);
  renderWorkoutExercisesBuilder();

  modal.showModal();
  markModalInitialState(modal);
}

function loadEntireSplitIntoWorkout() {
  const typeSelect = document.getElementById('workout-type');
  const split = typeSelect ? typeSelect.value : 'Upper A';
  const exercises = (state.gym.exercisesBySplit && state.gym.exercisesBySplit[split]) || [];

  if (exercises.length === 0) {
    showToast(`V šabloně pro ${split} nejsou žádné cviky`);
    return;
  }

  currentWorkoutExercises = [];
  exercises.forEach(name => {
    const perf = getLastExercisePerformance(name);
    let initialSets = [{ setNum: 1, weight: '', reps: '' }];
    if (perf && perf.sets && perf.sets.length > 0) {
      initialSets = perf.sets.map((s, idx) => ({
        setNum: idx + 1,
        weight: s.weight,
        reps: s.reps
      }));
    }
    currentWorkoutExercises.push({
      id: 'ex_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      name,
      sets: initialSets
    });
  });

  renderWorkoutExercisesBuilder();
  renderWorkoutQuickChips(split);
  showToast(`⚡ Načteno všech ${exercises.length} cviků pro ${split}!`);
}

function renderWorkoutQuickChips(splitType) {
  const container = document.getElementById('workout-exercise-chips');
  if (!container) return;

  const exercises = (state.gym.exercisesBySplit && state.gym.exercisesBySplit[splitType]) ||
                    (DEFAULT_DATA.gym.exercisesBySplit && DEFAULT_DATA.gym.exercisesBySplit[splitType]) ||
                    [];

  if (exercises.length === 0) {
    container.innerHTML = '<span class="text-xs text-muted">Pro tento split zatím nemáš přednastavené cviky. Napiš cvik níže nebo přidej šablonu v „Cviky & Šablony“.</span>';
    return;
  }

  container.innerHTML = exercises.map(name => {
    const isAdded = currentWorkoutExercises.some(e => e.name.toLowerCase() === name.toLowerCase());
    return `
      <button type="button" class="exercise-chip ${isAdded ? 'added' : ''}" data-name="${escapeHtml(name)}">
        <span>${isAdded ? '✓' : '+'}</span>
        <span>${escapeHtml(name)}</span>
      </button>
    `;
  }).join('');

  container.querySelectorAll('.exercise-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const name = chip.getAttribute('data-name');
      addExerciseToWorkoutSession(name);
    });
  });
}

function addExerciseToWorkoutSession(exerciseName, initialWeight = null, initialReps = null) {
  if (!exerciseName || !exerciseName.trim()) return;
  const trimmed = exerciseName.trim();

  // If already in session, duplicate the last set for quick tapping
  const existing = currentWorkoutExercises.find(e => e.name.toLowerCase() === trimmed.toLowerCase());
  if (existing) {
    const lastSet = existing.sets[existing.sets.length - 1];
    existing.sets.push({
      setNum: existing.sets.length + 1,
      weight: lastSet ? lastSet.weight : '',
      reps: lastSet ? lastSet.reps : ''
    });
  } else {
    // Check previous performance for prefilling
    const perf = getLastExercisePerformance(trimmed);
    let setsToUse = null;

    if (initialWeight !== null || initialReps !== null) {
      setsToUse = [{ setNum: 1, weight: initialWeight !== null ? initialWeight : '', reps: initialReps !== null ? initialReps : '' }];
    } else if (perf && perf.sets && perf.sets.length > 0) {
      setsToUse = perf.sets.map((s, idx) => ({
        setNum: idx + 1,
        weight: s.weight,
        reps: s.reps
      }));
    } else {
      setsToUse = [{ setNum: 1, weight: '', reps: '' }];
    }

    currentWorkoutExercises.push({
      id: 'ex_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      name: trimmed,
      sets: setsToUse
    });
  }

  renderWorkoutExercisesBuilder();
  const typeSelect = document.getElementById('workout-type');
  if (typeSelect) renderWorkoutQuickChips(typeSelect.value);
}

function renderWorkoutExercisesBuilder() {
  const container = document.getElementById('workout-exercises-container');
  if (!container) return;

  if (currentWorkoutExercises.length === 0) {
    container.innerHTML = '';
    return;
  }

  container.innerHTML = currentWorkoutExercises.map(ex => {
    const perf = getLastExercisePerformance(ex.name);
    const historyBadgeHtml = (perf && perf.rawSetsSummary)
      ? `<div class="exercise-prev-history-badge">💡 Minule (${perf.date}): ${escapeHtml(perf.rawSetsSummary)}</div>`
      : '';

    return `
      <div class="workout-exercise-card" data-ex-id="${ex.id}">
        <div class="exercise-card-header">
          <div>
            <span class="exercise-card-name">🏋️ ${escapeHtml(ex.name)}</span>
            ${historyBadgeHtml}
          </div>
          <button type="button" class="btn-remove-exercise" data-ex-id="${ex.id}" title="Odstranit cvik">&times;</button>
        </div>
        <div class="exercise-sets-table">
          <div class="exercise-sets-header">
            <span class="set-col-num">#</span>
            <span class="set-col-weight">Váha (kg)</span>
            <span class="set-col-reps">Reps</span>
            <span class="set-col-del"></span>
          </div>
          ${ex.sets.map((s, idx) => `
            <div class="exercise-set-row" data-set-index="${idx}">
              <span class="set-num-badge">#${idx + 1}</span>
              <div class="set-field-group">
                <input type="number" step="0.5" class="set-input-num input-weight" value="${s.weight ?? ''}" placeholder="0" data-ex-id="${ex.id}" data-set-index="${idx}">
                <button type="button" class="btn-quick-inc btn-inc-weight" data-ex-id="${ex.id}" data-set-index="${idx}" data-inc="2.5" title="Přidat +2.5 kg">+2.5</button>
              </div>
              <div class="set-field-group">
                <input type="number" min="1" max="999" class="set-input-num input-reps" value="${s.reps ?? ''}" placeholder="0" data-ex-id="${ex.id}" data-set-index="${idx}">
                <button type="button" class="btn-quick-inc btn-inc-reps" data-ex-id="${ex.id}" data-set-index="${idx}" data-inc="1" title="Přidat +1 opakování">+1</button>
              </div>
              <div class="set-del-wrap">
                ${ex.sets.length > 1 ? `<button type="button" class="btn-del-set" data-ex-id="${ex.id}" data-set-index="${idx}" title="Smazat sérii">&times;</button>` : ''}
              </div>
            </div>
          `).join('')}
        </div>
        <button type="button" class="btn-add-set" data-ex-id="${ex.id}">+ Další série</button>
      </div>
    `;
  }).join('');

  // Quick weight increment button
  container.querySelectorAll('.btn-inc-weight').forEach(btn => {
    btn.addEventListener('click', () => {
      const exId = btn.getAttribute('data-ex-id');
      const setIdx = parseInt(btn.getAttribute('data-set-index'), 10);
      const inc = parseFloat(btn.getAttribute('data-inc') || '2.5');
      const ex = currentWorkoutExercises.find(x => x.id === exId);
      if (ex && ex.sets[setIdx]) {
        const cur = parseFloat(ex.sets[setIdx].weight) || 0;
        ex.sets[setIdx].weight = Math.round((cur + inc) * 10) / 10;
        renderWorkoutExercisesBuilder();
      }
    });
  });

  // Quick reps increment button
  container.querySelectorAll('.btn-inc-reps').forEach(btn => {
    btn.addEventListener('click', () => {
      const exId = btn.getAttribute('data-ex-id');
      const setIdx = parseInt(btn.getAttribute('data-set-index'), 10);
      const inc = parseInt(btn.getAttribute('data-inc') || '1', 10);
      const ex = currentWorkoutExercises.find(x => x.id === exId);
      if (ex && ex.sets[setIdx]) {
        const cur = parseInt(ex.sets[setIdx].reps, 10) || 0;
        ex.sets[setIdx].reps = cur + inc;
        renderWorkoutExercisesBuilder();
      }
    });
  });

  // Weight input sync
  container.querySelectorAll('.input-weight').forEach(input => {
    input.addEventListener('input', (e) => {
      const exId = input.getAttribute('data-ex-id');
      const setIdx = parseInt(input.getAttribute('data-set-index'), 10);
      const ex = currentWorkoutExercises.find(x => x.id === exId);
      if (ex && ex.sets[setIdx]) {
        ex.sets[setIdx].weight = e.target.value;
      }
    });
  });

  // Reps input sync
  container.querySelectorAll('.input-reps').forEach(input => {
    input.addEventListener('input', (e) => {
      const exId = input.getAttribute('data-ex-id');
      const setIdx = parseInt(input.getAttribute('data-set-index'), 10);
      const ex = currentWorkoutExercises.find(x => x.id === exId);
      if (ex && ex.sets[setIdx]) {
        ex.sets[setIdx].reps = e.target.value;
      }
    });
  });

  // Add set button
  container.querySelectorAll('.btn-add-set').forEach(btn => {
    btn.addEventListener('click', () => {
      const exId = btn.getAttribute('data-ex-id');
      const ex = currentWorkoutExercises.find(x => x.id === exId);
      if (!ex) return;
      const prevSet = ex.sets[ex.sets.length - 1];
      ex.sets.push({
        setNum: ex.sets.length + 1,
        weight: prevSet ? prevSet.weight : '',
        reps: prevSet ? prevSet.reps : ''
      });
      renderWorkoutExercisesBuilder();
    });
  });

  // Remove set button
  container.querySelectorAll('.btn-del-set').forEach(btn => {
    btn.addEventListener('click', () => {
      const exId = btn.getAttribute('data-ex-id');
      const setIdx = parseInt(btn.getAttribute('data-set-index'), 10);
      const ex = currentWorkoutExercises.find(x => x.id === exId);
      if (!ex) return;
      ex.sets.splice(setIdx, 1);
      ex.sets.forEach((s, i) => { s.setNum = i + 1; });
      renderWorkoutExercisesBuilder();
    });
  });

  // Remove whole exercise button
  container.querySelectorAll('.btn-remove-exercise').forEach(btn => {
    btn.addEventListener('click', () => {
      const exId = btn.getAttribute('data-ex-id');
      currentWorkoutExercises = currentWorkoutExercises.filter(x => x.id !== exId);
      renderWorkoutExercisesBuilder();
      const typeSelect = document.getElementById('workout-type');
      if (typeSelect) renderWorkoutQuickChips(typeSelect.value);
    });
  });
}

// Manage Exercises Modal functions
function openExercisesModal() {
  const modal = document.getElementById('modal-exercises');
  if (!modal) return;
  syncAllSplitDropdowns();
  renderTemplateExercisesList();
  modal.showModal();
  markModalInitialState(modal);
}

function renderTemplateExercisesList() {
  const container = document.getElementById('template-exercises-list');
  const select = document.getElementById('manage-exercises-split-select');
  if (!container || !select) return;

  const currentSplit = select.value;
  if (!state.gym.exercisesBySplit) {
    state.gym.exercisesBySplit = JSON.parse(JSON.stringify(DEFAULT_DATA.gym.exercisesBySplit));
  }
  if (!state.gym.exercisesBySplit[currentSplit]) {
    state.gym.exercisesBySplit[currentSplit] = [];
  }

  const list = state.gym.exercisesBySplit[currentSplit];

  if (list.length === 0) {
    container.innerHTML = '<p class="text-sm text-muted" style="text-align: center; padding: 16px;">V této šabloně zatím nemáš žádné cviky. Přidej první výše!</p>';
    return;
  }

  container.innerHTML = list.map((item, idx) => `
    <div class="template-exercise-item">
      <span>🏋️ ${escapeHtml(item)}</span>
      <button type="button" class="btn btn-sm btn-danger btn-del-template-ex" data-split="${escapeHtml(currentSplit)}" data-index="${idx}" title="Smazat cvik">&times;</button>
    </div>
  `).join('');

  container.querySelectorAll('.btn-del-template-ex').forEach(btn => {
    btn.addEventListener('click', () => {
      const split = btn.getAttribute('data-split');
      const idx = parseInt(btn.getAttribute('data-index'), 10);
      if (state.gym.exercisesBySplit[split]) {
        state.gym.exercisesBySplit[split].splice(idx, 1);
        saveState();
        renderTemplateExercisesList();
        const workoutTypeSelect = document.getElementById('workout-type');
        if (workoutTypeSelect && workoutTypeSelect.value === split) {
          renderWorkoutQuickChips(split);
        }
        showToast('Cvik odebrán ze šablony');
      }
    });
  });
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
  markModalInitialState(modal);
}

function openSplitModal(targetDay = null) {
  const modal = document.getElementById('modal-split');
  const listContainer = document.getElementById('split-edit-list');
  if (!modal || !listContainer) return;

  sanitizeGymSplit();

  const validDays = state.gym.split.filter(s =>
    s &&
    typeof s.day === 'number' &&
    s.day >= 0 &&
    s.day <= 6 &&
    (!s.dayName || !s.dayName.startsWith('__')) &&
    (!s.focus || (!s.focus.startsWith('{') && !s.focus.startsWith('[')))
  );

  const sortedSplit = [...validDays].sort((a, b) => {
    const aOrder = a.day === 0 ? 7 : a.day;
    const bOrder = b.day === 0 ? 7 : b.day;
    return aOrder - bOrder;
  });

  const availableSplits = Object.keys(state.gym.exercisesBySplit || {});
  const defaultSuggestions = ['Upper A', 'Lower A', 'Upper B', 'Lower B', 'Kardio', 'Full Body'];
  const suggestions = Array.from(new Set([...availableSplits, ...defaultSuggestions])).slice(0, 8);
  const currentDayIndex = new Date().getDay();

  const fullDayNames = {
    1: 'Pondělí',
    2: 'Úterý',
    3: 'Středa',
    4: 'Čtvrtek',
    5: 'Pátek',
    6: 'Sobota',
    0: 'Neděle'
  };

  listContainer.innerHTML = sortedSplit.map(s => {
    const isToday = s.day === currentDayIndex;
    const isTarget = targetDay !== null && s.day === targetDay;
    const isRest = !!s.rest;

    return `
      <div class="split-day-card ${isRest ? 'is-rest' : ''} ${isToday ? 'is-today' : ''} ${isTarget ? 'highlight-target' : ''}" data-day="${s.day}">
        <div class="split-day-card-header">
          <div class="split-day-info">
            <span class="split-day-title">${fullDayNames[s.day] || s.dayName}</span>
            ${isToday ? '<span class="split-today-pill">DNES</span>' : ''}
          </div>
          <div class="split-day-toggle-group">
            <button type="button" class="split-mode-btn ${!isRest ? 'active' : ''}" data-mode="workout">🏋️ Trénink</button>
            <button type="button" class="split-mode-btn ${isRest ? 'active' : ''}" data-mode="rest">💤 Volno / Rest</button>
          </div>
        </div>
        <div class="split-day-body ${isRest ? 'hidden' : ''}">
          <input type="text" class="form-input split-focus-input" value="${escapeHtml(s.focus || '')}" placeholder="Zaměření (např. Upper A, Nohy, Kardio...)">
          <div class="split-suggestions-chips">
            ${suggestions.map(sug => `
              <button type="button" class="split-sug-chip" data-sug="${escapeHtml(sug)}">+ ${escapeHtml(sug)}</button>
            `).join('')}
          </div>
        </div>
        <div class="split-day-rest-info ${!isRest ? 'hidden' : ''}">
          <span>💤 Regenerace a odpočinek</span>
        </div>
      </div>
    `;
  }).join('');

  // Wire day card toggles and suggestion chips
  listContainer.querySelectorAll('.split-day-card').forEach(card => {
    const workoutBtn = card.querySelector('.split-mode-btn[data-mode="workout"]');
    const restBtn = card.querySelector('.split-mode-btn[data-mode="rest"]');
    const bodyEl = card.querySelector('.split-day-body');
    const restInfoEl = card.querySelector('.split-day-rest-info');
    const inputEl = card.querySelector('.split-focus-input');

    const setMode = (mode) => {
      if (mode === 'workout') {
        card.classList.remove('is-rest');
        workoutBtn.classList.add('active');
        restBtn.classList.remove('active');
        bodyEl.classList.remove('hidden');
        restInfoEl.classList.add('hidden');
        if (!inputEl.value.trim() || inputEl.value.includes('Odpočinek') || inputEl.value.includes('Volno')) {
          inputEl.value = 'Upper A';
        }
        inputEl.focus();
      } else {
        card.classList.add('is-rest');
        workoutBtn.classList.remove('active');
        restBtn.classList.add('active');
        bodyEl.classList.add('hidden');
        restInfoEl.classList.remove('hidden');
      }
    };

    if (workoutBtn) workoutBtn.addEventListener('click', () => setMode('workout'));
    if (restBtn) restBtn.addEventListener('click', () => setMode('rest'));

    card.querySelectorAll('.split-sug-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const val = chip.getAttribute('data-sug');
        if (inputEl) {
          inputEl.value = val;
          inputEl.focus();
        }
      });
    });
  });

  // Wire preset buttons
  const presetsBar = document.getElementById('split-presets-bar');
  if (presetsBar) {
    presetsBar.querySelectorAll('.btn-preset-pill').forEach(btn => {
      btn.onclick = () => {
        const presetKey = btn.getAttribute('data-preset');
        applySplitPreset(presetKey);
      };
    });
  }

  modal.showModal();
  markModalInitialState(modal);

  if (targetDay !== null) {
    const targetCard = listContainer.querySelector(`.split-day-card[data-day="${targetDay}"]`);
    if (targetCard) {
      setTimeout(() => {
        targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        const input = targetCard.querySelector('.split-focus-input');
        if (input && !targetCard.classList.contains('is-rest')) input.focus();
      }, 120);
    }
  }
}

function applySplitPreset(presetKey) {
  const SPLIT_PRESETS = {
    'upper-lower-4': {
      1: { focus: 'Upper A', rest: false },
      2: { focus: 'Lower A', rest: false },
      3: { focus: 'Odpočinek / Regenerace', rest: true },
      4: { focus: 'Upper B', rest: false },
      5: { focus: 'Lower B', rest: false },
      6: { focus: 'Odpočinek / Regenerace', rest: true },
      0: { focus: 'Odpočinek / Regenerace', rest: true }
    },
    'upper-lower-3': {
      1: { focus: 'Upper A', rest: false },
      2: { focus: 'Odpočinek / Regenerace', rest: true },
      3: { focus: 'Lower A', rest: false },
      4: { focus: 'Odpočinek / Regenerace', rest: true },
      5: { focus: 'Upper B', rest: false },
      6: { focus: 'Odpočinek / Regenerace', rest: true },
      0: { focus: 'Odpočinek / Regenerace', rest: true }
    },
    'ppl': {
      1: { focus: 'Push', rest: false },
      2: { focus: 'Pull', rest: false },
      3: { focus: 'Legs', rest: false },
      4: { focus: 'Odpočinek / Regenerace', rest: true },
      5: { focus: 'Push', rest: false },
      6: { focus: 'Pull', rest: false },
      0: { focus: 'Odpočinek / Regenerace', rest: true }
    },
    'fullbody': {
      1: { focus: 'Full Body A', rest: false },
      2: { focus: 'Odpočinek / Regenerace', rest: true },
      3: { focus: 'Full Body B', rest: false },
      4: { focus: 'Odpočinek / Regenerace', rest: true },
      5: { focus: 'Full Body C', rest: false },
      6: { focus: 'Odpočinek / Regenerace', rest: true },
      0: { focus: 'Odpočinek / Regenerace', rest: true }
    },
    'clear': {
      1: { focus: 'Odpočinek / Regenerace', rest: true },
      2: { focus: 'Odpočinek / Regenerace', rest: true },
      3: { focus: 'Odpočinek / Regenerace', rest: true },
      4: { focus: 'Odpočinek / Regenerace', rest: true },
      5: { focus: 'Odpočinek / Regenerace', rest: true },
      6: { focus: 'Odpočinek / Regenerace', rest: true },
      0: { focus: 'Odpočinek / Regenerace', rest: true }
    }
  };

  const preset = SPLIT_PRESETS[presetKey];
  if (!preset) return;

  const cards = document.querySelectorAll('#split-edit-list .split-day-card');
  cards.forEach(card => {
    const day = parseInt(card.getAttribute('data-day'), 10);
    const dayPreset = preset[day];
    if (dayPreset) {
      const workoutBtn = card.querySelector('.split-mode-btn[data-mode="workout"]');
      const restBtn = card.querySelector('.split-mode-btn[data-mode="rest"]');
      const bodyEl = card.querySelector('.split-day-body');
      const restInfoEl = card.querySelector('.split-day-rest-info');
      const inputEl = card.querySelector('.split-focus-input');

      if (dayPreset.rest) {
        card.classList.add('is-rest');
        if (workoutBtn) workoutBtn.classList.remove('active');
        if (restBtn) restBtn.classList.add('active');
        if (bodyEl) bodyEl.classList.add('hidden');
        if (restInfoEl) restInfoEl.classList.remove('hidden');
        if (inputEl) inputEl.value = 'Odpočinek / Regenerace';
      } else {
        card.classList.remove('is-rest');
        if (workoutBtn) workoutBtn.classList.add('active');
        if (restBtn) restBtn.classList.remove('active');
        if (bodyEl) bodyEl.classList.remove('hidden');
        if (restInfoEl) restInfoEl.classList.add('hidden');
        if (inputEl) inputEl.value = dayPreset.focus;
      }
    }
  });

  showToast('⚡ Šablona aplikována! Zkontroluj dny a klikni na „Uložit plán“.');
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

  const btnManageExercises = document.getElementById('btn-manage-exercises');
  if (btnManageExercises) btnManageExercises.addEventListener('click', openExercisesModal);

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

  // Live Workout Controls
  const btnStartWorkout = document.getElementById('btn-start-workout');
  if (btnStartWorkout) btnStartWorkout.addEventListener('click', () => startActiveWorkout());

  const btnActiveLog = document.getElementById('btn-active-workout-log');
  if (btnActiveLog) btnActiveLog.addEventListener('click', () => {
    if (activeWorkout) {
      const elapsedMinutes = Math.max(1, Math.round((Date.now() - activeWorkout.startTime) / 60000));
      openWorkoutModal(activeWorkout.split, elapsedMinutes);
    } else {
      openWorkoutModal();
    }
  });

  const btnActiveFinish = document.getElementById('btn-active-workout-finish');
  if (btnActiveFinish) btnActiveFinish.addEventListener('click', () => finishActiveWorkout(false));

  const btnModalFinish = document.getElementById('btn-modal-finish-workout');
  if (btnModalFinish) btnModalFinish.addEventListener('click', () => finishActiveWorkout(true));

  const btnActiveCancel = document.getElementById('btn-active-workout-cancel');
  if (btnActiveCancel) btnActiveCancel.addEventListener('click', cancelActiveWorkout);

  const btnLoadEntireSplit = document.getElementById('btn-load-entire-split');
  if (btnLoadEntireSplit) btnLoadEntireSplit.addEventListener('click', loadEntireSplitIntoWorkout);

  const btnConfigPr = document.getElementById('btn-configure-pr-exercises');
  if (btnConfigPr) btnConfigPr.addEventListener('click', openPrExercisesModal);

  const btnToggleExplorerPr = document.getElementById('btn-toggle-explorer-pr');
  if (btnToggleExplorerPr) {
    btnToggleExplorerPr.addEventListener('click', () => {
      const select = document.getElementById('pr-exercise-select');
      if (select && select.value) {
        toggleExercisePrPin(select.value);
      }
    });
  }

  const prFilterInput = document.getElementById('pr-exercises-filter-input');
  if (prFilterInput) {
    prFilterInput.addEventListener('input', (e) => {
      renderPrSelectionList(e.target.value);
    });
  }

  const btnSavePr = document.getElementById('btn-save-pr-exercises');
  if (btnSavePr) btnSavePr.addEventListener('click', savePrExercisesSelection);

  const btnResetPr = document.getElementById('btn-reset-default-pr');
  if (btnResetPr) btnResetPr.addEventListener('click', resetDefaultPrExercises);

  const prSelect = document.getElementById('pr-exercise-select');
  if (prSelect) {
    prSelect.addEventListener('change', (e) => {
      renderExerciseExplorerDetails(e.target.value);
    });
  }

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
  setupModalClose('modal-project-notes', 'modal-project-notes-close', 'modal-project-notes-cancel');
  setupModalClose('modal-workout', 'modal-workout-close', 'modal-workout-cancel');
  setupModalClose('modal-exercises', 'modal-exercises-close', 'modal-exercises-cancel');
  setupModalClose('modal-pr-exercises', 'modal-pr-exercises-close', 'modal-pr-exercises-cancel');
  setupModalClose('modal-school', 'modal-school-close', 'modal-school-cancel');
  setupModalClose('modal-split', 'modal-split-close', 'modal-split-cancel');

  // --- Project View Mode Toggle (Grid vs. Kanban) ---
  const btnViewGrid = document.getElementById('btn-project-view-grid');
  const btnViewKanban = document.getElementById('btn-project-view-kanban');
  if (btnViewGrid) btnViewGrid.addEventListener('click', () => switchProjectView('grid'));
  if (btnViewKanban) btnViewKanban.addEventListener('click', () => switchProjectView('kanban'));

  // --- Range slider listener ---
  const rangeInput = document.getElementById('proj-progress');
  const rangeVal = document.getElementById('proj-progress-val');
  if (rangeInput && rangeVal) {
    rangeInput.addEventListener('input', (e) => {
      rangeVal.textContent = `${e.target.value} %`;
    });
  }

  // --- Workout Modal Dynamic Controls ---
  const workoutTypeSelect = document.getElementById('workout-type');
  if (workoutTypeSelect) {
    workoutTypeSelect.addEventListener('change', () => {
      renderWorkoutQuickChips(workoutTypeSelect.value);
    });
  }

  const btnAddCustomEx = document.getElementById('btn-add-custom-exercise');
  const inputCustomEx = document.getElementById('custom-exercise-input');
  if (btnAddCustomEx && inputCustomEx) {
    const doAddCustom = () => {
      const name = inputCustomEx.value.trim();
      if (!name) return;
      addExerciseToWorkoutSession(name);
      inputCustomEx.value = '';
    };
    btnAddCustomEx.addEventListener('click', doAddCustom);
    inputCustomEx.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        doAddCustom();
      }
    });
  }

  // --- Template Exercises Modal Controls ---
  const manageSplitSelect = document.getElementById('manage-exercises-split-select');
  if (manageSplitSelect) {
    manageSplitSelect.addEventListener('change', renderTemplateExercisesList);
  }

  // --- Split Management Controls ---
  const btnShowNewSplit = document.getElementById('btn-show-new-split');
  const boxNewSplit = document.getElementById('box-new-split-inline');
  const inputNewSplit = document.getElementById('input-new-split-name');
  const btnConfirmNewSplit = document.getElementById('btn-confirm-new-split');
  const btnCancelNewSplit = document.getElementById('btn-cancel-new-split');
  const btnRenameSplit = document.getElementById('btn-rename-split');
  const btnDeleteSplit = document.getElementById('btn-delete-split');

  if (btnShowNewSplit && boxNewSplit) {
    btnShowNewSplit.addEventListener('click', () => {
      boxNewSplit.classList.remove('hidden');
      if (inputNewSplit) {
        inputNewSplit.value = '';
        inputNewSplit.focus();
      }
    });
  }

  if (btnCancelNewSplit && boxNewSplit) {
    btnCancelNewSplit.addEventListener('click', () => {
      boxNewSplit.classList.add('hidden');
    });
  }

  if (btnConfirmNewSplit && inputNewSplit) {
    const doCreateSplit = () => {
      const name = inputNewSplit.value.trim();
      if (!name) return;
      if (!state.gym.exercisesBySplit) {
        state.gym.exercisesBySplit = JSON.parse(JSON.stringify(DEFAULT_DATA.gym.exercisesBySplit));
      }
      if (state.gym.exercisesBySplit[name]) {
        showToast('Split s tímto názvem již existuje!');
        return;
      }
      state.gym.exercisesBySplit[name] = [];
      saveState();
      syncAllSplitDropdowns();
      const select = document.getElementById('manage-exercises-split-select');
      if (select) select.value = name;
      renderTemplateExercisesList();
      boxNewSplit.classList.add('hidden');
      inputNewSplit.value = '';
      showToast(`Nový split „${name}“ vytvořen! 🏋️`);
    };

    btnConfirmNewSplit.addEventListener('click', doCreateSplit);
    inputNewSplit.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        doCreateSplit();
      }
    });
  }

  if (btnRenameSplit) {
    btnRenameSplit.addEventListener('click', () => {
      const select = document.getElementById('manage-exercises-split-select');
      if (!select) return;
      const oldName = select.value;
      const newName = prompt(`Přejmenovat split „${oldName}“ na:`, oldName);
      if (!newName || !newName.trim() || newName.trim() === oldName) return;
      const cleanNew = newName.trim();

      if (!state.gym.exercisesBySplit) {
        state.gym.exercisesBySplit = JSON.parse(JSON.stringify(DEFAULT_DATA.gym.exercisesBySplit));
      }
      if (state.gym.exercisesBySplit[cleanNew]) {
        showToast('Split s tímto názvem již existuje!');
        return;
      }

      state.gym.exercisesBySplit[cleanNew] = state.gym.exercisesBySplit[oldName] || [];
      delete state.gym.exercisesBySplit[oldName];

      if (state.gym.split) {
        state.gym.split.forEach(s => {
          if (s.focus === oldName) s.focus = cleanNew;
        });
      }

      saveState();
      syncAllSplitDropdowns();
      select.value = cleanNew;
      renderTemplateExercisesList();
      renderGym();
      showToast(`Split přejmenován na „${cleanNew}“`);
    });
  }

  if (btnDeleteSplit) {
    btnDeleteSplit.addEventListener('click', () => {
      const select = document.getElementById('manage-exercises-split-select');
      if (!select) return;
      const splitName = select.value;
      const allSplits = Object.keys(state.gym.exercisesBySplit || {});
      if (allSplits.length <= 1) {
        alert('Nemůžeš smazat jediný existující split!');
        return;
      }
      if (!confirm(`Opravdu chceš smazat split „${splitName}“ a všechny jeho cviky?`)) return;

      delete state.gym.exercisesBySplit[splitName];
      saveState();
      syncAllSplitDropdowns();
      renderTemplateExercisesList();
      renderGym();
      showToast(`Split „${splitName}“ smazán`);
    });
  }

  const formAddTemplateEx = document.getElementById('form-add-template-exercise');
  if (formAddTemplateEx) {
    formAddTemplateEx.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.getElementById('new-template-exercise-name');
      const select = document.getElementById('manage-exercises-split-select');
      if (!input || !select) return;
      const name = input.value.trim();
      const split = select.value;
      if (!name) return;
      if (!state.gym.exercisesBySplit) {
        state.gym.exercisesBySplit = JSON.parse(JSON.stringify(DEFAULT_DATA.gym.exercisesBySplit));
      }
      if (!state.gym.exercisesBySplit[split]) state.gym.exercisesBySplit[split] = [];
      if (!state.gym.exercisesBySplit[split].includes(name)) {
        state.gym.exercisesBySplit[split].push(name);
        saveState();
        input.value = '';
        renderTemplateExercisesList();
        const wSelect = document.getElementById('workout-type');
        if (wSelect && wSelect.value === split) {
          renderWorkoutQuickChips(split);
        }
        showToast('Cvik přidán do šablony! 🏋️');
      } else {
        showToast('Tento cvik už v šabloně existuje');
      }
    });
  }

  const btnResetEx = document.getElementById('btn-reset-default-exercises');
  if (btnResetEx) {
    btnResetEx.addEventListener('click', () => {
      if (confirm('Opravdu chceš obnovit výchozí cviky pro všechny splity?')) {
        state.gym.exercisesBySplit = JSON.parse(JSON.stringify(DEFAULT_DATA.gym.exercisesBySplit));
        saveState();
        renderTemplateExercisesList();
        const wSelect = document.getElementById('workout-type');
        if (wSelect) renderWorkoutQuickChips(wSelect.value);
        showToast('Výchozí cviky obnoveny');
      }
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
      const liveUrl = (document.getElementById('proj-live-url')?.value || '').trim();
      const techStackRaw = (document.getElementById('proj-tech-stack')?.value || '').trim();
      const techStack = techStackRaw ? techStackRaw.split(',').map(s => s.trim()).filter(Boolean) : [];
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
          proj.liveUrl = liveUrl;
          proj.techStack = techStack;
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
          liveUrl,
          techStack,
          devNotes: [],
          description: desc,
          tasks: []
        });
      }

      saveState();
      try {
        sessionStorage.removeItem(`lifeos_draft_proj_${id || 'new'}`);
      } catch (e) {}
      const modalProj = document.getElementById('modal-project');
      if (modalProj) {
        modalProj._initialValues = null;
        modalProj.close();
      }
      renderProjects();
      renderOverview();
      updateMetrics();
      updateSidebarBadges();
      showToast('Projekt byl úspěšně uložen');
    });

    // Auto-save draft while typing
    formProject.addEventListener('input', () => {
      const pId = document.getElementById('proj-id').value || 'new';
      const draft = {
        title: document.getElementById('proj-title').value,
        category: document.getElementById('proj-category').value,
        status: document.getElementById('proj-status').value,
        progress: document.getElementById('proj-progress').value,
        deadline: document.getElementById('proj-deadline').value,
        url: document.getElementById('proj-url').value,
        liveUrl: document.getElementById('proj-live-url').value,
        techStack: document.getElementById('proj-tech-stack').value,
        desc: document.getElementById('proj-desc').value
      };
      try {
        sessionStorage.setItem(`lifeos_draft_proj_${pId}`, JSON.stringify(draft));
      } catch (e) {}
    });
  }

  // 1B. Project Dev Note Form
  const formAddProjectNote = document.getElementById('form-add-project-note');
  if (formAddProjectNote) {
    formAddProjectNote.addEventListener('submit', (e) => {
      e.preventDefault();
      const projId = document.getElementById('project-note-proj-id')?.value;
      const noteInput = document.getElementById('project-note-input');
      if (projId && noteInput && noteInput.value.trim()) {
        addProjectDevNote(projId, noteInput.value.trim());
        noteInput.value = '';
      }
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

      // Compile exercises string from builder
      let compiledExercises = '';
      if (currentWorkoutExercises.length > 0) {
        compiledExercises = currentWorkoutExercises.map(ex => {
          const validSets = ex.sets.filter(s => (s.weight !== '' && s.weight !== null && s.weight !== undefined) || (s.reps !== '' && s.reps !== null && s.reps !== undefined));
          const setsDetails = (validSets.length > 0 ? validSets : ex.sets).map(s => {
            const w = (s.weight !== '' && s.weight !== null && s.weight !== undefined) ? `${s.weight} kg` : '';
            const r = (s.reps !== '' && s.reps !== null && s.reps !== undefined) ? `${s.reps} reps` : '';
            if (w && r) return `${s.weight} kg × ${s.reps}`;
            return w || r || '1 série';
          }).join(', ');

          return `• ${ex.name}: ${ex.sets.length} série${setsDetails ? ` (${setsDetails})` : ''}`;
        }).join('\n');

        if (notes) {
          compiledExercises += `\nPoznámka: ${notes}`;
        }
      } else {
        compiledExercises = notes;
      }

      const editId = document.getElementById('workout-edit-id')?.value;
      const isCurrentActiveWorkout = activeWorkout && (editId === activeWorkout.id || date === getTodayStr());

      if (isCurrentActiveWorkout) {
        // Save current sets into activeWorkout state & persistence
        activeWorkout.exercises = JSON.parse(JSON.stringify(currentWorkoutExercises));
        activeWorkout.split = type;
        activeWorkout.rating = rating;
        activeWorkout.notes = notes;
        try {
          localStorage.setItem('lifeos_active_workout', JSON.stringify(activeWorkout));
        } catch (e) {}

        const elapsedMinutes = Math.max(1, Math.round((Date.now() - activeWorkout.startTime) / 60000));
        const activeLogData = {
          id: activeWorkout.id,
          date: date || getTodayStr(),
          duration: elapsedMinutes,
          type,
          rating,
          exercises: compiledExercises
        };

        const existingIdx = state.gym.logs.findIndex(l => l.id === activeWorkout.id);
        if (existingIdx >= 0) {
          state.gym.logs[existingIdx] = activeLogData;
        } else {
          state.gym.logs.unshift(activeLogData);
        }

        // Habit check for today
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
        const modalWorkout = document.getElementById('modal-workout');
        if (modalWorkout) {
          modalWorkout._initialValues = null;
          modalWorkout.close();
        }
        renderGym();
        renderOverview();
        updateMetrics();
        updateSidebarBadges();
        showToast('💾 Série průběžně uloženy! Stopky tréninku dál běží. 💪');
        return;
      }

      if (editId) {
        const existing = state.gym.logs.find(l => l.id === editId);
        if (existing) {
          existing.date = date;
          existing.duration = duration;
          existing.type = type;
          existing.rating = rating;
          existing.exercises = compiledExercises;
          showToast('Trénink byl úspěšně upraven! 🏋️');
        }
      } else {
        state.gym.logs.unshift({
          id: 'log_' + Date.now(),
          date,
          duration,
          type,
          rating,
          exercises: compiledExercises
        });
        showToast('Trénink byl úspěšně zaznamenán! 🏋️');
      }

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
      const modalWorkout = document.getElementById('modal-workout');
      if (modalWorkout) {
        modalWorkout._initialValues = null;
        modalWorkout.close();
      }
      renderGym();
      renderOverview();
      updateMetrics();
      updateSidebarBadges();
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
      const modalSchool = document.getElementById('modal-school');
      if (modalSchool) {
        modalSchool._initialValues = null;
        modalSchool.close();
      }
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
      const cards = document.querySelectorAll('.split-day-card');
      cards.forEach(card => {
        const day = parseInt(card.getAttribute('data-day'), 10);
        const isRest = card.classList.contains('is-rest');
        const input = card.querySelector('.split-focus-input');
        const splitItem = state.gym.split.find(s => s.day === day);
        if (splitItem) {
          splitItem.rest = isRest;
          if (isRest) {
            splitItem.focus = 'Odpočinek / Regenerace';
          } else {
            const val = input ? input.value.trim() : '';
            splitItem.focus = val || 'Trénink';
          }
        }
      });

      sanitizeGymSplit();
      saveState();
      const modalSplit = document.getElementById('modal-split');
      if (modalSplit) {
        modalSplit._initialValues = null;
        modalSplit.close();
      }
      renderGym();
      renderOverview();
      showToast('Týdenní plán upraven! 🏋️');
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

function markModalInitialState(modal) {
  if (!modal) return;
  const form = modal.querySelector('form');
  if (!form) return;
  const values = {};
  form.querySelectorAll('input, textarea, select').forEach(el => {
    if (el.id) values[el.id] = el.value;
  });
  modal._initialValues = JSON.stringify(values);
}

function isModalFormDirty(modal) {
  if (!modal || !modal._initialValues) return false;
  const form = modal.querySelector('form');
  if (!form) return false;
  const values = {};
  form.querySelectorAll('input, textarea, select').forEach(el => {
    if (el.id) values[el.id] = el.value;
  });
  return JSON.stringify(values) !== modal._initialValues;
}

function setupModalClose(modalId, closeBtnId, cancelBtnId) {
  const modal = document.getElementById(modalId);
  const closeBtn = document.getElementById(closeBtnId);
  const cancelBtn = document.getElementById(cancelBtnId);

  const confirmCloseIfDirty = () => {
    if (isModalFormDirty(modal)) {
      return confirm('Máš rozepsané neuložené změny. Opravdu chceš okno zavřít bez uložení?');
    }
    return true;
  };

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (confirmCloseIfDirty()) {
        modal._initialValues = null;
        modal.close();
      }
    });
  }

  if (cancelBtn && modal) {
    cancelBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (confirmCloseIfDirty()) {
        modal._initialValues = null;
        modal.close();
      }
    });
  }

  if (modal) {
    // Safe backdrop click handling:
    // Only close if BOTH mousedown and mouseup genuinely occurred on the backdrop (never during text selection)
    let mousedownOnBackdrop = false;

    modal.addEventListener('mousedown', (e) => {
      const content = modal.querySelector('.dialog-content');
      mousedownOnBackdrop = (e.target === modal && (!content || !content.contains(e.target)));
    });

    modal.addEventListener('mouseup', (e) => {
      if (e.target === modal && mousedownOnBackdrop) {
        if (confirmCloseIfDirty()) {
          modal._initialValues = null;
          modal.close();
        }
      }
      mousedownOnBackdrop = false;
    });

    // Native ESC key cancellation
    modal.addEventListener('cancel', (e) => {
      if (!confirmCloseIfDirty()) {
        e.preventDefault(); // Stop native ESC dismiss
      } else {
        modal._initialValues = null;
      }
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
let realtimeDebounceTimer = null;
let lastLocalPushTimestamp = 0;
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
      
      // 1. SUPPRESS LOCAL ECHO:
      // If we pushed to Supabase recently (last 4 seconds), ignore this broadcast.
      // We already have the newest data locally!
      if (Date.now() - lastLocalPushTimestamp < 4000) {
        console.log('Skipping Realtime event: local push echo');
        return;
      }

      // Handle DELETE events from other devices
      if (payload.eventType === 'DELETE') {
        const table = payload.table;
        const deletedId = payload.old?.id;
        if (deletedId) {
          markAsDeleted(deletedId);
          if (table === 'gym_logs') {
            state.gym.logs = state.gym.logs.filter(l => l.id !== deletedId);
          } else if (table === 'projects') {
            state.projects = state.projects.filter(p => p.id !== deletedId);
          } else if (table === 'school_items') {
            state.school = state.school.filter(s => s.id !== deletedId);
          } else if (table === 'habits') {
            state.habits = state.habits.filter(h => h.id !== deletedId);
          }
          saveState(true);
          renderAllViews();
          showToast('Položka smazána z druhého zařízení 🗑️');
        }
        return;
      }

      // For INSERT and UPDATE from other devices:
      // DEBOUNCE the pull so that if multiple tables change simultaneously,
      // we only perform a SINGLE clean pull and re-render after 400ms!
      if (realtimeDebounceTimer) clearTimeout(realtimeDebounceTimer);
      realtimeDebounceTimer = setTimeout(() => {
        pullFromSupabase(true, false);
      }, 400);
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

  lastLocalPushTimestamp = Date.now();
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
    if (state.projects) {
      if (state.projects.length > 0) {
        const projectRows = state.projects.map(p => {
          const cleanTasks = (p.tasks || []).filter(t => t.id !== '__meta__');
          const meta = {
            id: '__meta__',
            techStack: p.techStack || [],
            devNotes: p.devNotes || [],
            liveUrl: p.liveUrl || ''
          };
          return {
            id: p.id,
            user_id: userId,
            title: p.title,
            description: p.description || '',
            category: p.category || '',
            status: p.status || 'in_progress',
            progress: p.progress || 0,
            deadline: p.deadline || null,
            url: p.url || '',
            tasks: [...cleanTasks, meta],
            updated_at: nowIso
          };
        });
        await supabaseClient.from('projects').upsert(projectRows);

        const localProjIds = state.projects.map(p => p.id);
        const { data: dbProjects } = await supabaseClient.from('projects').select('id').eq('user_id', userId);
        if (dbProjects) {
          const toDelete = dbProjects.filter(r => !localProjIds.includes(r.id)).map(r => r.id);
          if (toDelete.length > 0) {
            await supabaseClient.from('projects').delete().in('id', toDelete).eq('user_id', userId);
          }
        }
      } else {
        await supabaseClient.from('projects').delete().eq('user_id', userId);
      }
    }

    // 3. Gym Split & Split Templates
    if (state.gym && state.gym.split) {
      sanitizeGymSplit();
      const validWeekly = state.gym.split.filter(s =>
        s.day >= 0 && s.day <= 6 &&
        (!s.dayName || !s.dayName.startsWith('__')) &&
        (!s.focus || (!s.focus.startsWith('{') && !s.focus.startsWith('[')))
      );
      const splitRows = validWeekly.map(s => ({
        id: `split_${userId}_${s.day}`,
        user_id: userId,
        day: s.day,
        day_name: s.dayName,
        focus: s.focus,
        rest: !!s.rest,
        updated_at: nowIso
      }));

      // Virtual row for exercise templates across splits
      if (state.gym.exercisesBySplit) {
        splitRows.push({
          id: `split_${userId}_templates`,
          user_id: userId,
          day: 999,
          day_name: '__TEMPLATES__',
          focus: JSON.stringify(state.gym.exercisesBySplit),
          rest: false,
          updated_at: nowIso
        });
      }

      // Virtual row for pinned PR exercises
      if (state.gym.prExercises && Array.isArray(state.gym.prExercises)) {
        splitRows.push({
          id: `split_${userId}_pr_exercises`,
          user_id: userId,
          day: 998,
          day_name: '__PR_EXERCISES__',
          focus: JSON.stringify(state.gym.prExercises),
          rest: false,
          updated_at: nowIso
        });
      }

      await supabaseClient.from('gym_split').upsert(splitRows);

      // Clean up any rogue rows in Supabase gym_split
      const validSplitRowIds = new Set(splitRows.map(r => r.id));
      const { data: dbSplits } = await supabaseClient.from('gym_split').select('id').eq('user_id', userId);
      if (dbSplits) {
        const toDelete = dbSplits.filter(r => !validSplitRowIds.has(r.id)).map(r => r.id);
        if (toDelete.length > 0) {
          await supabaseClient.from('gym_split').delete().in('id', toDelete).eq('user_id', userId);
        }
      }
    }

    // 4. Gym Logs
    if (state.gym && state.gym.logs) {
      if (state.gym.logs.length > 0) {
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

        const localLogIds = state.gym.logs.map(l => l.id);
        const { data: dbLogs } = await supabaseClient.from('gym_logs').select('id').eq('user_id', userId);
        if (dbLogs) {
          const toDelete = dbLogs.filter(r => !localLogIds.includes(r.id)).map(r => r.id);
          if (toDelete.length > 0) {
            await supabaseClient.from('gym_logs').delete().in('id', toDelete).eq('user_id', userId);
          }
        }
      } else {
        await supabaseClient.from('gym_logs').delete().eq('user_id', userId);
      }
    }

    // 5. School Items
    if (state.school) {
      if (state.school.length > 0) {
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

        const localSchoolIds = state.school.map(s => s.id);
        const { data: dbSchool } = await supabaseClient.from('school_items').select('id').eq('user_id', userId);
        if (dbSchool) {
          const toDelete = dbSchool.filter(r => !localSchoolIds.includes(r.id)).map(r => r.id);
          if (toDelete.length > 0) {
            await supabaseClient.from('school_items').delete().in('id', toDelete).eq('user_id', userId);
          }
        }
      } else {
        await supabaseClient.from('school_items').delete().eq('user_id', userId);
      }
    }

    // 6. Habits
    if (state.habits) {
      if (state.habits.length > 0) {
        const habitRows = state.habits.map(h => ({
          id: h.id,
          user_id: userId,
          text: h.text,
          updated_at: nowIso
        }));
        await supabaseClient.from('habits').upsert(habitRows);

        const localHabitIds = state.habits.map(h => h.id);
        const { data: dbHabits } = await supabaseClient.from('habits').select('id').eq('user_id', userId);
        if (dbHabits) {
          const toDelete = dbHabits.filter(r => !localHabitIds.includes(r.id)).map(r => r.id);
          if (toDelete.length > 0) {
            await supabaseClient.from('habits').delete().in('id', toDelete).eq('user_id', userId);
          }
        }
      } else {
        await supabaseClient.from('habits').delete().eq('user_id', userId);
      }
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
  } finally {
    lastLocalPushTimestamp = Date.now();
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
        const cloudProjects = projectsRes.data
          .filter(p => !recentlyDeletedIds.has(p.id))
          .map(p => {
            const rawTasks = Array.isArray(p.tasks) ? p.tasks : [];
            const metaItem = rawTasks.find(t => t && t.id === '__meta__');
            const realTasks = rawTasks.filter(t => !t || t.id !== '__meta__');
            const existingLocal = state.projects.find(local => local.id === p.id);

            return {
              id: p.id,
              title: p.title,
              description: p.description || '',
              category: p.category || '',
              status: p.status || 'in_progress',
              progress: p.progress || 0,
              deadline: p.deadline || '',
              url: p.url || '',
              tasks: realTasks,
              techStack: (metaItem && Array.isArray(metaItem.techStack)) ? metaItem.techStack : (existingLocal?.techStack || []),
              devNotes: (metaItem && Array.isArray(metaItem.devNotes)) ? metaItem.devNotes : (existingLocal?.devNotes || []),
              liveUrl: (metaItem && metaItem.liveUrl !== undefined) ? metaItem.liveUrl : (existingLocal?.liveUrl || '')
            };
          });

        const hasOldDemo = cloudProjects.some(p => p.id === 'proj_1' || p.id === 'proj_2' || p.id === 'proj_3');
        const hasPersonal = cloudProjects.some(p => p.title === 'PubMate' || p.title === 'Dockmaster' || p.title === 'LogiSpace');

        if (hasOldDemo && !hasPersonal) {
          ['proj_1', 'proj_2', 'proj_3'].forEach(id => markAsDeleted(id));
          state.projects = JSON.parse(JSON.stringify(DEFAULT_DATA.projects));
          saveState();
        } else if (cloudProjects.length > 0) {
          state.projects = cloudProjects;
        }
      }

      // 3. Gym Split & Templates
      if (splitRes.data && splitRes.data.length > 0) {
        const templateRow = splitRes.data.find(s => s.day === 999 || s.day_name === '__TEMPLATES__');
        if (templateRow && templateRow.focus) {
          try {
            const parsedTemplates = JSON.parse(templateRow.focus);
            if (parsedTemplates && typeof parsedTemplates === 'object') {
              state.gym.exercisesBySplit = parsedTemplates;
            }
          } catch (e) {
            console.warn('Error parsing split templates from cloud:', e);
          }
        }

        const prRow = splitRes.data.find(s => s.day === 998 || s.day_name === '__PR_EXERCISES__');
        if (prRow && prRow.focus) {
          try {
            const parsedPr = JSON.parse(prRow.focus);
            if (Array.isArray(parsedPr) && parsedPr.length > 0) {
              state.gym.prExercises = parsedPr;
            }
          } catch (e) {
            console.warn('Error parsing PR exercises from cloud:', e);
          }
        }

        const weeklyRows = splitRes.data.filter(s =>
          s.day >= 0 && s.day <= 6 &&
          (!s.day_name || !s.day_name.startsWith('__')) &&
          (!s.focus || (!s.focus.startsWith('{') && !s.focus.startsWith('[')))
        );
        if (weeklyRows.length > 0) {
          const cloudSplit = weeklyRows.map(s => ({
            day: s.day,
            dayName: s.day_name,
            focus: s.focus,
            rest: !!s.rest
          }));

          state.gym.split = cloudSplit;
        }
        sanitizeGymSplit();
      }

      // 4. Gym Logs
      if (logsRes.data) {
        state.gym.logs = logsRes.data
          .filter(l => !recentlyDeletedIds.has(l.id))
          .map(l => {
            let t = l.type;
            if (t === 'Push' || t === 'Upper') t = 'Upper A';
            else if (t === 'Pull') t = 'Upper B';
            else if (t === 'Legs' || t === 'Lower') t = 'Lower A';
            return {
              id: l.id,
              date: l.date,
              duration: l.duration || 60,
              type: t,
              rating: l.rating || 4,
              exercises: l.exercises || ''
            };
          });
      }

      // 5. School Items
      if (schoolRes.data) {
        state.school = schoolRes.data
          .filter(s => !recentlyDeletedIds.has(s.id))
          .map(s => ({
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
        state.habits = habitsRes.data
          .filter(h => !recentlyDeletedIds.has(h.id))
          .map(h => ({
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

      const activeDialog = document.querySelector('dialog[open]');
      if (!activeDialog) {
        renderAllViews();
      } else {
        // User has an active modal open - do not disrupt active form focus
        renderOverview();
        renderGym();
        renderSchool();
        renderSettings();
        updateMetrics();
        updateSidebarBadges();
      }

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

