import type {Metadata} from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: {index: false, follow: true},
};

// Shown for any unknown URL (with a real 404 status), inside the normal header and footer.
export default function NotFound() {
  return (
    <section className="page-shell py-24 lg:py-32">
      <p className="eyebrow">404</p>
      <h1 className="section-title mt-3 max-w-2xl">This page could not be found.</h1>
      <p className="mt-4 max-w-xl text-lg leading-8 text-muted">The link may be out of date, or the page may have moved. These are good places to continue:</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/" className="btn btn-primary">Go to the homepage</Link>
        <Link href="/projects" className="btn btn-secondary">See projects</Link>
        <Link href="/#contact" className="btn btn-secondary">Get in touch</Link>
      </div>
    </section>
  );
}
