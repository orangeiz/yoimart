import { MapPin, ShoppingCart } from "lucide-react";
import Image from "next/image";
import FoodLanguage from "./food-language";

const FoodHeader = () => {
    return ( 
    <div className="bg-custom3 flex flex-row justify-between">
        <div className=" flex flex-row items-center gap-x-2">
            <Image src="/images/logo.png" alt="Your Logo" width={200} height={200} className="me-3" />
            <MapPin className="text-red-600" height={40} width={40}/>
            <div className="flex flex-col items-center justify-center">
                <div className="text-xl font-bold">
                    Delivering to
                </div>
                <div className="text-l font-semibold">
                    Malda, 732101
                </div>
            </div>
            
        </div>
        <div className=" flex flex-row items-center gap-x-2 pr-12 mr-12">
            <ShoppingCart className="text-purple-600" height={40} width={40}/>
            <FoodLanguage/>
        </div>

    </div>
    );
}
 
export default FoodHeader;