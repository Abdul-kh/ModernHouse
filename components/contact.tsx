"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MapPin } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"

export function Contact() {
  const { t } = useLanguage()
  const { toast } = useToast()

  const schema = z.object({
    name: z.string().min(2, { message: "Please enter your full name" }),
    email: z.string().email({ message: "Please enter a valid email" }),
    phone: z.string().optional(),
    message: z.string().min(10, { message: "Message must be at least 10 characters" }),
    agree: z.boolean().refine((v) => v === true, { message: "You must agree to the Privacy Policy" }),
  })

  type FormValues = z.infer<typeof schema>

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", phone: "", message: "", agree: false },
    mode: "onTouched",
  })

  const onSubmit = async (values: FormValues) => {
    await new Promise((r) => setTimeout(r, 400))
    toast({ title: "Message sent", description: "We will get back to you shortly." })
    form.reset()
  }

  return (
    <section id="contact" className="py-24 px-4 lg:px-8 relative overflow-hidden">
      <div className="container mx-auto relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6 text-balance">
            {t("contactTitle")}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">{t("contactDescription")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Phone */}
          <Card className="border-border hover:shadow-xl hover:border-primary/50 transition-all group bg-card/50 backdrop-blur-sm mirror-hover lux-mirror-frame">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors group-hover:scale-110 duration-300">
                  <Phone className="h-8 w-8 text-primary/90 group-hover:text-primary transition-colors" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-2 text-lg">{t("phone")}</h3>
                  <a
                    href="tel:+9647786897999"
                    dir="ltr"
                    className="text-muted-foreground hover:text-primary transition-colors font-medium inline-flex"
                  >
                    +964 778 689 7999
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Email */}
          <Card className="border-border hover:shadow-xl hover:border-primary/50 transition-all group bg-card/50 backdrop-blur-sm mirror-hover lux-mirror-frame">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors group-hover:scale-110 duration-300">
                  <Mail className="h-8 w-8 text-primary/90 group-hover:text-primary transition-colors" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-2 text-lg">{t("email")}</h3>
                  <a
                    href="mailto:info@modernhouse.com"
                    className="text-muted-foreground hover:text-primary transition-colors font-medium"
                  >
                    info@modernhouse.co
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location */}
          <Card className="border-border hover:shadow-xl hover:border-primary/50 transition-all group bg-card/50 backdrop-blur-sm md:col-span-2 lg:col-span-1 mirror-hover lux-mirror-frame">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors group-hover:scale-110 duration-300">
                  <MapPin className="h-8 w-8 text-primary/90 group-hover:text-primary transition-colors" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-2 text-lg">{t("location")}</h3>
                  <p className="text-muted-foreground font-medium">{t("address")}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 max-w-3xl mx-auto">
          <Card className="border-border shadow-xl bg-card/60 backdrop-blur-sm lux-mirror-frame">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-6 text-center">{t("contactTitle")}</h3>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} />
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
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="you@example.com" {...field} />
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
                        <FormLabel>Phone (optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="+964 ..." {...field} />
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
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea rows={6} placeholder="Tell us about your project..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="md:col-span-2 flex justify-center">
                    <Button type="submit" className="bg-primary text-white hover:bg-primary/90 px-8">
                      {t("requestConsultation")}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

      </div>
    </section>
  )
}
