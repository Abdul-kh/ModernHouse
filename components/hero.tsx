"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

const heroImages = [
  "/modern-luxury-mirror-installation-in-elegant-inter.jpg",
  "/contemporary-shower-with-led-mirror-lighting.jpg",
  "/carved-glass-decorative-wall-feature-in-upscale-sp.jpg",
  "/decorative-colored-glass-panels-with-artistic-patt.jpg",
]

export function Hero() {
  const { t } = useLanguage()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)
        setIsTransitioning(false)
      }, 600)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId)
    if (el) {
      const header = document.querySelector("header") as HTMLElement | null
      const headerHeight = header ? header.offsetHeight : 0
      const top = el.getBoundingClientRect().top + window.scrollY - headerHeight - 8
      window.scrollTo({ top, behavior: "smooth" })
    }
  }

  const getPrevIndex = () => (currentImageIndex - 1 + heroImages.length) % heroImages.length
  const getNextIndex = () => (currentImageIndex + 1) % heroImages.length

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-background to-black/40" />
        <div className="absolute inset-0 damask-black opacity-20" />
      </div>

      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          <div className="order-2 lg:order-1 text-center lg:text-left space-y-8 animate-fade-in-up">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight text-white text-balance drop-shadow-2xl [text-shadow:0_18px_60px_rgba(0,0,0,0.8)]">
                {t("heroTitle")}
              </h1>
              <p className="text-lg md:text-xl text-white/80 leading-relaxed drop-shadow-lg max-w-xl lg:max-w-none mx-auto lg:mx-0">
                {t("heroDescription")}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4">
              <Button
                size="lg"
                onClick={() => scrollToSection("projects")}
                className="bg-primary text-primary-foreground hover:bg-primary/90 group shadow-2xl hover:shadow-primary/50 transition-all text-base px-8 py-6"
              >
                {t("exploreWork")}
                <ArrowRight className="ltr:ml-2 rtl:mr-2 h-5 w-5 group-hover:ltr:translate-x-1 group-hover:rtl:-translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection("contact")}
                className="border-2 border-white text-white hover:bg-white hover:text-black bg-transparent backdrop-blur-sm text-base px-8 py-6 shadow-2xl transition-all"
              >
                {t("requestConsultation")}
              </Button>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-3 pt-4">
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsTransitioning(true)
                    setTimeout(() => {
                      setCurrentImageIndex(index)
                      setIsTransitioning(false)
                    }, 600)
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentImageIndex 
                      ? "w-12 bg-primary shadow-lg shadow-primary/50" 
                      : "w-2 bg-white/40 hover:bg-white/70 hover:w-6"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="order-1 lg:order-2 relative h-[500px] md:h-[600px] lg:h-[700px]" style={{ perspective: "2000px" }}>
            <button
              onClick={() => {
                setIsTransitioning(true)
                setTimeout(() => {
                  setCurrentImageIndex(getPrevIndex())
                  setIsTransitioning(false)
                }, 600)
              }}
              className="absolute left-0 top-1/2 -translate-y-1/2 w-[240px] h-[340px] md:w-[280px] md:h-[400px] opacity-50 hover:opacity-70 scale-80 hover:scale-85 -translate-x-4 md:-translate-x-8 z-0 transition-all duration-500 cursor-pointer group"
            >
              <div className="mirror-frame-3d w-full h-full overflow-hidden relative">
                <img
                  src={heroImages[getPrevIndex()] || "/placeholder.svg"}
                  alt="Previous mirror"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/30" />
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-300" />
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 140" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="frameGradientSmall" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: "rgba(255,255,255,0.3)", stopOpacity: 1 }} />
                      <stop offset="50%" style={{ stopColor: "rgba(255,255,255,0.1)", stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: "rgba(255,255,255,0.25)", stopOpacity: 1 }} />
                    </linearGradient>
                  </defs>
                  <rect x="1" y="1" width="98" height="138" rx="12" fill="none" stroke="url(#frameGradientSmall)" strokeWidth="2" opacity="0.6" />
                  <rect x="3" y="3" width="94" height="134" rx="10" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" opacity="0.4" />
                </svg>
              </div>
            </button>

            <div 
              className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[460px] md:w-[380px] md:h-[540px] lg:w-[440px] lg:h-[620px] z-10 transition-all duration-700 ${
                isTransitioning ? "scale-95 opacity-80" : "scale-100 opacity-100"
              }`}
            >
              <div className="mirror-frame-3d animate-mirror-glow w-full h-full overflow-hidden relative">
                <img
                  src={heroImages[currentImageIndex] || "/placeholder.svg"}
                  alt={`Mirror showcase ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/40" />
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent animate-pulse" />
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 140" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="frameGradientMain" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: "rgba(255,255,255,0.5)", stopOpacity: 1 }} />
                      <stop offset="50%" style={{ stopColor: "rgba(255,255,255,0.2)", stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: "rgba(255,255,255,0.4)", stopOpacity: 1 }} />
                    </linearGradient>
                    <linearGradient id="innerFrameGradient" x1="100%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" style={{ stopColor: "rgba(255,255,255,0.3)", stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: "rgba(255,255,255,0.1)", stopOpacity: 1 }} />
                    </linearGradient>
                  </defs>
                  <rect x="0.5" y="0.5" width="99" height="139" rx="15" fill="none" stroke="url(#frameGradientMain)" strokeWidth="3" opacity="0.8" />
                  <rect x="2.5" y="2.5" width="95" height="135" rx="13" fill="none" stroke="url(#innerFrameGradient)" strokeWidth="1.5" opacity="0.6" />
                  <rect x="4.5" y="4.5" width="91" height="131" rx="11" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" opacity="0.5" />
                </svg>
              </div>
              
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-black/40 blur-2xl rounded-full" />
            </div>

            <button
              onClick={() => {
                setIsTransitioning(true)
                setTimeout(() => {
                  setCurrentImageIndex(getNextIndex())
                  setIsTransitioning(false)
                }, 600)
              }}
              className="absolute right-0 top-1/2 -translate-y-1/2 w-[240px] h-[340px] md:w-[280px] md:h-[400px] opacity-50 hover:opacity-70 scale-80 hover:scale-85 translate-x-4 md:translate-x-8 z-0 transition-all duration-500 cursor-pointer group"
            >
              <div className="mirror-frame-3d w-full h-full overflow-hidden relative">
                <img
                  src={heroImages[getNextIndex()] || "/placeholder.svg"}
                  alt="Next mirror"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-bl from-white/10 via-transparent to-black/30" />
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-300" />
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 140" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="frameGradientRight" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: "rgba(255,255,255,0.3)", stopOpacity: 1 }} />
                      <stop offset="50%" style={{ stopColor: "rgba(255,255,255,0.1)", stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: "rgba(255,255,255,0.25)", stopOpacity: 1 }} />
                    </linearGradient>
                  </defs>
                  <rect x="1" y="1" width="98" height="138" rx="12" fill="none" stroke="url(#frameGradientRight)" strokeWidth="2" opacity="0.6" />
                  <rect x="3" y="3" width="94" height="134" rx="10" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" opacity="0.4" />
                </svg>
              </div>
            </button>

            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none z-[2]">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2" />
      </div>
    </section>
  )
}
