import {NextResponse} from "next/server";

// Best-effort limiter for public forms. Counts live in one server instance's memory, so
// they reset on cold starts and are not shared between instances. It stops simple floods;
// use a Vercel Firewall rate-limit rule for a hard guarantee.
const hits = new Map<string, {count: number; resetAt: number}>();
const MAX_TRACKED_KEYS = 5000;

export function isRateLimited(key: string, limit: number, windowMs: number, now = Date.now()) {
  if (hits.size >= MAX_TRACKED_KEYS) {
    for (const [storedKey, entry] of hits) if (entry.resetAt <= now) hits.delete(storedKey);
    if (hits.size >= MAX_TRACKED_KEYS) hits.clear();
  }
  const entry = hits.get(key);
  if (!entry || entry.resetAt <= now) {
    hits.set(key, {count: 1, resetAt: now + windowMs});
    return false;
  }
  entry.count += 1;
  return entry.count > limit;
}

export function clientIp(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

const TEN_MINUTES = 10 * 60 * 1000;

// Shared checks for form endpoints. Returns an error response to send, or null to continue.
export function guardFormRequest(request: Request, route: string) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    return NextResponse.json({error: "Please use the form on the website."}, {status: 403});
  }
  if (Number(request.headers.get("content-length") || 0) > 8192) {
    return NextResponse.json({error: "Request too large."}, {status: 413});
  }
  if (isRateLimited(`${route}:${clientIp(request)}`, 5, TEN_MINUTES)) {
    return NextResponse.json({error: "Too many requests. Please try again later."}, {status: 429});
  }
  return null;
}
