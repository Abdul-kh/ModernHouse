"use client"

import { useEffect, useRef, useState } from "react"
import { useLanguage } from "@/lib/language-context"

function useCountUp(target: number, duration = 1800, start = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!start) return
    let startTime: number | null = null
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [start, target, duration])

  return count
}

function StatItem({
  num,
  suffix,
  label,
  delay,
  animate,
}: {
  num: number
  suffix: string
  label: string
  delay: number
  animate: boolean
}) {
  const count = useCountUp(num, 1600, animate)

  return (
    <div
      className="reveal flex flex-col items-center text-center px-6 py-8 md:py-10 relative"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="stat-number">
        {animate ? count : 0}
        <span className="stat-accent">{suffix}</span>
      </div>
      <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/40">{label}</p>
    </div>
  )
}

export function StatsBar() {
  const { t } = useLanguage()
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          const revealEls = el.querySelectorAll(".reveal")
          revealEls.forEach((r) => r.classList.add("visible"))
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const stats = [
    { num: 15, suffix: "+", label: t("statYearsLabel") },
    { num: 500, suffix: "+", label: t("statProjectsLabel") },
    { num: 50, suffix: "+", label: t("statClientsLabel") },
    { num: 4, suffix: "", label: t("statServicesLabel") },
  ]

  return (
    <section ref={ref} className="relative overflow-hidden gold-top-border" style={{ backgroundColor: 'oklch(0.10 0.01 0)' }}>
      <div className="absolute inset-0 damask-black opacity-10 pointer-events-none" />
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/[0.06]">
          {stats.map((stat, i) => (
            <StatItem
              key={i}
              num={stat.num}
              suffix={stat.suffix}
              label={stat.label}
              delay={i * 100}
              animate={visible}
            />
          ))}
        </div>
      </div>
      <div className="mirror-divider absolute bottom-0 left-0 right-0 opacity-50" />
    </section>
  )
}
