import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Clock, Sparkles, Figma, Code2, Palette, ArrowRight } from 'lucide-react';
import config from '../config';

gsap.registerPlugin(ScrollTrigger);

const philosophyItems = [
  "Empathy First",
  "Pixel Perfection",
  "User-Centric Logic",
  "Meaningful Motion"
];

const techStack = [
  { icon: Figma, name: "Figma" },
  { icon: Code2, name: "React" },
  { icon: Palette, name: "Design" },
  { icon: Sparkles, name: "Motion" },
];

export default function HeroSection({ show }: { show: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const tilesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!show) return;

    const ctx = gsap.context(() => {
      // Bento Opening Animation - tiles pop and expand from a centralized origin
      const tiles = tilesRef.current;

      gsap.set(tiles, {
        scale: 0.2,
        opacity: 0,
        x: (index) => {
          // Calculate initial X offset to simulate expansion from center
          const isLeft = index % 2 === 0;
          return isLeft ? -100 : 100;
        },
        y: (index) => {
          const isTop = index < 4;
          return isTop ? -50 : 50;
        }
      });

      const tl = gsap.timeline({ delay: 0.2 });

      // Staggered "explosion" from center
      tl.to(tiles, {
        scale: 1,
        opacity: 1,
        x: 0,
        y: 0,
        duration: 1.2,
        stagger: {
          amount: 0.5,
          from: 'center',
          grid: [4, 2]
        },
        ease: 'elastic.out(1, 0.7)'
      });

      // Content slides up within tiles only after grid borders solidify
      tl.fromTo('.tile-content',
        { y: 30, opacity: 0, filter: 'blur(10px)' },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.8,
          stagger: 0.08,
          ease: 'power3.out'
        },
        '-=0.6'
      );

      // Scroll-triggered 3D tilt effect
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.5,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.to(tiles, {
            rotateX: progress * 15,
            z: -progress * 200,
            opacity: 1 - progress * 0.8,
            duration: 0.1
          });
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, [show]);

  const addToRefs = (el: HTMLDivElement | null, index: number) => {
    if (el) tilesRef.current[index] = el;
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen w-full flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8"
      style={{ perspective: '1000px' }}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Gradient orbs */}
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{ background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-15 blur-3xl"
          style={{ background: 'radial-gradient(circle, var(--secondary) 0%, transparent 70%)' }}
        />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(var(--border) 1px, transparent 1px),
              linear-gradient(90deg, var(--border) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* Bento Grid */}
      <div
        ref={gridRef}
        className="relative w-full max-w-7xl mx-auto"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[180px]">

          {/* Tile 1: Main Hero - Large */}
          <div
            ref={(el) => addToRefs(el, 0)}
            className="bento-tile lg:col-span-2 lg:row-span-2 flex flex-col justify-between p-6 md:p-8"
            data-cursor-hover
          >
            <div className="tile-content">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-[var(--primary)] animate-pulse" />
                <span className="text-xs font-mono text-[var(--text-secondary)] uppercase tracking-wider">
                  {config.brand.role}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
                <span className="text-gradient">{config.brand.fullName}</span>
                <br />
                <span className="text-white">{config.brand.tagline}</span>
              </h1>

              <p className="text-[var(--text-secondary)] max-w-md text-sm md:text-base">
                Creating immersive digital experiences that blend aesthetics with functionality.
                Specializing in UI/UX design, motion, and interactive prototypes.
              </p>
            </div>

            <div className="tile-content flex items-center gap-4 mt-6">
              <button
                onClick={() => document.getElementById('works')?.scrollIntoView({ behavior: 'smooth' })}
                className="group flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white font-medium hover:shadow-lg hover:shadow-[var(--primary)]/20 transition-all duration-300"
                data-cursor-hover
              >
                View Work
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-6 py-3 rounded-full border border-[var(--border)] text-[var(--text-secondary)] hover:text-white hover:border-[var(--primary)] transition-all duration-300"
                data-cursor-hover
              >
                Contact
              </button>
            </div>
          </div>

          {/* Tile 2: Philosophy Rotator */}
          <div
            ref={(el) => addToRefs(el, 1)}
            className="bento-tile lg:col-span-2 p-6 flex flex-col justify-center"
            data-cursor-hover
          >
            <div className="tile-content">
              <span className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider mb-3 block">
                Design Philosophy
              </span>
              <div className="relative h-12 overflow-hidden">
                {philosophyItems.map((item, i) => (
                  <div
                    key={i}
                    className="absolute inset-0 flex items-center text-xl md:text-2xl font-semibold text-white"
                    style={{
                      animation: `philosophyRotate ${philosophyItems.length * 3}s infinite`,
                      animationDelay: `${i * 3}s`,
                      opacity: 0,
                      transform: 'translateY(100%)'
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tile 3: Availability Badge */}
          <div
            ref={(el) => addToRefs(el, 2)}
            className="bento-tile p-6 flex flex-col justify-between"
            data-cursor-hover
          >
            <div className="tile-content">
              <div className="flex items-center gap-2 mb-4">
                <div className={`w-3 h-3 rounded-full ${config.brand.status.availableForWork ? 'bg-green-500' : 'bg-yellow-500'} animate-pulse`} />
                <span className="text-xs font-mono text-[var(--text-muted)] uppercase">
                  Status
                </span>
              </div>

              <div className="text-lg font-semibold text-white">
                {config.brand.status.availableForWork ? 'Open for Work' : 'Booked'}
              </div>

              <div className="flex items-center gap-2 mt-2 text-sm text-[var(--text-secondary)]">
                <Clock className="w-4 h-4" />
                <span>{config.brand.status.timezone}</span>
              </div>
            </div>
          </div>

          {/* Tile 4: Location */}
          <div
            ref={(el) => addToRefs(el, 3)}
            className="bento-tile p-6 flex flex-col justify-between"
            data-cursor-hover
          >
            <div className="tile-content">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-4 h-4 text-[var(--primary)]" />
                <span className="text-xs font-mono text-[var(--text-muted)] uppercase">
                  Location
                </span>
              </div>

              <div className="text-lg font-semibold text-white">
                {config.brand.location}
              </div>

              <div className="text-sm text-[var(--text-secondary)] mt-1">
                Remote Friendly
              </div>
            </div>
          </div>

          {/* Tile 5: Tech Stack Scroll */}
          <div
            ref={(el) => addToRefs(el, 4)}
            className="bento-tile p-6 flex flex-col justify-center"
            data-cursor-hover
          >
            <div className="tile-content">
              <span className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider mb-4 block">
                Tech Stack
              </span>
              <div className="flex items-center gap-4 overflow-hidden">
                <div className="flex gap-4 animate-scroll-x">
                  {[...techStack, ...techStack].map((tech, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 px-3 py-2 rounded-full bg-[var(--bg-surface)] text-[var(--text-secondary)]"
                    >
                      <tech.icon className="w-4 h-4" />
                      <span className="text-sm">{tech.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Tile 6: Stats */}
          <div
            ref={(el) => addToRefs(el, 5)}
            className="bento-tile p-6 flex flex-col justify-center"
            data-cursor-hover
          >
            <div className="tile-content grid grid-cols-2 gap-4">
              {config.skills.stats.slice(0, 2).map((stat, i) => (
                <div key={i}>
                  <div className="text-2xl md:text-3xl font-bold text-gradient">
                    {stat.value}
                  </div>
                  <div className="text-xs text-[var(--text-muted)] mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tile 7: Quick Link - WhatsApp */}
          <div
            ref={(el) => addToRefs(el, 6)}
            className="bento-tile lg:col-span-2 p-6 flex items-center justify-between group"
            data-cursor-hover
          >
            <div className="tile-content">
              <span className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider block mb-2">
                Exclusive Access
              </span>
              <div className="text-lg font-semibold text-white group-hover:text-[var(--primary)] transition-colors">
                Join the Alpha Channel
              </div>
            </div>

            <a
              href={config.whatsappAlpha.inviteLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center group-hover:scale-110 transition-transform"
            >
              <ArrowRight className="w-5 h-5 text-white" />
            </a>
          </div>

        </div>
      </div>

      {/* Philosophy rotation keyframes */}
      <style>{`
        @keyframes philosophyRotate {
          0%, 20% {
            opacity: 1;
            transform: translateY(0);
          }
          25%, 95% {
            opacity: 0;
            transform: translateY(-100%);
          }
          100% {
            opacity: 0;
            transform: translateY(100%);
          }
        }
        
        @keyframes scroll-x {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll-x {
          animation: scroll-x 10s linear infinite;
        }
      `}</style>
    </section>
  );
}
