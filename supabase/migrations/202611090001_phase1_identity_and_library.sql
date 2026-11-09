-- ExamVault AI Phase 1: identity, RBAC, and core library schema.
-- Apply with Supabase CLI: supabase db push

create extension if not exists pgcrypto;

do $$ begin
  create type public.app_role as enum ('student', 'contributor', 'admin', 'super_admin');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.material_kind as enum ('exam', 'book', 'note', 'research');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.material_status as enum ('draft', 'processing', 'published', 'archived', 'rejected');
exception when duplicate_object then null;
end $$;

create table if not exists public.roles (
  role public.app_role primary key,
  description text not null
);
insert into public.roles (role, description) values
  ('student', 'Learns and accesses published materials'),
  ('contributor', 'Submits and manages own learning materials'),
  ('admin', 'Manages users and library content'),
  ('super_admin', 'Full platform administration')
on conflict (role) do update set description = excluded.description;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  avatar_url text,
  role public.app_role not null default 'student',
  institution_id uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.institutions (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  country_code char(2),
  website text,
  created_at timestamptz not null default now()
);
alter table public.profiles drop constraint if exists profiles_institution_id_fkey;
alter table public.profiles add constraint profiles_institution_id_fkey foreign key (institution_id) references public.institutions(id) on delete set null;

create table if not exists public.subjects (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  institution_id uuid references public.institutions(id) on delete set null,
  subject_id uuid references public.subjects(id) on delete set null,
  name text not null,
  code text,
  level text,
  created_at timestamptz not null default now(),
  unique (institution_id, code)
);

create table if not exists public.materials (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  kind public.material_kind not null,
  status public.material_status not null default 'draft',
  storage_path text,
  mime_type text,
  file_size_bytes bigint check (file_size_bytes is null or file_size_bytes >= 0),
  author_name text,
  institution_id uuid references public.institutions(id) on delete set null,
  subject_id uuid references public.subjects(id) on delete set null,
  course_id uuid references public.courses(id) on delete set null,
  year smallint check (year is null or year between 1900 and 2200),
  uploaded_by uuid not null references auth.users(id) on delete restrict,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists materials_public_listing_idx on public.materials (kind, published_at desc) where status = 'published';
create index if not exists materials_subject_idx on public.materials (subject_id, created_at desc);
create index if not exists materials_uploader_idx on public.materials (uploaded_by, created_at desc);

create table if not exists public.favorites (
  user_id uuid not null references auth.users(id) on delete cascade,
  material_id uuid not null references public.materials(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, material_id)
);
create table if not exists public.downloads (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  material_id uuid not null references public.materials(id) on delete cascade,
  created_at timestamptz not null default now()
);
create index if not exists downloads_user_recent_idx on public.downloads (user_id, created_at desc);
create table if not exists public.views (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  material_id uuid not null references public.materials(id) on delete cascade,
  viewed_at timestamptz not null default now()
);
create index if not exists views_material_recent_idx on public.views (material_id, viewed_at desc);
create table if not exists public.ratings (
  user_id uuid not null references auth.users(id) on delete cascade,
  material_id uuid not null references public.materials(id) on delete cascade,
  value smallint not null check (value between 1 and 5),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, material_id)
);
create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  material_id uuid not null references public.materials(id) on delete cascade,
  body text not null check (char_length(body) between 1 and 5000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, material_id)
);
create table if not exists public.search_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  query text not null check (char_length(query) between 1 and 500),
  filters jsonb not null default '{}'::jsonb,
  result_count integer not null default 0 check (result_count >= 0),
  created_at timestamptz not null default now()
);
create index if not exists search_logs_recent_idx on public.search_logs (created_at desc);
create table if not exists public.user_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  device_label text,
  last_seen_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);
create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references auth.users(id) on delete set null,
  action text not null,
  entity_type text,
  entity_id uuid,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger language plpgsql set search_path = public, pg_temp as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public, pg_temp as $$
begin
  insert into public.profiles (id, display_name, role)
  values (new.id, nullif(new.raw_user_meta_data ->> 'display_name', ''), 'student')
  on conflict (id) do nothing;
  return new;
end;
$$;
revoke all on function public.handle_new_user() from public, anon, authenticated;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
for each row execute procedure public.handle_new_user();

create or replace function public.has_any_role(allowed_roles public.app_role[])
returns boolean language sql stable security definer set search_path = public, pg_temp as $$
  select exists (select 1 from public.profiles p where p.id = (select auth.uid()) and p.role = any (allowed_roles));
$$;
revoke all on function public.has_any_role(public.app_role[]) from public;
grant execute on function public.has_any_role(public.app_role[]) to authenticated;

create or replace function public.guard_profile_role_change()
returns trigger language plpgsql security definer set search_path = public, pg_temp as $$
begin
  if new.role is distinct from old.role
     and coalesce(auth.role(), '') <> 'service_role'
     and not public.has_any_role(array['super_admin']::public.app_role[]) then
    raise exception 'Only a super administrator can change profile roles';
  end if;
  return new;
end;
$$;
drop trigger if exists profiles_guard_role_change on public.profiles;
create trigger profiles_guard_role_change before update on public.profiles
for each row execute procedure public.guard_profile_role_change();

create or replace function public.touch_updated_at()
returns trigger language plpgsql set search_path = public, pg_temp as $$
begin
  new.updated_at = now();
  return new;
end;
$$;
create trigger profiles_touch_updated_at before update on public.profiles for each row execute procedure public.touch_updated_at();
create trigger materials_touch_updated_at before update on public.materials for each row execute procedure public.touch_updated_at();
create trigger ratings_touch_updated_at before update on public.ratings for each row execute procedure public.touch_updated_at();
create trigger reviews_touch_updated_at before update on public.reviews for each row execute procedure public.touch_updated_at();

alter table public.roles enable row level security;
alter table public.profiles enable row level security;
alter table public.institutions enable row level security;
alter table public.subjects enable row level security;
alter table public.courses enable row level security;
alter table public.materials enable row level security;
alter table public.favorites enable row level security;
alter table public.downloads enable row level security;
alter table public.views enable row level security;
alter table public.ratings enable row level security;
alter table public.reviews enable row level security;
alter table public.search_logs enable row level security;
alter table public.user_sessions enable row level security;
alter table public.audit_logs enable row level security;

create policy "authenticated users read role definitions" on public.roles for select to authenticated using (true);
create policy "users read own profile and admins read all" on public.profiles for select to authenticated using (id = (select auth.uid()) or public.has_any_role(array['admin','super_admin']::public.app_role[]));
create policy "users update own profile" on public.profiles for update to authenticated using (id = (select auth.uid())) with check (id = (select auth.uid()));
create policy "admins manage profiles" on public.profiles for all to authenticated using (public.has_any_role(array['admin','super_admin']::public.app_role[])) with check (public.has_any_role(array['admin','super_admin']::public.app_role[]));

create policy "public read institutions" on public.institutions for select to anon, authenticated using (true);
create policy "admins manage institutions" on public.institutions for all to authenticated using (public.has_any_role(array['admin','super_admin']::public.app_role[])) with check (public.has_any_role(array['admin','super_admin']::public.app_role[]));
create policy "public read subjects" on public.subjects for select to anon, authenticated using (true);
create policy "admins manage subjects" on public.subjects for all to authenticated using (public.has_any_role(array['admin','super_admin']::public.app_role[])) with check (public.has_any_role(array['admin','super_admin']::public.app_role[]));
create policy "public read courses" on public.courses for select to anon, authenticated using (true);
create policy "admins manage courses" on public.courses for all to authenticated using (public.has_any_role(array['admin','super_admin']::public.app_role[])) with check (public.has_any_role(array['admin','super_admin']::public.app_role[]));

create policy "read published materials" on public.materials for select to anon, authenticated using (status = 'published' or uploaded_by = (select auth.uid()) or public.has_any_role(array['admin','super_admin']::public.app_role[]));
create policy "contributors create own materials" on public.materials for insert to authenticated with check (uploaded_by = (select auth.uid()) and public.has_any_role(array['contributor','admin','super_admin']::public.app_role[]));
create policy "contributors update own drafts and admins manage" on public.materials for update to authenticated using ((uploaded_by = (select auth.uid()) and public.has_any_role(array['contributor','admin','super_admin']::public.app_role[])) or public.has_any_role(array['admin','super_admin']::public.app_role[])) with check ((uploaded_by = (select auth.uid()) and public.has_any_role(array['contributor','admin','super_admin']::public.app_role[])) or public.has_any_role(array['admin','super_admin']::public.app_role[]));
create policy "admins delete materials" on public.materials for delete to authenticated using (public.has_any_role(array['admin','super_admin']::public.app_role[]));

create policy "users manage own favorites" on public.favorites for all to authenticated using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
create policy "users read own downloads" on public.downloads for select to authenticated using (user_id = (select auth.uid()));
create policy "users record own downloads" on public.downloads for insert to authenticated with check (user_id = (select auth.uid()));
create policy "users read own or public material views" on public.views for select to authenticated using (user_id = (select auth.uid()) or public.has_any_role(array['admin','super_admin']::public.app_role[]));
create policy "record material views" on public.views for insert to anon, authenticated with check (user_id is null or user_id = (select auth.uid()));
create policy "admins delete views" on public.views for delete to authenticated using (public.has_any_role(array['admin','super_admin']::public.app_role[]));
create policy "users manage own ratings" on public.ratings for all to authenticated using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
create policy "public read ratings" on public.ratings for select to anon, authenticated using (true);
create policy "users manage own reviews" on public.reviews for all to authenticated using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
create policy "public read reviews" on public.reviews for select to anon, authenticated using (true);
create policy "users create own search logs" on public.search_logs for insert to authenticated with check (user_id = (select auth.uid()));
create policy "users read own search logs" on public.search_logs for select to authenticated using (user_id = (select auth.uid()));
create policy "admins read all search logs" on public.search_logs for select to authenticated using (public.has_any_role(array['admin','super_admin']::public.app_role[]));
create policy "users manage own sessions" on public.user_sessions for all to authenticated using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
create policy "admins read audit logs" on public.audit_logs for select to authenticated using (public.has_any_role(array['admin','super_admin']::public.app_role[]));

-- Keep audit log writes server-side using the service role; no client insert policy is granted.
