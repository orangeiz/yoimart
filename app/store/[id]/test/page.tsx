'use client'
import { CreateProductForm } from "@/components/helper/product/createproductform";

const Test = () => {

    return (
        <div className=" bg-gradient-to-r from-white to-violet-100 flex flex-col gap-y-4">
        <div className="text-6xl p-5 m-5 font-black ">
        Add a product
        </div>    
        <div className=" p-5 m-5 ">
        <CreateProductForm/>  
        </div>
    </div>

);
}
 
export default Test;