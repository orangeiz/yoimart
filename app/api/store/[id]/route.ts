import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { stores, users } from '@/lib/schema';
import { eq, sql } from 'drizzle-orm';
export async function PATCH(req: NextRequest,{params}:{params:{id:string}}) {
  try { 
    const { name, type} = await req.json();
    console.log(name,type,params.id)
    if(!name)
        return new NextResponse("Store not Found",{status:400})
    const existingStores=await db.select().from(stores).where(eq(stores.name,name)).execute()
    if (existingStores.length > 0 && existingStores[0].id !== params.id) {
        return new NextResponse("Store  already already exists", { status: 409 });
      }
    const updatedStore=await db.update(stores).set({name:name,type:type,updatedAt:sql`CURRENT_TIMESTAMP`}).where(eq(stores.id,params.id)).execute()
    return NextResponse.json({ success: true, updatedStore });
  } catch (error) {
    console.error("[STORE_UPDATE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
export async function DELETE(req: NextRequest,{params}:{params:{id:string}}) {
  if(!params.id)
    return new NextResponse("Id already exist",{status:400})
  try
  {
    const response=await db.delete(stores).where(eq(stores.id,params.id))
    return NextResponse.json({success:true,response})

  }catch(error)
  {
    console.error("[STORE_DELETE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }

}
