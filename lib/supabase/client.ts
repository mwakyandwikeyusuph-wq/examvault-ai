import { createBrowserClient } from '@supabase/ssr';

let browserClient: ReturnType<typeof createBrowserClient> | undefined;

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL;
  // Supabase's publishable key is the preferred current name. Keep the legacy anon-key
  // fallback so older and mixed environments keep working.
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? process.env.SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    throw new Error('Supabase is not configured. Set either NEXT_PUBLIC_SUPABASE_URL or SUPABASE_URL, and a publishable/anon key.');
  }

  browserClient ??= createBrowserClient(url, key);
  return browserClient;
}
