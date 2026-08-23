import type {Metadata} from "next";
import Image from "next/image";
import Link from "next/link";
import {blogPosts as localBlogPosts} from "@/lib/blog-posts";
import {getSanityBlogPosts} from "@/lib/sanity-blog";
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

export const revalidate = 3600;

type BlogCard = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  category: string;
  readTime?: string;
  featuredImageUrl?: string;
  featuredImageAlt?: string;
};

export default async function BlogPage() {
  const sanityPosts = await getSanityBlogPosts();
  const localSlugs = new Set(localBlogPosts.map((post) => post.slug));

  const posts: BlogCard[] = [
    ...localBlogPosts.map((post) => ({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      publishedAt: post.publishedAt,
      category: post.category,
      readTime: post.readTime,
    })),
    ...sanityPosts
      .filter((post) => !localSlugs.has(post.slug))
      .map((post) => ({
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        publishedAt: post.publishedAt,
        category: post.category ?? "Product Design",
        featuredImageUrl: post.featuredImageUrl,
        featuredImageAlt: post.featuredImageAlt,
      })),
  ].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

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
            {posts.map((post) => (
              <article key={post.slug} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-[#0B1120]">
                {post.featuredImageUrl && (
                  <div className="relative aspect-[16/9] overflow-hidden border-b border-slate-200 dark:border-white/10">
                    <Image src={post.featuredImageUrl} alt={post.featuredImageAlt ?? post.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
                  </div>
                )}
                <div className="p-7">
                  <div className="flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[.12em] text-blue-600 dark:text-blue-400">
                    <span>{post.category}</span><span className="text-slate-400">•</span>
                    <time dateTime={post.publishedAt}>{new Date(post.publishedAt).toLocaleDateString("en-GB", {day:"numeric", month:"short", year:"numeric"})}</time>
                    {post.readTime && <><span className="text-slate-400">•</span><span>{post.readTime}</span></>}
                  </div>
                  <h2 className="mt-5 text-2xl font-black leading-tight"><Link href={`/blog/${post.slug}`} className="hover:text-blue-600 dark:hover:text-blue-400">{post.title}</Link></h2>
                  <p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">{post.excerpt}</p>
                  <Link href={`/blog/${post.slug}`} className="mt-7 inline-flex text-sm font-black text-blue-600 dark:text-blue-400">Read article →</Link>
                </div>
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
