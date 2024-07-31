import { db } from '@/lib/db';
import { stores, billboards, products, categories, subcategories, productcolours, productgenders, productsizes, colours, genders, sizes, restaurents,deliveryfoods} from "@/lib/schema";

export async function getDeliveryFood(id: string) {
  const deliveryfood = await db.query.deliveryfoods.findFirst({
    where: (deliveryfoods, { eq }) => eq(deliveryfoods.id, id),
        with:{
          subcategory:{
            with:{
              category:true
            }},
          restaurant:true,
        }
      }
  )
  if (!deliveryfood) {
    throw new Error("Delivery food not found");
  }
  const deliveryfoodWithDetails = ({
    ...deliveryfood,
  });
  return {
    deliveryfood: deliveryfoodWithDetails,
    category:deliveryfood.subcategory?.category,
  };
}
