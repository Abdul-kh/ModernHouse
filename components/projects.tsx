"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/lib/language-context"
import { useEffect, useState } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

export function Projects() {
  const { t } = useLanguage()
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

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

  // Lock background scroll when preview is open
  useEffect(() => {
    if (selectedProject !== null) {
      const previous = document.body.style.overflow
      document.body.style.overflow = "hidden"
      return () => {
        document.body.style.overflow = previous
      }
    }
  }, [selectedProject])

  return (
    <section id="projects" className="py-24 px-4 lg:px-8 bg-muted/10 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="container mx-auto relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6 text-balance">
            {t("projectsTitle")}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">{t("projectsDescription")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <Card
              key={index}
              onClick={() => handleProjectClick(index)}
              className="border-border overflow-hidden group cursor-pointer hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 hover:scale-[1.02] glass-card"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white font-semibold text-lg bg-primary/90 px-6 py-2 rounded-full backdrop-blur-sm">
                    View Gallery
                  </span>
                </div>
              </div>
              <CardContent className="p-6">
                <p className="text-sm text-primary font-medium mb-2">{project.category}</p>
                <h3 className="text-2xl font-bold text-foreground">{project.title}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {selectedProject !== null && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4">
          <button
            onClick={handleCloseGallery}
            className="absolute top-4 ltr:right-4 rtl:left-4 text-white hover:text-primary transition-colors z-10"
            aria-label="Close gallery"
          >
            <X className="h-8 w-8" />
          </button>


          <div className="max-w-6xl w-full">
            <div className="relative aspect-[16/10] mb-6 rounded-lg overflow-hidden">
              <img
                src={projects[selectedProject].gallery[currentImageIndex] || "/placeholder.svg"}
                alt={`${projects[selectedProject].title} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />

              {/* Navigation Arrows - Always visible when there are multiple images */}
              {projects[selectedProject].gallery.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute top-1/2 -translate-y-1/2 ltr:left-4 rtl:right-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-3 rounded-full transition-all z-20"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute top-1/2 -translate-y-1/2 ltr:right-4 rtl:left-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-3 rounded-full transition-all z-20"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}

              {/* Thumbnail strip overlayed at the bottom (wrap, no scrollbar) */}
              {projects[selectedProject].gallery.length > 1 && (
                <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/75 via-black/40 to-transparent p-3">
                  <div className="flex flex-wrap gap-2 justify-center">
                    {projects[selectedProject].gallery.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-md overflow-hidden border-2 transition-all ${
                          idx === currentImageIndex
                            ? "border-primary scale-105"
                            : "border-white/30 opacity-80 hover:opacity-100"
                        }`}
                        aria-label={`Thumbnail ${idx + 1}`}
                      >
                        <img src={img || "/placeholder.svg"} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Project Info */}
            <div className="glass-card rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-sm text-primary font-medium px-3 py-1 bg-primary/10 rounded-full">
                  {projects[selectedProject].category}
                </span>
                <span className="text-white/60 text-sm">
                  {currentImageIndex + 1} / {projects[selectedProject].gallery.length}
                </span>
              </div>
              <h3 className="text-3xl font-bold text-white mb-3">{projects[selectedProject].title}</h3>
              <p className="text-white/80 leading-relaxed">{projects[selectedProject].description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
