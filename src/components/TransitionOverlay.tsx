import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function TransitionOverlay() {
    const overlayRef = useRef<HTMLDivElement>(null);
    const streaksRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // This component will be controlled by global GSAP events
        const onTransition = (e: any) => {
            const { type } = e.detail;

            if (type === 'shatter') {
                gsap.to(overlayRef.current, {
                    opacity: 1,
                    duration: 0.1,
                    onComplete: () => {
                        gsap.to(overlayRef.current, { opacity: 0, duration: 0.8, ease: 'expo.out' });
                    }
                });
            }

            if (type === 'lightspeed') {
                gsap.fromTo(streaksRef.current,
                    { opacity: 0, x: '-100%' },
                    { opacity: 1, x: '100%', duration: 0.8, ease: 'power4.inOut' }
                );
            }
        };

        window.addEventListener('section-transition', onTransition);
        return () => window.removeEventListener('section-transition', onTransition);
    }, []);

    return (
        <>
            {/* Shatter Flash */}
            <div
                ref={overlayRef}
                className="fixed inset-0 bg-white pointer-events-none z-[80] opacity-0 mix-blend-overlay"
            />

            {/* Motion Streaks */}
            <div
                ref={streaksRef}
                className="fixed inset-0 pointer-events-none z-[80] opacity-0 flex items-center"
            >
                <div className="w-full h-1 bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent blur-sm" />
                <div className="absolute top-1/3 w-full h-px bg-[var(--secondary)] opacity-50" />
                <div className="absolute top-2/3 w-full h-px bg-[var(--primary)] opacity-50" />
            </div>
        </>
    );
}
