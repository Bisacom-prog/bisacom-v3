export type ProjectStatus = "shipped" | "concept" | "research" | "prototype";

export const statusLabels: Record<ProjectStatus, string> = {
  shipped: "Shipped client product",
  concept: "Concept product",
  research: "Research-led concept",
  prototype: "Interactive prototype",
};

export type FeaturedProject = {
  slug: string;
  title: string;
  category: string;
  statuses: ProjectStatus[];
  description: string;
  role: string;
  tools: string[];
  problem: string;
  approach: string;
  outcome: string;
  image: string;
  imageAlt: string;
  imageSize?: [number, number];
  liveUrl?: string;
  // Evidence shown on cards and case studies. Only verifiable facts: what shipped, how fast, for whom.
  evidence?: {value: string; label: string}[];
  shipped?: string[];
  quote?: {text: string; author: string};
  // What a concept project explores. Drawn from the published case study, not from testing.
  highlights?: string[];
};

// Copy is drawn from the published case studies in Sanity. Keep outcome statements verifiable.
export const featuredProjects: FeaturedProject[] = [
  {
    slug: "cop-norwich",
    title: "COP Norwich",
    category: "Church website with editor-managed content",
    statuses: ["shipped"],
    description: "A responsive website for The Church of Pentecost, Norwich Assembly, designed and built so visitors can find service times, watch online and get in touch, while church volunteers keep the content up to date themselves.",
    role: "Product Designer & Front-End Developer",
    tools: ["Next.js", "TypeScript", "Tailwind CSS", "Sanity", "Resend", "Vercel"],
    problem: "Members and first-time visitors need one dependable place for service times, events, sermons and contact details, kept current by church volunteers rather than a developer.",
    approach: "A visitor-first homepage with quick links, a livestream card that flags when a service is live, and Sanity Studio so editors manage events, sermons, ministries and church settings.",
    outcome: "Live at copnorwich.org since November 2026. It is too new for usage figures, so none are claimed.",
    image: "/img/cop-norwich.webp",
    imageSize: [1800, 1125],
    imageAlt: "The Church of Pentecost Norwich Assembly website on desktop and mobile, with the Encounter God hero, service times and quick links",
    liveUrl: "https://www.copnorwich.org",
    evidence: [
      {value: "Live", label: "copnorwich.org"},
      {value: "Editor-managed", label: "Events, sermons and ministries in Sanity"},
      {value: "Visitor-first", label: "Service times, livestream, directions"},
    ],
    shipped: [
      "Service times, directions and map for first-time visitors",
      "Livestream card that flags when a service is live",
      "Weekly and one-off events, with past events hidden automatically",
      "Sermon list linking to YouTube and Facebook",
      "Prayer requests, giving and enquiries sent to the church inbox",
      "Sanity Studio so volunteers update content without a developer",
    ],
  },
  {
    slug: "ma-adjo-s-kitchen",
    title: "Ma Adjo’s Kitchen",
    category: "Responsive ordering and catering website",
    statuses: ["shipped"],
    description: "A mobile-first ordering and catering website for a Norwich-based food business, designed and built solo from UX through to production.",
    role: "Product Designer & Front-End Developer",
    tools: ["Figma", "Next.js", "TypeScript", "Tailwind CSS", "Sanity", "Vercel"],
    problem: "Ordering relied on a phone-only journey, with no structured way to browse a menu, check allergens or enquire about catering.",
    approach: "Structured ordering, allergen guidance and event enquiries, with the owner controlling menu content directly through the CMS.",
    outcome: "Live and in use. Customer usage data is not yet available, so no conversion figures are claimed.",
    image: "/img/kitchen-v2.webp",
    imageSize: [1800, 1292],
    imageAlt: "Ma Adjo’s Kitchen website shown on desktop and mobile, with the Authentic African Home Cooking hero and menu categories",
    liveUrl: "https://ma-adjos-kitchen.vercel.app/",
    evidence: [
      {value: "UX → live", label: "Designed and built solo"},
      {value: "Owner-managed", label: "Menu edited in Sanity"},
      {value: "Mobile-first", label: "Ordering + catering"},
    ],
    shipped: ["Browsable menu with allergen guidance", "Structured ordering journey", "Catering and event enquiry flow", "CMS so the owner updates the menu without a developer"],
    quote: {text: "Makes ordering and catering enquiries easy.", author: "Ma Adjo, owner"},
  },
  {
    slug: "nextage-consult",
    title: "NextAge Consult",
    category: "Programme and registration website",
    statuses: ["shipped"],
    description: "A responsive website for a Ghanaian training organisation, designed and built solo in two weeks, turning poster-led promotion into structured online registration.",
    role: "Product Design Engineer",
    tools: ["Next.js", "TypeScript", "Tailwind CSS", "Sanity", "Resend", "Vercel"],
    problem: "Prospective learners had to phone or email to find out about programmes or register, working from a single cohort poster.",
    approach: "A programme catalogue, registration tied to the live programme list, and an embedded CMS so the team manages its own content.",
    outcome: "Live, with enquiries delivered to the team’s inbox. Newly launched, so no usage figures are claimed.",
    image: "/img/nextage.webp",
    imageAlt: "NextAge Consult home page with the Raising Solution Providers headline and a photo of learners with their mentor",
    liveUrl: "https://nextage-six.vercel.app",
    evidence: [
      {value: "2 weeks", label: "Design to launch, solo"},
      {value: "Posters → forms", label: "Online registration"},
      {value: "Inbox-ready", label: "Enquiries via Resend"},
    ],
    shipped: ["Programme catalogue", "Registration tied to the live programme list", "Enquiries delivered straight to the team’s inbox", "Embedded CMS so the team manages its own content"],
  },
  {
    slug: "mobile-mechanic-app",
    title: "Mobile Mechanic",
    category: "AI-assisted roadside help, iOS",
    statuses: ["concept", "prototype"],
    description: "A roadside app that lets stranded drivers request help in two steps. A mechanic is dispatched first, while AI gathers diagnostic details during the wait.",
    role: "Product Designer",
    tools: ["Figma", "FigJam", "Photoshop"],
    problem: "Drivers asking for help are stressed and short of time, so every extra decision works against them.",
    approach: "Dispatch before diagnosis, low-cognitive-load interaction, and clear feedback from request through to live tracking.",
    outcome: "End-to-end UX, design system and motion prototype. A solo concept that has not been launched.",
    image: "/img/mobile.webp",
    imageAlt: "Three Mobile Mechanic iPhone screens showing the splash screen, the assigned mechanic with AI vehicle diagnosis, and mechanic accepted",
    highlights: ["Problem definition for stressed drivers", "Mechanic matching and dispatch", "Live tracking and repair progress", "AI-assisted diagnosis during the wait"],
  },
  {
    slug: "short-notice-shift-coverage",
    title: "ShiftFlow",
    category: "B2B SaaS, complex workflow",
    statuses: ["research", "prototype"],
    description: "A role-based workflow that takes shift-based teams from an unexpected absence to a confirmed replacement, with everyone affected notified.",
    role: "Product Designer",
    tools: ["Figma", "FigJam"],
    problem: "Short-notice absence is a recurring operational problem in shift-based work, and finding cover spreads across too many steps.",
    approach: "One workflow connecting absence reporting, suitable-staff matching, cover requests, manager confirmation and rota updates.",
    outcome: "Defined MVP and interactive prototype. Not tested in a live organisation, so no business impact is claimed.",
    image: "/img/shift-coverage.png",
    imageAlt: "Shift coverage dashboard showing one uncovered shift that requires attention and a table of recent coverage activity",
    highlights: ["Absence reporting to confirmed cover", "Manager (desktop) and employee (mobile) roles", "Suitable-staff matching and cover requests", "Rota updates and notifications"],
  },
];

export function statusesForCaseStudy(slug: string, projectType?: string): ProjectStatus[] {
  const featured = featuredProjects.find((project) => project.slug === slug);
  if (featured) return featured.statuses;
  if (projectType === "client" || projectType === "freelance") return ["shipped"];
  return ["concept"];
}
