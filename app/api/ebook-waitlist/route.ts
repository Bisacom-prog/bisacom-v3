import {NextResponse} from "next/server";
import {ebook, ebookConsent} from "@/lib/ebook";

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return NextResponse.json({error: "Please sign up from the portfolio."}, {status: 403});
  let body;
  try {
    const raw = await request.text();
    if (raw.length > 4096) return NextResponse.json({error: "Request too large."}, {status: 413});
    body = JSON.parse(raw);
  } catch { return NextResponse.json({error: "Please check your details."}, {status: 400}); }
  if (!body || typeof body !== "object") return NextResponse.json({error: "Invalid request."}, {status: 400});
  if (body.website) return NextResponse.json({error: "Please try again."}, {status: 400});
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || body.consent !== true || !/^[0-9a-f-]{36}$/i.test(body.requestId || "")) {
    return NextResponse.json({error: "Enter a valid email and agree to receive book updates."}, {status: 400});
  }
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !from) return NextResponse.json({error: "Signups are temporarily unavailable."}, {status: 503});
  if (ebook.plannerUrl && !/^https:\/\/[^\s]+$/.test(ebook.plannerUrl)) return NextResponse.json({error: "Signups are temporarily unavailable."}, {status: 503});

  // Inbox-based launch list: every successful request creates an email record.
  // Keep the payload stable so retries reuse the same Resend idempotency key.
  const emails = [{from, to: ["hello@bisacom.dev"], reply_to: email,
    subject: "Book launch list — From Beginner to Hired",
    text: `Email: ${email}\nConsent: ${ebookConsent}\nConsent version: 2026-09-09\nSource: Portfolio /#book\nSubmission: ${body.requestId}\n\nKeep this email as the signup record. Remove this address from your launch list if they request it.`,
  }];
  if (ebook.plannerUrl) emails.push({from, to: [email], reply_to: "hello@bisacom.dev",
    subject: "Your 30-Day Product Design Career Planner",
    text: `Thanks for joining the From Beginner to Hired launch list.\n\nDownload your free planner: ${ebook.plannerUrl}\n\nI’ll email you when the book is available.\n\nBismark Apenkwah\nBisacom\n\nTo leave the launch list, reply with “unsubscribe” or email hello@bisacom.dev.`,
  });
  try {
    const response = await fetch("https://api.resend.com/emails/batch", {
      method: "POST", headers: {Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json", "Idempotency-Key": `ebook/${body.requestId}`},
      body: JSON.stringify(emails), signal: AbortSignal.timeout(15000),
    });
    if (!response.ok) return NextResponse.json({error: "We couldn’t complete your signup. Please try again."}, {status: 502});
    return NextResponse.json({ok: true, message: ebook.plannerUrl ? "Your planner email is on its way. Check your inbox and spam folder. I’ll also let you know when the book is available." : "Thank you! I’ll email you when the book is available and share the free planner when it’s ready."});
  } catch { return NextResponse.json({error: "The signup service didn’t respond. Please try again."}, {status: 502}); }
}
