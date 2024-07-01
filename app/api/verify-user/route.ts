import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export async function PATCH(req: NextRequest) {
  try {
    const { email, phone, otpVerified, emailVerified } = await req.json();

    if (!otpVerified && !emailVerified)
      return new NextResponse("Otp Or Email is not verified", { status: 400 });
    
    if (!email && !phone)
      return new NextResponse("Phone Or Email is not found for this user", { status: 400 });

    let verifyUser;

    if (otpVerified && phone) {
      verifyUser = await db.update(users)
        .set({ otpVerified: otpVerified })
        .where(eq(phone, users.phone)).execute();
    }

    if (email && emailVerified) {
      verifyUser = await db.update(users)
        .set({ emailVerified: emailVerified })
        .where(eq(email, users.email)).execute();
    }

    if (!verifyUser) {
      return new NextResponse("Verification failed", { status: 400 });
    }

    return NextResponse.json({ success: true, verifyUser });
  } catch (error) {
    console.error("[VERIFY_UPDATE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
