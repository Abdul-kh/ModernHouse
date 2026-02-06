"use client"

import { useState, useEffect, type CSSProperties } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useTransition } from "@/app/layout"
import Image from "next/image"
import Link from "next/link"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { t } = useLanguage()
  const { transitionToSection } = useTransition()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavClick = (sectionId: string) => {
    transitionToSection(sectionId)
    setIsMenuOpen(false)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-500 ${
        isScrolled ? "glass-card shadow-lg border-b border-white/10" : "bg-gradient-to-b from-black/80 to-transparent"
      }`}
      style={{
        '--mirror-gradient': 'radial-gradient(ellipse at center, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.4) 100%)',
      } as CSSProperties}
    >
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 damask-black opacity-30" />
      </div>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20" dir="ltr">
          <div className="flex items-center gap-3">
            <Link href="/" className="group inline-flex items-center" aria-label="Go to home">
              <div className="relative">
                <Image
                  src="/logo.png"
                  alt="Modern House Logo"
                  width={56}
                  height={56}
                  className="object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)]"
                  priority
                />
                <span className="pointer-events-none absolute inset-0 rounded-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]" />
              </div>
              <span className="sr-only">Modern House</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10 lg:gap-14" dir="ltr">
            {(["services", "about", "projects", "contact"] as const).map((section) => (
              <button
                key={section}
                data-nav-link
                onClick={() => handleNavClick(section)}
              >
                <span className="relative z-10">{t(section)}</span>
                <span className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
                  <span className="nav-shine" />
                </span>
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4" dir="ltr">
            <LanguageSwitcher />
            <Button
              onClick={() => handleNavClick("contact")}
              className="bg-primary text-white hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 relative overflow-hidden group"
            >
              {t("getQuote")}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10 glass-card">
            <nav className="flex flex-col gap-4">
              <div className="mb-2">
                <LanguageSwitcher />
              </div>
              <button
                onClick={() => handleNavClick("services")}
                className="text-sm font-medium text-white hover:text-primary transition-colors text-left"
              >
                {t("services")}
              </button>
              <button
                onClick={() => handleNavClick("about")}
                className="text-sm font-medium text-white hover:text-primary transition-colors text-left"
              >
                {t("about")}
              </button>
              <button
                onClick={() => handleNavClick("projects")}
                className="text-sm font-medium text-white hover:text-primary transition-colors text-left"
              >
                {t("projects")}
              </button>
              <button
                onClick={() => handleNavClick("contact")}
                className="text-sm font-medium text-white hover:text-primary transition-colors text-left"
              >
                {t("contact")}
              </button>
              <Button
                onClick={() => handleNavClick("contact")}
                className="bg-primary text-white hover:bg-primary/90 w-full"
              >
                {t("getQuote")}
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
