export const siteConfig = {
  name: "Bisacom",
  personName: "Bismark Apenkwah",
  title: "Bismark Apenkwah | Product Designer + Design Engineer, UK",
  description: "Portfolio of Bismark Apenkwah, a Product Designer and Design Engineer in Norwich, UK, designing and building SaaS platforms, web applications, AI-assisted products and responsive websites.",
  url: "https://www.bisacom.dev",
  email: "bapenkwah@gmail.com",
  location: "Norwich, United Kingdom",
  locale: "en_GB",
  linkedIn: "https://uk.linkedin.com/in/bismarkapenkwah",
  github: "https://github.com/Bisacom-prog",
  // Replace public/cv/Bismark-Apenkwah-CV.pdf to update the CV; every "Download CV" button uses this.
  cvUrl: "/cv/Bismark-Apenkwah-CV.pdf",
  cvIsPdf: true,
  designingSince: 2020,
  responseTime: "within 1 working day",
  // No booking tool yet, so the "15-minute call" buttons open a pre-filled email.
  callHref: "mailto:bapenkwah@gmail.com?subject=Discovery%20call%20request&body=Hi%20Bismark%2C%20I%27d%20like%20to%20book%20a%2015-minute%20call.%20A%20few%20times%20that%20suit%20me%3A%20",
  whatsApp: "https://wa.me/447555824637?text=Hello%20Bismark%2C%20I%27d%20like%20to%20discuss%20a%20project.",
  // Set open to false to remove every availability statement from the site.
  availability: {
    open: true,
    label: "Open to Product Design and Design Engineering roles",
    detail: "Available for full-time remote roles, with immediate availability from the UK.",
  },
} as const;

export const primaryNav = [
  {label: "Work", href: "/#projects"},
  {label: "Services", href: "/services"},
  {label: "About", href: "/#about"},
  {label: "Books", href: "/books"},
  {label: "Contact", href: "/#contact"},
] as const;
