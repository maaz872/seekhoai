"use client";

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import type { MotionValue } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { pillars } from "@/content/content";

type Pillar = (typeof pillars)[number];

const TOTAL = pillars.length;

// Per-card scroll ranges [in_start, in_full, out_start, out_full] across scrollYProgress 0→1.
// Widened stable phases + tighter transition windows for a calmer scroll feel.
const CARD_RANGES: Array<[number, number, number, number]> = [
  [0.02, 0.08, 0.2, 0.26],
  [0.26, 0.32, 0.44, 0.5],
  [0.5, 0.56, 0.68, 0.74],
  [0.74, 0.8, 1.0, 1.01],
];

export function PillarsPinned() {
  const reduced = useReducedMotion();
  if (reduced === true) return <PillarsFallback />;
  return <PillarsScroll />;
}

function PillarsScroll() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Active index — useTransform breakpoints align with each card's stable phase, then round.
  const activeIndexMV = useTransform(
    scrollYProgress,
    [0, 0.14, 0.38, 0.62, 0.87, 1],
    [0, 0, 1, 2, 3, 3],
  );
  const [activeIndex, setActiveIndex] = useState(0);
  useMotionValueEvent(activeIndexMV, "change", (latest) => {
    const next = Math.round(latest);
    setActiveIndex((prev) => (prev === next ? prev : next));
  });

  const hintOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="pillars"
      className="relative h-[700vh] md:h-[800vh]"
    >
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        <BackgroundLayer />

        {/* Region 1: heading */}
        <div className="relative z-10 px-6 pb-8 pt-24 text-center">
          <div className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-accent-warm">
            [ THE FOUR PILLARS ]
          </div>
          <h2 className="font-display text-3xl font-bold text-text-primary md:text-5xl">
            Four skills. One journey.
          </h2>
        </div>

        {/* Region 2: card stage */}
        <div className="relative z-10 flex flex-1 items-center justify-center px-6">
          <div className="relative h-[60vh] max-h-[520px] w-full max-w-2xl">
            {pillars.map((p, i) => (
              <PillarCardSlide
                key={p.id}
                pillar={p}
                range={CARD_RANGES[i]}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>

        {/* Region 3: scroll hint */}
        <motion.div
          style={{ opacity: hintOpacity }}
          className="relative z-10 flex items-center justify-center gap-3 pb-8"
        >
          <span className="h-px w-10 bg-border-subtle" />
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-text-tertiary">
            SCROLL · CONTINUE
          </span>
          <span className="h-px w-10 bg-border-subtle" />
        </motion.div>

        {/* Side rail (md+) */}
        <SideRail activeIndex={activeIndex} />
      </div>
    </section>
  );
}

function PillarCardSlide({
  pillar,
  range,
  scrollYProgress,
}: {
  pillar: Pillar;
  range: [number, number, number, number];
  scrollYProgress: MotionValue<number>;
}) {
  const [is, ifull, os, ofull] = range;
  const opacity = useTransform(
    scrollYProgress,
    [is, ifull, os, ofull],
    [0, 1, 1, 0],
  );
  const y = useTransform(
    scrollYProgress,
    [is, ifull, os, ofull],
    [40, 0, 0, -40],
  );

  return (
    <motion.article
      style={{ opacity, y }}
      className="absolute inset-0 flex items-center justify-center"
    >
      <div className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-white/[0.10] bg-elevated/50 p-6 backdrop-blur-md md:p-12">
        {/* Warm radial glow, top-right */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255,107,53,0.22), transparent 70%)",
          }}
        />

        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <span className="rounded-full border border-border-subtle px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-text-secondary">
              [ PILLAR ]
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-text-tertiary">
              {pillar.id} / 0{TOTAL}
            </span>
          </div>

          <h3 className="mt-5 text-balance font-display text-4xl font-semibold text-text-primary md:text-6xl">
            {pillar.title}
          </h3>

          <p className="mt-3 text-lg font-medium text-accent-warm md:text-xl">
            {pillar.tagline}
          </p>

          <ul className="mt-6 space-y-3">
            {pillar.bullets.map((b) => (
              <li
                key={b}
                className="flex items-start gap-3 text-base text-text-secondary md:text-lg"
              >
                <span
                  aria-hidden
                  className="mt-2 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full"
                  style={{ backgroundColor: "var(--accent-warm)" }}
                />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.article>
  );
}

function SideRail({ activeIndex }: { activeIndex: number }) {
  return (
    <div className="pointer-events-none absolute right-6 top-1/2 z-10 hidden -translate-y-1/2 flex-col gap-4 md:right-10 md:flex">
      {pillars.map((p, i) => {
        const active = i === activeIndex;
        return (
          <div key={p.id} className="flex items-center gap-3">
            <span
              className={`font-mono text-xs uppercase tracking-[0.18em] transition-colors duration-200 ease-out ${
                active ? "text-text-primary" : "text-text-tertiary"
              }`}
            >
              {p.id}
            </span>
            <span
              className="block h-[10px] w-[10px] rounded-full border-[1.5px] transition-[transform,box-shadow,background-color] duration-200 ease-out"
              style={{
                borderColor: "var(--accent-warm)",
                backgroundColor: active ? "var(--accent-warm)" : "transparent",
                boxShadow: active ? "0 0 12px rgba(255,107,53,0.6)" : "none",
                transform: active ? "scale(1.2)" : "scale(1)",
              }}
            />
          </div>
        );
      })}
    </div>
  );
}

interface Particle {
  left: number;
  top: number;
  size: number;
  delay: number;
  duration: number;
}

const PARTICLE_COUNT = 15;

function makeParticles(): Particle[] {
  return Array.from({ length: PARTICLE_COUNT }, () => ({
    left: Math.random() * 100,
    top: 40 + Math.random() * 60,
    size: 3 + Math.random() * 2,
    delay: -Math.random() * 14,
    duration: 10 + Math.random() * 4,
  }));
}

function BackgroundLayer() {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const particles = useMemo<Particle[]>(
    () => (mounted ? makeParticles() : []),
    [mounted],
  );

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Mesh gradient — different positions than hero so it feels related but not duplicate */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 70% 50% at 85% 30%, rgba(255,107,53,0.22), transparent 55%),
            radial-gradient(ellipse 60% 60% at 12% 80%, rgba(74,158,255,0.16), transparent 60%),
            radial-gradient(ellipse 100% 80% at 50% 50%, rgba(255,176,132,0.04), transparent 70%)
          `,
        }}
      />

      {/* Rotating organic blob — smaller than hero's */}
      <motion.svg
        viewBox="0 0 600 600"
        width="600"
        height="600"
        className="absolute opacity-60"
        style={{
          right: "-120px",
          top: "50%",
          translateY: "-50%",
          filter: "blur(40px)",
        }}
        animate={reduced ? undefined : { rotate: 360 }}
        transition={
          reduced
            ? undefined
            : { duration: 90, repeat: Infinity, ease: "linear" }
        }
      >
        <path
          d="M300,60 C420,60 520,170 520,300 C520,430 420,540 300,540 C180,540 80,430 80,300 C80,170 180,60 300,60 Z"
          fill="#FF6B35"
          opacity="0.22"
        />
        <path
          d="M320,110 C440,130 510,250 490,360 C470,480 350,540 230,510 C130,480 80,360 110,250 C140,160 220,90 320,110 Z"
          fill="#4A9EFF"
          opacity="0.14"
        />
      </motion.svg>

      {/* Floating particles (CSS keyframe `drift` defined in globals.css) */}
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
            animation: reduced
              ? "none"
              : `drift ${p.duration}s ease-in-out ${p.delay}s infinite`,
            opacity: 0,
          }}
        />
      ))}
    </div>
  );
}

function PillarsFallback() {
  return (
    <section id="pillars" className="relative py-24 md:py-40">
      <div className="mx-auto max-w-3xl px-6 md:px-10">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-warm">
          [ THE FOUR PILLARS ]
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold text-text-primary md:text-5xl">
          Four skills. One journey.
        </h2>

        <div className="mt-12 space-y-6">
          {pillars.map((p) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-3xl border border-white/[0.10] bg-elevated/50 p-6 backdrop-blur-md md:p-10"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(255,107,53,0.22), transparent 70%)",
                }}
              />
              <div className="relative z-10">
                <span className="font-mono text-xs uppercase tracking-[0.18em] text-text-tertiary">
                  PILLAR {p.id} / 0{TOTAL}
                </span>
                <h3 className="mt-4 text-balance font-display text-3xl font-semibold text-text-primary md:text-5xl">
                  {p.title}
                </h3>
                <p className="mt-2 text-lg font-medium text-accent-warm">
                  {p.tagline}
                </p>
                <ul className="mt-5 space-y-2">
                  {p.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-3 text-base text-text-secondary md:text-lg"
                    >
                      <span
                        aria-hidden
                        className="mt-2 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full"
                        style={{ backgroundColor: "var(--accent-warm)" }}
                      />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
