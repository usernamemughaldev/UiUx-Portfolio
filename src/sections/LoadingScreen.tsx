import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import config from '../config';

interface LoadingScreenProps {
  isLoading: boolean;
  onComplete: () => void;
}

export default function LoadingScreen({ isLoading, onComplete }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (!isLoading) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          // Shutter exit animation
          const exitTl = gsap.timeline({
            onComplete: () => {
              onComplete();
            }
          });

          // Text vanishes upward rapidly
          exitTl.to(textRef.current, {
            y: -150,
            opacity: 0,
            duration: 0.3,
            ease: 'expo.in'
          });

          // Counter vanishes
          exitTl.to(counterRef.current, {
            opacity: 0,
            scale: 0.8,
            duration: 0.2
          }, '<');

          // Background panel whipped off-screen with extreme velocity
          exitTl.to(containerRef.current, {
            yPercent: -100,
            duration: 0.7,
            ease: 'expo.inOut'
          }, '-=0.15');
        }
      });

      // Text reveal - rises through mask with Power4 ease
      tl.fromTo(textRef.current,
        { y: '100%' },
        {
          y: '0%',
          duration: 1.2,
          ease: 'power4.out'
        }
      );

      // Counter animation - ticks from 0 to 100
      const counterObj = { value: 0 };
      tl.to(counterObj, {
        value: 100,
        duration: 1.5,
        ease: 'power2.out',
        onUpdate: () => {
          setCounter(Math.round(counterObj.value));
        }
      }, 0.2);

      // Hold for a moment at 100%
      tl.to({}, { duration: 0.3 });

    }, containerRef);

    return () => ctx.revert();
  }, [isLoading, onComplete]);

  return (
    <div
      ref={containerRef}
      className="loader-screen"
      style={{ background: config.theme.backgroundColor }}
    >
      {/* Text Reveal Mask */}
      <div className="loader-text-mask">
        <div
          ref={textRef}
          className="loader-text text-gradient"
        >
          {config.brand.fullName}
        </div>
      </div>

      {/* Numerical Counter */}
      <div
        ref={counterRef}
        className="loader-counter"
      >
        <span className="font-mono text-[var(--primary)]">{counter}</span>
        <span className="text-[var(--text-muted)]">%</span>
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(var(--border) 1px, transparent 1px),
              linear-gradient(90deg, var(--border) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />

        {/* Corner accents */}
        <div className="absolute top-8 left-8 w-16 h-px bg-gradient-to-r from-[var(--primary)] to-transparent" />
        <div className="absolute top-8 left-8 w-px h-16 bg-gradient-to-b from-[var(--primary)] to-transparent" />
        <div className="absolute top-8 right-8 w-16 h-px bg-gradient-to-l from-[var(--secondary)] to-transparent" />
        <div className="absolute top-8 right-8 w-px h-16 bg-gradient-to-b from-[var(--secondary)] to-transparent" />
        <div className="absolute bottom-8 left-8 w-16 h-px bg-gradient-to-r from-[var(--accent)] to-transparent" />
        <div className="absolute bottom-8 left-8 w-px h-16 bg-gradient-to-t from-[var(--accent)] to-transparent" />
        <div className="absolute bottom-8 right-8 w-16 h-px bg-gradient-to-l from-[var(--primary)] to-transparent" />
        <div className="absolute bottom-8 right-8 w-px h-16 bg-gradient-to-t from-[var(--primary)] to-transparent" />
      </div>
    </div>
  );
}
