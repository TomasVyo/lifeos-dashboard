# 🌟 LifeOS – Osobní PWA Dashboard s Cloud Sync

Moderní, rychlý a plně responzivní osobní dashboard navržený pro efektivní správu tvých projektů, fitness tréninků, školních povinností a denních návyků.

Funguje jako **Progressive Web App (PWA)** s podporou **Supabase Cloud & Realtime** – změny na PC se ti v reálném čase během zlomku vteřiny promítnou na mobilu a tabletu (a naopak), a zároveň máš kompletní funkčnost i **offline**.

---

## ☁️ Automatická synchronizace a záloha (Supabase)

Pro synchronizaci napříč všemi tvými zařízeními (mobil, notebook, PC) používá dashboard **Supabase** – moderní open-source backend postavený na PostgreSQL s integrovaným WebSocket přenosem (Realtime) a zabezpečením (Row Level Security).

### Proč právě Supabase?
- **Štědrý Free Tier navždy:** 500 MB PostgreSQL databáze, 50 000 uživatelů, 200 souběžných Realtime spojení zdarma.
- **Okamžitá Realtime synchronizace:** Odcvičíš sérii ve fitku, zaškrtneš ji v mobilu a na počítači se ti ihned bez refreshe rozsvítí splněný den.
- **Zabezpečení (Row Level Security):** Data jsou vázána na tvůj účet (e-mail a heslo). Nikdo cizí k nim nemá přístup.
- **Offline-First hybrid:** Pokud zrovna nemáš signál, aplikace ukládá data do rychlé paměti v prohlížeči (`localStorage`) a jakmile se připojíš k internetu, vše se automaticky synchronizuje s cloudem.

### 🛠️ Jak Supabase zprovoznit během 2 minut:

1. **Založ si projekt zdarma:**
   - Jdi na [supabase.com](https://supabase.com) a klikni na **Start your project** (přihlas se např. přes GitHub).
   - Vytvoř nový projekt (zvol název např. `lifeos-dashboard` a heslo k databázi).
2. **Spusť SQL skript:**
   - V levém menu Supabase klikni na **SQL Editor** $\rightarrow$ **New query**.
   - Otevři soubor **`supabase-schema.sql`** z této složky, zkopíruj jeho obsah, vlož do SQL Editoru a klikni na zelené tlačítko **Run**.
   - Tím se automaticky vytvoří všechny tabulky, indexy, zabezpečení (RLS) i WebSocket kanály pro realtime přenos.
3. **Získej API klíče:**
   - V Supabase jdi do **Project Settings** (ozubené kolo vlevo dole) $\rightarrow$ **API**.
   - Zkopíruj:
     - **Project URL** (např. `https://xyzabcdefg.supabase.co`)
     - **Project API Keys:** `anon public` (dlouhý token začínající `eyJhbGci...`).
4. **Připoj v Dashboardu:**
   - Otevři dashboard na PC nebo mobilu.
   - V záhlaví klikni na tlačítko **☁️ Lokální** (nebo v Nastavení na **Připojit Supabase Cloud**).
   - Vlož zkopírované **Project URL**, **Anon Key**, svůj e-mail a zvol si heslo.
   - Klikni na **Vytvořit nový účet** (nebo *Přihlásit se*).
   - Hotovo! Nyní se veškerá data automaticky zálohují do cloudu a synchronizují se všemi tvými zařízeními.

---

## 🚀 Jak aplikaci spustit na počítači

Prohlížeče vyžadují pro PWA instalaci protokol `http://localhost` nebo `https://`. Pro spuštění je připraven lokální server:

### Možnost 1: Dvojklikem (nejjednodušší)
1. Ve složce dvakrát klikni na soubor **`start.bat`**.
2. Otevře se okno a automaticky se ti spustí prohlížeč na adrese **`http://localhost:5500`**.

### Možnost 2: Přes terminál / PowerShell
```powershell
./server.ps1
```

---

## 📲 Jak nainstalovat jako PWA (do Windows i na Mobil)

1. **V prohlížeči (Google Chrome / Microsoft Edge na PC):**
   - V adresním řádku vpravo klikni na ikonku **Instalovat aplikaci** (nebo přímo v dashboardu na tlačítko **„Instalovat App“**).
   - Aplikace se otevře ve vlastním samostatném okně bez rušivých prvků prohlížeče a přidá se do nabídky Start a na plochu.
2. **Na mobilním telefonu (Android / iPhone):**
   - Na Androidu zvol v nabídce Chrome **„Přidat na plochu“** nebo **„Nainstalovat aplikaci“**.
   - Na iPhone (Safari) klikni na tlačítko sdílení (čtverec se šipkou) a zvol **„Přidat na plochu“**.

---

## 🛠️ Funkce Dashboardu

### 1. 📊 Hlavní přehled (Overview)
- **Živý čas, datum a dynamický pozdrav** podle denní doby (ráno, odpoledne, večer).
- **4 klíčové KPI metriky:**
  - 🚀 Počet běžících projektů a průměrný postup
  - 🏋️ Tréninky v posilovně tento týden (s počítadlem a plněním cíle)
  - 🎓 Blížící se školní termíny a zkoušky
  - 🎯 Dnešní splněné návyky v procentech
- **Dnešní tréninkový widget:** Zobrazuje plán na dnešek (např. *Push* nebo *Rest*) s tlačítkem pro rychlé zaškrtnutí splněného tréninku.
- **Denní návyky (Checklist):** Rychlé odškrtávání denních rutin (Fitko, učení, programování, pitný režim, spánek).
- **Urgentní termíny do školy:** Seřazeno podle termínu s barevným odpočtem (*Dnes!*, *Zítra!*, *Zbývá X dní*).

### 2. 💼 Moje Projekty (Projects)
- Karty projektů s přehledným stavem (*V řešení*, *Plánováno*, *Dokončeno*).
- Nastavení kategorií a štítků (např. *Frontend*, *Backend*, *Škola*, *Osobní*).
- **Interaktivní subtasky (checklisty):** Přímo na kartě projektu můžeš přidávat dílčí úkoly a odškrtávat je – posuvník postupu se automaticky dopočítává.
- Filtrování podle stavu a fulltextové vyhledávání.
- Odkazy na GitHub repozitáře nebo web.

### 3. 🏋️ Fitko & Sport (Gym Tracker)
- **Týdenní rozvrh (Split):** Pondělí až Neděle s možností snadné úpravy zaměření pro každý den.
- **Týdenní cíl & statistika:** Automatické sledování, kolikrát jsi tento týden odcvičil vůči tvému cíli (např. 4 tréninky týdně).
- **Deník tréninků (Workout Log):**
  - Datum, typ tréninku (*Push, Pull, Legs, Fullbody, Kardio*), doba trvání.
  - Zápis sérií, vah a cviků.
  - Hodnocení tréninku (1 až 5 hvězdiček).
  - Historie s možností mazání.

### 4. 🎓 Škola & Zkoušky (School Tracker)
- Evidence úkolů, zápočtů, zkoušek, semestrálek a prezentací.
- Rozlišení priorit: **Vysoká (červená)**, **Střední (žlutá)**, **Nízká (zelená)**.
- Automatický **živý odpočet dní** do termínu.
- Filtry: *Aktivní*, *Tento týden*, *Splněné*, *Všechny*.
- Přepínání stavu jedním kliknutím (*Splněno / Vrátit do řešení*).

### 5. ⚙️ Nastavení & Záloha dat (Settings)
- **Supabase Cloud Sync panel:** Přihlášení, odhlášení, ruční synchronizace, přepsání lokálních dat do cloudu.
- Personalizace jména a týdenního cíle fitka.
- Přidávání a mazání vlastních denních návyků.
- **Export do JSON souboru:** Možnost stáhnout offline kopii do souboru.
- **Import z JSON souboru:** Obnovení dat ze souboru zálohy.
- **Přepínač Dark / Light režimu** (výchozí je moderní tmavý motiv).
