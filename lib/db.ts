import 'dotenv/config'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
export const client = postgres(process.env.DATABASE_URL!, { prepare: false })
import * as schema from "./schema"
export const db = drizzle(client,{schema});