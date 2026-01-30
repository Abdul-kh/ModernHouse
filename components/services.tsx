"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, Palette, Droplets, Frame } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function Services() {
  const { t } = useLanguage()

  const services = [
    {
      icon: Sparkles,
      title: t("mirrorsDecorations"),
      description: t("mirrorsDecorationsDesc"),
    },
    {
      icon: Frame,
      title: t("glassDecorations"),
      description: t("glassDecorationsDesc"),
    },
    {
      icon: Palette,
      title: t("specialtyGlass"),
      description: t("specialtyGlassDesc"),
    },
    {
      icon: Droplets,
      title: t("showerMirrors"),
      description: t("showerMirrorsDesc"),
    },
  ]

  return (
    <section id="services" className="py-24 px-4 lg:px-8 relative overflow-hidden">
      <div className="container mx-auto relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6 text-balance">
            {t("servicesTitle")}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">{t("servicesDescription")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <Card
              key={index}
              className="border-border transition-all duration-300 group glass-card hover:border-primary/30 relative mirror-hover lux-mirror-frame hover:shadow-2xl hover:shadow-primary/15 hover:-translate-y-1"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/5 to-transparent" />
              </div>

              <CardContent className="p-6 relative z-10">
                <div className="mb-4">
                  <div className="w-12 h-12 rounded-full glass-effect flex items-center justify-center group-hover:bg-primary/10 group-hover:scale-110 transition-all duration-300">
                    <service.icon className="h-6 w-6 text-primary/90 group-hover:text-primary transition-colors" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
