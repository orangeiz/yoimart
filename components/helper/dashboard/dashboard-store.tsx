import { Plus, Search } from "lucide-react";
import BlueButton from "../bluebutton";
import Image from "next/image";
import StoreItem from "../store/storeitem";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
  
  
const DashboardStore = () => {
    return ( 
    <div className="flex flex-col gap-y-4">
        <div className="text-6xl p-5 m-5 font-black ">
            Store
        </div>
        <div className="flex  flex-col justify-center p-2 m-2 items-center gap-y-3">
        <BlueButton   icon={<Plus/>} sublabel="Add" onClick={()=>{}} label="Create New Store"/>
        </div>

        <div className="flex flex-row gap-x-2">
            <div className="text-3xl p-2 m-2 font-bold">
                My Stores
            </div>
            <div className="bg-white p-4 m-4 border-2 group rounded-lg border-black flex flex-row gap-x-2 items-center justify-center h-10 w-80">
                <Search className="text-pink-600 group-hover:text-blue-500" height={20} width={20}/>                
                <div className=" text-pink-600  text-l font-bold group-hover:text-blue-500">
                    Search
                </div>
            </div>
            <div className=" bg-rose-300  fixed right-0 w-100 h-100  rounded-full items-center justify-center">
                <div className=" relative z-10 w-80 h-80">
                    <Image src="/images/ayaka.png" alt="Ayaka" fill objectFit="contain"/>
                </div>
            </div>
        </div>
        <div className="flex flex-col gap-y-2">
            <div className="p-2 m-2 flex flex-row gap-x-4">
                <StoreItem name="Shoe store" type="shop" onClick={()=>{}}/>
                <StoreItem name="Pizza store" type="food" onClick={()=>{}}/>
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
    </div> );
}
 
export default DashboardStore;