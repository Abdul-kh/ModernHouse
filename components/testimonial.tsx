"use client"

import React from "react"
import { useLanguage } from "@/lib/language-context"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

export function Testimonial() {
  const { t } = useLanguage()
  const ref = useScrollReveal()

  return (
    <section
      className="py-24 px-4 lg:px-8 relative overflow-hidden"
      style={{ backgroundColor: 'oklch(0.10 0.01 0)' }}
      ref={ref as React.RefObject<HTMLDivElement>}
    >
      <div className="absolute inset-0 damask-black opacity-15 pointer-events-none" />
      <div className="mirror-divider absolute top-0 left-0 right-0" />

      {/* Large decorative quote mark */}
      <div
        className="absolute top-12 left-1/2 -translate-x-1/2 text-[12rem] leading-none font-serif pointer-events-none select-none"
        style={{ color: 'rgba(255,220,120,0.04)', fontFamily: 'Georgia, serif' }}
        aria-hidden="true"
      >
        &ldquo;
      </div>

      <div className="container mx-auto relative z-10 max-w-4xl">
        <div className="text-center reveal">
          <span className="section-label justify-center mb-8 inline-flex">{t("testimonialLabel")}</span>
        </div>

        <blockquote className="mt-10 text-center reveal reveal-delay-1">
          <p className="testimonial-quote mx-auto max-w-3xl">
            &ldquo;{t("testimonialQuote")}&rdquo;
          </p>

          <footer className="mt-10 reveal reveal-delay-2">
            {/* Thin gold line */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-16 opacity-40" style={{ background: 'var(--lux-gold)' }} />
              <div className="w-2 h-2 rounded-full" style={{ background: 'var(--lux-gold)', opacity: 0.6 }} />
              <div className="h-px w-16 opacity-40" style={{ background: 'var(--lux-gold)' }} />
            </div>

            <p className="text-sm font-bold text-white/90 tracking-wide">{t("testimonialAuthor")}</p>
            <p className="section-label justify-center mt-1 inline-flex">{t("testimonialCompany")}</p>
          </footer>
        </blockquote>
      </div>

      <div className="mirror-divider absolute bottom-0 left-0 right-0" />
    </section>
  )
}
