export const siteConfig = {
  name: "Bisacom",
  personName: "Bismark Apenkwah",
  title: "Bismark Apenkwah | Product Designer + Design Engineer, UK",
  description: "Portfolio of Bismark Apenkwah, a Product Designer and Design Engineer in Norwich, UK, designing and building SaaS platforms, web applications, AI-assisted products and responsive websites.",
  url: "https://www.bisacom.dev",
  email: "hello@bisacom.dev",
  location: "Norwich, United Kingdom",
  locale: "en_GB",
  linkedIn: "https://uk.linkedin.com/in/bismarkapenkwah",
  github: "https://github.com/Bisacom-prog",
  // Set open to false to remove every availability statement from the site.
  availability: {
    open: true,
    label: "Open to Product Design and Design Engineering roles",
    detail: "Available for full-time remote roles, with immediate availability from the UK.",
  },
} as const;

export const primaryNav = [
  {label: "Projects", href: "/#projects"},
  {label: "About", href: "/#about"},
  {label: "Capabilities", href: "/#capabilities"},
  {label: "Books", href: "/books"},
  {label: "Contact", href: "/#contact"},
] as const;
