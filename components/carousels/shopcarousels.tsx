"use client"
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";

interface ShopCarouselProps {
  imageUrls: string[];
}

const ShopCarousel: React.FC<ShopCarouselProps> = ({ imageUrls }) => {
  return (
    <div className="overflow-hidden  w-[400px]">
      <Carousel
        plugins={[Autoplay({ delay: 1500, stopOnInteraction: false })]}
      >
        <CarouselContent>
          {imageUrls.map((url, index) => (
            <CarouselItem key={index}>
              <div className="h-[400px] w-[400px] relative ">
                <Image
                  className="object-cover border-4 border-black"
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

export default ShopCarousel;
