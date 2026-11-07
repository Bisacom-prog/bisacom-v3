import type {Metadata} from "next";
import Link from "next/link";
import {Stars, averageRating} from "@/components/home/ReviewGrid";
import {getApprovedReviews} from "@/lib/reviews";
import {serviceDetails, serviceFaqs} from "@/lib/services";
import {siteConfig} from "@/lib/site";

export const revalidate = 300;

const title = "Freelance UI/UX Design & Website Services";
const description = "UX audits from £150, Figma UI design sprints from £450 and responsive Next.js websites from £950, from a Norwich-based freelance product designer.";
const ogImage = {url: "/img/kitchen-v2.webp", width: 1800, height: 1292, alt: "Ma Adjo’s Kitchen website on desktop and mobile, designed and built by Bisacom"};

export const metadata: Metadata = {
  title,
  description,
  alternates: {canonical: "/services"},
  openGraph: {title, description, url: "/services", type: "website", images: [ogImage]},
  twitter: {card: "summary_large_image", title, description, images: [ogImage.url]},
};

const steps = [
  ["Free 15-minute call", "What isn’t working, who it’s for and what success looks like."],
  ["Fixed proposal", "Scope, timeline and price agreed in writing before anything starts."],
  ["Design and build", "Regular check-ins, with work you can click through early."],
  ["Launch and handover", "Tested, documented and yours to run."],
];

const featured = "website-design-norwich";

export default async function ServicesPage() {
  const reviews = await getApprovedReviews();
  const average = averageRating(reviews);
  const spotlight = reviews.find((r) => /flower/i.test(r.company ?? "")) ?? reviews[0];
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: serviceFaqs.map(({q, a}) => ({"@type": "Question", name: q, acceptedAnswer: {"@type": "Answer", text: a}})),
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 dark:bg-[#050914] dark:text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(faqData)}} />

      <section className="bg-[#050914] px-6 pb-20 pt-20 text-white lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="eyebrow !text-blue-300">Freelance services · Norwich, available across the UK</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black leading-[1.05] tracking-[-.04em] md:text-6xl">Practical ways to improve, design or launch your digital product.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">Pick a defined starting point. Final scope, timing and price are confirmed after a free 15-minute call.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={siteConfig.callHref} className="focus-ring btn-lift rounded-xl bg-blue-600 px-6 py-4 text-center text-sm font-bold">Book a free 15-minute call</a>
            <a href="#packages" className="focus-ring rounded-xl border border-white/15 px-6 py-4 text-center text-sm font-bold">Compare packages ↓</a>
          </div>
          <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-slate-400">
            {reviews.length > 0 && <li className="flex items-center gap-2"><Stars rating={average} /><b className="text-white">{average.toFixed(1)}</b> from {reviews.length} clients</li>}
            <li><b className="text-white">Fixed scope</b> agreed before work starts</li>
            <li><b className="text-white">One person</b> from design to code</li>
          </ul>
        </div>
      </section>

      <section id="packages" className="scroll-mt-24 px-6 py-20 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-3">
          {Object.entries(serviceDetails).map(([slug, s]) => {
            const isFeatured = slug === featured;
            return (
              <article key={slug} className={`service-card flex flex-col ${isFeatured ? "!border-2 !border-blue-500" : ""}`}>
                {isFeatured ? <p className="self-start rounded-full bg-blue-600 px-3 py-1 text-xs font-bold text-white">Most requested</p> : <p className="eyebrow">{s.eyebrow}</p>}
                <h2 className="mt-5 text-2xl font-black">{s.title}</h2>
                <p className="mt-3"><span className="text-sm text-slate-500 dark:text-slate-400">From </span><span className="text-4xl font-black">{s.price.replace("From ", "")}</span></p>
                <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">{s.description}</p>
                <dl className="mt-5 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
                  <dt className="text-slate-500 dark:text-slate-400">Timeline</dt><dd className="font-bold">{s.duration.replace("Typically ", "")}</dd>
                  <dt className="text-slate-500 dark:text-slate-400">Best for</dt><dd className="font-bold">{s.bestFor}</dd>
                </dl>
                <ul className="mt-6 flex-1 space-y-3 border-t border-slate-200 pt-6 dark:border-white/10">
                  {s.deliverables.map((x) => <li key={x} className="flex gap-3 text-sm"><b className="text-green-600 dark:text-green-400" aria-hidden="true">✓</b>{x}</li>)}
                </ul>
                {s.caseStudy && <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">See it applied: <Link href={s.caseStudy.href} className="text-link">{s.caseStudy.label} →</Link></p>}
                <div className="mt-6 grid gap-3">
                  <a href={`mailto:${siteConfig.email}?subject=${encodeURIComponent(`${s.title} enquiry`)}`} className={`rounded-xl px-5 py-3 text-center text-sm font-bold ${isFeatured ? "bg-blue-600 text-white" : "border border-slate-300 dark:border-white/20"}`}>Enquire about this</a>
                  <Link href={`/services/${slug}`} className="text-center text-sm font-bold text-slate-600 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white">Full details →</Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {spotlight && (
        <section aria-label="Client feedback" className="border-y border-slate-200 bg-white px-6 py-16 dark:border-white/10 dark:bg-[#080D1A] lg:px-8">
          <figure className="mx-auto max-w-4xl">
            <Stars rating={spotlight.rating} className="text-lg" />
            <blockquote className="mt-5 text-2xl font-bold leading-snug tracking-[-.02em] md:text-3xl">“{spotlight.review}”</blockquote>
            <figcaption className="mt-6 text-slate-600 dark:text-slate-400"><b className="text-slate-950 dark:text-white">{spotlight.name}</b>{[spotlight.role, spotlight.company].filter(Boolean).length ? `, ${[spotlight.role, spotlight.company].filter(Boolean).join(", ")}` : ""}</figcaption>
          </figure>
        </section>
      )}

      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="eyebrow">How it works</p>
          <h2 className="mt-3 text-3xl font-black md:text-4xl">How a project runs</h2>
          <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map(([step, copy], i) => (
              <li key={step} className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-[#0B1120]">
                <span className="text-2xl font-black text-blue-600 dark:text-blue-400">{i + 1}</span>
                <h3 className="mt-3 font-black">{step}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{copy}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-6 pb-20 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-black md:text-4xl">Common questions</h2>
          <div className="mt-8 grid gap-3">
            {serviceFaqs.map(({q, a}) => (
              <details key={q} className="group rounded-xl border border-slate-200 bg-white px-5 py-4 dark:border-white/10 dark:bg-[#0B1120]">
                <summary className="flex min-h-8 cursor-pointer list-none items-center justify-between gap-4 font-bold">{q}<span aria-hidden="true" className="text-slate-400 transition group-open:rotate-45">＋</span></summary>
                <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-24 lg:px-8">
        <div className="mx-auto max-w-6xl rounded-3xl bg-[#101A38] p-8 text-white md:flex md:items-center md:justify-between md:p-12">
          <div>
            <p className="eyebrow !text-blue-300">Not sure where to begin?</p>
            <h2 className="mt-3 text-3xl font-black">Tell me what isn’t working.</h2>
            <p className="mt-3 text-slate-300">I’ll recommend the smallest useful starting point and reply {siteConfig.responseTime}.</p>
          </div>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row md:mt-0 md:shrink-0">
            <a href={siteConfig.callHref} className="rounded-xl bg-blue-600 px-6 py-4 text-center text-sm font-bold">Book a 15-minute call</a>
            <a href={`mailto:${siteConfig.email}?subject=Project%20enquiry`} className="rounded-xl border border-white/20 px-6 py-4 text-center text-sm font-bold">Email your project</a>
            <a href={siteConfig.whatsApp} className="rounded-xl border border-white/20 px-6 py-4 text-center text-sm font-bold">WhatsApp</a>
          </div>
        </div>
      </section>
    </div>
  );
}
