// To add a book, append one entry here. /books, the homepage, the sitemap and the
// landing page at /books/[slug] all read from this list.

export type BookStatus = "available" | "upcoming";

export type Book = {
  slug: string;
  title: string;
  subtitle?: string;
  series?: string;
  status: BookStatus;
  statusLabel: string;
  description: string;
  audience: string;
  cover?: {src: string; width: number; height: number; alt: string};
  purchase?: {label: string; href: string; format: "Paperback" | "EBook"; price?: string}[];
  isbn?: string;
  facts?: {value: string; label: string}[];
  intro?: {eyebrow: string; title: string; body: string};
  outcomes?: {title: string; text: string}[];
  journey?: {eyebrow: string; title: string; body: string; steps: {title: string; text: string}[]};
  contents?: {title: string; body: string; items: string[]};
  companion?: {eyebrow: string; title: string; body: string; label: string; href: string};
  closing?: {title: string; body: string};
  // The book has its own page under app/books/<slug> instead of the shared template.
  customPage?: boolean;
};

// PASTE YOUR CHECKOUT LINKS HERE. Buy buttons, checkout wording and the "Available now"
// status all appear automatically once a link is set. Leave a link empty to hide it.
export const aiBusinessSystemsLinks = {
  stripe: "", // Stripe Payment Link, e.g. https://buy.stripe.com/...
  gumroad: "https://bisacom.gumroad.com/l/ai-business-systems", // Gumroad product link, e.g. https://yourname.gumroad.com/l/...
};
export const aiBusinessSystemsPrice = "£19";

export const aiBusinessSystemsCheckout = [
  {provider: "stripe" as const, label: "Stripe", href: aiBusinessSystemsLinks.stripe},
  {provider: "gumroad" as const, label: "Gumroad", href: aiBusinessSystemsLinks.gumroad},
].filter((option) => option.href);

export const books: Book[] = [
  {
    slug: "from-beginner-to-hired",
    title: "From Beginner to Hired",
    subtitle: "Landing Your First Product Design (UX/UI) Job in the AI Era",
    series: "Bisacom Careers Series",
    status: "available",
    statusLabel: "Available now · Paperback + Kindle",
    description: "A practical career playbook for building credible portfolio evidence, using AI responsibly, preparing for interviews and approaching a first Product Design role with a repeatable system.",
    audience: "Beginners, students and career changers moving into Product Design",
    cover: {src: "/img/From-beginner.webp", width: 1433, height: 2048, alt: "From Beginner to Hired book cover by Bismark Apenkwah"},
    purchase: [
      {label: "Buy Paperback on Amazon", href: "https://www.amazon.co.uk/BEGINNER-HIRED-Landing-Product-Design/dp/B0HJDGLJJM", format: "Paperback", price: "19.99"},
      {label: "Buy Kindle on Amazon", href: "https://www.amazon.co.uk/dp/B0HJLM25GV", format: "EBook", price: "7.99"},
    ],
    isbn: "9798172735790",
    facts: [
      {value: "12", label: "Chapters"},
      {value: "30 days", label: "Action roadmap"},
      {value: "AI-ready", label: "Responsible workflows"},
    ],
    intro: {
      eyebrow: "Who this book is for",
      title: "You do not need another Figma tutorial.",
      body: "You need a clear way to understand the craft, practise it, explain your decisions and prove that you can do the work. This book is designed for people who are serious about moving from learning into evidence and action.",
    },
    outcomes: [
      {title: "Understand Product Design", text: "Learn the UX/UI foundations, methods and product thinking behind useful digital experiences."},
      {title: "Build portfolio evidence", text: "Turn projects into case studies that explain your research, decisions, trade-offs and growth."},
      {title: "Use AI responsibly", text: "Speed up repetitive work without replacing user research, critical thinking or professional judgement."},
      {title: "Prepare stronger applications", text: "Improve your CV, LinkedIn, portfolio positioning and approach to targeted Product Design roles."},
      {title: "Get interview-ready", text: "Practise case-study storytelling, common interview questions and thoughtful answers with confidence."},
      {title: "Take action for 30 days", text: "Follow a practical roadmap that converts learning into consistent portfolio, interview and job-search progress."},
    ],
    journey: {
      eyebrow: "Follow Sarah’s journey",
      title: "A career change you can see progressing.",
      body: "Sarah is the fictional career changer who carries the book from uncertainty to employability. Her progress makes the concepts concrete and keeps the career journey connected from chapter to chapter.",
      steps: [
        {title: "Curious", text: "Understand what Product Design is and where to begin."},
        {title: "Learning", text: "Build strong foundations instead of collecting tools."},
        {title: "Building", text: "Create projects, case studies and portfolio evidence."},
        {title: "Applying", text: "Prepare targeted applications and interviews."},
        {title: "Hired", text: "Turn consistent action into a credible first-role strategy."},
      ],
    },
    contents: {
      title: "From fundamentals to first-role action.",
      body: "The book moves deliberately from understanding Product Design to building evidence, preparing applications and practising interviews, with practical exercises throughout.",
      items: [
        "Product Design fundamentals",
        "The Product Design process",
        "Essential designer skills",
        "Tools and professional workflows",
        "Designing responsibly in the AI era",
        "Portfolio and case-study storytelling",
        "Applications, CV and LinkedIn",
        "UX interview preparation",
        "Career growth and continuous learning",
        "30-Day Product Design Career Roadmap",
      ],
    },
    companion: {
      eyebrow: "Free companion resource",
      title: "Start with the 30-Day Product Design Career Planner.",
      body: "Not ready for the full book yet? Use the free planner to turn your next 30 days into focused portfolio, interview and job-search actions.",
      label: "Get the free planner",
      href: "/free-planner",
    },
    closing: {
      title: "Stop guessing. Start building a career.",
      body: "Choose the format that works for you and start turning Product Design learning into credible evidence, better applications and consistent action.",
    },
  },
  {
    slug: "ai-business-systems",
    title: "AI Business Systems",
    subtitle: "The Small Business AI Operating System",
    series: "Bisacom Playbooks",
    status: aiBusinessSystemsCheckout.length ? "available" : "upcoming",
    statusLabel: aiBusinessSystemsCheckout.length ? "Available now · PDF" : "Launching soon · Not yet on sale",
    description: "A 76-page practical workbook that helps you turn occasional AI use into 20 repeatable business systems, with reusable prompts, worksheets and a 30-Day Implementation Plan.",
    audience: "Solo founders, freelancers, creators and small business owners",
    cover: {src: "/ai-business-systems/cover.webp", width: 911, height: 1287, alt: "AI Business Systems workbook cover, 2026 Edition, by Bismark Apenkwah"},
    customPage: true,
  },
];

export const getBook = (slug: string) => books.find((book) => book.slug === slug);

export const bookHref = (book: Book) => `/books/${book.slug}`;

export const notifyHref = (book: Book) =>
  `mailto:hello@bisacom.dev?subject=${encodeURIComponent(`Tell me when ${book.title} is published`)}`;
