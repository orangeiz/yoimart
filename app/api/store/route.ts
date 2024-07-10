import { db } from "@/lib/db";
import { stores } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST (req:NextRequest) {
    const {name,type,ownerId}=await req.json()
    if(!name)
        return new NextResponse("Name not found",{status:400})
    if(!type)
        return new NextResponse("Type not found",{status:400})
    if(!ownerId)
        return new NextResponse("OwnerId not found",{status:400})
    const uniquestore=await db.select().from(stores).where(eq(stores.name,name)).execute()
    if(uniquestore.length>0)
        return new NextResponse("Name of Store already taken",{status:409})
    try{
        
        await db.insert(stores).values({
            name:name,
            ownerId:ownerId,
            type:type
        }).execute()
        const newStore = await db.select().from(stores).where(eq(stores.name, name)).execute();
        if (newStore.length === 0) throw new Error("Failed to retrieve the new store");
        return NextResponse.json(newStore[0]);}
        catch (error) {
        console.log("[STORE_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}