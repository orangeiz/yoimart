import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users } from '@/lib/schema';
import { eq } from 'drizzle-orm';
export async function PATCH(req: NextRequest,{params}:{params:{id:string}}) {
  try {
    const { username, profileImg, profileBackgroundImg} = await req.json();
    if(!username)
        return new NextResponse("Username not Found",{status:400})
    const existingUsers=await db.select().from(users).where(eq(users.name,username)).execute()
    if (existingUsers.length > 0 && existingUsers[0].id !== params.id) {
        return new NextResponse("Username already exists", { status: 409 });
      }
    const updatedUser=await db.update(users).set({name:username,image:profileImg,imageBackground:profileBackgroundImg}).where(eq(users.id,params.id)).execute()
    return NextResponse.json({ success: true, updatedUser });
  } catch (error) {
    console.error("[USER_UPDATE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
