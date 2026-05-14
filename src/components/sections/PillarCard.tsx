"use client";

import { motion } from "framer-motion";

interface Props {
  id: string;
  title: string;
  description: string;
  index: number;
}

export function PillarCard({ id, title, description, index }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="relative min-h-[320px] overflow-hidden rounded-2xl border border-white/[0.08] bg-elevated/40 p-6 backdrop-blur-sm md:p-10"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute right-6 top-4 select-none font-display text-[200px] font-bold leading-none text-accent-warm opacity-[0.15]"
      >
        {id}
      </span>

      <div className="relative z-10 flex h-full flex-col">
        <span className="font-mono text-xs uppercase tracking-[0.18em] text-text-tertiary">
          PILLAR {id}
        </span>

        <div className="mt-auto pt-12">
          <h3 className="text-balance font-display text-3xl font-semibold text-text-primary md:text-4xl">
            {title}
          </h3>
          <p className="mt-4 text-base text-text-secondary md:text-lg">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
