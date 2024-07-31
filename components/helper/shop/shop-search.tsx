import { Search } from "lucide-react";

const ShopSearch = () => {
    return ( 
    
         <div className="bg-white px-4 mx-4  border-2 group rounded-lg border-black flex flex-row gap-x-2 items-center justify-center h-10 w-80">
                <Search className="text-pink-600 group-hover:text-blue-500" height={20} width={20}/>                
                <div className=" text-pink-600  text-l font-bold group-hover:text-blue-500">
                    Search
                </div>
            </div>

     );
}
 
export default ShopSearch;