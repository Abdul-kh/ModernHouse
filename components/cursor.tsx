"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 300 }
  const dotX = useSpring(cursorX, { damping: 40, stiffness: 500 })
  const dotY = useSpring(cursorY, { damping: 40, stiffness: 500 })
  const ringX = useSpring(cursorX, springConfig)
  const ringY = useSpring(cursorY, springConfig)

  useEffect(() => {
    const isTouchDevice = window.matchMedia("(hover: none)").matches
    if (isTouchDevice) return

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isInteractive =
        target.closest("a, button, [data-nav-link], [data-cursor-hover]") !== null
      setIsHovering(isInteractive)
    }

    window.addEventListener("mousemove", moveCursor)
    window.addEventListener("mouseover", handleMouseOver)

    return () => {
      window.removeEventListener("mousemove", moveCursor)
      window.removeEventListener("mouseover", handleMouseOver)
    }
  }, [cursorX, cursorY, isVisible])

  if (typeof window !== "undefined" && window.matchMedia("(hover: none)").matches) return null

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99999] mix-blend-difference"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHovering ? 48 : 32,
          height: isHovering ? 48 : 32,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
      >
        <div
          className="w-full h-full rounded-full border border-white"
          style={{ opacity: 0.7 }}
        />
      </motion.div>

      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[99999]"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: 6,
          height: 6,
          opacity: isVisible ? 1 : 0,
          backgroundColor: isHovering ? "rgb(255,220,120)" : "white",
        }}
        transition={{ duration: 0.15 }}
      />
    </>
  )
}
