"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Lightbulb } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { useTransition } from "@/app/layout"

const heroImages = [
  "/modern-luxury-mirror-installation-in-elegant-inter.jpg",
  "/contemporary-shower-with-led-mirror-lighting.jpg",
  "/carved-glass-decorative-wall-feature-in-upscale-sp.jpg",
  "/decorative-colored-glass-panels-with-artistic-patt.jpg",
]

const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${10 + Math.random() * 80}%`,
  top: `${20 + Math.random() * 60}%`,
  duration: 3 + Math.random() * 3,
  delay: Math.random() * 4,
  px: `${(Math.random() - 0.5) * 60}px`,
}))

export function Hero() {
  const { t } = useLanguage()
  const { transitionToSection } = useTransition()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const mirrorRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [12, -12]), { stiffness: 200, damping: 30 })
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-12, 12]), { stiffness: 200, damping: 30 })

  const lightModes = [
    { name: "white", color: "255,255,255" },
    { name: "warm", color: "255,183,110" },
    { name: "off", color: "255,255,255" },
  ]
  const [lightModeIndex, setLightModeIndex] = useState(0)
  const currentLight = lightModes[lightModeIndex]
  const lightsOn = currentLight.name !== "off"

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mirrorRef.current) return
    const rect = mirrorRef.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    mouseX.set(e.clientX - cx)
    mouseY.set(e.clientY - cy)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  const titleWords1 = t("heroTitleLine1").split(" ")
  const titleWords2 = t("heroTitleLine2").split(" ")

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
  }
  const wordVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col overflow-hidden section-bg-1"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Ambient glow blobs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%)" }} />
        <div className="absolute bottom-1/3 left-1/3 w-[400px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(255,220,120,0.05) 0%, transparent 70%)" }} />
        <div className="absolute inset-0 damask-black opacity-15" />
      </div>

      {/* Gold particles */}
      <div className="absolute inset-0 pointer-events-none z-[1] overflow-hidden">
        {PARTICLES.map((p) => (
          <div
            key={p.id}
            className="gold-particle"
            style={{
              left: p.left,
              top: p.top,
              "--duration": `${p.duration}s`,
              "--delay": `${p.delay}s`,
              "--px": p.px,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 lg:px-8 relative z-10 pt-28 pb-8 flex-1 flex items-center">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto w-full">

          {/* LEFT — Text Content */}
          <motion.div
            className="order-2 lg:order-1 text-center lg:text-left space-y-8"
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } }}
          >
            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
              className="flex justify-center lg:justify-start"
            >
              <span className="section-label">{t("heroLabel")}</span>
            </motion.div>

            <h1 className="text-balance drop-shadow-2xl">
              <motion.div
                className="flex flex-wrap justify-center lg:justify-start gap-x-3 gap-y-1 mb-2"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {titleWords1.map((word, i) => (
                  <motion.span
                    key={i}
                    variants={wordVariants}
                    className="text-4xl md:text-5xl xl:text-6xl font-light tracking-tight text-white/65 font-playfair-heading inline-block"
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.div>
              <motion.div
                className="flex flex-wrap justify-center lg:justify-start gap-x-3 gap-y-1"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                style={{ transition: "all 0s" }}
              >
                {titleWords2.map((word, i) => (
                  <motion.span
                    key={i}
                    variants={{ ...wordVariants, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const, delay: titleWords1.length * 0.08 + i * 0.09 } } }}
                    initial="hidden"
                    animate="visible"
                    className="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight text-white font-playfair-heading inline-block [text-shadow:0_8px_40px_rgba(0,0,0,0.6)]"
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.div>
            </h1>

            <motion.p
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
              className="text-base md:text-lg text-white/55 leading-relaxed max-w-md mx-auto lg:mx-0"
            >
              {t("heroDescription")}
            </motion.p>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
              className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4"
            >
              <Button
                size="lg"
                onClick={() => transitionToSection("projects")}
                className="bg-primary text-white hover:bg-primary/90 group shadow-2xl hover:shadow-primary/40 transition-all text-base px-8 py-6 relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {t("exploreWork")}
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => transitionToSection("contact")}
                className="border border-white/20 text-white hover:bg-white/8 bg-transparent backdrop-blur-sm text-base px-8 py-6 transition-all hover:border-white/40"
              >
                {t("requestConsultation")}
              </Button>
            </motion.div>

            <motion.div
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.5, delay: 0.4 } } }}
              className="flex items-center justify-center lg:justify-start gap-2.5 pt-2"
            >
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    index === currentImageIndex
                      ? "w-10 shadow-lg"
                      : "w-1.5 bg-white/20 hover:bg-white/40 hover:w-4"
                  }`}
                  style={index === currentImageIndex ? { background: "var(--lux-gold)", boxShadow: "0 0 8px rgba(255,220,120,0.5)" } : {}}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT — 3D Mouse-Reactive Mirror */}
          <div
            ref={mirrorRef}
            className="order-1 lg:order-2 flex items-center justify-center relative"
            style={{ perspective: "1200px" }}
          >
            <motion.div
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              className="relative w-[300px] h-[430px] md:w-[360px] md:h-[510px] lg:w-[420px] lg:h-[590px]"
            >
              <div className="mirror-frame-3d w-full h-full overflow-hidden relative">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImageIndex}
                    src={heroImages[currentImageIndex]}
                    alt={`Mirror showcase ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                  />
                </AnimatePresence>

                {/* Mirror shine overlay */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/12 via-transparent to-black/30" />

                {/* LED engraved border */}
                <div className="absolute inset-0 pointer-events-none" style={{ borderRadius: "inherit" }}>
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 140" preserveAspectRatio="none">
                    <defs>
                      <filter id="led" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="1.5" result="blur"/>
                        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                      </filter>
                    </defs>
                    <rect x="6" y="6" width="88" height="128" rx="10" fill="none"
                      stroke={lightsOn ? `rgba(${currentLight.color},0.7)` : "rgba(255,255,255,0.15)"}
                      strokeWidth="1.5" filter={lightsOn ? "url(#led)" : ""} />
                    <rect x="10" y="10" width="80" height="120" rx="8" fill="none"
                      stroke={lightsOn ? `rgba(${currentLight.color},0.4)` : "rgba(255,255,255,0.08)"}
                      strokeWidth="0.8" />
                    {lightsOn && (
                      <>
                        <circle cx="6" cy="6" r="3" fill={`rgba(${currentLight.color},0.9)`} filter="url(#led)" />
                        <circle cx="94" cy="6" r="3" fill={`rgba(${currentLight.color},0.9)`} filter="url(#led)" />
                        <circle cx="94" cy="134" r="3" fill={`rgba(${currentLight.color},0.9)`} filter="url(#led)" />
                        <circle cx="6" cy="134" r="3" fill={`rgba(${currentLight.color},0.9)`} filter="url(#led)" />
                        <circle cx="50" cy="6" r="2.5" fill={`rgba(${currentLight.color},0.7)`} filter="url(#led)" />
                        <circle cx="50" cy="134" r="2.5" fill={`rgba(${currentLight.color},0.7)`} filter="url(#led)" />
                      </>
                    )}
                  </svg>
                </div>

                {/* Light Toggle */}
                <button
                  onClick={() => setLightModeIndex((prev) => (prev + 1) % lightModes.length)}
                  className={`engraved-light-button ${lightsOn ? "active" : ""}`}
                  style={lightsOn ? { "--light-color": currentLight.color } as React.CSSProperties : undefined}
                  aria-label={`Light mode: ${currentLight.name}`}
                >
                  <Lightbulb className="button-icon" />
                </button>
              </div>

              {/* Gold shadow beneath mirror */}
              <div
                className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-4/5 h-12 rounded-full blur-2xl opacity-20"
                style={{ background: "radial-gradient(ellipse, rgba(255,220,120,0.8), transparent)" }}
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom keyword marquee */}
      <div className="relative z-10 w-full pb-8 pt-4">
        <div className="mirror-divider mb-5 opacity-30" />
        <div className="overflow-hidden">
          <div className="keyword-strip">
            {[
              "CUSTOM MIRRORS","·","CARVED GLASS","·","LED LIGHTING","·",
              "ORIENTAL PATTERNS","·","SHOWER MIRRORS","·","ENGRAVED FRAMES","·",
              "DECORATIVE GLASS","·","ERBIL CRAFT","·",
              "CUSTOM MIRRORS","·","CARVED GLASS","·","LED LIGHTING","·",
              "ORIENTAL PATTERNS","·","SHOWER MIRRORS","·","ENGRAVED FRAMES","·",
              "DECORATIVE GLASS","·","ERBIL CRAFT","·",
            ].map((word, i) => (
              <span key={i} className={`text-[10px] font-bold tracking-[0.25em] px-4 whitespace-nowrap ${word === "·" ? "opacity-40" : "text-white/20"}`}
                style={word === "·" ? { color: "var(--lux-gold)" } : {}}>
                {word}
              </span>
            ))}
          </div>
        </div>
        <div className="flex justify-center mt-6">
          <div className="scroll-indicator flex flex-col items-center gap-1.5 opacity-35">
            <span className="text-[9px] text-white tracking-[0.3em] uppercase">Scroll</span>
            <div className="w-px h-8 bg-gradient-to-b from-white/50 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  )
}
