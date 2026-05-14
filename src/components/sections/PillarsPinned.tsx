"use client";

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import type { MotionValue } from "framer-motion";
import { useRef, useState } from "react";
import { pillars } from "@/content/content";

type Pillar = (typeof pillars)[number];

const TOTAL = pillars.length;

// [in_start, in_full, out_start, out_full] per card across scrollYProgress 0→1.
const CARD_RANGES: Array<[number, number, number, number]> = [
  [-0.01, 0.0, 0.22, 0.28],
  [0.22, 0.28, 0.47, 0.53],
  [0.47, 0.53, 0.72, 0.78],
  [0.72, 0.78, 1.0, 1.01],
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

  const [activeIndex, setActiveIndex] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const next =
      latest < 0.28 ? 0 : latest < 0.53 ? 1 : latest < 0.78 ? 2 : 3;
    setActiveIndex((prev) => (prev === next ? prev : next));
  });

  const hintOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="pillars"
      className="relative h-[400vh] md:h-[500vh]"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Heading */}
        <header className="absolute left-1/2 top-[14vh] z-10 w-full -translate-x-1/2 px-6 text-center md:px-10">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent-warm">
            [ THE FOUR PILLARS ]
          </p>
          <h2 className="mt-3 font-display text-display-lg font-medium text-text-primary">
            Four skills. One journey.
          </h2>
        </header>

        {/* Card stage */}
        <div className="flex h-full items-center justify-center px-6 md:px-10">
          <div className="relative h-[50vh] w-full max-w-2xl">
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

        {/* Scroll hint */}
        <motion.div
          style={{ opacity: hintOpacity }}
          className="absolute bottom-[5vh] left-1/2 z-10 flex -translate-x-1/2 items-center gap-3"
        >
          <span className="h-px w-12 bg-border-subtle" />
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-text-tertiary">
            SCROLL ↓ CONTINUE
          </span>
          <span className="h-px w-12 bg-border-subtle" />
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

function PillarsFallback() {
  return (
    <section id="pillars" className="relative py-24 md:py-40">
      <div className="mx-auto max-w-3xl px-6 md:px-10">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent-warm">
          [ THE FOUR PILLARS ]
        </p>
        <h2 className="mt-3 font-display text-display-lg font-medium text-text-primary">
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
