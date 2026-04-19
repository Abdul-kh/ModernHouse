"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { useLanguage } from "@/lib/language-context"

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
    <div className="client-card mx-4 flex-shrink-0">
      <div className="client-initials">{client.initials}</div>
      <div className="text-center mt-2">
        <p className="text-xs font-semibold text-white/75 leading-tight max-w-[120px] text-center">{client.name}</p>
        <p className="text-[9px] text-white/30 mt-0.5 uppercase tracking-wider">{client.category}</p>
      </div>
    </div>
  )
}

export function Clients() {
  const { t } = useLanguage()
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <section id="clients" ref={ref} className="py-20 relative overflow-hidden section-bg-3">
      <div className="absolute inset-0 damask-black opacity-12 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)" }} />

      <div className="container mx-auto px-4 lg:px-8 relative z-10 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="flex justify-center mb-4"><span className="section-label">{t("clientsLabel")}</span></div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4 section-heading-editorial">{t("clientsTitle")}</h2>
          <p className="text-base text-white/45 leading-relaxed">{t("clientsDescription")}</p>
        </motion.div>
      </div>

      {/* Marquee row 1 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="overflow-hidden mb-5"
      >
        <div className="marquee-track">
          {[...clientsRow1, ...clientsRow1].map((client, i) => (
            <ClientCard key={i} client={client} />
          ))}
        </div>
      </motion.div>

      {/* Marquee row 2 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.35 }}
        className="overflow-hidden"
      >
        <div className="marquee-track-reverse">
          {[...clientsRow2, ...clientsRow2].map((client, i) => (
            <ClientCard key={i} client={client} />
          ))}
        </div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)" }} />
    </section>
  )
}
