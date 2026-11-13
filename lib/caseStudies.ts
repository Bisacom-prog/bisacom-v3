// Long-form case studies kept in code for projects that do not have a Sanity case study yet.
// Every statement here is backed by the shipped project (its code, CMS schema and live site).
// Do not add metrics, research or testing that did not happen.

export type Shot = {src: string; alt: string; caption: string; width: number; height: number};

export type RichCaseStudy = {
  seo: {title: string; description: string; image: Shot};
  client: string;
  category: string;
  services: string[];
  status: string;
  intro: string;
  hero: {desktop: Shot; mobile: Shot};
  overview: {lead: string; goals: string[]};
  challenge: {note: string; items: {title: string; text: string}[]};
  approach: {step: string; title: string; decision: string; detail: string}[];
  showcase: {intro: string; desktop: Shot[]; mobile: Shot[]; missing?: string};
  stack: {name: string; role: string}[];
  engineering: {title: string; text: string}[];
  cms: {lead: string; sections: {name: string; fields: string}[]; decisions: string[]};
  outcome: {lead: string; deliverables: string[]; note: string};
  reflection: string[];
};

const img = (name: string, width: number, height: number, alt: string, caption: string): Shot => ({
  src: `/img/cop-norwich/${name}.webp`,
  width,
  height,
  alt,
  caption,
});

export const richCaseStudies: Record<string, RichCaseStudy> = {
  "cop-norwich": {
    seo: {
      title: "COP Norwich Case Study: Church Website Design & Build",
      description:
        "How Bismark Apenkwah designed and built copnorwich.org for The Church of Pentecost, Norwich: visitor-first UX, a Next.js front end, Sanity CMS for volunteers and Resend-powered enquiries.",
      image: img("desktop-home", 1800, 1125, "COP Norwich homepage on desktop", ""),
    },
    client: "The Church of Pentecost, Norwich Assembly",
    category: "Real client project",
    services: ["Product Design", "UX/UI Design", "Front-End Development"],
    status: "Live and deployed",
    intro:
      "A live website for The Church of Pentecost, Norwich Assembly. I designed and built it so first-time visitors can find a service and plan a visit quickly, members can follow events, livestreams and messages, and church volunteers can keep everything up to date themselves.",
    hero: {
      desktop: img("desktop-home", 1800, 1125, "COP Norwich homepage on desktop: the Encounter God headline, Plan your visit and Watch online buttons, Sunday service times and quick links", ""),
      mobile: img("mobile-home", 780, 1688, "COP Norwich homepage on a phone, with the You Belong Here welcome card and the Sunday at St. Saviour's badge", ""),
    },
    overview: {
      lead:
        "The church needed a website that works as its front door: credible to someone searching for a church in Norwich, useful to members during the week, and simple for volunteers to maintain. The site had five jobs.",
      goals: [
        "Give the church a clear, credible online presence that reflects its identity.",
        "Put service times, location and the livestream within easy reach for members and visitors.",
        "Help newcomers discover the church and plan a first visit with confidence.",
        "Make events, ministries and messages easy to publish and keep current.",
        "Offer clear routes to get in touch, ask for prayer, plan a visit or give.",
      ],
    },
    challenge: {
      note: "These challenges come from the church's brief and the content it needed to publish. No formal user research was carried out, so none is claimed.",
      items: [
        {
          title: "Several audiences, one homepage",
          text: "A first-time visitor, a regular member and someone watching from home each arrive with a different first question: when, where, what's on, or how to watch. The homepage had to answer all of them without becoming a wall of information.",
        },
        {
          title: "Information that changes every week",
          text: "Service times, weekly meetings, one-off events, livestream links and new messages change constantly. The people updating them are church volunteers, not developers, so a static site would quickly go out of date.",
        },
        {
          title: "Personal requests need care",
          text: "Prayer requests can be private. They needed explicit consent and a confidential option, and every enquiry had to reliably reach the church's own inbox.",
        },
        {
          title: "A privacy-conscious UK organisation",
          text: "Embedded services such as Google Maps can set cookies. The site needed to respect visitors' choices while still helping them find the building.",
        },
      ],
    },
    approach: [
      {
        step: "01",
        title: "Requirements understanding",
        decision: "Start from what the church has to communicate each week, and who needs it.",
        detail: "I mapped the recurring content: two Sunday services (English at 9:30am and Akan at 12:30pm), weekly prayer and midweek meetings, the livestream, ministries, contact details and the theme of the year. That gave a clear list of what had to be easy to find and what had to be easy to edit.",
      },
      {
        step: "02",
        title: "Information architecture",
        decision: "A single page ordered by visitor intent, with anchored sections the navigation mirrors.",
        detail: "The page runs from the next service and quick actions, to services, events, livestream and messages, then about, ministries, plan your visit and contact. Most visitors come with one question, so every answer is one tap away rather than buried in sub-pages.",
      },
      {
        step: "03",
        title: "User experience and navigation",
        decision: "Reduce decisions: one primary action, shortcuts for common intents, forms that open on the right tab.",
        detail: "Plan your visit stays in the header as the main call to action. A row of quick links covers the six most common intents. The Prayer Request, Give and Want to serve? links open the contact form already set to the right type, so people don't have to work out which form to use. WhatsApp is always one tap away.",
      },
      {
        step: "04",
        title: "UI design and visual hierarchy",
        decision: "Use the church's own navy, yellow and logo, and lead with what people need first.",
        detail: "Bold display type makes the page easy to scan. Service times sit directly under the hero buttons. Events use a consistent card with a date block, label and time, so a week of activity can be read at a glance.",
      },
      {
        step: "05",
        title: "Responsive interface design",
        decision: "Design mobile-first, because most people will check service times on a phone.",
        detail: "Quick links reflow from six columns to three to two. Events, livestream and messages stack into one column. Form tabs wrap, and the mobile menu becomes a full-screen list with large tap targets and the Plan your visit action at the bottom.",
      },
      {
        step: "06",
        title: "Front-end implementation",
        decision: "Build components that work out the right content themselves, so editors only enter simple rules.",
        detail: "Weekly events calculate their next date automatically, one-off events disappear once they have passed, and the livestream card switches to Live now during service times. All of this runs on UK time (Europe/London), whatever the server's time zone. If the editor is empty, the site falls back to built-in content instead of showing blank sections.",
      },
      {
        step: "07",
        title: "CMS integration",
        decision: "Shape the editor around how volunteers think, not around the database.",
        detail: "Sanity Studio is built into the site at /studio. It is organised into Site settings, Events, Messages and Ministries, with plain-language labels, examples and validation. A signed webhook refreshes the site when content is published.",
      },
      {
        step: "08",
        title: "Testing and deployment",
        decision: "Ship on a dependable pipeline with protection built in from day one.",
        detail: "The site is type-checked with TypeScript and deployed from GitHub to Vercel, with secrets held in environment variables. Security headers (including a Content Security Policy), a honeypot, per-IP rate limiting and optional Cloudflare Turnstile protect the forms.",
      },
    ],
    showcase: {
      intro: "These screens are captured from the project's production code running with its built-in content. Content that editors manage in Sanity, such as the hero photograph, may look different on the live site.",
      desktop: [
        img("desktop-home", 1800, 1125, "COP Norwich desktop homepage with headline, Plan your visit and Watch online buttons, Sunday service times and quick links", "Homepage: the next service and the two main actions come first, with quick links to the six most common tasks just below."),
        img("events-watch-sermons", 1800, 842, "Upcoming events, Watch online and Latest messages cards side by side", "Events, livestream and messages: the three things members check during the week, side by side. Dates and the Live now state update automatically."),
        img("about", 1800, 1301, "About section with the theme of the year, vision and mission cards, values and tenets", "About: the theme of the year, vision, mission, values and tenets as scannable cards instead of long prose."),
        img("ministries", 1800, 955, "Ministries grid with five ministry cards and a Want to serve? call to action", "Ministries: each one managed in Sanity, with a Want to serve? prompt that opens the contact form ready to fill in."),
        img("plan-a-visit", 1800, 734, "Plan your visit section with what to expect and a map placeholder asking permission before loading Google Maps", "Plan your visit: what to expect for newcomers. The Google map only loads after the visitor allows embedded content."),
        img("contact", 1800, 1109, "Contact section with phone, email, address, WhatsApp button and a form with General enquiry, Prayer request and Plan a visit tabs", "Contact: one form with three tabs, alongside phone, email and WhatsApp. Messages go to the church inbox."),
      ],
      mobile: [
        img("mobile-home", 780, 1688, "Mobile homepage", "Mobile homepage"),
        img("mobile-menu", 780, 1688, "Mobile full-screen navigation menu", "Full-screen menu with large tap targets"),
        img("mobile-events", 780, 1688, "Upcoming events stacked on mobile", "Events stack into a single column"),
        img("mobile-prayer-request", 780, 1688, "Prayer request form on mobile with consent and confidential options", "Prayer request with consent and a confidential option"),
      ],
      missing: "A screenshot of the Sanity Studio editor will be added here.",
    },
    stack: [
      {name: "Next.js", role: "Application framework: server-rendered pages, API routes for enquiries and content refreshes, and the embedded editor, all in one codebase."},
      {name: "TypeScript", role: "Shared types for events, messages and settings keep CMS data and the interface in step, and catch mistakes before deployment."},
      {name: "Tailwind CSS", role: "Design tokens for the church's colours and consistent responsive styling across every section."},
      {name: "Sanity", role: "Structured content editing for volunteers, including image hotspots so the hero photo crops sensibly."},
      {name: "Resend", role: "Delivers enquiries, prayer requests, visit plans and newsletter sign-ups to the church inbox, with reply-to set to the sender."},
      {name: "Vercel", role: "Hosting and deployment from GitHub, with configuration and secrets kept in environment variables."},
    ],
    engineering: [
      {title: "UK-time scheduling", text: "Event dates, the next service and the Live now state are calculated on UK time, so they stay correct regardless of where the server runs."},
      {title: "Content refresh on publish", text: "A signed Sanity webhook clears the site's cache, so published changes appear without waiting for a redeploy."},
      {title: "Spam and abuse protection", text: "A honeypot field, per-IP rate limiting and optional Cloudflare Turnstile protect the enquiry form without making real visitors solve puzzles."},
      {title: "Privacy by default", text: "A cookie choice banner, with Google Maps loaded only after consent, plus privacy and terms pages written for the church."},
      {title: "Security headers", text: "Content Security Policy, frame protection and a strict permissions policy are set for every page."},
      {title: "Search-ready", text: "Page metadata and schema.org Church structured data describe the services, address and contact details to search engines."},
    ],
    cms: {
      lead: "Routine changes, such as a new event, a new message or updated service times, no longer need a developer. Invited editors sign in to Sanity Studio at copnorwich.org/studio and publish changes themselves.",
      sections: [
        {name: "Site settings", fields: "Contact details and location, Sunday services, theme of the year, social links and livestream link, and the homepage hero image"},
        {name: "Events", fields: "Every week or a one-off date, start and end time, a short label, an icon, and a switch to show or hide the event"},
        {name: "Messages / sermons", fields: "Title, speaker, series, date preached, YouTube or Facebook link, and thumbnail"},
        {name: "Ministries", fields: "Name, a short description (up to 160 characters), an icon and display order"},
      ],
      decisions: [
        "Site settings is a single document with publish-only actions, so it can't be duplicated or deleted by mistake.",
        "Fields use plain language with examples, such as \"Start time (24h, e.g. 09:30)\", and validation catches typos before they reach the site.",
        "Icons come from a fixed list, so new events and ministries always match the design.",
        "Weekly events are entered once and repeat automatically, rather than being re-entered every week.",
      ],
    },
    outcome: {
      lead: "The church now has a complete, maintainable digital platform rather than a one-off web page.",
      deliverables: [
        "A live, responsive church website at copnorwich.org",
        "An information architecture organised around what visitors and members need",
        "Accessible visitor information: service times, directions and what to expect",
        "Communication routes for enquiries, prayer requests, visit plans, giving and serving, plus WhatsApp",
        "A content management system that volunteers can use without a developer",
        "A secure, deployed platform with privacy controls and documentation for the church",
      ],
      note: "The site launched in November 2026. It is too early for traffic or engagement figures, so none are claimed.",
    },
    reflection: [
      "Designing for a real organisation meant balancing what the church wants to say with what a visitor needs to know first. Leading with the next service and how to get there, rather than with history and beliefs, was the clearest example.",
      "The site serves different people at once: newcomers, members, people watching online and the volunteers who maintain it. Treating the editors as users too changed the outcome as much as the public pages did.",
      "Maintainability was a design decision, not an afterthought. Rules such as repeating events and automatic expiry mean the site stays accurate with very little effort.",
      "Building it myself meant every design decision had to work in code, from the live-service indicator to the form presets. That loop between design and implementation is where I do my best work.",
      "Delivering everything, including design, build, CMS, email, privacy, security and deployment, showed what it takes to hand an organisation a complete product rather than a set of screens.",
    ],
  },
};
