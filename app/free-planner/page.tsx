import type { Metadata } from "next";
import Link from "next/link";
import EbookWaitlist from "@/components/EbookWaitlist";

const title = "Free 30-Day Product Design Career Planner";
const description =
  "Get the free 30-Day Product Design Career Planner from Chapter 11 of From Beginner to Hired by Bismark Apenkwah and join the book launch list.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/free-planner" },
  openGraph: {
    title,
    description,
    url: "https://bisacom.dev/free-planner",
    type: "website",
    images: [{ url: "/img/from-beginner-to-hired.webp", alt: "From Beginner to Hired book cover" }],
  },
  twitter: {
    card: "summary",
    title,
    description,
    images: ["/img/from-beginner-to-hired.webp"],
  },
};

export default function FreePlannerPage() {
  return (
    <main id="main-content" className="min-h-screen bg-slate-50 dark:bg-[#0B1120]">
      <header className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 pt-6 lg:px-8">
        <Link href="/" className="focus-ring font-bold text-slate-950 dark:text-white">
          BISACOM
        </Link>
        <Link href="/" className="focus-ring text-sm text-blue-700 underline underline-offset-4 dark:text-blue-300">
          Explore my portfolio
        </Link>
      </header>
      <h1 className="sr-only">{title}</h1>
      <EbookWaitlist />
    </main>
  );
}
