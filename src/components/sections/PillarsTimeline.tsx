"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { pillars } from "@/content/content";

export function PillarsTimeline() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start end", "end start"],
  });

  const scrollScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="pillars" className="relative py-24 md:py-40">
      <div className="mx-auto max-w-4xl px-6 md:px-10">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">[ THE FOUR PILLARS ]</p>
          <h2 className="mt-4 font-display text-display-lg font-medium">
            What you&apos;ll master.
          </h2>
          <p className="mt-5 text-lg text-text-secondary">
            Four skills, in order. Each one builds on the last. Together they
            take you from beginner to builder.
          </p>
        </Reveal>

        <div ref={wrapperRef} className="relative mt-16 md:mt-20">
          <motion.div
            aria-hidden
            className="absolute bottom-0 left-6 top-0 w-[2px] md:left-8"
            style={{
              background:
                "linear-gradient(to bottom, transparent 0%, var(--accent-warm) 30%, var(--accent-warm) 70%, transparent 100%)",
              scaleY: reduced ? 1 : scrollScaleY,
              transformOrigin: "top",
            }}
          />

          <ol className="relative space-y-12 md:space-y-20">
            {pillars.map((p, index) => (
              <motion.li
                key={p.id}
                initial={reduced ? { opacity: 0 } : { opacity: 0, x: -32 }}
                whileInView={reduced ? { opacity: 1 } : { opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                  delay: index * 0.1,
                }}
                className="group relative"
              >
                {/* Marker */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute left-4 top-6 z-10 flex h-[18px] w-[18px] items-center justify-center rounded-full border-2 shadow-[0_0_14px_rgba(255,107,53,0.55)] transition-[transform,box-shadow] duration-[220ms] ease-out group-hover:scale-[1.15] group-hover:shadow-[0_0_24px_rgba(255,107,53,0.85)] md:left-6 md:top-10"
                  style={{
                    borderColor: "var(--accent-warm)",
                    backgroundColor: "var(--bg-base)",
                  }}
                >
                  <motion.span
                    className="block h-[7px] w-[7px] rounded-full"
                    style={{ backgroundColor: "var(--accent-warm)" }}
                    animate={reduced ? undefined : { scale: [1, 1.12, 1] }}
                    transition={
                      reduced
                        ? undefined
                        : {
                            duration: 2.4,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }
                    }
                  />
                </div>

                {/* Card */}
                <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-elevated/40 p-6 pl-16 backdrop-blur-sm transition-colors duration-[220ms] ease-out group-hover:border-accent-warm/40 group-hover:bg-elevated/60 md:p-10 md:pl-24">
                  <span
                    aria-hidden
                    className="pointer-events-none absolute right-4 top-0 select-none font-display text-[180px] font-bold leading-none text-accent-warm opacity-10 transition-opacity duration-[220ms] ease-out group-hover:opacity-[0.16] md:text-[240px]"
                  >
                    {p.id}
                  </span>

                  <div className="relative z-10">
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-text-tertiary">
                      PILLAR {p.id}
                    </p>
                    <h3 className="mt-3 font-display text-3xl font-semibold text-text-primary md:text-5xl">
                      {p.title}
                    </h3>
                    <p className="mt-4 max-w-[52ch] text-base text-text-secondary md:text-lg">
                      {p.description}
                    </p>
                  </div>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
