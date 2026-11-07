export const serviceDetails = {
  "ux-audit": {
    title: "UX/UI Audit",
    eyebrow: "A focused, low-risk starting point",
    price: "From £150",
    summary: "Find what’s making your site or product harder to use.",
    bestFor: "Live sites losing enquiries",
    description: "Find the usability, accessibility and conversion issues making an existing website or product harder to use.",
    audience: "Founders and small businesses with a live website, feature or journey that is underperforming or generating customer confusion.",
    deliverables: ["Review of up to eight key screens", "Usability, hierarchy and responsive-design assessment", "WCAG-informed accessibility observations", "Annotated screenshots and prioritised recommendations", "30-minute findings call"],
    process: ["Share the product and primary customer task", "I review the critical journey and supporting states", "You receive findings grouped by severity and effort", "We discuss priorities and next steps"],
    duration: "Typically 3–5 working days",
    caseStudy: undefined as {label: string; href: string} | undefined,
  },
  "ui-ux-design": {
    title: "Figma UI Design Sprint",
    eyebrow: "From unclear idea to testable interface",
    price: "From £450",
    summary: "One feature or idea, shaped into a clickable prototype.",
    bestFor: "Founders before development",
    description: "Shape one feature or early product idea into a coherent user flow, polished interface and clickable prototype.",
    audience: "Startup founders, developers and small product teams that need a focused feature designed before development.",
    deliverables: ["Requirements and scope call", "Primary user flow and low-fidelity wireframes", "Five to eight responsive high-fidelity screens", "Reusable Figma components and states", "Clickable prototype and one revision round"],
    process: ["Clarify the user, task and constraints", "Map the minimum viable journey", "Review wireframes before visual design", "Build and refine the high-fidelity prototype"],
    duration: "Typically 1–2 weeks",
    caseStudy: {label: "ShiftFlow case study", href: "/projects/short-notice-shift-coverage"} as {label: string; href: string} | undefined,
  },
  "website-design-norwich": {
    title: "Website Design & Build",
    eyebrow: "Norwich-based, available across the UK",
    price: "From £950",
    summary: "A responsive site that turns visits into enquiries, bookings or orders.",
    bestFor: "Local and service businesses",
    description: "A responsive business website designed and built to make enquiries, bookings or orders clearer for customers.",
    audience: "Small businesses, consultants, caterers, community organisations and startups that need more than a generic template.",
    deliverables: ["Discovery, sitemap and content priorities", "Responsive UX and visual design", "Next.js and Tailwind CSS development", "Contact, enquiry, booking or ordering journey", "Basic SEO, analytics consent, deployment and handover", "Two revision rounds and 30 days of post-launch support"],
    process: ["Agree the goal, pages and customer action", "Design the core responsive experience", "Build, test and connect content management where required", "Launch and provide a clear handover"],
    duration: "Typically 3–5 weeks",
    caseStudy: {label: "Ma Adjo’s Kitchen case study", href: "/projects/ma-adjo-s-kitchen"} as {label: string; href: string} | undefined,
  },
} as const;

export type ServiceSlug = keyof typeof serviceDetails;

export const serviceFaqs = [
  {q: "What does “from” mean in the prices?", a: "It’s the price for the defined scope shown. If you need more screens or pages, I’ll quote the difference in writing before any work starts."},
  {q: "How many revisions are included?", a: "The design sprint includes one revision round. Website projects include two revision rounds. Audits finish with a findings call where we agree priorities together."},
  {q: "How does payment work?", a: "50% to start and 50% on delivery."},
  {q: "Who owns the website, code and domain?", a: "You do. The code, content and domain are yours once the project is paid in full."},
  {q: "What happens after launch?", a: "Website projects include 30 days of post-launch support for fixes and small adjustments. Ongoing help can be arranged after that."},
  {q: "Do you work with clients outside Norwich?", a: "Yes. I work with clients across the UK and internationally, including in Ghana. Everything runs remotely, with calls and shared prototypes."},
];
