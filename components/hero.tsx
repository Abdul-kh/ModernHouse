"use client"

import { useState, useEffect } from "react"
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

export function Hero() {
  const { t } = useLanguage()
  const { transitionToSection } = useTransition()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const lightModes = [
    { name: "white", color: "255,255,255", filterHue: "none" },
    { name: "warm", color: "255,183,110", filterHue: "sepia(0.35) saturate(1.4) brightness(1.1)" },
    { name: "neutral", color: "255,225,190", filterHue: "sepia(0.15) saturate(1.2) brightness(1.05)" },
    { name: "off", color: "255,255,255", filterHue: "none" },
  ]
  const [lightModeIndex, setLightModeIndex] = useState(0)
  const currentLight = lightModes[lightModeIndex]
  const lightsOn = currentLight.name !== "off"

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

  const getPrevIndex = () => (currentImageIndex - 1 + heroImages.length) % heroImages.length
  const getNextIndex = () => (currentImageIndex + 1) % heroImages.length

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      <div className="absolute inset-0 z-0" style={{ backgroundColor: 'oklch(0.12 0.01 0)' }}>
        <div className="absolute inset-0 damask-black opacity-20" />
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
                onClick={() => transitionToSection("projects")}
                className="bg-primary text-primary-foreground hover:bg-primary/90 group shadow-2xl hover:shadow-primary/50 transition-all text-base px-8 py-6"
              >
                {t("exploreWork")}
                <ArrowRight className="ltr:ml-2 rtl:mr-2 h-5 w-5 group-hover:ltr:translate-x-1 group-hover:rtl:-translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => transitionToSection("contact")}
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
              className="absolute left-0 top-1/2 -translate-y-1/2 w-[140px] h-[200px] sm:w-[180px] sm:h-[260px] md:w-[280px] md:h-[400px] opacity-30 sm:opacity-40 md:opacity-50 hover:opacity-70 scale-80 hover:scale-85 translate-x-[-55%] sm:translate-x-[-40%] md:-translate-x-8 z-0 transition-all duration-500 cursor-pointer group"
            >
              <div className="mirror-frame-3d w-full h-full overflow-hidden relative">
                <div className="engraved-pattern">
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 140" preserveAspectRatio="none">
                    <defs>
                      <clipPath id="borderOnlyLeft">
                        <rect x="0" y="0" width="100" height="140" rx="15"/>
                        <rect x="10" y="10" width="80" height="120" rx="8"/>
                      </clipPath>
                      <pattern id="mosaicBorderLeft" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                        <path d="M5 0 L10 5 L5 10 L0 5 Z" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="0.6"/>
                        <circle cx="5" cy="5" r="1.2" fill="rgba(255,255,255,0.3)"/>
                      </pattern>
                      <filter id="ledGlowLeft" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="1.5" result="blur"/>
                        <feMerge>
                          <feMergeNode in="blur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>
                    <g clipPath="url(#borderOnlyLeft)">
                      <rect x="0" y="0" width="100" height="140" rx="15" fill="url(#mosaicBorderLeft)" opacity="0.4"/>
                      <rect x="2" y="2" width="96" height="136" rx="13" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" opacity="0.5"/>
                      <rect x="6" y="6" width="88" height="128" rx="10" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" opacity="0.3"/>
                    </g>
                    <g opacity="0.5">
                      <circle cx="50" cy="5" r="2.5" fill="rgba(255,255,255,0.5)"/>
                      <circle cx="50" cy="135" r="2.5" fill="rgba(255,255,255,0.5)"/>
                      <circle cx="5" cy="70" r="2.5" fill="rgba(255,255,255,0.5)"/>
                      <circle cx="95" cy="70" r="2.5" fill="rgba(255,255,255,0.5)"/>
                    </g>
                  </svg>
                </div>
                <img
                  src={heroImages[getPrevIndex()] || "/placeholder.svg"}
                  alt="Previous mirror"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-300" />
              </div>
            </button>

            <div 
              className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[460px] md:w-[380px] md:h-[540px] lg:w-[440px] lg:h-[620px] z-10 transition-all duration-700 ${
                isTransitioning ? "scale-95 opacity-80" : "scale-100 opacity-100"
              }`}
            >
              <div className="mirror-frame-3d w-full h-full overflow-hidden relative">
                
                {/* Large Mirror Tile Engravings - Border Only */}
                <div className="absolute inset-0 pointer-events-none" style={{ borderRadius: 'inherit' }}>
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 140" preserveAspectRatio="none">
                    <defs>
                      {/* LED Glow Filter */}
                      <filter id="ledGlow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="1.5" result="blur"/>
                        <feMerge>
                          <feMergeNode in="blur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                      
                      <filter id="ledGlowStrong" x="-100%" y="-100%" width="300%" height="300%">
                        <feGaussianBlur stdDeviation="3" result="blur"/>
                        <feMerge>
                          <feMergeNode in="blur"/>
                          <feMergeNode in="blur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>

                      {/* Large Mirror Tile Pattern - Much bigger tiles */}
                      <pattern id="mirrorTilePattern" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
                        {/* Large diamond/tile shape */}
                        <path d="M12 0 L24 12 L12 24 L0 12 Z" fill="none" stroke={`rgba(${currentLight.color},0.5)`} strokeWidth="0.8"/>
                        {/* Inner diamond */}
                        <path d="M12 4 L20 12 L12 20 L4 12 Z" fill="none" stroke={`rgba(${currentLight.color},0.35)`} strokeWidth="0.6"/>
                        {/* Center dot */}
                        <circle cx="12" cy="12" r="2" fill="none" stroke={`rgba(${currentLight.color},0.4)`} strokeWidth="0.5"/>
                        {/* Cross lines */}
                        <path d="M12 0 L12 24 M0 12 L24 12" stroke={`rgba(${currentLight.color},0.2)`} strokeWidth="0.3"/>
                      </pattern>

                      {/* Corner Ornament - Large LED Style */}
                      <g id="cornerTileLed">
                        <circle cx="0" cy="0" r="8" fill="none" stroke={`rgba(${currentLight.color},0.6)`} strokeWidth="1.2"/>
                        <circle cx="0" cy="0" r="4" fill={`rgba(${currentLight.color},0.25)`}/>
                        <path d="M0 -8 L0 8 M-8 0 L8 0" stroke={`rgba(${currentLight.color},0.4)`} strokeWidth="0.6"/>
                        <circle cx="0" cy="0" r="1.5" fill={`rgba(${currentLight.color},0.8)`}/>
                      </g>
                    </defs>

                    {/* Outer Border Frame - Only the lines/tiles, no full rect fill */}
                    <g clipPath="url(#borderOnly)">
                      {/* Top border with large tiles */}
                      <rect x="0" y="0" width="100" height="12" fill="url(#mirrorTilePattern)" opacity={lightsOn ? "0.8" : "0.3"} 
                        filter={lightsOn ? "url(#ledGlow)" : ""}/>
                      {/* Bottom border */}
                      <rect x="0" y="128" width="100" height="12" fill="url(#mirrorTilePattern)" opacity={lightsOn ? "0.8" : "0.3"} 
                        filter={lightsOn ? "url(#ledGlow)" : ""}/>
                      {/* Left border */}
                      <rect x="0" y="12" width="12" height="116" fill="url(#mirrorTilePattern)" opacity={lightsOn ? "0.8" : "0.3"} 
                        filter={lightsOn ? "url(#ledGlow)" : ""}/>
                      {/* Right border */}
                      <rect x="88" y="12" width="12" height="116" fill="url(#mirrorTilePattern)" opacity={lightsOn ? "0.8" : "0.3"} 
                        filter={lightsOn ? "url(#ledGlow)" : ""}/>
                      
                      {/* Inner decorative border lines - only engravings */}
                      <rect x="12" y="12" width="76" height="116" rx="10" fill="none" stroke={`rgba(${currentLight.color},0.5)`} strokeWidth="2" 
                        opacity={lightsOn ? "0.9" : "0.4"} filter={lightsOn ? "url(#ledGlow)" : ""}/>
                      <rect x="16" y="16" width="68" height="108" rx="8" fill="none" stroke={`rgba(${currentLight.color},0.3)`} strokeWidth="1" 
                        opacity={lightsOn ? "0.7" : "0.25"} filter={lightsOn ? "url(#ledGlow)" : ""}/>
                    </g>

                    {/* Corner LED Accents - Large */}
                    <g opacity={lightsOn ? "1" : "0.5"}>
                      <g transform="translate(12, 12)" filter={lightsOn ? "url(#ledGlowStrong)" : ""}>
                        <use href="#cornerTileLed"/>
                      </g>
                      <g transform="translate(88, 12)" filter={lightsOn ? "url(#ledGlowStrong)" : ""}>
                        <use href="#cornerTileLed"/>
                      </g>
                      <g transform="translate(88, 128)" filter={lightsOn ? "url(#ledGlowStrong)" : ""}>
                        <use href="#cornerTileLed"/>
                      </g>
                      <g transform="translate(12, 128)" filter={lightsOn ? "url(#ledGlowStrong)" : ""}>
                        <use href="#cornerTileLed"/>
                      </g>
                    </g>

                    {/* Side Midpoint LED Accents - Large */}
                    <g opacity={lightsOn ? "1" : "0.5"}>
                      <circle cx="50" cy="10" r="4" fill={`rgba(${currentLight.color},0.7)`} filter={lightsOn ? "url(#ledGlowStrong)" : ""}/>
                      <circle cx="50" cy="130" r="4" fill={`rgba(${currentLight.color},0.7)`} filter={lightsOn ? "url(#ledGlowStrong)" : ""}/>
                      <circle cx="10" cy="70" r="4" fill={`rgba(${currentLight.color},0.7)`} filter={lightsOn ? "url(#ledGlowStrong)" : ""}/>
                      <circle cx="90" cy="70" r="4" fill={`rgba(${currentLight.color},0.7)`} filter={lightsOn ? "url(#ledGlowStrong)" : ""}/>
                    </g>
                  </svg>
                </div>

                <img
                  src={heroImages[currentImageIndex] || "/placeholder.svg"}
                  alt={`Mirror showcase ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />
                
                {/* Light Toggle Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setLightModeIndex((prev) => (prev + 1) % lightModes.length)
                  }}
                  className={`engraved-light-button ${lightsOn ? 'active' : ''}`}
                  style={lightsOn ? { '--light-color': currentLight.color } as React.CSSProperties : undefined}
                  aria-label={`Light mode: ${currentLight.name}`}
                >
                  <Lightbulb className="button-icon" />
                </button>
              </div>
              
            </div>

            <button
              onClick={() => {
                setIsTransitioning(true)
                setTimeout(() => {
                  setCurrentImageIndex(getNextIndex())
                  setIsTransitioning(false)
                }, 600)
              }}
              className="absolute right-0 top-1/2 -translate-y-1/2 w-[140px] h-[200px] sm:w-[180px] sm:h-[260px] md:w-[280px] md:h-[400px] opacity-30 sm:opacity-40 md:opacity-50 hover:opacity-70 scale-80 hover:scale-85 translate-x-[55%] sm:translate-x-[40%] md:translate-x-8 z-0 transition-all duration-500 cursor-pointer group"
            >
              <div className="mirror-frame-3d w-full h-full overflow-hidden relative">
                <div className="engraved-pattern">
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 140" preserveAspectRatio="none">
                    <defs>
                      <clipPath id="borderOnlyRight">
                        <rect x="0" y="0" width="100" height="140" rx="15"/>
                        <rect x="10" y="10" width="80" height="120" rx="8"/>
                      </clipPath>
                      <pattern id="mosaicBorderRight" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                        <path d="M5 0 L10 5 L5 10 L0 5 Z" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="0.6"/>
                        <circle cx="5" cy="5" r="1.2" fill="rgba(255,255,255,0.3)"/>
                      </pattern>
                      <filter id="ledGlowRight" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="1.5" result="blur"/>
                        <feMerge>
                          <feMergeNode in="blur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>
                    <g clipPath="url(#borderOnlyRight)">
                      <rect x="0" y="0" width="100" height="140" rx="15" fill="url(#mosaicBorderRight)" opacity="0.4"/>
                      <rect x="2" y="2" width="96" height="136" rx="13" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" opacity="0.5"/>
                      <rect x="6" y="6" width="88" height="128" rx="10" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" opacity="0.3"/>
                    </g>
                    <g opacity="0.5">
                      <circle cx="50" cy="5" r="2.5" fill="rgba(255,255,255,0.5)"/>
                      <circle cx="50" cy="135" r="2.5" fill="rgba(255,255,255,0.5)"/>
                      <circle cx="5" cy="70" r="2.5" fill="rgba(255,255,255,0.5)"/>
                      <circle cx="95" cy="70" r="2.5" fill="rgba(255,255,255,0.5)"/>
                    </g>
                  </svg>
                </div>
                <img
                  src={heroImages[getNextIndex()] || "/placeholder.svg"}
                  alt="Next mirror"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-300" />
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
