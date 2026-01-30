"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/lib/language-context"
import { useEffect, useState } from "react"
import { X, ChevronLeft, ChevronRight, Sparkles } from "lucide-react"

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
              onMouseMove={handleTiltMove}
              onMouseLeave={handleTiltLeave}
              className="group cursor-pointer relative [perspective:1200px]"
              style={{
                transform: "rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg))",
                transition: "transform 200ms ease",
              }}
            >
              {/* Mirror frame decoration */}
              <div className="absolute inset-0 z-10 pointer-events-none">
                <div className="absolute -inset-6 rounded-[50%/65%] oriental-mosaic opacity-10 [mask-image:radial-gradient(closest-side,transparent_70%,black_73%,black_100%)]" />
                <div className="absolute -inset-4 rounded-[50%/65%] border border-white/10 opacity-30" />
                <div className="absolute inset-0 rounded-[50%/65%] bg-gradient-to-r from-primary/12 via-primary/6 to-primary/12 blur-lg transform rotate-3 scale-105 group-hover:rotate-6 transition-transform duration-700" />
                <div className="absolute -inset-2 rounded-[50%/65%] border-2 border-gradient-to-r from-primary/20 via-primary/10 to-primary/20 opacity-0 group-hover:opacity-70 transition-opacity duration-500" />
                <div className="absolute top-4 left-4 text-primary/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <Sparkles className="h-6 w-6 animate-pulse" />
                </div>
                <div className="absolute bottom-4 right-4 text-primary/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  <Sparkles className="h-4 w-4 animate-pulse" />
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-40 rounded-[50%/65%] border border-primary/12 opacity-0 group-hover:opacity-70 transition-opacity duration-700" />
              </div>

              {/* Main mirror oval container */}
              <div className="relative aspect-[3/4] mx-auto max-w-md">
                <div className="absolute inset-0 rounded-[50%/65%] bg-gradient-to-br from-primary/10 via-primary/4 to-primary/10 backdrop-blur-sm border border-primary/14 shadow-2xl group-hover:shadow-primary/20 transition-all duration-500" />

                {/* Image container with oval mask */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative h-[84%] w-[78%] rounded-[50%/65%] overflow-hidden [mask-image:radial-gradient(ellipse_at_center,black_64%,transparent_68%)] [mask-repeat:no-repeat] [mask-size:100%_100%]">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <div className="text-center">
                        <span className="text-white font-semibold text-lg bg-primary/90 backdrop-blur-md px-6 py-3 rounded-full shadow-lg border border-white/20">
                          {t("viewGallery")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative corner elements */}
                <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-primary/40 rounded-tl-lg" />
                <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-primary/40 rounded-tr-lg" />
                <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-primary/40 rounded-bl-lg" />
                <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-primary/40 rounded-br-lg" />
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
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4">
          <button
            onClick={handleCloseGallery}
            className="absolute top-4 ltr:right-4 rtl:left-4 text-white hover:text-primary transition-colors z-10"
            aria-label="Close gallery"
          >
            <X className="h-8 w-8" />
          </button>


          <div className="max-w-6xl w-full">
            {/* Gallery with mirror frame decoration */}
            <div className="relative">
              {/* Decorative frame elements */}
              <div className="absolute inset-0 z-10 pointer-events-none">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/15 via-primary/8 to-primary/15 blur-2xl" />
                <div className="absolute -inset-4 rounded-3xl border border-primary/20" />
                <div className="absolute top-8 left-8 text-primary">
                  <Sparkles className="h-8 w-8 animate-pulse" />
                </div>
                <div className="absolute bottom-8 right-8 text-primary">
                  <Sparkles className="h-6 w-6 animate-pulse delay-100" />
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-primary/10" />
              </div>
              
              <div className="relative aspect-[16/10] mb-6 rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={projects[selectedProject].gallery[currentImageIndex] || "/placeholder.svg"}
                  alt={`${projects[selectedProject].title} - Image ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />
                
                {/* Mirror reflection overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/10" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

                {/* Navigation Arrows */}
                {projects[selectedProject].gallery.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute top-1/2 -translate-y-1/2 ltr:left-6 rtl:right-6 bg-white/20 hover:bg-white/30 backdrop-blur-lg text-white p-4 rounded-full transition-all z-20 border border-white/20 shadow-lg"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="h-7 w-7" />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute top-1/2 -translate-y-1/2 ltr:right-6 rtl:left-6 bg-white/20 hover:bg-white/30 backdrop-blur-lg text-white p-4 rounded-full transition-all z-20 border border-white/20 shadow-lg"
                      aria-label="Next image"
                    >
                      <ChevronRight className="h-7 w-7" />
                    </button>
                  </>
                )}

                {/* Thumbnail strip with mirror effect */}
                {projects[selectedProject].gallery.length > 1 && (
                  <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4">
                    <div className="flex flex-wrap gap-3 justify-center">
                      {projects[selectedProject].gallery.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentImageIndex(idx)}
                          className={`relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-3 transition-all shadow-lg ${
                            idx === currentImageIndex
                              ? "border-primary scale-110 shadow-primary/50"
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
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Project Info with mirror styling */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-2xl blur-xl" />
              <div className="relative glass-card rounded-2xl p-8 border border-primary/20 shadow-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-sm text-primary font-medium px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
                    {projects[selectedProject].category}
                  </span>
                  <div className="flex items-center gap-2 text-white/60">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <span className="text-sm">
                      {currentImageIndex + 1} / {projects[selectedProject].gallery.length}
                    </span>
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-white mb-4 bg-gradient-to-r from-white to-primary/40 bg-clip-text text-transparent">
                  {projects[selectedProject].title}
                </h3>
                <p className="text-white/80 leading-relaxed text-lg">{projects[selectedProject].description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
