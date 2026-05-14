# SeekhoAI Landing — Complete AI Bootcamp

A single-page, 3D-first marketing site for the **Complete AI Bootcamp** by SeekhoAI.

- **Framework:** Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **3D:** Three.js via `@react-three/fiber` + `drei` + `postprocessing`
- **Motion:** Framer Motion + Lenis smooth scroll
- **Mock APIs:** `/api/email` and `/api/checkout` (no real Stripe yet — easy to swap in)

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build (also runs type-check + lint)
npm run start   # serve the production build locally
```

## Editing copy (no code required)

**All page copy lives in one file:** `src/content/content.ts`.

Open it in any text editor. You can safely change:

- Hero headline, sub, eyebrow, CTA labels
- Pillar titles and descriptions
- Curriculum modules and lesson titles
- Instructor bio and stats
- Testimonials
- Pricing items
- FAQ questions and answers
- Footer columns and links
- Discount popup copy

Save the file. Refresh the browser. Done.

> **Don't edit other files** unless you know React. The component files only handle layout and behavior — text is always pulled from `content.ts`.

## What's mocked (and how to swap in real services)

### Email signup (`/api/email`)

Currently logs the email server-side and returns success. To swap in **Resend**:

1. `npm i resend`
2. Add `RESEND_API_KEY` to `.env.local` (and Vercel env vars).
3. Open `src/app/api/email/route.ts` — follow the commented swap-in block at the top.

### Stripe checkout (`/api/checkout`)

Currently waits 1 second and returns a fake session ID. To swap in **real Stripe Checkout**:

1. `npm i stripe`
2. Add `STRIPE_SECRET_KEY` and `NEXT_PUBLIC_SITE_URL` to env.
3. Open `src/app/api/checkout/route.ts` — follow the commented Stripe block.
4. The Checkout modal currently shows a confetti success in-page. Replace it with `window.location = session.url` to redirect to Stripe-hosted Checkout, OR keep the modal as a confirmation step.

### Discount popup

Fully working. Triggers on first of:

- 35 seconds elapsed
- 60% scroll depth
- Exit intent (desktop only)

Show-once gating uses `sessionStorage`. To re-trigger in dev:

```js
// In the browser console:
window.__resetPopup()
// then refresh
```

Applying `AI20` flows through React Context to the Pricing section and Checkout modal — discount of 20% off ($499 → $399.20).

## Project structure

```
src/
├── app/
│   ├── layout.tsx            ← fonts, providers, metadata
│   ├── page.tsx              ← the single landing page
│   ├── globals.css
│   └── api/                  ← mock backend
│       ├── email/route.ts
│       └── checkout/route.ts
├── components/
│   ├── nav/                  ← Nav + MobileMenu
│   ├── hero/                 ← Hero + HeroScene (R3F)
│   ├── three/                ← shared 3D primitives
│   ├── sections/             ← Pillars, Curriculum, FAQ, Pricing, etc.
│   ├── checkout/             ← CheckoutModal, SuccessState
│   ├── forms/                ← EmailCaptureForm, CheckoutForm
│   ├── popup/                ← DiscountPopup + 3D CouponScene
│   ├── motion/               ← LenisProvider, Reveal wrappers
│   └── ui/                   ← Button, Input, Accordion
├── content/content.ts        ← ALL copy
├── context/CouponContext.tsx ← global coupon state
├── lib/
│   ├── cn.ts                 ← clsx + tailwind-merge helper
│   └── motion-presets.ts
└── styles/tokens.css         ← CSS variables (design tokens)
```

## Push to GitHub

```bash
git init
git add .
git commit -m "feat: initial scaffold of SeekhoAI landing page"

# Option A — using the gh CLI (recommended):
gh repo create seekhoai-landing --public --source=. --remote=origin --push

# Option B — manually:
# 1. Create an empty repo at https://github.com/new (name: seekhoai-landing)
# 2. Then run:
git remote add origin git@github.com:<your-username>/seekhoai-landing.git
git branch -M main
git push -u origin main
```

## Deploy

See [`DEPLOY.md`](./DEPLOY.md).

## Accessibility

- All buttons + inputs have visible focus rings.
- All form fields have labels (visually hidden where the design hides them).
- All 3D canvases are `aria-hidden="true"`; critical info (price, code) is always duplicated in DOM.
- `prefers-reduced-motion` disables Lenis smooth scroll, 3D auto-rotation, popup motion, and sparkle pulses.

## Performance notes

- 3D canvases are dynamically imported with `ssr: false`.
- DPR is clamped to `[1, 1.5]` everywhere.
- On mobile (`max-width: 768px`), the hero scene drops postprocessing, reduces particle count to 200, and the popup loses idle bobbing/auto-rotation.
- `transpilePackages: ['three']` is enabled in `next.config.mjs` to handle Three's ESM quirks.

## Next 5 things to do

1. **Swap in the real instructor photo** — replace the placeholder gradient in `src/components/sections/Instructor.tsx` with a `next/image`.
2. **Hook up real email** — `npm i resend`, see `src/app/api/email/route.ts`.
3. **Hook up real Stripe** — `npm i stripe`, see `src/app/api/checkout/route.ts`.
4. **Add the custom domain** in Vercel → Settings → Domains (`seekhoai.pk`).
5. **Design a proper OG image** at 1200×630, drop it at `public/og.png`, update `src/app/layout.tsx` `metadata.openGraph.images`.
