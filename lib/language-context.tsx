"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "en" | "ar"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = {
  en: {
    // Header
    services: "Services",
    about: "About",
    projects: "Projects",
    contact: "Contact",
    getQuote: "Get a Quote",

    // Hero
    heroKicker: "Mirrors • Etched Glass • Iraqi Craft",
    heroLocation: "Erbil, Iraq",
    heroTitle: "Handcrafted mirrors with decorative carving",
    heroDescription:
      "Elevate your space with custom mirrors and etched decorative glass inspired by oriental patterns. From statement mirrors to carved details and LED bathroom mirrors—crafted with precision and installed with care.",
    exploreWork: "Explore Our Work",
    requestConsultation: "Request Consultation",

    // Services
    servicesTitle: "Our specialized glass & mirror services",
    servicesDescription:
      "From custom designs to expert installation, we bring your vision to life with exceptional craftsmanship.",
    mirrorsDecorations: "Mirrors & Decorations",
    mirrorsDecorationsDesc:
      "Custom mirrors of all types including unconventional designs, decorative mirrors, and artistic installations for any space.",
    glassDecorations: "Glass & Decorations",
    glassDecorationsDesc:
      "Beautiful glass decorations and custom glass pieces that add elegance and character to your interiors.",
    specialtyGlass: "Specialty Glass",
    specialtyGlassDesc:
      "Colored glass, carved glass, and patterned glass solutions for unique and personalized design statements.",
    showerMirrors: "Shower Mirrors & Lighting",
    showerMirrorsDesc:
      "Modern shower mirrors with integrated LED lighting, combining functionality with contemporary design.",

    // About
    aboutTitle: "Crafting excellence in glass & mirror services",
    aboutDescription:
      "Modern House specializes in providing premium glass and mirror services throughout the Middle East. We combine artistic vision with expert craftsmanship to create custom solutions that transform residential and commercial spaces.",
    feature1: "Custom mirror designs & decorations",
    feature2: "Colored, carved & patterned glass",
    feature3: "Shower mirrors with LED lighting",
    feature4: "Expert installation services",
    feature5: "Unconventional mirror solutions",
    feature6: "Personalized design consultation",
    learnMore: "Learn More About Us",

    // Projects
    projectsTitle: "Featured projects",
    projectsDescription: "Explore our portfolio of exceptional glass and mirror installations across the Middle East.",
    commercial: "Commercial",
    residential: "Residential",
    hospitality: "Hospitality",
    project1: "Dubai Marina Tower",
    project2: "Luxury Villa Collection",
    project3: "Corporate Headquarters",
    project4: "Boutique Hotel",

    // Contact
    contactTitle: "Get in touch with us",
    contactDescription:
      "Connect with our team through your preferred channel. We're here to help with all your glass and mirror needs.",
    phone: "Phone",
    email: "Email",
    location: "Location",
    address: "Erbil, Iraq",
    followUs: "Follow Us",
    chatWhatsApp: "Chat on WhatsApp",

    // Footer
    footerDescription: "Premium glass and mirror services for the Middle East.",
    servicesFooter: "Services",
    company: "Company",
    aboutUs: "About Us",
    careers: "Careers",
    legal: "Legal",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    warranty: "Warranty",
    allRightsReserved: "All rights reserved.",

    // Reservation System
    bookConsultation: "Book a Consultation",
    consultationDescription: "Schedule a personalized consultation with our mirror and glass experts to discuss your project requirements.",
    scheduleConsultation: "Schedule Your Consultation",
    consultationType: "Service Type",
    selectConsultationType: "Choose your consultation service",
    generalConsultation: "Design Consultation",
    commercialProject: "Commercial Project",
    residentialProject: "Residential Project",
    customDesign: "Custom Mirror Design",
    selectDate: "Preferred Date",
    pickDate: "Choose your preferred date",
    selectTime: "Preferred Time",
    selectTimeSlot: "Choose your time slot",
    fullName: "Your Name",
    enterName: "Enter your full name",
    projectDetails: "Tell us about your mirror project",
    projectDescription: "Describe your vision: mirror styles, room dimensions, special requirements...",
    confirmBooking: "Schedule My Consultation",
    booking: "Booking...",
    bookingConfirmed: "Booking Confirmed!",
    bookingDetails: "We'll send you a confirmation email with all the details.",
    reservationEmail: "Email Address",
    reservationEmailPlaceholder: "your.email@example.com",
    reservationPhone: "Contact Number",
    reservationPhonePlaceholder: "+1 (555) 123-4567",
  },
  ar: {
    // Header
    services: "الخدمات",
    about: "من نحن",
    projects: "المشاريع",
    contact: "اتصل بنا",
    getQuote: "احصل على عرض سعر",

    // Hero
    heroKicker: "مرايا • زجاج محفور • حرفة عراقية",
    heroLocation: "أربيل، العراق",
    heroTitle: "حرفية زجاج ومرايا رائعة",
    heroDescription:
      "حوّل مساحاتك بمرايا مخصصة وزجاج زخرفي وحلول تصميم مبتكرة. متخصصون في زخارف المرايا والزجاج الملون والمنحوت والمنقوش ومرايا الدش مع إضاءة مدمجة.",
    exploreWork: "استكشف أعمالنا",
    requestConsultation: "اطلب استشارة",

    // Services
    servicesTitle: "خدماتنا المتخصصة في الزجاج والمرايا",
    servicesDescription: "من التصاميم المخصصة إلى التركيب الخبير، نحقق رؤيتك بحرفية استثنائية.",
    mirrorsDecorations: "المرايا والزخارف",
    mirrorsDecorationsDesc:
      "مرايا مخصصة من جميع الأنواع بما في ذلك التصاميم غير التقليدية والمرايا الزخرفية والتركيبات الفنية لأي مساحة.",
    glassDecorations: "الزجاج والزخارف",
    glassDecorationsDesc: "زخارف زجاجية جميلة وقطع زجاجية مخصصة تضيف الأناقة والطابع الخاص إلى ديكوراتك الداخلية.",
    specialtyGlass: "الزجاج المتخصص",
    specialtyGlassDesc: "حلول زجاجية ملونة ومنحوتة ومنقوشة لبيانات تصميم فريدة وشخصية.",
    showerMirrors: "مرايا الدش والإضاءة",
    showerMirrorsDesc: "مرايا دش حديثة مع إضاءة LED متكاملة، تجمع بين الوظيفة والتصميم المعاصر.",

    // About
    aboutTitle: "صناعة التميز في خدمات الزجاج والمرايا",
    aboutDescription:
      "تتخصص مودرن هاوس في تقديم خدمات زجاج ومرايا فاخرة في جميع أنحاء الشرق الأوسط. نجمع بين الرؤية الفنية والحرفية الخبيرة لإنشاء حلول مخصصة تحول المساحات السكنية والتجارية.",
    feature1: "تصاميم مرايا مخصصة وزخارف",
    feature2: "زجاج ملون ومنحوت ومنقوش",
    feature3: "مرايا دش مع إضاءة LED",
    feature4: "خدمات تركيب خبيرة",
    feature5: "حلول مرايا غير تقليدية",
    feature6: "استشارات تصميم شخصية",
    learnMore: "اعرف المزيد عنا",

    // Projects
    projectsTitle: "المشاريع المميزة",
    projectsDescription: "استكشف محفظتنا من تركيبات الزجاج والمرايا الاستثنائية في جميع أنحاء الشرق الأوسط.",
    commercial: "تجاري",
    residential: "سكني",
    hospitality: "ضيافة",
    project1: "برج دبي مارينا",
    project2: "مجموعة الفلل الفاخرة",
    project3: "المقر الرئيسي للشركات",
    project4: "فندق بوتيك",

    // Contact
    contactTitle: "تواصل معنا",
    contactDescription:
      "تواصل مع فريقنا عبر القناة المفضلة لديك. نحن هنا للمساعدة في جميع احتياجاتك من الزجاج والمرايا.",
    phone: "الهاتف",
    email: "البريد الإلكتروني",
    location: "الموقع",
    address: "أربيل، العراق",
    followUs: "تابعنا",
    chatWhatsApp: "تحدث على واتساب",

    // Footer
    footerDescription: "خدمات زجاج ومرايا فاخرة للشرق الأوسط.",
    servicesFooter: "الخدمات",
    company: "الشركة",
    aboutUs: "من نحن",
    careers: "الوظائف",
    legal: "قانوني",
    privacyPolicy: "سياسة الخصوصية",
    termsOfService: "شروط الخدمة",
    warranty: "الضمان",
    allRightsReserved: "جميع الحقوق محفوظة.",

    // Reservation System
    bookConsultation: "احجز استشارة",
    consultationDescription: "جدولة استشارة شخصية مع خبراء المرايا والزجاج لمناقشة متطلبات مشروعك.",
    scheduleConsultation: "جدولة استشارتك",
    consultationType: "نوع الخدمة",
    selectConsultationType: "اختر خدمة الاستشارة",
    generalConsultation: "استشارة تصميم",
    commercialProject: "مشروع تجاري",
    residentialProject: "مشروع سكني",
    customDesign: "تصميم مرآة مخصص",
    selectDate: "التاريخ المفضل",
    pickDate: "اختر تاريخك المفضل",
    selectTime: "الوقت المفضل",
    selectTimeSlot: "اختر الفترة الزمنية",
    fullName: "اسمك الكامل",
    enterName: "أدخل اسمك الكامل",
    projectDetails: "أخبرنا عن مشروع المرآة الخاص بك",
    projectDescription: "صف رؤيتك: أنماط المرايا، أبعاد الغرفة، متطلبات خاصة...",
    confirmBooking: "جدولة استشارتي",
    booking: "الحجز...",
    bookingConfirmed: "تم تأكيد الحجز!",
    bookingDetails: "سنرسل لك بريدًا إلكترونيًا للتأكيد مع جميع التفاصيل.",
    reservationEmail: "البريد الإلكتروني",
    reservationEmailPlaceholder: "your.email@example.com",
    reservationPhone: "رقم الاتصال",
    reservationPhonePlaceholder: "+971 50 123 4567",
  },
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    // Update document direction and lang attribute
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr"
    document.documentElement.lang = language
  }, [language])

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
