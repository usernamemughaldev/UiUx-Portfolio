import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Linkedin, Dribbble, Github, Twitter, FileDown, Moon } from 'lucide-react';
import config from '../config';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Linkedin,
  Dribbble,
  Github,
  Twitter,
};

export default function CornerNavigation() {
  const topLeftRef = useRef<HTMLDivElement>(null);
  const topRightRef = useRef<HTMLDivElement>(null);
  const bottomLeftRef = useRef<HTMLDivElement>(null);
  const bottomRightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.5 });

      // Top-left: Brand slides from left
      tl.fromTo(topLeftRef.current,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' }
      );

      // Top-right: Contact button slides from right
      tl.fromTo(topRightRef.current,
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' },
        '<0.1'
      );

      // Bottom-left: Socials rise from bottom
      tl.fromTo(bottomLeftRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' },
        '<0.1'
      );

      // Bottom-right: Utility rises from bottom
      tl.fromTo(bottomRightRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' },
        '<0.1'
      );
    });

    return () => ctx.revert();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top-Left: Brand Anchor */}
      <div
        ref={topLeftRef}
        className="fixed top-6 left-6 z-50 opacity-0"
      >
        <button
          onClick={() => scrollToSection('hero')}
          className="group flex items-center gap-3 px-4 py-2 rounded-full glass hover:glow-border transition-all duration-300"
          data-cursor-hover
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center">
            <span className="text-white font-bold text-sm">M</span>
          </div>
          <span className="font-semibold text-white hidden sm:block">
            {config.brand.fullName}
          </span>
        </button>
      </div>

      {/* Top-Right: Contact CTA */}
      <div
        ref={topRightRef}
        className="fixed top-6 right-6 z-50 opacity-0"
      >
        <button
          onClick={() => scrollToSection('contact')}
          className="group relative px-6 py-3 rounded-full overflow-hidden transition-all duration-300"
          data-cursor-hover
        >
          {/* Liquid fill background */}
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute inset-0 border border-[var(--primary)] rounded-full group-hover:border-transparent transition-colors duration-300" />
          
          <span className="relative z-10 font-medium text-[var(--primary)] group-hover:text-white transition-colors duration-300">
            Let's Talk
          </span>
        </button>
      </div>

      {/* Bottom-Left: Social Hub */}
      <div
        ref={bottomLeftRef}
        className="fixed bottom-6 left-6 z-50 opacity-0"
      >
        <div className="flex items-center gap-2 p-2 rounded-full glass">
          {config.navigation.socials.map((social) => {
            const Icon = iconMap[social.iconKey];
            return (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--primary)] hover:bg-[var(--bg-surface)] transition-all duration-300 hover:scale-110"
                data-cursor-hover
                aria-label={social.platform}
              >
                {Icon && <Icon className="w-5 h-5" />}
              </a>
            );
          })}
        </div>
      </div>

      {/* Bottom-Right: Utility Tile */}
      <div
        ref={bottomRightRef}
        className="fixed bottom-6 right-6 z-50 opacity-0"
      >
        <div className="flex items-center gap-2">
          {/* Resume Download */}
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-full glass text-[var(--text-secondary)] hover:text-white hover:border-[var(--primary)] transition-all duration-300"
            data-cursor-hover
          >
            <FileDown className="w-4 h-4" />
            <span className="text-sm hidden sm:inline">Resume</span>
          </button>

          {/* Theme Toggle */}
          <button
            className="w-10 h-10 rounded-full glass flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--primary)] hover:border-[var(--primary)] transition-all duration-300"
            data-cursor-hover
            aria-label="Toggle theme"
          >
            <Moon className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
        <div className="glass-strong mx-4 mb-4 rounded-2xl p-2">
          <div className="flex items-center justify-around">
            {config.navigation.sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className="px-3 py-2 text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors"
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
