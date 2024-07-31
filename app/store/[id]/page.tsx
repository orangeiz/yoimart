import { getStore } from "@/actions/getStore";
import ShopCarousel from "@/components/carousels/shopcarousels";
import BlueButton from "@/components/helper/bluebutton";
import { Edit2, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
interface StoreDashboardProps {
  params: {
    id: string;
  };
}

const StoreDashboard: React.FC<StoreDashboardProps> = async ({ params }: StoreDashboardProps) => {
  const { id } = params;
  const store= await getStore(id);
  return (
    <div className="bg-gradient-to-r from-blue-400 to-white" >
      {store ? (
        <div className="flex flex-col gap-y-5 px-5">
          <div className="text-6xl text-center  font-black text-custom1">{store.name}</div>
          <div className="text-4xl font-extrabold text-center text-fuchsia-400">{store.type}</div>
          {store.billboards && store.billboards.length > 0 && (
            <div className="mt-4">
              <h2 className="text-4xl text-center font-bold"> Store Billboards</h2>
              <div>
                {store.billboards.map((billboard) => (
                  <div  className="flex flex-col p-2 m-2" key={billboard.id}>
                    {billboard.imageUrl && (
                      <Image src={billboard.imageUrl} alt={billboard.name} width={400} height={400} className=" border-2 border-black object-cover" />
                    )}
                    <p className="mt-2 text-3xl font-semibold ">{billboard.name}</p>
                    <Link className=" py-2 my-2 text-2xl font-bold text-custom1" href={`/billboard/modify/${billboard.id}`}>
                        Modify
                      </Link>          
                  </div>
                ))}
              </div>
            </div>
          )}
          {store.products && store.products.length > 0 && (
            <div className="mt-4">
              <h2 className="text-5xl  text-center font-bold">Products</h2>
              <div>
                {store.products.map((product) => (
                  <div className="flex flex-row justify-between"key={product.id}>
                    <div className="flex flex-col gap-y-2 py-2">
                      <div className="text-4xl font-bold py-5 my-5">{product.name}</div>
                      <div className="text-2xl font-semibold">Category: {product.category?.name}</div>
                      <div className="text-2xl font-semibold">Subcategory: {product.subcategory?.name}</div>
                      <div>
                        <div className="text-2xl font-semibold">Colours</div>
                        <div className=" flex flex-row gap-x-2 py-2 my-2">
                          {product.colours.map(colour => (

                            <div className="flex flex-row items-center gap-x-2"key={colour.id}>
                              <div className="text-xl font-medium ">
                                  {colour.name}
                              </div>
                              <div
                              className="h-5 w-5 rounded-full"
                              style={{ backgroundColor:`${colour.hexValue}` }}
                              ></div>
                              </div>
                            
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="text-2xl  font-semibold">Sizes</div>
                        <div className="flex flex-row gap-x-2 items-center">
                          {product.sizes.map(size => (
                            <div className="text-xl font-medium"key={size.id}>{size.name}</div>
                          ))}
                        </div>
                      </div>
                      <div>
                      <div className="text-2xl  font-semibold">Occasions</div>
                        <div className="flex flex-row gap-x-2 items-center">
                          {product.occasion&&product.occasion.map((Occasion,index) => (
                            <div className="text-xl font-medium"key={index}>{Occasion}</div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="text-2xl font-semibold">Genders</div>
                        <div className="flex flex-row  gap-x-2 ">
                          {product.genders.map(gender => (
                            <div  className="text-xl font-medium"key={gender.id}>{gender.name}</div>
                          ))}
                        </div>
                      </div>
                      <div className="text-2xl font-semibold">Description: {product.description}</div>
                    </div>
                  <div className="flex flex-col gap-y-2 py-2">
                    <div>
                      <ShopCarousel imageUrls={product.imageUrl || []} />
                    </div>
                    <div className="flex flex-row gap-x-1">
                      <div className="font-semibold text-xl text-red-600 line-through">
                          {product.originalprice}₹
                      </div>
                      <div className="font-semibold text-xl text-black ">
                          {product.finalprice}₹
                      </div>
                      <span className="font-bold  text-orange-500">
                          {product.discountPer}%off
                      </span>
                    </div>
                    <div className="font-semibold text-xl text-black">Rated for {product.agerated}+</div>
                    {product.isFeatured&&(
                      <div className="font-semibold text-xl text-black">Featured</div>
                    )}
                     {product.isArchived&&(
                      <div className="font-semibold text-xl text-black">Archived</div>
                    )}
                    {product.COD&&(
                      <div className="font-semibold text-xl text-black">Cash on Delivery Allowed</div>
                    )}
                      <Link className=" py-2 my-2 text-2xl font-bold text-custom1" href={`/product/modify/${product.id}`}>
                        Modify
                      </Link>                    
                  </div>
                </div>
                ))}
              </div>
            </div>
          )}
          {store.deliveryFoods && store.deliveryFoods.length > 0 && (
            <div className="mt-4">
              <h2 className="text-5xl  text-center font-bold">Delivery Foods</h2>
              <div>
                {store.deliveryFoods.map((deliveryFood) => (
                  <div className="flex flex-row justify-between"key={deliveryFood.id}>
                    <div className="flex flex-col gap-y-2 py-2">
                      <div className="text-4xl font-bold py-5 my-5">{deliveryFood.name}</div>
                      <div className="text-2xl font-semibold">Category: {deliveryFood.subcategory.category?.name}</div>
                      <div className="text-2xl font-semibold">Subcategory: {deliveryFood.subcategory?.name}</div>
                      <div className="text-2xl font-semibold">Description: {deliveryFood.description}</div>
                      <div className="text-2xl font-semibold">Restaurent: {deliveryFood.restaurant.name}</div>
                      <div className="text-2xl font-semibold">Restaurent Address: {deliveryFood.restaurant.address}</div>
                      <div className="h-[400px] w-[400px] relative ">
                        <Image
                          className="object-cover border-4 border-black"
                          src={deliveryFood.restaurant.imageUrl as string }
                          alt={`${deliveryFood.restaurant.name}`}
                          fill
                        />
                      </div>
                    </div>
                  <div className="flex flex-col gap-y-2 py-2">
                    <div>
                      <ShopCarousel imageUrls={deliveryFood.imageUrl || []} />
                    </div>
                    <div className="flex flex-row gap-x-1">
                      <div className="font-semibold text-xl text-red-600 line-through">
                          {deliveryFood.originalprice}₹
                      </div>
                      <div className="font-semibold text-xl text-black ">
                          {deliveryFood.finalprice}₹
                      </div>
                      <span className="font-bold  text-orange-500">
                          {deliveryFood.discountPer}%off
                      </span>
                    </div>
                    {deliveryFood.isFeatured&&(
                      <div className="font-semibold text-xl text-black">Featured</div>
                    )}
                     {deliveryFood.isArchived&&(
                      <div className="font-semibold text-xl text-black">Archived</div>
                    )}
                    {deliveryFood.COD&&(
                      <div className="font-semibold text-xl text-black">Cash on Delivery Allowed</div>
                    )}
                    <Link className=" py-2 my-2 text-2xl font-bold text-custom1" href={`/delivery_food/modify/${deliveryFood.id}`}>
                      Modify
                    </Link>
                    </div>
              </div>
                ))}
            </div>
           </div>
          )}
        </div>
      ) : (
        <p>Store not found.</p>
      )}
    </div>
  );
};

export default StoreDashboard;
