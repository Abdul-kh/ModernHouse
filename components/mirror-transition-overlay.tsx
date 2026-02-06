"use client"

import { useEffect, useState, useMemo, useRef } from "react"

interface MirrorTransitionOverlayProps {
  isActive: boolean
  direction?: "up" | "down"
}

const COLS = 8
const ROWS = 6
const TOTAL = COLS * ROWS

// Inline SVG data URI for the mosaic engraving pattern (diamond + star motif)
const MOSAIC_PATTERN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Cg fill='none' stroke='rgba(255,255,255,0.18)' stroke-width='0.5'%3E%3Cpath d='M24 2L46 24L24 46L2 24Z'/%3E%3Cpath d='M24 10L38 24L24 38L10 24Z'/%3E%3Ccircle cx='24' cy='24' r='6'/%3E%3Ccircle cx='24' cy='24' r='2'/%3E%3Cpath d='M24 0v48M0 24h48'/%3E%3Cpath d='M0 0l48 48M48 0L0 48' opacity='0.4'/%3E%3C/g%3E%3C/svg%3E")`

export function MirrorTransitionOverlay({
  isActive,
  direction = "down",
}: MirrorTransitionOverlayProps) {
  const [visible, setVisible] = useState(false)
  const [transitionKey, setTransitionKey] = useState(0)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (isActive) {
      // Clear any pending unmount timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
      // Increment key to force grid remount (restarts all CSS animations)
      setTransitionKey((k) => k + 1)
      setVisible(true)
    } else {
      // Delay unmount so the fade-out is visible
      timeoutRef.current = setTimeout(() => {
        setVisible(false)
      }, 600)
    }
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
    }
  }, [isActive])

  const delays = useMemo(() => {
    const cx = (COLS - 1) / 2
    const cy = (ROWS - 1) / 2
    const maxDist = Math.sqrt(cx * cx + cy * cy)

    return Array.from({ length: TOTAL }, (_, i) => {
      const col = i % COLS
      const row = Math.floor(i / COLS)
      let delay: number
      if (direction === "up") {
        const d = Math.sqrt((col - cx) ** 2 + (row - cy) ** 2)
        delay = (d / maxDist) * 400
      } else {
        delay =
          (row / Math.max(ROWS - 1, 1)) * 350 +
          (Math.abs(col - cx) / cx) * 80
      }
      return Math.round(delay) + 150
    })
  }, [direction])

  if (!visible) return null

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9998,
        pointerEvents: "none",
      }}
    >
      <div
        key={transitionKey}
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${COLS}, 1fr)`,
          gridTemplateRows: `repeat(${ROWS}, 1fr)`,
          width: "100%",
          height: "100%",
          gap: 1,
        }}
      >
        {delays.map((delay, i) => (
          <div
            key={i}
            style={{
              position: "relative",
              overflow: "hidden",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              background: "rgba(15, 15, 20, 0.55)",
              boxShadow:
                "inset 0 0 0 1px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(0,0,0,0.2)",
              animation: `glassTileReveal 0.45s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms forwards`,
            }}
          >
            {/* Mirror mosaic engraving overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: MOSAIC_PATTERN,
                backgroundSize: "48px 48px",
                opacity: 0.7,
              }}
            />
            {/* Glass reflection shimmer */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.08) 45%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.08) 55%, transparent 70%)",
              }}
            />
            {/* Corner accent dots (mirror LED style) */}
            <div
              style={{
                position: "absolute",
                top: 3,
                left: 3,
                width: 3,
                height: 3,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.2)",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 3,
                right: 3,
                width: 3,
                height: 3,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.2)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 3,
                left: 3,
                width: 3,
                height: 3,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.2)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 3,
                right: 3,
                width: 3,
                height: 3,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.2)",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
