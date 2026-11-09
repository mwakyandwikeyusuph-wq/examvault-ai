import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

function getSafeNext(value: string | null) {
  return value?.startsWith('/') && !value.startsWith('//') ? value : '/dashboard';
}

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = getSafeNext(searchParams.get('next'));
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!code || !url || !key) return NextResponse.redirect(new URL('/login?error=auth_callback', origin));

  const response = NextResponse.redirect(new URL(next, origin));
  const supabase = createServerClient(url, key, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });

  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) return NextResponse.redirect(new URL('/login?error=auth_callback', origin));
  return response;
}
