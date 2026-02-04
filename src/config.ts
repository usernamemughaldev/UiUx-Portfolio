// Mughal.Dev Portfolio Configuration
// Centralized control center for all content, themes, and settings

export const config = {
  // ============================================
  // 1. BRAND & IDENTITY BLOCK
  // ============================================
  brand: {
    firstName: "Mughal",
    lastName: "Dev",
    fullName: "Mughal.Dev",
    role: "UI/UX Designer",
    tagline: "Crafting Digital Experiences",
    email: "hello@mughal.dev",
    location: "Global",
    status: {
      availableForWork: true,
      availabilityText: "Available for Work",
      timezone: "UTC+5:30"
    }
  },

  // ============================================
  // 2. VISUAL THEME & STYLE BLOCK
  // ============================================
  theme: {
    // Primary brand colors
    primaryColor: "#00D4FF",      // Electric Blue
    secondaryColor: "#FF3366",    // Vibrant Pink
    accentColor: "#FFD700",       // Gold
    
    // Background colors
    backgroundColor: "#0A0A0F",   // Deep Matte Black
    surfaceColor: "#12121A",      // Surface elevation
    cardColor: "#1A1A24",         // Card backgrounds
    
    // Text colors
    textPrimary: "#FFFFFF",
    textSecondary: "#A0A0B0",
    textMuted: "#6B6B7B",
    
    // UI colors
    borderColor: "#2A2A3A",
    glowColor: "rgba(0, 212, 255, 0.3)",
    
    // Gradients
    gradientPrimary: "linear-gradient(135deg, #00D4FF 0%, #FF3366 100%)",
    gradientSubtle: "linear-gradient(180deg, rgba(0,212,255,0.1) 0%, transparent 100%)",
    
    // Typography
    fontFamily: {
      heading: "'Inter', 'SF Pro Display', system-ui, sans-serif",
      body: "'Inter', 'SF Pro Text', system-ui, sans-serif",
      mono: "'JetBrains Mono', 'Fira Code', monospace"
    }
  },

  // ============================================
  // 3. WHATSAPP ALPHA CHANNEL BLOCK
  // ============================================
  whatsappAlpha: {
    channelName: "Mughal.Dev Alpha",
    inviteLink: "https://whatsapp.com/channel/0029VbBUVv35fM5eAnXw3w2D",
    headline: "Transform the way you build, design, and launch",
    subheadline: "Join the exclusive Alpha Channel for early access to premium resources",
    features: [
      {
        id: "pro-code",
        title: "Pro Source Code",
        description: "Production-ready components and templates",
        iconKey: "Code2",
        color: "#00D4FF"
      },
      {
        id: "motion",
        title: "High-End Motion",
        description: "GSAP & Three.js animation patterns",
        iconKey: "Zap",
        color: "#FF3366"
      },
      {
        id: "vibe-coding",
        title: "Vibe Coding",
        description: "AI-powered design workflows",
        iconKey: "Brain",
        color: "#FFD700"
      },
      {
        id: "saas-alpha",
        title: "SaaS Alpha",
        description: "Early access to SaaS templates",
        iconKey: "Rocket",
        color: "#00FF88"
      },
      {
        id: "portfolio-gold",
        title: "Portfolio Gold",
        description: "Premium portfolio components",
        iconKey: "Crown",
        color: "#FFA500"
      }
    ],
    ctaText: "Join Alpha Channel"
  },

  // ============================================
  // 4. PROJECT & EXPERIENCE BLOCK
  // ============================================
  projects: [
    {
      id: "project-1",
      title: "Nexus Finance",
      client: "Nexus Technologies",
      category: "Fintech Dashboard",
      description: "A comprehensive financial analytics platform with real-time data visualization and AI-powered insights.",
      thumbnailPath: "/images/project-nexus.jpg",
      threeJsWarpIntensity: 0.8,
      tags: ["UI Design", "Dashboard", "Fintech"],
      year: "2024",
      link: "#"
    },
    {
      id: "project-2",
      title: "Aura Wellness",
      client: "Aura Health",
      category: "Health & Fitness App",
      description: "Holistic wellness application featuring meditation tracking, habit formation, and personalized health insights.",
      thumbnailPath: "/images/project-aura.jpg",
      threeJsWarpIntensity: 0.6,
      tags: ["Mobile App", "UX Research", "Health"],
      year: "2024",
      link: "#"
    },
    {
      id: "project-3",
      title: "Vertex Commerce",
      client: "Vertex Retail",
      category: "E-commerce Platform",
      description: "Next-generation shopping experience with AR product visualization and seamless checkout flow.",
      thumbnailPath: "/images/project-vertex.jpg",
      threeJsWarpIntensity: 0.9,
      tags: ["E-commerce", "AR/VR", "Web App"],
      year: "2023",
      link: "#"
    },
    {
      id: "project-4",
      title: "Pulse Social",
      client: "Pulse Media",
      category: "Social Platform",
      description: "Community-driven content platform with advanced moderation and engagement analytics.",
      thumbnailPath: "/images/project-pulse.jpg",
      threeJsWarpIntensity: 0.7,
      tags: ["Social", "Web App", "Analytics"],
      year: "2023",
      link: "#"
    }
  ],

  // ============================================
  // 5. DESIGN PHILOSOPHY BLOCK
  // ============================================
  philosophy: [
    {
      id: "empathy",
      title: "Empathy First",
      description: "Every design decision starts with understanding the user's needs, pain points, and aspirations.",
      iconKey: "Heart",
      color: "#FF3366"
    },
    {
      id: "pixel",
      title: "Pixel Perfection",
      description: "Obsessive attention to detail ensures every element serves a purpose and looks exquisite.",
      iconKey: "Target",
      color: "#00D4FF"
    },
    {
      id: "user-centric",
      title: "User-Centric Logic",
      description: "Interfaces that feel intuitive because they're built on solid cognitive principles.",
      iconKey: "Brain",
      color: "#FFD700"
    },
    {
      id: "motion",
      title: "Meaningful Motion",
      description: "Animations that guide, delight, and provide context—never decoration for its own sake.",
      iconKey: "Sparkles",
      color: "#00FF88"
    },
    {
      id: "accessibility",
      title: "Inclusive Design",
      description: "Creating experiences that work for everyone, regardless of ability or device.",
      iconKey: "Users",
      color: "#FF6B6B"
    }
  ],

  // ============================================
  // 6. SKILLS & TOOLKIT BLOCK
  // ============================================
  skills: {
    categories: [
      {
        name: "Design",
        tools: ["Figma", "Sketch", "Adobe XD", "Photoshop", "Illustrator"]
      },
      {
        name: "Prototyping",
        tools: ["Framer", "Principle", "ProtoPie", "After Effects"]
      },
      {
        name: "Development",
        tools: ["React", "TypeScript", "Tailwind", "GSAP", "Three.js"]
      },
      {
        name: "Research",
        tools: ["User Testing", "Hotjar", "Maze", "FigJam"]
      }
    ],
    tools: [
      { name: "Figma", level: 95, iconKey: "Figma", color: "#F24E1E" },
      { name: "Framer", level: 90, iconKey: "Framer", color: "#0055FF" },
      { name: "After Effects", level: 85, iconKey: "Film", color: "#9999FF" },
      { name: "Spline", level: 80, iconKey: "Box", color: "#FF6B6B" },
      { name: "React", level: 88, iconKey: "Code", color: "#61DAFB" },
      { name: "Three.js", level: 75, iconKey: "Cube", color: "#FFFFFF" }
    ],
    stats: [
      { label: "Years Experience", value: "5+" },
      { label: "Projects Delivered", value: "50+" },
      { label: "Happy Clients", value: "30+" },
      { label: "Design Awards", value: "8" }
    ]
  },

  // ============================================
  // 7. NAVIGATION & SOCIALS BLOCK
  // ============================================
  navigation: {
    sections: [
      { id: "hero", label: "Home" },
      { id: "works", label: "Works" },
      { id: "philosophy", label: "Philosophy" },
      { id: "skills", label: "Skills" },
      { id: "contact", label: "Contact" }
    ],
    socials: [
      { platform: "LinkedIn", url: "https://linkedin.com/in/mughaldev", iconKey: "Linkedin" },
      { platform: "Dribbble", url: "https://dribbble.com/mughaldev", iconKey: "Dribbble" },
      { platform: "GitHub", url: "https://github.com/mughaldev", iconKey: "Github" },
      { platform: "Twitter", url: "https://twitter.com/mughaldev", iconKey: "Twitter" }
    ]
  },

  // ============================================
  // 8. CURSOR SETTINGS BLOCK
  // ============================================
  cursorSettings: {
    enabled: true,
    trailLength: 12,
    elasticity: 0.15,
    hoverScale: 2.5,
    baseSize: 8,
    trailColor: "#00D4FF",
    hoverColor: "#FF3366",
    blendMode: "difference" as const
  },

  // ============================================
  // 9. ANIMATION SETTINGS BLOCK
  // ============================================
  animation: {
    // Easing functions
    easing: {
      goldStandard: "expo.out",
      bounce: "elastic.out(1, 0.5)",
      snap: "back.out(1.7)",
      smooth: "power2.inOut",
      dramatic: "power4.out"
    },
    
    // Durations (in seconds)
    duration: {
      fast: 0.3,
      normal: 0.6,
      slow: 1.0,
      dramatic: 1.5
    },
    
    // Stagger settings
    stagger: {
      default: 0.08,
      fast: 0.05,
      slow: 0.12
    },
    
    // Scroll settings
    scroll: {
      scrub: 0.5,
      anticipatePin: 1
    }
  },

  // ============================================
  // 10. MOBILE SETTINGS BLOCK
  // ============================================
  mobile: {
    breakpoint: 768,
    reducedMotion: true,
    throttleThreeJS: true,
    maxPixelRatio: 2,
    touchRipple: true,
    snapScroll: true
  },

  // ============================================
  // 11. FEATURE FLAGS
  // ============================================
  features: {
    showLoader: true,
    showCursor: true,
    showWhatsAppAlpha: true,
    enableThreeJS: true,
    enableLenis: true,
    enableParticles: true
  }
};

// Type exports for TypeScript
export type Config = typeof config;
export type Project = typeof config.projects[0];
export type Philosophy = typeof config.philosophy[0];
export type Tool = typeof config.skills.tools[0];
export type Social = typeof config.navigation.socials[0];

export default config;
