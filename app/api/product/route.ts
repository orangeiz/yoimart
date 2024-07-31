import { db } from "@/lib/db";
import {  categories, productcolours, productgenders, products, productsizes, subcategories, colours, genders, sizes } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  console.log("Hi I'm Store Id", id);

  try {
    const {
      name,
      category,
      subcategory,
      Colours,
      Sizes,
      Genders,
      Occasions,
      supplier,
      description,
      images,
      originalPrice,
      isArchived,
      isFeatured,
      COD,
      noAvailable,
      discountPer,
      ageRated
    } = await req.json()
    const originalPrice1=Math.floor(originalPrice)
    const noAvailable1=Math.floor(noAvailable)
    const discountPer1=Math.floor(discountPer)
    const ageRated1=Math.floor(ageRated)
    const discountedPrice = Math.floor(originalPrice - (discountPer / 100) * originalPrice);

    if (!name)
      return new NextResponse("Name not found", { status: 400 });
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

    for (const colour of Colours) {
      const { name: colorName, hex: hexValue } = colour;
      const existingColour = await db.select().from(colours).where(eq(colours.name, colorName)).execute();
      if (existingColour.length === 0) {
        await db.insert(colours).values({ name: colorName, hexValue: hexValue }).execute();
      }
    }
    for (const size of Sizes) {
      const { name: sizeName } = size;
      const existingSize = await db.select().from(sizes).where(eq(sizes.name, sizeName)).execute();
      if (existingSize.length == 0) {
        await db.insert(sizes).values({ name: sizeName }).execute();
      }
    }
    for (const gender of Genders) {
      const { name: genderName } = gender;
      const existingGender = await db.select().from(genders).where(eq(genders.name, genderName)).execute();
      if (existingGender.length == 0) {
        await db.insert(genders).values({ name: genderName }).execute();
      }
    }
    const Occasion1=[]
    for (const occasion of Occasions){
      const{name:occasionName}=occasion;
      Occasion1.push(occasionName)
    }
    if (!noAvailable)
      return new NextResponse("No of available not found", { status: 400 });
    if (!discountPer)
      return new NextResponse("Discount not found", { status: 400 });
    if(!ageRated)
      return new NextResponse("Age Rated Not found",{status:400});
    if (!id)
      return new NextResponse("Store not found", { status: 400 });
    if (!images)
      return new NextResponse("Image not found", { status: 400 });
    if (!originalPrice)
      return new NextResponse("Original Price not found", { status: 400 });
    if (!description)
      return new NextResponse("Description not found", { status: 400 });
    if(!supplier)
      return new NextResponse("Supplier not found",{status:400})

    await db.insert(products).values({
      name: name,
      storeId: id,
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
      agerated:ageRated1,
      occasion:Occasion1,
      supplier:supplier,
    }).execute();

    const Product = await db.select().from(products).where(eq(products.name, name)).execute();
    for (const colour of Colours) {
      const { name: colorName, hex: hexValue } = colour;
      const existingColour = await db.select().from(colours).where(eq(colours.name, colorName)).execute();
      if (existingColour.length > 0) {
        await db.insert(productcolours).values({ colourId: existingColour[0].id, productId: Product[0].id }).execute();
      }
    }
    for (const size of Sizes) {
      const { name: sizeName } = size;
      const existingSize = await db.select().from(sizes).where(eq(sizes.name, sizeName)).execute();
      if (existingSize.length > 0) {
        await db.insert(productsizes).values({ sizeId: existingSize[0].id, productId: Product[0].id }).execute();
      }
    }
    for (const gender of Genders) {
      const { name: genderName } = gender;
      const existingGender = await db.select().from(genders).where(eq(genders.name, genderName)).execute();
      if (existingGender.length > 0) {
        await db.insert(productgenders).values({ genderId: existingGender[0].id, productId: Product[0].id }).execute();
      }
    }
    return new NextResponse("Product Created", { status: 200 });
  } catch (error) {
    console.log("[PRODUCT_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
