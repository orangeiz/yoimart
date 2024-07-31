"use client"
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";

interface BillboardCarouselProps {
  imageUrls: string[];
}

const  BillboardCarousel: React.FC<BillboardCarouselProps> = ({ imageUrls }) => {
  return (
    <div className="overflow-hidden  h-[400px] w-full">
      <Carousel
        plugins={[Autoplay({ delay: 1500, stopOnInteraction: false })]}
      >
        <CarouselContent>
          {imageUrls.map((url, index) => (
            <CarouselItem key={index}>
              <div className="h-[400px] w-screen relative ">
                <Image
                  className=" object-fit:contain border-4 border-black"
                  src={url}
                  alt={`productvariant-${index}`}
                  fill
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default BillboardCarousel;
