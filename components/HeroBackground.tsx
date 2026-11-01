"use client";

import { useEffect, useRef, useState } from "react";

type Particle = { x: number; y: number; vx: number; vy: number; radius: number };

/** Decorative only: never intercepts hero links or enters the accessibility tree. */
export default function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const hero = canvas?.closest("section");
    const ctx = canvas?.getContext("2d");
    if (!canvas || !hero || !ctx) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let frame = 0;
    let previous = 0;
    let visible = false;
    let pointer: { x: number; y: number } | null = null;

    const draw = (seconds = 0) => {
      ctx.clearRect(0, 0, width, height);
      const range = width < 640 ? 110 : 155;
      for (const p of particles) {
        p.x += p.vx * seconds;
        p.y += p.vy * seconds;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
        p.x = Math.max(0, Math.min(width, p.x));
        p.y = Math.max(0, Math.min(height, p.y));
      }
      const connect = (a: { x: number; y: number }, b: { x: number; y: number }, opacity: number) => {
        const distance = Math.hypot(a.x - b.x, a.y - b.y);
        if (distance >= range) return;
        ctx.strokeStyle = `rgba(112,151,255,${(1 - distance / range) * opacity})`;
        ctx.lineWidth = 0.7;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      };
      particles.forEach((p, i) => {
        for (let j = i + 1; j < particles.length; j++) connect(p, particles[j], 0.26);
        if (pointer && seconds > 0) connect(p, pointer, 0.4);
        ctx.fillStyle = "rgba(142,173,255,0.58)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const tick = (now: number) => {
      frame = 0;
      if (previous === 0 || now - previous >= 1000 / 30) {
        draw(previous ? Math.min((now - previous) / 1000, 0.05) : 0);
        previous = now;
      }
      frame = requestAnimationFrame(tick);
    };
    const sync = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      previous = 0;
      pointer = null;
      draw();
      if (!paused && !motion.matches && visible && !document.hidden) frame = requestAnimationFrame(tick);
    };
    const resize = () => {
      const rect = hero.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      const count = Math.min(width < 640 ? 26 : 62, Math.max(16, Math.round(width * height / 18000)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width, y: Math.random() * height,
        vx: (Math.random() - 0.5) * 12, vy: (Math.random() - 0.5) * 12,
        radius: 0.8 + Math.random() * 0.8,
      }));
      sync();
    };
    const move = (event: PointerEvent) => {
      if (!finePointer.matches || motion.matches || paused) return;
      const rect = hero.getBoundingClientRect();
      pointer = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    };
    const leave = () => { pointer = null; };
    const resizeObserver = new ResizeObserver(resize);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    resize();
    resizeObserver.observe(hero);
    intersectionObserver.observe(hero);
    motion.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    hero.addEventListener("pointermove", move, { passive: true });
    hero.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      motion.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
      hero.removeEventListener("pointermove", move);
      hero.removeEventListener("pointerleave", leave);
    };
  }, [paused]);

  return <>
    <div className="hero-atmosphere" aria-hidden="true">
      <div className="hero-atmosphere-glow" />
      <div className="hero-atmosphere-grid" />
      <canvas ref={canvasRef} className="hero-atmosphere-particles" />
      <div className="hero-atmosphere-scrim" />
    </div>
    <button type="button" className="hero-motion-toggle focus-ring" aria-pressed={paused}
      onClick={() => setPaused(value => !value)}>
      {paused ? "Resume background motion" : "Pause background motion"}
    </button>
  </>;
}
