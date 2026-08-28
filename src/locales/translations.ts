import { siteConfig } from "@/config/site";

export type TranslationKeys = typeof translations.en;

export const translations = {
  en: {
    nav: {
      brand: siteConfig.brandName.toUpperCase(),
      home: "Home",
      services: "Services",
      materials: "Materials",
      gallery: "Gallery",
      about: "About",
      contact: "Contact",
    },
    hero: {
      tagline: "Designed for Living",
      title1: "A Frame",
      title2: "for Human Life",
      subtitle: "Bespoke home personalization, organic corporate workspaces, and architectural outdoor netting systems. Crafted with visceral materiality and absolute integrity.",
      ctaPrimary: "View Projects",
      ctaSecondary: "Request Consultation",
      experience: "Fixed-Scope Quotes",
      completed: "In-House Fabrication",
      satisfied: "One Project Lead",
    },
    services: {
      title: "Our Collections",
      subtitle: "Human-centric spaces crafted for living and working. Timeless designs, tactile materials, and precision engineering.",
      residential: {
        title: "Home Personalization",
        subtitle: "Spaces designed for emotional resonance and life",
        kitchen: {
          name: "Tailored Modular Kitchens",
          desc: "Warm wooden configurations, organic quartz surfaces, and soft-closing architectural cabinetry tailored to your daily cooking rituals."
        },
        wardrobe: {
          name: "Bespoke Wardrobes & Dressing Rooms",
          desc: "Custom floor-to-ceiling wooden wardrobes featuring fluted glass doors, natural inner linen lining, and automated warm LED lighting."
        },
        living: {
          name: "Warm Living & Lounge Spaces",
          desc: "Bespoke media units, integrated bookcases, and custom wall panels merging plaster textures with teak wood finishes."
        },
        ceiling: {
          name: "Suspended Ceilings & Lighting",
          desc: "Subtle layered plaster boards with indirect gold lighting profiles designed to follow natural circadian rhythms."
        }
      },
      commercial: {
        title: "Workspaces & Offices",
        subtitle: "Environments fostering productivity and human connection",
        partitions: {
          name: "Acoustic Glass Partitions",
          desc: "High-grade acoustic double-glazed partitions and Minimalist bronze frames offering open sightlines with absolute sound insulation."
        },
        conference: {
          name: "Meeting Lounges & Boardrooms",
          desc: "Bespoke conference tables with integrated smart connectivity, clean veneer structures, and acoustic wall panels."
        },
        workstations: {
          name: "Bespoke Workstations",
          desc: "Ergonomic workspace layouts incorporating organic wooden desks, concealed cabling, and natural greenery dividers."
        },
        reception: {
          name: "Lobby & Reception Facades",
          desc: "Stunning corporate entryways featuring textured stone backdrops, polished brass logo plates, and architectural accent lighting."
        }
      },
      outdoor: {
        title: "Exteriors & Safety",
        subtitle: "Architectural durability and outdoor protection",
        cladding: {
          name: "HPL & Timber Wall Cladding",
          desc: "High-durability wood composite finishes and HPL wall panels protecting facades against heavy tropical weathering."
        },
        glazing: {
          name: "Structural Glass Glazing",
          desc: "Impact-resistant frameless glass envelopes designed for thermal insulation and high transparency."
        },
        nets: {
          name: "Balcony Safety Netting",
          desc: "High-tensile monofilament safety grids and invisible bird-control screens designed to secure spaces without blocking views."
        },
        pergola: {
          name: "Custom Timber Pergolas",
          desc: "Treated wooden outdoor gazebos, composite wood decks, and weather-proof tensile shade integrations."
        }
      }
    },
    materials: {
      title: "Tactile Materials",
      subtitle: "Authentic, raw, and high-durability surfaces selected for their sensory appeal and structural longevity.",
      wood: {
        title: "Burma Teak & Natural Veneers",
        desc: "Handpicked timber panels, fluted wood louvers, and borer-proof veneers polished with low-VOC matte PU coatings to highlight natural grains.",
        spec1: "Borer & Termite Proof Warranty",
        spec2: "Timeless Low-VOC Matte PU Polish",
        spec3: "Sustainably Harvested Hardwood"
      },
      glass: {
        title: "Architectural Textured Glass",
        desc: "Sound-dampening fluted panes, bronze-tinted glass panels, and heavy toughened structural plates ensuring safety and visual elegance.",
        spec1: "Up to 42dB Sound Attenuation",
        spec2: "Toughened Safety Certification",
        spec3: "Fluted, Frosted & Smoked Finishes"
      },
      finishing: {
        title: "Plaster & Mineral Finishes",
        desc: "Tactile lime plasters, stone composite laminates, seamless edge-bandings, and anti-fingerprint acrylic panels.",
        spec1: "Zero-Joint Pur Edgebanding",
        spec2: "Scratch-Resistant Acrylic Sheets",
        spec3: "Tactile Plaster Coatings"
      },
      nets: {
        title: "High-Tensile Outdoor Safety Nets",
        desc: "UV-stabilized HDPE copolymer safety nets and marine-grade stainless steel cables built to withstand severe wind and sun exposure.",
        spec1: "15-Year UV Stability Guarantee",
        spec2: "High Load-Bearing Capacity",
        spec3: "Invisible Micro-Mesh Construction"
      }
    },
    gallery: {
      title: "Masterpieces",
      subtitle: "A curated journal of completed residential homes, modern office environments, and material integrations.",
      filterAll: "All Collections",
      filterInteriors: "Residential",
      filterExteriors: "Workspaces",
      filterMaterials: "Outdoor & Safety",
      viewProject: "View Case Study",
    },
    about: {
      title: "About Narviya Designers",
      desc1: "Narvia Design is an architectural design house built on human-centric principles. We believe design should be a silent frame for daily life — enhancing how you live, work, and interact, built in wood and glass on your budget and your timeline.",
      desc2: "Our core expertise lies in merging high-end wood finishing, acoustic glass partition structures, custom residential layouts, and high-strength outdoor safety solutions into seamless, living spaces.",
      mission: "Crafting atmospheric, balanced environments that respect materials, durability, and human well-being.",
    },
    contact: {
      title: "Let's Design Together",
      subtitle: "Tell us about your home personalization plans or office layout project. Get a complete custom estimate.",
      name: "Your Name",
      phone: "Phone Number",
      email: "Email Address",
      message: "How can we help? (e.g. Living room styling, safety nets, office partitions...)",
      submit: "Send Design Brief",
      success: "Thank you! Our design director will review your brief and contact you within 24 hours.",
      addressTitle: "Studio Address",
      addressValue: "12th Cross, Sector 7, HSR Layout, Bengaluru, Karnataka - 560102",
      phoneTitle: "Call Directory",
      emailTitle: "Inquiries",
    },
    callback: {
      title: "Free Callback Request",
      subtitle: "Enter your email to schedule a quick callback with our chief designer. Zero charges, zero hassle.",
      emailPlaceholder: "Enter your email address",
      button: "Request Free Call",
      submitting: "Requesting...",
      success: "Callback registered! We will call you shortly.",
      rateLimit: "You have already requested a callback. Please wait a few minutes.",
      spamBlock: "Spam block triggered. Please try again.",
    },
    card: {
      tagline: "Official Credentials",
      title: "Digital Visiting Card",
      subtitle: "Save or download our official studio visiting card. View direct contacts, studio location, and consultation channels.",
      flipPrompt: "Tap card to flip front & back",
      frontLabel: "Front Side",
      backLabel: "Back Side",
      flipButton: "Flip Card",
      downloadPdf: "Download PDF Card",
      downloading: "Preparing PDF...",
      printCard: "Print / Save PDF",
      copied: "Copied to clipboard!",
      copyPhone: "Copy Phone",
      copyEmail: "Copy Email",
      openMap: "Studio Location",
      dimensions: "Standard 3.5\" × 2\" (Print-Ready)",
    }
  },
  kn: {
    nav: {
      brand: siteConfig.brandName.toUpperCase(), // TODO: swap for a confirmed Kannada transliteration if the client wants one
      home: "ಮುಖಪುಟ",
      services: "ಸೇವೆಗಳು",
      materials: "ವಸ್ತುಗಳು",
      gallery: "ಗ್ಯಾಲರಿ",
      about: "ನಮ್ಮ ಬಗ್ಗೆ",
      contact: "ಸಂಪರ್ಕಿಸಿ",
    },
    hero: {
      tagline: "ಬಾಳಿಕೆಗೆ ತಕ್ಕ ವಿನ್ಯಾಸ",
      title1: "ಮಾನವ ಜೀವನಕ್ಕೆ",
      title2: "ಅತ್ಯುತ್ತಮ ಆಸರೆ",
      subtitle: "ನಿಮ್ಮ ಮನೆಯ ವೈಯಕ್ತಿಕ ವಿನ್ಯಾಸ, ಕಚೇರಿಗಳ ವಿನ್ಯಾಸಗಳು ಮತ್ತು ಹೊರಾಂಗಣ ಸುರಕ್ಷತಾ ಜಾಲಗಳ ವ್ಯವಸ್ಥೆ. ಸೌಂದರ್ಯ ಮತ್ತು ನಂಬಿಕಸ್ಥ ಗುಣಮಟ್ಟದೊಂದಿಗೆ.",
      ctaPrimary: "ಯೋಜನೆಗಳನ್ನು ನೋಡಿ",
      ctaSecondary: "ಸಮಾಲೋಚನೆ ವಿನಂತಿ",
      experience: "ಸ್ಥಿರ-ಬೆಲೆ ಉಲ್ಲೇಖಗಳು",
      completed: "ಸ್ವಂತ ನಿರ್ಮಾಣ",
      satisfied: "ಒಬ್ಬ ಯೋಜನಾ ಮುಖಂಡ",
    },
    services: {
      title: "ನಮ್ಮ ಶ್ರೇಣಿಗಳು",
      subtitle: "ವಾಸಿಸಲು ಮತ್ತು ಕೆಲಸ ಮಾಡಲು ಯೋಗ್ಯವಾದ ಮಾನವ-ಕೇಂದ್ರಿತ ತಾಣಗಳು. ಸುಂದರ ವಿನ್ಯಾಸಗಳು, ಉತ್ತಮ ವಸ್ತುಗಳು ಮತ್ತು ಅತ್ಯುತ್ತಮ ತಂತ್ರಜ್ಞಾನ.",
      residential: {
        title: "ಮನೆ ವೈಯಕ್ತೀಕರಣ (Residential)",
        subtitle: "ನೆಮ್ಮದಿಯ ಮತ್ತು ಸಂತೋಷದ ಜೀವನಕ್ಕಾಗಿ ವಿನ್ಯಾಸಗೊಳಿಸಿದ ತಾಣಗಳು",
        kitchen: {
          name: "ಸುಂದರ ಮಾಡ್ಯುಲರ್ ಅಡುಗೆಮನೆ",
          desc: "ನಿಮ್ಮ ದೈನಂದಿನ ಅಡುಗೆ ಅಗತ್ಯಕ್ಕೆ ತಕ್ಕಂತೆ ರೂಪುಗೊಂಡ ಮರದ ಪೀಠೋಪಕರಣಗಳು, ಆಯ್ದ ಕ್ವಾರ್ಟ್ಸ್ ಮೇಲ್ಮೈಗಳು ಮತ್ತು ನವಿರಾದ ಕ್ಯಾಬಿನೆಟ್‌ಗಳು."
        },
        wardrobe: {
          name: "ಐಷಾರಾಮಿ ಕಪಾಟುಗಳು ಮತ್ತು ವಾರ್ಡ್‌ರೋಬ್ಸ್",
          desc: "ಫ್ಲೂಟೆಡ್ ಗ್ಲಾಸ್ ಬಾಗಿಲುಗಳು, ಒಳಭಾಗದಲ್ಲಿ ನೈಸರ್ಗಿಕ ಲಿನಿನ್ ಕೋಟಿಂಗ್ ಮತ್ತು ಸ್ವಯಂಚಾಲಿತ ಎಲ್ಇಡಿ ದೀಪಗಳನ್ನು ಹೊಂದಿರುವ ಮರದ ವಾರ್ಡ್‌ರೋಬ್ಸ್."
        },
        living: {
          name: "ಆಪ್ತ ಲಿವಿಂಗ್ ಮತ್ತು ವಿಶ್ರಾಂತಿ ಕೊಠಡಿಗಳು",
          desc: "ಪ್ಲಾಸ್ಟರ್ ವಿನ್ಯಾಸಗಳು ಮತ್ತು ತೇಗದ ಮರದ ಫಿನಿಶಿಂಗ್ ಹೊಂದಿರುವ ಲಿವಿಂಗ್ ಯೂನಿಟ್‌ಗಳು ಮತ್ತು ಗೋಡೆಯ ಆಕರ್ಷಕ ಫಲಕಗಳು."
        },
        ceiling: {
          name: "ಫಾಲ್ಸ್ ಸೀಲಿಂಗ್ ಮತ್ತು ದೀಪಗಳ ವಿನ್ಯಾಸ",
          desc: "ನೈಸರ್ಗಿಕ ಬೆಳಕಿಗೆ ಪೂರಕವಾಗಿ ಸಿದ್ಧಪಡಿಸಿದ, ಪರೋಕ್ಷ ಚಿನ್ನದ ಬೆಳಕಿನ ಪ್ರೊಫೈಲ್‌ಗಳನ್ನು ಹೊಂದಿರುವ ಸೀಲಿಂಗ್ ವಿನ್ಯಾಸಗಳು."
        }
      },
      commercial: {
        title: "ಕಚೇರಿ ಮತ್ತು ಕೆಲಸದ ತಾಣಗಳು (Workspaces)",
        subtitle: "ಕೆಲಸದ ಪ್ರಗತಿ ಹಾಗೂ ಮಾನವ ಸಂಬಂಧಗಳನ್ನು ಉತ್ತೇಜಿಸುವ ಪರಿಸರ",
        partitions: {
          name: "ಸೌಂಡ್‌ಪ್ರೂಫ್ ಗಾಜಿನ ವಿಭಾಗಗಳು",
          desc: "ಅತ್ಯುತ್ತಮ ಶಬ್ದ ನಿರೋಧಕ ಸಾಮರ್ಥ್ಯವುಳ್ಳ, ನಯವಾದ ಕಾಂಕ್ರೀಟ್ ಅಥವಾ ಲೋಹದ ಚೌಕಟ್ಟು ಹೊಂದಿರುವ ಗಾಜಿನ ವಿಭಾಗಗಳು."
        },
        conference: {
          name: "ಸಭೆ ನಡೆಸುವ ಕೊಠಡಿಗಳು",
          desc: "ಸಂಪರ್ಕ ಸಾಧನಗಳು ಅಳವಡಿಸಿದ ಸುಂದರ ಮೇಜುಗಳು, ಅಕೌಸ್ಟಿಕ್ ವಾಲ್ ಪ್ಯಾನೆಲ್‌ಗಳು ಮತ್ತು ನೈಸರ್ಗಿಕ ತೇಗದ ಫಿನಿಶಿಂಗ್‌ ಹೊಂದಿರುವ ಕೊಠಡಿಗಳು."
        },
        workstations: {
          name: "ಉದ್ಯೋಗಿಗಳ ವರ್ಕ್‌ಸ್ಟೇಷನ್ಸ್",
          desc: "ಸುಲಭ ವೈರಿಂಗ್ ವ್ಯವಸ್ಥೆ, ಮರದ ಅಚ್ಚುಕಟ್ಟಾದ ಮೇಜುಗಳು ಮತ್ತು ಗಿಡಗಳಿಂದ ಕೂಡಿದ ವರ್ಕ್‌ಸ್ಟೇಷನ್ ವಿನ್ಯಾಸಗಳು."
        },
        reception: {
          name: "ಕಚೇರಿಯ ಮುಖ್ಯ ದ್ವಾರ ಮತ್ತು ರಿಸೆಪ್ಷನ್",
          desc: "ಸುಂದರವಾದ ಕಲ್ಲಿನ ಹಿನ್ನೆಲೆ, ಹೊಳೆಯುವ ಲೋಹದ ಲೋಗೋ ಪ್ಲೇಟ್ ಮತ್ತು ವಾಸ್ತುಶಿಲ್ಪ ಶೈಲಿಯ ಲೈಟಿಂಗ್ ಹೊಂದಿರುವ ಸುಂದರ ದ್ವಾರಗಳು."
        }
      },
      outdoor: {
        title: "ಹೊರಾಂಗಣ ಮತ್ತು ಸುರಕ್ಷತೆ (Exteriors)",
        subtitle: "ಬಲಿಷ್ಠ ವಾಸ್ತುಶಿಲ್ಪದ ಬಾಳಿಕೆ ಮತ್ತು ಹೊರಾಂಗಣ ರಕ್ಷಣೆ",
        cladding: {
          name: "HPL ಮತ್ತು ಟಿಂಬರ್ ಗೋಡೆ ಕ್ಲಾಡಿಂಗ್",
          desc: "ಭಾರೀ ಮಳೆ ಮತ್ತು ಬಿಸಿಲಿನಿಂದ ಕಟ್ಟಡದ ಹೊರಗೋಡೆಗಳನ್ನು ರಕ್ಷಿಸುವ ಪ್ರೀಮಿಯಂ ಮರ ಮತ್ತು HPL ಕ್ಲಾಡಿಂಗ್ ಶೀಟ್‌ಗಳು."
        },
        glazing: {
          name: "ಫ್ರೇಮ್‌ಲೆಸ್ ಗ್ಲಾಸ್ ಗ್ಲೇಜಿಂಗ್",
          desc: "ತಾಪಮಾನ ನಿಯಂತ್ರಣ ಮತ್ತು ಸಂಪೂರ್ಣ ಪಾರದರ್ಶಕತೆ ಹೊಂದಿರುವ, ಆಘಾತ ನಿರೋಧಕ ಗ್ಲಾಸ್ ಫ್ಯಾಸಡ್ ರಚನೆಗಳು."
        },
        nets: {
          name: "ಬಾಲ್ಕನಿ ಸುರಕ್ಷತಾ ನೆಟ್‌ಗಳು",
          desc: "ಬಾಲ್ಕನಿಗಳ ಸೌಂದರ್ಯಕ್ಕೆ ಅಡ್ಡಿಯಾಗದೆ, ಹಕ್ಕಿಗಳು ಮತ್ತು ಅಪಘಾತಗಳನ್ನು ತಡೆಯುವ ಬಲಿಷ್ಠ ಮೋನೋಫಿಲಮೆಂಟ್ ಸೇಫ್ಟಿ ನೆಟ್‌ಗಳು."
        },
        pergola: {
          name: "ಮರದ ಸುಂದರ ಪರ್ಗೋಲಾಗಳು",
          desc: "ಸಂಸ್ಕರಿಸಿದ ಮರದ ಹೊರಾಂಗಣ ಗ್ಯಾಲರಿಗಳು, ಕಾಂಪೋಸಿಟ್ ವುಡ್ ಡೆಕ್ಸ್‌ ಮತ್ತು ಹವಾಮಾನ ನಿರೋಧಕ ಶೇಡ್ ನೆಟ್‌ಗಳು."
        }
      }
    },
    materials: {
      title: "ನಮ್ಮ ವಿಶಿಷ್ಟ ವಸ್ತುಗಳು",
      subtitle: "ಅಪ್ರತಿಮ ಸೌಂದರ್ಯ ಮತ್ತು ಸುದೀರ್ಘ ಬಾಳಿಕೆಗಾಗಿ ಸೂಕ್ಷ್ಮವಾಗಿ ಆಯ್ದ ನೈಸರ್ಗಿಕ ಪರಿಕರಗಳು.",
      wood: {
        title: "ಬರ್ಮಾ ತೇಗದ ಮರ ಮತ್ತು ನೈಸರ್ಗಿಕ ವೆನೀರ್",
        desc: "ನೈಸರ್ಗಿಕ ವಿನ್ಯಾಸವನ್ನು ಎತ್ತಿ ತೋರಿಸುವಂತೆ ಪರಿಸರ ಸ್ನೇಹಿ ಮ್ಯಾಟ್ ಪಾಲಿಶ್ ಮಾಡಲಾದ ಗೆದ್ದಲು ರಹಿತ ಅತ್ಯುತ್ತಮ ಬರ್ಮಾ ತೇಗದ ಮರದ ದಿಮ್ಮಿಗಳು.",
        spec1: "ಗೆದ್ದಲು ಮತ್ತು ಹುಳುಗಳ ತಡೆಗಟ್ಟುವಿಕೆ",
        spec2: "ಪರಿಸರ ಸ್ನೇಹಿ ನವಿರಾದ PU ಮ್ಯಾಟ್ ಪಾಲಿಶಿಂಗ್",
        spec3: "ನೈಸರ್ಗಿಕ ಮೂಲಗಳಿಂದ ಪಡೆದ ಗಟ್ಟಿಮರ"
      },
      glass: {
        title: "ಆಧುನಿಕ ವಾಸ್ತುಶಿಲ್ಪದ ಗ್ಲಾಸ್",
        desc: "ಸುರಕ್ಷತೆ ಮತ್ತು ಸೌಂದರ್ಯಕ್ಕಾಗಿ ಬಳಸಲಾಗುವ ಅತ್ಯಂತ ಬಲವಾದ, ಶಬ್ದ ನಿರೋಧಕ ಫ್ಲೂಟೆಡ್ ಮತ್ತು ಬ್ರಾಂಜ್ಡ್ ಗ್ಲಾಸ್ ಶೀಟ್‌ಗಳು.",
        spec1: "42 ಡೆಸಿಬಲ್‌ವರೆಗೆ ಶಬ್ದ ನಿಯಂತ್ರಣ",
        spec2: "ಬಲಿಷ್ಠ ಸೇಫ್ಟಿ ಗ್ಲಾಸ್ ಪ್ರಮಾಣೀಕರಣ",
        spec3: "ಫ್ಲೂಟೆಡ್, ಫ್ರಾಸ್ಟೆಡ್ ಹಾಗೂ ಸ್ಮೋಕ್ಡ್ ಫಿನಿಶ್"
      },
      finishing: {
        title: "ಪ್ಲಾಸ್ಟರ್ ಮತ್ತು ಮಿನರಲ್ ಫಿನಿಶಿಂಗ್ಸ್",
        desc: "ಸಾವಯವ ಜೇಡಿಮಣ್ಣಿನ ಪ್ಲಾಸ್ಟರ್‌ಗಳು, ಸ್ಕ್ರಾಚ್-ಮುಕ್ತ ಆಕ್ರಿಲಿಕ್ ಶೀಟ್‌ಗಳು ಮತ್ತು ಕರಾರುವಕ್ಕಾದ ಎಡ್ಜ್-ಬ್ಯಾಂಡಿಂಗ್ಸ್.",
        spec1: "ಜಾಯಿಂಟ್ ರಹಿತ ಪ್ಯೂರ್ ಎಡ್ಜ್-ಬ್ಯಾಂಡಿಂಗ್",
        spec2: "ಬೆರಳಚ್ಚು ಮುಕ್ತ ಸ್ಕ್ರಾಚ್-ನಿರೋಧಕ ಶೀಟ್ಸ್",
        spec3: "ಪ್ಲಾಸ್ಟರ್ ವಿನ್ಯಾಸದ ಅದ್ಭುತ ಕೋಟಿಂಗ್"
      },
      nets: {
        title: "ಬಲಿಷ್ಠ ಹೊರಾಂಗಣ ಸೇಫ್ಟಿ ನೆಟ್‌ಗಳು",
        desc: "ತೀವ್ರ ಬಿಸಿಲು ಹಾಗೂ ಗಾಳಿಯನ್ನು ತಡೆದುಕೊಳ್ಳಬಲ್ಲ ಯುವಿ-ಸ್ಟೆಬಿಲೈಸ್ಡ್ HDPE ಮತ್ತು ಸ್ಟೇನ್‌ಲೆಸ್ ಸ್ಟೀಲ್ ತಂತಿಗಳಿಂದ ಕೂಡಿದ ಜಾಲರಿಗಳು.",
        spec1: "15 ವರ್ಷಗಳ ಯುವಿ ಸ್ಟೆಬಿಲಿಟಿ ವಾರಂಟಿ",
        spec2: "ಹೆಚ್ಚು ತೂಕ ಹೊರಬಲ್ಲ ನಿಖರ ಸುರಕ್ಷತಾ ಜಾಲ",
        spec3: "ಕಣ್ಣಿಗೆ ಕಾಣಿಸದ ನವಿರಾದ ಮೈಕ್ರೋ-ಮೆಶ್"
      }
    },
    gallery: {
      title: "ಕಲಾಕೃತಿಗಳು",
      subtitle: "ನಾವು ಪೂರ್ಣಗೊಳಿಸಿದ ವಸತಿ ಗೃಹಗಳು, ಆಧುನಿಕ ಆಫೀಸ್‌ಗಳು ಮತ್ತು ಹೊರಾಂಗಣ ಸುರಕ್ಷತಾ ಯೋಜನೆಗಳ ಚಿತ್ರಶಾಲೆ.",
      filterAll: "ಎಲ್ಲಾ ಯೋಜನೆಗಳು",
      filterInteriors: "ವಸತಿ ವಿನ್ಯಾಸ",
      filterExteriors: "ಕಚೇರಿ ವಿನ್ಯಾಸ",
      filterMaterials: "ಹೊರಾಂಗಣ & ಸೇಫ್ಟಿ",
      viewProject: "ಮಾಹಿತಿ ಪಟ್ಟಿ ನೋಡಿ",
    },
    about: {
      title: "ನಾರ್ವಿಯಾ ಡಿಸೈನರ್ಸ್ ಬಗ್ಗೆ",
      desc1: "ನಾರ್ವಿಯಾ ಡಿಸೈನ್ ಮಾನವೀಯ ಮೌಲ್ಯಗಳು ಹಾಗೂ ವಾಸ್ತುಶಿಲ್ಪ ತತ್ವಗಳ ಮೇಲೆ ನಿರ್ಮಿತವಾದ ಸಂಸ್ಥೆಯಾಗಿದೆ. ವಿನ್ಯಾಸವು ಮಾನವ ಜೀವನಕ್ಕೆ ಪೂರಕವಾಗಿರಬೇಕೆಂದು ನಾವು ನಂಬುತ್ತೇವೆ — ಮರ ಮತ್ತು ಗಾಜಿನಲ್ಲಿ, ನಿಮ್ಮ ಬಜೆಟ್ ಮತ್ತು ಸಮಯಕ್ಕೆ ಅನುಗುಣವಾಗಿ ನಿರ್ಮಿಸಲಾಗಿದೆ.",
      desc2: "ನಮ್ಮ ವಿಶಿಷ್ಟ ಪರಿಣತಿಯು ಅತ್ಯುತ್ತಮ ಮರಗೆಲಸ, ಅಕೌಸ್ಟಿಕ್ ಗ್ಲಾಸ್ ಪಾರ್ಟಿಷನ್, ಕಸ್ಟಮ್ ಗೃಹ ವಿನ್ಯಾಸ ಹಾಗೂ ಗರಿಷ್ಠ ಭದ್ರತೆಯುಳ್ಳ ಬಾಲ್ಕನಿ ನೆಟ್‌ಗಳನ್ನು ಕಲಾತ್ಮಕವಾಗಿ ಜೋಡಿಸುವಲ್ಲಿದೆ.",
      mission: "ವಸ್ತುಗಳ ಮೂಲ ಗುಣಮಟ್ಟ, ಬಾಳಿಕೆ ಮತ್ತು ಜನರ ನೆಮ್ಮದಿಗೆ ಪೂರಕವಾದ ಸುಂದರ ತಾಣಗಳ ಸೃಷ್ಟಿ.",
    },
    contact: {
      title: "ನಮ್ಮೊಂದಿಗೆ ಕೈಜೋಡಿಸಿ",
      subtitle: "ನಿಮ್ಮ ಮನೆ ಅಥವಾ ಆಫೀಸ್‌ನ ವಿನ್ಯಾಸದ ಅಗತ್ಯತೆಗಳನ್ನು ನಮ್ಮೊಂದಿಗೆ ಹಂಚಿಕೊಳ್ಳಿ. ಸಂಪೂರ್ಣ ಅಂದಾಜು ಪಟ್ಟಿ ಪಡೆಯಿರಿ.",
      name: "ನಿಮ್ಮ ಹೆಸರು",
      phone: "ಮೊಬೈಲ್ ಸಂಖ್ಯೆ",
      email: "ಇಮೇಲ್ ವಿಳಾಸ",
      message: "ನಾವು ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು? (ಉದಾ: ಲಿವಿಂಗ್ ರೂಮ್ ವಿನ್ಯಾಸ, ಸೇಫ್ಟಿ ನೆಟ್‌ಗಳು, ಆಫೀಸ್ ಗ್ಲಾಸ್ ಗೋಡೆ...)",
      submit: "ಮಾಹಿತಿ ಕಳುಹಿಸಿ",
      success: "ಧನ್ಯವಾದಗಳು! ನಮ್ಮ ಹಿರಿಯ ವಿನ್ಯಾಸಕರು ಮುಂದಿನ 24 ಗಂಟೆಗಳಲ್ಲಿ ನಿಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಲಿದ್ದಾರೆ.",
      addressTitle: "ನಮ್ಮ ವಿಳಾಸ",
      addressValue: "12ನೇ ಕ್ರಾಸ್, ಸೆಕ್ಟರ್ 7, ಹೆಚ್.ಎಸ್.ಆರ್ ಲೇಔಟ್, ಬೆಂಗಳೂರು, ಕರ್ನಾಟಕ - 560102",
      phoneTitle: "ದೂರವಾಣಿ ಸಂಖ್ಯೆಗಳು",
      emailTitle: "ಇಮೇಲ್ ಕಳುಹಿಸಿ",
    },
    callback: {
      title: "ಉಚಿತ ಕಾಲ್‌ಬ್ಯಾಕ್ ವಿನಂತಿ",
      subtitle: "ನಿಮ್ಮ ಇಮೇಲ್ ನಮೂದಿಸಿ ಮತ್ತು ನಮ್ಮ ಮುಖ್ಯ ವಿನ್ಯಾಸಕರೊಂದಿಗೆ ಉಚಿತ ಸಮಾಲೋಚನೆ ನಿಗದಿಪಡಿಸಿ. ಯಾವುದೇ ಶುಲ್ಕವಿಲ್ಲ.",
      emailPlaceholder: "ನಿಮ್ಮ ಇಮೇಲ್ ವಿಳಾಸ ನಮೂದಿಸಿ",
      button: "ಕರೆಗಾಗಿ ವಿನಂತಿಸಿ",
      submitting: "ವಿನಂತಿಸಲಾಗುತ್ತಿದೆ...",
      success: "ಕಾಲ್‌ಬ್ಯಾಕ್ ನೋಂದಣಿಯಾಗಿದೆ! ನಾವು ಶೀಘ್ರದಲ್ಲೇ ಕರೆ ಮಾಡುತ್ತೇವೆ.",
      rateLimit: "ನೀವು ಈಗಾಗಲೇ ವಿನಂತಿಸಿದ್ದೀರಿ. ದಯವಿಟ್ಟು ಸ್ವಲ್ಪ ಸಮಯ ಕಾಯಿರಿ.",
      spamBlock: "ಸ್ಪ್ಯಾಮ್ ಬ್ಲಾಕ್ ಆಗಿದೆ. ದಯವಿಟ್ಟು ನಂತರ ಪ್ರಯತ್ನಿಸಿ.",
    },
    card: {
      tagline: "ಅಧಿಕೃತ ಗುರುತು",
      title: "ಡಿಜಿಟಲ್ ವಿಸಿಟಿಂಗ್ ಕಾರ್ಡ್",
      subtitle: "ನಮ್ಮ ಅಧಿಕೃತ ಸ್ಟುಡಿಯೋ ವಿಸಿಟಿಂಗ್ ಕಾರ್ಡ್ ಅನ್ನು ಉಳಿಸಿಕೊಳ್ಳಿ ಅಥವಾ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ. ನಮ್ಮ ನೇರ ಸಂಪರ್ಕಗಳು ಮತ್ತು ವಿಳಾಸದ ಮಾಹಿತಿ ಇಲ್ಲಿದೆ.",
      flipPrompt: "ಮುಂಭಾಗ ಮತ್ತು ಹಿಂಭಾಗವನ್ನು ನೋಡಲು ಕಾರ್ಡ್ ಅನ್ನು ಸ್ಪರ್ಶಿಸಿ",
      frontLabel: "ಮುಂಭಾಗ",
      backLabel: "ಹಿಂಭಾಗ",
      flipButton: "ಕಾರ್ಡ್ ತಿರುಗಿಸಿ",
      downloadPdf: "PDF ಕಾರ್ಡ್ ಡೌನ್‌ಲೋಡ್",
      downloading: "PDF ಸಿದ್ಧವಾಗುತ್ತಿದೆ...",
      printCard: "ಪ್ರಿಂಟ್ / PDF ಉಳಿಸಿ",
      copied: "ನಕಲಿಸಲಾಗಿದೆ!",
      copyPhone: "ಫೋನ್ ನಕಲಿಸಿ",
      copyEmail: "ಇಮೇಲ್ ನಕಲಿಸಿ",
      openMap: "ಸ್ಟುಡಿಯೋ ವಿಳಾಸ",
      dimensions: "ಪ್ರಮಾಣಿತ 3.5\" × 2\" (ಮುದ್ರಣಕ್ಕೆ ಸಿದ್ಧ)",
    }
  }
};
export type Language = "en" | "kn";
export default translations;
