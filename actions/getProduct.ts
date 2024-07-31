import { db } from "@/lib/db";
import { products } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function getProduct(id:string){
    try{
        const product = await db.query.products.findFirst({
            where: (products, { eq }) => eq(products.id, id),
                with: {
                  subcategory: {
                    with: {
                      category: true,
                    },
                  },
                  productcolours: {
                    with: {
                      colour: true,
                    },
                  },
                  productgenders:{
                    with:{
                      gender:true
                    },
                  },
                  productsizes: {
                    with: {
                      size: true,
                    },
                  },
                
                },
              },
            );
        
          if (!product) {
            throw new Error("Product not found");
          }        
          const productsWithDetails = ({
            ...product,
           
          });
          return {
            product:productsWithDetails,
            category: product.subcategory?.category,
            colours: product.productcolours.map(pc => pc.colour),
            sizes: product.productsizes.map(ps => ps.size),
            genders: product.productgenders.map(pg => pg.gender),
          }
    }catch(error){
        return null

    }
    
}