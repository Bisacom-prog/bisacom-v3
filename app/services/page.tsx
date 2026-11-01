import type {Metadata} from "next";
import Link from "next/link";
import {serviceDetails} from "@/lib/services";

export const metadata: Metadata = {
  title: "Freelance UI/UX Design & Website Services",
  description: "UX audits, Figma UI design sprints and responsive Next.js website design from a Norwich-based freelance product designer.",
  alternates: {canonical: "/services"},
  openGraph: {
    title: "Freelance UI/UX Design & Website Services",
    description: "UX audits, Figma UI design sprints and responsive Next.js website design from a Norwich-based freelance product designer.",
    url: "/services",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Freelance UI/UX Design & Website Services",
    description: "UX audits, Figma UI design sprints and responsive Next.js website design from a Norwich-based freelance product designer.",
  },
};

export default function ServicesPage(){
  return <div className="min-h-screen bg-surface-muted text-foreground">
    <section className="bg-navy on-navy px-6 py-24 text-white lg:px-8"><div className="mx-auto max-w-5xl"><Link href="/" className="text-sm font-bold text-accent-bright">← Back to Bisacom</Link><p className="eyebrow mt-12 text-accent-bright">Freelance services</p><h1 className="mt-4 max-w-4xl text-4xl font-bold md:text-6xl">Practical ways to improve, design or launch your digital product.</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-on-navy-muted">Choose a defined starting point. Final scope, timing and price are confirmed after a short discovery conversation.</p></div></section>
    <section className="px-6 py-20 lg:px-8"><div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-3">{Object.entries(serviceDetails).map(([slug,s])=><article key={slug} className="service-card flex flex-col"><p className="eyebrow">{s.eyebrow}</p><p className="mt-7 text-sm font-bold text-accent-ink">{s.price}</p><h2 className="mt-2 text-2xl font-bold">{s.title}</h2><p className="mt-4 text-sm leading-7 text-muted">{s.description}</p><ul className="mt-6 flex-1 space-y-3">{s.deliverables.slice(0,3).map(x=><li key={x} className="flex gap-3 text-sm"><b className="text-accent-ink">✓</b>{x}</li>)}</ul><Link href={`/services/${slug}`} className="mt-8 rounded-xl bg-accent px-5 py-3 text-center text-sm font-bold text-on-accent">View service details</Link></article>)}</div></section>
    <section className="px-6 pb-20 lg:px-8"><div className="mx-auto max-w-6xl rounded-xl bg-navy on-navy p-8 text-white md:flex md:items-center md:justify-between md:p-12"><div><p className="eyebrow text-accent-bright">Not sure where to begin?</p><h2 className="mt-3 text-3xl font-bold">Tell me what is not working.</h2><p className="mt-3 text-on-navy-muted">I’ll recommend the smallest useful starting point.</p></div><div className="mt-7 flex flex-col gap-3 sm:flex-row md:mt-0"><a href="mailto:hello@bisacom.dev?subject=Project enquiry" className="rounded-xl bg-accent px-6 py-4 text-center text-sm font-bold text-on-accent">Email your project</a><a href="https://wa.me/447555824637?text=Hello%20Bismark%2C%20I%27d%20like%20to%20discuss%20a%20project." className="rounded-xl border border-white/20 px-6 py-4 text-center text-sm font-bold">WhatsApp</a></div></div></section>
  </div>
}
