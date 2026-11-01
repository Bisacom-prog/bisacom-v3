import type { Metadata } from "next";
import EbookWaitlist from "@/components/EbookWaitlist";
import PlannerBookUpsell from "@/components/PlannerBookUpsell";

const title = "Free 30-Day Product Design Career Planner";
const description =
  "Get the free 30-Day Product Design Career Planner, the companion resource to From Beginner to Hired by Bismark Apenkwah, with a practical action plan for portfolio, interview and job-search progress.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/free-planner" },
  openGraph: {
    title,
    description,
    url: "https://bisacom.dev/free-planner",
    type: "website",
    images: [{ url: "/img/From-beginner.webp", alt: "From Beginner to Hired book cover" }],
  },
  twitter: {
    card: "summary",
    title,
    description,
    images: ["/img/From-beginner.webp"],
  },
};

export default function FreePlannerPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120]">
      
      <h1 className="sr-only">{title}</h1>
      <EbookWaitlist />
      <div className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">
        <PlannerBookUpsell />
      </div>
    </div>
  );
}
