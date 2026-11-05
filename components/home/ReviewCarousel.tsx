"use client";

import {useCallback, useEffect, useRef, useState} from "react";
import type {Review} from "@/lib/reviews";

const INTERVAL_MS = 6000;

function initials(name: string) {
  return name
    .replace(/^(miss|mrs|mr|ms|dr)\.?\s+/i, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function Stars({rating, className = ""}: {rating: number; className?: string}) {
  const full = Math.round(rating);
  return (
    <span className={className} role="img" aria-label={`${rating.toFixed(1).replace(/\.0$/, "")} out of 5 stars`}>
      <span className="text-amber-500 dark:text-amber-400">{"★".repeat(full)}</span>
      <span className="text-slate-300 dark:text-slate-600">{"★".repeat(5 - full)}</span>
    </span>
  );
}

export default function ReviewCarousel({reviews}: {reviews: Review[]}) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const touchStart = useRef<number | null>(null);
  const count = reviews.length;

  const average = reviews.reduce((sum, r) => sum + r.rating, 0) / count;

  const go = useCallback((delta: number) => setActive((i) => (i + delta + count) % count), [count]);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (count < 2 || paused || reducedMotion) return;
    const timer = window.setTimeout(() => go(1), INTERVAL_MS);
    return () => window.clearTimeout(timer);
  }, [active, paused, reducedMotion, count, go]);

  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm text-slate-700 shadow-sm dark:border-white/10 dark:bg-[#0B1120] dark:text-slate-300">
        <span className="text-amber-500 dark:text-amber-400" aria-hidden="true">★</span>
        <span className="font-semibold text-slate-950 dark:text-white">
          {average.toFixed(1)}
          <span className="sr-only"> out of 5 average rating</span>
        </span>
        <span aria-hidden="true">·</span>
        <span>
          {count} client {count === 1 ? "review" : "reviews"}
        </span>
      </p>

      <h2 className="mx-auto mt-6 max-w-2xl text-4xl font-black leading-[1.05] tracking-tight text-slate-950 md:text-6xl dark:text-white">
        Trusted collaboration, clearly delivered
      </h2>

      <div
        className="relative mt-12 text-left"
        role="region"
        aria-roledescription="carousel"
        aria-label="Client reviews"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
        onTouchStart={(e) => {
          touchStart.current = e.touches[0].clientX;
          setPaused(true);
        }}
        onTouchEnd={(e) => {
          const start = touchStart.current;
          touchStart.current = null;
          setPaused(false);
          if (start === null) return;
          const dx = e.changedTouches[0].clientX - start;
          if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") go(1);
          if (e.key === "ArrowLeft") go(-1);
        }}
      >
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-[0_24px_60px_-30px_rgba(15,23,42,0.35)] dark:border-white/10 dark:bg-[#0B1120]">
          {/* Every slide shares one grid cell, so the card keeps the height of the longest review and never jumps. */}
          <div className="grid">
            {reviews.map((review, index) => {
              const isActive = index === active;
              return (
                <figure
                  key={review._id}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} of ${count}`}
                  aria-hidden={!isActive}
                  inert={!isActive}
                  className={`col-start-1 row-start-1 flex flex-col p-7 transition-all duration-700 ease-out motion-reduce:transition-none md:p-10 ${
                    isActive ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-base font-black uppercase tracking-[0.08em] text-slate-950 dark:text-white">
                      {review.company || review.name}
                    </span>
                    <Stars rating={review.rating} className="text-sm" />
                  </div>

                  <blockquote className="mt-6 text-lg font-medium leading-8 text-slate-800 md:text-xl md:leading-9 dark:text-slate-200">
                    “{review.review}”
                  </blockquote>

                  <figcaption className="mt-auto flex items-center gap-3 pt-8">
                    <span
                      aria-hidden="true"
                      className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#2049db] text-sm font-bold text-white dark:bg-[#a9bbff] dark:text-[#050914]"
                    >
                      {initials(review.name)}
                    </span>
                    <span>
                      <b className="block text-slate-950 dark:text-white">{review.name}</b>
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        {[review.role, review.company].filter(Boolean).join(" · ")}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              );
            })}
          </div>

          {count > 1 && !reducedMotion && (
            <div className="absolute inset-x-0 bottom-0 h-1 bg-slate-200/70 dark:bg-white/5" aria-hidden="true">
              <div
                key={`${active}-${paused}`}
                className="review-progress h-full bg-[#2049db] dark:bg-[#a9bbff]"
                style={{animationDuration: `${INTERVAL_MS}ms`, animationPlayState: paused ? "paused" : "running"}}
              />
            </div>
          )}
        </div>

        {count > 1 && (
          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous review"
              className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:border-slate-400 hover:text-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2049db] dark:border-white/10 dark:bg-[#0B1120] dark:text-slate-300 dark:hover:text-white"
            >
              <span aria-hidden="true">←</span>
            </button>
            <div className="flex items-center gap-2">
              {reviews.map((review, index) => (
                <button
                  key={review._id}
                  type="button"
                  onClick={() => setActive(index)}
                  aria-label={`Show review from ${review.name}`}
                  aria-current={index === active}
                  className="group grid h-11 w-6 place-items-center"
                >
                  <span
                    className={`block h-2 rounded-full transition-all duration-300 ${
                      index === active ? "w-6 bg-[#2049db] dark:bg-[#a9bbff]" : "w-2 bg-slate-300 group-hover:bg-slate-400 dark:bg-slate-600"
                    }`}
                  />
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next review"
              className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:border-slate-400 hover:text-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2049db] dark:border-white/10 dark:bg-[#0B1120] dark:text-slate-300 dark:hover:text-white"
            >
              <span aria-hidden="true">→</span>
            </button>
          </div>
        )}
        <p className="sr-only" aria-live="polite">
          {paused || reducedMotion ? `Review ${active + 1} of ${count} from ${reviews[active].name}` : ""}
        </p>
      </div>
    </div>
  );
}
