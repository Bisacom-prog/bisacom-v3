# Ebook launch section

Added between Insights and Client Feedback on the homepage, accessible at /#book.
Uses the supplied KDP front cover, extracted as a web-optimised image, and supports
mobile layouts and the existing light/dark themes.

## Install this update

Merge these files into your existing portfolio, preserving your environment settings:

- app/page.tsx
- app/api/ebook-waitlist/route.ts
- app/privacy-policy/page.tsx
- components/EbookWaitlist.tsx
- lib/ebook.ts
- public/img/from-beginner-to-hired.webp
- public/downloads/career-planner.pdf

The ZIP also contains the rest of your supplied source. No package changes are required.
Local credentials, installed dependencies and generated build output are excluded.
Run npm ci and npm run build, then deploy through your existing Vercel workflow.
This update has not been deployed to your live website.

## Enable signups

The endpoint uses your existing Resend setup. Ensure these are configured in Vercel:

- RESEND_API_KEY
- CONTACT_FROM_EMAIL (a sender on your verified Resend domain)

Each successful signup sends a record to hello@bisacom.dev, including the email
address and consent wording/version. This is an inbox-managed list, not a mailing
platform subscriber database. Filter emails by the subject “Book launch list — From
Beginner to Hired”. Manage launch sends and unsubscribe requests manually. Do not
send unrelated marketing to these addresses. Use a dedicated subscription platform
if the list grows; this endpoint includes a honeypot and retry deduplication, but
not a distributed rate limiter or double opt-in.

The form shows an error if the service is unavailable. It never reports a signup
as successful when Resend rejects the request. Provider acceptance does not prove
inbox delivery. Before launch, make a real signup with an address you control and
check that the record arrives. No live emails were sent during development.

## Planner delivery is configured

The nine-page roadmap is extracted from printed pages 162–170 (PDF pages
171–179). It includes the chapter introduction and all Day 1–30 actions, ending
with the Day 30 checklist. The subsequent AI coaching box, workshop and chapter
recap have been removed. Original formatting and page numbers
are preserved. The full book is not included in the website download folder.

The PDF is included at public/downloads/career-planner.pdf. The plannerUrl in
lib/ebook.ts is set to https://bisacom.dev/downloads/career-planner.pdf.
The form now offers “Send Me the Free Planner”. New signups trigger a Resend
batch containing the planner download email and your inbox signup record.

To activate on the live portfolio:

1. Deploy these updated files to the existing Vercel project.
2. Confirm RESEND_API_KEY and CONTACT_FROM_EMAIL are configured in Vercel.
3. Open https://bisacom.dev/downloads/career-planner.pdf and confirm it loads.
4. Sign up with your own address and verify the planner email and inbox record.

Deployment and live delivery have not been performed from this workspace.
Existing signups must be sent the planner separately; no subscriber addresses
were supplied. The download URL is public, not gated. Unsubscribe requests remain
managed by email, as stated on the form and in the delivery email.

## Content and status

The copy assumes the book is awaiting release. Once it is available, replace the
launch offer with a purchase link and retain the planner as an optional offer.
The section is separate from the rest of the homepage for easier future edits.

## Verification

TypeScript check passed. Production build and mocked API checks were run.
Mock checks covered invalid input, absent consent, spam trap, cross-origin requests,
missing email configuration, successful signup, planner email payload and provider
failure. No browser visual test or live email delivery test was performed.

Email integration reference: https://resend.com/docs/api-reference/emails/send-batch-emails
Retry handling: https://resend.com/docs/dashboard/emails/idempotency-keys
