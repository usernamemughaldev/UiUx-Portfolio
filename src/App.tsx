import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

// Components
import LoadingScreen from './sections/LoadingScreen';
import GhostCursor from './components/GhostCursor';
import CornerNavigation from './components/CornerNavigation';
import HeroSection from './sections/HeroSection';
import SelectedWorks from './sections/SelectedWorks';
import DesignPhilosophy from './sections/DesignPhilosophy';
import SkillsToolkit from './sections/SkillsToolkit';
import WhatsAppAlpha from './sections/WhatsAppAlpha';
import ContactHub from './sections/ContactHub';
import TransitionOverlay from './components/TransitionOverlay';

// Config
import config from './config';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadFinished, setLoadFinished] = useState(false);
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    if (!config.features.enableLenis) return;

    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    setLenis(lenisInstance);

    // Connect Lenis to GSAP ScrollTrigger
    lenisInstance.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenisInstance.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenisInstance.destroy();
      gsap.ticker.remove(lenisInstance.raf);
    };
  }, []);

  // Handle loading complete
  const handleLoadingComplete = () => {
    setIsLoading(false);

    // We wait for the exit animation to finish before removing from DOM
    // This matches the 0.8s duration in LoadingScreen exitTl
    setTimeout(() => {
      setLoadFinished(true);
    }, 850);

    // Enable scrolling after loader
    if (lenis) {
      lenis.start();
    }

    // Add custom cursor class
    if (config.features.showCursor && window.innerWidth > config.mobile.breakpoint) {
      document.body.classList.add('custom-cursor-enabled');
    }
  };

  // Setup global scroll transitions
  useEffect(() => {
    if (isLoading || !loadFinished) return;

    const ctx = gsap.context(() => {
      // Hero -> Works: Spatial Collapse
      ScrollTrigger.create({
        trigger: '#hero',
        start: 'bottom bottom',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          gsap.set('#hero .bento-grid', {
            scale: 1 - self.progress * 0.5,
            opacity: 1 - self.progress,
            z: -self.progress * 500
          });
        }
      });

      // Works -> Philosophy: Glass Shatter
      ScrollTrigger.create({
        trigger: '#works',
        start: 'bottom 20%',
        onEnter: () => {
          window.dispatchEvent(new CustomEvent('section-transition', { detail: { type: 'shatter' } }));
        },
        onEnterBack: () => {
          window.dispatchEvent(new CustomEvent('section-transition', { detail: { type: 'shatter' } }));
        }
      });

      // Philosophy -> Skills: Light-speed
      ScrollTrigger.create({
        trigger: '#philosophy',
        start: 'bottom 20%',
        onEnter: () => {
          window.dispatchEvent(new CustomEvent('section-transition', { detail: { type: 'lightspeed' } }));
        },
        onEnterBack: () => {
          window.dispatchEvent(new CustomEvent('section-transition', { detail: { type: 'lightspeed' } }));
        }
      });
    }, mainRef);

    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, [isLoading, loadFinished]);

  return (
    <>
      {/* Loading Screen */}
      {config.features.showLoader && !loadFinished && (
        <LoadingScreen
          isLoading={isLoading}
          onComplete={handleLoadingComplete}
        />
      )}

      {/* Custom Ghost Cursor */}
      {config.features.showCursor && loadFinished && <GhostCursor />}

      {/* Corner Navigation */}
      {!loadFinished ? null : <CornerNavigation />}

      {/* Transition Effects */}
      <TransitionOverlay />

      {/* Main Content */}
      <main
        ref={mainRef}
        className={`relative min-h-screen bg-[var(--bg-primary)] transition-opacity duration-500 ${loadFinished ? 'opacity-100' : 'opacity-0'
          }`}
      >
        {/* Hero Section - Bento Grid */}
        <HeroSection show={loadFinished} />

        {/* Selected Works - 3D Warped Cards */}
        <SelectedWorks />

        {/* Design Philosophy - Floating Glass Nodes */}
        <DesignPhilosophy />

        {/* Skills & Toolkit - 3D Frosted Glass Cubes */}
        <SkillsToolkit />

        {/* WhatsApp Alpha Promotion */}
        {config.features.showWhatsAppAlpha && <WhatsAppAlpha />}

        {/* Contact Hub - 3D Interactive Capsule */}
        <ContactHub />
      </main>
    </>
  );
}

export default App;
