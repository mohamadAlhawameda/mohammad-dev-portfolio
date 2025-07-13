'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  radius: number;
  dx: number;
  dy: number;
  opacity: number;
  hue: number;
}

type SparklesProps = {
  background?: string;
  particleColor?: string;
  particleDensity?: number;
  minSize?: number;
  maxSize?: number;
  trail?: boolean;
  mouseInteractive?: boolean;
  className?: string;
};

export const SparklesCore = ({
  background = 'transparent',
  particleColor = '#3b82f6',
  particleDensity = 90,
  minSize = 0.5,
  maxSize = 1.8,
  trail = true,
  mouseInteractive = true,
  className = '',
}: SparklesProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    const numParticles = (width * height) / particleDensity;

    const particles: Particle[] = Array.from({ length: numParticles }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * (maxSize - minSize) + minSize,
      dx: (Math.random() - 0.5) * 0.5,
      dy: (Math.random() - 0.5) * 0.5,
      opacity: Math.random(),
      hue: Math.floor(Math.random() * 360),
    }));

    let mouseX = -1000, mouseY = -1000;

    const animate = () => {
      if (!ctx) return;

      if (!trail) {
        ctx.clearRect(0, 0, width, height);
      } else {
        ctx.fillStyle = `rgba(0, 0, 0, 0.05)`;
        ctx.fillRect(0, 0, width, height);
      }

      particles.forEach((p) => {
        // optional mouse interaction
        if (mouseInteractive) {
          const dx = p.x - mouseX;
          const dy = p.y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            p.x += dx / dist;
            p.y += dy / dist;
          }
        }

        p.x += p.dx;
        p.y += p.dy;

        // bounce
        if (p.x < 0 || p.x > width) p.dx *= -1;
        if (p.y < 0 || p.y > height) p.dy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 100%, 70%, ${p.opacity})`;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    if (mouseInteractive) {
      canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
      });
    }

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [particleColor, particleDensity, minSize, maxSize, trail, mouseInteractive]);

  return (
    <div className={`relative w-full h-full ${className}`} style={{ background }}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};
