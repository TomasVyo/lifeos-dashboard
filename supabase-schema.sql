-- ==========================================================================
-- LIFEOS DASHBOARD - SUPABASE SQL SCHEMA
-- Spusťte tento skript v Supabase: Dashboard -> SQL Editor -> New Query -> Run
-- ==========================================================================

-- 1. Povolení UUID rozšíření
create extension if not exists "uuid-ossp";

-- 2. Uživatelská nastavení
create table if not exists public.user_settings (
  user_id uuid primary key references auth.users(id) on delete cascade,
  name text default 'Tomáš',
  gym_weekly_goal int default 4,
  theme text default 'dark',
  updated_at timestamptz default timezone('utc'::text, now()) not null
);

-- 3. Projekty
create table if not exists public.projects (
  id text primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null,
  description text default '',
  category text default '',
  status text default 'in_progress',
  progress int default 0,
  deadline date,
  url text default '',
  tasks jsonb default '[]'::jsonb,
  updated_at timestamptz default timezone('utc'::text, now()) not null
);

-- 4. Týdenní plán fitka (Gym Split)
create table if not exists public.gym_split (
  id text primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  day int not null,
  day_name text not null,
  focus text not null,
  rest boolean default false,
  updated_at timestamptz default timezone('utc'::text, now()) not null
);

-- 5. Deník tréninků (Gym Logs)
create table if not exists public.gym_logs (
  id text primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  date date not null,
  duration int default 60,
  type text not null,
  rating int default 4,
  exercises text default '',
  created_at timestamptz default timezone('utc'::text, now()) not null
);

-- 6. Školní povinnosti a zkoušky (School Items)
create table if not exists public.school_items (
  id text primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  subject text not null,
  type text not null,
  title text not null,
  deadline date not null,
  priority text default 'medium',
  status text default 'pending',
  notes text default '',
  updated_at timestamptz default timezone('utc'::text, now()) not null
);

-- 7. Denní návyky (Habits)
create table if not exists public.habits (
  id text primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  text text not null,
  updated_at timestamptz default timezone('utc'::text, now()) not null
);

-- 8. Záznamy splněných návyků (Habit Logs)
create table if not exists public.habit_logs (
  id text primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  date date not null,
  habit_id text not null,
  created_at timestamptz default timezone('utc'::text, now()) not null
);

-- ==========================================================================
-- ROW LEVEL SECURITY (RLS) - Zabezpečení dat
-- Každý uživatel má přístup výhradně ke svým vlastním datům!
-- ==========================================================================

alter table public.user_settings enable row level security;
alter table public.projects enable row level security;
alter table public.gym_split enable row level security;
alter table public.gym_logs enable row level security;
alter table public.school_items enable row level security;
alter table public.habits enable row level security;
alter table public.habit_logs enable row level security;

-- Politiky pro bezpečný přístup:
create policy "Users can manage own settings" on public.user_settings 
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Users can manage own projects" on public.projects 
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Users can manage own split" on public.gym_split 
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Users can manage own gym logs" on public.gym_logs 
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Users can manage own school items" on public.school_items 
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Users can manage own habits" on public.habits 
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Users can manage own habit logs" on public.habit_logs 
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ==========================================================================
-- REALTIME - Povolení okamžité synchronizace přes WebSockets
-- ==========================================================================

do $$
begin
  if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and tablename = 'user_settings') then
    alter publication supabase_realtime add table public.user_settings;
  end if;
  if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and tablename = 'projects') then
    alter publication supabase_realtime add table public.projects;
  end if;
  if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and tablename = 'gym_split') then
    alter publication supabase_realtime add table public.gym_split;
  end if;
  if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and tablename = 'gym_logs') then
    alter publication supabase_realtime add table public.gym_logs;
  end if;
  if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and tablename = 'school_items') then
    alter publication supabase_realtime add table public.school_items;
  end if;
  if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and tablename = 'habits') then
    alter publication supabase_realtime add table public.habits;
  end if;
  if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and tablename = 'habit_logs') then
    alter publication supabase_realtime add table public.habit_logs;
  end if;
end $$;
