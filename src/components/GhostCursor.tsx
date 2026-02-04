import { useEffect, useRef, useState } from 'react';

export default function GhostCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const trails = useRef<{ x: number, y: number }[]>([]);
  const trailCount = 15;
  const lerp = 0.15;
  const trailLerp = 0.1;

  const [isHovering, setIsHovering] = useState(false);
  const hoverTarget = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Initialize trails - ensure we don't push duplicates on every hover change
    if (trails.current.length === 0) {
      for (let i = 0; i < trailCount; i++) {
        trails.current.push({ x: mouse.current.x, y: mouse.current.y });
      }
    } else {
      trails.current.length = trailCount;
    }

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('[data-cursor-hover]');
      if (target) {
        setIsHovering(true);
        hoverTarget.current = target as HTMLElement;
      } else {
        setIsHovering(false);
        hoverTarget.current = null;
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let targetX = mouse.current.x;
      let targetY = mouse.current.y;

      // Magnetic pull logic
      if (hoverTarget.current) {
        const rect = hoverTarget.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Blend mouse position with element center
        targetX = targetX * 0.3 + centerX * 0.7;
        targetY = targetY * 0.3 + centerY * 0.7;
      }

      // Interpolate main position
      pos.current.x += (targetX - pos.current.x) * lerp;
      pos.current.y += (targetY - pos.current.y) * lerp;

      // Draw trails
      let prev = pos.current;
      trails.current.forEach((t, i) => {
        t.x += (prev.x - t.x) * trailLerp;
        t.y += (prev.y - t.y) * trailLerp;

        const size = Math.max(0.1, (isHovering ? 20 : 12) * (1 - i / trailCount));
        const opacity = Math.max(0, (isHovering ? 0.2 : 0.4) * (1 - i / trailCount));

        ctx.beginPath();
        ctx.arc(t.x, t.y, size, 0, Math.PI * 2);
        ctx.fillStyle = isHovering ? `rgba(255, 51, 102, ${opacity})` : `rgba(0, 212, 255, ${opacity})`;
        ctx.fill();

        prev = t;
      });

      // Draw main dot / hollow ring
      ctx.beginPath();
      if (isHovering) {
        ctx.arc(pos.current.x, pos.current.y, 25, 0, Math.PI * 2);
        ctx.strokeStyle = '#FF3366';
        ctx.lineWidth = 2;
        ctx.stroke();
      } else {
        ctx.arc(pos.current.x, pos.current.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#00D4FF';
        ctx.fill();
      }

      requestAnimationFrame(animate);
    };

    const raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      cancelAnimationFrame(raf);
    };
  }, [isHovering]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[10000] mix-blend-screen"
    />
  );
}
