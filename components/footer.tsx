"use client"

import { useLanguage } from "@/lib/language-context"

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-primary text-primary-foreground py-12 px-4 lg:px-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-7xl mx-auto mb-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex flex-col mb-4">
              <span className="text-xl font-bold tracking-tight">MODERN</span>
              <span className="text-xl font-bold tracking-tight">HOUSE</span>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">{t("footerDescription")}</p>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold mb-4">{t("servicesFooter")}</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>
                <a href="#services" className="hover:text-primary-foreground transition-colors">
                  {t("architecturalGlass")}
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-primary-foreground transition-colors">
                  {t("residentialSolutions")}
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-primary-foreground transition-colors">
                  {t("customMirrors")}
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-primary-foreground transition-colors">
                  {t("specialtyGlass")}
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-bold mb-4">{t("company")}</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>
                <a href="#about" className="hover:text-primary-foreground transition-colors">
                  {t("aboutUs")}
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-primary-foreground transition-colors">
                  {t("projects")}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-foreground transition-colors">
                  {t("careers")}
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-primary-foreground transition-colors">
                  {t("contact")}
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-bold mb-4">{t("legal")}</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>
                <a href="#" className="hover:text-primary-foreground transition-colors">
                  {t("privacyPolicy")}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-foreground transition-colors">
                  {t("termsOfService")}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-foreground transition-colors">
                  {t("warranty")}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm text-primary-foreground/80">
          <p>
            &copy; {new Date().getFullYear()} Modern House. {t("allRightsReserved")}
          </p>
        </div>
      </div>
    </footer>
  )
}
