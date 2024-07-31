import { db } from "@/lib/db";
import { stores } from "@/lib/schema";
import { eq } from "drizzle-orm";
type Store = {
  id: string;
  name: string;
  type: "food" | "shop" | null;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
};
export async function getStoreByUser(id: string): Promise<Store[] | null> {
  try {
    const result: Store[] = await db
      .select()
      .from(stores)
      .where(eq(stores.ownerId, id))
      .execute();
    
    return result.length > 0 ? result : null;
  } catch (error) {
    return null;
  }
}
