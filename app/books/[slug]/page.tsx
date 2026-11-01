import type {Metadata} from "next";
import Link from "next/link";
import {notFound} from "next/navigation";
import BookCover from "@/components/books/BookCover";
import {books, getBook, notifyHref, type Book} from "@/lib/books";
import {siteConfig} from "@/lib/site";

export const dynamicParams = false;
export const generateStaticParams = () => books.map((book) => ({slug: book.slug}));

export async function generateMetadata({params}: {params: Promise<{slug: string}>}): Promise<Metadata> {
  const {slug} = await params;
  const book = getBook(slug);
  if (!book) return {};
  const url = `${siteConfig.url}/books/${book.slug}`;
  const description = book.status === "available" ? book.description : `${book.title} is an upcoming book by ${siteConfig.personName}. It is not yet available.`;
  return {
    title: book.subtitle ? `${book.title}: ${book.subtitle}` : book.title,
    description,
    alternates: {canonical: url},
    openGraph: {
      title: `${book.title} by ${siteConfig.personName}`,
      description,
      url,
      type: "book",
      images: book.cover ? [{url: book.cover.src, width: book.cover.width, height: book.cover.height, alt: book.cover.alt}] : undefined,
    },
  };
}

function bookSchema(book: Book) {
  return {
    "@context": "https://schema.org",
    "@type": "Book",
    name: book.title,
    alternateName: book.subtitle,
    author: {"@type": "Person", "@id": `${siteConfig.url}/#person`, name: siteConfig.personName, url: siteConfig.url},
    description: book.description,
    inLanguage: "en-GB",
    image: book.cover ? `${siteConfig.url}${book.cover.src}` : undefined,
    isbn: book.isbn,
    url: `${siteConfig.url}/books/${book.slug}`,
    bookFormat: book.purchase?.map((item) => `https://schema.org/${item.format}`),
    offers: book.purchase?.map((item) => ({"@type": "Offer", url: item.href, availability: "https://schema.org/InStock", price: item.price, priceCurrency: "GBP"})),
  };
}

function PurchaseActions({book}: {book: Book}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      {book.purchase?.map((item, index) => (
        <a key={item.href} href={item.href} target="_blank" rel="noreferrer" className={`btn ${index === 0 ? "btn-primary" : "btn-secondary"}`}>{item.label}</a>
      ))}
    </div>
  );
}

export default async function BookPage({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params;
  const book = getBook(slug);
  if (!book) notFound();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(bookSchema(book))}} />

      <section className="border-b border-line">
        <div className="page-shell grid items-center gap-12 py-14 lg:grid-cols-[1.2fr_.8fr] lg:gap-20 lg:py-20">
          <div>
            <nav aria-label="Breadcrumb" className="mono-note text-muted"><Link href="/books" className="underline underline-offset-4 hover:text-foreground">Books</Link> / {book.title}</nav>
            <p className={`status-tag status-tag--${book.status} mt-8`}>{book.statusLabel}</p>
            {book.series && <p className="eyebrow mt-6">{book.series}</p>}
            <h1 className="mt-4 text-[clamp(2.75rem,2rem+4vw,5.5rem)] font-black leading-[.98] tracking-[-.055em]">{book.title}</h1>
            {book.subtitle && <p className="mt-6 max-w-2xl font-display text-xl font-semibold leading-snug sm:text-2xl">{book.subtitle}</p>}
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">{book.description}</p>
            <p className="mt-4 max-w-2xl leading-7"><b className="font-semibold">For:</b> <span className="text-muted">{book.audience}</span></p>

            {book.status === "available" ? (
              <div className="mt-8"><PurchaseActions book={book} />{book.companion && <Link href={book.companion.href} className="text-link mt-5 inline-block">{book.companion.label}</Link>}</div>
            ) : (
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a href={notifyHref(book)} className="btn btn-primary">Ask to be notified by email</a>
                <Link href="/books" className="btn btn-secondary">See all books</Link>
              </div>
            )}

            {book.facts && (
              <dl className="mt-10 grid max-w-xl grid-cols-3 gap-3 border-t border-line pt-6 text-sm">
                {book.facts.map((fact) => <div key={fact.label}><dd className="font-display text-xl font-bold">{fact.value}</dd><dt className="text-muted">{fact.label}</dt></div>)}
              </dl>
            )}
          </div>
          <div className="mx-auto w-full max-w-[24rem] lg:justify-self-end"><BookCover book={book} sizes="(max-width: 1024px) 384px, 30vw" priority /></div>
        </div>
      </section>

      {book.intro && book.outcomes && (
        <section className="page-shell py-20">
          <p className="eyebrow">{book.intro.eyebrow}</p>
          <h2 className="section-title mt-4 max-w-3xl">{book.intro.title}</h2>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">{book.intro.body}</p>
          <ol className="mt-12 grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
            {book.outcomes.map((item, index) => (
              <li key={item.title} className="bg-background p-7">
                <span className="mono-note text-accent-ink">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-xl font-bold">{item.title}</h3>
                <p className="mt-2 leading-7 text-muted">{item.text}</p>
              </li>
            ))}
          </ol>
        </section>
      )}

      {book.journey && (
        <section className="on-navy bg-navy py-20 text-on-navy">
          <div className="page-shell">
            <p className="eyebrow">{book.journey.eyebrow}</p>
            <h2 className="section-title mt-4 max-w-3xl">{book.journey.title}</h2>
            <p className="mt-5 max-w-2xl leading-7 text-on-navy-muted">{book.journey.body}</p>
            <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
              {book.journey.steps.map((step, index) => (
                <li key={step.title} className="border-t border-navy-line pt-4">
                  <span className="mono-note text-accent-bright">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="mt-2 text-lg font-bold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-on-navy-muted">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {book.contents && (
        <section className="page-shell grid gap-12 py-20 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="eyebrow">Inside the book</p>
            <h2 className="section-title mt-4">{book.contents.title}</h2>
            <p className="mt-5 max-w-xl leading-7 text-muted">{book.contents.body}</p>
          </div>
          <ul className="grid content-start gap-x-8 sm:grid-cols-2">
            {book.contents.items.map((item) => <li key={item} className="border-b border-line py-3 font-medium leading-6">{item}</li>)}
          </ul>
        </section>
      )}

      {book.companion && (
        <section className="bg-surface-muted py-16">
          <div className="page-shell grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="eyebrow">{book.companion.eyebrow}</p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">{book.companion.title}</h2>
              <p className="mt-4 max-w-3xl leading-7 text-muted">{book.companion.body}</p>
            </div>
            <Link href={book.companion.href} className="btn btn-secondary">{book.companion.label}</Link>
          </div>
        </section>
      )}

      {book.status === "available" && (
        <section className="page-shell grid gap-8 border-t border-line py-16 lg:grid-cols-[.7fr_1.3fr]">
          <div>
            <p className="eyebrow">About the author</p>
            <h2 className="mt-3 text-3xl font-bold">{siteConfig.personName}</h2>
            <p className="mt-1 font-medium text-muted">Product Designer + Design Engineer · Bisacom</p>
          </div>
          <p className="max-w-3xl text-lg leading-8 text-muted">
            {siteConfig.personName} is a Product Designer and Design Engineer based in Norwich, UK. Through Bisacom, Bismark creates practical digital products and resources that help aspiring designers build real-world skills and confidence.{" "}
            <Link href="/#projects" className="text-link text-foreground">See the portfolio</Link>
          </p>
        </section>
      )}

      {book.closing && (
        <section className="border-t border-line py-20 text-center">
          <div className="page-shell">
            <h2 className="section-title mx-auto max-w-3xl">{book.closing.title}</h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted">{book.closing.body}</p>
            <div className="mt-8 flex justify-center"><PurchaseActions book={book} /></div>
          </div>
        </section>
      )}
    </>
  );
}
