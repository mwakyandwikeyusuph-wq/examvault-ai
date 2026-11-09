import { NextRequest, NextResponse } from 'next/server';

const defaultAdminPath = process.env.ADMIN_PORTAL_PATH || '/secure-examvault-admin-x8f4h2';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname === defaultAdminPath || pathname.startsWith(`${defaultAdminPath}/`)) {
    const cookieValue = request.cookies.get('examvault_admin_session')?.value;
    const allowedIps = (process.env.ADMIN_ALLOWED_IPS || '').split(',').filter(Boolean);
    const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';

    if (cookieValue !== 'active') {
      const response = NextResponse.rewrite(new URL('/not-found', request.url));
      return response;
    }

    if (allowedIps.length > 0 && !allowedIps.includes(ip)) {
      const response = NextResponse.rewrite(new URL('/not-found', request.url));
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/secure-examvault-admin-x8f4h2/:path*'],
};
