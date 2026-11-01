import type {Metadata} from "next";
import BookGrid from "@/components/books/BookGrid";
import {books} from "@/lib/books";
import {siteConfig} from "@/lib/site";

const title = "Books by Bismark Apenkwah";
const description = "Published and upcoming books by Bismark Apenkwah, including From Beginner to Hired, a practical Product Design career playbook.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {canonical: "/books"},
  openGraph: {title, description, url: `${siteConfig.url}/books`, type: "website"},
};

export default function BooksPage() {
  return (
    <div className="page-shell py-16 lg:py-24">
      <p className="eyebrow">Books</p>
      <h1 className="section-title mt-4 max-w-3xl">Books by Bismark Apenkwah.</h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">Practical writing, published through Bisacom. Each title shows its current publication status.</p>
      <div className="mt-14"><BookGrid books={books} headingLevel="h2" /></div>
    </div>
  );
}
