// actions/getRandomBillboards.ts
import { db } from "@/lib/db";
import { billboards } from "@/lib/schema";
import { sql } from "drizzle-orm";

export interface Billboard {
    imageUrl: string | null;
}

export async function getRandomBillboards(): Promise<Billboard[]> {
    try {
        const result = await db.select().from(billboards).orderBy(sql`RANDOM()`).limit(6);
        return result;
    } catch (error) {
        console.error("Error fetching billboards:", error);
        return [];
    }
}
