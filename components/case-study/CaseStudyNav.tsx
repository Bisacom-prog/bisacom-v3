"use client"

import {useEffect, useState} from "react"

type Item = {id: string; label: string}

export default function CaseStudyNav({items}: {items: Item[]}) {
  const [active, setActive] = useState(items[0]?.id || "")

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
    <div className="sticky top-0 z-40 border-y border-slate-200/80 bg-white/85 backdrop-blur-xl dark:border-white/10 dark:bg-[#070B16]/85">
      <div className="mx-auto max-w-7xl overflow-x-auto px-6 lg:px-8">
        <nav className="flex min-w-max gap-2 py-3" aria-label="Case study sections">
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
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
