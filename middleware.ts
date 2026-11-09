import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

const protectedPaths = ['/dashboard'];
const internalAdminPath = '/admin';

function isWithin(pathname: string, root: string) {
  return pathname === root || pathname.startsWith(`${root}/`);
}

function notFound(request: NextRequest) {
  return NextResponse.rewrite(new URL('/not-found', request.url));
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const configuredAdminPath = process.env.ADMIN_PORTAL_PATH || '/secure-examvault-admin-x8f4h2';
  const isAdminEntry = isWithin(pathname, configuredAdminPath);
  const isInternalAdmin = isWithin(pathname, internalAdminPath);
  const needsAuth = protectedPaths.some((path) => isWithin(pathname, path));

  // Never expose the implementation route directly. Requests to the configured path
  // are internally rewritten only after the user and role have been verified.
  if (isInternalAdmin && !isAdminEntry) return notFound(request);
  if (!isAdminEntry && !needsAuth) return NextResponse.next();

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return isAdminEntry ? notFound(request) : NextResponse.redirect(new URL('/login', request.url));

  let response = NextResponse.next({ request });
  const supabase = createServerClient(url, key, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });

  // getUser() verifies the access token with Supabase Auth; do not trust getSession() here.
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return isAdminEntry ? notFound(request) : NextResponse.redirect(new URL('/login', request.url));
  }

  if (isAdminEntry) {
    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).maybeSingle();
    if (!profile || !['admin', 'super_admin'].includes(profile.role)) return notFound(request);

    const destination = request.nextUrl.clone();
    destination.pathname = internalAdminPath;
    return NextResponse.rewrite(destination, response);
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
