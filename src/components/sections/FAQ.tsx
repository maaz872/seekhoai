"use client";

import { Reveal } from "@/components/motion/Reveal";
import { Accordion } from "@/components/ui/Accordion";
import { faq } from "@/content/content";

export function FAQ() {
  const items = faq.map((f, i) => ({
    id: `faq-${i}`,
    title: f.q,
    body: <p className="text-base text-text-secondary">{f.a}</p>,
  }));

  return (
    <section
      id="faq"
      className="relative py-24 md:py-40"
      style={{ contentVisibility: "auto", containIntrinsicSize: "800px 1200px" }}
    >
      <div className="container-content">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">[ FAQ ]</p>
          <h2 className="mt-4 font-display text-display-lg font-medium">
            Questions, answered.
          </h2>
        </Reveal>

        <Reveal className="mx-auto mt-16 max-w-3xl md:mt-20">
          <Accordion items={items} />
        </Reveal>
      </div>
    </section>
  );
}
