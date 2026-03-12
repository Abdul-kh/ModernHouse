"use client"

import React, { useEffect, useState } from "react"
import { Sparkles, Palette, Droplets, Frame, X, ChevronLeft, ChevronRight, ChevronUp, ChevronDown, ArrowRight } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

export function Services() {
  const { t } = useLanguage()
  const [selectedService, setSelectedService] = useState<number | null>(null)
  const [hoveredService, setHoveredService] = useState<number>(0)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [infoExpanded, setInfoExpanded] = useState(false)
  const ref = useScrollReveal()

  const services = [
    {
      icon: Sparkles,
      title: t("mirrorsDecorations"),
      description: t("mirrorsDecorationsDesc"),
      gallery: [
        "/modern-luxury-mirror-installation-in-elegant-inter.jpg",
        "/carved-glass-decorative-wall-feature-in-upscale-sp.jpg",
        "/luxury-hotel-lobby-with-custom-glass-features.jpg",
        "/decorative-colored-glass-panels-with-artistic-patt.jpg",
      ],
      detailedDescription: t("mirrorsDecorationsGalleryDesc"),
    },
    {
      icon: Frame,
      title: t("glassDecorations"),
      description: t("glassDecorationsDesc"),
      gallery: [
        "/decorative-colored-glass-panels-with-artistic-patt.jpg",
        "/carved-glass-decorative-wall-feature-in-upscale-sp.jpg",
        "/modern-glass-tower-building-facade-in-dubai.jpg",
        "/luxury-hotel-lobby-with-custom-glass-features.jpg",
      ],
      detailedDescription: t("glassDecorationsGalleryDesc"),
    },
    {
      icon: Palette,
      title: t("specialtyGlass"),
      description: t("specialtyGlassDesc"),
      gallery: [
        "/decorative-colored-glass-panels-with-artistic-patt.jpg",
        "/carved-glass-decorative-wall-feature-in-upscale-sp.jpg",
        "/modern-office-building-with-glass-curtain-wall.jpg",
        "/luxury-villa-with-floor-to-ceiling-glass-windows.jpg",
      ],
      detailedDescription: t("specialtyGlassGalleryDesc"),
    },
    {
      icon: Droplets,
      title: t("showerMirrors"),
      description: t("showerMirrorsDesc"),
      gallery: [
        "/contemporary-shower-with-led-mirror-lighting.jpg",
        "/luxury-villa-with-floor-to-ceiling-glass-windows.jpg",
        "/modern-luxury-mirror-installation-in-elegant-inter.jpg",
        "/carved-glass-decorative-wall-feature-in-upscale-sp.jpg",
      ],
      detailedDescription: t("showerMirrorsGalleryDesc"),
    },
  ]

  const handleServiceClick = (index: number) => {
    setSelectedService(index)
    setCurrentImageIndex(0)
  }

  const handleCloseGallery = () => {
    setSelectedService(null)
    setCurrentImageIndex(0)
  }

  const handleNextImage = () => {
    if (selectedService !== null) {
      setCurrentImageIndex((prev) => (prev + 1) % services[selectedService].gallery.length)
    }
  }

  const handlePrevImage = () => {
    if (selectedService !== null) {
      setCurrentImageIndex(
        (prev) => (prev - 1 + services[selectedService].gallery.length) % services[selectedService].gallery.length,
      )
    }
  }

  // Lock background scroll when gallery is open and hide header
  useEffect(() => {
    if (selectedService !== null) {
      const previous = document.body.style.overflow
      document.body.style.overflow = "hidden"
      document.body.classList.add("gallery-open")
      return () => {
        document.body.style.overflow = previous
        document.body.classList.remove("gallery-open")
      }
    }
  }, [selectedService])

  return (
    <section id="services" className="py-24 px-4 lg:px-8 relative overflow-hidden bg-background" ref={ref as React.RefObject<HTMLDivElement>}>
      <div className="absolute inset-0 z-0" style={{ backgroundColor: 'oklch(0.12 0.01 0)' }}>
        <div className="absolute inset-0 damask-black opacity-20" />
      </div>
      <div className="mirror-divider absolute top-0 left-0 right-0" />

      <div className="container mx-auto relative z-10">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-16 reveal">
          <div className="flex justify-center mb-4">
            <span className="section-label">{t("servicesLabel")}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-5 text-balance section-heading-editorial">
            {t("servicesTitle")}
          </h2>
          <p className="text-base text-white/50 leading-relaxed">{t("servicesDescription")}</p>
        </div>

        {/* Asymmetric split layout */}
        <div className="grid lg:grid-cols-[3fr_2fr] gap-8 lg:gap-16 max-w-7xl mx-auto items-start">
          {/* Left: featured image — updates on hover */}
          <div className="reveal reveal-delay-1 order-2 lg:order-1">
            <div
              className="relative rounded-3xl overflow-hidden mirror-frame-3d shadow-2xl"
              style={{ aspectRatio: "4/3" }}
            >
              <img
                src={services[hoveredService].gallery[0]}
                alt={services[hoveredService].title}
                className="w-full h-full object-cover transition-all duration-700"
              />
              {/* Mirror reflection overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/8 via-transparent to-black/40 pointer-events-none" />
              {/* Service name watermark on image */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-xs text-white/40 uppercase tracking-[0.2em] mb-1">{t("servicesLabel")}</p>
                <h3 className="text-xl md:text-2xl font-bold text-white font-playfair-heading">
                  {services[hoveredService].title}
                </h3>
              </div>
            </div>
          </div>

          {/* Right: vertical service list */}
          <div className="order-1 lg:order-2 flex flex-col justify-center reveal reveal-delay-2">
            {services.map((service, index) => (
              <button
                key={index}
                onMouseEnter={() => setHoveredService(index)}
                onClick={() => handleServiceClick(index)}
                className={`service-row group text-left py-6 px-4 rounded-xl transition-all duration-300 ${
                  hoveredService === index ? "bg-white/[0.04] border-b border-white/10" : ""
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className={`mt-1 w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                      hoveredService === index
                        ? "bg-primary/15 border border-primary/30"
                        : "bg-white/[0.04] border border-white/10"
                    }`}>
                      <service.icon className={`h-4 w-4 transition-colors duration-300 ${
                        hoveredService === index ? "text-primary" : "text-white/40"
                      }`} />
                    </div>
                    <div>
                      <h3 className={`text-lg font-bold transition-colors duration-300 ${
                        hoveredService === index ? "text-white" : "text-white/60"
                      }`}>
                        {service.title}
                      </h3>
                      <p className={`text-sm leading-relaxed mt-1 transition-all duration-300 ${
                        hoveredService === index ? "text-white/55 max-h-20 opacity-100" : "text-transparent max-h-0 opacity-0 overflow-hidden"
                      }`}>
                        {service.description}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className={`h-4 w-4 flex-shrink-0 mt-1 transition-all duration-300 ${
                    hoveredService === index ? "text-primary opacity-100 translate-x-0" : "text-white/20 opacity-0 -translate-x-2"
                  }`} />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {selectedService !== null && (
        <div className="fixed inset-0 z-[100] bg-white/5 backdrop-blur-3xl overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/65" />
            <div className="absolute inset-0 opacity-40 lux-vignette" />
          </div>
          <button
            onClick={handleCloseGallery}
            className="absolute top-4 right-4 text-white hover:text-primary transition-colors z-[130]"
            aria-label="Close gallery"
          >
            <X className="h-8 w-8" />
          </button>

          {/* Image stage */}
          <div
            className="absolute inset-0 flex items-center justify-center px-4 py-20 transition-transform duration-500"
            style={{ transform: infoExpanded ? "translateY(-80px)" : "translateY(0px)" }}
          >
            <div className="relative w-full max-w-6xl">
              <div
                className="relative mx-auto rounded-3xl overflow-hidden shadow-2xl mirror-frame-3d"
                style={{ maxHeight: "65vh" }}
              >
                {/* Constrain height without stretching */}
                <div className="relative w-full" style={{ height: "65vh", maxHeight: "65vh" }}>
                  <img
                    src={services[selectedService].gallery[currentImageIndex] || "/placeholder.svg"}
                    alt={`${services[selectedService].title} - Image ${currentImageIndex + 1}`}
                    className="w-full h-full object-contain bg-transparent"
                  />

                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/8 via-transparent to-black/35" />
                    <div className="absolute top-0 left-0 right-0 h-14 oriental-mosaic opacity-20 mix-blend-overlay" />
                    <div className="absolute bottom-0 left-0 right-0 h-16 oriental-mosaic opacity-18 mix-blend-overlay" />
                    <div className="absolute top-0 left-0 right-0 h-14 bg-gradient-to-b from-white/12 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/10 to-transparent" />
                  </div>

                  {/* Mirror reflection overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/20 pointer-events-none" />

                  {/* Navigation Arrows */}
                  {services[selectedService].gallery.length > 1 && (
                    <>
                      <button
                        onClick={handlePrevImage}
                        className="absolute top-1/2 -translate-y-1/2 left-4 sm:left-6 bg-white/20 hover:bg-white/30 backdrop-blur-lg text-white p-4 rounded-full transition-all z-30 border border-white/20 shadow-lg"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="h-7 w-7" />
                      </button>
                      <button
                        onClick={handleNextImage}
                        className="absolute top-1/2 -translate-y-1/2 right-4 sm:right-6 bg-white/20 hover:bg-white/30 backdrop-blur-lg text-white p-4 rounded-full transition-all z-30 border border-white/20 shadow-lg"
                        aria-label="Next image"
                      >
                        <ChevronRight className="h-7 w-7" />
                      </button>
                    </>
                  )}

                  {/* Round thumbnail previews */}
                  {services[selectedService].gallery.length > 1 && (
                    <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/90 via-black/55 to-transparent p-4">
                      <div className="flex flex-wrap gap-3 justify-center">
                        {services[selectedService].gallery.map((img, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCurrentImageIndex(idx)}
                            className={`relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-3 transition-all shadow-lg ${
                              idx === currentImageIndex
                                ? "border-white scale-110 shadow-white/30"
                                : "border-white/30 opacity-80 hover:opacity-100 hover:scale-105"
                            }`}
                            aria-label={`Thumbnail ${idx + 1}`}
                          >
                            <img
                              src={img || "/placeholder.svg"}
                              alt={`Thumbnail ${idx + 1}`}
                              className="w-full h-full object-cover"
                            />
                            {idx === currentImageIndex && (
                              <div className="absolute inset-0 bg-white/10" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom-center trigger button - only shown when drawer is closed */}
          {!infoExpanded && (
            <div className="absolute left-1/2 -translate-x-1/2 bottom-6 z-[140]">
              <button
                onClick={() => setInfoExpanded(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/15 backdrop-blur-xl border border-white/20 text-white shadow-2xl transition-all text-sm"
                aria-label="Show service details"
              >
                <ChevronUp className="h-4 w-4" />
                <span className="font-semibold">{t("showDetails")}</span>
              </button>
            </div>
          )}

          {/* Fixed bottom drawer */}
          <div
            className={`fixed left-0 right-0 bottom-0 z-[120] transition-transform duration-500 ${
              infoExpanded ? "translate-y-0" : "translate-y-full"
            }`}
          >
            <div className="mx-auto max-w-6xl px-4 pb-4">
              <div className="glass-card rounded-2xl p-4 border border-white/20 shadow-2xl relative">
                {/* Toggle button inside drawer - top right */}
                <button
                  onClick={() => setInfoExpanded(false)}
                  className="absolute top-2 right-2 flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/15 backdrop-blur-xl border border-white/20 text-white shadow-lg transition-all text-xs"
                  aria-label="Hide service details"
                >
                  <ChevronDown className="h-3 w-3" />
                  <span className="font-semibold">{t("hideDetails")}</span>
                </button>

                <div className="flex items-center gap-3 mb-2 pr-16">
                  <span className="text-xs text-primary font-medium px-3 py-1 bg-primary/10 rounded-full border border-white/20">
                    {t("service")}
                  </span>
                  <div className="flex items-center gap-2 text-white/60">
                    <Sparkles className="h-3 w-3 text-primary" />
                    <span className="text-xs">
                      {currentImageIndex + 1} / {services[selectedService].gallery.length}
                    </span>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 bg-gradient-to-r from-white to-primary/40 bg-clip-text text-transparent">
                  {services[selectedService].title}
                </h3>
                <div className="max-h-24 overflow-y-auto pr-2 custom-scrollbar">
                  <p className="text-white/80 leading-relaxed text-sm">{services[selectedService].detailedDescription}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
