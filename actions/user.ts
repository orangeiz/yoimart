import { db } from "@/lib/db"
import { users } from "@/lib/schema"
import { eq } from "drizzle-orm"

export const getUserById=async(id:string)=>
    {
        try{
           const currentUser=await db.select().from(users).where(eq(users.id,id)).execute()
           return currentUser
        }
        catch(error)
        {
            return null
        }
}