
import Image from "next/image";
import { Montserrat,Red_Hat_Display,Anek_Devanagari,Open_Sans, Roboto } from "next/font/google";
import { cn } from "@/lib/utils";
import { Pizza, ShoppingBag } from "lucide-react";
import Link from "next/link";
//import dynamic from "next/dynamic";
import AnimatedSection from "@/components/animations/sections/animation1";
import AnimatedSection2 from "@/components/animations/sections/animation2";
import AnimatedSection3 from "@/components/animations/animation3";
import { BentoGridAnimated } from "@/components/animations/sections/bento-animation";
//import { BentoGridDemo } from "@/components/animations/sections/bento-test";
import { GlareCardDemo } from "@/components/animations/sections/team-member";
import Footer from "@/components/helper/footer";
//import VideoTest from "@/components/helper/video-player";
const font = Montserrat({
  subsets: ["latin"],
  weight: ["600"]
});
const font2=Red_Hat_Display({subsets:["latin"],weight:["800"]})
const font3=Anek_Devanagari({subsets:["latin"],weight:["800"]})
const font4=Open_Sans({subsets:["latin"],weight:["800"]})
const font5=Roboto({subsets:["latin"],weight:["900"]})
//<div className="relative z-20 mt-20 pt-20">
//<Loader3d />
//</div>
//  const Loader3d=dynamic(()=>import ("@/components/3d/Loader3d/loader3d"),{ssr:false})

export default function Home() {
  return (
    <div className="relative z-0">
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
                </div>
              </div>
            
      </div>
      <div className=" flex flex-col ">
    <div className="bg-gradient-to-r from-violet-600 to-indigo-600">
        <AnimatedSection3
            text="Burn Your Passion"
            imageSrc="/images/t4.png"
            imageAlt="Products"
            subtext="Welcome to Yoimart, where dreams meets endless possiblities"
            textClassName="text-6xl text-outline text-white font-extrabold mb-4"
            subtextClassName="text-2xl font-bold text-white "
          />
        </div>
      <div className="flex  bg-gradient-to-r from-teal-400 to-yellow-200 flex-col gap-y-5 items-center justify-center">
        <div className={cn("text-black font-black p-4 m-4 text-5xl",font2.className)}>
          Explore the Endless Possiblities
        </div>
        <BentoGridAnimated/>
      </div>
      <div className="flex flex-col  bg-gradient-to-r from-blue-800 to-indigo-900">
        <div className={cn("text-white text-center font-black p-4 m-4 text-5xl",font3.className)}>
             Charge Up
          </div>
      <AnimatedSection2 imageData={[
          {
            imageUrl: '/images/food/p1.png',
            text: 'Chicken Burger',
            subtext:"Delicious burgers with creamy chesse and roasted patty",
            mainTextClassName:"text-orange-300 font-bold text-6xl",
            subTextClassName:"text-white font-semibold text-2xl"
          },
          {
          
            imageUrl: '/images/food/p2.png',
            text: 'Bengal Biryani',
            subtext:"Perfect blend of ingredients and flavours with potato and chicken",
            mainTextClassName:"text-lime-300 font-bold text-6xl",
            subTextClassName:"text-white font-semibold text-2xl"
          },
          {
            imageUrl: '/images/food/p3.png',
            text: 'Veg Noodles',
            subtext:"Delicious noodles with lot of veggies to refresh yourself",
            mainTextClassName:"text-rose-300 font-bold text-6xl",
            subTextClassName:"text-white font-semibold text-2xl"
          },
        ]} 
        />
      </div>
      <div className="bg-gradient-to-r  from-violet-200 to-pink-200 flex  flex-col items-center justify-center">
        <div className={cn("text-black font-black p-4 m-4 text-5xl",font4.className)}>
            Our Core Members
          </div>
        <GlareCardDemo/>
      </div>
      <div className="bg-gradient-to-r from-orange-500 to-red-500 flex flex-col items-center justify-center">
      <AnimatedSection
          text="Our Developer"
          imageSrc="/images/team-members/developer.png"
          imageAlt="Developer"
          subtext="I’m Tanveer, the lead developer here.Hope you enjoy my piece of art"
          textClassName={cn("font-black text-custom2 py-5 my-5 text-6xl",font5.className)}
          subtextClassName=" font-bold text-white text-2xl"
        />
      </div>
      <div >
      <Footer/>
      </div>
      </div>
    </div>
  );
}
