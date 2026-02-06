"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/lib/language-context"
import { useEffect, useState } from "react"
import { X, ChevronLeft, ChevronRight, Sparkles, ChevronUp, ChevronDown } from "lucide-react"
import { MirrorEngravedFrame } from "@/components/mirror-engraved-frame"

export function Projects() {
  const { t } = useLanguage()
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [infoExpanded, setInfoExpanded] = useState(false)

  const projects = [
    {
      title: t("project1"),
      category: t("commercial"),
      image: "/modern-glass-tower-building-facade-in-dubai.jpg",
      description:
        "A stunning commercial tower featuring floor-to-ceiling glass installations with custom mirror accents throughout the lobby and common areas.",
      gallery: [
        "/modern-glass-tower-building-facade-in-dubai.jpg",
        "/modern-luxury-mirror-installation-in-elegant-inter.jpg",
        "/decorative-colored-glass-panels-with-artistic-patt.jpg",
      ],
    },
    {
      title: t("project2"),
      category: t("residential"),
      image: "/luxury-villa-with-floor-to-ceiling-glass-windows.jpg",
      description:
        "Luxury villa collection featuring custom decorative mirrors, colored glass partitions, and LED-lit shower mirrors in master bathrooms.",
      gallery: [
        "/luxury-villa-with-floor-to-ceiling-glass-windows.jpg",
        "/contemporary-shower-with-led-mirror-lighting.jpg",
        "/carved-glass-decorative-wall-feature-in-upscale-sp.jpg",
      ],
    },
    {
      title: t("project3"),
      category: t("commercial"),
      image: "/modern-office-building-with-glass-curtain-wall.jpg",
      description:
        "Corporate headquarters with carved glass features, patterned glass conference rooms, and artistic mirror installations.",
      gallery: [
        "/modern-office-building-with-glass-curtain-wall.jpg",
        "/carved-glass-decorative-wall-feature-in-upscale-sp.jpg",
        "/decorative-colored-glass-panels-with-artistic-patt.jpg",
      ],
    },
    {
      title: t("project4"),
      category: t("hospitality"),
      image: "/luxury-hotel-lobby-with-custom-glass-features.jpg",
      description:
        "Boutique hotel featuring unconventional mirror designs, colored glass art installations, and custom decorative glass throughout.",
      gallery: [
        "/luxury-hotel-lobby-with-custom-glass-features.jpg",
        "/modern-luxury-mirror-installation-in-elegant-inter.jpg",
        "/decorative-colored-glass-panels-with-artistic-patt.jpg",
      ],
    },
  ]

  const handleProjectClick = (index: number) => {
    setSelectedProject(index)
    setCurrentImageIndex(0)
  }

  const handleCloseGallery = () => {
    setSelectedProject(null)
    setCurrentImageIndex(0)
  }

  const handleNextImage = () => {
    if (selectedProject !== null) {
      setCurrentImageIndex((prev) => (prev + 1) % projects[selectedProject].gallery.length)
    }
  }

  const handlePrevImage = () => {
    if (selectedProject !== null) {
      setCurrentImageIndex(
        (prev) => (prev - 1 + projects[selectedProject].gallery.length) % projects[selectedProject].gallery.length,
      )
    }
  }

  // Lock background scroll when preview is open and hide header
  useEffect(() => {
    if (selectedProject !== null) {
      const previous = document.body.style.overflow
      document.body.style.overflow = "hidden"
      document.body.classList.add("gallery-open")
      return () => {
        document.body.style.overflow = previous
        document.body.classList.remove("gallery-open")
      }
    }
  }, [selectedProject])

  const handleTiltMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.currentTarget
    const rect = target.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    const rotateX = ((y / rect.height) - 0.5) * -12
    const rotateY = ((x / rect.width) - 0.5) * 12
    target.style.setProperty("--tilt-x", `${rotateX.toFixed(2)}deg`)
    target.style.setProperty("--tilt-y", `${rotateY.toFixed(2)}deg`)
  }

  const handleTiltLeave = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.currentTarget
    target.style.setProperty("--tilt-x", "0deg")
    target.style.setProperty("--tilt-y", "0deg")
  }

  return (
    <section id="projects" className="py-24 px-4 lg:px-8 relative overflow-hidden">
      <div className="container mx-auto relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6 text-balance">
            {t("projectsTitle")}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">{t("projectsDescription")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <div
              key={index}
              onClick={() => handleProjectClick(index)}
              className="group cursor-pointer relative"
            >
              {/* Floating decorative elements */}
              <div className="absolute -top-4 -left-4 w-16 h-16 border border-primary/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
              <div className="absolute -bottom-4 -right-4 w-20 h-20 border border-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" style={{ animationDelay: "0.5s" }} />

              {/* Main mirror container */}
              <div className="relative aspect-[3/4] mx-auto max-w-md">
                <MirrorEngravedFrame className="w-full h-full animate-mirror-glow group-hover:scale-[1.02] transition-transform duration-500">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Mirror reflections */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/30 pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />

                  {/* Hover overlay with view gallery text */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center z-10">
                    <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <Sparkles className="h-8 w-8 text-primary mx-auto mb-3 animate-pulse" />
                      <span className="text-white font-semibold text-lg bg-primary/90 backdrop-blur-md px-6 py-3 rounded-full shadow-lg border border-white/20 inline-block">
                        {t("viewGallery")}
                      </span>
                    </div>
                  </div>
                </MirrorEngravedFrame>
              </div>
              
              {/* Project info */}
              <div className="text-center mt-8">
                <p className="text-sm text-primary font-medium mb-2 tracking-wide uppercase">{project.category}</p>
                <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">{project.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedProject !== null && (
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
            className="absolute inset-0 flex items-center justify-center px-4 py-16 transition-transform duration-500"
            style={{ transform: infoExpanded ? "translateY(-140px)" : "translateY(0px)" }}
          >
            <div className="relative w-full max-w-6xl">
              <div
                className="relative mx-auto rounded-3xl overflow-hidden shadow-2xl mirror-frame-3d"
                style={{ maxHeight: "72vh" }}
              >
                {/* Constrain height without stretching */}
                <div className="relative w-full" style={{ height: "72vh", maxHeight: "72vh" }}>
                  <img
                    src={projects[selectedProject].gallery[currentImageIndex] || "/placeholder.svg"}
                    alt={`${projects[selectedProject].title} - Image ${currentImageIndex + 1}`}
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
                  {projects[selectedProject].gallery.length > 1 && (
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
                  {projects[selectedProject].gallery.length > 1 && (
                    <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/90 via-black/55 to-transparent p-4">
                      <div className="flex flex-wrap gap-3 justify-center">
                        {projects[selectedProject].gallery.map((img, idx) => (
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

          {/* Bottom-center toggle button */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-6 z-[140]">
            <button
              onClick={() => setInfoExpanded(!infoExpanded)}
              className="flex items-center gap-2 px-5 py-3 rounded-full bg-white/10 hover:bg-white/15 backdrop-blur-xl border border-white/20 text-white shadow-2xl transition-all"
              aria-label={infoExpanded ? "Hide project details" : "Show project details"}
            >
              {infoExpanded ? <ChevronDown className="h-5 w-5" /> : <ChevronUp className="h-5 w-5" />}
              <span className="text-sm font-semibold">{infoExpanded ? "Hide details" : "Show details"}</span>
            </button>
          </div>

          {/* Fixed bottom drawer */}
          <div
            className={`fixed left-0 right-0 bottom-0 z-[120] transition-transform duration-500 ${
              infoExpanded ? "translate-y-0" : "translate-y-full"
            }`}
          >
            <div className="mx-auto max-w-6xl px-4 pb-8">
              <div className="glass-card rounded-3xl p-6 border border-white/20 shadow-2xl">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-sm text-primary font-medium px-4 py-2 bg-primary/10 rounded-full border border-white/20">
                    {projects[selectedProject].category}
                  </span>
                  <div className="flex items-center gap-2 text-white/60">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <span className="text-sm">
                      {currentImageIndex + 1} / {projects[selectedProject].gallery.length}
                    </span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 bg-gradient-to-r from-white to-primary/40 bg-clip-text text-transparent">
                  {projects[selectedProject].title}
                </h3>
                <div className="max-h-[30vh] overflow-y-auto pr-2">
                  <p className="text-white/80 leading-relaxed text-base">{projects[selectedProject].description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
