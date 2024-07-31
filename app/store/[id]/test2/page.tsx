'use client'
import { CreateFoodForm } from "@/components/helper/food/createfood";
const Test2 = () => {

    return (
        <div className=" bg-gradient-to-r from-white to-violet-100 flex flex-col gap-y-4">
        <div className="text-6xl p-5 m-5 font-black ">
        Add a Food Delivery Item
        </div>    
        <div className=" p-5 m-5 ">
        <CreateFoodForm/>
        </div>
    </div>

);
}
 
export default Test2;