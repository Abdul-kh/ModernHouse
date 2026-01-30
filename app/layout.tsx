import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Cairo } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

const cairo = Cairo({
  subsets: ["latin", "arabic"],
  variable: "--font-cairo",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Modern House - Mirrors & Decorative Glass (Erbil, Iraq)",
  description:
    "Custom mirrors and etched decorative glass crafted in Erbil, Iraq. Specializing in mirror carving, oriental-inspired patterns, and premium installations.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} ${cairo.variable}`}>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} ${cairo.variable} antialiased`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
