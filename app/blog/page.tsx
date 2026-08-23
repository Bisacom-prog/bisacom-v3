import type {Metadata} from "next";
import Link from "next/link";
import {blogPosts} from "@/lib/blog-posts";
import {siteConfig} from "@/lib/site";

export const metadata: Metadata = {
  title: "Product Design & UX Insights",
  description: "Practical UX, product design and SaaS articles for startups and small businesses from Bisacom, a Product Designer based in Norwich, UK.",
  alternates: {canonical: "/blog"},
  openGraph: {
    title: "Product Design & UX Insights | Bisacom",
    description: "Practical UX, product design and SaaS articles for startups and small businesses.",
    url: `${siteConfig.url}/blog`,
    type: "website",
  },
};

export default function BlogPage() {
  return (
    <>
      <header className="border-b border-white/10 bg-[#050914] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          <Link href="/" className="text-xl font-black">Bisacom</Link>
          <nav className="flex items-center gap-6 text-sm text-slate-300" aria-label="Blog navigation">
            <Link href="/#projects" className="hover:text-white">Work</Link>
            <Link href="/#services" className="hover:text-white">Services</Link>
            <Link href="/#contact" className="hover:text-white">Contact</Link>
          </nav>
        </div>
      </header>
      <main id="main-content" className="bg-[#f7f9fc] text-slate-950 dark:bg-[#050914] dark:text-white">
        <section className="border-b border-slate-200 bg-white py-20 dark:border-white/10 dark:bg-[#080D1A]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <p className="eyebrow">Insights</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-black tracking-tight md:text-6xl">Practical thinking for better digital products.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">UX, product design and SaaS guidance focused on clearer journeys, better business outcomes and products that are easier to use.</p>
          </div>
        </section>
        <section className="py-20">
          <div className="mx-auto grid max-w-7xl gap-6 px-6 md:grid-cols-2 lg:px-8">
            {blogPosts.map((post) => (
              <article key={post.slug} className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-[#0B1120]">
                <div className="flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[.12em] text-blue-600 dark:text-blue-400">
                  <span>{post.category}</span><span className="text-slate-400">•</span>
                  <time dateTime={post.publishedAt}>{new Date(`${post.publishedAt}T12:00:00`).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"})}</time>
                  <span className="text-slate-400">•</span><span>{post.readTime}</span>
                </div>
                <h2 className="mt-5 text-2xl font-black leading-tight"><Link href={`/blog/${post.slug}`} className="hover:text-blue-600 dark:hover:text-blue-400">{post.title}</Link></h2>
                <p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">{post.excerpt}</p>
                <Link href={`/blog/${post.slug}`} className="mt-7 inline-flex text-sm font-black text-blue-600 dark:text-blue-400">Read article →</Link>
              </article>
            ))}
          </div>
        </section>
      </main>
      <footer className="bg-[#070B16] px-6 py-10 text-sm text-slate-400">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:justify-between">
          <p>© 2026 Bisacom. Product design from Norwich, UK.</p>
          <Link href="/" className="font-bold text-white">Back to portfolio →</Link>
        </div>
      </footer>
    </>
  );
}
