"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
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

function StatItem({ num, suffix, label, index, animate }: { num: number; suffix: string; label: string; index: number; animate: boolean }) {
  const count = useCountUp(num, 1800, animate)
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={animate ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: "easeOut" }}
      className="flex flex-col items-center text-center px-4 py-10 md:py-14 relative group"
    >
      <div className="relative mb-3">
        <span
          className="font-black leading-none tracking-tight"
          style={{
            fontSize: "clamp(3rem, 6vw, 5rem)",
            background: "linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.7) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {animate ? count : 0}
        </span>
        <span
          className="font-black leading-none ml-1"
          style={{
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            color: "var(--lux-gold)",
            WebkitTextFillColor: "var(--lux-gold)",
          }}
        >
          {suffix}
        </span>
      </div>
      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/35 group-hover:text-white/55 transition-colors">{label}</p>
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-0 group-hover:w-12 transition-all duration-500 rounded-full"
        style={{ background: "var(--lux-gold)" }}
      />
    </motion.div>
  )
}

export function StatsBar() {
  const { t } = useLanguage()
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  const stats = [
    { num: 15, suffix: "+", label: t("statYearsLabel") },
    { num: 500, suffix: "+", label: t("statProjectsLabel") },
    { num: 50, suffix: "+", label: t("statClientsLabel") },
    { num: 4, suffix: "", label: t("statServicesLabel") },
  ]

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ background: "linear-gradient(180deg, oklch(0.10 0.01 0) 0%, oklch(0.11 0.012 15) 100%)" }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,220,120,0.3), transparent)" }} />
      <div className="absolute inset-0 damask-black opacity-8 pointer-events-none" />
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/[0.05]">
          {stats.map((stat, i) => (
            <StatItem key={i} num={stat.num} suffix={stat.suffix} label={stat.label} index={i} animate={isInView} />
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)" }} />
    </section>
  )
}
