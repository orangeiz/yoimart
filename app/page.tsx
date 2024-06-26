import Image from "next/image";
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";
import { Pizza, ShoppingBag } from "lucide-react";
import Link from "next/link";
import DashboardButton from "@/components/helper/dashboard-button";
const font = Montserrat({
  subsets: ["latin"],
  weight: ["600"]
});

export default function Home() {
  return (
    <div className="bg-yellow-50 flex flex-row gap-x-8 items-center justify-center" >
     
     <div className="relative "> {/* Adjust size as necessary */}
                <Image src="/images/fh2.gif" className="object-contain fill" alt="form-head" width={400} height={400} />
            </div>
            <div className="flex flex-col gap-y-20 mt-10 ">
              <div className={cn(" text-blue-800 text-5xl font-extrabold", font.className)} >
                Welcome Back Traveller
              </div>
              <div className="flex gap-x-5  mt-20 ">
                <Link href="/shop">
                  <div className="border-4 bg-sky-300 rounded-lg p-5 m-5 border-custom2 group flex gap-x-1  border-2xl">
                    <ShoppingBag className="h-10 w-10 text-black group-hover:text-custom1"/>
                    <div className="text-xl font-bold text-black group-hover:text-custom1  "> 
                      Shop Now
                      </div>
                  </div>
                </Link>
                <Link href="/food">
                  <div className="border-4  p-5 m-5 bg-sky-300 rounded-lg border-custom2 group flex gap-x-1 ">
                    <Pizza className="h-10 w-10 text-black group-hover:text-custom1"/>
                    <div className="text-xl font-bold text-black group-hover:text-custom1  "> 
                      Order Food
                      </div>
                  </div>
                </Link>
                <DashboardButton/>
              </div>
            </div>
           
    </div>
    
 
  );
}
