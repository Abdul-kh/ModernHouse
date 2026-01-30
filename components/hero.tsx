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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)
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

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)
  }

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length)
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        {heroImages.map((image, index) => (
          <div
            key={image}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={image || "/placeholder.svg"}
              alt={`Hero background ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
          </div>
        ))}
      </div>

      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute inset-0 damask-black opacity-35" />
        <div className="absolute inset-0 lux-vignette opacity-90" />

        <div className="absolute top-0 right-0 h-full w-[44%] hidden md:block">
          <div className="absolute inset-0 bg-primary/20" />
          <div className="absolute inset-0 damask-red opacity-35" />
          <div className="absolute inset-0 bg-gradient-to-l from-black/40 via-black/10 to-transparent" />
        </div>

        <div className="absolute top-0 right-[44%] h-full w-24 hidden md:block">
          <div className="absolute inset-y-[-20%] left-1/2 -translate-x-1/2 w-24 rounded-full bg-[linear-gradient(to_bottom,rgba(255,220,120,0.0),rgba(255,220,120,0.55),rgba(255,220,120,0.0))] blur-[0.5px] opacity-90" />
          <div className="absolute inset-y-[-20%] left-1/2 -translate-x-1/2 w-14 rounded-full bg-[linear-gradient(to_bottom,rgba(0,0,0,0.75),rgba(0,0,0,0.25),rgba(0,0,0,0.75))] opacity-80" />
          <div className="absolute inset-y-[-20%] left-1/2 -translate-x-1/2 w-10 rounded-full bg-[linear-gradient(to_bottom,rgba(255,255,255,0.0),rgba(255,255,255,0.25),rgba(255,255,255,0.0))] opacity-70" />
        </div>

        <div className="absolute inset-0 opacity-[0.08]">
          <div className="absolute inset-0 oriental-mosaic" />
        </div>

        <img
          src="/logo.png"
          alt=""
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] max-w-[80vw] opacity-[0.06] blur-[0.2px] hidden sm:block"
        />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10 pt-20">
        <div className="max-w-5xl mx-auto text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-8 text-balance drop-shadow-2xl [text-shadow:0_18px_60px_rgba(0,0,0,0.8)]">
              {t("heroTitle")}
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-12 leading-relaxed drop-shadow-lg">
              {t("heroDescription")}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up">
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
              className="border-2 border-white text-white hover:bg-white hover:text-foreground bg-transparent backdrop-blur-sm text-base px-8 py-6 shadow-2xl transition-all"
            >
              {t("requestConsultation")}
            </Button>
          </div>

          <div className="flex items-center justify-center gap-2 mt-16">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentImageIndex ? "w-8 bg-primary" : "w-2 bg-white/50 hover:bg-white/75"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
