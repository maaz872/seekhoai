"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion-presets";

const MiniScene = dynamic(
  () => import("@/components/three/MiniScene").then((m) => m.MiniScene),
  { ssr: false, loading: () => null },
);

interface Props {
  id: string;
  title: string;
  description: string;
  geometry: "torus" | "icosahedron" | "dodecahedron" | "octahedron";
}

export function PillarCard({ id, title, description, geometry }: Props) {
  return (
    <motion.div
      variants={fadeUp}
      className="group relative flex flex-col gap-6 overflow-hidden rounded-3xl border border-border-subtle bg-elevated/60 p-8 backdrop-blur-sm transition-colors duration-300 hover:border-accent-warm-2/40 md:p-10"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 size-40 bg-radial-warm opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      <div className="flex items-center justify-between">
        <span className="font-mono text-xs uppercase tracking-[0.18em] text-text-tertiary">
          PILLAR {id}
        </span>
        <div className="size-[120px]">
          <MiniScene kind={geometry} />
        </div>
      </div>

      <div>
        <h3 className="font-display text-display-md font-medium text-text-primary">{title}</h3>
        <p className="mt-4 text-base text-text-secondary">{description}</p>
      </div>
    </motion.div>
  );
}
