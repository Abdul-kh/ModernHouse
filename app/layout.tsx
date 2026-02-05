"use client"

import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Cairo } from "next/font/google"
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
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} ${cairo.variable}`}>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} ${cairo.variable} antialiased`}>
        <TransitionContext.Provider value={{ transitionToSection, isTransitioning }}>
          <Suspense fallback={null}>{children}</Suspense>
          <MirrorTransitionOverlay isActive={isTransitioning} />
          <Analytics />
        </TransitionContext.Provider>
      </body>
    </html>
  )
}
