"use client"

import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { StatsBar } from "@/components/stats-bar"
import { ProcessJourney } from "@/components/process-journey"
import { Services } from "@/components/services"
import { About } from "@/components/about"
import { Projects } from "@/components/projects"
import { Clients } from "@/components/clients"
import { Testimonial } from "@/components/testimonial"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { FloatingWhatsApp } from "@/components/floating-whatsapp"
import { LanguageProvider } from "@/lib/language-context"

export default function Home() {
  return (
    <LanguageProvider>
      <main className="min-h-screen">
        <Header />
        <Hero />
        <StatsBar />
        <ProcessJourney />
        <Services />
        <About />
        <Projects />
        <Testimonial />
        <Clients />
        <Contact />
        <Footer />
        <FloatingWhatsApp />
      </main>
    </LanguageProvider>
  )
}
