import ShopItem from "../shop/shopitem";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
const DashboardShop = () => {
    return ( 
        <div className="flex flex-col gap-y-2">
            <div className="text-6xl p-5 m-5 font-black ">
            Shop
            </div>
            <div className="p-2 m-2  flex flex-col items-center justify-center">
            <ShopItem name="Blue Gown" colour="#333c63"  onClick={()=>{}} supplier="Dress Mania"
                imageUrls={["/images/dress3.jpeg","/images/dress4.jpeg","/images/dress5.jpeg"]} 
                description="Beautiful blue  cotton stiched dress" quantity={2} 
                occasion="Wedding" size="M" category="Dress" originalprice={500} 
                ratings={4.5} cashondelivery={true} discountper={20} noofratings={200}/>
            </div>
            <div>
            <Pagination>
            <PaginationContent>
            <PaginationItem>
                <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
                <PaginationLink href="#" isActive>
                2
                </PaginationLink>
            </PaginationItem>
            <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
                <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
                <PaginationNext href="#" />
            </PaginationItem>
            </PaginationContent>
        </Pagination>
            </div>
        </div>
     );
}
 
export default DashboardShop;