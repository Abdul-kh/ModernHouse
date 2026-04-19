"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/lib/language-context"

const QUOTES = [
  {
    quote: "testimonialQuote",
    author: "testimonialAuthor",
    company: "testimonialCompany",
  },
  {
    quote: "testimonialQuote2",
    author: "testimonialAuthor2",
    company: "testimonialCompany2",
  },
  {
    quote: "testimonialQuote3",
    author: "testimonialAuthor3",
    company: "testimonialCompany3",
  },
]

export function Testimonial() {
  const { t } = useLanguage()
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const [active, setActive] = useState(0)

  return (
    <section ref={ref} className="py-24 relative overflow-hidden" style={{ background: "linear-gradient(180deg, oklch(0.10 0.01 0) 0%, oklch(0.11 0.012 15) 100%)" }}>
      <div className="absolute inset-0 damask-black opacity-12 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,220,120,0.25), transparent)" }} />

      {/* Background large quote mark */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 select-none pointer-events-none font-bold font-playfair-heading leading-none"
        style={{ fontSize: "clamp(200px, 30vw, 400px)", color: "rgba(255,220,120,0.03)", top: "-60px" }}
        aria-hidden="true"
      >
        &ldquo;
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <span className="section-label justify-center mb-8 inline-flex">Testimonials</span>

          {/* Carousel */}
          <div className="relative min-h-[220px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="px-4 md:px-12"
              >
                {/* Stars */}
                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4" viewBox="0 0 20 20" fill="var(--lux-gold)">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <blockquote
                  className="mb-8 font-playfair-heading italic leading-relaxed"
                  style={{ fontSize: "clamp(1.15rem, 2.2vw, 1.6rem)", color: "rgba(255,255,255,0.85)" }}
                >
                  &ldquo;{t(QUOTES[active].quote as Parameters<typeof t>[0])}&rdquo;
                </blockquote>

                <div className="flex items-center justify-center gap-4">
                  <div className="h-px w-10" style={{ background: "rgba(255,220,120,0.4)" }} />
                  <div className="text-center">
                    <p className="font-semibold text-white text-sm">{t(QUOTES[active].author as Parameters<typeof t>[0])}</p>
                    <p className="text-white/40 text-xs mt-0.5">{t(QUOTES[active].company as Parameters<typeof t>[0])}</p>
                  </div>
                  <div className="h-px w-10" style={{ background: "rgba(255,220,120,0.4)" }} />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dot pagination */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {QUOTES.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === active ? "2rem" : "0.5rem",
                  height: "0.375rem",
                  background: i === active ? "var(--lux-gold)" : "rgba(255,255,255,0.2)",
                }}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)" }} />
    </section>
  )
}
