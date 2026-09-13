import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const AMAZON_PAPERBACK_URL = "https://www.amazon.co.uk/BEGINNER-HIRED-Landing-Product-Design/dp/B0HJDGLJJM";
const AMAZON_KINDLE_URL = "https://www.amazon.co.uk/dp/B0HJLM25GV";
const PLANNER_URL = "/free-planner";

export const metadata: Metadata = {
  title: "From Beginner to Hired | Product Design Career Playbook | Bisacom",
  description:
    "From Beginner to Hired is a practical Product Design career playbook for building your portfolio, using AI responsibly, preparing for interviews, and landing your first UX/UI role.",
  alternates: {
    canonical: "/from-beginner-to-hired",
  },
  openGraph: {
    title: "From Beginner to Hired — Bismark Apenkwah",
    description:
      "A practical Product Design career playbook for beginners and career changers. Available in Paperback and Kindle.",
    url: "https://bisacom.dev/from-beginner-to-hired",
    type: "book",
    images: [
      {
        url: "/img/From-beginner.webp",
        width: 1433,
        height: 2048,
        alt: "From Beginner to Hired book cover by Bismark Apenkwah",
      },
    ],
  },
};

const outcomes = [
  {
    title: "Understand Product Design",
    text: "Learn the UX/UI foundations, methods and product thinking behind useful digital experiences.",
  },
  {
    title: "Build portfolio evidence",
    text: "Turn projects into case studies that explain your research, decisions, trade-offs and growth.",
  },
  {
    title: "Use AI responsibly",
    text: "Speed up repetitive work without replacing user research, critical thinking or professional judgement.",
  },
  {
    title: "Prepare stronger applications",
    text: "Improve your CV, LinkedIn, portfolio positioning and approach to targeted Product Design roles.",
  },
  {
    title: "Get interview-ready",
    text: "Practise case-study storytelling, common interview questions and thoughtful answers with confidence.",
  },
  {
    title: "Take action for 30 days",
    text: "Follow a practical roadmap that converts learning into consistent portfolio, interview and job-search progress.",
  },
];

const sarahJourney = [
  ["01", "Curious", "Understand what Product Design is and where to begin."],
  ["02", "Learning", "Build strong foundations instead of collecting tools."],
  ["03", "Building", "Create projects, case studies and portfolio evidence."],
  ["04", "Applying", "Prepare targeted applications and interviews."],
  ["05", "Hired", "Turn consistent action into a credible first-role strategy."],
];

const chapters = [
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
];

function AmazonButton({ href, children, secondary = false }: { href: string; children: React.ReactNode; secondary?: boolean }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={
        secondary
          ? "inline-flex min-h-12 items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-bold text-slate-950 transition hover:border-violet-400 hover:text-violet-700 dark:border-white/15 dark:bg-white/5 dark:text-white"
          : "inline-flex min-h-12 items-center justify-center rounded-full bg-violet-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-violet-600/20 transition hover:bg-violet-500"
      }
    >
      {children}
    </a>
  );
}

export default function FromBeginnerToHiredPage() {
  const bookSchema = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: "From Beginner to Hired",
    author: {
      "@type": "Person",
      name: "Bismark Apenkwah",
      url: "https://bisacom.dev",
    },
    description:
      "Landing Your First Product Design (UX/UI) Job in the AI Era — a practical career playbook for building your portfolio, using AI responsibly, and getting hired.",
    inLanguage: "en-GB",
    image: "https://bisacom.dev/img/From-beginner.webp",
    isbn: "9798172735790",
    bookFormat: ["https://schema.org/Paperback", "https://schema.org/EBook"],
    publisher: {
      "@type": "Organization",
      name: "Bisacom",
      url: "https://bisacom.dev",
    },
    offers: [
      {
        "@type": "Offer",
        url: AMAZON_PAPERBACK_URL,
        availability: "https://schema.org/InStock",
        price: "19.99",
        priceCurrency: "GBP",
      },
      {
        "@type": "Offer",
        url: AMAZON_KINDLE_URL,
        availability: "https://schema.org/InStock",
        price: "7.99",
        priceCurrency: "GBP",
      },
    ],
  };

  return (
    <main className="overflow-hidden bg-white text-slate-950 dark:bg-[#080714] dark:text-white">
      <header className="border-b border-slate-200/80 bg-white/95 px-6 py-4 backdrop-blur dark:border-white/10 dark:bg-[#080714]/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <Link href="/" className="inline-flex items-center gap-3 font-black tracking-tight">
            <Image src="/img/Bisacom.webp" alt="Bisacom" width={36} height={36} className="rounded-lg" />
            <span>Bisacom</span>
          </Link>
          <nav className="flex items-center gap-4 text-sm font-bold" aria-label="Book page navigation">
            <Link href="/free-planner" className="text-violet-700 hover:text-violet-500 dark:text-violet-300">Free planner</Link>
            <Link href="/" className="text-slate-600 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white">Portfolio</Link>
          </nav>
        </div>
      </header>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bookSchema) }}
      />

      <section className="relative border-b border-slate-200/80 px-6 pb-20 pt-12 dark:border-white/10 lg:pb-28 lg:pt-20">
        <div className="pointer-events-none absolute inset-0 -z-0 bg-[radial-gradient(circle_at_75%_20%,rgba(124,92,255,0.16),transparent_30%),radial-gradient(circle_at_15%_70%,rgba(59,130,246,0.10),transparent_28%)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_.75fr] lg:gap-20">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-violet-700 dark:border-violet-400/20 dark:bg-violet-400/10 dark:text-violet-300">
              Now available · Paperback + Kindle
            </div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-violet-600 dark:text-violet-400">Bisacom Careers Series</p>
            <h1 className="mt-5 max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.055em] sm:text-6xl lg:text-8xl">
              From Beginner
              <span className="block bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">to Hired.</span>
            </h1>
            <h2 className="mt-7 max-w-3xl text-xl font-bold leading-snug sm:text-2xl">
              Landing Your First Product Design (UX/UI) Job in the AI Era
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">
              A practical career playbook for beginners, students and career changers who want to build credible portfolio evidence, use AI responsibly and approach their first Product Design role with a repeatable system.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <AmazonButton href={AMAZON_PAPERBACK_URL}>Buy Paperback on Amazon</AmazonButton>
              <AmazonButton href={AMAZON_KINDLE_URL} secondary>Buy Kindle on Amazon</AmazonButton>
              <Link
                href={PLANNER_URL}
                className="inline-flex min-h-12 items-center justify-center rounded-full px-5 py-3 text-sm font-bold text-violet-700 underline decoration-violet-300 underline-offset-4 hover:text-violet-500 dark:text-violet-300"
              >
                Get the free 30-Day Planner
              </Link>
            </div>

            <div className="mt-9 grid max-w-2xl grid-cols-3 gap-3 border-t border-slate-200 pt-6 text-sm dark:border-white/10">
              <div><strong className="block text-xl">12</strong><span className="text-slate-500 dark:text-slate-400">Chapters</span></div>
              <div><strong className="block text-xl">30 days</strong><span className="text-slate-500 dark:text-slate-400">Action roadmap</span></div>
              <div><strong className="block text-xl">AI-ready</strong><span className="text-slate-500 dark:text-slate-400">Responsible workflows</span></div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[440px] lg:mx-0 lg:justify-self-end">
            <div className="absolute -inset-8 -z-10 rounded-[48px] bg-violet-500/15 blur-3xl" />
            <Image
              src="/img/From-beginner.webp"
              alt="From Beginner to Hired by Bismark Apenkwah"
              width={1433}
              height={2048}
              priority
              className="h-auto w-full rounded-[28px] shadow-2xl shadow-slate-950/20 ring-1 ring-black/5 dark:ring-white/10"
            />
          </div>
        </div>
      </section>

      <section className="px-6 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-violet-600 dark:text-violet-400">Who this book is for</p>
            <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">You do not need another Figma tutorial.</h2>
            <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">
              You need a clear way to understand the craft, practise it, explain your decisions and prove that you can do the work. This book is designed for people who are serious about moving from learning into evidence and action.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {outcomes.map((item, index) => (
              <article key={item.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-7 dark:border-white/10 dark:bg-white/[0.035]">
                <span className="text-xs font-black tracking-[0.18em] text-violet-600 dark:text-violet-400">0{index + 1}</span>
                <h3 className="mt-4 text-xl font-black">{item.title}</h3>
                <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0b0920] px-6 py-20 text-white lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[.65fr_1.35fr] lg:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-violet-300">Follow Sarah's journey</p>
              <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">A career change you can see progressing.</h2>
              <p className="mt-5 max-w-xl leading-7 text-slate-300">
                Sarah is the fictional career changer who carries the book from uncertainty to employability. Her progress makes the concepts concrete and keeps the career journey connected from chapter to chapter.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-5">
              {sarahJourney.map(([step, title, text]) => (
                <div key={step} className="rounded-2xl border border-white/10 bg-white/[0.055] p-5">
                  <span className="text-xs font-black text-violet-300">{step}</span>
                  <h3 className="mt-3 font-black">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-violet-600 dark:text-violet-400">Inside the book</p>
            <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">From fundamentals to first-role action.</h2>
            <p className="mt-5 max-w-xl leading-7 text-slate-600 dark:text-slate-300">
              The book moves deliberately from understanding Product Design to building evidence, preparing applications and practising interviews — with practical exercises throughout.
            </p>
          </div>
          <div className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
            {chapters.map((item, index) => (
              <div key={item} className="flex gap-4 border-b border-slate-200 pb-4 dark:border-white/10">
                <span className="font-black text-violet-600 dark:text-violet-400">{String(index + 1).padStart(2, "0")}</span>
                <span className="font-semibold leading-6">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-20 lg:pb-28">
        <div className="mx-auto grid max-w-7xl gap-8 rounded-[36px] border border-violet-200 bg-gradient-to-br from-violet-50 to-white p-8 dark:border-violet-400/15 dark:from-violet-500/10 dark:to-transparent sm:p-12 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-violet-600 dark:text-violet-400">Free companion resource</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Start with the 30-Day Product Design Career Planner.</h2>
            <p className="mt-4 max-w-3xl leading-7 text-slate-600 dark:text-slate-300">
              Not ready for the full book yet? Use the free planner to turn your next 30 days into focused portfolio, interview and job-search actions. When you want the complete system behind those actions, continue with <em>From Beginner to Hired</em>.
            </p>
          </div>
          <Link href={PLANNER_URL} className="book-cta-dark inline-flex min-h-12 items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-bold text-white hover:bg-violet-600 dark:bg-white dark:text-slate-950 dark:hover:bg-violet-300">
            Get the free planner
          </Link>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 px-6 py-20 dark:border-white/10 dark:bg-white/[0.025] lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[.7fr_1.3fr] lg:items-center">
          <div>
            <span className="text-sm font-bold uppercase tracking-[0.18em] text-violet-600 dark:text-violet-400">About the author</span>
            <h2 className="mt-3 text-3xl font-black">Bismark Apenkwah</h2>
            <p className="mt-1 font-semibold text-slate-500 dark:text-slate-400">Product Designer · Front-End Developer · Bisacom</p>
          </div>
          <p className="max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            Bismark Apenkwah is a Product Designer and Front-End Developer based in Norwich, UK. Through Bisacom, he creates practical digital products and resources that help aspiring designers build real-world skills and confidence. <em>From Beginner to Hired</em> was created to bridge the gap between learning UX/UI and becoming job-ready.
          </p>
        </div>
      </section>

      <section className="px-6 py-20 text-center lg:py-28">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-violet-600 dark:text-violet-400">Available now on Amazon</p>
          <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">Stop guessing. Start building a career.</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            Choose the format that works for you and start turning Product Design learning into credible evidence, better applications and consistent action.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <AmazonButton href={AMAZON_PAPERBACK_URL}>Buy Paperback on Amazon</AmazonButton>
            <AmazonButton href={AMAZON_KINDLE_URL} secondary>Buy Kindle on Amazon</AmazonButton>
          </div>
        </div>
      </section>
    </main>
  );
}
