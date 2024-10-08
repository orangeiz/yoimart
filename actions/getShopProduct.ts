import { db } from "@/lib/db";
export async function getShopProduct(id: string) {
  try {
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
        productgenders: {
          with: {
            gender: true,
          },
        },
        productsizes: {
          with: {
            size: true,
          },
        },
        productreviews: {
          with: {
            review: {
              with: {
                rating: true,
                reactions: true,
                comments: true,
                user:true,
              },
            },
          },
        },
      },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    const productsWithDetails = {
      ...product,
      reviews: product.productreviews.map(pr => pr.review),
    };

    return {
      product: productsWithDetails,
      category: product.subcategory?.category,
      colours: product.productcolours.map((pc) => pc.colour),
      sizes: product.productsizes.map((ps) => ps.size),
      genders: product.productgenders.map((pg) => pg.gender),
      reviews: productsWithDetails.reviews,
    };
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}