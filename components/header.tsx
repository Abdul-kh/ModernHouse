"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { useTransition } from "@/app/layout"
import Image from "next/image"
import { cn } from "@/lib/utils"

const navSections = ["services", "process", "about", "projects", "clients", "contact"] as const

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { t, language, setLanguage } = useLanguage()
  const { transitionToSection } = useTransition()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 48)
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [isMenuOpen])

  const handleNavClick = (sectionId: string) => {
    transitionToSection(sectionId)
    setIsMenuOpen(false)
  }

  return (
    <>
      <header
        className={cn(
          "pointer-events-none fixed inset-x-0 z-[9999] flex justify-center",
          "max-lg:top-0 max-lg:px-0",
          "lg:top-4 lg:px-3 xl:top-5",
        )}
      >
        <div
          className={cn(
            "pointer-events-auto flex w-full items-center justify-between gap-2 shadow-lg backdrop-blur-xl transition-[background-color,box-shadow] duration-300 sm:gap-3",
            "max-lg:max-w-none max-lg:rounded-none max-lg:border-x-0 max-lg:border-t-0 max-lg:border-b max-lg:border-white/10 max-lg:px-4 max-lg:py-2.5 max-lg:ring-0",
            "lg:max-w-6xl lg:rounded-full lg:border lg:border-white/15 lg:px-4 lg:py-2 lg:ring-1 lg:ring-white/5 md:lg:px-5",
            isScrolled
              ? "bg-black/85 shadow-black/40 lg:bg-black/60"
              : "bg-black/80 lg:bg-black/40 lg:shadow-black/25",
          )}
        >
          <button
            type="button"
            className="flex shrink-0 items-center py-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--lux-gold)]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            onClick={() => handleNavClick("hero")}
            aria-label="Modern House — home"
          >
            <Image
              src="/logo.png"
              alt=""
              width={200}
              height={220}
              className="h-11 w-auto object-contain object-left lg:h-9"
              priority
            />
          </button>

          <nav className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 lg:flex lg:gap-1.5" aria-label="Primary">
            {navSections.map((section) => (
              <button
                key={section}
                type="button"
                data-nav-link
                onClick={() => handleNavClick(section)}
                className="whitespace-nowrap rounded-full px-2 py-1.5 text-[11px] font-medium text-white/80 transition hover:bg-white/5 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--lux-gold)]/50 xl:px-2.5 xl:text-[13px]"
              >
                {t(section)}
              </button>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <div className="hidden rounded-full border border-white/10 bg-black/30 p-0.5 sm:flex">
              <button
                type="button"
                onClick={() => setLanguage("en")}
                className={cn(
                  "rounded-full px-2.5 py-1 text-[10px] font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--lux-gold)]/50 sm:text-xs",
                  language === "en" ? "bg-primary text-white" : "text-white/65 hover:text-white",
                )}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLanguage("ar")}
                className={cn(
                  "rounded-full px-2.5 py-1 text-[10px] font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--lux-gold)]/50 sm:text-xs",
                  language === "ar" ? "bg-primary text-white" : "text-white/65 hover:text-white",
                )}
              >
                AR
              </button>
            </div>

            <Button
              type="button"
              onClick={() => handleNavClick("contact")}
              className="hidden h-9 rounded-full bg-primary px-4 text-xs font-semibold text-white shadow-md hover:bg-primary/90 sm:inline-flex md:h-10 md:px-5 md:text-sm"
            >
              {t("getQuote")}
            </Button>

            <button
              type="button"
              className="rounded-full border border-white/15 p-2 text-white transition hover:bg-white/5 lg:hidden"
              onClick={() => setIsMenuOpen((v) => !v)}
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? t("closeMenu") : t("openMenu")}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {isMenuOpen ? (
        <div
          className="fixed inset-0 z-[9998] bg-black/70 pt-[4.75rem] backdrop-blur-sm lg:hidden"
          aria-hidden={!isMenuOpen}
        >
          <div className="mx-auto max-h-[calc(100vh-5.5rem)] max-w-lg overflow-y-auto rounded-2xl border border-[rgba(255,220,120,0.22)] bg-[oklch(0.12_0.012_15)]/95 p-6 shadow-2xl">
            <nav className="flex flex-col gap-1" aria-label="Mobile">
              {navSections.map((section) => (
                <button
                  key={section}
                  type="button"
                  onClick={() => handleNavClick(section)}
                  className="rounded-xl px-3 py-3 text-left text-base font-medium text-white/90 hover:bg-white/5 hover:text-primary"
                >
                  {t(section)}
                </button>
              ))}
            </nav>
            <div className="mt-4 flex gap-2 border-t border-white/10 pt-4">
              <button
                type="button"
                onClick={() => setLanguage("en")}
                className={cn(
                  "flex-1 rounded-full border py-2.5 text-sm font-semibold",
                  language === "en" ? "border-primary bg-primary text-white" : "border-white/20 text-white",
                )}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setLanguage("ar")}
                className={cn(
                  "flex-1 rounded-full border py-2.5 text-sm font-semibold",
                  language === "ar" ? "border-primary bg-primary text-white" : "border-white/20 text-white",
                )}
              >
                العربية
              </button>
            </div>
            <Button
              type="button"
              onClick={() => handleNavClick("contact")}
              className="mt-4 w-full rounded-full bg-primary py-6 text-sm font-semibold text-white hover:bg-primary/90"
            >
              {t("getQuote")}
            </Button>
          </div>
        </div>
      ) : null}
    </>
  )
}
