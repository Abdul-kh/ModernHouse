"use client"

import React from "react"
import { useLanguage } from "@/lib/language-context"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const clientsRow1 = [
  { name: "Rotana Hotel Erbil", initials: "RH", category: "Hospitality" },
  { name: "Divan Erbil Hotel", initials: "DE", category: "Hospitality" },
  { name: "Cristal Erbil Hotel", initials: "CE", category: "Hospitality" },
  { name: "Erbil International Airport", initials: "EIA", category: "Commercial" },
  { name: "Royal Mall Erbil", initials: "RM", category: "Commercial" },
  { name: "Family Mall", initials: "FM", category: "Commercial" },
]

const clientsRow2 = [
  { name: "Dream City", initials: "DC", category: "Residential" },
  { name: "Italian Village", initials: "IV", category: "Residential" },
  { name: "Erbil Governorate", initials: "EG", category: "Government" },
  { name: "Kurdistan Regional Government", initials: "KRG", category: "Government" },
  { name: "Ankawa Mall", initials: "AM", category: "Commercial" },
  { name: "Empire World", initials: "EW", category: "Residential" },
]

function ClientCard({ client }: { client: { name: string; initials: string; category: string } }) {
  return (
    <div className="client-card mx-3">
      <div className="client-initials">
        {client.initials}
      </div>
      <div className="text-center">
        <p className="text-xs font-semibold text-white/80 leading-tight max-w-[110px] text-center">{client.name}</p>
        <p className="text-[10px] text-white/35 mt-0.5 uppercase tracking-wide">{client.category}</p>
      </div>
    </div>
  )
}

export function Clients() {
  const { t } = useLanguage()
  const ref = useScrollReveal()

  return (
    <section id="clients" className="py-24 relative overflow-hidden bg-background" ref={ref as React.RefObject<HTMLDivElement>}>
      <div className="absolute inset-0 z-0" style={{ backgroundColor: 'oklch(0.12 0.01 0)' }}>
        <div className="absolute inset-0 damask-black opacity-20" />
      </div>

      <div className="mirror-divider absolute top-0 left-0 right-0" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16 reveal">
          <div className="flex justify-center mb-4">
            <span className="section-label">{t("clientsLabel")}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6 text-balance section-heading-editorial">
            {t("clientsTitle")}
          </h2>
          <p className="text-lg text-white/55 leading-relaxed">{t("clientsDescription")}</p>
        </div>
      </div>

      {/* Marquee row 1 — left to right */}
      <div className="overflow-hidden mb-4 reveal reveal-delay-1">
        <div className="marquee-track">
          {[...clientsRow1, ...clientsRow1].map((client, i) => (
            <ClientCard key={i} client={client} />
          ))}
        </div>
      </div>

      {/* Marquee row 2 — right to left */}
      <div className="overflow-hidden reveal reveal-delay-2">
        <div className="marquee-track-reverse">
          {[...clientsRow2, ...clientsRow2].map((client, i) => (
            <ClientCard key={i} client={client} />
          ))}
        </div>
      </div>

      <div className="mirror-divider absolute bottom-0 left-0 right-0" />
    </section>
  )
}
