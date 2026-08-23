import type {Metadata} from "next";
import Link from "next/link";
import {notFound} from "next/navigation";
import {blogPosts, getBlogPost} from "@/lib/blog-posts";
import {siteConfig} from "@/lib/site";

export function generateStaticParams() {
  return blogPosts.map((post) => ({slug: post.slug}));
}

export async function generateMetadata({params}: {params: Promise<{slug: string}>}): Promise<Metadata> {
  const {slug} = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: post.seoTitle,
    description: post.seoDescription,
    keywords: [post.primaryKeyword, ...post.supportingKeywords],
    alternates: {canonical: `/blog/${post.slug}`},
    openGraph: {
      title: post.seoTitle,
      description: post.seoDescription,
      url: `${siteConfig.url}/blog/${post.slug}`,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: [siteConfig.personName],
    },
    twitter: {card: "summary_large_image", title: post.seoTitle, description: post.seoDescription},
  };
}

export default async function BlogArticle({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`,
    author: {"@type": "Person", name: siteConfig.personName, url: siteConfig.url},
    publisher: {"@type": "Organization", name: siteConfig.name, url: siteConfig.url},
    keywords: [post.primaryKeyword, ...post.supportingKeywords].join(", "),
    inLanguage: "en-GB",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(articleSchema)}} />
      <header className="border-b border-white/10 bg-[#050914] text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 lg:px-8">
          <Link href="/" className="text-xl font-black">Bisacom</Link>
          <Link href="/blog" className="text-sm font-bold text-slate-300 hover:text-white">All insights</Link>
        </div>
      </header>
      <main id="main-content" className="bg-white text-slate-950 dark:bg-[#050914] dark:text-white">
        <article>
          <header className="border-b border-slate-200 bg-[#f7f9fc] py-16 dark:border-white/10 dark:bg-[#080D1A] md:py-24">
            <div className="mx-auto max-w-4xl px-6">
              <p className="text-xs font-black uppercase tracking-[.16em] text-blue-600 dark:text-blue-400">{post.category}</p>
              <h1 className="mt-5 text-4xl font-black leading-[1.05] tracking-tight md:text-6xl">{post.title}</h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">{post.excerpt}</p>
              <div className="mt-7 flex flex-wrap gap-3 text-sm text-slate-500 dark:text-slate-400">
                <span>By {siteConfig.personName}</span><span>•</span>
                <time dateTime={post.publishedAt}>{new Date(`${post.publishedAt}T12:00:00`).toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"})}</time>
                <span>•</span><span>{post.readTime}</span>
              </div>
            </div>
          </header>
          <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 lg:grid-cols-[minmax(0,1fr)_260px] lg:py-20">
            <div className="max-w-3xl">
              {post.sections.map((section,index)=>(
                <section key={`${section.heading ?? "intro"}-${index}`} className={index===0?"":"mt-12"}>
                  {section.heading&&<h2 className="text-2xl font-black tracking-tight md:text-3xl">{section.heading}</h2>}
                  {section.paragraphs?.map((paragraph)=><p key={paragraph} className="mt-5 text-[1.05rem] leading-8 text-slate-700 dark:text-slate-300">{paragraph}</p>)}
                  {section.bullets&&<ul className="mt-6 grid gap-3">{section.bullets.map((item)=><li key={item} className="flex gap-3 leading-7 text-slate-700 dark:text-slate-300"><span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600"/><span>{item}</span></li>)}</ul>}
                  {section.numbered&&<ol className="mt-6 grid gap-3">{section.numbered.map((item,i)=><li key={item} className="flex gap-4 leading-7 text-slate-700 dark:text-slate-300"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-blue-50 text-xs font-black text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">{i+1}</span><span>{item}</span></li>)}</ol>}
                  {section.example&&<div className="mt-7 rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-white/10 dark:bg-white/[.04]"><p className="text-xs font-black uppercase tracking-[.14em] text-slate-500">{section.example.label}</p>{section.example.weak&&<p className="mt-3"><b>Weak:</b> {section.example.weak}</p>}{section.example.better&&<p className="mt-2"><b>Better:</b> {section.example.better}</p>}</div>}
                </section>
              ))}
              <section className="mt-16 rounded-3xl bg-[linear-gradient(135deg,#050914,#21115C)] p-8 text-white md:p-10">
                <p className="text-xs font-black uppercase tracking-[.15em] text-blue-300">Work with Bisacom</p>
                <h2 className="mt-3 text-3xl font-black">Need a clearer digital experience?</h2>
                <p className="mt-4 max-w-2xl leading-7 text-slate-300">I help startups and businesses improve UX, simplify complex journeys and create developer-ready web, SaaS and mobile experiences.</p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link href="/#contact" className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-black">Start a project</Link>
                  <Link href="/projects" className="rounded-xl border border-white/15 px-6 py-3 text-sm font-black">View selected work</Link>
                </div>
              </section>
            </div>
            <aside className="hidden lg:block"><div className="sticky top-8 rounded-2xl border border-slate-200 p-5 dark:border-white/10"><p className="text-xs font-black uppercase tracking-[.14em] text-slate-500">In this article</p><nav className="mt-4 grid gap-3 text-sm">{post.sections.filter((s)=>s.heading).map((section)=><span key={section.heading} className="leading-5 text-slate-600 dark:text-slate-400">{section.heading}</span>)}</nav></div></aside>
          </div>
        </article>
      </main>
    </>
  );
}
