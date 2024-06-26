import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users } from '@/lib/schema';
import { eq } from 'drizzle-orm';
export async function  PATCH(req:NextRequest){
    const {email,phone,otpVerified,emailVerified,password,confirmpassword}=await req.json()
    if(!otpVerified&&!emailVerified)
        return new NextResponse("Otp Or Email is not verified",{status:400})
    if(!email&&!phone)
        return new NextResponse("Phone Or Email is not found for this user",{status:400})
    if(password!==confirmpassword)
        return new NextResponse("Password and confirm password dont match")
    try{
        let recoveryuser
        if (otpVerified&&phone) {
            recoveryuser = await db.update(users).set({password:password}).where(eq(phone,users.phone))
          }
          if (email&&emailVerified) {
            recoveryuser =   await db.update(users).set({password:password}).where(eq(email,users.email))
          }
          return NextResponse.json({ recoveryuser });
    }catch(error)
    {
        console.error("[FORGOT_PASSWORD_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }


}