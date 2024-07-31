import { db } from '@/lib/db';
import { stores, billboards, products, categories, subcategories, productcolours, productgenders, productsizes, colours, genders, sizes, restaurents,deliveryfoods} from "@/lib/schema";

export async function getStore(id: string) {
  const store = await db.query.stores.findFirst({
    where: (stores, { eq }) => eq(stores.id, id),
    with: {
      billboards: true,
      products: {
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
      deliveryFoods:{
        with:{
          subcategory:{
            with:{
              category:true
            }},
          restaurant:true,
        }
      }
    },
  });

  if (!store) {
    throw new Error("Store not found");
  }

  // Process products to include nested properties
  const productsWithDetails = store.products.map(product => ({
    ...product,
    category: product.subcategory?.category,
    colours: product.productcolours.map(pc => pc.colour),
    sizes: product.productsizes.map(ps => ps.size),
    genders: product.productgenders.map(pg => pg.gender),
  }));

  return {
    ...store,
    products: productsWithDetails,
  };
}
