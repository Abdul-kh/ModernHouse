"use client"

import { useState, useEffect } from "react"

export function FontSwitcher() {
  const [currentEnglishFont, setCurrentEnglishFont] = useState("default")
  const [currentArabicFont, setCurrentArabicFont] = useState("default")

  const englishFonts = [
    { key: "default", name: "Geist Sans (Current)", class: "" },
    { key: "playfair", name: "Playfair Display", class: "font-playfair" },
    { key: "montserrat", name: "Montserrat", class: "font-montserrat" },
    { key: "raleway", name: "Raleway", class: "font-raleway" },
    { key: "oswald", name: "Oswald", class: "font-oswald" },
    { key: "poppins", name: "Poppins", class: "font-poppins" },
  ]

  const arabicFonts = [
    { key: "default", name: "Cairo (Current)", class: "" },
    { key: "amiri", name: "Amiri", class: "font-amiri" },
    { key: "tajawal", name: "Tajawal", class: "font-tajawal" },
    { key: "katibeh", name: "Katibeh", class: "font-katibeh" },
    { key: "almarai", name: "Almarai", class: "font-almarai" },
    { key: "scheherazade", name: "Scheherazade", class: "font-scheherazade" },
  ]

  useEffect(() => {
    const html = document.documentElement
    
    // Remove all English font classes
    html.classList.remove("font-playfair", "font-montserrat", "font-raleway", "font-oswald", "font-poppins")
    
    // Add current English font class
    const selectedEnglishFont = englishFonts.find(f => f.key === currentEnglishFont)
    if (selectedEnglishFont?.class) {
      html.classList.add(selectedEnglishFont.class)
      console.log(`Applied English font class: ${selectedEnglishFont.class}`)
    }
  }, [currentEnglishFont])

  useEffect(() => {
    const html = document.documentElement
    
    // Remove all Arabic font classes
    html.classList.remove("font-amiri", "font-tajawal", "font-katibeh", "font-almarai", "font-scheherazade")
    
    // Add current Arabic font class
    const selectedArabicFont = arabicFonts.find(f => f.key === currentArabicFont)
    if (selectedArabicFont?.class) {
      html.classList.add(selectedArabicFont.class)
      console.log(`Applied Arabic font class: ${selectedArabicFont.class}`)
    }
  }, [currentArabicFont])

  return (
    <div className="fixed top-20 right-4 z-50 bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg p-4 shadow-xl max-w-xs">
      <div className="text-white text-sm font-semibold mb-3">Font Preview</div>
      
      {/* English Fonts */}
      <div className="mb-4">
        <div className="text-white/80 text-xs font-medium mb-2">English Fonts</div>
        <select
          value={currentEnglishFont}
          onChange={(e) => setCurrentEnglishFont(e.target.value)}
          className="bg-white/20 border border-white/30 rounded px-2 py-1.5 text-white text-xs focus:outline-none focus:ring-2 focus:ring-primary/50 w-full mb-1"
        >
          {englishFonts.map(font => (
            <option key={font.key} value={font.key} className="bg-gray-800 text-white">
              {font.name}
            </option>
          ))}
        </select>
        <div className="text-white/60 text-xs">
          Current: {englishFonts.find(f => f.key === currentEnglishFont)?.name}
        </div>
      </div>

      {/* Arabic Fonts */}
      <div>
        <div className="text-white/80 text-xs font-medium mb-2">Arabic Fonts</div>
        <select
          value={currentArabicFont}
          onChange={(e) => setCurrentArabicFont(e.target.value)}
          className="bg-white/20 border border-white/30 rounded px-2 py-1.5 text-white text-xs focus:outline-none focus:ring-2 focus:ring-primary/50 w-full mb-1"
        >
          {arabicFonts.map(font => (
            <option key={font.key} value={font.key} className="bg-gray-800 text-white">
              {font.name}
            </option>
          ))}
        </select>
        <div className="text-white/60 text-xs">
          Current: {arabicFonts.find(f => f.key === currentArabicFont)?.name}
        </div>
      </div>

      <div className="text-white/40 text-xs mt-3 border-t border-white/20 pt-2">
        💡 Switch languages to test fonts
      </div>
    </div>
  )
}
