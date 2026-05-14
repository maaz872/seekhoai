import { socialProof } from "@/content/content";

export function SocialProof() {
  // Duplicate for seamless marquee loop
  const items = [...socialProof.labels, ...socialProof.labels];

  return (
    <section className="border-y border-border-subtle bg-base/50 py-10 md:py-12">
      <div className="container-content">
        <p className="text-center font-mono text-[0.7rem] uppercase tracking-[0.22em] text-text-tertiary">
          {socialProof.caption}
        </p>
      </div>
      <div className="mt-6 overflow-hidden">
        <div className="flex w-max animate-marquee gap-16 px-16">
          {items.map((label, i) => (
            <span
              key={i}
              className="whitespace-nowrap font-display text-2xl font-medium text-text-secondary/50"
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
