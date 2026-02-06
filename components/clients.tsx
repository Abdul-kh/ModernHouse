"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Building2, Hotel, Home, Landmark } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

const clients = [
  { name: "Rotana Hotel Erbil", category: "hospitality", logo: "🏨" },
  { name: "Divan Erbil Hotel", category: "hospitality", logo: "🏨" },
  { name: "Cristal Erbil Hotel", category: "hospitality", logo: "🏨" },
  { name: "Erbil International Airport", category: "commercial", logo: "✈️" },
  { name: "Royal Mall Erbil", category: "commercial", logo: "🏢" },
  { name: "Family Mall", category: "commercial", logo: "🏢" },
  { name: "Dream City", category: "residential", logo: "🏘️" },
  { name: "Italian Village", category: "residential", logo: "🏘️" },
  { name: "Erbil Governorate", category: "government", logo: "🏛️" },
  { name: "Kurdistan Regional Government", category: "government", logo: "🏛️" },
]

const categoryIcons = {
  hospitality: Hotel,
  commercial: Building2,
  residential: Home,
  government: Landmark,
}

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

        <Card className="border-border hover:shadow-xl hover:border-primary/50 transition-all bg-card/50 backdrop-blur-sm mirror-hover lux-mirror-frame">
          <CardContent className="p-6 md:p-8">
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {clients.map((client, index) => {
                const IconComponent = categoryIcons[client.category as keyof typeof categoryIcons]
                return (
                  <div
                    key={index}
                    className="group relative flex flex-col items-center justify-center p-4 rounded-lg bg-background/50 hover:bg-background/80 transition-all duration-300 hover:scale-105 border border-border/50 hover:border-primary/30"
                  >
                    {/* Category indicator */}
                    <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                        <IconComponent className="h-2.5 w-2.5 text-primary" />
                      </div>
                    </div>
                    
                    {/* Logo/Icon */}
                    <div className="text-2xl md:text-3xl mb-2 filter grayscale group-hover:grayscale-0 transition-all duration-300 transform group-hover:scale-110">
                      {client.logo}
                    </div>
                    
                    {/* Company name */}
                    <h3 className="text-xs md:text-sm font-medium text-center text-muted-foreground group-hover:text-foreground transition-colors duration-300 leading-tight">
                      {client.name}
                    </h3>
                  </div>
                )
              })}
            </div>
            
            {/* Category legend */}
            <div className="mt-8 pt-6 border-t border-border/50">
              <div className="flex flex-wrap justify-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Hotel className="h-3.5 w-3.5 text-primary" />
                  <span>{t("hospitalityClients")}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Building2 className="h-3.5 w-3.5 text-primary" />
                  <span>{t("commercialClients")}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Home className="h-3.5 w-3.5 text-primary" />
                  <span>{t("residentialClients")}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Landmark className="h-3.5 w-3.5 text-primary" />
                  <span>{t("governmentClients")}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
