import { db } from "@/lib/db";
import {  subcategories } from "@/lib/schema";
import { and, eq, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const Subcategories = await db.select().from(subcategories).execute();
        const subcategoryWithProducts = [];
        for (const subcategory of Subcategories) {
            const { id: subcategoryId, name: subcategoryName } = subcategory;
            const productfromSubcategory = await db.query.products.findMany({
                where: (products, { eq, and }) => and(eq(products.subcategoryId, subcategoryId), eq(products.isFeatured, true)),
                with: {
                    productcolours: {
                        with: {
                            colour: true,
                        },
                    },
                },
                limit: 6,
                orderBy: (products, { sql }) => sql`RANDOM()`,
            });
            const productsWithColours=productfromSubcategory.map(product=>{
                const colors=product.productcolours.map(pc=>pc.colour);
                return{
                    ...product,
                    colors
                }
            });
            if (productsWithColours.length > 0){
                subcategoryWithProducts.push({ subcategoryId, subcategoryName, productfromSubcategory: productsWithColours });            }
        }
        console.log(subcategoryWithProducts);
        return NextResponse.json({ subcategories: subcategoryWithProducts });
    } catch (error) {
        console.log("[SUBCATEGORIES_PRODUCT_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
