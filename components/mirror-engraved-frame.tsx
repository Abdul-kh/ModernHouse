"use client"

import { useState, useId } from "react"
import { Lightbulb } from "lucide-react"

interface MirrorEngravedFrameProps {
  children: React.ReactNode
  className?: string
}

export function MirrorEngravedFrame({
  children,
  className = "",
}: MirrorEngravedFrameProps) {
  const [lightsOn, setLightsOn] = useState(true)
  const uid = useId().replace(/:/g, "")

  const w = 100
  const h = 140
  const bw = 12

  return (
    <div className={`mirror-frame-3d overflow-hidden relative ${className}`}>
      {/* Engraved decorations overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-[5]"
        style={{ borderRadius: "inherit" }}
      >
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox={`0 0 ${w} ${h}`}
          preserveAspectRatio="none"
        >
          <defs>
            <filter
              id={`ledGlow${uid}`}
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
            >
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter
              id={`ledGlowS${uid}`}
              x="-100%"
              y="-100%"
              width="300%"
              height="300%"
            >
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <pattern
              id={`tp${uid}`}
              x="0"
              y="0"
              width="24"
              height="24"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M12 0 L24 12 L12 24 L0 12 Z"
                fill="none"
                stroke="rgba(255,255,255,0.5)"
                strokeWidth="0.8"
              />
              <path
                d="M12 4 L20 12 L12 20 L4 12 Z"
                fill="none"
                stroke="rgba(255,255,255,0.35)"
                strokeWidth="0.6"
              />
              <circle
                cx="12"
                cy="12"
                r="2"
                fill="none"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="0.5"
              />
              <path
                d="M12 0 L12 24 M0 12 L24 12"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="0.3"
              />
            </pattern>

            <g id={`cl${uid}`}>
              <circle
                cx="0"
                cy="0"
                r="8"
                fill="none"
                stroke="rgba(255,255,255,0.6)"
                strokeWidth="1.2"
              />
              <circle cx="0" cy="0" r="4" fill="rgba(255,255,255,0.25)" />
              <path
                d="M0 -8 L0 8 M-8 0 L8 0"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="0.6"
              />
              <circle cx="0" cy="0" r="1.5" fill="rgba(255,255,255,0.8)" />
            </g>
          </defs>

          {/* Border strips with tile pattern */}
          <rect
            x="0"
            y="0"
            width={w}
            height={bw}
            fill={`url(#tp${uid})`}
            opacity={lightsOn ? 0.8 : 0.3}
            filter={lightsOn ? `url(#ledGlow${uid})` : undefined}
          />
          <rect
            x="0"
            y={h - bw}
            width={w}
            height={bw}
            fill={`url(#tp${uid})`}
            opacity={lightsOn ? 0.8 : 0.3}
            filter={lightsOn ? `url(#ledGlow${uid})` : undefined}
          />
          <rect
            x="0"
            y={bw}
            width={bw}
            height={h - 2 * bw}
            fill={`url(#tp${uid})`}
            opacity={lightsOn ? 0.8 : 0.3}
            filter={lightsOn ? `url(#ledGlow${uid})` : undefined}
          />
          <rect
            x={w - bw}
            y={bw}
            width={bw}
            height={h - 2 * bw}
            fill={`url(#tp${uid})`}
            opacity={lightsOn ? 0.8 : 0.3}
            filter={lightsOn ? `url(#ledGlow${uid})` : undefined}
          />

          {/* Inner decorative border lines */}
          <rect
            x={bw}
            y={bw}
            width={w - 2 * bw}
            height={h - 2 * bw}
            rx="10"
            fill="none"
            stroke="rgba(255,255,255,0.5)"
            strokeWidth="2"
            opacity={lightsOn ? 0.9 : 0.4}
            filter={lightsOn ? `url(#ledGlow${uid})` : undefined}
          />
          <rect
            x={bw + 4}
            y={bw + 4}
            width={w - 2 * bw - 8}
            height={h - 2 * bw - 8}
            rx="8"
            fill="none"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="1"
            opacity={lightsOn ? 0.7 : 0.25}
            filter={lightsOn ? `url(#ledGlow${uid})` : undefined}
          />

          {/* Corner LED accents */}
          <g opacity={lightsOn ? 1 : 0.5}>
            <g
              transform={`translate(${bw}, ${bw})`}
              filter={lightsOn ? `url(#ledGlowS${uid})` : undefined}
            >
              <use href={`#cl${uid}`} />
            </g>
            <g
              transform={`translate(${w - bw}, ${bw})`}
              filter={lightsOn ? `url(#ledGlowS${uid})` : undefined}
            >
              <use href={`#cl${uid}`} />
            </g>
            <g
              transform={`translate(${w - bw}, ${h - bw})`}
              filter={lightsOn ? `url(#ledGlowS${uid})` : undefined}
            >
              <use href={`#cl${uid}`} />
            </g>
            <g
              transform={`translate(${bw}, ${h - bw})`}
              filter={lightsOn ? `url(#ledGlowS${uid})` : undefined}
            >
              <use href={`#cl${uid}`} />
            </g>
          </g>

          {/* Side midpoint LEDs */}
          <g opacity={lightsOn ? 1 : 0.5}>
            <circle
              cx={w / 2}
              cy={bw * 0.4}
              r="4"
              fill="rgba(255,255,255,0.7)"
              filter={lightsOn ? `url(#ledGlowS${uid})` : undefined}
            />
            <circle
              cx={w / 2}
              cy={h - bw * 0.4}
              r="4"
              fill="rgba(255,255,255,0.7)"
              filter={lightsOn ? `url(#ledGlowS${uid})` : undefined}
            />
            <circle
              cx={bw * 0.4}
              cy={h / 2}
              r="4"
              fill="rgba(255,255,255,0.7)"
              filter={lightsOn ? `url(#ledGlowS${uid})` : undefined}
            />
            <circle
              cx={w - bw * 0.4}
              cy={h / 2}
              r="4"
              fill="rgba(255,255,255,0.7)"
              filter={lightsOn ? `url(#ledGlowS${uid})` : undefined}
            />
          </g>
        </svg>
      </div>

      {children}

      {/* Light toggle button */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          setLightsOn(!lightsOn)
        }}
        className={`engraved-light-button ${lightsOn ? "active" : ""}`}
        aria-label={lightsOn ? "Turn lights off" : "Turn lights on"}
      >
        <Lightbulb className="button-icon" />
      </button>
    </div>
  )
}
