// MOCK — replace with Resend / Mailchimp / your email provider.
//
// To swap in a real provider:
//   1. `npm i resend` (or equivalent SDK).
//   2. Add API key to env: RESEND_API_KEY in .env.local (and Vercel Project Settings).
//   3. Replace the mock delay below with a real send:
//
//        import { Resend } from 'resend';
//        const resend = new Resend(process.env.RESEND_API_KEY!);
//        await resend.emails.send({
//          from: 'SeekhoAI <hello@seekhoai.pk>',
//          to: parsed.data.email,
//          subject: 'Your free first lesson',
//          html: '...',
//        });
//
// 4. Keep the same response shape so the client form keeps working.

import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({ email: z.string().email() });

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }

  await new Promise((r) => setTimeout(r, 700));

  // Visible in Vercel function logs.
  console.log("[MOCK email signup]", parsed.data.email);

  return NextResponse.json({ ok: true });
}
