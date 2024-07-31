import { getDeliveryFood } from "@/actions/getDeliveryFood";
import { db } from "@/lib/db";
import {  categories,  subcategories,restaurents, deliveryfoods } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest, { params }: { params: { id: string }}) {
  const { id } = params;
  if (!id){
    return new NextResponse("Id not found",{status:400})
  }
  try {
    const { deliveryfood, category } = await getDeliveryFood(id as string);
    return NextResponse.json({ deliveryfood, category });
  } catch (error) {
    console.log("[DELIVERY_FOOD_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string }}) {
  const { id } = params;
  console.log("Hi I'm Delivery food Id", id);

  try {
    const {
      name,
      category,
      subcategory,
      description,
      images,
      originalPrice,
      isArchived,
      isFeatured,
      COD,
      noAvailable,
      discountPer,
      restaurentAddress,
      restaurentName,
      restaurentImage,
    } = await req.json()
    const originalPrice1=Math.floor(originalPrice)
    const noAvailable1=Math.floor(noAvailable)
    const discountPer1=Math.floor(discountPer)
    const discountedPrice = Math.floor(originalPrice - (discountPer / 100) * originalPrice);
    if (!name)
      return new NextResponse("Name not found", { status: 400 });
    if (!restaurentAddress)
        return new NextResponse("Restaurent Address not found", { status: 400 });
    if (!restaurentName)
        return new NextResponse("Restaurent Name not found", { status: 400 });
    if (!restaurentImage)
        return new NextResponse("R not found", { status: 400 });
    if (!category)
      return new NextResponse("Category not found", { status: 400 });

    const existingCategory = await db.select().from(categories).where(eq(categories.name, category)).execute();
    if (existingCategory.length === 0)
      await db.insert(categories).values({ name: category }).execute();
    const Cat = await db.select().from(categories).where(eq(categories.name, category)).execute();

    if (!subcategory)
      return new NextResponse("Subcategory not found", { status: 400 });
    const existingSubcategory = await db.select().from(subcategories).where(eq(subcategories.name, name)).execute();
    if (existingSubcategory.length === 0)
      await db.insert(subcategories).values({ name: subcategory, categoryId: Cat[0].id }).execute();
    const Subcat = await db.select().from(subcategories).where(eq(subcategories.name, subcategory)).execute();
    if (!noAvailable)
      return new NextResponse("No of available not found", { status: 400 });
    if (!discountPer)
      return new NextResponse("Discount not found", { status: 400 });
    if (!id)
      return new NextResponse("Store not found", { status: 400 });
    if (!images)
      return new NextResponse("Image not found", { status: 400 });
    if (!originalPrice)
      return new NextResponse("Original Price not found", { status: 400 });
    if (!description)
      return new NextResponse("Description not found", { status: 400 });
    const exisitingRestaurant=await db.select().from(restaurents).where(eq(restaurents.name,restaurentName))
    if(exisitingRestaurant.length===0)
        {
            await db.insert(restaurents).values({
                name:restaurentName,
                imageUrl:restaurentImage,
                address:restaurentAddress
            })
        }
    const Resta=await db.select().from(restaurents).where(eq(restaurents.name,restaurentName))
    await db.update(deliveryfoods).set({
      name: name,
      discountPer: discountPer1,
      ratings: 0,
      noAvailable: noAvailable1,
      originalprice: originalPrice1,
      finalprice: discountedPrice,
      description: description,
      subcategoryId: Subcat[0].id,
      isArchived: isArchived,
      isFeatured: isFeatured,
      imageUrl: images,
      COD:COD,
      restaurentId:Resta[0].id,
    }).where(eq(deliveryfoods.id,id)).execute();
    return new NextResponse("Delivery Food Edited", { status: 200 });
  } catch (error) {
    console.error("[DELIVERY_FOOD_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
export async function DELETE(req: NextRequest, { params }: { params: { id: string }}) {
  const { id } = params;
    console.log("Hi I'm Delivery food Id", id);
    try{
        const response= await db.delete(deliveryfoods).where(eq(deliveryfoods.id,id as string)).execute()
        return NextResponse.json({success:true,response})

    }catch(error)
    {
      console.error("[DELIVERY_FOOD_DELETE]", error);
      return new NextResponse("Internal Error", { status: 500 });
    }

}
