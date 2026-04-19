"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { MapPin, Phone, Mail, MessageCircle, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/lib/language-context"

export function Contact() {
  const { t } = useLanguage()
  const { toast } = useToast()
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const [submitting, setSubmitting] = useState(false)

  const schema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().optional(),
    message: z.string().min(10),
  })
  type FormValues = z.infer<typeof schema>

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", phone: "", message: "" },
  })

  const onSubmit = async (values: FormValues) => {
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 600))
    setSubmitting(false)
    toast({ title: "Message sent", description: "We will get back to you shortly." })
    reset()
  }

  const contactItems = [
    { icon: MessageCircle, label: "WhatsApp", value: t("chatWhatsApp"), href: "https://wa.me/9647503562547", color: "rgb(37,211,102)" },
    { icon: Phone, label: t("phone"), value: "+964 750 356 2547", href: "tel:+9647503562547", color: "var(--lux-gold)" },
    { icon: Mail, label: t("email"), value: "info@modernhouse.com", href: "mailto:info@modernhouse.com", color: "var(--lux-gold)" },
    { icon: MapPin, label: t("location"), value: t("address"), href: undefined, color: "var(--lux-gold)" },
  ]

  return (
    <section id="contact" ref={ref} className="py-24 relative overflow-hidden section-bg-2">
      <div className="absolute inset-0 damask-black opacity-12 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,220,120,0.2), transparent)" }} />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center mb-14"
        >
          <div className="flex justify-center mb-4"><span className="section-label">{t("contactLabel")}</span></div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4 section-heading-editorial">{t("contactTitle")}</h2>
          <p className="text-base text-white/45 leading-relaxed">{t("contactDescription")}</p>
        </motion.div>

        {/* 2-column split */}
        <div className="grid lg:grid-cols-[5fr_7fr] gap-10 lg:gap-16 max-w-6xl mx-auto">

          {/* LEFT — decorative panel with contact details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="relative rounded-2xl overflow-hidden"
            style={{ minHeight: "460px" }}
          >
            <img
              src="/modern-luxury-mirror-installation-in-elegant-inter.jpg"
              alt="Contact Modern House"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, rgba(5,5,5,0.55) 0%, rgba(5,5,5,0.85) 100%)" }} />

            <div className="relative z-10 p-8 h-full flex flex-col justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] mb-2" style={{ color: "var(--lux-gold)" }}>{t("contactLabel")}</p>
                <h3 className="text-2xl font-bold text-white font-playfair-heading mb-6">{t("contactTitle")}</h3>
              </div>
              <div className="space-y-5">
                {contactItems.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
                      <item.icon className="h-4 w-4" style={{ color: item.color }} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-white/35 mb-0.5">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined}
                          rel="noopener noreferrer" className="text-sm text-white/75 hover:text-white transition-colors">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm text-white/75">{item.value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT — form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-[10px] uppercase tracking-[0.18em] text-white/40 font-semibold block mb-2">Name</label>
                  <input
                    {...register("name")}
                    placeholder="Your name"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors"
                  />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-[0.18em] text-white/40 font-semibold block mb-2">Email</label>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="you@example.com"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors"
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                </div>
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-[0.18em] text-white/40 font-semibold block mb-2">Phone (optional)</label>
                <input
                  {...register("phone")}
                  placeholder="+964 ..."
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-[0.18em] text-white/40 font-semibold block mb-2">Message</label>
                <textarea
                  {...register("message")}
                  rows={5}
                  placeholder="Tell us about your project..."
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors resize-none"
                />
                {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
              </div>
              <Button
                type="submit"
                disabled={submitting}
                className="w-full py-6 text-sm font-semibold tracking-wide transition-all"
                style={{ background: "var(--lux-gold)", color: "#0a0a0a" }}
              >
                {submitting ? "Sending..." : (
                  <span className="flex items-center gap-2 justify-center">
                    {t("requestConsultation")} <Send className="h-4 w-4" />
                  </span>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
