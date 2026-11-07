import Image from "next/image";
import Link from "next/link";
import {ManageCookiesButton} from "@/components/site/CookieConsent";
import {books, bookHref} from "@/lib/books";
import {primaryNav, siteConfig} from "@/lib/site";

const linkClass = "inline-flex min-h-9 items-center hover:text-on-navy hover:underline underline-offset-4";

export default function SiteFooter() {
  return (
    <footer className="on-navy bg-navy text-on-navy dark:border-t dark:border-navy-line">
      <div className="page-shell grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <Image src="/img/Bisacom.webp" width={36} height={39} className="rounded-md bg-white" alt="" />
            <span className="text-xl font-black">Bisacom</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-6 text-on-navy-muted">The portfolio of {siteConfig.personName}, Product Designer and Design Engineer in Norwich, UK.</p>
          <a href={`mailto:${siteConfig.email}`} className="text-link mt-4 inline-block text-sm">{siteConfig.email}</a>
        </div>
        <nav aria-label="Footer: site" className="text-sm text-on-navy-muted">
          <p className="mono-note mb-3 text-on-navy">Site</p>
          <ul>
            {primaryNav.map((item) => <li key={item.href}><Link href={item.href} className={linkClass}>{item.label}</Link></li>)}
          </ul>
        </nav>
        <nav aria-label="Footer: books" className="text-sm text-on-navy-muted">
          <p className="mono-note mb-3 text-on-navy">Books</p>
          <ul>
            {books.map((book) => <li key={book.slug}><Link href={bookHref(book)} className={linkClass}>{book.title}</Link></li>)}
          </ul>
        </nav>
        <nav aria-label="Footer: profiles" className="text-sm text-on-navy-muted">
          <p className="mono-note mb-3 text-on-navy">Profiles</p>
          <ul>
            <li><a href={siteConfig.linkedIn} target="_blank" rel="noreferrer" className={linkClass}>LinkedIn</a></li>
            <li><a href={siteConfig.github} target="_blank" rel="noreferrer" className={linkClass}>GitHub</a></li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-navy-line">
        <div className="page-shell flex flex-col gap-2 py-5 text-sm text-on-navy-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Bisacom.</p>
          <div className="flex flex-wrap items-center gap-x-5">
            <Link href="/privacy-policy" className="inline-flex min-h-11 items-center underline underline-offset-4 hover:text-on-navy">Privacy policy</Link>
            <Link href="/terms-of-use" className="inline-flex min-h-11 items-center underline underline-offset-4 hover:text-on-navy">Terms</Link>
            <ManageCookiesButton />
          </div>
        </div>
      </div>
    </footer>
  );
}
