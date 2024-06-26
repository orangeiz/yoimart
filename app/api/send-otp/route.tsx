import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';
import twilio from 'twilio';
import { db } from '@/lib/db';
import { otps } from '@/lib/schema';
import { Resend } from 'resend';

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const client = twilio(process.env.accountSid, process.env.authToken);
  const { phone, purpose, email } = await req.json();

  if (!phone && !email) {
    return new NextResponse("Phone Number And Email Not Found", { status: 400 });
  }

  if (!purpose) {
    return new NextResponse("Purpose Not Found", { status: 400 });
  }

  const otp = crypto.randomInt(100000, 999999);
  const hashOtp = await bcrypt.hash(otp.toString(), 10);

  try {
    await db.insert(otps).values({
      phone: phone || null,
      email: email || null,
      hashOtp: hashOtp,
      expiry: new Date(Date.now() + 5 * 60 * 1000),
    }).execute();

    if (phone) {
      await client.messages.create({
        body: `The OTP for ${purpose} is ${otp}`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phone,
      });
      return NextResponse.json({ success: true, message: 'OTP sent to phone', phone });
    }

    if (email) {
      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: "OTP Verification",
        html: `<p>OTP for ${purpose} is ${otp}</p>`,
      });
      return NextResponse.json({ success: true, message: 'OTP sent to email', email });
    }
  } catch (error) {
    console.error("[OTP_SENT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
