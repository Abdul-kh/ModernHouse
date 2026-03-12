"use client"

import { useLanguage } from "@/lib/language-context"
import Image from "next/image"
import Link from "next/link"

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
    </svg>
  )
}

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="relative px-4 lg:px-8 pt-16 pb-8 overflow-hidden" style={{ backgroundColor: 'oklch(0.08 0.01 0)' }}>
      <div className="absolute inset-0 damask-black opacity-10 pointer-events-none" />
      <div className="gold-top-border absolute top-0 left-0 right-0" />

      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 max-w-7xl mx-auto mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3 mb-4 group">
              <Image
                src="/logo.png"
                alt="Modern House Logo"
                width={44}
                height={44}
                className="object-contain opacity-90 group-hover:opacity-100 transition-opacity"
              />
              <div className="flex flex-col leading-none">
                <span className="wordmark text-white/90">Modern</span>
                <span className="wordmark" style={{ color: 'var(--lux-gold)' }}>House</span>
              </div>
            </Link>
            <p className="text-white/35 text-xs leading-relaxed mb-5">{t("footerDescription")}</p>
            <p className="text-[10px] uppercase tracking-[0.2em]" style={{ color: 'rgba(255,220,120,0.5)' }}>
              {t("footerTagline")}
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3 mt-5">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center border border-white/10 text-white/35 hover:text-white hover:border-white/25 transition-all"
                aria-label="Instagram"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center border border-white/10 text-white/35 hover:text-white hover:border-white/25 transition-all"
                aria-label="Facebook"
              >
                <FacebookIcon />
              </a>
              <a
                href="https://wa.me/9647503562547"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center border border-white/10 transition-all"
                style={{ color: 'rgba(37,211,102,0.5)' }}
                aria-label="WhatsApp"
              >
                <WhatsAppIcon />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-5" style={{ color: 'var(--lux-gold)', opacity: 0.7 }}>{t("servicesFooter")}</h3>
            <ul className="space-y-3 text-xs text-white/35">
              <li><a href="#services" className="hover:text-white/70 transition-colors">{t("architecturalGlass")}</a></li>
              <li><a href="#services" className="hover:text-white/70 transition-colors">{t("residentialSolutions")}</a></li>
              <li><a href="#services" className="hover:text-white/70 transition-colors">{t("customMirrors")}</a></li>
              <li><a href="#services" className="hover:text-white/70 transition-colors">{t("specialtyGlass")}</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-5" style={{ color: 'var(--lux-gold)', opacity: 0.7 }}>{t("company")}</h3>
            <ul className="space-y-3 text-xs text-white/35">
              <li><a href="#about" className="hover:text-white/70 transition-colors">{t("aboutUs")}</a></li>
              <li><a href="#projects" className="hover:text-white/70 transition-colors">{t("projects")}</a></li>
              <li><a href="#clients" className="hover:text-white/70 transition-colors">{t("clients")}</a></li>
              <li><a href="#contact" className="hover:text-white/70 transition-colors">{t("contact")}</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-5" style={{ color: 'var(--lux-gold)', opacity: 0.7 }}>{t("legal")}</h3>
            <ul className="space-y-3 text-xs text-white/35">
              <li><a href="#" className="hover:text-white/70 transition-colors">{t("privacyPolicy")}</a></li>
              <li><a href="#" className="hover:text-white/70 transition-colors">{t("termsOfService")}</a></li>
              <li><a href="#" className="hover:text-white/70 transition-colors">{t("warranty")}</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mirror-divider mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] text-white/20 uppercase tracking-[0.15em]">
          <p>&copy; {new Date().getFullYear()} Modern House. {t("allRightsReserved")}</p>
          <p style={{ color: 'rgba(255,220,120,0.3)' }}>Erbil, Kurdistan Region, Iraq</p>
        </div>
      </div>
    </footer>
  )
}
