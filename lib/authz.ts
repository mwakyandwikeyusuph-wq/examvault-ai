import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';

export type AppRole = 'student' | 'contributor' | 'admin' | 'super_admin';

export async function getCurrentProfile() {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) return null;

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('id, display_name, role, avatar_url, created_at')
    .eq('id', user.id)
    .maybeSingle();

  if (error || !profile) return null;
  return { user, profile: profile as { id: string; display_name: string | null; role: AppRole; avatar_url: string | null; created_at: string } };
}

export async function requireRole(roles: AppRole[]) {
  const current = await getCurrentProfile();
  if (!current || !roles.includes(current.profile.role)) notFound();
  return current;
}
