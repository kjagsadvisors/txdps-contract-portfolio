// Vercel Edge Middleware — Basic auth gate for the txdps-contract-portfolio dashboard.
// The site is public-internet-reachable but gated behind a shared password so
// only TXDPS personnel (and others kjags advisors shares the password with) can view.

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};

const USERNAME = 'txdps';
const PASSWORD = 'kjagsadvisors2026';

export default function middleware(request) {
  const auth = request.headers.get('authorization');
  if (auth) {
    const [scheme, encoded] = auth.split(' ');
    if (scheme === 'Basic' && encoded) {
      // Edge runtime supports atob
      try {
        const decoded = atob(encoded);
        const [user, pass] = decoded.split(':');
        if (user === USERNAME && pass === PASSWORD) {
          return; // pass through — return undefined or no Response to continue
        }
      } catch (e) {
        // fall through to 401
      }
    }
  }
  return new Response('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="kjags advisors — TXDPS portfolio (private)", charset="UTF-8"',
      'Content-Type': 'text/plain',
    },
  });
}
