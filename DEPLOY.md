# Deploy to Vercel

This project is configured for **zero-config Vercel deploys**. Push to `main` and your site is live.

## First-time setup

1. Push the repo to GitHub (see `README.md` "Push to GitHub").
2. Go to **[vercel.com](https://vercel.com) → New Project**.
3. **Import** the `seekhoai-landing` GitHub repo.
4. Framework preset auto-detects **Next.js**. Leave all defaults.
5. **Environment variables:** none required for the mock build.
6. Click **Deploy**.

That's it. Vercel will give you a `*.vercel.app` URL within ~2 minutes.

## Subsequent deploys

- Pushes to `main` auto-deploy to production.
- Pushes to any other branch get a unique preview URL.
- Pull requests on GitHub get a preview URL posted as a comment.

## Connecting `seekhoai.pk`

1. In your Vercel project → **Settings → Domains**.
2. Add `seekhoai.pk` and `www.seekhoai.pk`.
3. Vercel shows you DNS records — paste them into your domain registrar (PKDomains, GoDaddy, etc.).
4. DNS propagation usually takes 5–30 minutes.

## Environment variables (for future real Stripe / email)

When you swap the mocks for real services, add these in **Vercel → Settings → Environment Variables**:

| Variable | Used by | Notes |
|---|---|---|
| `STRIPE_SECRET_KEY` | `/api/checkout` | Get from Stripe Dashboard |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | client (if needed) | Public key — fine to expose |
| `NEXT_PUBLIC_SITE_URL` | `/api/checkout` | e.g. `https://seekhoai.pk` |
| `RESEND_API_KEY` | `/api/email` | Resend / Mailchimp / etc. |

After adding env vars, trigger a redeploy (Vercel → Deployments → ⋮ → Redeploy).

## Verifying the deploy

Once live, check:

- [ ] Hero 3D scene loads and rotates
- [ ] Mouse movement parallaxes the knot and particles
- [ ] Email form submits and shows a success state
- [ ] "Enroll Now" buttons open the checkout modal
- [ ] Mock payment shows confetti + success state
- [ ] Discount popup appears after ~35 seconds (or scroll 60%, or mouse exits top)
- [ ] Claiming `AI20` updates the price to **$399.20** everywhere
- [ ] Refresh — discount persists (session-scoped)
- [ ] Close the tab and reopen — discount and popup reset
