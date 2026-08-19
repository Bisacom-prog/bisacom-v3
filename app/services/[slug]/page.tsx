import type {Metadata} from "next";
import {notFound} from "next/navigation";
import Link from "next/link";
import {serviceDetails, type ServiceSlug} from "@/lib/services";

export function generateStaticParams(){return Object.keys(serviceDetails).map(slug=>({slug}))}

export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const {slug}=await params; const service=serviceDetails[slug as ServiceSlug];
  if(!service)return {};
  return {title:service.title,description:service.description,alternates:{canonical:`/services/${slug}`}};
}

export default async function ServicePage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params; const service=serviceDetails[slug as ServiceSlug]; if(!service)notFound();
  const mailSubject=encodeURIComponent(`${service.title} enquiry`);
  return <main id="main-content" className="min-h-screen bg-white text-slate-950 dark:bg-[#050914] dark:text-white">
    <section className="bg-[#050914] px-6 py-20 text-white lg:px-8"><div className="mx-auto max-w-5xl"><Link href="/services" className="text-sm font-bold text-blue-300">← All services</Link><p className="eyebrow mt-12 text-blue-300">{service.eyebrow}</p><div className="mt-4 grid gap-8 md:grid-cols-[1fr_auto] md:items-end"><div><h1 className="text-4xl font-black md:text-6xl">{service.title}</h1><p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">{service.description}</p></div><p className="rounded-full border border-white/15 px-5 py-3 text-sm font-black">{service.price}</p></div></div></section>
    <section className="px-6 py-20 lg:px-8"><div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2"><div><p className="eyebrow">Best for</p><p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-300">{service.audience}</p><p className="eyebrow mt-10">Typical duration</p><p className="mt-4 font-bold">{service.duration}</p></div><div><p className="eyebrow">What you receive</p><ul className="mt-5 space-y-4">{service.deliverables.map(x=><li key={x} className="flex gap-3 leading-7"><b className="text-green-500">✓</b>{x}</li>)}</ul></div></div></section>
    <section className="bg-slate-50 px-6 py-20 dark:bg-[#080D1A] lg:px-8"><div className="mx-auto max-w-5xl"><p className="eyebrow">How it works</p><h2 className="mt-3 text-3xl font-black">A clear path from brief to delivery</h2><ol className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">{service.process.map((step,i)=><li key={step} className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-[#0B1120]"><span className="text-xs font-black text-blue-600">0{i+1}</span><p className="mt-4 text-sm leading-7">{step}</p></li>)}</ol></div></section>
    <section className="px-6 py-20 lg:px-8"><div className="mx-auto max-w-5xl rounded-3xl bg-[#101A38] p-8 text-white md:flex md:items-center md:justify-between md:p-12"><div><p className="eyebrow text-blue-300">Ready to discuss it?</p><h2 className="mt-3 text-3xl font-black">Start with your goal and current challenge.</h2></div><div className="mt-7 flex flex-col gap-3 sm:flex-row md:mt-0"><a href={`mailto:hello@bisacom.dev?subject=${mailSubject}`} className="rounded-xl bg-blue-600 px-6 py-4 text-center text-sm font-bold">Email enquiry</a><a href="https://wa.me/447555824637?text=Hello%20Bismark%2C%20I%27d%20like%20to%20discuss%20a%20project." className="rounded-xl border border-white/20 px-6 py-4 text-center text-sm font-bold">WhatsApp</a></div></div></section>
  </main>
}
