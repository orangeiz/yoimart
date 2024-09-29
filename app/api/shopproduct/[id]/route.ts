import { getShopProduct } from "@/actions/getShopProduct";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  console.log(id);
  if (!id) {
    return new NextResponse("Id not found", { status: 400 });
  }
  try {
    const productData = await getShopProduct(id as string);
    if (!productData) {
      return new NextResponse("Product not found", { status: 404 });
    }

    const { product, category, colours, sizes, genders,reviews } = productData;

    return NextResponse.json({ product, category, colours, sizes, genders,reviews });
  } catch (error){
    console.log("[SHOP_PRODUCT_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}