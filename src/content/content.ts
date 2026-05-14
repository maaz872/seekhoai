// All copy on the landing page reads from this file.
// Non-coders can safely edit strings here without touching component code.

export const brand = {
  name: "SeekhoAI",
  domain: "seekhoai.pk",
  course: "Complete AI Bootcamp",
  price: 499,
  priceAnchor: 799,
  studentsEnrolled: "24,318+",
  rating: "4.6",
  instructorName: "Saad A",
};

export const nav = {
  links: [
    { label: "Curriculum", href: "#curriculum" },
    { label: "Instructor", href: "#instructor" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ],
  cta: { label: "Enroll Now", href: "#pricing" },
};

export const hero = {
  eyebrow: "[ AI BOOTCAMP · LEARN AT YOUR PACE ]",
  headline: {
    line1: "Master AI.",
    line2: "Build the future.",
    accent: "Starting today.",
  },
  sub: "Join 24,318+ students learning Prompt Engineering, ChatGPT, MidJourney, and Vibe Coding from one of the world's top-rated AI instructors. Self-paced. Lifetime access.",
  ctas: {
    primary: { label: "Enroll Now — $499", href: "#pricing" },
    secondary: { label: "Watch the trailer", href: "#trailer" },
  },
  emailForm: {
    placeholder: "you@example.com",
    submit: "Get the free first lesson →",
    success: "Check your inbox — your first lesson is on the way.",
  },
  trustStrip: {
    rating: "4.6 / 5",
    students: "24,318+ students",
    featured: "Featured on Udemy",
  },
};

export const socialProof = {
  labels: [
    "Udemy",
    "Coursera",
    "Product Hunt",
    "IndieHackers",
    "Pakistan Tech Summit",
  ],
  caption: "AS FEATURED ON",
};

export const pillars = [
  {
    id: "01",
    title: "Prompt Engineering",
    tagline: "The foundation of every AI workflow",
    description:
      "Write prompts that ship. From zero-shot to chain-of-thought, learn the patterns top AI engineers use to extract reliable, production-grade output.",
    bullets: [
      "Master zero-shot, few-shot, and chain-of-thought patterns",
      "Build a reusable prompt library for your work",
      "Debug and improve prompts systematically",
      "Extract reliable, production-grade output",
    ],
  },
  {
    id: "02",
    title: "ChatGPT Mastery",
    tagline: "From casual user to power user",
    description:
      "Move beyond casual use. Build custom GPTs, automate workflows, and turn ChatGPT into a force-multiplier for your work and business.",
    bullets: [
      "Build Custom GPTs end-to-end for specific workflows",
      "Automate routine tasks with ChatGPT and APIs",
      "Move from casual prompts to power-user workflows",
      "Turn ChatGPT into a force-multiplier for your work",
    ],
  },
  {
    id: "03",
    title: "MidJourney & Visual AI",
    tagline: "Generate brand-grade visuals on demand",
    description:
      "Generate brand-grade visuals on demand. Master parameters, style references, and the full creative pipeline from prompt to print.",
    bullets: [
      "Master MidJourney parameters and the syntax cheat sheet",
      "Use style references for consistent visual identity",
      "Compose brand-grade output with intentional light and color",
      "Run the full pipeline from brief to print-ready delivery",
    ],
  },
  {
    id: "04",
    title: "Vibe Coding",
    tagline: "Ship software without an engineering team",
    description:
      "Build real software with AI as your co-pilot. Cursor, Claude Code, and the new way to ship products without a traditional engineering team.",
    bullets: [
      "Set up Cursor and Claude Code as your dev environment",
      "Ship full features by directing the AI, not typing every line",
      "Read AI-written code critically and catch its mistakes",
      "Deploy to the web in an afternoon, solo",
    ],
  },
];

export const curriculum = {
  title: "6 modules. 60+ lessons. 1 transformation.",
  subtitle:
    "Most students finish in 4–6 weeks at ~3 hours/week. You set the pace.",
  modules: [
    {
      number: "01",
      title: "AI Foundations & Mental Models",
      lessons: [
        "How modern AI actually works (no math required)",
        "The capability ladder — what LLMs can and can't do",
        "Picking the right tool for the right job",
        "Setting up your AI workspace",
        "Costs, limits, and how to think about pricing",
      ],
    },
    {
      number: "02",
      title: "Prompt Engineering Deep Dive",
      lessons: [
        "The anatomy of a high-leverage prompt",
        "Zero-shot, few-shot, chain-of-thought patterns",
        "Roleplay, persona, and constraint techniques",
        "Iterating: from rough draft to production prompt",
        "Building your personal prompt library",
        "Evaluating prompt quality at scale",
      ],
    },
    {
      number: "03",
      title: "ChatGPT, Custom GPTs & Automation",
      lessons: [
        "ChatGPT power-user workflows",
        "Building Custom GPTs end-to-end",
        "Hooking GPTs to your own data and APIs",
        "Automation with Zapier + ChatGPT",
        "Voice, vision, and the multimodal stack",
      ],
    },
    {
      number: "04",
      title: "MidJourney & Generative Visuals",
      lessons: [
        "MidJourney syntax and the parameter cheat sheet",
        "Style references and consistent character work",
        "Brand-grade output: composition, color, lighting",
        "Upscaling, editing, and print prep",
        "The full creative pipeline from brief to delivery",
      ],
    },
    {
      number: "05",
      title: "Vibe Coding — Building with Cursor & Claude",
      lessons: [
        "Setting up Cursor and Claude Code",
        "The new development loop: prompt, review, ship",
        "Building a full feature without writing it yourself",
        "Reading code AI writes — and catching its mistakes",
        "Deploying to the web in one afternoon",
      ],
    },
    {
      number: "06",
      title: "Capstone — Ship Your First AI Product",
      lessons: [
        "Picking a problem worth solving",
        "Scoping a one-week build",
        "Building, testing, and shipping your project",
        "Personalized written feedback from Saad",
        "Going public: launching on social and IndieHackers",
      ],
    },
  ],
};

export const whoFor = {
  title: "Built for ambitious learners.",
  groups: [
    {
      label: "Beginners",
      body: "You've heard about AI everywhere and you're tired of being on the sidelines. This bootcamp gives you a real foundation — no math, no jargon, just usable skill.",
      outcomes: [
        "Speak fluent AI without faking it",
        "Build your first real project",
        "Know which tool fits which job",
      ],
    },
    {
      label: "Professionals",
      body: "You want to use AI to be 3× better at your job. We focus on workflows: how to actually plug AI into the work you already do as a marketer, writer, designer, or analyst.",
      outcomes: [
        "Save 10+ hours a week on routine work",
        "Build custom GPTs for your team",
        "Automate the boring parts of your role",
      ],
    },
    {
      label: "Founders",
      body: "You want to ship products without a 10-person engineering team. Vibe Coding + AI workflows are how solo and small teams now compete with funded startups.",
      outcomes: [
        "Build and ship without hiring engineers",
        "Run lean using AI across product, design, and ops",
        "Validate ideas in days, not quarters",
      ],
    },
  ],
};

export const instructor = {
  name: "Saad A",
  title: "AI Expert Instructor · Founder, SeekhoAI",
  bio: "Saad is a Pakistani AI educator who has taught 24,318+ students worldwide on Udemy, holding a 4.6★ average rating across his courses. He's the founder of SeekhoAI and DeepLearnHQ, and has spent the last five years helping students and professionals across South Asia and beyond actually use AI — not just talk about it. He's built four AI products and writes about applied AI for working people.",
  stats: [
    { value: "24,318+", label: "students" },
    { value: "4.6★", label: "avg rating" },
    { value: "5+", label: "years teaching" },
    { value: "4", label: "AI products built" },
  ],
};

export const testimonials = [
  {
    quote:
      "I was using ChatGPT for casual stuff. After this bootcamp I built a Custom GPT that handles my entire content workflow at the agency. My team thinks I'm a wizard now.",
    name: "Hira S.",
    role: "Marketing Lead",
    location: "Lahore, Pakistan",
  },
  {
    quote:
      "The Vibe Coding module is unreal. I shipped a full MVP for my SaaS in nine days. As a non-engineer founder, this is the most valuable course I've ever taken.",
    name: "Daniel R.",
    role: "Founder, Indie SaaS",
    location: "Austin, USA",
  },
  {
    quote:
      "Saad teaches the way I wish more people did — practical, no fluff, and you feel like he's actually in the room with you. The prompt library alone is worth the price.",
    name: "Bilal K.",
    role: "Product Designer",
    location: "Karachi, Pakistan",
  },
  {
    quote:
      "I came in skeptical. I'm a journalist, not a tech person. By module 3 I was using AI to draft entire investigative outlines. It changed how I work.",
    name: "Anika P.",
    role: "Journalist",
    location: "Mumbai, India",
  },
];

export const pricing = {
  eyebrow: "THE COMPLETE BOOTCAMP",
  title: "One price. Everything included.",
  priceAnchor: 799,
  price: 499,
  priceNote: "One-time payment. Lifetime access.",
  cta: { label: "Enroll Now — $499", action: "openCheckout" },
  includes: [
    "60+ video lessons across all 4 pillars",
    "Lifetime access — learn at your own pace",
    "Downloadable prompt library, templates & cheat sheets",
    "Capstone project with personalized written feedback",
    "Private student community (Discord)",
    "Verified certificate of completion",
    "All future course updates included",
    "7-day no-questions-asked refund",
  ],
};

export const faq = [
  {
    q: "Is this for absolute beginners?",
    a: "Yes. Module 1 starts from zero — no math, no coding required. If you can use a web browser, you can take this course. We deliberately built the early modules so a complete beginner and a technical professional can both get value.",
  },
  {
    q: "How much time per week?",
    a: "Plan for about 3 hours per week. The whole bootcamp is self-paced — binge it in a weekend, stretch it over months, or come back to it whenever. Lifetime access means there's no deadline.",
  },
  {
    q: "What if I fall behind?",
    a: "There's no cohort and no deadline. The Complete AI Bootcamp is fully self-paced — you start when you want, you finish when you want, and you keep access for life.",
  },
  {
    q: "Do you offer refunds?",
    a: "Yes — 7-day no-questions-asked refund. Try the first two modules, and if the course isn't for you, email us within seven days for a full refund.",
  },
  {
    q: "Is the certificate recognized?",
    a: "You receive a verified SeekhoAI certificate of completion. It's not a university degree, but it works the way a great Udemy or Coursera certificate works — proof of skill that you can attach to a LinkedIn profile or résumé.",
  },
  {
    q: "Can I pay in PKR?",
    a: "Yes. Pakistani students can pay via JazzCash or Easypaisa in PKR — email us at hello@seekhoai.pk after enrollment and we'll send local payment instructions and a discount adjustment for currency differences.",
  },
  {
    q: "Do I need a powerful computer?",
    a: "No. Everything runs in the browser — ChatGPT, MidJourney, Cursor (which works on any modern laptop), and Claude. A basic laptop with a stable internet connection is all you need.",
  },
  {
    q: "What happens after I finish?",
    a: "Lifetime access stays. You keep the videos, prompt libraries, community, and every future update we ship — at no extra cost. Many students dip back in months later as new modules launch.",
  },
];

export const finalCTA = {
  title: "The future doesn't wait. Build with it.",
  body: "Join 24,318+ students. Master AI. Ship real work.",
  cta: { label: "Enroll Now — $499", action: "openCheckout" },
};

export const footer = {
  tagline: "Practical AI education for the people building tomorrow.",
  columns: [
    {
      heading: "Course",
      links: [
        { label: "Curriculum", href: "#curriculum" },
        { label: "Pricing", href: "#pricing" },
        { label: "Enroll", href: "#pricing" },
        { label: "FAQ", href: "#faq" },
      ],
    },
    {
      heading: "Company",
      links: [
        { label: "About", href: "#instructor" },
        { label: "DeepLearnHQ", href: "#" },
        { label: "Contact", href: "mailto:hello@seekhoai.pk" },
      ],
    },
    {
      heading: "Resources",
      links: [
        { label: "Free first lesson", href: "#hero" },
        { label: "Prompt library", href: "#" },
        { label: "Blog", href: "#" },
      ],
    },
    {
      heading: "Legal",
      links: [
        { label: "Terms", href: "#" },
        { label: "Privacy", href: "#" },
        { label: "Refund policy", href: "#" },
      ],
    },
  ],
  copyright: "© 2026 SeekhoAI. All rights reserved.",
};

export const popup = {
  eyebrow: "WAIT — BEFORE YOU GO",
  title: "Ready to start your AI journey?",
  bodyBefore: "Use code",
  code: "AI20",
  bodyAfter:
    "at checkout for 20% off the Complete AI Bootcamp. That's $499 →",
  discountedDisplay: "$399.20",
  bodyEnd: "One-time payment. Lifetime access.",
  primaryCta: "Claim My 20% Off →",
  dismissCta: "No thanks, I'll pay full price",
  cardEyebrow: "EXCLUSIVE OFFER",
  cardHero: "20% OFF",
  cardCodeLabel: "Use code",
};
