// ============================================================
//  /auth/whoami — returns the signed-in student's email as JSON.
//  Drop-in replacement for Cloudflare Access's
//  /cdn-cgi/access/get-identity (same { email } shape), used by
//  the admin-only client scripts (step-lock bypass + landing-page
//  unlock) now that Access is gone.
//
//  Only ever reveals the CALLER's own email, read from their own
//  HMAC-signed hv_session cookie. No session → 401.
// ============================================================
import { verifySession, parseCookies } from "../_auth.js";

export async function onRequest(context) {
  const { request, env } = context;
  const cookies = parseCookies(request.headers.get("Cookie"));
  const session = await verifySession(cookies["hv_session"], env.SESSION_SECRET);

  const headers = { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" };
  if (!session) {
    return new Response(JSON.stringify({ email: "" }), { status: 401, headers });
  }
  return new Response(JSON.stringify({ email: session.email }), { status: 200, headers });
}
