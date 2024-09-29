'use client'
import FoodHeader from "@/components/helper/food/food-header";
import FoodSearch from "@/components/helper/food/food-search";
import { Button } from "@/components/ui/button";
import { ChevronDown, Clock, StarIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
const Food = () => {
    return ( 
    <div className="flex flex-col gap-y-2 p-2 bg-custom6">
        <FoodHeader/>
        <div className="flex flex-col gap-y-5 ">
            <div className="flex flex-row items-center justify-between">
                <div className="flex flex-col">
                    <div className=" font-black p-2 text-custom7  font-bespokesans text-9xl">
                        Grab a bite
                    </div>
                    <div className=" text-center font-bold p-2 text-custom5  font-satoshi text-5xl">
                        It's delicious
                    </div>
                    <div className='flex flex-row items-center justify-center p-5 gap-x-2'>
                        <Button className='h-[64px] w-[350px] group flex flex-row gap-x-2 bg-custom5 border-5 border-transparent hover:border-custom2' onClick={()=>{}}>
                            <div className='font-bold  font-satoshi  text-3xl group-hover:text-emerald-400 text-custom3'>
                            Search Food
                            </div>
                            <ChevronDown size={30} className='text-custom3 group-hover:text-emerald-400' />
                        </Button>
                        <Button className='h-[64px] w-[350px] group flex flex-row gap-x-2 bg-custom5 border-5 border-transparent hover:border-custom2' onClick={()=>{}}>
                            <div className='font-bold  font-satoshi  text-3xl group-hover:text-emerald-400 text-custom3'>
                            Popular Restaurents
                            </div>
                            <ChevronDown size={30} className='text-custom3 group-hover:text-emerald-400' />
                        </Button>
                    </div>
                </div>
            
                <div className="relative  h-[500px] w-[500px]">
                    <Image src='/images/pizza.png' alt='' fill className="object-contain"/>
                </div>
            </div>
            <div className="height-[10px] w-full  border-2 border-custom5"/>
            <div className="text-5xl text-center font-extrabold font-satoshi">
                Popular Restaurents
            </div>
            <div className="flex flex-row gap-x-4 overflow-x-scroll scroll-m-3 scroll-py-5 p-4 scroll-smooth ">                
            {Array(5).fill('').map((_, index) => (
                    <div key={index} className="relative h-[200px] w-[500px] flex-shrink-0 group">
                        <Image className="border-3 rounded-xl border-custom7 object-cover group-hover:border-custom4" fill src='/images/burger.jpg' alt=''/>
                        <div className="absolute bottom-2 left-2 right-2 z-10 flex flex-row justify-between items-center px-4">
                            <div className="text-white text-3xl font-satoshi font-bold">
                                Super Star Haji
                            </div>
                            <div className="flex flex-row items-center gap-x-2">
                                <div className="text-white font-satoshi font-bold text-2xl">
                                    15 mins    
                                </div>
                                <Clock size={20} className="text-custom4"/>
                                <div className="text-white text-xl font-satoshi font-semibold">
                                    4.2    
                                </div>
                                <StarIcon size={20} className="text-white fill-white bg-green-700"/>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="p-2 flex flex-col">
                <div className="p-5 text-5xl text-center font-extrabold font-satoshi">
                        Explore Food Variety
                </div>
            </div>
            <div className="p-5 overflow-x-auto scroll-py-5 scroll-smooth">
                <div className="grid grid-rows-2 grid-flow-col gap-x-8 gap-y-8 ">
                    {Array(20).fill('').map((_, index)  => (
                        <div key={index} className="flex flex-row items-center gap-x-8">
                            <div className="relative h-[200px] w-[200px] flex-shrink-0 group">
                                <Image className="border-3 rounded-full bg-custom7 border-custom7 object-cover group-hover:border-custom4" fill src='/images/thali.png' alt=''/>
                            </div>
                            <div className="text-custom4 text-2xl font-satoshi font-bold">
                                    Thali
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="p-2 flex flex-col">
                <div className="p-5 text-5xl text-center font-extrabold font-satoshi">
                        Our Food
                </div>
                <FoodSearch/>
            </div>
        </div>
    </div>
    );
}
 
export default Food;