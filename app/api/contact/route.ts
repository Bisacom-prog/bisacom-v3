import {NextResponse} from "next/server";
import {guardFormRequest} from "@/lib/request-guard";

const EMAIL = "bapenkwah@gmail.com";

function text(value: unknown, max = 2000) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

// Sends project enquiries to the LeadFlow AI workflow in n8n (analysis, scoring, sheet, approval).
// Server-side only, so LEADFLOW_KEY never reaches the browser. Returns true if LeadFlow accepted it.
async function forwardToLeadFlow(lead: {name: string; email: string; message: string; body: Record<string, unknown>}) {
  const url = process.env.LEADFLOW_WEBHOOK_URL;
  const key = process.env.LEADFLOW_KEY;
  if (!url || !key) return false;
  const {body} = lead;
  const context = [
    body.business ? `Business: ${text(body.business, 160)}` : "",
    body.currentWebsite ? `Current website: ${text(body.currentWebsite, 300)}` : "",
    body.timeline ? `Timeline: ${text(body.timeline, 120)}` : "",
  ].filter(Boolean).join("\n");
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {"Content-Type": "application/json", "X-LeadFlow-Key": key},
      body: JSON.stringify({
        name: lead.name,
        email: lead.email,
        phone: text(body.phone, 40),
        service: text(body.service, 120),
        budget: text(body.budget, 80),
        message: context ? `${lead.message}\n\n${context}` : lead.message,
        source: "bisacom.dev",
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) console.error(`LeadFlow webhook returned ${response.status}`);
    return response.ok;
  } catch (error) {
    console.error("LeadFlow webhook failed", error);
    return false;
  }
}

export async function POST(request: Request) {
  const blocked = guardFormRequest(request, "contact");
  if (blocked) return blocked;
  try {
    const body = await request.json();
    if (text(body.website)) return NextResponse.json({ok: true});
    const name = text(body.name, 120);
    const email = text(body.email, 200);
    const message = text(body.message);
    if (!name || !/^\S+@\S+\.\S+$/.test(email) || message.length < 20) {
      return NextResponse.json({error: "Please complete all required fields."}, {status: 400});
    }
    // Only project enquiries go to LeadFlow; role/recruiter messages should not get an automated sales reply.
    const leadFlow = body.enquiryType === "quote" ? forwardToLeadFlow({name, email, message, body}) : Promise.resolve(false);
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured");
      if (await leadFlow) return NextResponse.json({ok: true});
      return NextResponse.json({error: "Email service is not configured."}, {status: 503});
    }
    const details = [
      `Type: ${text(body.enquiryType, 30) || "contact"}`,
      `Name: ${name}`,
      `Email: ${email}`,
      body.business ? `Business: ${text(body.business, 160)}` : "",
      body.currentWebsite ? `Current website: ${text(body.currentWebsite, 300)}` : "",
      body.service ? `Service: ${text(body.service, 120)}` : "",
      body.budget ? `Budget: ${text(body.budget, 80)}` : "",
      body.timeline ? `Timeline: ${text(body.timeline, 120)}` : "",
      "",
      message,
    ].filter(Boolean).join("\n");
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json"},
      body: JSON.stringify({from: process.env.CONTACT_FROM_EMAIL || "Bisacom Portfolio <onboarding@resend.dev>", to: [EMAIL], reply_to: email, subject: `${body.enquiryType === "quote" ? `Quote request${body.business ? ` — ${text(body.business, 80)}` : ""}` : "Portfolio enquiry"} from ${name}`, text: details}),
    });
    const leadFlowOk = await leadFlow;
    if (!response.ok && !leadFlowOk) return NextResponse.json({error: "Email could not be sent."}, {status: 502});
    return NextResponse.json({ok: true});
  } catch {
    return NextResponse.json({error: "Invalid request."}, {status: 400});
  }
}
