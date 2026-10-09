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
    activeProfile: 'classic',
    splitProfiles: {
      classic: [
        { day: 1, dayName: 'Pondělí', focus: 'Upper A', rest: false },
        { day: 2, dayName: 'Úterý', focus: 'Lower A', rest: false },
        { day: 3, dayName: 'Středa', focus: 'Odpočinek / Regenerace', rest: true },
        { day: 4, dayName: 'Čtvrtek', focus: 'Upper B', rest: false },
        { day: 5, dayName: 'Pátek', focus: 'Lower B', rest: false },
        { day: 6, dayName: 'Sobota', focus: 'Kardio & Mobilita', rest: true },
        { day: 0, dayName: 'Neděle', focus: 'Odpočinek & Příprava', rest: true }
      ],
      plasma: [
        { day: 1, dayName: 'Pondělí', focus: 'Upper A', rest: false },
        { day: 2, dayName: 'Úterý', focus: 'Lower A', rest: false },
        { day: 3, dayName: 'Středa', focus: '🩸 Darování plazmy (Klid na ruce)', rest: true },
        { day: 4, dayName: 'Čtvrtek', focus: 'Lower B (Nohy / Šetřit paže)', rest: false },
        { day: 5, dayName: 'Pátek', focus: 'Upper B (Lehčí / Odpočaté paže)', rest: false },
        { day: 6, dayName: 'Sobota', focus: 'Kardio & Mobilita', rest: true },
        { day: 0, dayName: 'Neděle', focus: 'Odpočinek & Regenerace', rest: true }
      ]
    },
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
      totalTimeMinutes: 195,
      timeLogs: [
        { id: 'tl_pm1', date: getRelativeDateStr(-2), minutes: 120, note: 'Tvorba UI a offline synchronizace' },
        { id: 'tl_pm2', date: getRelativeDateStr(-1), minutes: 75, note: 'Optimalizace ukládání a zobrazení mapy' }
      ],
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
      totalTimeMinutes: 110,
      timeLogs: [
        { id: 'tl_dm1', date: getRelativeDateStr(-3), minutes: 110, note: 'Napojení Docker Engine socketu a stream metrik' }
      ],
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
      totalTimeMinutes: 45,
      timeLogs: [
        { id: 'tl_ls1', date: getRelativeDateStr(-4), minutes: 45, note: 'Analýza a návrh 3D buněk regálového systému' }
      ],
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
  school: [],
  habits: [
    { id: 'h_gym', text: 'Trénink ve fitku / sport' },
    { id: 'h_study', text: 'Učení do školy (min. 45 min)' },
    { id: 'h_code', text: 'Práce na projektu / programování' },
    { id: 'h_water', text: 'Vypít 2.5 litru čisté vody' },
    { id: 'h_sleep', text: 'Kvalitní spánek 7 - 8 hodin' }
  ],
  habitLogs: {},
  journal: [],
  quickLinks: [
    { id: 'ql_1', title: 'Portál STAG / Univerzita', url: 'https://portal.osu.cz', category: 'Škola', desc: 'Rozvrh hodin, zkoušky a zápis předmětů', icon: '🎓' },
    { id: 'ql_2', title: 'GitHub', url: 'https://github.com/TomasVyo', category: 'Projekty & Dev', desc: 'Repozitáře, commits a projekty', icon: '💻' },
    { id: 'ql_3', title: 'ChatGPT', url: 'https://chatgpt.com', category: 'AI & Nástroje', desc: 'AI asistent pro kódování a rešerše', icon: '🤖' },
    { id: 'ql_4', title: 'Claude', url: 'https://claude.ai', category: 'AI & Nástroje', desc: 'Anthropic AI model pro analýzu kódu', icon: '🧠' },
    { id: 'ql_5', title: 'Supabase Dashboard', url: 'https://supabase.com/dashboard', category: 'Projekty & Dev', desc: 'Správa PostgreSQL databází a backendu', icon: '⚡' },
    { id: 'ql_6', title: 'Moodle / E-learning', url: 'https://moodle.osu.cz', category: 'Škola', desc: 'Studijní materiály a odevzdávárny úkolů', icon: '📚' },
    { id: 'ql_app_1', title: 'VS Code', url: 'vscode://', category: 'Aplikace', desc: 'Editor kódu Visual Studio Code', icon: '💻' },
    { id: 'ql_app_2', title: 'Spotify', url: 'spotify:', category: 'Aplikace', desc: 'Hudební přehrávač Spotify', icon: '🎧' },
    { id: 'ql_app_3', title: 'Discord', url: 'discord://', category: 'Aplikace', desc: 'Komunikační server a chat Discord', icon: '💬' }
  ],
  finance: {
    recurring: [],
    transactions: []
  }
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

// Persistent Tombstone set for explicitly deleted items to prevent sync race conditions
const DELETED_IDS_KEY = 'lifeos_deleted_ids_v1';
function loadDeletedIds() {
  try {
    const raw = localStorage.getItem(DELETED_IDS_KEY);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch (e) {
    return new Set();
  }
}
const recentlyDeletedIds = loadDeletedIds();

function markAsDeleted(id) {
  if (!id) return;
  recentlyDeletedIds.add(id);
  try {
    localStorage.setItem(DELETED_IDS_KEY, JSON.stringify(Array.from(recentlyDeletedIds).slice(-300)));
  } catch (e) {}
}

function isExplicitlyDeleted(id) {
  return recentlyDeletedIds.has(id);
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
let activeProjectTimer = null;
let projectTimerInterval = null;

// Automatic recovery scanner for lost or unfinalized workouts
function recoverLostWorkouts(currentLogs = []) {
  const recovered = [];
  const knownIds = new Set((currentLogs || []).map(l => l.id));

  try {
    // 1. Check lifeos_active_workout for workouts with recorded exercises
    const awRaw = localStorage.getItem('lifeos_active_workout');
    if (awRaw) {
      const aw = JSON.parse(awRaw);
      if (aw && Array.isArray(aw.exercises) && aw.exercises.length > 0) {
        const hasSets = aw.exercises.some(e => e.sets && e.sets.some(s => (s.weight !== '' && s.weight !== null && s.weight !== undefined) || (s.reps !== '' && s.reps !== null && s.reps !== undefined)));
        if (hasSets && (!aw.id || !knownIds.has(aw.id)) && (!aw.id || !isExplicitlyDeleted(aw.id))) {
          const compiled = aw.exercises.map(ex => {
            const valid = ex.sets.filter(s => (s.weight !== '' && s.weight !== null && s.weight !== undefined) || (s.reps !== '' && s.reps !== null && s.reps !== undefined));
            const details = (valid.length > 0 ? valid : ex.sets).map(s => {
              const w = (s.weight !== '' && s.weight !== null && s.weight !== undefined) ? `${s.weight} kg` : '';
              const r = (s.reps !== '' && s.reps !== null && s.reps !== undefined) ? `${s.reps} reps` : '';
              if (w && r) return `${s.weight} kg × ${s.reps}`;
              return w || r || '1 série';
            }).join(', ');
            return `• ${ex.name}: ${ex.sets.length} série${details ? ` (${details})` : ''}`;
          }).join('\n');

          const elapsedMinutes = Math.max(1, Math.round(((Date.now() - (aw.startTime || Date.now() - 3600000))) / 60000));
          const recLog = {
            id: aw.id || ('log_rec_' + Date.now()),
            date: getTodayStr(),
            duration: elapsedMinutes > 240 ? 60 : elapsedMinutes,
            type: aw.split || 'Upper A',
            rating: aw.rating || 4,
            exercises: compiled + (aw.notes ? `\nPoznámka: ${aw.notes}` : '')
          };
          recovered.push(recLog);
          knownIds.add(recLog.id);
        }
      }
    }

    // 2. Check lifeos_gym_logs_backup_v1
    const backupRaw = localStorage.getItem('lifeos_gym_logs_backup_v1');
    if (backupRaw) {
      const backupLogs = JSON.parse(backupRaw);
      if (Array.isArray(backupLogs)) {
        backupLogs.forEach(bLog => {
          if (bLog && bLog.id && !knownIds.has(bLog.id) && !isExplicitlyDeleted(bLog.id)) {
            recovered.push(bLog);
            knownIds.add(bLog.id);
          }
        });
      }
    }

    // 3. Deep scan all localStorage keys for any saved JSON containing exercises and weights
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key || key === DELETED_IDS_KEY || key === 'lifeos_gym_logs_backup_v1') continue;
      try {
        const val = localStorage.getItem(key);
        if (val && typeof val === 'string' && val.includes('kg') && (val.includes('série') || val.includes('Bench') || val.includes('Dřep'))) {
          const parsedVal = JSON.parse(val);
          const candidateArray = Array.isArray(parsedVal) ? parsedVal : (parsedVal?.gym?.logs || parsedVal?.logs);
          if (Array.isArray(candidateArray)) {
            candidateArray.forEach(cand => {
              if (cand && cand.id && cand.date && cand.exercises && !knownIds.has(cand.id) && !isExplicitlyDeleted(cand.id)) {
                recovered.push(cand);
                knownIds.add(cand.id);
              }
            });
          }
        }
      } catch (e) {}
    }
  } catch (e) {
    console.warn('Error during workout recovery scan:', e);
  }
  return recovered;
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
            liveUrl: p.liveUrl !== undefined ? p.liveUrl : (defaultMatch ? defaultMatch.liveUrl : ''),
            totalTimeMinutes: typeof p.totalTimeMinutes === 'number' ? p.totalTimeMinutes : (defaultMatch?.totalTimeMinutes || 0),
            timeLogs: Array.isArray(p.timeLogs) ? p.timeLogs : (defaultMatch?.timeLogs || [])
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

      // Gym logs loading & recovery
      let logs = (parsed.gym && Array.isArray(parsed.gym.logs)) ? parsed.gym.logs : DEFAULT_DATA.gym.logs;
      
      // Auto-recover any lost or orphaned workouts from activeWorkout or backups
      const rescued = recoverLostWorkouts(logs);
      if (rescued.length > 0) {
        logs = [...rescued, ...logs];
      }

      // Filter out any explicitly deleted logs
      logs = logs.filter(l => l && !isExplicitlyDeleted(l.id));

      // Gym logs type migration (Push/Upper -> Upper A, Pull -> Upper B, Legs/Lower -> Lower A)
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

      const splitProfiles = (parsed.gym && parsed.gym.splitProfiles) || JSON.parse(JSON.stringify(DEFAULT_DATA.gym.splitProfiles));
      const activeProfile = (parsed.gym && parsed.gym.activeProfile) || 'classic';
      if (!splitProfiles.classic) splitProfiles.classic = JSON.parse(JSON.stringify(DEFAULT_DATA.gym.splitProfiles.classic));
      if (!splitProfiles.plasma) splitProfiles.plasma = JSON.parse(JSON.stringify(DEFAULT_DATA.gym.splitProfiles.plasma));

      const gymData = {
        ...DEFAULT_DATA.gym,
        ...(parsed.gym || {}),
        activeProfile,
        splitProfiles,
        split,
        exercisesBySplit,
        prExercises,
        logs
      };

      // Journal entries loading & recovery
      let journal = Array.isArray(parsed.journal) ? parsed.journal : [];
      if (journal.length === 0) {
        try {
          const jBackup = localStorage.getItem('lifeos_journal_backup_v1');
          if (jBackup) {
            const parsedBackup = JSON.parse(jBackup);
            if (Array.isArray(parsedBackup)) journal = parsedBackup;
          }
        } catch (e) {}
      }
      journal = journal.filter(j => j && j.id && !isExplicitlyDeleted(j.id));

      // Quick links loading & recovery
      let quickLinks = Array.isArray(parsed.quickLinks) ? parsed.quickLinks : [];
      if (quickLinks.length === 0) {
        try {
          const qBackup = localStorage.getItem('lifeos_quicklinks_backup_v1');
          if (qBackup) {
            const parsedBackup = JSON.parse(qBackup);
            if (Array.isArray(parsedBackup)) quickLinks = parsedBackup;
          }
        } catch (e) {}
      }
      if (quickLinks.length === 0) {
        quickLinks = JSON.parse(JSON.stringify(DEFAULT_DATA.quickLinks));
      }
      quickLinks = quickLinks.filter(q => q && q.id && !isExplicitlyDeleted(q.id));

      // Finance loading & recovery
      let finance = parsed.finance || null;
      if (!finance || !Array.isArray(finance.transactions)) {
        try {
          const fBackup = localStorage.getItem('lifeos_finance_backup_v1');
          if (fBackup) {
            finance = JSON.parse(fBackup);
          }
        } catch (e) {}
      }
      if (!finance) {
        finance = JSON.parse(JSON.stringify(DEFAULT_DATA.finance));
      }
      // School tasks loading & strict purge of any legacy demo tasks
      let school = Array.isArray(parsed.school) ? parsed.school : [];
      ['sch_1', 'sch_2', 'sch_3', 'sch_4'].forEach(id => {
        markAsDeleted(id);
      });
      school = school.filter(s => s && s.id && !isExplicitlyDeleted(s.id) && !['sch_1', 'sch_2', 'sch_3', 'sch_4'].includes(s.id));

      // Clean up backup of school tasks if it contained demo items
      try {
        const rawBack = localStorage.getItem('lifeos_school_backup_v1');
        if (rawBack) {
          const parsedBack = JSON.parse(rawBack);
          if (Array.isArray(parsedBack)) {
            const cleanBack = parsedBack.filter(s => s && s.id && !['sch_1', 'sch_2', 'sch_3', 'sch_4'].includes(s.id));
            localStorage.setItem('lifeos_school_backup_v1', JSON.stringify(cleanBack));
          }
        }
      } catch (e) {}

      // Strict purge of legacy demo finance items
      ['rec_1', 'rec_2', 'rec_3', 'rec_4', 'tx_1', 'tx_2', 'tx_3'].forEach(id => {
        markAsDeleted(id);
      });
      if (finance && Array.isArray(finance.recurring)) {
        finance.recurring = finance.recurring.filter(r => r && r.id && !isExplicitlyDeleted(r.id) && !['rec_1', 'rec_2', 'rec_3', 'rec_4'].includes(r.id));
      }
      if (finance && Array.isArray(finance.transactions)) {
        finance.transactions = finance.transactions.filter(t => t && t.id && !isExplicitlyDeleted(t.id) && !['tx_1', 'tx_2', 'tx_3'].includes(t.id));
      }

      return {
        ...DEFAULT_DATA,
        ...parsed,
        projects,
        school,
        user: { ...DEFAULT_DATA.user, ...(parsed.user || {}) },
        gym: gymData,
        habitLogs: parsed.habitLogs || {},
        journal,
        quickLinks,
        finance
      };
    }
  } catch (err) {
    console.error('Error loading data from localStorage:', err);
  }
  return JSON.parse(JSON.stringify(DEFAULT_DATA));
}

// Generic lightweight debounce helper for fluid UI typing and delayed jobs
function debounce(fn, wait = 120) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(this, args), wait);
  };
}

let backupSaveTimeout = null;
function scheduleSecondaryBackups() {
  if (backupSaveTimeout) clearTimeout(backupSaveTimeout);
  backupSaveTimeout = setTimeout(() => {
    try {
      if (state.gym && Array.isArray(state.gym.logs) && state.gym.logs.length > 0) {
        localStorage.setItem('lifeos_gym_logs_backup_v1', JSON.stringify(state.gym.logs));
      }
      if (state.projects && Array.isArray(state.projects) && state.projects.length > 0) {
        localStorage.setItem('lifeos_projects_backup_v1', JSON.stringify(state.projects));
      }
      if (state.school && Array.isArray(state.school) && state.school.length > 0) {
        localStorage.setItem('lifeos_school_backup_v1', JSON.stringify(state.school));
      }
      if (state.journal && Array.isArray(state.journal) && state.journal.length > 0) {
        localStorage.setItem('lifeos_journal_backup_v1', JSON.stringify(state.journal));
      }
      if (state.quickLinks && Array.isArray(state.quickLinks) && state.quickLinks.length > 0) {
        localStorage.setItem('lifeos_quicklinks_backup_v1', JSON.stringify(state.quickLinks));
      }
      if (state.finance && typeof state.finance === 'object') {
        localStorage.setItem('lifeos_finance_backup_v1', JSON.stringify(state.finance));
      }
    } catch (e) {}
  }, 1000);
}

function saveState(skipRemoteSync = false) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    scheduleSecondaryBackups();
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
  initProjectTimers();
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
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      updateClock();
      if (typeof activeProjectTimer !== 'undefined' && activeProjectTimer) updateLiveProjectTimerUI();
      if (typeof activeWorkout !== 'undefined' && activeWorkout) updateActiveWorkoutTimerUI();
    }
  });
}

function updateClock() {
  if (document.hidden) return;
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
  renderQuickLinks();
  renderFinance();
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
  renderJournalWidget();
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
// DAILY JOURNAL & REFLECTION WIDGET
// ==========================================================================
let journalAutosaveTimer = null;

function renderJournalWidget() {
  const card = document.getElementById('overview-journal-card');
  if (!card) return;

  const todayStr = getTodayStr();
  const dateIndicator = document.getElementById('journal-date-indicator');
  if (dateIndicator) {
    const now = new Date();
    const days = ['Neděle', 'Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek', 'Sobota'];
    const months = ['ledna', 'února', 'března', 'dubna', 'května', 'června', 'července', 'srpna', 'září', 'října', 'listopadu', 'prosince'];
    dateIndicator.textContent = `Dnes • ${days[now.getDay()]}, ${now.getDate()}. ${months[now.getMonth()]}`;
  }

  const todayEntry = (state.journal || []).find(j => j.date === todayStr);
  const input = document.getElementById('journal-today-input');
  const statusEl = document.getElementById('journal-autosave-status');

  if (input && document.activeElement !== input) {
    if (todayEntry) {
      input.value = todayEntry.text || '';
      if (statusEl) statusEl.textContent = 'Dnešní zápis uložen ✓';
    } else {
      input.value = '';
      if (statusEl) statusEl.textContent = 'Připraveno';
    }
  }

  const activeMood = todayEntry?.mood || '⚡';
  const pills = document.querySelectorAll('#journal-mood-pills .journal-mood-pill');
  pills.forEach(pill => {
    if (pill.getAttribute('data-mood') === activeMood) {
      pill.classList.add('active');
    } else {
      pill.classList.remove('active');
    }
  });

  const countEl = document.getElementById('journal-history-count');
  if (countEl) countEl.textContent = (state.journal || []).length;

  const drawer = document.getElementById('journal-history-drawer');
  if (drawer && !drawer.classList.contains('hidden')) {
    renderJournalHistoryList();
  }
}

function renderJournalHistoryList() {
  const listEl = document.getElementById('journal-entries-list');
  if (!listEl) return;

  const entries = (state.journal || []).filter(j => j && !isExplicitlyDeleted(j.id));
  if (entries.length === 0) {
    listEl.innerHTML = '<p class="text-xs text-muted" style="text-align: center; padding: 12px 0;">Zatím žádné dřívější zápisy v deníku. Tvůj první zápis se zobrazí zde.</p>';
    return;
  }

  const sorted = [...entries].sort((a, b) => {
    const timeA = a.date + ' ' + (a.time || '00:00');
    const timeB = b.date + ' ' + (b.time || '00:00');
    return timeB.localeCompare(timeA);
  });

  listEl.innerHTML = sorted.map(entry => {
    const dParts = (entry.date || '').split('-');
    let dateStr = entry.date;
    if (dParts.length === 3) {
      const dObj = new Date(parseInt(dParts[0], 10), parseInt(dParts[1], 10) - 1, parseInt(dParts[2], 10));
      const days = ['Neděle', 'Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek', 'Sobota'];
      const months = ['ledna', 'února', 'března', 'dubna', 'května', 'června', 'července', 'srpna', 'září', 'října', 'listopadu', 'prosince'];
      dateStr = `${days[dObj.getDay()]}, ${dObj.getDate()}. ${months[dObj.getMonth()]}`;
    }

    return `
      <div class="journal-entry-card" data-journal-id="${escapeHtml(entry.id)}">
        <div class="journal-entry-header">
          <div class="journal-entry-meta">
            <span class="journal-entry-mood">${escapeHtml(entry.mood || '📝')}</span>
            <span class="journal-entry-date">${escapeHtml(dateStr)}${entry.time ? ` • ${escapeHtml(entry.time)}` : ''}</span>
            ${entry.moodLabel ? `<span class="journal-entry-mood-label">${escapeHtml(entry.moodLabel)}</span>` : ''}
          </div>
          <button type="button" class="btn-del-journal-entry" data-journal-id="${escapeHtml(entry.id)}" title="Smazat zápis">&times;</button>
        </div>
        <div class="journal-entry-text">${escapeHtml(entry.text || '').replace(/\n/g, '<br>')}</div>
      </div>
    `;
  }).join('');
}

function saveTodayJournalEntry(isAutosave = false) {
  const input = document.getElementById('journal-today-input');
  const statusEl = document.getElementById('journal-autosave-status');
  if (!input) return;

  const text = input.value.trim();
  if (!text) {
    if (isAutosave) {
      if (statusEl) statusEl.textContent = 'Připraveno';
      return;
    }
    showToast('Napiš nejdřív myšlenku nebo poznámku k uložení.');
    return;
  }

  const activePill = document.querySelector('#journal-mood-pills .journal-mood-pill.active');
  const mood = activePill ? activePill.getAttribute('data-mood') : '⚡';
  const moodLabel = activePill ? activePill.getAttribute('data-label') : 'Skvělá energie';

  const todayStr = getTodayStr();
  const timeStr = new Date().toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit' });

  if (!state.journal) state.journal = [];

  let entry = state.journal.find(j => j.date === todayStr);
  if (entry) {
    entry.text = text;
    entry.mood = mood;
    entry.moodLabel = moodLabel;
    entry.time = timeStr;
  } else {
    entry = {
      id: 'journal_' + Date.now(),
      date: todayStr,
      time: timeStr,
      mood,
      moodLabel,
      text
    };
    state.journal.unshift(entry);
  }

  saveState();

  if (statusEl) {
    statusEl.textContent = isAutosave ? 'Uloženo automaticky ✓' : 'Uloženo ✓';
  }

  const countEl = document.getElementById('journal-history-count');
  if (countEl) countEl.textContent = state.journal.length;

  const drawer = document.getElementById('journal-history-drawer');
  if (drawer && !drawer.classList.contains('hidden')) {
    renderJournalHistoryList();
  }

  if (!isAutosave) {
    showToast('Zápis do deníku byl úspěšně uložen! 📝');
  }
}

function deleteJournalEntry(id) {
  if (!id) return;
  markAsDeleted(id);
  state.journal = (state.journal || []).filter(j => j.id !== id);
  saveState();
  renderJournalWidget();
  showToast('Zápis byl z deníku odstraněn 🗑️');
}

function setupJournalListeners() {
  const input = document.getElementById('journal-today-input');
  const btnSave = document.getElementById('btn-save-journal-entry');
  const btnToggleHistory = document.getElementById('btn-toggle-journal-history');
  const drawer = document.getElementById('journal-history-drawer');
  const statusEl = document.getElementById('journal-autosave-status');
  const pillsContainer = document.getElementById('journal-mood-pills');
  const historyList = document.getElementById('journal-entries-list');

  // Mood pills click
  if (pillsContainer) {
    pillsContainer.addEventListener('click', (e) => {
      const pill = e.target.closest('.journal-mood-pill');
      if (!pill) return;
      pillsContainer.querySelectorAll('.journal-mood-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      if (input && input.value.trim()) {
        saveTodayJournalEntry(true);
      }
    });
  }

  // Textarea input autosave (600ms debounce)
  if (input) {
    input.addEventListener('input', () => {
      if (statusEl) statusEl.textContent = 'Ukládání...';
      if (journalAutosaveTimer) clearTimeout(journalAutosaveTimer);
      journalAutosaveTimer = setTimeout(() => {
        saveTodayJournalEntry(true);
      }, 600);
    });
  }

  // Save button
  if (btnSave) {
    btnSave.addEventListener('click', () => {
      if (journalAutosaveTimer) clearTimeout(journalAutosaveTimer);
      saveTodayJournalEntry(false);
    });
  }

  // Toggle History Drawer
  if (btnToggleHistory && drawer) {
    btnToggleHistory.addEventListener('click', () => {
      const isHidden = drawer.classList.contains('hidden');
      if (isHidden) {
        drawer.classList.remove('hidden');
        renderJournalHistoryList();
        btnToggleHistory.innerHTML = `❌ Skrýt historii (<span id="journal-history-count">${(state.journal || []).length}</span>)`;
      } else {
        drawer.classList.add('hidden');
        btnToggleHistory.innerHTML = `📜 Historie zápisů (<span id="journal-history-count">${(state.journal || []).length}</span>)`;
      }
    });
  }

  // Delete entry delegation
  if (historyList) {
    historyList.addEventListener('click', (e) => {
      const btnDel = e.target.closest('.btn-del-journal-entry');
      if (!btnDel) return;
      const id = btnDel.getAttribute('data-journal-id');
      if (id && confirm('Opravdu chceš smazat tento zápis z deníku?')) {
        deleteJournalEntry(id);
      }
    });
  }
}

// ==========================================================================
// 2. PROJECTS & TIME TRACKING
// ==========================================================================

let currentOverviewProjectFilter = 'all';
let currentOverviewPeriodFilter = 'all';

function formatTimeMinutes(totalMinutes) {
  if (totalMinutes === 0 || totalMinutes === undefined || totalMinutes === null) return '0 min';
  const isNeg = totalMinutes < 0;
  const abs = Math.abs(totalMinutes);
  const hours = Math.floor(abs / 60);
  const mins = abs % 60;
  let str = '';
  if (hours > 0 && mins > 0) str = `${hours}h ${mins}m`;
  else if (hours > 0) str = `${hours}h`;
  else str = `${mins}m`;
  return isNeg ? `-${str}` : str;
}

function initProjectTimers() {
  try {
    const raw = localStorage.getItem('lifeos_active_project_timer');
    if (raw) {
      activeProjectTimer = JSON.parse(raw);
      startProjectTimerInterval();
    }
  } catch (e) {
    activeProjectTimer = null;
  }
}

function startProjectTimerInterval() {
  if (projectTimerInterval) clearInterval(projectTimerInterval);
  updateLiveProjectTimerUI();
  projectTimerInterval = setInterval(updateLiveProjectTimerUI, 1000);
}

function stopProjectTimerInterval() {
  if (projectTimerInterval) clearInterval(projectTimerInterval);
  projectTimerInterval = null;
}

function updateLiveProjectTimerUI() {
  if (document.hidden) return;
  if (!activeProjectTimer) {
    if (projectTimerInterval) clearInterval(projectTimerInterval);
    return;
  }
  const timerValEls = document.querySelectorAll('.project-live-timer-val');
  const elapsedSec = Math.floor((Date.now() - activeProjectTimer.startTime) / 1000);
  const hrs = Math.floor(elapsedSec / 3600);
  const mins = Math.floor((elapsedSec % 3600) / 60);
  const secs = elapsedSec % 60;
  const formatted = hrs > 0
    ? `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
    : `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

  timerValEls.forEach(el => {
    el.textContent = formatted;
  });
}

function toggleProjectTimer(projId) {
  const proj = state.projects.find(p => p.id === projId);
  if (!proj) return;

  if (activeProjectTimer && activeProjectTimer.projectId === projId) {
    // Stop active timer & open modal to let user write what was done and check minutes
    const elapsedMs = Date.now() - activeProjectTimer.startTime;
    const elapsedMinutes = Math.max(1, Math.round(elapsedMs / 60000));
    openStopTimerModal(projId, elapsedMinutes);
  } else {
    // If another timer was running, auto-save and stop it first
    if (activeProjectTimer) {
      const prevProj = state.projects.find(p => p.id === activeProjectTimer.projectId);
      if (prevProj) {
        const prevElapsed = Math.max(1, Math.round((Date.now() - activeProjectTimer.startTime) / 60000));
        prevProj.totalTimeMinutes = (prevProj.totalTimeMinutes || 0) + prevElapsed;
        if (!Array.isArray(prevProj.timeLogs)) prevProj.timeLogs = [];
        prevProj.timeLogs.push({
          id: 'tl_' + Date.now(),
          date: getTodayStr(),
          minutes: prevElapsed,
          note: 'Měření stopkami (přepnutí projektu)'
        });
      }
    }

    activeProjectTimer = {
      projectId: projId,
      startTime: Date.now()
    };
    localStorage.setItem('lifeos_active_project_timer', JSON.stringify(activeProjectTimer));
    startProjectTimerInterval();
    saveState();
    renderProjects();
    showToast(`▶️ Stopky spuštěny pro projekt „${proj.title}“!`);
  }
}

function openStopTimerModal(projId, elapsedMinutes) {
  const modal = document.getElementById('modal-stop-timer');
  const proj = state.projects.find(p => p.id === projId);
  if (!modal || !proj) return;

  const idInput = document.getElementById('stop-timer-proj-id');
  const badgeEl = document.getElementById('stop-timer-proj-badge');
  const minInput = document.getElementById('stop-timer-minutes');
  const dateInput = document.getElementById('stop-timer-date');
  const noteInput = document.getElementById('stop-timer-note');

  if (idInput) idInput.value = projId;
  if (badgeEl) badgeEl.textContent = `Projekt: ${proj.title} • Naměřeno cca ${elapsedMinutes} min`;
  if (minInput) minInput.value = elapsedMinutes;
  if (dateInput) dateInput.value = getTodayStr();
  if (noteInput) {
    noteInput.value = '';
    setTimeout(() => noteInput.focus(), 80);
  }

  modal.showModal();
  markModalInitialState(modal);
}

function setManualTimeMode(targetMode) {
  const modeInput = document.getElementById('time-action-mode');
  const btnAdd = document.getElementById('btn-time-mode-add');
  const btnDeduct = document.getElementById('btn-time-mode-deduct');
  const titleEl = document.getElementById('modal-manual-time-title');
  const submitBtn = document.getElementById('btn-save-manual-time');
  const actInput = document.getElementById('time-activity');
  const hoursInput = document.getElementById('time-hours');
  const minsInput = document.getElementById('time-minutes');

  if (modeInput) modeInput.value = targetMode;
  if (btnAdd) btnAdd.classList.toggle('active', targetMode === 'add');
  if (btnDeduct) btnDeduct.classList.toggle('active', targetMode === 'deduct');
  if (titleEl) titleEl.textContent = targetMode === 'deduct' ? 'Odebrat čas z projektu' : 'Zapsat čas k projektu';
  if (submitBtn) submitBtn.textContent = targetMode === 'deduct' ? '➖ Odebrat čas (-)' : '➕ Zapsat čas (+)';
  if (actInput) {
    actInput.placeholder = targetMode === 'deduct'
      ? 'Důvod odečtu (např. Chybně spuštěné stopky, pauza, korekce...)'
      : 'Např. Kódování UI, bugfix, studium dokumentace...';
  }
  if (targetMode === 'deduct') {
    if (hoursInput) hoursInput.value = '0';
    if (minsInput) minsInput.value = '30';
  } else {
    if (hoursInput) hoursInput.value = '1';
    if (minsInput) minsInput.value = '0';
  }
}

function openManualTimeModal(projId = null, mode = 'add') {
  const modal = document.getElementById('modal-manual-time');
  const select = document.getElementById('time-proj-select');
  const idInput = document.getElementById('time-proj-id');
  const dateInput = document.getElementById('time-date');
  const actInput = document.getElementById('time-activity');
  if (!modal || !select) return;

  select.innerHTML = state.projects.map(p => `
    <option value="${p.id}" ${p.id === projId ? 'selected' : ''}>${escapeHtml(p.title)}</option>
  `).join('');

  if (idInput) idInput.value = projId || (state.projects[0]?.id || '');
  if (dateInput) dateInput.value = getTodayStr();

  setManualTimeMode(mode);
  if (actInput) actInput.value = '';

  modal.showModal();
  markModalInitialState(modal);
}

function openProjectsTimeOverview(selectedProjId = 'all') {
  const modal = document.getElementById('modal-projects-time-overview');
  if (!modal) return;
  currentOverviewProjectFilter = selectedProjId || 'all';
  renderProjectsTimeOverview();
  modal.showModal();
}

function renderProjectsTimeOverview() {
  const select = document.getElementById('time-overview-project-filter');
  const kpiTotal = document.getElementById('time-kpi-total');
  const kpiWeek = document.getElementById('time-kpi-week');
  const kpiMonth = document.getElementById('time-kpi-month');
  const kpiCount = document.getElementById('time-kpi-count');
  const breakdownCard = document.getElementById('time-overview-breakdown-card');
  const breakdownList = document.getElementById('time-projects-breakdown-list');
  const logsList = document.getElementById('time-overview-logs-list');
  const logsCount = document.getElementById('time-overview-logs-count');
  const shareCount = document.getElementById('time-overview-share-count');

  if (select) {
    select.innerHTML = `
      <option value="all" ${currentOverviewProjectFilter === 'all' ? 'selected' : ''}>🌐 Všechny projekty (souhrnně)</option>
      ${state.projects.map(p => `
        <option value="${p.id}" ${p.id === currentOverviewProjectFilter ? 'selected' : ''}>📁 ${escapeHtml(p.title)}</option>
      `).join('')}
    `;
  }

  // Collect all logs with project metadata
  const allLogs = [];
  state.projects.forEach(p => {
    if (Array.isArray(p.timeLogs)) {
      p.timeLogs.forEach(l => {
        allLogs.push({
          ...l,
          projectId: p.id,
          projectTitle: p.title,
          projectCategory: p.category || ''
        });
      });
    }
  });

  // Project filtering
  let filteredLogs = allLogs;
  if (currentOverviewProjectFilter !== 'all') {
    filteredLogs = filteredLogs.filter(l => l.projectId === currentOverviewProjectFilter);
  }

  // Period filtering
  const todayStr = getTodayStr();
  const currentMonthPrefix = todayStr.substring(0, 7); // YYYY-MM
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const sevenDaysAgoStr = sevenDaysAgo.toISOString().split('T')[0];

  if (currentOverviewPeriodFilter === 'today') {
    filteredLogs = filteredLogs.filter(l => l.date === todayStr);
  } else if (currentOverviewPeriodFilter === 'week') {
    filteredLogs = filteredLogs.filter(l => l.date >= sevenDaysAgoStr && l.date <= todayStr);
  } else if (currentOverviewPeriodFilter === 'month') {
    filteredLogs = filteredLogs.filter(l => l.date && l.date.startsWith(currentMonthPrefix));
  }

  // Sort logs: newest first
  filteredLogs.sort((a, b) => {
    const comp = (b.date || '').localeCompare(a.date || '');
    if (comp !== 0) return comp;
    return (b.id || '').localeCompare(a.id || '');
  });

  // Calculate KPIs
  const totalMins = filteredLogs.reduce((acc, l) => acc + (l.minutes || 0), 0);
  const weekMins = allLogs
    .filter(l => (currentOverviewProjectFilter === 'all' || l.projectId === currentOverviewProjectFilter) && l.date >= sevenDaysAgoStr && l.date <= todayStr)
    .reduce((acc, l) => acc + (l.minutes || 0), 0);
  const monthMins = allLogs
    .filter(l => (currentOverviewProjectFilter === 'all' || l.projectId === currentOverviewProjectFilter) && l.date && l.date.startsWith(currentMonthPrefix))
    .reduce((acc, l) => acc + (l.minutes || 0), 0);

  if (kpiTotal) kpiTotal.textContent = formatTimeMinutes(totalMins);
  if (kpiWeek) kpiWeek.textContent = formatTimeMinutes(weekMins);
  if (kpiMonth) kpiMonth.textContent = formatTimeMinutes(monthMins);
  if (kpiCount) kpiCount.textContent = filteredLogs.length;
  if (logsCount) logsCount.textContent = `${filteredLogs.length} ${filteredLogs.length === 1 ? 'záznam' : (filteredLogs.length >= 2 && filteredLogs.length <= 4 ? 'záznamy' : 'záznamů')}`;

  // Render project distribution breakdown
  if (breakdownList && breakdownCard) {
    if (state.projects.length === 0) {
      breakdownCard.classList.add('hidden');
    } else {
      breakdownCard.classList.remove('hidden');
      const totalAllProjectsMins = state.projects.reduce((acc, p) => acc + Math.max(0, p.totalTimeMinutes || 0), 0);
      if (shareCount) shareCount.textContent = `${formatTimeMinutes(totalAllProjectsMins)} celkem`;

      const projectStats = state.projects.map(p => {
        const pMins = Math.max(0, p.totalTimeMinutes || 0);
        const pct = totalAllProjectsMins > 0 ? Math.round((pMins / totalAllProjectsMins) * 100) : 0;
        return {
          id: p.id,
          title: p.title,
          category: p.category,
          minutes: pMins,
          pct
        };
      }).sort((a, b) => b.minutes - a.minutes);

      breakdownList.innerHTML = projectStats.map(ps => {
        const isSelected = ps.id === currentOverviewProjectFilter;
        return `
          <div class="time-project-bar-row ${isSelected ? 'highlight-target' : ''}" style="cursor: pointer;" data-proj-id="${ps.id}">
            <div class="time-project-bar-header">
              <span class="time-project-bar-title">
                ${isSelected ? '👉' : '📁'} <strong>${escapeHtml(ps.title)}</strong>
                ${ps.category ? `<span class="text-xs text-muted">(${escapeHtml(ps.category)})</span>` : ''}
              </span>
              <span class="time-project-bar-meta">
                <strong>${formatTimeMinutes(ps.minutes)}</strong> (${ps.pct}%)
              </span>
            </div>
            <div class="time-project-bar-track">
              <div class="time-project-bar-fill" style="width: ${ps.pct}%;"></div>
            </div>
          </div>
        `;
      }).join('');

      breakdownList.querySelectorAll('.time-project-bar-row').forEach(row => {
        row.addEventListener('click', () => {
          const pId = row.getAttribute('data-proj-id');
          currentOverviewProjectFilter = currentOverviewProjectFilter === pId ? 'all' : pId;
          renderProjectsTimeOverview();
        });
      });
    }
  }

  // Render detailed logs list
  if (logsList) {
    if (filteredLogs.length === 0) {
      logsList.innerHTML = `
        <div class="card" style="text-align: center; padding: 30px;">
          <p class="text-muted" style="margin-bottom: 8px;">Zatím žádné záznamy času neodpovídají vybranému filtru.</p>
          <button type="button" class="btn btn-outline btn-sm" id="btn-empty-add-time">➕ Zapsat čas</button>
        </div>
      `;
      const emptyBtn = logsList.querySelector('#btn-empty-add-time');
      if (emptyBtn) {
        emptyBtn.addEventListener('click', () => {
          const targetProj = currentOverviewProjectFilter !== 'all' ? currentOverviewProjectFilter : null;
          openManualTimeModal(targetProj, 'add');
        });
      }
    } else {
      logsList.innerHTML = filteredLogs.map(log => {
        const isDeduct = (log.minutes || 0) < 0;
        const sign = isDeduct ? '-' : '+';
        const formattedTime = formatTimeMinutes(Math.abs(log.minutes || 0));

        return `
          <div class="time-overview-log-item" data-proj-id="${log.projectId}" data-log-id="${log.id}">
            <div class="time-overview-log-left">
              <span class="time-badge ${isDeduct ? 'deduct' : 'add'}">${sign}${formattedTime}</span>
              <div class="time-log-info">
                <div class="time-log-headline-row">
                  <span class="time-log-project-pill" data-proj-id="${log.projectId}" title="Filtrovat pouze tento projekt">
                    ${escapeHtml(log.projectTitle)}
                  </span>
                  <span class="time-log-note-text">${escapeHtml(log.note || 'Práce na projektu')}</span>
                </div>
                <div class="time-log-submeta">
                  <span>🗓️ ${log.date}</span>
                  ${isDeduct ? '<span class="text-rose">• Korekce / Odečet</span>' : ''}
                </div>
              </div>
            </div>
            <div class="time-overview-log-right">
              <button type="button" class="btn btn-xs btn-secondary btn-edit-overview-log" data-proj-id="${log.projectId}" data-log-id="${log.id}" title="Upravit popis nebo čas">✏️</button>
              <button type="button" class="btn btn-xs btn-danger btn-del-overview-log" data-proj-id="${log.projectId}" data-log-id="${log.id}" title="Smazat záznam">&times;</button>
            </div>
          </div>
        `;
      }).join('');

      logsList.querySelectorAll('.time-log-project-pill').forEach(pill => {
        pill.addEventListener('click', (e) => {
          e.stopPropagation();
          const pId = pill.getAttribute('data-proj-id');
          currentOverviewProjectFilter = pId;
          renderProjectsTimeOverview();
        });
      });

      logsList.querySelectorAll('.btn-edit-overview-log').forEach(btn => {
        btn.addEventListener('click', () => {
          const pId = btn.getAttribute('data-proj-id');
          const lId = btn.getAttribute('data-log-id');
          openEditTimeLogModal(pId, lId);
        });
      });

      logsList.querySelectorAll('.btn-del-overview-log').forEach(btn => {
        btn.addEventListener('click', () => {
          const pId = btn.getAttribute('data-proj-id');
          const lId = btn.getAttribute('data-log-id');
          if (confirm('Opravdu chceš smazat tento časový záznam? Celkový čas na projektu se automaticky přepočítá.')) {
            deleteProjectTimeLog(pId, lId);
            renderProjectsTimeOverview();
          }
        });
      });
    }
  }
}

function openEditTimeLogModal(projId, logId) {
  const modal = document.getElementById('modal-edit-time-log');
  const proj = state.projects.find(p => p.id === projId);
  if (!modal || !proj || !proj.timeLogs) return;

  const log = proj.timeLogs.find(l => l.id === logId);
  if (!log) return;

  document.getElementById('edit-time-proj-id').value = projId;
  document.getElementById('edit-time-log-id').value = logId;
  document.getElementById('edit-time-minutes').value = log.minutes || 0;
  document.getElementById('edit-time-date').value = log.date || getTodayStr();
  document.getElementById('edit-time-note').value = log.note || '';

  modal.showModal();
  markModalInitialState(modal);
}

function renderProjectNotesTimeLogs(projId) {
  const container = document.getElementById('project-notes-time-list');
  const proj = state.projects.find(p => p.id === projId);
  if (!container || !proj) return;

  const logs = Array.isArray(proj.timeLogs) ? [...proj.timeLogs] : [];
  if (logs.length === 0) {
    container.innerHTML = '<p class="text-xs text-muted" style="text-align: center; padding: 12px;">Zatím žádné záznamy odpracovaného času.</p>';
    return;
  }

  const reversed = [...logs].reverse();
  container.innerHTML = reversed.map(log => {
    const isDeduct = (log.minutes || 0) < 0;
    const sign = isDeduct ? '-' : '+';
    const formatted = formatTimeMinutes(Math.abs(log.minutes || 0));

    return `
      <div class="project-time-log-item" data-id="${log.id}">
        <div>
          <span class="time-badge ${isDeduct ? 'deduct' : 'add'}" style="font-size: 11px; padding: 2px 6px;">${sign}${formatted}</span>
          <span style="font-weight: 600; margin-left: 6px;">${escapeHtml(log.note || 'Práce na projektu')}</span>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <span class="text-xs text-dim">🗓️ ${log.date}</span>
          <button type="button" class="btn-edit-time-log" data-proj-id="${proj.id}" data-log-id="${log.id}" style="background:none;border:none;color:var(--text-dim);cursor:pointer;" title="Upravit záznam">✏️</button>
          <button type="button" class="btn-del-time-log" data-proj-id="${proj.id}" data-log-id="${log.id}" style="background:none;border:none;color:var(--text-dim);cursor:pointer;" title="Smazat záznam">&times;</button>
        </div>
      </div>
    `;
  }).join('');

  container.querySelectorAll('.btn-edit-time-log').forEach(btn => {
    btn.addEventListener('click', () => {
      const pId = btn.getAttribute('data-proj-id');
      const lId = btn.getAttribute('data-log-id');
      openEditTimeLogModal(pId, lId);
    });
  });

  container.querySelectorAll('.btn-del-time-log').forEach(btn => {
    btn.addEventListener('click', () => {
      const pId = btn.getAttribute('data-proj-id');
      const lId = btn.getAttribute('data-log-id');
      if (confirm('Opravdu chceš smazat tento časový záznam?')) {
        deleteProjectTimeLog(pId, lId);
      }
    });
  });
}

function deleteProjectTimeLog(projId, logId) {
  const proj = state.projects.find(p => p.id === projId);
  if (!proj || !proj.timeLogs) return;

  const log = proj.timeLogs.find(l => l.id === logId);
  if (log) {
    proj.totalTimeMinutes = Math.max(0, (proj.totalTimeMinutes || 0) - (log.minutes || 0));
  }
  proj.timeLogs = proj.timeLogs.filter(l => l.id !== logId);
  saveState();
  renderProjects();
  if (currentNotesProjectId === projId) renderProjectNotesTimeLogs(projId);
  const overviewModal = document.getElementById('modal-projects-time-overview');
  if (overviewModal && overviewModal.open) {
    renderProjectsTimeOverview();
  }
  showToast('Záznam času smazán');
}

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

  // Only update Kanban columns when Kanban view is active
  if (typeof currentProjectViewMode !== 'undefined' && currentProjectViewMode === 'kanban') {
    renderProjectsKanban(searchTerm);
  }

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
    const isActiveTimer = activeProjectTimer && activeProjectTimer.projectId === proj.id;

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

        <!-- Project Time Tracker Bar -->
        <div class="project-timetracker-bar">
          <div class="project-time-display btn-open-proj-time-overview" data-project-id="${proj.id}" title="Klikni pro přehled odpracovaného času" style="cursor: pointer;">
            <span class="project-time-label">⏱️ Odpracováno:</span>
            <span class="project-time-value" id="project-time-val-${proj.id}">${formatTimeMinutes(proj.totalTimeMinutes || 0)}</span>
          </div>
          <div class="project-timer-actions">
            <button type="button" class="btn btn-xs btn-secondary btn-open-proj-time-overview" data-project-id="${proj.id}" title="Otevřít přehled a historii času projektu">📊 Přehled</button>
            <button type="button" class="project-timer-btn ${isActiveTimer ? 'running' : ''}" data-project-id="${proj.id}" title="${isActiveTimer ? 'Zastavit stopky a uložit čas' : 'Spustit měření času'}">
              ${isActiveTimer ? '<span class="project-timer-pulse-dot"></span> ⏹️ Stop (<span class="project-live-timer-val">00:00</span>)' : '▶️ Měřit čas'}
            </button>
            <button type="button" class="btn btn-xs btn-outline btn-manual-time" data-project-id="${proj.id}" title="Zadat nebo odebrat čas ručně">+/- Čas</button>
          </div>
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

  grid.querySelectorAll('.btn-open-proj-time-overview').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const projId = btn.getAttribute('data-project-id');
      openProjectsTimeOverview(projId);
    });
  });

  grid.querySelectorAll('.project-timer-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projId = btn.getAttribute('data-project-id');
      toggleProjectTimer(projId);
    });
  });

  grid.querySelectorAll('.btn-manual-time').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projId = btn.getAttribute('data-project-id');
      openManualTimeModal(projId);
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

    const isActiveTimer = activeProjectTimer && activeProjectTimer.projectId === proj.id;

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

        <div class="project-timetracker-bar" style="margin-top: 8px; padding: 6px 10px;">
          <div class="project-time-display btn-open-proj-time-overview" data-project-id="${proj.id}" title="Klikni pro přehled času" style="cursor: pointer;">
            <span class="project-time-label">⏱️</span>
            <span class="project-time-value" style="font-size: 12px;">${formatTimeMinutes(proj.totalTimeMinutes || 0)}</span>
          </div>
          <div class="project-timer-actions">
            <button type="button" class="btn btn-xs btn-secondary btn-open-proj-time-overview" data-project-id="${proj.id}" style="padding: 3px 6px; font-size: 11px;" title="Přehled času">📊</button>
            <button type="button" class="project-timer-btn ${isActiveTimer ? 'running' : ''}" data-project-id="${proj.id}" style="padding: 3px 8px; font-size: 11px;">
              ${isActiveTimer ? '<span class="project-timer-pulse-dot"></span> ⏹️ (<span class="project-live-timer-val">00:00</span>)' : '▶️ Měřit'}
            </button>
            <button type="button" class="btn btn-xs btn-outline btn-manual-time" data-project-id="${proj.id}" style="padding: 3px 6px; font-size: 11px;" title="Zadat nebo odebrat čas ručně">+/-</button>
          </div>
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

    board.querySelectorAll('.btn-open-proj-time-overview').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const projId = btn.getAttribute('data-project-id');
        openProjectsTimeOverview(projId);
      });
    });

    board.querySelectorAll('.btn-manual-time').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const projId = btn.getAttribute('data-project-id');
        openManualTimeModal(projId);
      });
    });

    board.querySelectorAll('.project-timer-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const projId = btn.getAttribute('data-project-id');
        toggleProjectTimer(projId);
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
  renderProjectNotesTimeLogs(projId);
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
  if (document.hidden) return;
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
  if (!activeWorkout) return;

  const existingLog = state.gym.logs.find(l => l.id === activeWorkout.id);
  const hasExercises = (activeWorkout.exercises && activeWorkout.exercises.some(ex => ex.sets && ex.sets.some(s => s.weight !== '' || s.reps !== ''))) ||
                       (existingLog && existingLog.exercises && existingLog.exercises.trim().length > 0);

  if (hasExercises) {
    const keep = confirm('V tomto tréninku máš zaznamenané série.\n\nKlikni "OK" pro UKONČENÍ A ULOŽENÍ do historie tréninků.\nKlikni "Storno" pro zrušení a úplné smazání záznamu.');
    if (keep) {
      finishActiveWorkout(false);
      return;
    }
    if (!confirm('Opravdu chceš trénink smazat bez uložení? Tento krok nelze vrátit.')) {
      return;
    }
  } else {
    if (!confirm('Opravdu chceš běžící trénink zrušit?')) return;
  }

  if (activeWorkout.id) {
    markAsDeleted(activeWorkout.id);
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
    const isTextMode = document.getElementById('btn-mode-text')?.classList.contains('active');
    const freeformTextarea = document.getElementById('workout-freeform-text');
    const notes = document.getElementById('workout-notes')?.value.trim();

    if (isTextMode && freeformTextarea && freeformTextarea.value.trim()) {
      compiledExercises = freeformTextarea.value.trim();
      if (notes && !compiledExercises.includes(notes)) {
        compiledExercises += `\nPoznámka: ${notes}`;
      }
    } else {
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
      if (exercisesArr.length > 0) {
        compiledExercises = exercisesArr.join('\n');
        if (notes) compiledExercises += `\nPoznámka: ${notes}`;
      } else if (freeformTextarea && freeformTextarea.value.trim()) {
        compiledExercises = freeformTextarea.value.trim();
      } else {
        compiledExercises = notes;
      }
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

  const activeProfile = state.gym.activeProfile || 'classic';
  const btnClassic = document.getElementById('btn-profile-classic');
  const btnPlasma = document.getElementById('btn-profile-plasma');
  if (btnClassic) btnClassic.classList.toggle('active', activeProfile === 'classic');
  if (btnPlasma) btnPlasma.classList.toggle('active', activeProfile === 'plasma');

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
// 5. QUICK LINKS RENDERING
// ==========================================================================
let currentQuickLinkCategory = 'all';

function isAppProtocol(url) {
  if (!url) return false;
  return /^[a-zA-Z0-9\-\+\.]+:/i.test(url) && !/^https?:\/\//i.test(url);
}

function launchAppOrUrl(url, title = 'Aplikace') {
  if (!url) return;
  if (isAppProtocol(url)) {
    try {
      const a = document.createElement('a');
      a.href = url;
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      setTimeout(() => a.remove(), 100);
      showToast(`🚀 Spouštím aplikaci „${title}“...`);
    } catch (e) {
      window.location.assign(url);
    }
  } else {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}

function addDefaultAppsToQuickLinks() {
  const defaultApps = [
    { id: 'ql_app_' + Date.now() + '_1', title: 'VS Code', url: 'vscode://', category: 'Aplikace', desc: 'Editor kódu Visual Studio Code', icon: '💻' },
    { id: 'ql_app_' + Date.now() + '_2', title: 'Spotify', url: 'spotify:', category: 'Aplikace', desc: 'Hudební přehrávač Spotify', icon: '🎧' },
    { id: 'ql_app_' + Date.now() + '_3', title: 'Discord', url: 'discord://', category: 'Aplikace', desc: 'Komunikační server a chat Discord', icon: '💬' }
  ];
  let added = 0;
  defaultApps.forEach(app => {
    if (!state.quickLinks.some(q => q.title.toLowerCase() === app.title.toLowerCase() || q.url === app.url)) {
      state.quickLinks.push(app);
      added++;
    }
  });
  saveState();
  renderQuickLinks();
  showToast(added > 0 ? `🚀 Přidáno ${added} doporučených aplikací!` : 'Doporučené aplikace již v seznamu máš.');
}

function renderQuickLinks() {
  const grid = document.getElementById('quicklinks-grid');
  const searchInput = document.getElementById('quicklinks-search-input');
  const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';

  if (!Array.isArray(state.quickLinks)) {
    state.quickLinks = JSON.parse(JSON.stringify(DEFAULT_DATA.quickLinks));
  }

  // Update category counts
  const allLinks = state.quickLinks;
  const countAll = document.getElementById('count-ql-all');
  const countApp = document.getElementById('count-ql-app');
  const countSchool = document.getElementById('count-ql-school');
  const countDev = document.getElementById('count-ql-dev');
  const countAi = document.getElementById('count-ql-ai');
  const countPersonal = document.getElementById('count-ql-personal');

  if (countAll) countAll.textContent = allLinks.length;
  if (countApp) countApp.textContent = allLinks.filter(l => l.category === 'Aplikace' || isAppProtocol(l.url)).length;
  if (countSchool) countSchool.textContent = allLinks.filter(l => l.category === 'Škola').length;
  if (countDev) countDev.textContent = allLinks.filter(l => l.category === 'Projekty & Dev').length;
  if (countAi) countAi.textContent = allLinks.filter(l => l.category === 'AI & Nástroje').length;
  if (countPersonal) countPersonal.textContent = allLinks.filter(l => l.category === 'Osobní').length;

  if (!grid) return;

  let filtered = allLinks;
  if (currentQuickLinkCategory === 'Aplikace') {
    filtered = filtered.filter(l => l.category === 'Aplikace' || isAppProtocol(l.url));
  } else if (currentQuickLinkCategory !== 'all') {
    filtered = filtered.filter(l => l.category === currentQuickLinkCategory);
  }

  if (searchTerm) {
    filtered = filtered.filter(l =>
      (l.title && l.title.toLowerCase().includes(searchTerm)) ||
      (l.desc && l.desc.toLowerCase().includes(searchTerm)) ||
      (l.category && l.category.toLowerCase().includes(searchTerm)) ||
      (l.url && l.url.toLowerCase().includes(searchTerm))
    );
  }

  if (filtered.length === 0) {
    if (currentQuickLinkCategory === 'Aplikace') {
      grid.innerHTML = `
        <div class="card" style="grid-column: 1/-1; text-align: center; padding: 40px;">
          <p class="text-muted" style="margin-bottom: 14px;">Zatím nemáš přidané žádné desktopové aplikace.</p>
          <div style="display: flex; justify-content: center; gap: 10px; flex-wrap: wrap;">
            <button type="button" class="btn btn-primary btn-sm" id="btn-quick-add-apps">⚡ Přidat doporučené aplikace (VS Code, Spotify, Discord)</button>
            <button type="button" class="btn btn-secondary btn-sm" id="btn-empty-add-custom-app">+ Přidat vlastní aplikaci</button>
          </div>
        </div>
      `;
      const btnAddApps = grid.querySelector('#btn-quick-add-apps');
      if (btnAddApps) btnAddApps.addEventListener('click', addDefaultAppsToQuickLinks);
      const btnAddCust = grid.querySelector('#btn-empty-add-custom-app');
      if (btnAddCust) btnAddCust.addEventListener('click', () => openQuickLinkModal(null, 'app'));
    } else {
      grid.innerHTML = '<div class="card" style="grid-column: 1/-1; text-align: center; padding: 40px;"><p class="text-muted">Žádné rychlé odkazy neodpovídají filtru.</p></div>';
    }
    return;
  }

  grid.innerHTML = filtered.map(item => {
    const isProtocol = isAppProtocol(item.url);
    const isApp = item.category === 'Aplikace' || isProtocol;

    let domain = '';
    if (!isProtocol) {
      try {
        domain = new URL(item.url).hostname;
      } catch (e) {
        domain = item.url || '';
      }
    }
    const faviconUrl = !isProtocol ? `https://www.google.com/s2/favicons?domain=${domain}&sz=64` : '';
    const fallbackEmoji = item.icon || (isApp ? '🚀' : item.category === 'Škola' ? '🎓' : item.category === 'Projekty & Dev' ? '💻' : item.category === 'AI & Nástroje' ? '🤖' : '🌐');

    const iconHtml = isProtocol
      ? `<div class="quicklink-favicon-wrap quicklink-app-icon" title="Desktopová aplikace">${escapeHtml(fallbackEmoji)}</div>`
      : `<div class="quicklink-favicon-wrap">
           <img src="${faviconUrl}" alt="${escapeHtml(item.title)}" class="quicklink-favicon" onerror="this.onerror=null; this.replaceWith('${fallbackEmoji}')">
         </div>`;

    const subText = isProtocol ? `⚡ Protokol: ${escapeHtml(item.url)}` : `🌐 ${escapeHtml(domain)}`;

    const openBtnHtml = isProtocol
      ? `<button type="button" class="quicklink-open-btn btn-launch-app" data-url="${escapeHtml(item.url)}" data-title="${escapeHtml(item.title)}" title="Spustit aplikaci v systému">
           <span>Spustit</span>
           <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
         </button>`
      : `<a href="${escapeHtml(item.url)}" target="_blank" rel="noopener" class="quicklink-open-btn" title="Otevřít odkaz v novém okně">
           <span>Otevřít</span>
           <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
         </a>`;

    return `
      <div class="quicklink-card ${isApp ? 'is-app' : ''}" data-id="${item.id}">
        <div class="quicklink-header">
          ${iconHtml}
          <div class="quicklink-info">
            <div class="quicklink-title-row">
              <span class="quicklink-title" title="${escapeHtml(item.title)}">${escapeHtml(item.title)}</span>
              <span class="quicklink-badge ${isApp ? 'badge-app' : ''}">${escapeHtml(isApp ? '🚀 Aplikace' : (item.category || 'Odkaz'))}</span>
            </div>
            ${item.desc ? `<p class="quicklink-desc">${escapeHtml(item.desc)}</p>` : ''}
            <div class="quicklink-url-text">${subText}</div>
          </div>
        </div>
        <div class="quicklink-footer">
          ${openBtnHtml}
          <div class="quicklink-actions">
            <button type="button" class="btn btn-xs btn-secondary btn-edit-quicklink" data-id="${item.id}" title="Upravit">✏️</button>
            <button type="button" class="btn btn-xs btn-danger btn-del-quicklink" data-id="${item.id}" title="Smazat">&times;</button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  grid.querySelectorAll('.btn-launch-app').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const u = btn.getAttribute('data-url');
      const t = btn.getAttribute('data-title');
      launchAppOrUrl(u, t);
    });
  });

  grid.querySelectorAll('.btn-edit-quicklink').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      openQuickLinkModal(id);
    });
  });

  grid.querySelectorAll('.btn-del-quicklink').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      deleteQuickLink(id);
    });
  });
}

function setQuickLinkModalType(targetType) {
  const typeInput = document.getElementById('quicklink-type');
  const btnTypeWeb = document.getElementById('btn-ql-type-web');
  const btnTypeApp = document.getElementById('btn-ql-type-app');
  const presetsGroup = document.getElementById('quicklink-app-presets-group');
  const urlInput = document.getElementById('quicklink-url');
  const catSelect = document.getElementById('quicklink-category');
  const hintEl = document.getElementById('quicklink-url-hint');

  if (typeInput) typeInput.value = targetType;
  if (btnTypeWeb) btnTypeWeb.classList.toggle('active', targetType === 'web');
  if (btnTypeApp) btnTypeApp.classList.toggle('active', targetType === 'app');
  if (presetsGroup) presetsGroup.style.display = targetType === 'app' ? 'block' : 'none';

  if (targetType === 'app') {
    if (catSelect) catSelect.value = 'Aplikace';
    if (urlInput) urlInput.placeholder = 'vscode://, spotify:, discord://, obsidian://, calculator:...';
    if (hintEl) hintEl.textContent = 'Pro aplikace zadej URI protokol systému (např. vscode://, spotify:, discord://, tg://, obsidian://, calculator:).';
  } else {
    if (catSelect && catSelect.value === 'Aplikace') catSelect.value = 'Škola';
    if (urlInput) urlInput.placeholder = 'https://...';
    if (hintEl) hintEl.textContent = 'Pro webové stránky zadej klasické URL (https://...).';
  }
}

function openQuickLinkModal(id = null, defaultType = null) {
  const modal = document.getElementById('modal-quicklink');
  const form = document.getElementById('form-quicklink');
  const titleEl = document.getElementById('modal-quicklink-title');
  const catSelect = document.getElementById('quicklink-category');
  if (!modal || !form) return;

  form.reset();

  if (id) {
    const item = state.quickLinks.find(q => q.id === id);
    if (!item) return;
    titleEl.textContent = 'Upravit odkaz / aplikaci';
    document.getElementById('quicklink-id').value = item.id;
    document.getElementById('quicklink-title').value = item.title;
    document.getElementById('quicklink-url').value = item.url;
    document.getElementById('quicklink-category').value = item.category || 'Škola';
    document.getElementById('quicklink-icon').value = item.icon || '';
    document.getElementById('quicklink-desc').value = item.desc || '';

    const isApp = item.category === 'Aplikace' || isAppProtocol(item.url);
    setQuickLinkModalType(isApp ? 'app' : 'web');
  } else {
    titleEl.textContent = 'Přidat rychlý odkaz nebo aplikaci';
    document.getElementById('quicklink-id').value = '';
    const initialType = defaultType || (currentQuickLinkCategory === 'Aplikace' ? 'app' : 'web');
    setQuickLinkModalType(initialType);
    if (catSelect) {
      catSelect.value = currentQuickLinkCategory !== 'all' ? currentQuickLinkCategory : (initialType === 'app' ? 'Aplikace' : 'Škola');
    }
  }

  modal.showModal();
  markModalInitialState(modal);
}

function deleteQuickLink(id) {
  if (!confirm('Opravdu chceš smazat tento odkaz či aplikaci?')) return;
  markAsDeleted(id);
  state.quickLinks = state.quickLinks.filter(q => q.id !== id);
  saveState();
  renderQuickLinks();
  showToast('Položka smazána');
}

// ==========================================================================
// 6. FINANCE & BUDGET RENDERING
// ==========================================================================
let currentFinanceFilter = 'all';

function renderFinance() {
  if (!state.finance) {
    state.finance = JSON.parse(JSON.stringify(DEFAULT_DATA.finance));
  }
  if (!Array.isArray(state.finance.recurring)) state.finance.recurring = [];
  if (!Array.isArray(state.finance.transactions)) state.finance.transactions = [];

  const now = new Date();
  const currentMonthStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

  // Filter transactions for current month
  const monthTransactions = state.finance.transactions.filter(t => t.date && t.date.startsWith(currentMonthStr));

  // Compute income & expense
  const totalIncome = monthTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + (parseFloat(t.amount) || 0), 0);

  const totalExpense = monthTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + (parseFloat(t.amount) || 0), 0);

  const netBalance = totalIncome - totalExpense;

  const totalIncomeEl = document.getElementById('finance-total-income');
  const totalExpenseEl = document.getElementById('finance-total-expense');
  const netBalanceEl = document.getElementById('finance-net-balance');

  if (totalIncomeEl) totalIncomeEl.textContent = `+${Math.round(totalIncome).toLocaleString('cs-CZ')} Kč`;
  if (totalExpenseEl) totalExpenseEl.textContent = `-${Math.round(totalExpense).toLocaleString('cs-CZ')} Kč`;
  if (netBalanceEl) {
    const sign = netBalance > 0 ? '+' : '';
    netBalanceEl.textContent = `${sign}${Math.round(netBalance).toLocaleString('cs-CZ')} Kč`;
    netBalanceEl.className = `finance-kpi-val ${netBalance >= 0 ? 'text-green' : 'text-rose'}`;
  }

  renderFinanceRecurring();
  renderFinanceCategoriesBreakdown(monthTransactions, totalExpense);
  renderFinanceTransactions();
}

function renderFinanceRecurring() {
  const container = document.getElementById('finance-recurring-list');
  if (!container) return;

  const items = state.finance.recurring || [];
  if (items.length === 0) {
    container.innerHTML = '<p class="text-xs text-muted" style="text-align: center; padding: 16px;">Žádné fixní platby. Přidej např. Nájem, Lítačku nebo Fitko výše.</p>';
    return;
  }

  container.innerHTML = items.map(item => `
    <div class="finance-recurring-item ${item.paid ? 'paid' : ''}" data-id="${item.id}">
      <div class="finance-recurring-left">
        <input type="checkbox" class="finance-recurring-check" data-id="${item.id}" ${item.paid ? 'checked' : ''} title="Označit jako zaplaceno v tomto měsíci">
        <div>
          <div class="finance-recurring-name" style="${item.paid ? 'text-decoration: line-through; opacity: 0.8;' : ''}">${escapeHtml(item.name)}</div>
          <div class="finance-recurring-meta">${escapeHtml(item.category || 'Fixní')} ${item.dueDay ? `• splatnost ${item.dueDay}. v měsíci` : ''}</div>
        </div>
      </div>
      <div style="display: flex; align-items: center; gap: 10px;">
        <span class="finance-recurring-amount">${(item.amount || 0).toLocaleString('cs-CZ')} Kč</span>
        <button type="button" class="btn-del-recurring" data-id="${item.id}" style="background:none;border:none;color:var(--text-dim);cursor:pointer;" title="Smazat fixní platbu">&times;</button>
      </div>
    </div>
  `).join('');

  container.querySelectorAll('.finance-recurring-check').forEach(cb => {
    cb.addEventListener('change', () => {
      const id = cb.getAttribute('data-id');
      const item = state.finance.recurring.find(r => r.id === id);
      if (item) {
        item.paid = cb.checked;
        saveState();
        renderFinance();
        showToast(item.paid ? `Platba „${item.name}“ označena jako zaplacená ✓` : `Platba „${item.name}“ vrácena`);
      }
    });
  });

  container.querySelectorAll('.btn-del-recurring').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      if (!confirm('Opravdu smazat tuto pravidelnou platbu?')) return;
      markAsDeleted(id);
      state.finance.recurring = state.finance.recurring.filter(r => r.id !== id);
      saveState();
      renderFinance();
      showToast('Pravidelná platba smazána');
    });
  });
}

function renderFinanceCategoriesBreakdown(monthTransactions, totalExpense) {
  const container = document.getElementById('finance-categories-breakdown');
  if (!container) return;

  const expenses = monthTransactions.filter(t => t.type === 'expense');
  if (expenses.length === 0 || totalExpense <= 0) {
    container.innerHTML = '<p class="text-xs text-muted" style="text-align: center; padding: 16px;">Zatím žádné výdaje v tomto měsíci.</p>';
    return;
  }

  // Sum by category
  const byCategory = {};
  expenses.forEach(t => {
    const cat = t.category || 'Jiné';
    byCategory[cat] = (byCategory[cat] || 0) + (parseFloat(t.amount) || 0);
  });

  const sortedCategories = Object.entries(byCategory).sort((a, b) => b[1] - a[1]);

  container.innerHTML = sortedCategories.map(([cat, amt]) => {
    const pct = Math.round((amt / totalExpense) * 100);
    return `
      <div class="finance-cat-row">
        <div class="finance-cat-header">
          <span>${escapeHtml(cat)}</span>
          <span><strong>${Math.round(amt).toLocaleString('cs-CZ')} Kč</strong> <span class="text-dim">(${pct}%)</span></span>
        </div>
        <div class="finance-cat-track">
          <div class="finance-cat-fill" style="width: ${pct}%"></div>
        </div>
      </div>
    `;
  }).join('');
}

function renderFinanceTransactions() {
  const container = document.getElementById('finance-transactions-list');
  if (!container) return;

  let list = [...(state.finance.transactions || [])];

  if (currentFinanceFilter === 'expense') {
    list = list.filter(t => t.type === 'expense');
  } else if (currentFinanceFilter === 'income') {
    list = list.filter(t => t.type === 'income');
  }

  // Sort date descending
  list.sort((a, b) => new Date(b.date) - new Date(a.date));

  if (list.length === 0) {
    container.innerHTML = '<p class="text-xs text-muted" style="text-align: center; padding: 24px;">Žádné pohyby neodpovídají filtru.</p>';
    return;
  }

  container.innerHTML = list.map(item => {
    const isIncome = item.type === 'income';
    const sign = isIncome ? '+' : '-';
    const icon = isIncome ? '💰' : '💸';

    return `
      <div class="finance-tx-row" data-id="${item.id}">
        <div class="finance-tx-left">
          <div class="finance-tx-icon-wrap">${icon}</div>
          <div>
            <div class="finance-tx-title">${escapeHtml(item.title)}</div>
            <div class="finance-tx-sub">
              <span>${escapeHtml(item.category || 'Pohyb')}</span>
              <span>•</span>
              <span>🗓️ ${item.date}</span>
              ${item.note ? `<span>• <em>${escapeHtml(item.note)}</em></span>` : ''}
            </div>
          </div>
        </div>
        <div class="finance-tx-right">
          <span class="finance-tx-amount ${isIncome ? 'income' : 'expense'}">${sign}${Math.round(item.amount).toLocaleString('cs-CZ')} Kč</span>
          <button type="button" class="btn-del-finance-tx" data-id="${item.id}" style="background:none;border:none;color:var(--text-dim);cursor:pointer;font-size:16px;" title="Smazat záznam">&times;</button>
        </div>
      </div>
    `;
  }).join('');

  container.querySelectorAll('.btn-del-finance-tx').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      if (!confirm('Opravdu smazat tento finanční záznam?')) return;
      markAsDeleted(id);
      state.finance.transactions = state.finance.transactions.filter(t => t.id !== id);
      saveState();
      renderFinance();
      showToast('Záznam smazán');
    });
  });
}

function openFinanceTxModal(type = 'expense') {
  const modal = document.getElementById('modal-finance-tx');
  const form = document.getElementById('form-finance-tx');
  const titleEl = document.getElementById('modal-finance-tx-title');
  const typeSelect = document.getElementById('finance-tx-type');
  const dateInput = document.getElementById('finance-tx-date');
  if (!modal || !form) return;

  form.reset();
  if (titleEl) titleEl.textContent = type === 'income' ? 'Zapsat příjem' : 'Zapsat výdaj';
  if (typeSelect) typeSelect.value = type;
  if (dateInput) dateInput.value = getTodayStr();

  modal.showModal();
  markModalInitialState(modal);
}

function openFinanceRecurringModal() {
  const modal = document.getElementById('modal-finance-recurring');
  const form = document.getElementById('form-finance-recurring');
  if (!modal || !form) return;

  form.reset();
  modal.showModal();
  markModalInitialState(modal);
}

// ==========================================================================
// 7. SETTINGS & HABITS RENDERING
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
  const typeSelect = document.getElementById('workout-type');
  if (!modal || !form) return;

  const validForcedSplit = (typeof forcedSplit === 'string' && forcedSplit) ? forcedSplit : null;
  const validForcedDuration = (typeof forcedDuration === 'number' || (typeof forcedDuration === 'string' && forcedDuration)) ? forcedDuration : null;

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
    if (durationInput) durationInput.value = validForcedDuration || elapsedMinutes;

    const ratingSelect = document.getElementById('workout-rating');
    if (ratingSelect) ratingSelect.value = String(activeWorkout.rating || 4);

    const notesField = document.getElementById('workout-notes');
    if (notesField) notesField.value = activeWorkout.notes || '';

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
    if (durationInput) durationInput.value = validForcedDuration || '60';

    const ratingSelect = document.getElementById('workout-rating');
    if (ratingSelect) ratingSelect.value = '4';

    const notesField = document.getElementById('workout-notes');
    if (notesField) notesField.value = '';

    if (typeSelect) {
      const targetFocus = validForcedSplit || getTodaySplitFocus() || 'Upper A';
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

  // Update mode switcher based on saved preference
  const savedMode = localStorage.getItem('lifeos_workout_mode') || 'structured';
  const btnStructured = document.getElementById('btn-mode-structured');
  const btnText = document.getElementById('btn-mode-text');
  const panelStructured = document.getElementById('workout-structured-panel');
  const panelText = document.getElementById('workout-text-panel');
  const freeformTextarea = document.getElementById('workout-freeform-text');

  if (savedMode === 'text') {
    if (btnText) btnText.classList.add('active');
    if (btnStructured) btnStructured.classList.remove('active');
    if (panelText) panelText.classList.remove('hidden');
    if (panelStructured) panelStructured.classList.add('hidden');
  } else {
    if (btnStructured) btnStructured.classList.add('active');
    if (btnText) btnText.classList.remove('active');
    if (panelStructured) panelStructured.classList.remove('hidden');
    if (panelText) panelText.classList.add('hidden');
  }

  const currentSplit = (typeSelect && typeSelect.value) ? typeSelect.value : (activeWorkout ? activeWorkout.split : 'Upper A');
  const btnLoadEntire = document.getElementById('btn-load-entire-split');
  if (btnLoadEntire) {
    btnLoadEntire.textContent = `⚡ Načíst šablonu (${currentSplit})`;
  }

  if (freeformTextarea) {
    if (activeWorkout) {
      freeformTextarea.value = compileWorkoutFromBuilder();
    } else {
      freeformTextarea.value = '';
    }
  }

  modal.showModal();
  markModalInitialState(modal);
}

function compileWorkoutFromBuilder() {
  if (!currentWorkoutExercises || currentWorkoutExercises.length === 0) return '';
  return currentWorkoutExercises.map(ex => {
    const validSets = (ex.sets || []).filter(s => (s.weight !== '' && s.weight !== null && s.weight !== undefined) || (s.reps !== '' && s.reps !== null && s.reps !== undefined));
    const setsDetails = (validSets.length > 0 ? validSets : ex.sets).map(s => {
      const w = (s.weight !== '' && s.weight !== null && s.weight !== undefined) ? `${s.weight} kg` : '';
      const r = (s.reps !== '' && s.reps !== null && s.reps !== undefined) ? `${s.reps} reps` : '';
      if (w && r) return `${s.weight} kg × ${s.reps}`;
      return w || r || '1 série';
    }).join(', ');
    return `• ${ex.name}: ${ex.sets.length} série${setsDetails ? ` (${setsDetails})` : ''}`;
  }).join('\n');
}

function setupWorkoutLoggerModes() {
  const btnStructured = document.getElementById('btn-mode-structured');
  const btnText = document.getElementById('btn-mode-text');
  const panelStructured = document.getElementById('workout-structured-panel');
  const panelText = document.getElementById('workout-text-panel');
  const btnInsertTemplate = document.getElementById('btn-insert-template-text');
  const freeformTextarea = document.getElementById('workout-freeform-text');

  if (!btnStructured || !btnText || !panelStructured || !panelText) return;

  function switchMode(mode) {
    if (mode === 'text') {
      btnText.classList.add('active');
      btnStructured.classList.remove('active');
      panelText.classList.remove('hidden');
      panelStructured.classList.add('hidden');
      try { localStorage.setItem('lifeos_workout_mode', 'text'); } catch (e) {}

      // If text is empty and user has structured exercises, auto-fill text representation
      if (freeformTextarea && !freeformTextarea.value.trim() && currentWorkoutExercises.length > 0) {
        document.querySelectorAll('#workout-exercises-container .workout-exercise-card').forEach(card => {
          const exId = card.getAttribute('data-ex-id');
          const ex = currentWorkoutExercises.find(x => x.id === exId);
          if (!ex) return;
          card.querySelectorAll('.exercise-set-row').forEach(row => {
            const setIdx = parseInt(row.getAttribute('data-set-index'), 10);
            if (!ex.sets[setIdx]) return;
            const wIn = row.querySelector('.input-weight');
            const rIn = row.querySelector('.input-reps');
            if (wIn && wIn.value !== '') ex.sets[setIdx].weight = wIn.value;
            if (rIn && rIn.value !== '') ex.sets[setIdx].reps = rIn.value;
          });
        });
        freeformTextarea.value = compileWorkoutFromBuilder();
      }
    } else {
      btnStructured.classList.add('active');
      btnText.classList.remove('active');
      panelStructured.classList.remove('hidden');
      panelText.classList.add('hidden');
      try { localStorage.setItem('lifeos_workout_mode', 'structured'); } catch (e) {}
    }
  }

  btnStructured.addEventListener('click', () => switchMode('structured'));
  btnText.addEventListener('click', () => switchMode('text'));

  if (btnInsertTemplate && freeformTextarea) {
    btnInsertTemplate.addEventListener('click', () => {
      const typeSelect = document.getElementById('workout-type');
      const split = typeSelect ? typeSelect.value : 'Upper A';
      const exercises = (state.gym.exercisesBySplit && state.gym.exercisesBySplit[split]) || [];
      if (exercises.length === 0) {
        showToast(`Pro ${split} nejsou žádné cviky v šabloně`);
        return;
      }

      const templateLines = exercises.map(name => {
        const perf = getLastExercisePerformance(name);
        if (perf && perf.rawSetsSummary) {
          return `• ${name}: 3-4 série (${perf.rawSetsSummary})`;
        }
        return `• ${name}: 3 série ( kg × )`;
      });

      const currentVal = freeformTextarea.value.trim();
      if (currentVal) {
        freeformTextarea.value = currentVal + '\n' + templateLines.join('\n');
      } else {
        freeformTextarea.value = templateLines.join('\n');
      }
      freeformTextarea.focus();
      showToast(`📋 Vložena osnova cviků pro ${split}!`);
    });
  }
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

  // Update mode switcher based on saved preference
  const savedMode = localStorage.getItem('lifeos_workout_mode') || 'structured';
  const btnStructured = document.getElementById('btn-mode-structured');
  const btnText = document.getElementById('btn-mode-text');
  const panelStructured = document.getElementById('workout-structured-panel');
  const panelText = document.getElementById('workout-text-panel');
  const freeformTextarea = document.getElementById('workout-freeform-text');

  if (savedMode === 'text') {
    if (btnText) btnText.classList.add('active');
    if (btnStructured) btnStructured.classList.remove('active');
    if (panelText) panelText.classList.remove('hidden');
    if (panelStructured) panelStructured.classList.add('hidden');
  } else {
    if (btnStructured) btnStructured.classList.add('active');
    if (btnText) btnText.classList.remove('active');
    if (panelStructured) panelStructured.classList.remove('hidden');
    if (panelText) panelText.classList.add('hidden');
  }

  const currentSplit = typeSelect ? typeSelect.value : log.type;
  const btnLoadEntire = document.getElementById('btn-load-entire-split');
  if (btnLoadEntire) {
    btnLoadEntire.textContent = `⚡ Načíst šablonu (${currentSplit})`;
  }

  if (freeformTextarea) {
    freeformTextarea.value = log.exercises || '';
  }

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

  const freeformTextarea = document.getElementById('workout-freeform-text');
  if (freeformTextarea && (!freeformTextarea.value.trim() || document.getElementById('btn-mode-text')?.classList.contains('active'))) {
    freeformTextarea.value = compileWorkoutFromBuilder();
  }

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

function generateExerciseSetRowHtml(exId, s, idx, canDelete) {
  const safeWeight = (s.weight !== null && s.weight !== undefined) ? s.weight : '';
  const safeReps = (s.reps !== null && s.reps !== undefined) ? s.reps : '';
  return `
    <div class="exercise-set-row" data-set-index="${idx}">
      <span class="set-num-badge">#${idx + 1}</span>
      <div class="set-field-group">
        <div class="set-input-box">
          <input type="number" step="0.5" class="set-input-num input-weight" value="${escapeHtml(String(safeWeight))}" placeholder="0" inputmode="decimal" data-ex-id="${exId}" data-set-index="${idx}">
          <span class="set-unit-suffix">kg</span>
        </div>
        <button type="button" class="btn-quick-inc btn-inc-weight" data-ex-id="${exId}" data-set-index="${idx}" data-inc="2.5" title="Přidat +2.5 kg">+2.5</button>
      </div>
      <div class="set-field-group">
        <div class="set-input-box">
          <input type="number" min="1" max="999" class="set-input-num input-reps" value="${escapeHtml(String(safeReps))}" placeholder="0" inputmode="numeric" data-ex-id="${exId}" data-set-index="${idx}">
          <span class="set-unit-suffix">reps</span>
        </div>
        <button type="button" class="btn-quick-inc btn-inc-reps" data-ex-id="${exId}" data-set-index="${idx}" data-inc="1" title="Přidat +1 opakování">+1</button>
      </div>
      <div class="set-del-wrap">
        <button type="button" class="btn-del-set" data-ex-id="${exId}" data-set-index="${idx}" title="Smazat sérii" style="${canDelete ? '' : 'visibility: hidden;'}">&times;</button>
      </div>
    </div>
  `;
}

function generateExerciseCardHtml(ex) {
  const perf = getLastExercisePerformance(ex.name);
  const historyBadgeHtml = (perf && perf.rawSetsSummary)
    ? `<span class="exercise-prev-history-badge" title="Předchozí výkon z ${perf.date}">💡 Minule: <strong>${escapeHtml(perf.rawSetsSummary)}</strong></span>`
    : '';

  const canDelete = ex.sets && ex.sets.length > 1;
  const rowsHtml = (ex.sets || []).map((s, idx) => generateExerciseSetRowHtml(ex.id, s, idx, canDelete)).join('');

  return `
    <div class="workout-exercise-card" data-ex-id="${ex.id}">
      <div class="exercise-card-header">
        <div class="exercise-card-info">
          <span class="exercise-card-name">🏋️ ${escapeHtml(ex.name)}</span>
          ${historyBadgeHtml}
        </div>
        <button type="button" class="btn-remove-exercise" data-ex-id="${ex.id}" title="Odstranit cvik" aria-label="Odstranit cvik">&times;</button>
      </div>
      <div class="exercise-sets-table">
        <div class="exercise-sets-header">
          <span class="set-col-num">#</span>
          <span class="set-col-weight">Váha</span>
          <span class="set-col-reps">Reps</span>
          <span class="set-col-del"></span>
        </div>
        <div class="exercise-sets-rows-container">
          ${rowsHtml}
        </div>
      </div>
      <div class="exercise-card-footer">
        <button type="button" class="btn-add-set" data-ex-id="${ex.id}">+ Další série</button>
      </div>
    </div>
  `;
}

function addExerciseToWorkoutSession(exerciseName, initialWeight = null, initialReps = null) {
  if (!exerciseName || !exerciseName.trim()) return;
  const trimmed = exerciseName.trim();

  // If already in session, duplicate the last set for quick tapping
  const existing = currentWorkoutExercises.find(e => e.name.toLowerCase() === trimmed.toLowerCase());
  if (existing) {
    const card = document.querySelector(`.workout-exercise-card[data-ex-id="${existing.id}"]`);
    const lastSet = existing.sets[existing.sets.length - 1];
    const newIdx = existing.sets.length;
    const newSet = {
      setNum: newIdx + 1,
      weight: lastSet ? lastSet.weight : '',
      reps: lastSet ? lastSet.reps : ''
    };
    existing.sets.push(newSet);

    if (card) {
      const rowsContainer = card.querySelector('.exercise-sets-rows-container');
      if (rowsContainer) {
        rowsContainer.insertAdjacentHTML('beforeend', generateExerciseSetRowHtml(existing.id, newSet, newIdx, true));
      }
      card.querySelectorAll('.btn-del-set').forEach(b => { b.style.visibility = 'visible'; });
      card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else {
      renderWorkoutExercisesBuilder();
    }
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

    const newEx = {
      id: 'ex_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      name: trimmed,
      sets: setsToUse
    };
    currentWorkoutExercises.push(newEx);

    const container = document.getElementById('workout-exercises-container');
    if (container) {
      const emptyBox = container.querySelector('.workout-exercises-empty');
      if (emptyBox) {
        container.innerHTML = generateExerciseCardHtml(newEx);
      } else {
        container.insertAdjacentHTML('beforeend', generateExerciseCardHtml(newEx));
      }
      const newCard = container.querySelector(`.workout-exercise-card[data-ex-id="${newEx.id}"]`);
      if (newCard) newCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  const typeSelect = document.getElementById('workout-type');
  if (typeSelect) renderWorkoutQuickChips(typeSelect.value);
}

function renderWorkoutExercisesBuilder() {
  const container = document.getElementById('workout-exercises-container');
  if (!container) return;

  if (currentWorkoutExercises.length === 0) {
    container.innerHTML = `
      <div class="workout-exercises-empty">
        <p class="text-sm text-muted">Zatím nemáš vybrané žádné cviky pro tento trénink.</p>
        <p class="text-xs text-dim" style="margin-top: 4px;">Klikni na cvik ze šablony výše nebo načti celý split tlačítkem „⚡ Načíst celý split“.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = currentWorkoutExercises.map(ex => generateExerciseCardHtml(ex)).join('');
}

function setupWorkoutExercisesDelegation() {
  const container = document.getElementById('workout-exercises-container');
  if (!container || container._hasDelegation) return;
  container._hasDelegation = true;

  // Real-time input synchronization (weight & reps) - instantaneous without re-render
  container.addEventListener('input', (e) => {
    const input = e.target;
    if (!input.classList.contains('set-input-num')) return;

    const card = input.closest('.workout-exercise-card');
    const row = input.closest('.exercise-set-row');
    if (!card || !row) return;

    const exId = card.getAttribute('data-ex-id');
    const setIdx = parseInt(row.getAttribute('data-set-index'), 10);
    const ex = currentWorkoutExercises.find(x => x.id === exId);
    if (!ex || !ex.sets[setIdx]) return;

    if (input.classList.contains('input-weight')) {
      ex.sets[setIdx].weight = input.value;
    } else if (input.classList.contains('input-reps')) {
      ex.sets[setIdx].reps = input.value;
    }
  });

  // Action clicks (+2.5, +1, + Další série, Delete set, Remove exercise)
  container.addEventListener('click', (e) => {
    // Quick weight increment (+2.5 kg)
    const btnIncWeight = e.target.closest('.btn-inc-weight');
    if (btnIncWeight) {
      e.preventDefault();
      const card = btnIncWeight.closest('.workout-exercise-card');
      const row = btnIncWeight.closest('.exercise-set-row');
      if (!card || !row) return;
      const exId = card.getAttribute('data-ex-id');
      const setIdx = parseInt(row.getAttribute('data-set-index'), 10);
      const ex = currentWorkoutExercises.find(x => x.id === exId);
      if (!ex || !ex.sets[setIdx]) return;

      const inc = parseFloat(btnIncWeight.getAttribute('data-inc') || '2.5');
      const weightInput = row.querySelector('.input-weight');
      const cur = parseFloat(weightInput ? weightInput.value : ex.sets[setIdx].weight) || 0;
      const newVal = Math.round((cur + inc) * 10) / 10;
      if (weightInput) weightInput.value = newVal;
      ex.sets[setIdx].weight = newVal;
      return;
    }

    // Quick reps increment (+1 rep)
    const btnIncReps = e.target.closest('.btn-inc-reps');
    if (btnIncReps) {
      e.preventDefault();
      const card = btnIncReps.closest('.workout-exercise-card');
      const row = btnIncReps.closest('.exercise-set-row');
      if (!card || !row) return;
      const exId = card.getAttribute('data-ex-id');
      const setIdx = parseInt(row.getAttribute('data-set-index'), 10);
      const ex = currentWorkoutExercises.find(x => x.id === exId);
      if (!ex || !ex.sets[setIdx]) return;

      const inc = parseInt(btnIncReps.getAttribute('data-inc') || '1', 10);
      const repsInput = row.querySelector('.input-reps');
      const cur = parseInt(repsInput ? repsInput.value : ex.sets[setIdx].reps, 10) || 0;
      const newVal = cur + inc;
      if (repsInput) repsInput.value = newVal;
      ex.sets[setIdx].reps = newVal;
      return;
    }

    // Add new set to exercise
    const btnAddSet = e.target.closest('.btn-add-set');
    if (btnAddSet) {
      e.preventDefault();
      const card = btnAddSet.closest('.workout-exercise-card');
      if (!card) return;
      const exId = card.getAttribute('data-ex-id');
      const ex = currentWorkoutExercises.find(x => x.id === exId);
      if (!ex) return;

      // Sync the last row's DOM inputs before adding new set so user input isn't lost
      const lastRowIdx = ex.sets.length - 1;
      const lastRow = card.querySelector(`.exercise-set-row[data-set-index="${lastRowIdx}"]`);
      if (lastRow) {
        const wIn = lastRow.querySelector('.input-weight');
        const rIn = lastRow.querySelector('.input-reps');
        if (wIn && wIn.value !== '') ex.sets[lastRowIdx].weight = wIn.value;
        if (rIn && rIn.value !== '') ex.sets[lastRowIdx].reps = rIn.value;
      }

      const prevSet = ex.sets[ex.sets.length - 1];
      const newIdx = ex.sets.length;
      const newSet = {
        setNum: newIdx + 1,
        weight: prevSet ? prevSet.weight : '',
        reps: prevSet ? prevSet.reps : ''
      };
      ex.sets.push(newSet);

      const rowsContainer = card.querySelector('.exercise-sets-rows-container');
      if (rowsContainer) {
        const newRowHtml = generateExerciseSetRowHtml(ex.id, newSet, newIdx, true);
        rowsContainer.insertAdjacentHTML('beforeend', newRowHtml);
        const newRow = rowsContainer.querySelector(`.exercise-set-row[data-set-index="${newIdx}"]`);
        if (newRow) {
          const repsInput = newRow.querySelector('.input-reps');
          if (repsInput) repsInput.focus();
        }
      }

      // Unhide delete buttons since series count is now > 1
      card.querySelectorAll('.btn-del-set').forEach(b => {
        b.style.visibility = 'visible';
      });
      return;
    }

    // Delete single set
    const btnDelSet = e.target.closest('.btn-del-set');
    if (btnDelSet) {
      e.preventDefault();
      const card = btnDelSet.closest('.workout-exercise-card');
      const row = btnDelSet.closest('.exercise-set-row');
      if (!card || !row) return;
      const exId = card.getAttribute('data-ex-id');
      const ex = currentWorkoutExercises.find(x => x.id === exId);
      if (!ex) return;

      const setIdx = parseInt(row.getAttribute('data-set-index'), 10);
      ex.sets.splice(setIdx, 1);
      row.remove();

      // Re-index remaining rows in this card
      const remainingRows = card.querySelectorAll('.exercise-set-row');
      remainingRows.forEach((r, idx) => {
        r.setAttribute('data-set-index', idx);
        const badge = r.querySelector('.set-num-badge');
        if (badge) badge.textContent = `#${idx + 1}`;
        if (ex.sets[idx]) ex.sets[idx].setNum = idx + 1;
      });

      if (remainingRows.length <= 1) {
        card.querySelectorAll('.btn-del-set').forEach(b => {
          b.style.visibility = 'hidden';
        });
      }
      return;
    }

    // Remove entire exercise
    const btnRemoveEx = e.target.closest('.btn-remove-exercise');
    if (btnRemoveEx) {
      e.preventDefault();
      const card = btnRemoveEx.closest('.workout-exercise-card');
      if (!card) return;
      const exId = card.getAttribute('data-ex-id');
      card.remove();

      currentWorkoutExercises = currentWorkoutExercises.filter(x => x.id !== exId);

      const typeSelect = document.getElementById('workout-type');
      if (typeSelect) renderWorkoutQuickChips(typeSelect.value);

      if (currentWorkoutExercises.length === 0) {
        renderWorkoutExercisesBuilder();
      }
      return;
    }
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

function switchSplitProfile(profileKey) {
  if (!state.gym) state.gym = {};
  if (!state.gym.splitProfiles) {
    state.gym.splitProfiles = JSON.parse(JSON.stringify(DEFAULT_DATA.gym.splitProfiles));
  }
  const currentProfile = state.gym.activeProfile || 'classic';
  state.gym.splitProfiles[currentProfile] = JSON.parse(JSON.stringify(state.gym.split));

  state.gym.activeProfile = profileKey;
  if (!state.gym.splitProfiles[profileKey]) {
    state.gym.splitProfiles[profileKey] = JSON.parse(JSON.stringify(DEFAULT_DATA.gym.splitProfiles[profileKey] || DEFAULT_DATA.gym.splitProfiles.classic));
  }
  state.gym.split = JSON.parse(JSON.stringify(state.gym.splitProfiles[profileKey]));
  sanitizeGymSplit();
  saveState();

  const modalBtnClassic = document.getElementById('modal-btn-profile-classic');
  const modalBtnPlasma = document.getElementById('modal-btn-profile-plasma');
  if (modalBtnClassic) modalBtnClassic.classList.toggle('active', profileKey === 'classic');
  if (modalBtnPlasma) modalBtnPlasma.classList.toggle('active', profileKey === 'plasma');

  const modalSplit = document.getElementById('modal-split');
  if (modalSplit && modalSplit.open) {
    openSplitModal();
  }

  renderGym();
  renderOverview();
  showToast(`Profil splitu přepnut: ${profileKey === 'plasma' ? '🩸 Týden s plazmou' : '🏋️ Klasický týden'}`);
}

function openSplitModal(targetDay = null) {
  const modal = document.getElementById('modal-split');
  const listContainer = document.getElementById('split-edit-list');
  if (!modal || !listContainer) return;

  sanitizeGymSplit();

  const activeProfile = state.gym.activeProfile || 'classic';
  const modalBtnClassic = document.getElementById('modal-btn-profile-classic');
  const modalBtnPlasma = document.getElementById('modal-btn-profile-plasma');
  if (modalBtnClassic) modalBtnClassic.classList.toggle('active', activeProfile === 'classic');
  if (modalBtnPlasma) modalBtnPlasma.classList.toggle('active', activeProfile === 'plasma');

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
    'plasma-split': {
      1: { focus: 'Upper A', rest: false },
      2: { focus: 'Lower A', rest: false },
      3: { focus: '🩸 Darování plazmy (Klid na ruce)', rest: true },
      4: { focus: 'Lower B (Nohy / Šetřit paže)', rest: false },
      5: { focus: 'Upper B (Lehčí / Odpočaté paže)', rest: false },
      6: { focus: 'Kardio & Mobilita', rest: true },
      0: { focus: 'Odpočinek & Regenerace', rest: true }
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
  if (btnOpenWorkout) btnOpenWorkout.addEventListener('click', () => openWorkoutModal());

  const btnQuickWorkout = document.getElementById('btn-quick-workout');
  if (btnQuickWorkout) btnQuickWorkout.addEventListener('click', () => openWorkoutModal());

  // Setup non-destructive event delegation for workout exercises builder
  setupWorkoutExercisesDelegation();
  setupWorkoutLoggerModes();
  setupJournalListeners();

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
    prFilterInput.addEventListener('input', debounce((e) => {
      renderPrSelectionList(e.target.value);
    }, 120));
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
  setupModalClose('modal-quicklink', 'modal-quicklink-close', 'modal-quicklink-cancel');
  setupModalClose('modal-finance-tx', 'modal-finance-tx-close', 'modal-finance-tx-cancel');
  setupModalClose('modal-finance-recurring', 'modal-recurring-close', 'modal-recurring-cancel');
  setupModalClose('modal-manual-time', 'modal-manual-time-close', 'modal-manual-time-cancel');
  setupModalClose('modal-stop-timer', 'modal-stop-timer-close', null);
  setupModalClose('modal-projects-time-overview', 'modal-time-overview-close', 'modal-time-overview-cancel');
  setupModalClose('modal-edit-time-log', 'modal-edit-time-close', 'modal-edit-time-cancel');

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
      const btnLoadEntire = document.getElementById('btn-load-entire-split');
      if (btnLoadEntire) {
        btnLoadEntire.textContent = `⚡ Načíst šablonu (${workoutTypeSelect.value})`;
      }
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

      // Sync any active DOM inputs into memory before compiling
      document.querySelectorAll('#workout-exercises-container .workout-exercise-card').forEach(card => {
        const exId = card.getAttribute('data-ex-id');
        const ex = currentWorkoutExercises.find(x => x.id === exId);
        if (!ex) return;
        card.querySelectorAll('.exercise-set-row').forEach(row => {
          const setIdx = parseInt(row.getAttribute('data-set-index'), 10);
          if (!ex.sets[setIdx]) return;
          const wInput = row.querySelector('.input-weight');
          const rInput = row.querySelector('.input-reps');
          if (wInput && wInput.value !== '') ex.sets[setIdx].weight = wInput.value;
          if (rInput && rInput.value !== '') ex.sets[setIdx].reps = rInput.value;
        });
      });

      // Compile exercises string from builder or quick freeform text
      let compiledExercises = '';
      const isTextMode = document.getElementById('btn-mode-text')?.classList.contains('active');
      const freeformTextarea = document.getElementById('workout-freeform-text');

      if (isTextMode && freeformTextarea && freeformTextarea.value.trim()) {
        compiledExercises = freeformTextarea.value.trim();
        if (notes && !compiledExercises.includes(notes)) {
          compiledExercises += `\nPoznámka: ${notes}`;
        }
      } else {
        if (currentWorkoutExercises.length > 0) {
          compiledExercises = compileWorkoutFromBuilder();
          if (notes) {
            compiledExercises += `\nPoznámka: ${notes}`;
          }
        } else if (freeformTextarea && freeformTextarea.value.trim()) {
          compiledExercises = freeformTextarea.value.trim();
          if (notes && !compiledExercises.includes(notes)) {
            compiledExercises += `\nPoznámka: ${notes}`;
          }
        } else {
          compiledExercises = notes;
        }
      }

      const editId = document.getElementById('workout-edit-id')?.value;
      const isCurrentActiveWorkout = Boolean(activeWorkout && editId && editId === activeWorkout.id);

      if (isCurrentActiveWorkout) {
        // Save current sets into activeWorkout state & persistence
        if (!isTextMode && currentWorkoutExercises.length > 0) {
          activeWorkout.exercises = JSON.parse(JSON.stringify(currentWorkoutExercises));
        }
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
      const currentProf = state.gym.activeProfile || 'classic';
      if (!state.gym.splitProfiles) state.gym.splitProfiles = {};
      state.gym.splitProfiles[currentProf] = JSON.parse(JSON.stringify(state.gym.split));
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
  if (projSearch) projSearch.addEventListener('input', debounce(renderProjects, 120));

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
  if (schoolSearch) schoolSearch.addEventListener('input', debounce(renderSchool, 120));

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

  // --- Gym Split Profiles Switchers ---
  const btnProfClassic = document.getElementById('btn-profile-classic');
  const btnProfPlasma = document.getElementById('btn-profile-plasma');
  if (btnProfClassic) btnProfClassic.addEventListener('click', () => switchSplitProfile('classic'));
  if (btnProfPlasma) btnProfPlasma.addEventListener('click', () => switchSplitProfile('plasma'));

  const modalProfClassic = document.getElementById('modal-btn-profile-classic');
  const modalProfPlasma = document.getElementById('modal-btn-profile-plasma');
  if (modalProfClassic) modalProfClassic.addEventListener('click', () => switchSplitProfile('classic'));
  if (modalProfPlasma) modalProfPlasma.addEventListener('click', () => switchSplitProfile('plasma'));

  // --- Project Time Tracking ---
  const btnNotesAddTime = document.getElementById('btn-notes-add-time');
  if (btnNotesAddTime) {
    btnNotesAddTime.addEventListener('click', () => {
      const projId = document.getElementById('project-note-proj-id')?.value || currentNotesProjectId;
      openManualTimeModal(projId);
    });
  }

  // --- Time Tracking & Logs ---
  const timeProjSelect = document.getElementById('time-proj-select');
  if (timeProjSelect) {
    timeProjSelect.addEventListener('change', (e) => {
      const idInput = document.getElementById('time-proj-id');
      if (idInput) idInput.value = e.target.value;
    });
  }

  const btnTimeAdd = document.getElementById('btn-time-mode-add');
  const btnTimeDeduct = document.getElementById('btn-time-mode-deduct');
  if (btnTimeAdd) btnTimeAdd.addEventListener('click', () => setManualTimeMode('add'));
  if (btnTimeDeduct) btnTimeDeduct.addEventListener('click', () => setManualTimeMode('deduct'));

  document.querySelectorAll('#manual-time-chips .time-sug-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const text = chip.getAttribute('data-text');
      const actInput = document.getElementById('time-activity');
      if (actInput && text) {
        actInput.value = text;
        actInput.focus();
      }
    });
  });

  const formManualTime = document.getElementById('form-manual-time');
  if (formManualTime) {
    formManualTime.addEventListener('submit', (e) => {
      e.preventDefault();
      const projId = document.getElementById('time-proj-id')?.value || document.getElementById('time-proj-select')?.value;
      const hours = parseInt(document.getElementById('time-hours')?.value || '0', 10);
      const mins = parseInt(document.getElementById('time-minutes')?.value || '0', 10);
      const date = document.getElementById('time-date')?.value || getTodayStr();
      const note = document.getElementById('time-activity')?.value.trim() || 'Práce na projektu';
      const mode = document.getElementById('time-action-mode')?.value || 'add';

      const totalMins = (hours * 60) + mins;
      if (totalMins <= 0) {
        showToast('Zadej prosím platný čas větší než 0 minut.');
        return;
      }

      const effectiveMins = mode === 'deduct' ? -totalMins : totalMins;

      const proj = state.projects.find(p => p.id === projId);
      if (proj) {
        if (!Array.isArray(proj.timeLogs)) proj.timeLogs = [];
        proj.timeLogs.push({
          id: 'tl_' + Date.now(),
          minutes: effectiveMins,
          date,
          note: note + (mode === 'deduct' && !note.toLowerCase().includes('odečet') ? ' (odečet)' : '')
        });
        proj.totalTimeMinutes = Math.max(0, (proj.totalTimeMinutes || 0) + effectiveMins);
        saveState();
        renderProjects();
        renderProjectNotesTimeLogs(projId);
        const overviewModal = document.getElementById('modal-projects-time-overview');
        if (overviewModal && overviewModal.open) {
          renderProjectsTimeOverview();
        }
        if (mode === 'deduct') {
          showToast(`➖ Odečteno -${formatTimeMinutes(totalMins)} z projektu ${proj.title}`);
        } else {
          showToast(`➕ Zaznamenáno +${formatTimeMinutes(totalMins)} na projektu ${proj.title}`);
        }
      }

      const modalManualTime = document.getElementById('modal-manual-time');
      if (modalManualTime) {
        modalManualTime._initialValues = null;
        modalManualTime.close();
      }
    });
  }

  // --- Stop Timer Modal Actions ---
  document.querySelectorAll('#stop-timer-chips .stop-time-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const text = chip.getAttribute('data-text');
      const noteInput = document.getElementById('stop-timer-note');
      if (noteInput && text) {
        noteInput.value = text;
        noteInput.focus();
      }
    });
  });

  const formStopTimer = document.getElementById('form-stop-timer');
  if (formStopTimer) {
    formStopTimer.addEventListener('submit', (e) => {
      e.preventDefault();
      const projId = document.getElementById('stop-timer-proj-id')?.value;
      const mins = parseInt(document.getElementById('stop-timer-minutes')?.value || '0', 10);
      const date = document.getElementById('stop-timer-date')?.value || getTodayStr();
      const note = document.getElementById('stop-timer-note')?.value.trim() || 'Práce na projektu';

      if (mins <= 0) {
        showToast('Zadej platný čas (alespoň 1 minutu).');
        return;
      }

      const proj = state.projects.find(p => p.id === projId);
      if (proj) {
        if (!Array.isArray(proj.timeLogs)) proj.timeLogs = [];
        proj.timeLogs.push({
          id: 'tl_' + Date.now(),
          minutes: mins,
          date,
          note
        });
        proj.totalTimeMinutes = (proj.totalTimeMinutes || 0) + mins;
      }

      if (activeProjectTimer && activeProjectTimer.projectId === projId) {
        activeProjectTimer = null;
        localStorage.removeItem('lifeos_active_project_timer');
        stopProjectTimerInterval();
      }

      saveState();
      renderProjects();
      renderProjectNotesTimeLogs(projId);
      const overviewModal = document.getElementById('modal-projects-time-overview');
      if (overviewModal && overviewModal.open) {
        renderProjectsTimeOverview();
      }
      showToast(`💾 Uloženo +${formatTimeMinutes(mins)} na projektu „${proj ? proj.title : ''}“`);

      const modal = document.getElementById('modal-stop-timer');
      if (modal) {
        modal._initialValues = null;
        modal.close();
      }
    });
  }

  const btnResumeStopTimer = document.getElementById('btn-resume-stop-timer');
  if (btnResumeStopTimer) {
    btnResumeStopTimer.addEventListener('click', () => {
      const modal = document.getElementById('modal-stop-timer');
      if (modal) {
        modal._initialValues = null;
        modal.close();
      }
      showToast('▶️ Stopky pokračují v běhu.');
    });
  }

  const btnDiscardStopTimer = document.getElementById('btn-discard-stop-timer');
  if (btnDiscardStopTimer) {
    btnDiscardStopTimer.addEventListener('click', () => {
      if (!confirm('Opravdu chceš zahodit toto měření bez uložení?')) return;
      if (activeProjectTimer) {
        activeProjectTimer = null;
        localStorage.removeItem('lifeos_active_project_timer');
        stopProjectTimerInterval();
      }
      renderProjects();
      const modal = document.getElementById('modal-stop-timer');
      if (modal) {
        modal._initialValues = null;
        modal.close();
      }
      showToast('🗑️ Měření stopek bylo zahozeno.');
    });
  }

  // --- Edit Single Time Log Form ---
  const formEditTime = document.getElementById('form-edit-time-log');
  if (formEditTime) {
    formEditTime.addEventListener('submit', (e) => {
      e.preventDefault();
      const projId = document.getElementById('edit-time-proj-id')?.value;
      const logId = document.getElementById('edit-time-log-id')?.value;
      const mins = parseInt(document.getElementById('edit-time-minutes')?.value || '0', 10);
      const date = document.getElementById('edit-time-date')?.value || getTodayStr();
      const note = document.getElementById('edit-time-note')?.value.trim() || 'Práce na projektu';

      if (mins === 0) {
        showToast('Čas nesmí být 0 minut.');
        return;
      }

      const proj = state.projects.find(p => p.id === projId);
      if (!proj || !Array.isArray(proj.timeLogs)) return;

      const log = proj.timeLogs.find(l => l.id === logId);
      if (!log) return;

      const oldMins = log.minutes || 0;
      const diff = mins - oldMins;

      log.minutes = mins;
      log.date = date;
      log.note = note;

      proj.totalTimeMinutes = Math.max(0, (proj.totalTimeMinutes || 0) + diff);

      saveState();
      renderProjects();
      renderProjectNotesTimeLogs(projId);
      const overviewModal = document.getElementById('modal-projects-time-overview');
      if (overviewModal && overviewModal.open) {
        renderProjectsTimeOverview();
      }

      const modal = document.getElementById('modal-edit-time-log');
      if (modal) {
        modal._initialValues = null;
        modal.close();
      }
      showToast('Časový záznam byl upraven.');
    });
  }

  // --- Projects Time Overview Toolbar ---
  const btnOpenOverview = document.getElementById('btn-open-projects-time-overview');
  if (btnOpenOverview) {
    btnOpenOverview.addEventListener('click', () => openProjectsTimeOverview('all'));
  }

  const overviewFilterSelect = document.getElementById('time-overview-project-filter');
  if (overviewFilterSelect) {
    overviewFilterSelect.addEventListener('change', (e) => {
      currentOverviewProjectFilter = e.target.value;
      renderProjectsTimeOverview();
    });
  }

  const overviewPeriodPills = document.querySelectorAll('#time-overview-period-pills .filter-pill');
  overviewPeriodPills.forEach(pill => {
    pill.addEventListener('click', () => {
      overviewPeriodPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentOverviewPeriodFilter = pill.getAttribute('data-period') || 'all';
      renderProjectsTimeOverview();
    });
  });

  const btnOverviewOpenManual = document.getElementById('btn-overview-open-manual-time');
  if (btnOverviewOpenManual) {
    btnOverviewOpenManual.addEventListener('click', () => {
      const targetProj = currentOverviewProjectFilter !== 'all' ? currentOverviewProjectFilter : null;
      openManualTimeModal(targetProj, 'add');
    });
  }

  // --- Quick Links ---
  const btnAddQuickLink = document.getElementById('btn-add-quicklink');
  if (btnAddQuickLink) btnAddQuickLink.addEventListener('click', () => openQuickLinkModal());

  const qlSearch = document.getElementById('quicklinks-search-input');
  if (qlSearch) qlSearch.addEventListener('input', debounce(renderQuickLinks, 120));

  const qlPills = document.querySelectorAll('#quicklinks-category-pills .filter-pill');
  qlPills.forEach(pill => {
    pill.addEventListener('click', () => {
      qlPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentQuickLinkCategory = pill.getAttribute('data-cat') || 'all';
      renderQuickLinks();
    });
  });

  const btnTypeWeb = document.getElementById('btn-ql-type-web');
  const btnTypeApp = document.getElementById('btn-ql-type-app');
  if (btnTypeWeb) btnTypeWeb.addEventListener('click', () => setQuickLinkModalType('web'));
  if (btnTypeApp) btnTypeApp.addEventListener('click', () => setQuickLinkModalType('app'));

  document.querySelectorAll('.ql-preset-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const titleInput = document.getElementById('quicklink-title');
      const urlInput = document.getElementById('quicklink-url');
      const catSelect = document.getElementById('quicklink-category');
      const iconInput = document.getElementById('quicklink-icon');
      const descInput = document.getElementById('quicklink-desc');

      if (titleInput && chip.dataset.title) titleInput.value = chip.dataset.title;
      if (urlInput && chip.dataset.url) urlInput.value = chip.dataset.url;
      if (catSelect && chip.dataset.cat) catSelect.value = chip.dataset.cat;
      if (iconInput && chip.dataset.icon) iconInput.value = chip.dataset.icon;
      if (descInput && chip.dataset.desc) descInput.value = chip.dataset.desc;

      setQuickLinkModalType('app');
    });
  });

  const formQuickLink = document.getElementById('form-quicklink');
  if (formQuickLink) {
    formQuickLink.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = document.getElementById('quicklink-id')?.value;
      const title = document.getElementById('quicklink-title')?.value.trim();
      let url = document.getElementById('quicklink-url')?.value.trim();
      const category = document.getElementById('quicklink-category')?.value || 'Škola';
      const icon = document.getElementById('quicklink-icon')?.value.trim();
      const desc = document.getElementById('quicklink-desc')?.value.trim();

      if (!title || !url) return;
      // If it doesn't contain a scheme like http:, https:, vscode:, spotify:, discord:, etc., prepend https://
      if (!/^[a-zA-Z0-9\-\+\.]+:/i.test(url)) {
        url = 'https://' + url;
      }

      if (!Array.isArray(state.quickLinks)) state.quickLinks = [];

      if (id) {
        const item = state.quickLinks.find(q => q.id === id);
        if (item) {
          item.title = title;
          item.url = url;
          item.category = category;
          item.icon = icon;
          item.desc = desc;
        }
      } else {
        state.quickLinks.push({
          id: 'ql_' + Date.now(),
          title,
          url,
          category,
          icon,
          desc
        });
      }

      saveState();
      const modalQuickLink = document.getElementById('modal-quicklink');
      if (modalQuickLink) {
        modalQuickLink._initialValues = null;
        modalQuickLink.close();
      }
      renderQuickLinks();
      showToast(category === 'Aplikace' || isAppProtocol(url) ? 'Aplikace byla uložena 🚀' : 'Rychlý odkaz byl uložen 🔗');
    });
  }

  // --- Finance Tracker ---
  const btnAddIncome = document.getElementById('btn-add-income');
  if (btnAddIncome) btnAddIncome.addEventListener('click', () => openFinanceTxModal('income'));

  const btnAddExpense = document.getElementById('btn-add-expense');
  if (btnAddExpense) btnAddExpense.addEventListener('click', () => openFinanceTxModal('expense'));

  const btnAddRecurring = document.getElementById('btn-add-recurring');
  if (btnAddRecurring) btnAddRecurring.addEventListener('click', () => openFinanceRecurringModal());

  const financeFilterPills = document.querySelectorAll('#finance-tx-filter .filter-pill');
  financeFilterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      financeFilterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentFinanceFilter = pill.getAttribute('data-filter') || 'all';
      renderFinanceTransactions();
    });
  });

  const formFinanceTx = document.getElementById('form-finance-tx');
  if (formFinanceTx) {
    formFinanceTx.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = document.getElementById('finance-tx-id')?.value;
      const type = document.getElementById('finance-tx-type')?.value || 'expense';
      const amount = parseFloat(document.getElementById('finance-tx-amount')?.value || '0');
      const title = document.getElementById('finance-tx-title')?.value.trim();
      const category = document.getElementById('finance-tx-category')?.value || 'Jiné';
      const date = document.getElementById('finance-tx-date')?.value || getTodayStr();
      const note = document.getElementById('finance-tx-note')?.value.trim();

      if (!title || isNaN(amount) || amount <= 0) {
        showToast('Zadej platnou částku a popis.');
        return;
      }

      if (!state.finance) state.finance = { recurring: [], transactions: [] };
      if (!Array.isArray(state.finance.transactions)) state.finance.transactions = [];

      if (id) {
        const item = state.finance.transactions.find(t => t.id === id);
        if (item) {
          item.type = type;
          item.amount = amount;
          item.title = title;
          item.category = category;
          item.date = date;
          item.note = note;
        }
      } else {
        state.finance.transactions.unshift({
          id: 'tx_' + Date.now(),
          type,
          amount,
          title,
          category,
          date,
          note
        });
      }

      saveState();
      const modalTx = document.getElementById('modal-finance-tx');
      if (modalTx) {
        modalTx._initialValues = null;
        modalTx.close();
      }
      renderFinance();
      showToast(type === 'income' ? `Příjem +${amount.toLocaleString('cs-CZ')} Kč uložen 💰` : `Výdaj -${amount.toLocaleString('cs-CZ')} Kč uložen 💸`);
    });
  }

  const formFinanceRecurring = document.getElementById('form-finance-recurring');
  if (formFinanceRecurring) {
    formFinanceRecurring.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = document.getElementById('recurring-id')?.value;
      const name = document.getElementById('recurring-name')?.value.trim();
      const amount = parseFloat(document.getElementById('recurring-amount')?.value || '0');
      const category = document.getElementById('recurring-category')?.value || 'Jiné';
      const dueDay = parseInt(document.getElementById('recurring-due-day')?.value || '1', 10);
      const type = document.getElementById('recurring-type')?.value || 'expense';

      if (!name || isNaN(amount) || amount <= 0) {
        showToast('Zadej platný název a částku.');
        return;
      }

      if (!state.finance) state.finance = { recurring: [], transactions: [] };
      if (!Array.isArray(state.finance.recurring)) state.finance.recurring = [];

      if (id) {
        const item = state.finance.recurring.find(r => r.id === id);
        if (item) {
          item.name = name;
          item.amount = amount;
          item.category = category;
          item.dueDay = dueDay;
          item.type = type;
        }
      } else {
        state.finance.recurring.push({
          id: 'rec_' + Date.now(),
          name,
          amount,
          category,
          dueDay,
          type,
          paid: false
        });
      }

      saveState();
      const modalRec = document.getElementById('modal-finance-recurring');
      if (modalRec) {
        modalRec._initialValues = null;
        modalRec.close();
      }
      renderFinance();
      showToast(`Pravidelná platba „${name}“ uložena ✓`);
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
            liveUrl: p.liveUrl || '',
            totalTimeMinutes: p.totalTimeMinutes || 0,
            timeLogs: p.timeLogs || []
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

        const { data: dbProjects } = await supabaseClient.from('projects').select('id').eq('user_id', userId);
        if (dbProjects) {
          const toDelete = dbProjects.filter(r => isExplicitlyDeleted(r.id)).map(r => r.id);
          if (toDelete.length > 0) {
            await supabaseClient.from('projects').delete().in('id', toDelete).eq('user_id', userId);
          }
        }
      } else {
        const { data: dbProjects } = await supabaseClient.from('projects').select('id').eq('user_id', userId);
        if (dbProjects) {
          const toDelete = dbProjects.filter(r => isExplicitlyDeleted(r.id)).map(r => r.id);
          if (toDelete.length > 0) {
            await supabaseClient.from('projects').delete().in('id', toDelete).eq('user_id', userId);
          }
        }
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

      // Virtual row for journal entries
      if (state.journal && Array.isArray(state.journal)) {
        splitRows.push({
          id: `split_${userId}_journal`,
          user_id: userId,
          day: 997,
          day_name: '__JOURNAL__',
          focus: JSON.stringify(state.journal),
          rest: false,
          updated_at: nowIso
        });
      }

      // Virtual row for split profiles (classic vs. plasma)
      if (state.gym.splitProfiles) {
        splitRows.push({
          id: `split_${userId}_profiles`,
          user_id: userId,
          day: 996,
          day_name: '__SPLIT_PROFILES__',
          focus: JSON.stringify({
            activeProfile: state.gym.activeProfile || 'classic',
            splitProfiles: state.gym.splitProfiles
          }),
          rest: false,
          updated_at: nowIso
        });
      }

      // Virtual row for quick links
      if (state.quickLinks && Array.isArray(state.quickLinks)) {
        splitRows.push({
          id: `split_${userId}_quicklinks`,
          user_id: userId,
          day: 995,
          day_name: '__QUICKLINKS__',
          focus: JSON.stringify(state.quickLinks),
          rest: false,
          updated_at: nowIso
        });
      }

      // Virtual row for safe finance tracker
      if (state.finance) {
        splitRows.push({
          id: `split_${userId}_finance`,
          user_id: userId,
          day: 994,
          day_name: '__FINANCE__',
          focus: JSON.stringify(state.finance),
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

        const { data: dbLogs } = await supabaseClient.from('gym_logs').select('id').eq('user_id', userId);
        if (dbLogs) {
          const toDelete = dbLogs.filter(r => isExplicitlyDeleted(r.id)).map(r => r.id);
          if (toDelete.length > 0) {
            await supabaseClient.from('gym_logs').delete().in('id', toDelete).eq('user_id', userId);
          }
        }
      } else {
        const { data: dbLogs } = await supabaseClient.from('gym_logs').select('id').eq('user_id', userId);
        if (dbLogs) {
          const toDelete = dbLogs.filter(r => isExplicitlyDeleted(r.id)).map(r => r.id);
          if (toDelete.length > 0) {
            await supabaseClient.from('gym_logs').delete().in('id', toDelete).eq('user_id', userId);
          }
        }
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

        const { data: dbSchool } = await supabaseClient.from('school_items').select('id').eq('user_id', userId);
        if (dbSchool) {
          const toDelete = dbSchool.filter(r => isExplicitlyDeleted(r.id) || ['sch_1', 'sch_2', 'sch_3', 'sch_4'].includes(r.id)).map(r => r.id);
          if (toDelete.length > 0) {
            await supabaseClient.from('school_items').delete().in('id', toDelete).eq('user_id', userId);
          }
        }
      } else {
        const { data: dbSchool } = await supabaseClient.from('school_items').select('id').eq('user_id', userId);
        if (dbSchool) {
          const toDelete = dbSchool.filter(r => isExplicitlyDeleted(r.id) || ['sch_1', 'sch_2', 'sch_3', 'sch_4'].includes(r.id)).map(r => r.id);
          if (toDelete.length > 0) {
            await supabaseClient.from('school_items').delete().in('id', toDelete).eq('user_id', userId);
          }
        }
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

        const { data: dbHabits } = await supabaseClient.from('habits').select('id').eq('user_id', userId);
        if (dbHabits) {
          const toDelete = dbHabits.filter(r => isExplicitlyDeleted(r.id)).map(r => r.id);
          if (toDelete.length > 0) {
            await supabaseClient.from('habits').delete().in('id', toDelete).eq('user_id', userId);
          }
        }
      } else {
        const { data: dbHabits } = await supabaseClient.from('habits').select('id').eq('user_id', userId);
        if (dbHabits) {
          const toDelete = dbHabits.filter(r => isExplicitlyDeleted(r.id)).map(r => r.id);
          if (toDelete.length > 0) {
            await supabaseClient.from('habits').delete().in('id', toDelete).eq('user_id', userId);
          }
        }
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
                         (schoolRes.data && schoolRes.data.length > 0) ||
                         (splitRes.data && splitRes.data.length > 0);

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
              liveUrl: (metaItem && metaItem.liveUrl !== undefined) ? metaItem.liveUrl : (existingLocal?.liveUrl || ''),
              totalTimeMinutes: (metaItem && typeof metaItem.totalTimeMinutes === 'number') ? metaItem.totalTimeMinutes : (existingLocal?.totalTimeMinutes || 0),
              timeLogs: (metaItem && Array.isArray(metaItem.timeLogs)) ? metaItem.timeLogs : (existingLocal?.timeLogs || [])
            };
          });

        const hasOldDemo = cloudProjects.some(p => p.id === 'proj_1' || p.id === 'proj_2' || p.id === 'proj_3');
        const hasPersonal = cloudProjects.some(p => p.title === 'PubMate' || p.title === 'Dockmaster' || p.title === 'LogiSpace');

        if (hasOldDemo && !hasPersonal) {
          ['proj_1', 'proj_2', 'proj_3'].forEach(id => markAsDeleted(id));
          state.projects = JSON.parse(JSON.stringify(DEFAULT_DATA.projects));
          saveState();
        } else if (cloudProjects.length > 0) {
          const cloudProjMap = new Map(cloudProjects.map(p => [p.id, p]));
          const localProjectsToKeep = (state.projects || []).filter(p => !isExplicitlyDeleted(p.id) && !cloudProjMap.has(p.id));
          state.projects = [...cloudProjects, ...localProjectsToKeep];
          if (localProjectsToKeep.length > 0) {
            debouncePushToSupabase();
          }
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

        const journalRow = splitRes.data.find(s => s.day === 997 || s.day_name === '__JOURNAL__');
        if (journalRow && journalRow.focus) {
          try {
            const parsedJournal = JSON.parse(journalRow.focus);
            if (Array.isArray(parsedJournal)) {
              const cloudJournalMap = new Map(parsedJournal.map(j => [j.id, j]));
              const localJournalToKeep = (state.journal || []).filter(j => !isExplicitlyDeleted(j.id) && !cloudJournalMap.has(j.id));
              const mergedJournal = [...parsedJournal.filter(j => !isExplicitlyDeleted(j.id)), ...localJournalToKeep];
              mergedJournal.sort((a, b) => {
                const timeA = a.date + ' ' + (a.time || '00:00');
                const timeB = b.date + ' ' + (b.time || '00:00');
                return timeB.localeCompare(timeA);
              });
              state.journal = mergedJournal;
            }
          } catch (e) {
            console.warn('Error parsing journal from cloud:', e);
          }
        }

        const profilesRow = splitRes.data.find(s => s.day === 996 || s.day_name === '__SPLIT_PROFILES__');
        if (profilesRow && profilesRow.focus) {
          try {
            const parsed = JSON.parse(profilesRow.focus);
            if (parsed && parsed.splitProfiles) {
              state.gym.splitProfiles = parsed.splitProfiles;
              if (parsed.activeProfile) {
                state.gym.activeProfile = parsed.activeProfile;
              }
            }
          } catch (e) {
            console.warn('Error parsing split profiles from cloud:', e);
          }
        }

        const qlRow = splitRes.data.find(s => s.day === 995 || s.day_name === '__QUICKLINKS__');
        if (qlRow && qlRow.focus) {
          try {
            const parsed = JSON.parse(qlRow.focus);
            if (Array.isArray(parsed)) {
              const cloudMap = new Map(parsed.map(q => [q.id, q]));
              const localToKeep = (state.quickLinks || []).filter(q => !isExplicitlyDeleted(q.id) && !cloudMap.has(q.id));
              state.quickLinks = [...parsed.filter(q => !isExplicitlyDeleted(q.id)), ...localToKeep];
            }
          } catch (e) {
            console.warn('Error parsing quick links from cloud:', e);
          }
        }

        const finRow = splitRes.data.find(s => s.day === 994 || s.day_name === '__FINANCE__');
        if (finRow && finRow.focus) {
          try {
            const parsed = JSON.parse(finRow.focus);
            if (parsed && typeof parsed === 'object') {
              if (Array.isArray(parsed.recurring)) {
                const cloudRecMap = new Map(parsed.recurring.map(r => [r.id, r]));
                const localRecToKeep = (state.finance?.recurring || []).filter(r => !isExplicitlyDeleted(r.id) && !cloudRecMap.has(r.id));
                const mergedRec = [...parsed.recurring.filter(r => !isExplicitlyDeleted(r.id)), ...localRecToKeep];
                if (!state.finance) state.finance = { recurring: [], transactions: [] };
                state.finance.recurring = mergedRec;
              }
              if (Array.isArray(parsed.transactions)) {
                const cloudTxMap = new Map(parsed.transactions.map(t => [t.id, t]));
                const localTxToKeep = (state.finance?.transactions || []).filter(t => !isExplicitlyDeleted(t.id) && !cloudTxMap.has(t.id));
                const mergedTx = [...parsed.transactions.filter(t => !isExplicitlyDeleted(t.id)), ...localTxToKeep];
                mergedTx.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
                if (!state.finance) state.finance = { recurring: [], transactions: [] };
                state.finance.transactions = mergedTx;
              }
            }
          } catch (e) {
            console.warn('Error parsing finance from cloud:', e);
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

      // 4. Gym Logs (Safe Merge - local records are never discarded unless explicitly deleted)
      if (logsRes.data) {
        const cloudLogs = logsRes.data
          .filter(l => !isExplicitlyDeleted(l.id))
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

        const cloudLogMap = new Map(cloudLogs.map(l => [l.id, l]));
        const localLogsToKeep = (state.gym.logs || []).filter(l => !isExplicitlyDeleted(l.id) && !cloudLogMap.has(l.id));

        const mergedLogs = [...cloudLogs, ...localLogsToKeep];
        mergedLogs.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
        state.gym.logs = mergedLogs;

        if (localLogsToKeep.length > 0) {
          debouncePushToSupabase();
        }
      }

      // 5. School Items (Safe Merge)
      if (schoolRes.data) {
        const cloudSchool = schoolRes.data
          .filter(s => !isExplicitlyDeleted(s.id) && !['sch_1', 'sch_2', 'sch_3', 'sch_4'].includes(s.id))
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

        const cloudSchoolMap = new Map(cloudSchool.map(s => [s.id, s]));
        const localSchoolToKeep = (state.school || []).filter(s => !isExplicitlyDeleted(s.id) && !cloudSchoolMap.has(s.id));
        state.school = [...cloudSchool, ...localSchoolToKeep];

        if (localSchoolToKeep.length > 0) {
          debouncePushToSupabase();
        }
      }

      // 6. Habits (Safe Merge)
      if (habitsRes.data && habitsRes.data.length > 0) {
        const cloudHabits = habitsRes.data
          .filter(h => !isExplicitlyDeleted(h.id))
          .map(h => ({
            id: h.id,
            text: h.text
          }));

        const cloudHabitMap = new Map(cloudHabits.map(h => [h.id, h]));
        const localHabitsToKeep = (state.habits || []).filter(h => !isExplicitlyDeleted(h.id) && !cloudHabitMap.has(h.id));
        state.habits = [...cloudHabits, ...localHabitsToKeep];

        if (localHabitsToKeep.length > 0) {
          debouncePushToSupabase();
        }
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

