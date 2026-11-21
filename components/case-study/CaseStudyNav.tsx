"use client"

import {useEffect, useRef, useState} from "react"

type Item = {id: string; label: string}

export default function CaseStudyNav({items}: {items: Item[]}) {
  const [active, setActive] = useState(items[0]?.id || "")
  const scrollerRef = useRef<HTMLDivElement>(null)

  // On narrow screens the chips scroll sideways; keep the active one in view without moving the page.
  useEffect(() => {
    const scroller = scrollerRef.current
    const chip = scroller?.querySelector<HTMLElement>(`[data-section="${active}"]`)
    if (!scroller || !chip) return
    const left = chip.offsetLeft - scroller.clientWidth / 2 + chip.offsetWidth / 2
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    scroller.scrollTo({left, behavior: reduce ? "auto" : "smooth"})
  }, [active])

  useEffect(() => {
    const observers = items.map((item) => {
      const el = document.getElementById(item.id)
      if (!el) return null
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(item.id)
        },
        {rootMargin: "-35% 0px -55% 0px", threshold: 0.01},
      )
      observer.observe(el)
      return observer
    })

    return () => observers.forEach((observer) => observer?.disconnect())
  }, [items])

  if (!items.length) return null

  return (
    <div className="sticky top-[4.5rem] z-30 border-y border-slate-200/80 bg-white/85 backdrop-blur-xl dark:border-white/10 dark:bg-[#070B16]/85">
      <div ref={scrollerRef} className="mx-auto max-w-7xl overflow-x-auto px-6 lg:px-8">
        <nav className="flex min-w-max gap-2 px-1 py-3" aria-label="Case study sections">
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              data-section={item.id}
              aria-current={active === item.id ? "location" : undefined}
              className={`inline-flex min-h-11 items-center rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-150 ${
                active === item.id
                  ? "bg-[#2D5BFF] text-white"
                  : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  )
}
