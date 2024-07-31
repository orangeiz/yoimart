import { db } from '@/lib/db';
import { stores } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';
export async function GET(req: NextRequest) {
  type Store = typeof stores.$inferSelect;
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id){
    return new NextResponse("Id not found",{status:400})
  }
  

  try {
    const result: Store[] = await db
      .select()
      .from(stores)
      .where(eq(stores.ownerId, id))
      .execute();
      return  NextResponse.json(result.length>0?result:[]);
  } catch (error) {
    console.log("[USERSTORE_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
