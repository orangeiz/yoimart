import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import auth from '@/lib/auth';
import { getUserById } from '@/actions/user';
export async function POST(req: NextRequest) {
    const { phone, username, email, avatarimgUrl, avatarbackgroundimgUrl, password } = await req.json();

    if (!username) {
        return new NextResponse("Username Not Found", { status: 400 });
    }
    if (!password) {
        return new NextResponse("Password Not Found", { status: 400 });
    }
    if (!phone && !email) {
        return new NextResponse("Phone Number Or Email Not Found", { status: 400 });
    }

    // Check if email already exists
    if (email) {
        const sameUserEmail = await db.select().from(users).where(eq(users.email, email)).execute();
        if (sameUserEmail.length > 0) {
            return new NextResponse("Email Already exists", { status: 400 });
        }
    }

    // Check if phone already exists
    if (phone) {
        const sameUserPhone = await db.select().from(users).where(eq(users.phone, phone)).execute();
        if (sameUserPhone.length > 0) {
            return new NextResponse("Phone Already exists", { status: 400 });
        }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await db.insert(users).values({
            email: email,
            name: username,
            password: hashedPassword,
            image: avatarimgUrl,
            imageBackground: avatarbackgroundimgUrl,
            phone:phone
        }).execute();

        return new NextResponse("User Created Successful", { status: 200 });
    } catch (error) {
        console.log("[USER_CREATE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
export const GET = auth(async (req: NextRequest) => {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
        return new NextResponse("ID Not Found", { status: 400 });
    }

    try {
        const user = await getUserById(id);
        return NextResponse.json(user);
    } catch (error) {
        console.log("[USER_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
});