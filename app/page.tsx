"use client"

import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { About } from "@/components/about"
import { Projects } from "@/components/projects"
import { ReservationSystem } from "@/components/reservation-system"
import { Contact } from "@/components/contact"
import { FloatingWhatsApp } from "@/components/floating-whatsapp"
import { BookingDashboard } from "@/components/booking-dashboard"
import { BookingNotificationBadge } from "@/components/booking-notification-badge"
import { LanguageProvider } from "@/lib/language-context"

export default function Home() {
  return (
    <LanguageProvider>
      <main className="min-h-screen">
        <Header />
        <Hero />
        <Services />
        <About />
        <Projects />
        <ReservationSystem />
        <Contact />
        <FloatingWhatsApp />
        <BookingDashboard />
        <BookingNotificationBadge />
      </main>
    </LanguageProvider>
  )
}
