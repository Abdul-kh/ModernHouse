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
    clients: "Clients",
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

    // Service Gallery Descriptions
    mirrorsDecorationsGalleryDesc: "Our custom mirrors and decorations service offers unparalleled craftsmanship in creating unique mirror designs for any space. From statement pieces that serve as focal points to subtle decorative accents that enhance ambiance, we specialize in unconventional mirror solutions that transform ordinary spaces into extraordinary experiences. Our artisans combine traditional techniques with modern innovations to create mirrors that are not just functional, but works of art that reflect your unique style and vision.",
    glassDecorationsGalleryDesc: "Our glass decorations service brings artistic vision to life through stunning glass creations. We specialize in custom glass pieces that add elegance, character, and sophistication to any interior or exterior space. From colored glass panels that play with light to intricate glass art installations, our team crafts each piece with meticulous attention to detail, ensuring that every creation is a perfect blend of beauty and functionality.",
    specialtyGlassGalleryDesc: "Our specialty glass service offers innovative solutions for unique design challenges. We work with colored glass, carved glass, and patterned glass to create distinctive features that set your space apart. Whether you're looking for bold statements or subtle accents, our specialty glass options provide endless possibilities for creative expression, allowing you to achieve truly personalized design outcomes.",
    showerMirrorsGalleryDesc: "Our shower mirrors and lighting service combines functionality with contemporary design to create stunning bathroom features. We specialize in modern shower mirrors with integrated LED lighting that provide perfect illumination while adding a touch of luxury to your daily routine. Our solutions are designed to withstand humid environments while maintaining their beauty and performance, ensuring that your bathroom becomes a sanctuary of style and comfort.",

    // Service Gallery UI
    service: "Service",
    showDetails: "Show details",
    hideDetails: "Hide",
    clickToViewGallery: "→ Click to view gallery",

    // Project Gallery UI
    closeGallery: "Close gallery",
    previousImage: "Previous image",
    nextImage: "Next image",
    thumbnail: "Thumbnail",
    showProjectDetails: "Show project details",
    hideProjectDetails: "Hide project details",

    // About
    aboutTitle: "Crafting excellence in glass & mirror services",
    aboutDescription:
      "Modern House specializes in providing premium glass and mirror services throughout the Middle East. We combine artistic vision with expert craftsmanship to create custom solutions that transform residential and commercial spaces.",
    premiumMirrorManufacturing: "Premium Mirror Manufacturing",
    engravedMirrorArtistry: "Engraved Mirror Artistry",
    engravedMirrorArtistryDesc: "Specializing in custom oriental mosaic engravings and decorative patterns on premium mirrors and glass surfaces.",
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
    commercialProject: "Commercial",
    residentialProject: "Residential",
    hospitalityProject: "Hospitality",
    project1: "Dubai Marina Tower",
    project1Desc: "A stunning commercial tower featuring floor-to-ceiling glass installations with custom mirror accents throughout the lobby and common areas.",
    project2: "Luxury Villa Collection",
    project2Desc: "Luxury villa collection featuring custom decorative mirrors, colored glass partitions, and LED-lit shower mirrors in master bathrooms.",
    project3: "Corporate Headquarters",
    project3Desc: "Corporate headquarters with carved glass features, patterned glass conference rooms, and artistic mirror installations.",
    project4: "Boutique Hotel",
    project4Desc: "Boutique hotel featuring unconventional mirror designs, colored glass art installations, and custom decorative glass throughout.",
    viewGallery: "View Gallery",

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

    // Clients
    clientsTitle: "Our Big Clients",
    clientsDescription: "Proudly serving leading companies, hotels, and facilities across the Middle East.",
    hospitalityClients: "Hospitality",
    commercialClients: "Commercial",
    residentialClients: "Residential",
    governmentClients: "Government",

    // Footer
    footerDescription: "Premium glass and mirror services for the Middle East.",
    architecturalGlass: "Architectural Glass",
    residentialSolutions: "Residential Solutions",
    customMirrors: "Custom Mirrors",
    servicesFooter: "Services",
    company: "Company",
    aboutUs: "About Us",
    careers: "Careers",
    legal: "Legal",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    warranty: "Warranty",
    allRightsReserved: "All rights reserved.",

  },
  ar: {
    // Header
    services: "الخدمات",
    about: "من نحن",
    projects: "المشاريع",
    clients: "العملاء",
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

    // Service Gallery Descriptions
    mirrorsDecorationsGalleryDesc: "خدمة المرايا والزخارف المخصصة لدينا تقدم حرفية لا مثيل في إنشاء تصاميم مرايا فريدة لأي مساحة. من القطع التي تخدم كنقاط محورية إلى الزخارف الدقيقة التي تعزز الأجواء، نتخصص في حلول المرايا غير التقليدية التي تحول المساحات العادية إلى تجارب استثنائية. يجمع حرفيوننا بين التقنيات التقليدية والابتكارات الحديثة لإنشاء مرايا ليست وظيفية فقط، بل أعمال فنية تعكس أسلوبك ورؤيتك الفريدة.",
    glassDecorationsGalleryDesc: "خدمة الزخارف الزجاجية لدينا تحقق الرؤية الفنية من خلال إبداعات زجاجية مذهلة. نتخصص في قطع زجاجية مخصصة تضيف الأناقة والطابع والرقي إلى أي مساحة داخلية أو خارجية. من ألواح الزجاج الملون التي تلعب بالضوء إلى تركيبات فنية زجاجية معقدة، يصنع فريقنا كل قطع باهتمام دقيق بالتفاصيل، مما يضمن أن كل إبداع هو مزيج مثالي من الجمال والوظيفة.",
    specialtyGlassGalleryDesc: "خدمة الزجاج المتخصص لدينا تقدم حلولاً مبتكرة لتحديات التصميم الفريدة. نعمل مع الزجاج الملون والمنحوت والمنقوش لإنشاء ميزات مميزة تميز مساحتك. سواء كنت تبحث عن بيانات جريئة أو لمسات خفية، توفر خيارات الزجاج المتخصص لدينا إمكانيات لا نهائية للتعبير الإبداعي، مما يسمح لك بتحقيق نتائج تصميمية شخصية حقاً.",
    showerMirrorsGalleryDesc: "خدمة مرايا الدش والإضاءة لدينا تجمع بين الوظيفة والتصميم المعاصر لإنشاء ميزات رائعة في الحمام. نتخصص في مرايا دش حديثة مع إضاءة LED متكاملة توفر إضاءة مثالية مع إضافة لمسة من الفخامة إلى روتينك اليومي. تم تصميم حلولنا لتحمل البيئات الرطبة مع الحفاظ على جمالها وأدائها، مما يضمن أن يصبح حمامك ملاذاً للأناقة والراحة.",

    // Service Gallery UI
    service: "خدمة",
    showDetails: "عرض التفاصيل",
    hideDetails: "إخفاء",
    clickToViewGallery: " ← اضغط لعرض المعرض ",

    // Project Gallery UI
    closeGallery: "إغلاق المعرض",
    previousImage: "الصورة السابقة",
    nextImage: "الصورة التالية",
    thumbnail: "صورة مصغرة",
    showProjectDetails: "عرض تفاصيل المشروع",
    hideProjectDetails: "إخفاء تفاصيل المشروع",

    // About
    aboutTitle: "صناعة التميز في خدمات الزجاج والمرايا",
    aboutDescription:
      "تتخصص مودرن هاوس في تقديم خدمات زجاج ومرايا فاخرة في جميع أنحاء الشرق الأوسط. نجمع بين الرؤية الفنية والحرفية الخبيرة لإنشاء حلول مخصصة تحول المساحات السكنية والتجارية.",
    premiumMirrorManufacturing: "تصنيع المرايا المتميز",
    engravedMirrorArtistry: "فن حفر المرايا",
    engravedMirrorArtistryDesc: "متخصصون في الزخارف الفسيفسائية الشرقية والأنماط الزخرفية على المرايا والأسطح الزجاجية الفاخرة.",
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
    commercialProject: "تجاري",
    residentialProject: "سكني",
    hospitalityProject: "ضيافة",
    project1: "برج دبي مارينا",
    project1Desc: "برج تجاري رائع يتميز بتركيبات زجاجية من الأرض إلى السقف مع لمسات مرايا مخصصة في جميع أنحاء الردهة والمناطق المشتركة.",
    project2: "مجموعة الفلل الفاخرة",
    project2Desc: "مجموعة فلل فاخرة تتميز بمرايا زخرفية مخصصة وأقسام زجاج ملون ومرايا دش بإضاءة LED في غرف النوم الرئيسية.",
    project3: "المقر الرئيسي للشركات",
    project3Desc: "المقر الرئيسي للشركات مع ميزات زجاج منحوت وقاعات اجتماعات زجاج منقوش وتركيبات مرايا فنية.",
    project4: "فندق بوتيك",
    project4Desc: "فندق بوتيك يتميز بتصاميم مرايا غير تقليدية وتركيبات فنية زجاج ملون وزخارف زجاجية مخصصة في جميع أنحائه.",
    viewGallery: "عرض المعرض",

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

    // Clients
    clientsTitle: "عملاؤنا الكبار",
    clientsDescription: "نفخر بخدمة الشركات الرائدة والفنادق والمنشآت في جميع أنحاء الشرق الأوسط.",
    hospitalityClients: "ضيافة",
    commercialClients: "تجاري",
    residentialClients: "سكني",
    governmentClients: "حكومي",

    // Footer
    footerDescription: "خدمات زجاج ومرايا فاخرة للشرق الأوسط.",
    architecturalGlass: "الزجاج المعماري",
    residentialSolutions: "حلول سكنية",
    customMirrors: "مرايا مخصصة",
    servicesFooter: "الخدمات",
    company: "الشركة",
    aboutUs: "من نحن",
    careers: "الوظائف",
    legal: "قانوني",
    privacyPolicy: "سياسة الخصوصية",
    termsOfService: "شروط الخدمة",
    warranty: "الضمان",
    allRightsReserved: "جميع الحقوق محفوظة.",

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
