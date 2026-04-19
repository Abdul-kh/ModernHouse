"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/lib/language-context"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

export function Projects() {
  const { t } = useLanguage()
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [activeFilter, setActiveFilter] = useState("All")
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" })

  const projects = [
    {
      title: t("project1"),
      category: t("commercialProject"),
      image: "/modern-glass-tower-building-facade-in-dubai.jpg",
      description: t("project1Desc"),
      gallery: [
        "/modern-glass-tower-building-facade-in-dubai.jpg",
        "/modern-luxury-mirror-installation-in-elegant-inter.jpg",
        "/decorative-colored-glass-panels-with-artistic-patt.jpg",
      ],
    },
    {
      title: t("project2"),
      category: t("residentialProject"),
      image: "/luxury-villa-with-floor-to-ceiling-glass-windows.jpg",
      description: t("project2Desc"),
      gallery: [
        "/luxury-villa-with-floor-to-ceiling-glass-windows.jpg",
        "/contemporary-shower-with-led-mirror-lighting.jpg",
        "/carved-glass-decorative-wall-feature-in-upscale-sp.jpg",
      ],
    },
    {
      title: t("project3"),
      category: t("commercialProject"),
      image: "/modern-office-building-with-glass-curtain-wall.jpg",
      description: t("project3Desc"),
      gallery: [
        "/modern-office-building-with-glass-curtain-wall.jpg",
        "/carved-glass-decorative-wall-feature-in-upscale-sp.jpg",
        "/decorative-colored-glass-panels-with-artistic-patt.jpg",
      ],
    },
    {
      title: t("project4"),
      category: t("hospitalityProject"),
      image: "/luxury-hotel-lobby-with-custom-glass-features.jpg",
      description: t("project4Desc"),
      gallery: [
        "/luxury-hotel-lobby-with-custom-glass-features.jpg",
        "/modern-luxury-mirror-installation-in-elegant-inter.jpg",
        "/decorative-colored-glass-panels-with-artistic-patt.jpg",
      ],
    },
  ]

  const categories = ["All", t("commercialProject"), t("residentialProject"), t("hospitalityProject")]
  const filtered = activeFilter === "All" ? projects : projects.filter((p) => p.category === activeFilter)

  const handleProjectClick = (index: number) => { setSelectedProject(index); setCurrentImageIndex(0) }
  const handleCloseGallery = () => { setSelectedProject(null); setCurrentImageIndex(0) }
  const handleNextImage = () => { if (selectedProject !== null) setCurrentImageIndex((p) => (p + 1) % projects[selectedProject].gallery.length) }
  const handlePrevImage = () => { if (selectedProject !== null) setCurrentImageIndex((p) => (p - 1 + projects[selectedProject].gallery.length) % projects[selectedProject].gallery.length) }

  useEffect(() => {
    if (selectedProject !== null) {
      document.body.style.overflow = "hidden"
      document.body.classList.add("gallery-open")
      return () => { document.body.style.overflow = ""; document.body.classList.remove("gallery-open") }
    }
  }, [selectedProject])

  return (
    <section id="projects" ref={sectionRef} className="py-24 relative overflow-hidden section-bg-1">
      <div className="absolute inset-0 damask-black opacity-15 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)" }} />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center mb-10"
        >
          <div className="flex justify-center mb-4"><span className="section-label">{t("projectsLabel")}</span></div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4 section-heading-editorial">{t("projectsTitle")}</h2>
          <p className="text-base text-white/45 leading-relaxed">{t("projectsDescription")}</p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`filter-tab${activeFilter === cat ? " active" : ""}`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Asymmetric masonry */}
        <AnimatePresence mode="popLayout">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-7xl mx-auto">
            {filtered.map((project, index) => {
              const originalIndex = projects.indexOf(project)
              return (
                <motion.div
                  key={project.title}
                  layout
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  onClick={() => handleProjectClick(originalIndex)}
                  className="group cursor-pointer"
                  data-cursor-hover
                >
                  <div
                    className="relative overflow-hidden mirror-frame-3d"
                    style={{ aspectRatio: index % 3 === 0 ? "3/4" : "4/5" }}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0.2), transparent)" }} />
                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <p className="text-[10px] uppercase tracking-[0.2em] mb-2" style={{ color: "var(--lux-gold)" }}>{project.category}</p>
                      <h3 className="text-lg md:text-xl font-bold text-white font-playfair-heading">{project.title}</h3>
                      <div className="flex items-center gap-2 mt-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        <span className="text-xs text-white/70">{t("viewGallery")}</span>
                        <div className="h-px flex-1 bg-white/30 max-w-[40px]" />
                      </div>
                    </div>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{ boxShadow: "inset 0 0 0 1px rgba(255,220,120,0.25)" }} />
                  </div>
                </motion.div>
              )
            })}
          </div>
        </AnimatePresence>
      </div>

      {/* Gallery Modal */}
      <AnimatePresence>
        {selectedProject !== null && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex flex-col"
            style={{ background: "rgba(5,5,5,0.95)", backdropFilter: "blur(20px)" }}
          >
            <button onClick={handleCloseGallery} className="absolute top-5 right-5 z-50 text-white/70 hover:text-white transition-colors p-2">
              <X className="h-7 w-7" />
            </button>
            <div className="flex-1 flex items-center justify-center p-6 pt-16">
              <div className="w-full max-w-5xl">
                <div className="relative rounded-2xl overflow-hidden mirror-frame-3d" style={{ maxHeight: "70vh" }}>
                  <div style={{ height: "70vh" }}>
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={currentImageIndex}
                        src={projects[selectedProject].gallery[currentImageIndex]}
                        alt={`${projects[selectedProject].title} ${currentImageIndex + 1}`}
                        className="w-full h-full object-contain"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        transition={{ duration: 0.35 }}
                      />
                    </AnimatePresence>
                    {projects[selectedProject].gallery.length > 1 && (
                      <>
                        <button onClick={handlePrevImage} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-3 rounded-full backdrop-blur-sm border border-white/15 z-30 transition-all">
                          <ChevronLeft className="h-6 w-6" />
                        </button>
                        <button onClick={handleNextImage} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-3 rounded-full backdrop-blur-sm border border-white/15 z-30 transition-all">
                          <ChevronRight className="h-6 w-6" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
                <div className="mt-5 text-center">
                  <div className="flex justify-center gap-2 mb-3">
                    {projects[selectedProject].gallery.map((_, idx) => (
                      <button key={idx} onClick={() => setCurrentImageIndex(idx)}
                        className="h-1.5 rounded-full transition-all duration-300"
                        style={{ width: idx === currentImageIndex ? "2rem" : "0.375rem", background: idx === currentImageIndex ? "var(--lux-gold)" : "rgba(255,255,255,0.2)" }} />
                    ))}
                  </div>
                  <p className="text-[10px] uppercase tracking-[0.2em] mb-1" style={{ color: "var(--lux-gold)" }}>{projects[selectedProject].category}</p>
                  <h3 className="text-xl font-bold text-white font-playfair-heading mb-2">{projects[selectedProject].title}</h3>
                  <p className="text-white/50 text-sm max-w-2xl mx-auto leading-relaxed">{projects[selectedProject].description}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
