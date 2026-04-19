"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useLanguage } from "@/lib/language-context"
import { cn } from "@/lib/utils"

const steps = [
  { title: "step1Title", body: "step1Body" as const },
  { title: "step2Title", body: "step2Body" as const },
  { title: "step3Title", body: "step3Body" as const },
  { title: "step4Title", body: "step4Body" as const },
  { title: "step5Title", body: "step5Body" as const },
] as const

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReduced(mq.matches)
    const fn = () => setReduced(mq.matches)
    mq.addEventListener("change", fn)
    return () => mq.removeEventListener("change", fn)
  }, [])
  return reduced
}

function GlassStepCard({
  step,
  index,
  hovered,
  onHover,
  reducedMotion,
}: {
  step: (typeof steps)[number]
  index: number
  hovered: number | null
  onHover: (i: number | null) => void
  reducedMotion: boolean
}) {
  const { t } = useLanguage()
  const showReflection = !reducedMotion && hovered === index
  const num = String(index + 1).padStart(2, "0")

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(index)}
      onBlur={() => onHover(null)}
      className={cn(
        "group relative overflow-hidden rounded-2xl p-6 shadow-xl backdrop-blur-md md:p-8",
        "border border-[rgba(255,220,120,0.28)] bg-white/[0.04] ring-1 ring-inset ring-white/[0.06]",
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent opacity-90"
        aria-hidden
      />
      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <p className="font-playfair-heading text-4xl font-semibold text-white/[0.14] transition group-hover:text-[color:var(--lux-gold)]/35 md:text-5xl">
            {num}
          </p>
          {showReflection ? (
            <p
              className="pointer-events-none font-playfair-heading text-4xl font-semibold text-white/[0.07] md:text-5xl"
              style={{
                transform: "scaleY(-1)",
                maskImage: "linear-gradient(to bottom, transparent, black 40%)",
                WebkitMaskImage: "linear-gradient(to bottom, transparent, black 40%)",
              }}
              aria-hidden
            >
              {num}
            </p>
          ) : null}
        </div>
        <h3 className="mt-1 font-playfair-heading text-xl font-semibold text-white">{t(step.title)}</h3>
        <p className="mt-3 text-sm leading-relaxed text-white/65">{t(step.body)}</p>
      </div>
    </motion.article>
  )
}

export function ProcessJourney() {
  const { t } = useLanguage()
  const reducedMotion = usePrefersReducedMotion()
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section
      id="process"
      className="relative overflow-hidden border-y border-white/[0.08] bg-[oklch(0.085_0.014_25)] py-24"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_95%_at_50%_-12%,rgba(255,255,255,0.05),transparent_58%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_-8%_102%,rgba(85,22,28,0.2),transparent_52%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_58%_at_108%_-8%,rgba(38,48,68,0.24),transparent_52%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(112deg,transparent_36%,rgba(255,220,120,0.045)_49.5%,transparent_63%)]" />
        <div className="absolute inset-0 opacity-[0.35] bg-[radial-gradient(ellipse_120%_42%_at_50%_100%,rgba(255,220,120,0.07),transparent_56%)]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 lg:px-8">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <div className="mb-4 flex justify-center">
            <span className="section-label">{t("processLabel")}</span>
          </div>
          <h2 className="section-heading-editorial mb-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
            {t("processTitle")}
          </h2>
          <p className="text-base leading-relaxed text-white/50">{t("processDescription")}</p>
        </div>

        <div className="relative ms-2 border-s-2 border-[rgba(255,220,120,0.35)] ps-6 lg:hidden">
          {steps.map((step, i) => (
            <div key={step.title} className="relative mb-10 last:mb-0">
              <span className="absolute -start-[calc(0.5rem+5px)] top-6 h-2.5 w-2.5 -translate-x-1/2 rounded-full border-2 border-[color:var(--lux-gold)] bg-[oklch(0.085_0.014_25)]" />
              <GlassStepCard
                step={step}
                index={i}
                hovered={hovered}
                onHover={setHovered}
                reducedMotion={reducedMotion}
              />
            </div>
          ))}
        </div>

        <div className="relative mx-auto hidden max-w-5xl lg:block">
          <div
            className="absolute bottom-0 start-1/2 top-0 z-0 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[rgba(255,220,120,0.65)] to-transparent shadow-[0_0_14px_rgba(255,220,120,0.35)]"
            aria-hidden
          />
          <div className="relative z-10 grid grid-cols-2 gap-x-10 gap-y-14">
            {steps.map((step, i) => (
              <div
                key={step.title}
                className={cn(
                  "flex w-full",
                  i % 2 === 0 ? "col-start-1 justify-end pe-4" : "col-start-2 justify-start ps-4",
                )}
              >
                <div className="w-full max-w-md">
                  <GlassStepCard
                    step={step}
                    index={i}
                    hovered={hovered}
                    onHover={setHovered}
                    reducedMotion={reducedMotion}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
