"use client"

import { useState, useCallback, useEffect } from "react"

interface UseMirrorTransitionReturn {
  isTransitioning: boolean
  transitionToSection: (sectionId: string) => void
}

export function useMirrorTransition(): UseMirrorTransitionReturn {
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [targetSection, setTargetSection] = useState<string | null>(null)

  const transitionToSection = useCallback((sectionId: string) => {
    if (isTransitioning) return
    
    setTargetSection(sectionId)
    setIsTransitioning(true)

    // Wait for animation, then scroll
    setTimeout(() => {
      const element = document.getElementById(sectionId)
      if (element) {
        const header = document.querySelector("header") as HTMLElement | null
        const headerHeight = header ? header.offsetHeight : 0
        const top = element.getBoundingClientRect().top + window.scrollY - headerHeight - 8
        window.scrollTo({ top, behavior: "auto" })
      }
      
      // End transition
      setTimeout(() => {
        setIsTransitioning(false)
        setTargetSection(null)
      }, 400)
    }, 600)
  }, [isTransitioning])

  // Handle escape key to cancel transition
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isTransitioning) {
        setIsTransitioning(false)
        setTargetSection(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isTransitioning])

  return {
    isTransitioning,
    transitionToSection
  }
}
