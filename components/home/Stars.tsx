import type {Review} from "@/lib/reviews";

export function averageRating(reviews: Review[]) {
  if (!reviews.length) return 0;
  return reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
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
