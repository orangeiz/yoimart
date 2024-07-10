import { db } from "@/lib/db";
import { billboards } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function getBillboards(id:string){
    try{
        const result = await db.select().from(billboards).where(eq(billboards.storeId, id));
        return result.length > 0 ? result : null;

    }catch(error){
        return null

    }
    
}