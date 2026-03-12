"use client"

import React from "react"
import { CheckCircle2, Award } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { MirrorEngravedFrame } from "@/components/mirror-engraved-frame"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

export function About() {
  const { t } = useLanguage()
  const ref = useScrollReveal()

  const features = [t("feature1"), t("feature2"), t("feature3"), t("feature4"), t("feature5"), t("feature6")]

  return (
    <section id="about" className="py-24 px-4 lg:px-8 relative overflow-hidden bg-background" ref={ref as React.RefObject<HTMLDivElement>}>
      <div className="absolute inset-0 z-0" style={{ backgroundColor: 'oklch(0.12 0.01 0)' }}>
        <div className="absolute inset-0 damask-black opacity-20" />
      </div>
      <div className="mirror-divider absolute top-0 left-0 right-0" />

      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
          {/* Mirror showcase */}
          <div className="order-2 lg:order-1 relative reveal reveal-delay-2">
            <MirrorEngravedFrame className="aspect-[4/5] shadow-2xl mirror-border-small">
              <img
                src="/modern-glass-manufacturing-facility-with-precision.jpg"
                alt="Modern House manufacturing facility"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/25 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/20 pointer-events-none" />
            </MirrorEngravedFrame>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2 space-y-8 reveal">
            <div className="space-y-5">
              <span className="section-label">{t("aboutLabel")}</span>

              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground text-balance section-heading-editorial">
                {t("aboutTitle")}
              </h2>
              <p className="text-base text-white/55 leading-relaxed">{t("aboutDescription")}</p>

              {/* Inline stat strip */}
              <div className="flex items-center gap-6 py-4 border-y border-white/[0.07]">
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">15<span style={{ color: 'var(--lux-gold)' }}>+</span></p>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest mt-0.5">{t("statYearsLabel")}</p>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">500<span style={{ color: 'var(--lux-gold)' }}>+</span></p>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest mt-0.5">{t("statProjectsLabel")}</p>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">50<span style={{ color: 'var(--lux-gold)' }}>+</span></p>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest mt-0.5">{t("statClientsLabel")}</p>
                </div>
              </div>
            </div>

            {/* Features list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 py-3 px-4 rounded-xl border border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.02] transition-all duration-300"
                >
                  <CheckCircle2 className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: 'var(--lux-gold)' }} />
                  <span className="text-white/65 text-sm leading-relaxed">{feature}</span>
                </div>
              ))}
            </div>

            {/* Signature highlight */}
            <div className="glass-card p-6 rounded-2xl border border-white/10 backdrop-blur-xl">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl" style={{ background: 'rgba(255,220,120,0.08)', border: '1px solid rgba(255,220,120,0.2)' }}>
                  <Award className="h-6 w-6" style={{ color: 'var(--lux-gold)' }} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1.5 font-playfair-heading">{t("engravedMirrorArtistry")}</h3>
                  <p className="text-white/55 text-sm leading-relaxed">
                    {t("engravedMirrorArtistryDesc")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
