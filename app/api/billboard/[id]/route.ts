import { db } from "@/lib/db";
import { billboards } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    console.log(id)
    if (!id) {
        return new NextResponse("Id not found", { status: 400 });
      }
      try{
        const Billboards = await db.select().from(billboards).where(eq(billboards.id, id)).execute();
        const billboard = Billboards[0];
        return NextResponse.json({billboard});
      }
      catch(error){
        console.log("[BILLBOARD_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });

      }
}
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }){
    const { id } = params;
    console.log(id)
    const {name,imageUrl}=await req.json()
    if(!name)
        return new NextResponse("Name not found",{status:400})
    if(!imageUrl)
        return new NextResponse("ImageUrl not found",{status:400})
    if(!id)
        return new NextResponse("Billboard  not found",{status:400})
    try{
        await db.update(billboards).set({
            name:name,
            imageUrl:imageUrl,
        }).where(eq(billboards.id,id)).execute()
        return new NextResponse("Billboard Edited",{status:200})
    }catch(error){
        console.log("[BILLBOARD_PATCH]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(req:NextRequest){
    const {searchParams}=new URL(req.url);
    const id = searchParams.get("id");
    console.log("Hi Im Billboard Id",id)
    if(!id)
        return new NextResponse("Billboard  not found",{status:400})
    try{
        await db.delete(billboards).where(eq(billboards.id,id)).execute()
        return new NextResponse("Billboard deleted",{status:200})
    }catch(error){
        console.log("[BILLBOARD_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}