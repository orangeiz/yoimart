import { cn } from "@/lib/utils";
import React from "react"
import { BentoGrid,BentoGridItem } from "@/components/ui/bento-grid";
import { Shirt,Utensils,Bike,Laptop,Book,Croissant,Pipette} from "lucide-react";
import Image from "next/image";
export const BentoGridAnimated=()=>{
    const Skeleton1 = () => (
        <div className=" border-2  border-black relative flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100">
            <Image src="/images/bento/bento1.jpg" alt="bento1" fill className="cover border-1 rounded-xl" />
        </div>
      )
      const Skeleton2 = () => (
        <div className=" border-2 border-black relative flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100">
            <Image src="/images/bento/bento2.jpg" alt="bento2" fill className="cover border-1 rounded-xl" />
        </div>
      )
      const Skeleton3= () => (
        <div className=" border-2 border-black relative flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100">
            <Image src="/images/bento/bento3.jpg" alt="bento3" fill className="cover border-1 rounded-xl" />
        </div>
      )
      const Skeleton4 = () => (
        <div className="border-2 border-black relative flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100">
            <Image src="/images/bento/bento4.jpg" alt="bento4" fill className="cover border-1 rounded-xl" />
        </div>
      )
      const Skeleton5 = () => (
        <div className="border-2 border-black relative flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100">
           <Image src="/images/bento/bento5.jpg" alt="bento5" fill className="cover border-1 rounded-xl" /> 
        </div>
      )
      const Skeleton6 = () => (
        <div className="border-2 border-black relative flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100">
            <Image src="/images/bento/bento6.jpg" alt="bento6" fill className="cover border-1 rounded-xl" />
        </div>
      )
      const Skeleton7 = () => (
        <div className="border-2 border-black relative flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100">
            <Image src="/images/bento/bento7.jpg" alt="bento7" fill className="cover border-1 rounded-xl" />
        </div>
      )
      const items=[
        {title:"Be Stylish",
        description:"1000+ fashion items to  look great",
        header:<Skeleton1/>,
        icon:< Shirt  className="h-4 w-4 text-pink-400"/>
        },
        {title:"Chop your Food",
            description:"Utensils for daily-life uses",
            header:<Skeleton2/>,
            icon:< Utensils className="h-4 w-4 text-pink-400"/>
        },
        {title:"Ride The Moment",
            description:"A perfect storehouse to select best bikes and cars",
            header:<Skeleton3/>,
            icon:< Bike className="h-4 w-4 text-pink-400"/>
        },
        {title:"Into the Tech World",
            description:"All the electronics including phone,laptops,mobiles and gaming pc",
            header:<Skeleton4/>,
            icon:<Laptop className="h-4 w-4 text-pink-400"/>
            },
        {title:"Empower with Books",
        description:"A perfect library to explore your books of interest",
        header:<Skeleton5/>,
        icon:<Book className="h-4 w-4 text-pink-400"/>
        },
        {title:"Packed Foods",
            description:"We provide the neccessary food  items and ingredients",
            header:<Skeleton6/>,
            icon:<Croissant className="h-4 w-4 text-pink-400"/>
        },
        {title:"Makeup",
            description:"Look great with makeup and skincare",
            header:<Skeleton7/>,
            icon:<Pipette className="h-4 w-4 text-pink-400"/>
        },
      ]
    return(
        <BentoGrid className="max-w-4xl p-2 m-2 mx-auto">
            {items.map((item,i)=>(
                <BentoGridItem 
                    key={i}
                    title={item.title}
                    description={item.description}
                    header={item.header}
                    icon={item.icon}
                    className={i===3||i===6?"md:col-span-1":""}
                />
            ))}
        </BentoGrid>
    )

}