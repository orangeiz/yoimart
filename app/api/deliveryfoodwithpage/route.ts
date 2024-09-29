import { getAllDeliveryFoods } from "@/actions/getAllDeliveryFood";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const title = searchParams.get('title') || '';
  const page = parseInt(searchParams.get('page') || '1', 10);
  const pageSize = 15; // Fixed page size

  if (isNaN(page) || page < 1) {
    return new NextResponse("Invalid page number", { status: 400 });
  }

  try {
    const deliveryfoods = await getAllDeliveryFoods(title, page, pageSize);
    return NextResponse.json({ deliveryfoods });
  } catch (error) {
    console.log("[DELIVERY_FOODS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}