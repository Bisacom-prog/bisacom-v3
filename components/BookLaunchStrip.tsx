import Image from "next/image";
import Link from "next/link";

export default function BookLaunchStrip() {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[32px] border border-slate-200 bg-slate-950 text-white dark:border-white/10 md:grid-cols-[1fr_240px]">
        <div className="p-8 sm:p-10 lg:p-12">
          <span className="text-xs font-black uppercase tracking-[0.2em] text-violet-300">Now available · Paperback + Kindle</span>
          <h2 className="mt-4 max-w-3xl text-3xl font-black tracking-tight sm:text-4xl">From Beginner to Hired</h2>
          <p className="mt-4 max-w-2xl leading-7 text-slate-300">
            A practical Product Design career playbook for building your portfolio, using AI responsibly, preparing for interviews and landing your first UX/UI role.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/from-beginner-to-hired" className="rounded-full bg-violet-600 px-5 py-3 text-sm font-bold hover:bg-violet-500">View the book</Link>
            <a href="https://www.amazon.co.uk/BEGINNER-HIRED-Landing-Product-Design/dp/B0HJDGLJJM" target="_blank" rel="noreferrer" className="rounded-full border border-white/20 px-5 py-3 text-sm font-bold hover:border-violet-300 hover:text-violet-200">Buy on Amazon</a>
          </div>
        </div>
        <div className="relative min-h-[320px] bg-violet-500/10 md:min-h-full">
          <Image src="/img/From-beginner.webp" alt="From Beginner to Hired book cover" fill sizes="240px" className="object-cover object-top" />
        </div>
      </div>
    </section>
  );
}
