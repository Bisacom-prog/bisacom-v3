import type {Metadata} from "next";
import Image from "next/image";
import Link from "next/link";
import {notFound} from "next/navigation";
import {blogPosts, getBlogPost} from "@/lib/blog-posts";
import {getSanityBlogPost, getSanityBlogSlugs} from "@/lib/sanity-blog";
import {siteConfig} from "@/lib/site";
import {SanityArticleBody} from "../portable-text";

export const revalidate = 3600;

export async function generateStaticParams() {
  const sanitySlugs = await getSanityBlogSlugs();
  const slugs = new Set([...blogPosts.map((post) => post.slug), ...sanitySlugs.map((post) => post.slug)]);
  return Array.from(slugs).map((slug) => ({slug}));
}

export async function generateMetadata({params}: {params: Promise<{slug: string}>}): Promise<Metadata> {
  const {slug} = await params;
  const localPost = getBlogPost(slug);

  if (localPost) {
    return {
      title: localPost.seoTitle,
      description: localPost.seoDescription,
      keywords: [localPost.primaryKeyword, ...localPost.supportingKeywords],
      alternates: {canonical: `/blog/${localPost.slug}`},
      openGraph: {
        title: localPost.seoTitle,
        description: localPost.seoDescription,
        url: `${siteConfig.url}/blog/${localPost.slug}`,
        type: "article",
        publishedTime: localPost.publishedAt,
        modifiedTime: localPost.updatedAt ?? localPost.publishedAt,
        authors: [siteConfig.personName],
      },
      twitter: {card: "summary_large_image", title: localPost.seoTitle, description: localPost.seoDescription},
    };
  }

  const post = await getSanityBlogPost(slug);
  if (!post) return {};

  const canonical = post.canonicalUrl || `${siteConfig.url}/blog/${post.slug}`;
  const image = post.socialImageUrl || post.featuredImage?.url || post.featuredImageUrl;
  const title = post.seoTitle || post.title;
  const description = post.seoDescription || post.excerpt;

  return {
    title,
    description,
    keywords: [post.primaryKeyword, ...(post.seoKeywords ?? [])].filter(Boolean) as string[],
    alternates: {canonical},
    robots: post.seoNoIndex ? {index: false, follow: false} : undefined,
    openGraph: {
      title,
      description,
      url: canonical,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: [post.author?.name ?? siteConfig.personName],
      images: image ? [{url: image, alt: post.featuredImage?.alt ?? post.title}] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export default async function BlogArticle({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params;
  const localPost = getBlogPost(slug);

  if (localPost) {
    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: localPost.title,
      description: localPost.excerpt,
      datePublished: localPost.publishedAt,
      dateModified: localPost.updatedAt ?? localPost.publishedAt,
      mainEntityOfPage: `${siteConfig.url}/blog/${localPost.slug}`,
      author: {"@type": "Person", name: siteConfig.personName, url: siteConfig.url},
      publisher: {"@type": "Organization", name: siteConfig.name, url: siteConfig.url},
      keywords: [localPost.primaryKeyword, ...localPost.supportingKeywords].join(", "),
      inLanguage: "en-GB",
    };

    return (
      <ArticleShell
        schema={articleSchema}
        title={localPost.title}
        excerpt={localPost.excerpt}
        category={localPost.category}
        author={siteConfig.personName}
        publishedAt={localPost.publishedAt}
        readTime={localPost.readTime}
        body={
          <>
            {localPost.sections.map((section, index) => (
              <section key={`${section.heading ?? "intro"}-${index}`} className={index === 0 ? "" : "mt-12"}>
                {section.heading && <h2 className="text-2xl font-black tracking-tight md:text-3xl">{section.heading}</h2>}
                {section.paragraphs?.map((paragraph) => <p key={paragraph} className="mt-5 text-[1.05rem] leading-8 text-slate-700 dark:text-slate-300">{paragraph}</p>)}
                {section.bullets && <ul className="mt-6 grid list-disc gap-3 pl-6">{section.bullets.map((item) => <li key={item} className="leading-7 text-slate-700 dark:text-slate-300">{item}</li>)}</ul>}
                {section.numbered && <ol className="mt-6 grid list-decimal gap-3 pl-6">{section.numbered.map((item) => <li key={item} className="leading-7 text-slate-700 dark:text-slate-300">{item}</li>)}</ol>}
                {section.example && <div className="mt-7 rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-white/10 dark:bg-white/[.04]"><p className="text-xs font-black uppercase tracking-[.14em] text-slate-500">{section.example.label}</p>{section.example.weak && <p className="mt-3"><b>Weak:</b> {section.example.weak}</p>}{section.example.better && <p className="mt-2"><b>Better:</b> {section.example.better}</p>}</div>}
              </section>
            ))}
          </>
        }
      />
    );
  }

  const post = await getSanityBlogPost(slug);
  if (!post) notFound();

  const canonical = post.canonicalUrl || `${siteConfig.url}/blog/${post.slug}`;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    mainEntityOfPage: canonical,
    image: post.featuredImage?.url || post.socialImageUrl || undefined,
    author: {
      "@type": "Person",
      name: post.author?.name ?? siteConfig.personName,
      url: post.author?.website ?? siteConfig.url,
    },
    publisher: {"@type": "Organization", name: siteConfig.name, url: siteConfig.url},
    keywords: [post.primaryKeyword, ...(post.seoKeywords ?? [])].filter(Boolean).join(", "),
    inLanguage: "en-GB",
  };

  return (
    <ArticleShell
      schema={articleSchema}
      title={post.title}
      excerpt={post.excerpt}
      category={post.category ?? "Product Design"}
      author={post.author?.name ?? siteConfig.personName}
      authorRole={post.author?.role}
      publishedAt={post.publishedAt}
      featuredImage={post.featuredImage?.url}
      featuredImageAlt={post.featuredImage?.alt ?? post.title}
      featuredImageCaption={post.featuredImage?.caption}
      body={<SanityArticleBody body={post.body ?? []} />}
      relatedPosts={post.relatedPosts}
    />
  );
}

function ArticleShell({
  schema,
  title,
  excerpt,
  category,
  author,
  authorRole,
  publishedAt,
  readTime,
  featuredImage,
  featuredImageAlt,
  featuredImageCaption,
  body,
  relatedPosts,
}: {
  schema: Record<string, unknown>;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  authorRole?: string;
  publishedAt: string;
  readTime?: string;
  featuredImage?: string;
  featuredImageAlt?: string;
  featuredImageCaption?: string;
  body: React.ReactNode;
  relatedPosts?: Array<{_id: string; title: string; slug: string; excerpt?: string; category?: string}>;
}) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(schema)}} />
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
              <p className="text-xs font-black uppercase tracking-[.16em] text-blue-600 dark:text-blue-400">{category}</p>
              <h1 className="mt-5 text-4xl font-black leading-[1.05] tracking-tight md:text-6xl">{title}</h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">{excerpt}</p>
              <div className="mt-7 flex flex-wrap gap-3 text-sm text-slate-500 dark:text-slate-400">
                <span>By {author}{authorRole ? ` · ${authorRole}` : ""}</span><span>•</span>
                <time dateTime={publishedAt}>{new Date(publishedAt).toLocaleDateString("en-GB", {day:"numeric", month:"long", year:"numeric"})}</time>
                {readTime && <><span>•</span><span>{readTime}</span></>}
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-4xl px-6 py-14 md:py-20">
            {featuredImage && (
              <figure className="mb-14">
                <Image src={featuredImage} alt={featuredImageAlt ?? title} width={1600} height={900} className="h-auto w-full rounded-3xl border border-slate-200 object-cover dark:border-white/10" priority />
                {featuredImageCaption && <figcaption className="mt-3 text-sm text-slate-500 dark:text-slate-400">{featuredImageCaption}</figcaption>}
              </figure>
            )}

            <div className="max-w-3xl">{body}</div>

            {relatedPosts && relatedPosts.length > 0 && (
              <section className="mt-16 border-t border-slate-200 pt-10 dark:border-white/10">
                <p className="eyebrow">Related insights</p>
                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  {relatedPosts.map((related) => (
                    <Link key={related._id} href={`/blog/${related.slug}`} className="rounded-2xl border border-slate-200 p-5 transition hover:-translate-y-1 hover:shadow-lg dark:border-white/10">
                      <p className="text-xs font-bold uppercase tracking-[.12em] text-blue-600 dark:text-blue-400">{related.category ?? "Insight"}</p>
                      <h2 className="mt-2 font-black leading-6">{related.title}</h2>
                    </Link>
                  ))}
                </div>
              </section>
            )}

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
        </article>
      </main>
    </>
  );
}
