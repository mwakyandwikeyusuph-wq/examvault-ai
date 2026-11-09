# ExamVault AI — Supabase Phase 1

Phase 1 adds real Supabase Auth integration, a first PostgreSQL migration, protected sessions, and database-enforced roles. The app does not ship a service-role key and never trusts a role submitted by the browser.

## Configure Supabase

1. Create a Supabase project and copy its Project URL and anon/publishable key.
2. Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and a private `ADMIN_PORTAL_PATH`.
3. Install dependencies with `npm install` and run `npm run dev`.
4. Apply the migration using the Supabase CLI:

   ```sh
   supabase login
   supabase link --project-ref YOUR_PROJECT_REF
   supabase db push
   ```

   Or run `supabase/migrations/202611090001_phase1_identity_and_library.sql` in the Supabase SQL Editor.
5. In Supabase Auth settings, set the Site URL to your deployed app origin and add these Redirect URLs:
   - `http://localhost:3000/auth/callback`
   - `https://YOUR_PRODUCTION_DOMAIN/auth/callback`
6. Enable email confirmations as desired. For Google login, configure Google OAuth credentials in Supabase Auth and add the Supabase callback URL shown by the provider setup.

The `profiles` row is created by a database trigger after a new Auth user is inserted. Every new user starts as `student`. Roles are managed in `profiles.role`; RLS plus a database trigger prevent a user from changing their own role. Promote the initial administrator using the Supabase SQL Editor as the project owner:

```sql
update public.profiles
set role = 'super_admin'
where id = (select id from auth.users where email = 'admin@example.com');
```

Do not promote users based on user-editable metadata. Keep `SUPABASE_SERVICE_ROLE_KEY` server-only; it is not needed for normal user authentication and must never be exposed in a `NEXT_PUBLIC_` variable.

## Auth flows

- Email/password sign up with email verification callback
- Email/password login and Google OAuth initiation
- Password reset email and authenticated password update
- Supabase SSR cookie sessions refreshed by middleware
- `/dashboard` requires a verified Supabase session
- Admin portal path is configurable by `ADMIN_PORTAL_PATH`; non-admin and direct `/admin` requests receive a 404 rewrite
- Admin access requires a Supabase-verified user and `admin` or `super_admin` profile role

## Database foundation

The Phase 1 migration creates roles, profiles, institutions, subjects, courses, materials, favorites, downloads, views, ratings, reviews, search logs, user sessions, and audit logs, with indexes, auth profile provisioning, role-guard triggers, and RLS policies. New product domains (AI conversations, document chunks, billing, quiz attempts, etc.) should be added in later migrations as their services are implemented.

## Environment variables

- `NEXT_PUBLIC_APP_NAME`, `NEXT_PUBLIC_APP_URL`: public app metadata.
- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`: required for browser and server auth; safe to expose.
- `SUPABASE_SERVICE_ROLE_KEY`: optional privileged server-only key. Never send it to the browser or commit its value.
- `ADMIN_PORTAL_PATH`: non-indexed, hard-to-guess entry path. This is not a substitute for authentication/RBAC.
- Integration keys are optional until their feature phase is implemented.

The repository does not include credentials for an actual Supabase project. Auth/database operations become live after project values are configured and the migration is applied.
