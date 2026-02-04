import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2, Zap, Brain, Rocket, Crown, ArrowRight, MessageCircle } from 'lucide-react';
import config from '../config';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  Code2,
  Zap,
  Brain,
  Rocket,
  Crown,
};

export default function WhatsAppAlpha() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const tilesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation with gradient reveal
      gsap.fromTo(headerRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // CTA button breathing animation
      gsap.to(ctaRef.current, {
        scale: 1.02,
        duration: 1.5,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

      // Feature tiles staggered entrance
      tilesRef.current.forEach((tile, i) => {
        if (!tile) return;

        gsap.fromTo(tile,
          { y: 50, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: tile,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            },
            delay: i * 0.1
          }
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const addToRefs = (el: HTMLDivElement | null, index: number) => {
    if (el) tilesRef.current[index] = el;
  };

  return (
    <section
      id="alpha"
      ref={sectionRef}
      className="relative min-h-screen w-full py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Data-rain background effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Matrix-style falling characters */}
        <div className="absolute inset-0 opacity-5">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-[var(--primary)] font-mono text-xs whitespace-nowrap"
              style={{
                left: `${i * 5}%`,
                top: `-${Math.random() * 100}%`,
                animation: `dataRain ${3 + Math.random() * 4}s linear infinite`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            >
              {Array.from({ length: 30 }).map((_, j) => (
                <div key={j}>
                  {Math.random() > 0.5 ? '1' : '0'}
                  {Math.random() > 0.5 ? 'A' : 'F'}
                  {Math.random() > 0.5 ? '#' : '$'}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Gradient overlays */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 30% 50%, rgba(0, 212, 255, 0.15) 0%, transparent 50%),
              radial-gradient(ellipse at 70% 50%, rgba(37, 211, 102, 0.1) 0%, transparent 50%)
            `
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#25D366]/10 border border-[#25D366]/30 mb-6">
            <MessageCircle className="w-4 h-4 text-[#25D366]" />
            <span className="text-xs font-mono text-[#25D366] uppercase tracking-wider">
              Exclusive Access
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            {config.whatsappAlpha.headline.split(' ').map((word, i) => (
              <span key={i} className={i >= 4 ? 'text-gradient' : ''}>
                {word}{' '}
              </span>
            ))}
          </h2>
          
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto text-lg">
            {config.whatsappAlpha.subheadline}
          </p>
        </div>

        {/* Main CTA Button */}
        <div className="flex justify-center mb-16">
          <a
            ref={ctaRef}
            href={config.whatsappAlpha.inviteLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-4 px-8 py-4 rounded-full overflow-hidden"
            data-cursor-hover
          >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#25D366] to-[#128C7E]" />
            
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#25D366] to-[#128C7E] blur-xl opacity-50 group-hover:opacity-80 transition-opacity" />
            
            {/* Content */}
            <div className="relative flex items-center gap-4">
              <MessageCircle className="w-6 h-6 text-white" />
              <span className="text-lg font-semibold text-white">
                {config.whatsappAlpha.ctaText}
              </span>
              <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
            </div>
          </a>
        </div>

        {/* Feature Tiles - Bento Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {config.whatsappAlpha.features.map((feature, index) => {
            const Icon = iconMap[feature.iconKey];
            const isLarge = index === 0 || index === 3;

            return (
              <div
                key={feature.id}
                ref={(el) => addToRefs(el, index)}
                className={`group relative p-6 rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02] ${
                  isLarge ? 'md:col-span-2' : ''
                }`}
                style={{
                  background: 'rgba(26, 26, 36, 0.6)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid var(--border)',
                }}
                data-cursor-hover
              >
                {/* Hover glow */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${feature.color}15 0%, transparent 70%)`
                  }}
                />

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                    style={{ 
                      background: `linear-gradient(135deg, ${feature.color}30 0%, ${feature.color}10 100%)`,
                      border: `1px solid ${feature.color}40`
                    }}
                  >
                    {Icon && <Icon className="w-6 h-6" style={{ color: feature.color }} />}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-[var(--primary)] transition-colors">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[var(--text-secondary)] text-sm">
                    {feature.description}
                  </p>
                </div>

                {/* Border glow on hover */}
                <div 
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    boxShadow: `inset 0 0 0 1px ${feature.color}40`
                  }}
                />

                {/* Decorative element */}
                <div 
                  className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full opacity-10 blur-2xl"
                  style={{ background: feature.color }}
                />
              </div>
            );
          })}
        </div>

        {/* Channel Link Display */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass">
            <span className="text-sm text-[var(--text-muted)]">Channel:</span>
            <code className="text-sm text-[var(--primary)] font-mono">
              {config.whatsappAlpha.channelName}
            </code>
          </div>
        </div>
      </div>

      {/* Data rain animation */}
      <style>{`
        @keyframes dataRain {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100vh);
          }
        }
      `}</style>
    </section>
  );
}
