import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, Target, Brain, Sparkles, Users } from 'lucide-react';
import config from '../config';

import DesignPhilosophyCanvas from '../components/DesignPhilosophyCanvas';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  Heart,
  Target,
  Brain,
  Sparkles,
  Users,
};

export default function DesignPhilosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const nodesRef = useRef<HTMLDivElement[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
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

      // Nodes entrance with glass-shatter effect
      nodesRef.current.forEach((node, i) => {
        if (!node) return;

        gsap.set(node, {
          scale: 0,
          opacity: 0,
          rotateY: -90,
        });

        gsap.to(node, {
          scale: 1,
          opacity: 1,
          rotateY: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: node,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          delay: i * 0.1
        });

        // Floating animation
        gsap.to(node, {
          y: '+=15',
          duration: 2 + i * 0.3,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Mouse parallax for nodes
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;

      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;

      nodesRef.current.forEach((node, i) => {
        if (!node) return;

        const intensity = (i + 1) * 8;
        gsap.to(node, {
          x: x * intensity,
          y: y * intensity,
          duration: 0.5,
          ease: 'power2.out'
        });
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const addToRefs = (el: HTMLDivElement | null, index: number) => {
    if (el) nodesRef.current[index] = el;
  };

  return (
    <section
      id="philosophy"
      ref={sectionRef}
      className="relative min-h-screen w-full py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Three.js Canvas Background */}
      <DesignPhilosophyCanvas />

      {/* Gradient overlays */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at 20% 30%, rgba(0, 212, 255, 0.08) 0%, transparent 40%),
            radial-gradient(ellipse at 80% 70%, rgba(255, 51, 102, 0.08) 0%, transparent 40%)
          `
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-20">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-[var(--primary)]" />
            <span className="text-xs font-mono text-[var(--primary)] uppercase tracking-widest">
              Mindset
            </span>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-[var(--primary)]" />
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Design <span className="text-gradient">Philosophy</span>
          </h2>

          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto text-lg">
            Core principles that guide every design decision, from initial concept to final pixel.
          </p>
        </div>

        {/* Floating Nodes Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
          style={{ perspective: '1000px' }}
        >
          {config.philosophy.map((item, index) => {
            const Icon = iconMap[item.iconKey];
            const isLarge = index === 0 || index === 3;

            return (
              <div
                key={item.id}
                ref={(el) => addToRefs(el, index)}
                className={`group relative ${isLarge ? 'lg:col-span-2' : ''}`}
                style={{ transformStyle: 'preserve-3d' }}
                data-cursor-hover
              >
                <div
                  className="relative p-8 rounded-3xl overflow-hidden transition-all duration-500"
                  style={{
                    background: 'rgba(26, 26, 36, 0.4)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(42, 42, 58, 0.5)',
                    boxShadow: `
                      0 25px 50px -12px rgba(0, 0, 0, 0.5),
                      inset 0 1px 0 0 rgba(255, 255, 255, 0.05)
                    `,
                  }}
                >
                  {/* Glow effect on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(circle at 50% 50%, ${item.color}15 0%, transparent 70%)`
                    }}
                  />

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                      style={{
                        background: `linear-gradient(135deg, ${item.color}20 0%, ${item.color}10 100%)`,
                        border: `1px solid ${item.color}30`
                      }}
                    >
                      {Icon && <Icon className="w-7 h-7" style={{ color: item.color }} />}
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[var(--primary)] transition-colors">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-[var(--text-secondary)] leading-relaxed">
                      {item.description}
                    </p>

                    {/* Decorative number */}
                    <div
                      className="absolute top-4 right-4 text-6xl font-bold opacity-5"
                      style={{ color: item.color }}
                    >
                      0{index + 1}
                    </div>
                  </div>

                  {/* Border glow */}
                  <div
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      boxShadow: `inset 0 0 0 1px ${item.color}40, 0 0 30px ${item.color}20`
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Quote */}
        <div className="mt-20 text-center">
          <blockquote className="text-xl md:text-2xl text-[var(--text-secondary)] italic max-w-3xl mx-auto">
            "Design is not just what it looks like and feels like.
            <span className="text-white"> Design is how it works.</span>"
          </blockquote>
          <cite className="block mt-4 text-sm text-[var(--text-muted)] not-italic">
            — Steve Jobs
          </cite>
        </div>
      </div>
    </section>
  );
}
