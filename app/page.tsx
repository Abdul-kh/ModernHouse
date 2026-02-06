"use client"

import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { About } from "@/components/about"
import { Projects } from "@/components/projects"
import { Clients } from "@/components/clients"
import { Contact } from "@/components/contact"
import { FloatingWhatsApp } from "@/components/floating-whatsapp"
import { FontSwitcher } from "@/components/font-switcher"
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
        <Clients />
        <Contact />
        <FloatingWhatsApp />
        <FontSwitcher />
      </main>
    </LanguageProvider>
  )
}
