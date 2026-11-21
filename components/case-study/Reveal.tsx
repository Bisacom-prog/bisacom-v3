"use client"

import {useEffect, useRef, useState} from "react"

export default function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      {threshold: 0.01},
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{transitionDelay: `${delay}ms`}}
      // Only animate for people who have not asked for reduced motion; for them content is simply visible.
      className={`${className} motion-safe:transition-[opacity,transform] motion-safe:duration-500 motion-safe:ease-out ${
        visible ? "translate-y-0 opacity-100" : "motion-safe:translate-y-6 motion-safe:opacity-0"
      }`}
    >
      {children}
    </div>
  )
}
