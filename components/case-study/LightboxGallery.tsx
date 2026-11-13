"use client"

import {useEffect, useRef, useState} from "react"

type Item = {src: string; alt: string; caption?: string; width?: number; height?: number}

export default function LightboxGallery({
  items,
  mode = "grid",
}: {
  items: Item[]
  mode?: "grid" | "flow"
}) {
  const [active, setActive] = useState<number | null>(null)
  const triggers = useRef<(HTMLButtonElement | null)[]>([])
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const openedFrom = useRef<number | null>(null)
  const isOpen = active !== null
  const many = items.length > 1

  function open(index: number) {
    openedFrom.current = index
    setActive(index)
  }

  function close() {
    setActive(null)
  }

  // While open: focus the dialog, keep Tab inside it, lock page scroll, and hand focus back to
  // the thumbnail that opened it on close, so keyboard and screen-reader users never lose their place.
  useEffect(() => {
    if (!isOpen) return
    closeRef.current?.focus()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault()
        setActive(null)
      } else if (event.key === "ArrowRight" && items.length > 1) {
        setActive((current) => (current === null ? current : (current + 1) % items.length))
      } else if (event.key === "ArrowLeft" && items.length > 1) {
        setActive((current) => (current === null ? current : (current - 1 + items.length) % items.length))
      } else if (event.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>("button")
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener("keydown", onKey)
    const trigger = openedFrom.current
    const triggerElements = triggers.current

    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = previousOverflow
      if (trigger !== null) triggerElements[trigger]?.focus()
    }
  }, [isOpen, items.length])

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
            ref={(element) => {
              triggers.current[index] = element
            }}
            type="button"
            aria-haspopup="dialog"
            onClick={() => open(index)}
            className={
              mode === "flow"
                ? "group w-[280px] shrink-0 rounded-[2rem] text-left md:w-[330px]"
                : "group rounded-[2rem] text-left"
            }
          >
            <figure className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition duration-200 group-hover:-translate-y-1 group-hover:shadow-xl dark:border-white/10 dark:bg-white/[0.04]">
              <img
                src={item.src}
                alt={item.alt}
                width={item.width}
                height={item.height}
                loading="lazy"
                decoding="async"
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
          ref={dialogRef}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={many ? `Image ${active + 1} of ${items.length}` : "Image viewer"}
          onClick={close}
        >
          <button
            ref={closeRef}
            type="button"
            className="absolute right-5 top-5 min-h-11 rounded-full bg-white/10 px-4 py-2 text-white hover:bg-white/20"
            onClick={close}
          >
            Close<span className="sr-only"> image viewer</span>
          </button>
          {many && (
            <button
              type="button"
              aria-label="Previous image"
              className="absolute left-4 z-10 min-h-11 min-w-11 rounded-full bg-white/10 px-4 py-3 text-white hover:bg-white/20 md:left-8"
              onClick={(e) => {
                e.stopPropagation()
                setActive((active - 1 + items.length) % items.length)
              }}
            >
              <span aria-hidden="true">←</span>
            </button>
          )}
          <figure className="max-h-[90vh] max-w-6xl" onClick={(e) => e.stopPropagation()}>
            <img
              src={items[active].src}
              alt={items[active].alt}
              className="max-h-[82vh] w-auto rounded-2xl object-contain"
            />
            {items[active].caption && (
              <figcaption className="mt-4 text-center text-sm text-slate-300">
                {items[active].caption}
              </figcaption>
            )}
          </figure>
          {many && (
            <button
              type="button"
              aria-label="Next image"
              className="absolute right-4 z-10 min-h-11 min-w-11 rounded-full bg-white/10 px-4 py-3 text-white hover:bg-white/20 md:right-8"
              onClick={(e) => {
                e.stopPropagation()
                setActive((active + 1) % items.length)
              }}
            >
              <span aria-hidden="true">→</span>
            </button>
          )}
        </div>
      )}
    </>
  )
}
