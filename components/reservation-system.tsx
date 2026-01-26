"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Clock, User, Mail, Phone, MessageSquare } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/language-context"

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
  "17:00", "17:30"
]

const consultationTypes = [
  "general",
  "commercial",
  "residential",
  "custom"
]

export function ReservationSystem() {
  const { t } = useLanguage()
  const [date, setDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState<string>()
  const [consultationType, setConsultationType] = useState<string>()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!date || !selectedTime || !consultationType) return

    setIsSubmitting(true)
    
    // Create booking data
    const bookingData = {
      id: Date.now().toString(),
      consultationType,
      date: format(date, "PPP"),
      time: selectedTime,
      customer: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone
      },
      projectDetails: formData.message,
      timestamp: new Date().toISOString()
    }
    
    // Log booking details (in production, this would be sent to your backend/email)
    console.log("🪞 NEW BOOKING RECEIVED:", bookingData)
    console.log("📧 Email notification would be sent to: admin@modernhouse.com")
    console.log("📱 SMS notification would be sent to: +97150XXXXXXXX")
    
    // Store in localStorage for demo purposes
    const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]')
    localStorage.setItem('bookings', JSON.stringify([...existingBookings, bookingData]))
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSuccess(true)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSuccess(false)
      setDate(undefined)
      setSelectedTime(undefined)
      setConsultationType(undefined)
      setFormData({ name: "", email: "", phone: "", message: "" })
    }, 3000)
  }

  const isFormValid = date && selectedTime && consultationType && 
                    formData.name && formData.email && formData.phone

  return (
    <section id="reservation" className="py-24 px-4 lg:px-8 bg-gradient-to-br from-primary/5 via-background to-primary/5">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6 text-balance">
              {t("bookConsultation") || "Book a Consultation"}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              {t("consultationDescription") || "Schedule a personalized consultation with our mirror and glass experts to discuss your project requirements."}
            </p>
          </div>

          <Card className="glass-card border-border/50 shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 border-b border-border/50">
              <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
                <CalendarIcon className="h-6 w-6 text-primary" />
                {t("scheduleConsultation") || "Schedule Your Consultation"}
              </CardTitle>
            </CardHeader>
            
            <CardContent className="p-8">
              {isSuccess ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CalendarIcon className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground mb-3">
                    {t("bookingConfirmed") || "Booking Confirmed!"}
                  </h3>
                  <p className="text-muted-foreground mb-2">
                    {t("bookingDetails") || "We'll send you a confirmation email with all the details."}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {format(date!, "PPP")} at {selectedTime}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Consultation Type */}
                  <div className="space-y-3">
                    <Label className="text-base font-medium flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      {t("consultationType") || "Service Type"}
                    </Label>
                    <Select value={consultationType} onValueChange={setConsultationType}>
                      <SelectTrigger className="glass-card border-border/50">
                        <SelectValue placeholder={t("selectConsultationType") || "Choose your consultation service"} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">{t("generalConsultation") || "Design Consultation"}</SelectItem>
                        <SelectItem value="commercial">{t("commercialProject") || "Commercial Project"}</SelectItem>
                        <SelectItem value="residential">{t("residentialProject") || "Residential Project"}</SelectItem>
                        <SelectItem value="custom">{t("customDesign") || "Custom Mirror Design"}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Date and Time Selection */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label className="text-base font-medium flex items-center gap-2">
                        <CalendarIcon className="h-4 w-4" />
                        {t("selectDate") || "Preferred Date"}
                      </Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal glass-card border-border/50 h-12",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : t("pickDate") || "Choose your preferred date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 glass-card border-border/50">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            disabled={(date) => 
                              date < new Date() || date < new Date(new Date().setDate(new Date().getDate() - 1))
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-base font-medium flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {t("selectTime") || "Preferred Time"}
                      </Label>
                      <Select value={selectedTime} onValueChange={setSelectedTime}>
                        <SelectTrigger className="glass-card border-border/50 h-12">
                          <SelectValue placeholder={t("selectTimeSlot") || "Choose your time slot"} />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Personal Information */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="name" className="text-base font-medium flex items-center gap-2">
                        <User className="h-4 w-4" />
                        {t("fullName") || "Your Name"}
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder={t("enterName") || "Enter your full name"}
                        className="glass-card border-border/50 h-12"
                        required
                      />
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="email" className="text-base font-medium flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        {t("reservationEmail") || "Email Address"}
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder={t("reservationEmailPlaceholder") || "your.email@example.com"}
                        className="glass-card border-border/50 h-12"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="phone" className="text-base font-medium flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      {t("reservationPhone") || "Contact Number"}
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder={t("reservationPhonePlaceholder") || "+1 (555) 123-4567"}
                      className="glass-card border-border/50 h-12"
                      required
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="message" className="text-base font-medium">
                      {t("projectDetails") || "Tell us about your mirror project"}
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder={t("projectDescription") || "Describe your vision: mirror styles, room dimensions, special requirements..."}
                      className="glass-card border-border/50 min-h-[120px] resize-none"
                      rows={4}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={!isFormValid || isSubmitting}
                    className="w-full h-14 text-lg font-medium shadow-lg hover:shadow-primary/25 transition-all"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        {t("booking") || "Booking..."}
                      </div>
                    ) : (
                      t("confirmBooking") || "Schedule My Consultation"
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
