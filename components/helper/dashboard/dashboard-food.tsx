import FoodItem from "../food/fooditem";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
const DashboardFood = () => {
    return ( 
        <div className="flex flex-col gap-y-2">
            <div className="text-6xl p-5 m-5 font-black ">
            Food Orders
            </div>
            <div className="p-2 m-2  flex flex-col items-center justify-center">
            <FoodItem name="Black Forest"   onClick={()=>{}} restaurantName="Mio Amore"
                imageUrls={["/images/cake.avif","/images/cake2.png"]} 
                description="This has the best of both worlds.If you love both fresh cream and chocolate, then you have to try this cake"  
                ingredients={["Chocolate","Vanila","Cherry"]}
                sidekicks={[{name:"Burger",imageUrl:"/images/burger.jpg"}]} category="Cakes" onRestaurantClick={()=>{}}
                price={350} deliveryTime="30 mins"
                ratings={4.9} cashOnDelivery={true} discountPer={16} noOfRatings={2000}/>
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
 
export default DashboardFood