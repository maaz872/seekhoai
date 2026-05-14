"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion-presets";

interface Props {
  id: string;
  title: string;
  description: string;
}

export function PillarCard({ id, title, description }: Props) {
  return (
    <motion.div
      variants={fadeUp}
      className="group relative flex min-h-[320px] flex-col gap-6 overflow-hidden rounded-3xl border border-border-subtle bg-elevated/60 p-8 backdrop-blur-sm transition-colors duration-300 hover:border-accent-warm-2/40 md:p-10"
    >
      {/* Editorial big number */}
      <span
        aria-hidden
        className="pointer-events-none absolute right-6 top-4 select-none font-display text-[200px] font-bold leading-none text-accent-warm opacity-[0.15]"
      >
        {id}
      </span>

      {/* Hover glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 size-40 bg-radial-warm opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      <div className="relative z-10 flex items-center justify-between">
        <span className="font-mono text-xs uppercase tracking-[0.18em] text-text-tertiary">
          PILLAR {id}
        </span>
      </div>

      <div className="relative z-10 mt-auto">
        <h3 className="text-balance font-display text-display-md font-medium text-text-primary">
          {title}
        </h3>
        <p className="mt-4 text-base text-text-secondary">{description}</p>
      </div>
    </motion.div>
  );
}
