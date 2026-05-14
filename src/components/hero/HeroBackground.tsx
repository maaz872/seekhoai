"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

const PARTICLE_COUNT = 22;

interface Particle {
  left: number;
  top: number;
  size: number;
  delay: number;
  duration: number;
}

function makeParticles(): Particle[] {
  return Array.from({ length: PARTICLE_COUNT }, () => ({
    left: Math.random() * 100,
    top: 40 + Math.random() * 60, // start in lower portion so drift-up reads
    size: 3 + Math.random() * 2,
    delay: -Math.random() * 14, // negative so they start mid-animation
    duration: 10 + Math.random() * 4,
  }));
}

export function HeroBackground() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Generate particles once on mount — random positions stay stable across re-renders
  const particles = useMemo<Particle[]>(() => (mounted ? makeParticles() : []), [mounted]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* (a) Mesh gradient */}
      <div className="hero-mesh absolute inset-0" />

      {/* (b) Animated SVG blobs — offset right, blurred into glow */}
      <motion.svg
        viewBox="0 0 720 720"
        width="720"
        height="720"
        className="absolute"
        style={{
          right: "-160px",
          top: "50%",
          translateY: "-50%",
          filter: "blur(50px)",
        }}
        animate={reducedMotion ? undefined : { rotate: 360 }}
        transition={
          reducedMotion ? undefined : { duration: 70, repeat: Infinity, ease: "linear" }
        }
      >
        <path
          d="M360,80 C500,80 620,200 620,360 C620,520 500,640 360,640 C220,640 80,520 80,360 C80,200 220,80 360,80 Z"
          fill="#FF6B35"
          opacity="0.22"
        />
        <path
          d="M380,140 C520,160 600,290 580,420 C560,560 420,640 280,600 C160,560 100,420 140,290 C180,180 260,120 380,140 Z"
          fill="#4A9EFF"
          opacity="0.14"
        />
      </motion.svg>

      {/* (c) Floating particles */}
      {particles.map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: "rgba(255, 176, 132, 0.35)",
            boxShadow: "0 0 8px rgba(255, 176, 132, 0.6)",
            animation: reducedMotion
              ? "none"
              : `drift ${p.duration}s ease-in-out ${p.delay}s infinite`,
            opacity: 0,
          }}
        />
      ))}
    </div>
  );
}
