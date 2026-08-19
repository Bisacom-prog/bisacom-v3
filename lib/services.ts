export const serviceDetails = {
  "ux-audit": {
    title: "UX/UI Audit",
    eyebrow: "A focused, low-risk starting point",
    price: "From £150",
    description: "Find the usability, accessibility and conversion issues making an existing website or product harder to use.",
    audience: "Founders and small businesses with a live website, feature or journey that is underperforming or generating customer confusion.",
    deliverables: ["Review of up to eight key screens", "Usability, hierarchy and responsive-design assessment", "WCAG-informed accessibility observations", "Annotated screenshots and prioritised recommendations", "30-minute findings call"],
    process: ["Share the product and primary customer task", "I review the critical journey and supporting states", "You receive findings grouped by severity and effort", "We discuss priorities and next steps"],
    duration: "Typically 3–5 working days",
  },
  "ui-ux-design": {
    title: "Figma UI Design Sprint",
    eyebrow: "From unclear idea to testable interface",
    price: "From £450",
    description: "Shape one feature or early product idea into a coherent user flow, polished interface and clickable prototype.",
    audience: "Startup founders, developers and small product teams that need a focused feature designed before development.",
    deliverables: ["Requirements and scope call", "Primary user flow and low-fidelity wireframes", "Five to eight responsive high-fidelity screens", "Reusable Figma components and states", "Clickable prototype and one revision round"],
    process: ["Clarify the user, task and constraints", "Map the minimum viable journey", "Review wireframes before visual design", "Build and refine the high-fidelity prototype"],
    duration: "Typically 1–2 weeks",
  },
  "website-design-norwich": {
    title: "Website Design & Build",
    eyebrow: "Norwich-based, available across the UK",
    price: "From £950",
    description: "A responsive business website designed and built to make enquiries, bookings or orders clearer for customers.",
    audience: "Small businesses, consultants, caterers, community organisations and startups that need more than a generic template.",
    deliverables: ["Discovery, sitemap and content priorities", "Responsive UX and visual design", "Next.js and Tailwind CSS development", "Contact, enquiry, booking or ordering journey", "Basic SEO, analytics consent, deployment and handover"],
    process: ["Agree the goal, pages and customer action", "Design the core responsive experience", "Build, test and connect content management where required", "Launch and provide a clear handover"],
    duration: "Typically 3–5 weeks",
  },
} as const;

export type ServiceSlug = keyof typeof serviceDetails;
