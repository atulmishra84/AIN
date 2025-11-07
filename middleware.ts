import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  // Example: block obvious bad bots by UA (adjust to your needs)
  const ua = req.headers.get('user-agent') || '';
  const badBots = [/masscan/i, /sqlmap/i, /nikto/i];
  if (badBots.some((r)=> r.test(ua))) {
    return new NextResponse('Forbidden', { status: 403 });
  }

  // Add security headers universally
  const res = NextResponse.next();
  res.headers.set('X-Frame-Options', 'SAMEORIGIN');
  res.headers.set('X-Content-Type-Options', 'nosniff');
  res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');

  // Basic CSP (adjust paths as you add analytics or 3p)
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self' data:",
    "connect-src 'self'",
    "frame-ancestors 'self'",
    "base-uri 'self'",
    "form-action 'self'"
  ].join('; ');
  res.headers.set('Content-Security-Policy', csp);

  return res;
}

// Apply on all routes
export const config = {
  matcher: '/:path*',
};
