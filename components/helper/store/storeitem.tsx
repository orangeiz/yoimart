import { Pizza, ShoppingBag } from "lucide-react";

interface storeitemProps{
    name:string,
    type:string
    onClick:()=>void
}
const StoreItem = ({name,type,onClick}:storeitemProps) => {
    return ( 
        <div className=" flex flex-row items-center  gap-x-2 justify-center border-2 rounded-lg border-black bg-pink-300 group w-40 h-20" onClick={onClick}>
            {type==="food"&&<Pizza height={20} width={20} className=" text-purple-700 group-hover:text-blue-500"/>}
            {type==="shop"&&<ShoppingBag height={20} width={20} className=" text-purple-700 group-hover:text-blue-500"/>}
            <div className="text-l font-bold text-purple-700 group-hover:text-blue-500">
                {name}
            </div>
        </div>
     );
}
 
export default StoreItem;