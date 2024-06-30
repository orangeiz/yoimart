import Image from "next/image";
import StarRating from "../star-rating";
import ColorCircle from "../colourcircle";
import SizeCircle from "../sizecircle";
import { useState } from "react";
import { Heart, ShoppingCart, Trash } from "lucide-react";

interface WishlistItem{
    name:string,
    sellerid?:string,
    buyerid?:string,
    colour:string,
    imageUrls: string[],
    size?:string,
    description:string,
    occasion:string,
    category:string,
    originalprice:number,
    ratings:number,
    noofratings:number,
    agerated?:number,
    reviews?:string,
    adresstobedelivered?:string,
    status?:string,
    tracker?:string,
    couponapplicable?:boolean,
    discountper:number,
    peoplealsoboughtwiththeseproducts?:string,
    locationitcanbedelivered?:string,
    cashondelivery:boolean,
    supplier?:string,
    onClick:()=>void,
    onRemove?:()=>void,
    moveWishlist?:()=>void
}
const WishlistItem = ({supplier,name,colour,imageUrls,occasion,size,category,cashondelivery,ratings,originalprice,discountper,description,onClick,onRemove,moveWishlist,noofratings,agerated}:WishlistItem) => {
    const [selectedImage,setSelectedImage]=useState(imageUrls[0])
    const discountedPrice = originalprice - (originalprice * discountper / 100);
    return ( 
    <div className="flex flex-row gap-x-2 ">

        <div className="flex flex-col gap-y-2">
            <div className="font-semibold text-xl text-black ">
               Category: {category}
            </div>
            <div className="font-semibold text-xl text-black ">
               Occasion: {occasion}
            </div>
            <div className="font-semibold text-xl text-black">
            Cash on Delivery: {cashondelivery ? "Available" : "Not Available"}
            </div>
            <div className="font-semibold text-xl text-black">
                Selected Colour: <ColorCircle color={colour} selected={true} onClick={()=>{}}/>
            </div>
            {size&&(
            <div className="font-semibold text-xl text-black">
                Selected Size: <SizeCircle  size={size} selected={true} onClick={()=>{}}/>
            </div>
            )}
            <div className=" flex  flex-col gap-y-1 ">
                <div className="font-bold  text-xl text-black">
                    Product Description 
                </div>
                <div className="font-semibold text-l text-black">
                    {description}
                </div>
            </div>
    
            
        </div>
            <div className=" w-100 h-80  flex items-center justify-center rounded-lg border-black border-4 bg-gradient-to-r from-violet-200 to-pink-200">
                <div className="relative z-10 w-60 h-60">
                    <Image src={selectedImage} alt="Shop-Item"  fill objectFit="contain"/> 
                </div>
            </div>
        <div className="flex flex-col  p-2 m-2 gap-y-2">
            <div className="font-bold text-2xl flex flex-col gap-y-1 text-black">
                    {name}
                    {agerated&&(
                        <div className="text-orange-500  text-sm font-bold"> Rated for {agerated}+</div>
                    )}
                </div>
                <div className="flex flex-row gap-x-1">
                    <div className="font-semibold text-xl text-red-600 line-through">
                        {originalprice}₹
                    </div>
                    <div className="font-semibold text-xl text-black ">
                        {discountedPrice.toFixed(2)}₹
                    </div>
                    <span className="font-bold  text-orange-500">
                        {discountper}%off
                    </span>
                </div>
                <div className="text-xl font-semibold flex flex-col  gap-y-1 text-black">
                    Ratings: {ratings}  
                    <div className="font-bold text-sm text-orange-500">
                    {noofratings} Rated
                    </div>
                    <StarRating rating={ratings}/>
                </div>
                <div className="font-semibold text-xl text-black">
                Supplier: {supplier}
            </div>
                <div className="flex flex-row gap-x-2">
                    {imageUrls.map((imageUrl, index) => (
                        <div
                        key={index}
                        className=" relative w-20 h-20 rounded-full overflow-hidden border-2 border-black cursor-pointer"
                        onClick={() => setSelectedImage(imageUrl)}
                    >
                        <Image src={imageUrl} alt={`Thumbnail ${index}`} fill objectFit="cover"/>
                    </div>
                    ))}
                </div>
                <div className="border-2  p-5 m-5 bg-orange-500 rounded-lg border-black group flex  items-center justify-center flex-row gap-x-1" onClick={onClick}>
                    <Heart className="text-black group-hover:text-blue-500" height={20} width={20}/>
                    <div className="text-l font-bold text-black group-hover:text-blue-500  "> 
                      My Wishlist
                   </div>
                </div>
                
            </div>
    </div> 
    );
}
 
export default WishlistItem;