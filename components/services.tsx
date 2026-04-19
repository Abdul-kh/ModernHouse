"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Sparkles, Palette, Droplets, Frame, X, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function Services() {
  const { t } = useLanguage()
  const [selectedService, setSelectedService] = useState<number | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

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

  const handleServiceClick = (index: number) => { setSelectedService(index); setCurrentImageIndex(0) }
  const handleCloseGallery = () => { setSelectedService(null); setCurrentImageIndex(0) }
  const handleNextImage = () => { if (selectedService !== null) setCurrentImageIndex((p) => (p + 1) % services[selectedService].gallery.length) }
  const handlePrevImage = () => { if (selectedService !== null) setCurrentImageIndex((p) => (p - 1 + services[selectedService].gallery.length) % services[selectedService].gallery.length) }

  useEffect(() => {
    if (selectedService !== null) {
      document.body.style.overflow = "hidden"
      document.body.classList.add("gallery-open")
      return () => { document.body.style.overflow = ""; document.body.classList.remove("gallery-open") }
    }
  }, [selectedService])

  return (
    <section id="services" ref={sectionRef} className="py-24 relative overflow-hidden section-bg-2">
      <div className="absolute inset-0 damask-black opacity-15 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)" }} />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center mb-14"
        >
          <div className="flex justify-center mb-4"><span className="section-label">{t("servicesLabel")}</span></div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4 section-heading-editorial">{t("servicesTitle")}</h2>
          <p className="text-base text-white/45 leading-relaxed">{t("servicesDescription")}</p>
        </motion.div>

        {/* Horizontal scroll cards */}
        <div className="service-scroll-container px-4 lg:px-0">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="service-scroll-card w-[280px] sm:w-[320px] lg:w-[360px] group"
              data-cursor-hover
            >
              <div
                className="relative rounded-2xl overflow-hidden mirror-frame-3d cursor-pointer h-[420px] sm:h-[460px]"
                onClick={() => handleServiceClick(index)}
                style={{ background: "linear-gradient(145deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))" }}
              >
                {/* Image */}
                <img
                  src={service.gallery[0]}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <div className="mb-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-colors duration-300"
                      style={{ background: "rgba(255,220,120,0.1)", border: "1px solid rgba(255,220,120,0.25)" }}>
                      <service.icon className="h-5 w-5" style={{ color: "var(--lux-gold)" }} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 font-playfair-heading">{service.title}</h3>
                    <p className="text-sm text-white/55 leading-relaxed line-clamp-3">{service.description}</p>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-300 mt-2">
                    <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--lux-gold)" }}>Explore Gallery</span>
                    <ArrowRight className="h-3.5 w-3.5" style={{ color: "var(--lux-gold)" }} />
                  </div>
                </div>
                {/* Gold border reveal on hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ boxShadow: "inset 0 0 0 1px rgba(255,220,120,0.3)" }} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="flex items-center justify-center gap-2 mt-6 lg:hidden"
        >
          <div className="h-px w-12 bg-white/15" />
          <span className="text-[10px] text-white/30 uppercase tracking-widest">Scroll to explore</span>
          <div className="h-px w-12 bg-white/15" />
        </motion.div>
      </div>

      {/* Gallery Modal */}
      <AnimatePresence>
        {selectedService !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex flex-col"
            style={{ background: "rgba(5,5,5,0.95)", backdropFilter: "blur(20px)" }}
          >
            <button onClick={handleCloseGallery} className="absolute top-5 right-5 z-50 text-white/70 hover:text-white transition-colors p-2" aria-label="Close">
              <X className="h-7 w-7" />
            </button>
            <div className="flex-1 flex items-center justify-center p-6 pt-16">
              <div className="relative w-full max-w-5xl">
                <div className="relative rounded-2xl overflow-hidden mirror-frame-3d" style={{ maxHeight: "70vh" }}>
                  <div style={{ height: "70vh" }}>
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={currentImageIndex}
                        src={services[selectedService].gallery[currentImageIndex]}
                        alt={`${services[selectedService].title} ${currentImageIndex + 1}`}
                        className="w-full h-full object-contain"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        transition={{ duration: 0.35 }}
                      />
                    </AnimatePresence>
                    {services[selectedService].gallery.length > 1 && (
                      <>
                        <button onClick={handlePrevImage} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-3 rounded-full backdrop-blur-sm transition-all border border-white/15 z-30">
                          <ChevronLeft className="h-6 w-6" />
                        </button>
                        <button onClick={handleNextImage} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-3 rounded-full backdrop-blur-sm transition-all border border-white/15 z-30">
                          <ChevronRight className="h-6 w-6" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <div className="flex justify-center gap-2 mb-4">
                    {services[selectedService].gallery.map((_, idx) => (
                      <button key={idx} onClick={() => setCurrentImageIndex(idx)}
                        className="h-1.5 rounded-full transition-all duration-300"
                        style={{ width: idx === currentImageIndex ? "2rem" : "0.375rem", background: idx === currentImageIndex ? "var(--lux-gold)" : "rgba(255,255,255,0.2)" }} />
                    ))}
                  </div>
                  <span className="section-label justify-center">{services[selectedService].title}</span>
                  <p className="text-white/55 text-sm mt-3 max-w-2xl mx-auto leading-relaxed">{services[selectedService].detailedDescription}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
