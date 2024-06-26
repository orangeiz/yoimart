import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { otps } from '@/lib/schema';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { desc, eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  const rateLimiter = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(2, '3 s'),
  });

  const userIp = req.headers.get('x-forwarded-for') || req.ip || 'unknown';
  const { success } = await rateLimiter.limit(userIp);
  if (!success) {
    return new NextResponse("Too Many Requests", { status: 429 });
  }

  const { phone, email, otp } = await req.json();

  if (!phone && !email) {
    return new NextResponse("Phone number or email required", { status: 400 });
  }
  if (!otp) {
    return new NextResponse("OTP required", { status: 400 });
  }

  try {
    let otpRecord;
    if (phone) {
      otpRecord = await db.select().from(otps).where(eq(otps.phone, phone)).orderBy(desc(otps.expiry)).execute();
    }
    if (email) {
      otpRecord = await db.select().from(otps).where(eq(otps.email, email)).orderBy(desc(otps.expiry)).execute();
    }

    if (!otpRecord || otpRecord.length === 0) {
      return new NextResponse("OTP was not found", { status: 400 });
    }

    const latestOtpRecord = otpRecord[0];
    if (Date.now() > new Date(latestOtpRecord.expiry).getTime()) {
      return new NextResponse("OTP has expired", { status: 400 });
    }

    const otpMatched = await bcrypt.compare(otp.toString(), latestOtpRecord.hashOtp);
    if (!otpMatched) {
      return new NextResponse("Invalid OTP", { status: 400 });
    }

    if (phone) {
      await db.delete(otps).where(eq(otps.phone, phone)).execute();
    }
    if (email) {
      await db.delete(otps).where(eq(otps.email, email)).execute();
    }

    return NextResponse.json({ otpMatched });

  } catch (error) {
    console.error("[OTP_VERIFY]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
