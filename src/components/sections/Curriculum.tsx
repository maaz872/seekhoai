"use client";

import { Reveal } from "@/components/motion/Reveal";
import { Accordion } from "@/components/ui/Accordion";
import { curriculum } from "@/content/content";

export function Curriculum() {
  const items = curriculum.modules.map((m) => ({
    id: m.number,
    number: `MODULE ${m.number}`,
    title: m.title,
    body: (
      <ul className="space-y-2.5 text-text-secondary">
        {m.lessons.map((lesson, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="mt-2 inline-block size-1 shrink-0 rounded-full bg-accent-warm" />
            <span className="text-base">{lesson}</span>
          </li>
        ))}
      </ul>
    ),
  }));

  return (
    <section id="curriculum" className="relative py-24 md:py-40">
      <div className="container-content">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">[ THE CURRICULUM ]</p>
          <h2 className="mt-4 font-display text-display-lg font-medium">
            {curriculum.title}
          </h2>
          <p className="mt-5 text-lg text-text-secondary">{curriculum.subtitle}</p>
        </Reveal>

        <Reveal className="mt-16 md:mt-20">
          <Accordion items={items} defaultOpen="01" />
        </Reveal>
      </div>
    </section>
  );
}
