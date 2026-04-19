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
    openMenu: "Open menu",
    closeMenu: "Close menu",
    process: "Process",

    // Process journey
    processLabel: "How we work",
    processTitle: "From sketch to the wall — without guesswork",
    processDescription:
      "Five deliberate stages: align the design with your space, fabricate and finish in Erbil, protect every edge in transit, then install and verify under real light.",
    step1Title: "Consultation & survey",
    step1Body:
      "Intent, site measurements, and material direction — locked to your lighting plan and architecture before anything is cut.",
    step2Title: "Workshop fabrication",
    step2Body: "Cutting, carving, and core finishing in our Erbil workshop with QC at each handoff.",
    step3Title: "Finishing & protection",
    step3Body: "Edges, engraving, polish, and protective prep so the piece travels clean and arrives ready.",
    step4Title: "Installation",
    step4Body: "Leveling, sealing, and checks in the room’s actual light — not a rushed fit-and-forget.",
    step5Title: "Aftercare",
    step5Body: "Straightforward guidance on care, humidity, and keeping the reflection crisp for years.",

    // Hero
    heroKicker: "Mirrors • Etched Glass • Iraqi Craft",
    heroLocation: "Erbil, Iraq",
    heroLabel: "Est. Erbil, Iraq · Since 2009",
    heroTitleLine1: "Mirrors That",
    heroTitleLine2: "Define Spaces",
    heroTitle: "Handcrafted mirrors with decorative carving",
    heroDescription:
      "Custom mirrors, carved glass & LED lighting — crafted by artisans in Erbil. Every piece is a statement, every installation a signature.",
    exploreWork: "Explore Our Work",
    requestConsultation: "Request Consultation",

    // Services
    servicesLabel: "What We Do",
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

    // Stats
    statYearsNum: "15",
    statYearsLabel: "Years in Erbil",
    statProjectsNum: "500",
    statProjectsLabel: "Projects Completed",
    statClientsNum: "50",
    statClientsLabel: "Premium Clients",
    statServicesNum: "4",
    statServicesLabel: "Service Categories",

    // About
    aboutLabel: "Our Story",
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
    projectsLabel: "Our Portfolio",
    projectsTitle: "Featured projects",
    projectsDescription: "Explore our portfolio of exceptional glass and mirror installations across the Middle East.",
    commercialProject: "Commercial",
    residentialProject: "Residential",
    hospitalityProject: "Hospitality",
    project1: "Rotana Hotel Erbil",
    project1Desc: "Full-service mirror and glass installation across guest rooms, lobby corridors, and spa facilities at Rotana Hotel Erbil — featuring engraved decorative panels and LED bathroom mirrors.",
    project2: "Dream City Residences",
    project2Desc: "Bespoke decorative mirrors, colored glass partitions, and LED-lit shower mirrors for premium villas in Dream City, Erbil's leading residential compound.",
    project3: "Family Mall Erbil",
    project3Desc: "Large-scale architectural glass and carved decorative mirror installations throughout the mall's public areas, elevators, and branded retail spaces.",
    project4: "Kurdistan Government Complex",
    project4Desc: "Premium glass and mirror installations for official reception halls and corridors, combining oriental engraving motifs with modern LED lighting.",
    viewGallery: "View Gallery",

    // Testimonial
    testimonialLabel: "Client Stories",
    testimonialQuote: "Modern House transformed our hotel lobby into something extraordinary. The engraved mirror panels they crafted are unlike anything we have seen — guests photograph them every day. The attention to detail and the quality of installation was truly exceptional.",
    testimonialAuthor: "General Manager",
    testimonialCompany: "Rotana Hotel Erbil",
    testimonialQuote2: "We commissioned custom shower mirrors with LED frames for our entire villa project. The craftsmanship exceeded every expectation. Every single piece was delivered on time and installed with absolute precision.",
    testimonialAuthor2: "Project Director",
    testimonialCompany2: "Dream City Erbil",
    testimonialQuote3: "The carved glass panels Modern House delivered for our mall's entrance are a statement piece — visitors stop and admire them daily. Outstanding quality and a team that truly understands luxury interiors.",
    testimonialAuthor3: "Facilities Manager",
    testimonialCompany3: "Family Mall Erbil",

    // Contact
    contactLabel: "Get In Touch",
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
    clientsLabel: "Trusted By Leaders",
    clientsTitle: "Our Big Clients",
    clientsDescription: "Proudly serving leading companies, hotels, and facilities across the Middle East.",
    hospitalityClients: "Hospitality",
    commercialClients: "Commercial",
    residentialClients: "Residential",
    governmentClients: "Government",

    // Footer
    footerTagline: "Crafting reflections since 2009 · Erbil, Iraq",
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
    openMenu: "فتح القائمة",
    closeMenu: "إغلاق القائمة",
    process: "الآلية",

    // Process journey
    processLabel: "كيف نعمل",
    processTitle: "من الرسمة إلى الجدار — بخطوات واضحة",
    processDescription:
      "خمس مراحل متعمدة: مواءمة التصميم مع المساحة، التصنيع والتشطيب في أربيل، حماية كل حافة أثناء النقل، ثم التركيب والتحقق تحت الضوء الحقيقي.",
    step1Title: "استشارة ومعاينة",
    step1Body:
      "الهدف، القياسات، واتجاه المواد — مربوطة بمخطط الإضاءة والعمارة قبل أي قص.",
    step2Title: "تصنيع في الورشة",
    step2Body: "القص والحفر والتشطيب الأساسي في أربيل مع مراقبة جودة عند كل تسليم.",
    step3Title: "تشطيب وحماية",
    step3Body: "الحواف والحفر واللمعان والتجهيز الواقي حتى تصل القطعة نظيفة وجاهزة.",
    step4Title: "تركيب",
    step4Body: "التسوية والعزل والفحص في إضاءة الغرفة الفعلية — لا تركيب عابر.",
    step5Title: "متابعة",
    step5Body: "إرشادات بسيطة للعناية والرطوبة وحفظ وضوح الانعكاس لسنوات.",

    // Hero
    heroKicker: "مرايا • زجاج محفور • حرفة عراقية",
    heroLocation: "أربيل، العراق",
    heroLabel: "تأسست في أربيل · منذ 2009",
    heroTitleLine1: "مرايا تُعرِّف",
    heroTitleLine2: "المساحات",
    heroTitle: "حرفية زجاج ومرايا رائعة",
    heroDescription:
      "مرايا مخصصة، زجاج محفور وإضاءة LED — مصنوعة بيد الحرفيين في أربيل. كل قطعة بيان، كل تركيب توقيع.",
    exploreWork: "استكشف أعمالنا",
    requestConsultation: "اطلب استشارة",

    // Services
    servicesLabel: "ما نقدمه",
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

    // Stats
    statYearsNum: "15",
    statYearsLabel: "سنة في أربيل",
    statProjectsNum: "500",
    statProjectsLabel: "مشروع منجز",
    statClientsNum: "50",
    statClientsLabel: "عميل متميز",
    statServicesNum: "4",
    statServicesLabel: "تخصصات خدمية",

    // About
    aboutLabel: "قصتنا",
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
    projectsLabel: "معرض أعمالنا",
    projectsTitle: "المشاريع المميزة",
    projectsDescription: "استكشف محفظتنا من تركيبات الزجاج والمرايا الاستثنائية في جميع أنحاء الشرق الأوسط.",
    commercialProject: "تجاري",
    residentialProject: "سكني",
    hospitalityProject: "ضيافة",
    project1: "فندق روتانا أربيل",
    project1Desc: "تركيب شامل للمرايا والزجاج في غرف النزلاء والممرات والمنتجع الصحي بفندق روتانا أربيل — يتضمن ألواحاً زخرفية محفورة ومرايا حمام بإضاءة LED.",
    project2: "مساكن دريم سيتي",
    project2Desc: "مرايا زخرفية مخصصة وأقسام زجاج ملون ومرايا دش بإضاءة LED لفلل فاخرة في دريم سيتي، المجمع السكني الرائد في أربيل.",
    project3: "فاميلي مول أربيل",
    project3Desc: "تركيبات زجاجية معمارية واسعة النطاق ومرايا زخرفية منحوتة في جميع أنحاء المول.",
    project4: "مجمع الحكومة الكردستانية",
    project4Desc: "تركيبات زجاج ومرايا فاخرة لقاعات الاستقبال الرسمية والممرات، تجمع بين الزخارف الشرقية المنقوشة والإضاءة LED الحديثة.",
    viewGallery: "عرض المعرض",

    // Testimonial
    testimonialLabel: "قصص العملاء",
    testimonialQuote: "حوّلت مودرن هاوس ردهة فندقنا إلى شيء استثنائي. ألواح المرايا المحفورة التي صنعوها لم نرَ مثيلها من قبل — الضيوف يصورونها كل يوم. كان الاهتمام بالتفاصيل وجودة التركيب استثنائيين حقاً.",
    testimonialAuthor: "المدير العام",
    testimonialCompany: "فندق روتانا أربيل",
    testimonialQuote2: "طلبنا مرايا حمام مخصصة بإطارات LED لمشروع الفيلا بأكمله. تجاوزت الحرفية كل توقعاتنا. سُلّمت كل قطعة في الوقت المحدد وركّبت بدقة مطلقة.",
    testimonialAuthor2: "مدير المشروع",
    testimonialCompany2: "مدينة الحلم أربيل",
    testimonialQuote3: "ألواح الزجاج المنحوت التي قدّمتها مودرن هاوس لمدخل مولّنا قطعة فنية رائعة — يتوقف الزوار لإعجابهم بها يومياً. جودة استثنائية وفريق يفهم معنى الفخامة حقاً.",
    testimonialAuthor3: "مدير المرافق",
    testimonialCompany3: "فاميلي مول أربيل",

    // Contact
    contactLabel: "تواصل معنا",
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
    clientsLabel: "موثوق به من قِبل الرواد",
    clientsTitle: "عملاؤنا الكبار",
    clientsDescription: "نفخر بخدمة الشركات الرائدة والفنادق والمنشآت في جميع أنحاء الشرق الأوسط.",
    hospitalityClients: "ضيافة",
    commercialClients: "تجاري",
    residentialClients: "سكني",
    governmentClients: "حكومي",

    // Footer
    footerTagline: "نصنع الانعكاسات منذ 2009 · أربيل، العراق",
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
