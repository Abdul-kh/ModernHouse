"use client"

import { CheckCircle2, Sparkles, Zap, Award } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function About() {
  const { t } = useLanguage()

  const features = [t("feature1"), t("feature2"), t("feature3"), t("feature4"), t("feature5"), t("feature6")]

  return (
    <section id="about" className="py-24 px-4 lg:px-8 relative overflow-hidden">
      {/* Futuristic background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-white/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 oriental-mosaic opacity-5" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
          {/* Mirror showcase with engraved decorations */}
          <div className="order-2 lg:order-1 relative">
            {/* Floating decorative elements */}
            <div className="absolute -top-8 -left-8 w-24 h-24 border-2 border-primary/30 rounded-full animate-mirror-float" />
            <div className="absolute -bottom-8 -right-8 w-32 h-32 border-2 border-white/20 rounded-full animate-mirror-float" style={{ animationDelay: "1s" }} />
            
            {/* Main mirror frame */}
            <div className="relative aspect-[4/5] overflow-hidden shadow-2xl group mirror-frame-3d animate-mirror-glow">
              <img
                src="/modern-glass-manufacturing-facility-with-precision.jpg"
                alt="Modern House manufacturing facility"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              
              {/* Engraved oriental decorations overlay */}
              <div className="absolute inset-0 oriental-mosaic opacity-30 pointer-events-none mix-blend-overlay" />
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-40 h-40 oriental-mosaic opacity-50 bg-gradient-to-br from-white/30 to-transparent" />
                <div className="absolute top-0 right-0 w-40 h-40 oriental-mosaic opacity-50 bg-gradient-to-bl from-white/30 to-transparent" />
                <div className="absolute bottom-0 left-0 w-40 h-40 oriental-mosaic opacity-50 bg-gradient-to-tr from-white/30 to-transparent" />
                <div className="absolute bottom-0 right-0 w-40 h-40 oriental-mosaic opacity-50 bg-gradient-to-tl from-white/30 to-transparent" />
              </div>
              
              {/* Mirror reflections */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/25 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/20 pointer-events-none" />
              
              {/* Mirror frame SVG */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 125" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="aboutFrameGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: "rgba(255,255,255,0.7)", stopOpacity: 1 }} />
                    <stop offset="50%" style={{ stopColor: "rgba(255,255,255,0.4)", stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: "rgba(255,255,255,0.6)", stopOpacity: 1 }} />
                  </linearGradient>
                </defs>
                <rect x="0.5" y="0.5" width="99" height="124" rx="15" fill="none" stroke="url(#aboutFrameGradient)" strokeWidth="4" opacity="0.9" />
                <rect x="3" y="3" width="94" height="119" rx="13" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" opacity="0.7" />
                <rect x="5.5" y="5.5" width="89" height="114" rx="11" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" opacity="0.6" />
              </svg>

              {/* Specialty badge */}
              <div className="absolute top-6 right-6 glass-card px-4 py-2 rounded-full border border-primary/30 backdrop-blur-md">
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-primary" />
                  <span className="text-xs font-semibold text-white">Mirror Specialists</span>
                </div>
              </div>
            </div>

            {/* Floating info cards */}
            <div className="absolute -bottom-6 -right-6 glass-card p-4 rounded-2xl border border-white/20 backdrop-blur-xl shadow-2xl max-w-[200px] animate-fade-in-up">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-primary/20 rounded-lg">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">500+</p>
                  <p className="text-xs text-white/70">Engraved Mirrors</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content with futuristic styling */}
          <div className="order-1 lg:order-2 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full">
                <Zap className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold text-primary">Premium Mirror Manufacturing</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground text-balance">
                {t("aboutTitle")}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">{t("aboutDescription")}</p>
            </div>

            {/* Features with mirror-themed icons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="group flex items-start gap-3 p-4 rounded-xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 hover:border-primary/30 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                  </div>
                  <span className="text-foreground text-sm leading-relaxed">{feature}</span>
                </div>
              ))}
            </div>

            {/* Mirror specialty highlight */}
            <div className="glass-card p-6 rounded-2xl border border-primary/20 backdrop-blur-xl">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/20 rounded-xl">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Engraved Mirror Artistry</h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    Specializing in custom oriental mosaic engravings and decorative patterns on premium mirrors and glass surfaces.
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
