import { db } from "@/lib/db";
import { billboards } from "@/lib/schema";
import { sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET( req:NextRequest) {
      try{
        const Billboards = await db.select().from(billboards).orderBy(sql`RANDOM()`).limit(6);
        console.log(Billboards)
        return NextResponse.json({Billboards});
      }
      catch(error){
        console.log("[RANDOM_BILLBOARD_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });

      }
}