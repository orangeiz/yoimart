import { db } from "@/lib/db";

export async function getAllDeliveryFoods(title: string, page: number, pageSize: number = 15) {
  const offset = (page - 1) * pageSize;
  
  const deliveryfoods = await db.query.deliveryfoods.findMany({
    where: (deliveryfoods, { ilike }) => ilike(deliveryfoods.name, `%${title}%`),
    with: {
      subcategory: {
        with: {
          category: true
        }
      },
      restaurant: true,
    },
    offset: offset,
    limit: pageSize,
  });

  if (deliveryfoods.length === 0) {
    return [];
  }

  const deliveryfoodsWithDetails = deliveryfoods.map(deliveryfood => ({
    ...deliveryfood,
    category: deliveryfood.subcategory?.category,
  }));

  return deliveryfoodsWithDetails;
}