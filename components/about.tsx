"use client"

import { CheckCircle2, Zap, Award } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { MirrorEngravedFrame } from "@/components/mirror-engraved-frame"

export function About() {
  const { t } = useLanguage()

  const features = [t("feature1"), t("feature2"), t("feature3"), t("feature4"), t("feature5"), t("feature6")]

  return (
    <section id="about" className="py-24 px-4 lg:px-8 relative overflow-hidden bg-background">
      <div className="absolute inset-0 z-0" style={{ backgroundColor: 'oklch(0.12 0.01 0)' }}>
        <div className="absolute inset-0 damask-black opacity-20" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
          {/* Mirror showcase - simplified for mobile performance */}
          <div className="order-2 lg:order-1 relative">
            {/* Main mirror frame - removed heavy animations */}
            <MirrorEngravedFrame className="aspect-[4/5] shadow-2xl mirror-border-small">
              <img
                src="/modern-glass-manufacturing-facility-with-precision.jpg"
                alt="Modern House manufacturing facility"
                className="w-full h-full object-cover"
              />
              
              {/* Simplified mirror reflections */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/25 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/20 pointer-events-none" />
            </MirrorEngravedFrame>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full">
                <Zap className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold text-primary">{t("premiumMirrorManufacturing")}</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground text-balance">
                {t("aboutTitle")}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">{t("aboutDescription")}</p>
            </div>

            {/* Features - simplified for mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-br from-white/5 to-transparent border border-white/10"
                >
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                  </div>
                  <span className="text-foreground text-sm leading-relaxed">{feature}</span>
                </div>
              ))}
            </div>

            {/* Mirror specialty highlight - simplified */}
            <div className="glass-card p-6 rounded-2xl border border-primary/20 backdrop-blur-xl">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/20 rounded-xl">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{t("engravedMirrorArtistry")}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">
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
