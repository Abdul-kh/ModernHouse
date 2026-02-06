"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Building2, Hotel, Home, Landmark } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

const clients = [
  {
    category: "hospitalityClients",
    icon: Hotel,
    companies: [
      { name: "Rotana Hotel Erbil", logo: "🏨" },
      { name: "Divan Erbil Hotel", logo: "🏨" },
      { name: "Cristal Erbil Hotel", logo: "🏨" },
      { name: "Khanzad Hotel", logo: "🏨" },
    ],
  },
  {
    category: "commercialClients",
    icon: Building2,
    companies: [
      { name: "Erbil International Airport", logo: "✈️" },
      { name: "Royal Mall Erbil", logo: "🏢" },
      { name: "Family Mall", logo: "🏢" },
      { name: "Majidi Mall", logo: "🏢" },
    ],
  },
  {
    category: "residentialClients",
    icon: Home,
    companies: [
      { name: "Dream City", logo: "🏘️" },
      { name: "Italian Village", logo: "🏘️" },
      { name: "Royal City", logo: "🏘️" },
      { name: "Erbil Citadel Residences", logo: "🏘️" },
    ],
  },
  {
    category: "governmentClients",
    icon: Landmark,
    companies: [
      { name: "Erbil Governorate", logo: "🏛️" },
      { name: "Kurdistan Regional Government", logo: "🏛️" },
      { name: "Erbil Municipality", logo: "🏛️" },
      { name: "Ministry of Health", logo: "🏛️" },
    ],
  },
]

export function Clients() {
  const { t } = useLanguage()

  return (
    <section id="clients" className="py-24 px-4 lg:px-8 relative overflow-hidden bg-background">
      <div className="absolute inset-0 z-0" style={{ backgroundColor: 'oklch(0.12 0.01 0)' }}>
        <div className="absolute inset-0 damask-black opacity-20" />
      </div>
      <div className="container mx-auto relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6 text-balance">
            {t("clientsTitle")}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">{t("clientsDescription")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {clients.map((category) => {
            const IconComponent = category.icon
            return (
              <Card key={category.category} className="border-border hover:shadow-xl hover:border-primary/50 transition-all group bg-card/50 backdrop-blur-sm mirror-hover lux-mirror-frame">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors group-hover:scale-110 duration-300">
                      <IconComponent className="h-6 w-6 text-primary/90 group-hover:text-primary transition-colors" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">{t(category.category)}</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {category.companies.map((company, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 rounded-lg bg-background/50 hover:bg-background/80 transition-colors group/item"
                      >
                        <span className="text-2xl filter grayscale group-hover/item:grayscale-0 transition-all duration-300">
                          {company.logo}
                        </span>
                        <span className="text-sm font-medium text-muted-foreground group-hover/item:text-foreground transition-colors">
                          {company.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
