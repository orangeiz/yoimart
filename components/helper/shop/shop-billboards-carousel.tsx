'use client'
import { getRandomBillboards } from "@/actions/getRandomBillboards";
import BillboardCarousel from "@/components/carousels/billboardcarousel";
import { useEffect, useState } from "react";

const ShopBillboardCarousel = () => {
    const [billboardsImageUrls, setBillboardsImageUrls] = useState<string[]>([]);

    useEffect(() => {
        const fetchBillboards = async () => {
            const billboards = await getRandomBillboards();
            if (billboards) {
                const imageUrls = billboards
                    .map(billboard => billboard.imageUrl)
                    .filter(url => url !== null) as string[]; 
                setBillboardsImageUrls(imageUrls);
            }
        };

        fetchBillboards();
    }, []);
    return ( 
    <div>         
        <BillboardCarousel imageUrls={billboardsImageUrls}/>
    </div>
 );
}
 
export default ShopBillboardCarousel;