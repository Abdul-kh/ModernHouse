"use client"

import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Cairo } from "next/font/google"
import { Playfair_Display, Montserrat, Raleway, Oswald, Poppins } from "next/font/google"
import { Amiri, Tajawal, Katibeh, Almarai, Scheherazade_New } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { MirrorTransitionOverlay } from "@/components/mirror-transition-overlay"
import { useMirrorTransition } from "@/hooks/use-mirror-transition"
import { createContext, useContext } from "react"
import "./globals.css"

const cairo = Cairo({
  subsets: ["latin", "arabic"],
  variable: "--font-cairo",
  display: "swap",
})

// English font options
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
})

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
  display: "swap",
})

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
})

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
})

// Arabic font options
const amiri = Amiri({
  subsets: ["arabic", "latin"],
  variable: "--font-amiri",
  display: "swap",
  weight: ["400", "700"],
})

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  variable: "--font-tajawal",
  display: "swap",
  weight: ["300", "400", "500", "700", "900"],
})

const katibeh = Katibeh({
  subsets: ["arabic", "latin"],
  variable: "--font-katibeh",
  display: "swap",
  weight: "400",
})

const almarai = Almarai({
  subsets: ["arabic", "latin"],
  variable: "--font-almarai",
  display: "swap",
  weight: ["300", "400", "700", "800"],
})

const scheherazadeNew = Scheherazade_New({
  subsets: ["arabic", "latin"],
  variable: "--font-scheherazade",
  display: "swap",
  weight: ["400", "700"],
})

interface TransitionContextType {
  transitionToSection: (sectionId: string) => void
  isTransitioning: boolean
}

export const TransitionContext = createContext<TransitionContextType>({
  transitionToSection: () => {},
  isTransitioning: false,
})

export const useTransition = () => useContext(TransitionContext)

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { isTransitioning, transitionToSection } = useMirrorTransition()

  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} ${cairo.variable} ${playfairDisplay.variable} ${montserrat.variable} ${raleway.variable} ${oswald.variable} ${poppins.variable} ${amiri.variable} ${tajawal.variable} ${katibeh.variable} ${almarai.variable} ${scheherazadeNew.variable}`}>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} ${cairo.variable} ${playfairDisplay.variable} ${montserrat.variable} ${raleway.variable} ${oswald.variable} ${poppins.variable} ${amiri.variable} ${tajawal.variable} ${katibeh.variable} ${almarai.variable} ${scheherazadeNew.variable} antialiased`}>
        <TransitionContext.Provider value={{ transitionToSection, isTransitioning }}>
          <Suspense fallback={null}>{children}</Suspense>
          <MirrorTransitionOverlay isActive={isTransitioning} />
          <Analytics />
        </TransitionContext.Provider>
      </body>
    </html>
  )
}
