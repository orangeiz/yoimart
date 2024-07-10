import { db } from "@/lib/db";
import { billboards } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    const {searchParams}=new URL(req.url);
    const id = searchParams.get("id");
    console.log("Hi Im Store Id",id)
    const {name,imageUrl}=await req.json()
    if(!name)
        return new NextResponse("Name not found",{status:400})
    if(!imageUrl)
        return new NextResponse("ImageUrl not found",{status:400})
    if(!id)
        return new NextResponse("Store  not found",{status:400})
    const existingbillboard=await db.select().from(billboards).where(eq(billboards.name,name)).execute()
    if(existingbillboard.length>0)
        return new NextResponse("Billboard name taken",{status:409})
    try{
        await db.insert(billboards).values({
            name:name,
            imageUrl:imageUrl,
            storeId:id
        }).execute()
        return new NextResponse("Billboard Created",{status:200})
    }catch(error){
        console.log("[BILLBOARD_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
export async function GET(req:NextRequest){
    const {storeId}= await req.json()
    if(!storeId)
        return new NextResponse("Store not found",{status:400})
    try{
    const storebillboards=await db.select().from(billboards).where(eq(billboards.storeId,storeId))
    return NextResponse.json(storebillboards)
    }catch(error)
    {
    console.log("[BILLBOARD_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });  
        
    }
}