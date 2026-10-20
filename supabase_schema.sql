-- ============================================================================
-- AURA³ (Trisal 2:1) — Schema Essencial para SUPABASE (SQL Editor)
-- Cole este script no SQL Editor do seu projeto Supabase e clique em "Run"
-- ============================================================================

-- 1. Tabela da Suíte do Casal (Estado principal de cada casal)
create table if not exists public.aura_suites (
  suite_key text primary key default 'default-suite',
  state_json jsonb not null,
  updated_at timestamptz not null default now()
);

-- 2. Tabela de Log de Mensagens (Para histórico e auditoria opcional)
create table if not exists public.aura_messages (
  id uuid primary key default gen_random_uuid(),
  suite_key text not null default 'default-suite',
  channel text not null check (channel in ('trisal', 'dm_a', 'dm_b')),
  sender text not null,
  sender_name text not null,
  content text not null,
  mood text,
  created_at timestamptz not null default now()
);

-- 3. Habilitar RLS simplificado para MVP (Permite leitura/escrita via API Key)
alter table public.aura_suites enable row level security;
alter table public.aura_messages enable row level security;

drop policy if exists "Allow public MVP access suites" on public.aura_suites;
create policy "Allow public MVP access suites"
  on public.aura_suites for all
  using (true)
  with check (true);

drop policy if exists "Allow public MVP access messages" on public.aura_messages;
create policy "Allow public MVP access messages"
  on public.aura_messages for all
  using (true)
  with check (true);

-- 4. Habilitar Realtime no Supabase
alter publication supabase_realtime add table public.aura_suites;
alter publication supabase_realtime add table public.aura_messages;
