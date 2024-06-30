import WishlistItem from "../wishlist/wishlistitem";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
const DashboardWishlist = () => {
    return ( 
        <div className="flex flex-col gap-y-2">
            <div className="text-6xl p-5 m-5 font-black ">
            Wishlist
            </div>
            <div className="p-2 m-2  flex flex-col items-center justify-center">
            <WishlistItem name=" Nintendo Switch" colour="#FF0000"  onClick={()=>{}} supplier="Nintendo"
                imageUrls={["/images/switch1.png","/images/switch2.png","/images/switch3.jpg"]} 
                description="Your favourite console to play switch games"  agerated={5}
                occasion="Gaming" category="Consoles" originalprice={60000} 
                ratings={4.9} cashondelivery={true} discountper={16} noofratings={2000}/>
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
 
export default DashboardWishlist;