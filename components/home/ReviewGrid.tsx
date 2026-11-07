import type {Review} from "@/lib/reviews";

export function averageRating(reviews: Review[]) {
  if (!reviews.length) return 0;
  return reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
}

function initials(name: string) {
  return name
    .replace(/^(miss|mrs|mr|ms|dr)\.?\s+/i, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

// Stars fill to the exact rating (e.g. 4.5 shows four and a half), so the stars and the average always agree.
export function Stars({rating, className = ""}: {rating: number; className?: string}) {
  const pct = Math.max(0, Math.min(5, rating)) / 5 * 100;
  const label = `${rating.toFixed(1).replace(/\.0$/, "")} out of 5 stars`;
  return (
    <span className={`relative inline-block leading-none ${className}`} role="img" aria-label={label}>
      <span className="text-slate-300 dark:text-slate-600" aria-hidden="true">★★★★★</span>
      <span className="absolute inset-y-0 left-0 overflow-hidden whitespace-nowrap text-amber-500 dark:text-amber-400" style={{width: `${pct}%`}} aria-hidden="true">★★★★★</span>
    </span>
  );
}

export default function ReviewGrid({reviews}: {reviews: Review[]}) {
  const average = averageRating(reviews);
  const count = reviews.length;

  return (
    <div>
      <p className="inline-flex flex-wrap items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
        <Stars rating={average} />
        <b className="text-slate-950 dark:text-white">{average.toFixed(1)}</b>
        <span>average from {count} client {count === 1 ? "review" : "reviews"}</span>
      </p>
      <h2 className="mt-3 text-3xl font-black text-slate-950 md:text-4xl dark:text-white">What clients say</h2>
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reviews.slice(0, 6).map((review) => (
          <figure key={review._id} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-7 dark:border-white/10 dark:bg-[#0B1120]">
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-black uppercase tracking-[0.1em] text-slate-500 dark:text-slate-400">{review.company || "Client"}</span>
              <Stars rating={review.rating} className="text-sm" />
            </div>
            <blockquote className="mt-5 flex-1 leading-7 text-slate-800 dark:text-slate-200">“{review.review}”</blockquote>
            <figcaption className="mt-6 flex items-center gap-3">
              <span aria-hidden="true" className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#2049db] text-sm font-bold text-white dark:bg-[#a9bbff] dark:text-[#050914]">{initials(review.name)}</span>
              <span className="text-sm">
                <b className="block text-slate-950 dark:text-white">{review.name}</b>
                <span className="text-slate-600 dark:text-slate-400">{[review.role, review.company].filter(Boolean).join(", ")}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
