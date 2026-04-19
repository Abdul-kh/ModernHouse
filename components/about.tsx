"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { useLanguage } from "@/lib/language-context"

export function About() {
  const { t } = useLanguage()
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const features = [t("feature1"), t("feature2"), t("feature3"), t("feature4"), t("feature5"), t("feature6")]

  const stats = [
    { num: "15+", label: t("statYearsLabel") },
    { num: "500+", label: t("statProjectsLabel") },
    { num: "50+", label: t("statClientsLabel") },
  ]

  return (
    <section id="about" ref={ref} className="py-24 relative overflow-hidden section-bg-3">
      <div className="absolute inset-0 damask-black opacity-12 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,220,120,0.2), transparent)" }} />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center max-w-7xl mx-auto">

          {/* Left — image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="order-2 lg:order-1 relative"
          >
            <div className="relative rounded-2xl overflow-hidden mirror-frame-3d shadow-2xl" style={{ aspectRatio: "4/5" }}>
              <img
                src="/modern-glass-manufacturing-facility-with-precision.jpg"
                alt="Modern House manufacturing facility"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-white/8 via-transparent to-black/40 pointer-events-none" />
            </div>
            {/* Floating stat badges */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -bottom-5 -right-5 rounded-2xl p-5 shadow-2xl backdrop-blur-xl"
              style={{ background: "rgba(10,10,10,0.85)", border: "1px solid rgba(255,220,120,0.2)" }}
            >
              <p className="text-3xl font-black text-white">15<span style={{ color: "var(--lux-gold)" }}>+</span></p>
              <p className="text-[10px] text-white/40 uppercase tracking-widest mt-1">{t("statYearsLabel")}</p>
            </motion.div>
          </motion.div>

          {/* Right — content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="order-1 lg:order-2 space-y-8"
          >
            <div>
              <span className="section-label mb-4 inline-flex">{t("aboutLabel")}</span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mt-4 mb-5 section-heading-editorial">
                {t("aboutTitle")}
              </h2>
              <p className="text-base text-white/50 leading-relaxed">{t("aboutDescription")}</p>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="text-center py-4 px-3 rounded-xl"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <p className="text-2xl font-black text-white" style={{ WebkitTextFillColor: "white" }}>
                    {s.num.replace("+", "")}<span style={{ color: "var(--lux-gold)", WebkitTextFillColor: "var(--lux-gold)" }}>{s.num.includes("+") ? "+" : ""}</span>
                  </p>
                  <p className="text-[9px] text-white/35 uppercase tracking-widest mt-1">{s.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Features as pills */}
            <div>
              <p className="text-xs text-white/30 uppercase tracking-widest mb-4">{t("aboutLabel")}</p>
              <div className="flex flex-wrap gap-2">
                {features.map((feature, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.5 + i * 0.06 }}
                    className="px-4 py-2 rounded-full text-sm text-white/70 transition-all hover:text-white"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    {feature}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Signature card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="rounded-2xl p-5 backdrop-blur-xl"
              style={{ background: "linear-gradient(135deg, rgba(255,220,120,0.06), rgba(255,220,120,0.02))", border: "1px solid rgba(255,220,120,0.15)" }}
            >
              <p className="text-xs uppercase tracking-[0.2em] mb-2" style={{ color: "var(--lux-gold)" }}>{t("engravedMirrorArtistry")}</p>
              <p className="text-white/60 text-sm leading-relaxed">{t("engravedMirrorArtistryDesc")}</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
