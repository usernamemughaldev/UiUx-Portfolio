import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import config from '../config';

import WarpedProjectCanvas from '../components/WarpedProjectCanvas';

gsap.registerPlugin(ScrollTrigger);

export default function SelectedWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [velocity, setVelocity] = useState(0);

  useEffect(() => {
    // Track scroll velocity for the warp effect
    const onScroll = () => {
      // Approximate velocity from ScrollTrigger
      const v = Math.min(Math.abs(ScrollTrigger.getVelocity() / 3000), 2.0);
      setVelocity(v);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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

      // Cards staggered entrance with warp effect
      cardsRef.current.forEach((card, i) => {
        if (!card) return;

        gsap.set(card, {
          y: 100,
          opacity: 0,
          rotateX: 15,
          scale: 0.9
        });

        gsap.to(card, {
          y: 0,
          opacity: 1,
          rotateX: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          delay: i * 0.15
        });

        // Parallax effect on scroll
        gsap.to(card, {
          y: -30 * (i % 2 === 0 ? 1 : -1),
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5
          }
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const addToRefs = (el: HTMLDivElement | null, index: number) => {
    if (el) cardsRef.current[index] = el;
  };

  return (
    <section
      id="works"
      ref={sectionRef}
      className="relative min-h-screen w-full py-20 px-4 sm:px-6 lg:px-8"
    >
      {/* Background warp effect canvas placeholder */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `
              radial-gradient(ellipse at 30% 20%, rgba(0, 212, 255, 0.1) 0%, transparent 50%),
              radial-gradient(ellipse at 70% 80%, rgba(255, 51, 102, 0.1) 0%, transparent 50%)
            `
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div ref={headerRef} className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-px bg-gradient-to-r from-[var(--primary)] to-transparent" />
            <span className="text-xs font-mono text-[var(--primary)] uppercase tracking-widest">
              Portfolio
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Selected <span className="text-gradient">Works</span>
          </h2>

          <p className="text-[var(--text-secondary)] max-w-xl text-lg">
            A curated collection of projects that showcase my expertise in UI/UX design,
            motion graphics, and interactive experiences.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {config.projects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => addToRefs(el, index)}
              className="project-card group relative rounded-3xl overflow-hidden"
              style={{
                perspective: '1000px',
                transformStyle: 'preserve-3d'
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              data-cursor-hover
            >
              {/* Card Background with warp intensity */}
              <div
                className="relative aspect-[4/3] overflow-hidden"
                style={{
                  transform: hoveredIndex === index
                    ? `scale(1.02) rotateY(${(index % 2 === 0 ? -1 : 1) * 2}deg)`
                    : 'scale(1) rotateY(0deg)',
                  transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                {/* Three.js Warped Canvas */}
                <WarpedProjectCanvas
                  image={project.thumbnailPath}
                  velocity={velocity}
                  hovered={hoveredIndex === index}
                />

                {/* Fallback & Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent opacity-80 pointer-events-none" />

                {/* Warp effect overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `
                      linear-gradient(
                        135deg, 
                        rgba(0, 212, 255, ${project.threeJsWarpIntensity * 0.2}) 0%, 
                        transparent 50%,
                        rgba(255, 51, 102, ${project.threeJsWarpIntensity * 0.2}) 100%
                      )
                    `,
                    filter: 'blur(40px)'
                  }}
                />

                {/* Content */}
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs font-medium rounded-full bg-white/10 backdrop-blur-sm text-white/80"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Title & Client */}
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-1 group-hover:text-[var(--primary)] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-[var(--text-secondary)] text-sm mb-4">
                    {project.client} • {project.category}
                  </p>

                  {/* Description - reveals on hover */}
                  <p
                    className="text-white/70 text-sm max-w-md mb-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
                  >
                    {project.description}
                  </p>

                  {/* Actions */}
                  <div className="flex items-center gap-4">
                    <a
                      href={project.link}
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium hover:bg-white/20 transition-colors"
                    >
                      View Case Study
                      <ArrowUpRight className="w-4 h-4" />
                    </a>

                    <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Corner accent */}
                <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white font-mono text-sm">{project.year}</span>
                </div>
              </div>

              {/* Border glow on hover */}
              <div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  boxShadow: `inset 0 0 0 1px var(--primary), 0 0 30px var(--glow)`
                }}
              />
            </div>
          ))}
        </div>

        {/* View All Link */}
        <div className="mt-16 text-center">
          <a
            href="#"
            className="inline-flex items-center gap-2 text-[var(--primary)] hover:text-white transition-colors group"
            data-cursor-hover
          >
            <span className="text-lg font-medium">View All Projects</span>
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
