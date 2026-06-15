// ============================================================
//  HitaVirTech Access Gate — middleware
//  Runs on EVERY request to the site. This is the gate.
// ============================================================
import { verifySession, parseCookies } from "./_auth.js";
import { isAllowed } from "./_allowlist.js";

export async function onRequest(context) {
  const { request, next, env } = context;
  const url = new URL(request.url);

  // 1. Auth endpoints must stay open, or we'd loop forever.
  if (url.pathname.startsWith("/auth/")) return next();

  // 2. Read + verify the signed session cookie.
  const cookies = parseCookies(request.headers.get("Cookie"));
  const session = await verifySession(cookies["hv_session"], env.SESSION_SECRET);

  // 3. Valid signature, not expired, AND still on the allowlist.
  //    Re-checking the allowlist here is what makes removal instant:
  //    delete a student from _allowlist.js and their next click is blocked,
  //    even if their cookie hasn't expired yet.
  if (session && isAllowed(session.email)) {
    return next(); // serve the requested codelab
  }

  // 4. Not allowed → send to login, remembering where they were headed.
  const loginUrl = new URL("/auth/login", url.origin);
  loginUrl.searchParams.set("redirect", url.pathname + url.search);
  return Response.redirect(loginUrl.toString(), 302);
}
