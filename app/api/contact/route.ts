import {NextResponse} from "next/server";

const EMAIL = "hello@bisacom.dev";

function text(value: unknown, max = 2000) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (text(body.website)) return NextResponse.json({ok: true});
    const name = text(body.name, 120);
    const email = text(body.email, 200);
    const message = text(body.message);
    if (!name || !/^\S+@\S+\.\S+$/.test(email) || message.length < 20) {
      return NextResponse.json({error: "Please complete all required fields."}, {status: 400});
    }
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured");
      return NextResponse.json({error: "Email service is not configured."}, {status: 503});
    }
    const details = [
      `Type: ${text(body.enquiryType, 30) || "contact"}`,
      `Name: ${name}`,
      `Email: ${email}`,
      body.service ? `Service: ${text(body.service, 120)}` : "",
      body.budget ? `Budget: ${text(body.budget, 80)}` : "",
      body.timeline ? `Timeline: ${text(body.timeline, 120)}` : "",
      "",
      message,
    ].filter(Boolean).join("\n");
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json"},
      body: JSON.stringify({from: process.env.CONTACT_FROM_EMAIL || "Bisacom Portfolio <onboarding@resend.dev>", to: [EMAIL], reply_to: email, subject: `${body.enquiryType === "quote" ? "Quote request" : "Portfolio enquiry"} from ${name}`, text: details}),
    });
    if (!response.ok) return NextResponse.json({error: "Email could not be sent."}, {status: 502});
    return NextResponse.json({ok: true});
  } catch {
    return NextResponse.json({error: "Invalid request."}, {status: 400});
  }
}
