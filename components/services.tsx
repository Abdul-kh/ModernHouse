"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, Palette, Droplets, Frame, X, ChevronLeft, ChevronRight, ChevronUp, ChevronDown } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { useEffect, useState } from "react"
import { MirrorEngravedFrame } from "@/components/mirror-engraved-frame"

export function Services() {
  const { t } = useLanguage()
  const [selectedService, setSelectedService] = useState<number | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [infoExpanded, setInfoExpanded] = useState(false)

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
      detailedDescription: "Our custom mirrors and decorations service offers unparalleled craftsmanship in creating unique mirror designs for any space. From statement pieces that serve as focal points to subtle decorative accents that enhance ambiance, we specialize in unconventional mirror solutions that transform ordinary spaces into extraordinary experiences. Our artisans combine traditional techniques with modern innovations to create mirrors that are not just functional, but works of art that reflect your unique style and vision."
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
      detailedDescription: "Our glass decorations service brings artistic vision to life through stunning glass creations. We specialize in custom glass pieces that add elegance, character, and sophistication to any interior or exterior space. From colored glass panels that play with light to intricate glass art installations, our team crafts each piece with meticulous attention to detail, ensuring that every creation is a perfect blend of beauty and functionality."
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
      detailedDescription: "Our specialty glass service offers innovative solutions for unique design challenges. We work with colored glass, carved glass, and patterned glass to create distinctive features that set your space apart. Whether you're looking for bold statements or subtle accents, our specialty glass options provide endless possibilities for creative expression, allowing you to achieve truly personalized design outcomes."
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
      detailedDescription: "Our shower mirrors and lighting service combines functionality with contemporary design to create stunning bathroom features. We specialize in modern shower mirrors with integrated LED lighting that provide perfect illumination while adding a touch of luxury to your daily routine. Our solutions are designed to withstand humid environments while maintaining their beauty and performance, ensuring that your bathroom becomes a sanctuary of style and comfort."
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
    <section id="services" className="py-24 px-4 lg:px-8 relative overflow-hidden bg-background">
      <div className="absolute inset-0 z-0" style={{ backgroundColor: 'oklch(0.12 0.01 0)' }}>
        <div className="absolute inset-0 damask-black opacity-20" />
      </div>
      <div className="container mx-auto relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6 text-balance">
            {t("servicesTitle")}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">{t("servicesDescription")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <Card
              key={index}
              onClick={() => handleServiceClick(index)}
              className="border-border transition-all duration-300 group glass-card hover:border-primary/30 relative mirror-hover lux-mirror-frame hover:shadow-2xl hover:shadow-primary/15 hover:-translate-y-1 cursor-pointer"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/5 to-transparent" />
              </div>

              <CardContent className="p-6 relative z-10">
                <div className="mb-4">
                  <div className="w-12 h-12 rounded-full glass-effect flex items-center justify-center group-hover:bg-primary/10 group-hover:scale-110 transition-all duration-300">
                    <service.icon className="h-6 w-6 text-primary/90 group-hover:text-primary transition-colors" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                
                {/* View gallery hint */}
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-sm text-primary font-medium">Click to view gallery →</span>
                </div>
              </CardContent>
            </Card>
          ))}
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
                <span className="font-semibold">Show details</span>
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
                  <span className="font-semibold">Hide</span>
                </button>

                <div className="flex items-center gap-3 mb-2 pr-16">
                  <span className="text-xs text-primary font-medium px-3 py-1 bg-primary/10 rounded-full border border-white/20">
                    Service
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
