"use client"

import { useState, useCallback, useEffect, useRef } from "react"

interface UseMirrorTransitionReturn {
  isTransitioning: boolean
  transitionToSection: (sectionId: string) => void
}

export function useMirrorTransition(): UseMirrorTransitionReturn {
  const [isTransitioning, setIsTransitioning] = useState(false)
  const busyRef = useRef(false)
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
  }, [])

  const transitionToSection = useCallback((sectionId: string) => {
    // Use ref for the guard so we never have a stale closure
    if (busyRef.current) return
    busyRef.current = true
    setIsTransitioning(true)

    // Scroll early while frosted glass overlay covers the view
    const t1 = setTimeout(() => {
      const element = document.getElementById(sectionId)
      if (element) {
        const header = document.querySelector("header") as HTMLElement | null
        const headerHeight = header ? header.offsetHeight : 0
        const top = element.getBoundingClientRect().top + window.scrollY - headerHeight - 8
        window.scrollTo({ top, behavior: "auto" })
      }
      
      // End transition after tiles have revealed the new section
      const t2 = setTimeout(() => {
        busyRef.current = false
        setIsTransitioning(false)
      }, 900)
      timersRef.current.push(t2)
    }, 100)
    timersRef.current.push(t1)
  }, [])

  // Handle escape key to cancel transition
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && busyRef.current) {
        clearTimers()
        busyRef.current = false
        setIsTransitioning(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [clearTimers])

  // Cleanup on unmount
  useEffect(() => {
    return () => clearTimers()
  }, [clearTimers])

  return {
    isTransitioning,
    transitionToSection
  }
}
