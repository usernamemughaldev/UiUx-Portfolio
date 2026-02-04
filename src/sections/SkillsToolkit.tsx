import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Figma, Code, Film, Box, Cpu, Layers, Gauge, Wand2 } from 'lucide-react';
import config from '../config';

import SkillsWarpGrid from '../components/SkillsWarpGrid';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  Figma,
  Code,
  Film,
  Box,
  Cube: Box,
  Cpu,
  Layers,
  Gauge,
  Wand2,
};

export default function SkillsToolkit() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cubesRef = useRef<HTMLDivElement[]>([]);
  const [hoveredCube, setHoveredCube] = useState<number | null>(null);

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

      // Cubes entrance - light-speed effect
      cubesRef.current.forEach((cube, i) => {
        if (!cube) return;

        gsap.set(cube, {
          z: -500,
          opacity: 0,
          rotateX: 45,
          rotateY: -45,
        });

        gsap.to(cube, {
          z: 0,
          opacity: 1,
          rotateX: 0,
          rotateY: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cube,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          },
          delay: i * 0.1
        });

        // Subtle bobbing animation
        gsap.to(cube, {
          y: '+=8',
          duration: 2 + i * 0.2,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Mouse magnetic effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;

      // Magnetic pull for cubes near cursor
      cubesRef.current.forEach((cube) => {
        if (!cube) return;

        const cubeRect = cube.getBoundingClientRect();
        const cubeCenterX = cubeRect.left + cubeRect.width / 2;
        const cubeCenterY = cubeRect.top + cubeRect.height / 2;

        const distX = e.clientX - cubeCenterX;
        const distY = e.clientY - cubeCenterY;
        const distance = Math.sqrt(distX * distX + distY * distY);

        const magneticRadius = 200;

        if (distance < magneticRadius) {
          const intensity = (1 - distance / magneticRadius) * 15;
          gsap.to(cube, {
            rotateY: (distX / magneticRadius) * intensity,
            rotateX: -(distY / magneticRadius) * intensity,
            duration: 0.3,
            ease: 'power2.out'
          });
        } else {
          gsap.to(cube, {
            rotateY: 0,
            rotateX: 0,
            duration: 0.5,
            ease: 'power2.out'
          });
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const addToRefs = (el: HTMLDivElement | null, index: number) => {
    if (el) cubesRef.current[index] = el;
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative min-h-screen w-full py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background wireframe grid */}
      <SkillsWarpGrid />

      {/* Gradient overlays */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at 50% 0%, rgba(0, 212, 255, 0.1) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 100%, rgba(255, 51, 102, 0.1) 0%, transparent 50%)
          `
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-[var(--secondary)]" />
            <span className="text-xs font-mono text-[var(--secondary)] uppercase tracking-widest">
              Arsenal
            </span>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-[var(--secondary)]" />
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Skills & <span className="text-gradient">Toolkit</span>
          </h2>

          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto text-lg">
            A comprehensive arsenal of design and development tools that bring ideas to life.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {config.skills.stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-2xl glass"
            >
              <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-[var(--text-muted)]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* 3D Cubes Grid */}
        <div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
          style={{ perspective: '1000px' }}
        >
          {config.skills.tools.map((tool, index) => {
            const Icon = iconMap[tool.iconKey];
            const isHovered = hoveredCube === index;

            return (
              <div
                key={tool.name}
                ref={(el) => addToRefs(el, index)}
                className="skill-cube relative aspect-square"
                style={{ transformStyle: 'preserve-3d' }}
                onMouseEnter={() => setHoveredCube(index)}
                onMouseLeave={() => setHoveredCube(null)}
                data-cursor-hover
              >
                <div
                  className="relative w-full h-full rounded-2xl overflow-hidden transition-all duration-500"
                  style={{
                    background: isHovered ? 'rgba(26, 26, 36, 0.5)' : 'rgba(26, 26, 36, 0.6)',
                    backdropFilter: 'blur(20px)',
                    border: `1px solid ${isHovered ? tool.color : 'var(--border)'}`,
                    boxShadow: isHovered
                      ? `0 0 40px ${tool.color}40, inset 0 0 20px ${tool.color}10`
                      : '0 10px 30px rgba(0, 0, 0, 0.3)',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Main Face */}
                  <div className={`absolute inset-0 flex flex-col items-center justify-center p-4 transition-all duration-300 ${isHovered ? 'opacity-0 scale-90' : 'opacity-100 scale-100'}`}>
                    {/* Icon */}
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-transform duration-300"
                      style={{
                        background: `linear-gradient(135deg, ${tool.color}30 0%, ${tool.color}10 100%)`,
                        transform: isHovered ? 'translateZ(30px)' : 'translateZ(0)'
                      }}
                    >
                      {Icon && <Icon className="w-6 h-6" style={{ color: tool.color }} />}
                    </div>

                    <h4 className="text-sm font-semibold text-white text-center">
                      {tool.name}
                    </h4>

                    {/* Proficiency level */}
                    <div className="mt-2 w-full">
                      <div className="h-1 w-full bg-[var(--bg-surface)] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: isHovered ? `${tool.level}%` : '0%',
                            background: tool.color
                          }}
                        />
                      </div>
                      <span
                        className="text-xs text-[var(--text-muted)] mt-1 block text-center transition-opacity duration-300"
                        style={{ opacity: isHovered ? 1 : 0 }}
                      >
                        {tool.level}%
                      </span>
                    </div>
                  </div>

                  {/* Hover Stats Overlay */}
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center p-4 transition-all duration-300"
                    style={{
                      opacity: isHovered ? 1 : 0,
                      transform: isHovered ? 'scale(1)' : 'scale(1.1)',
                      background: `linear-gradient(135deg, ${tool.color}20 0%, transparent 100%)`
                    }}
                  >
                    <span
                      className="text-3xl font-bold"
                      style={{
                        color: tool.color,
                        textShadow: `0 0 20px ${tool.color}80, 0 0 40px ${tool.color}40`
                      }}
                    >
                      {tool.level}%
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] mt-1" style={{ color: tool.color }}>
                      Mastery
                    </span>
                  </div>

                  {/* Corner accent */}
                  <div
                    className="absolute top-2 right-2 w-2 h-2 rounded-full transition-opacity duration-300"
                    style={{
                      background: tool.color,
                      opacity: isHovered ? 1 : 0.3
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Skill Categories */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {config.skills.categories.map((category) => (
            <div
              key={category.name}
              className="p-6 rounded-2xl glass hover:border-[var(--primary)] transition-colors duration-300"
              data-cursor-hover
            >
              <h4 className="text-lg font-semibold text-white mb-4">
                {category.name}
              </h4>
              <div className="flex flex-wrap gap-2">
                {category.tools.map((tool) => (
                  <span
                    key={tool}
                    className="px-3 py-1 text-xs rounded-full bg-[var(--bg-surface)] text-[var(--text-secondary)]"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
