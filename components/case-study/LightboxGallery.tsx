"use client"

import {useEffect, useState} from "react"

type Item = {src: string; alt: string; caption?: string}

export default function LightboxGallery({
  items,
  mode = "grid",
}: {
  items: Item[]
  mode?: "grid" | "flow"
}) {
  const [active, setActive] = useState<number | null>(null)

  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null)
      if (event.key === "ArrowRight" && active !== null)
        setActive((active + 1) % items.length)
      if (event.key === "ArrowLeft" && active !== null)
        setActive((active - 1 + items.length) % items.length)
    }
    window.addEventListener("keydown", close)
    return () => window.removeEventListener("keydown", close)
  }, [active, items.length])

  return (
    <>
      <div
        className={
          mode === "flow"
            ? "flex min-w-max gap-5"
            : "grid gap-6 md:grid-cols-2"
        }
      >
        {items.map((item, index) => (
          <button
            key={`${item.src}-${index}`}
            onClick={() => setActive(index)}
            className={
              mode === "flow"
                ? "group w-[280px] shrink-0 text-left md:w-[330px]"
                : "group text-left"
            }
          >
            <figure className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition duration-300 group-hover:-translate-y-1 group-hover:shadow-xl dark:border-white/10 dark:bg-white/[0.04]">
              <img
                src={item.src}
                alt={item.alt}
                className="h-auto w-full object-cover transition duration-500 group-hover:scale-[1.02]"
              />
              {item.caption && (
                <figcaption className="border-t border-slate-200 px-5 py-4 text-sm text-slate-600 dark:border-white/10 dark:text-slate-400">
                  {item.caption}
                </figcaption>
              )}
            </figure>
          </button>
        ))}
      </div>

      {active !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setActive(null)}
        >
          <button
            className="absolute right-5 top-5 rounded-full bg-white/10 px-4 py-2 text-white"
            onClick={() => setActive(null)}
          >
            Close
          </button>
          <button
            className="absolute left-4 rounded-full bg-white/10 px-4 py-3 text-white md:left-8"
            onClick={(e) => {
              e.stopPropagation()
              setActive((active - 1 + items.length) % items.length)
            }}
          >
            ←
          </button>
          <div className="max-h-[90vh] max-w-6xl" onClick={(e) => e.stopPropagation()}>
            <img
              src={items[active].src}
              alt={items[active].alt}
              className="max-h-[82vh] w-auto rounded-2xl object-contain"
            />
            {items[active].caption && (
              <p className="mt-4 text-center text-sm text-slate-300">
                {items[active].caption}
              </p>
            )}
          </div>
          <button
            className="absolute right-4 rounded-full bg-white/10 px-4 py-3 text-white md:right-8"
            onClick={(e) => {
              e.stopPropagation()
              setActive((active + 1) % items.length)
            }}
          >
            →
          </button>
        </div>
      )}
    </>
  )
}
