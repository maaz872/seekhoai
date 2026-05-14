"use client";

import { Reveal } from "@/components/motion/Reveal";
import { pillars } from "@/content/content";
import { PillarCard } from "./PillarCard";

export function Pillars() {
  return (
    <section id="pillars" className="relative py-24 md:py-40">
      <div className="container-content">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">[ THE FOUR PILLARS ]</p>
          <h2 className="mt-4 font-display text-display-lg font-medium">
            What you'll master.
          </h2>
          <p className="mt-5 text-lg text-text-secondary">
            Four interlocking skill sets. Each one is enough to change your work.
            Together, they change your career.
          </p>
        </Reveal>

        <Reveal stagger className="mt-16 grid grid-cols-1 gap-6 md:mt-20 md:grid-cols-2 md:gap-8">
          {pillars.map((p) => (
            <PillarCard
              key={p.id}
              id={p.id}
              title={p.title}
              description={p.description}
            />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
