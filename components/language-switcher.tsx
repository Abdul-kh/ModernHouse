"use client"

import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-lg p-1 border border-white/20">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setLanguage("en")}
        className={`text-xs px-3 py-1 h-8 transition-all ${
          language === "en"
            ? "bg-white/20 shadow-sm text-white font-semibold"
            : "hover:bg-white/10 text-white/80 hover:text-white"
        }`}
      >
        EN
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setLanguage("ar")}
        className={`text-xs px-3 py-1 h-8 transition-all ${
          language === "ar"
            ? "bg-white/20 shadow-sm text-white font-semibold"
            : "hover:bg-white/10 text-white/80 hover:text-white"
        }`}
      >
        AR
      </Button>
    </div>
  )
}
