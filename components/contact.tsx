"use client"

import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

export function Contact() {
  const { t } = useLanguage()
  const { toast } = useToast()
  const ref = useScrollReveal()

  const schema = z.object({
    name: z.string().min(2, { message: "Please enter your full name" }),
    email: z.string().email({ message: "Please enter a valid email" }),
    phone: z.string().optional(),
    message: z.string().min(10, { message: "Message must be at least 10 characters" }),
  })

  type FormValues = z.infer<typeof schema>

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", phone: "", message: "" },
    mode: "onTouched",
  })

  const onSubmit = async (values: FormValues) => {
    await new Promise((r) => setTimeout(r, 400))
    toast({ title: "Message sent", description: "We will get back to you shortly." })
    form.reset()
  }

  return (
    <section id="contact" className="py-24 px-4 lg:px-8 relative overflow-hidden bg-background" ref={ref as React.RefObject<HTMLDivElement>}>
      <div className="absolute inset-0 z-0" style={{ backgroundColor: 'oklch(0.12 0.01 0)' }}>
        <div className="absolute inset-0 damask-black opacity-20" />
      </div>
      <div className="mirror-divider absolute top-0 left-0 right-0" />

      <div className="container mx-auto relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16 reveal">
          <div className="flex justify-center mb-4">
            <span className="section-label">{t("contactLabel")}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-5 text-balance section-heading-editorial">
            {t("contactTitle")}
          </h2>
          <p className="text-base text-white/50 leading-relaxed">{t("contactDescription")}</p>
        </div>

        {/* Contact cards row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mb-16">
          {/* WhatsApp — prominent */}
          <a
            href="https://wa.me/9647503562547"
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-cta reveal lg:col-span-1 group flex flex-col items-center text-center gap-4 p-6 rounded-2xl transition-all duration-300 hover:scale-[1.02] cursor-pointer"
          >
            <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ background: 'rgba(37,211,102,0.12)', border: '1px solid rgba(37,211,102,0.25)' }}>
              <MessageCircle className="h-7 w-7" style={{ color: 'rgb(37,211,102)' }} />
            </div>
            <div>
              <h3 className="font-bold text-white text-base mb-1">WhatsApp</h3>
              <p className="text-white/45 text-xs">{t("chatWhatsApp")}</p>
            </div>
          </a>

          {/* Phone */}
          <Card className="reveal reveal-delay-1 border-white/[0.07] hover:border-white/15 transition-all group bg-white/[0.025] backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center group-hover:border-primary/30 transition-colors">
                  <Phone className="h-5 w-5 text-white/50 group-hover:text-primary transition-colors" />
                </div>
                <div>
                  <h3 className="font-semibold text-white/80 text-sm mb-2">{t("phone")}</h3>
                  <a href="tel:+9647503562547" dir="ltr" className="text-white/45 hover:text-primary transition-colors text-xs block">+964 750 356 2547</a>
                  <a href="tel:+9647786897999" dir="ltr" className="text-white/45 hover:text-primary transition-colors text-xs block mt-1">+964 778 689 7999</a>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Email */}
          <Card className="reveal reveal-delay-2 border-white/[0.07] hover:border-white/15 transition-all group bg-white/[0.025] backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center group-hover:border-primary/30 transition-colors">
                  <Mail className="h-5 w-5 text-white/50 group-hover:text-primary transition-colors" />
                </div>
                <div>
                  <h3 className="font-semibold text-white/80 text-sm mb-2">{t("email")}</h3>
                  <a href="mailto:info@modernhouse.com" className="text-white/45 hover:text-primary transition-colors text-xs">info@modernhouse.com</a>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location */}
          <Card className="reveal reveal-delay-3 border-white/[0.07] hover:border-white/15 transition-all group bg-white/[0.025] backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center group-hover:border-primary/30 transition-colors">
                  <MapPin className="h-5 w-5 text-white/50 group-hover:text-primary transition-colors" />
                </div>
                <div>
                  <h3 className="font-semibold text-white/80 text-sm mb-2">{t("location")}</h3>
                  <p className="text-white/45 text-xs">{t("address")}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact form */}
        <div className="max-w-3xl mx-auto reveal reveal-delay-2">
          <div className="glass-card rounded-3xl p-8 border border-white/10">
            <div className="text-center mb-8">
              <h3 className="text-xl font-bold text-white font-playfair-heading">{t("requestConsultation")}</h3>
              <div className="mirror-divider mt-4 opacity-50" />
            </div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] uppercase tracking-[0.18em] text-white/40 font-semibold">Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} className="bg-white/[0.03] border-white/10 text-white placeholder:text-white/20 focus:border-white/25" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] uppercase tracking-[0.18em] text-white/40 font-semibold">Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="you@example.com" {...field} className="bg-white/[0.03] border-white/10 text-white placeholder:text-white/20 focus:border-white/25" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel className="text-[10px] uppercase tracking-[0.18em] text-white/40 font-semibold">Phone (optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="+964 ..." {...field} className="bg-white/[0.03] border-white/10 text-white placeholder:text-white/20 focus:border-white/25" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel className="text-[10px] uppercase tracking-[0.18em] text-white/40 font-semibold">Message</FormLabel>
                      <FormControl>
                        <Textarea rows={5} placeholder="Tell us about your project..." {...field} className="bg-white/[0.03] border-white/10 text-white placeholder:text-white/20 focus:border-white/25 resize-none" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="md:col-span-2 flex justify-center pt-2">
                  <Button type="submit" className="bg-white text-black hover:bg-white/90 px-10 py-3 font-semibold tracking-wide text-sm">
                    {t("requestConsultation")}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  )
}
