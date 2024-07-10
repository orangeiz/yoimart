"use client"
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface ImageData {
  imageUrl: string;
  text: string;
  subtext: string;
  mainTextClassName?: string; // Optional className for main text specific to each image
  subTextClassName?: string;  // Optional className for subtext specific to each image
}

interface AnimatedSection2Props {
  imageData: ImageData[]; // Array of objects with imageUrl, text, subtext, mainTextClassName, and subTextClassName
}

const AnimatedSection2 = ({ imageData }: AnimatedSection2Props) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const textSection = entry.target.querySelector('.text-section');
        const imageSection = entry.target.querySelector('.image-section');
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-start');
          if (textSection) textSection.classList.add('animate-fade-in-left');
          if (imageSection) imageSection.classList.add('animate-fade-in-right');
        } else {
          entry.target.classList.remove('fade-in-start');
          if (textSection) textSection.classList.remove('animate-fade-in-left');
          if (imageSection) imageSection.classList.remove('animate-fade-in-right');
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleImageClick = (index: number) => {
    if (index !== selectedImageIndex) {
      const textSection = sectionRef.current?.querySelector('.text-section');
      const imageSection = sectionRef.current?.querySelector('.image-section');
      if (textSection) textSection.classList.remove('animate-fade-in-left');
      if (imageSection) imageSection.classList.remove('animate-fade-in-right');
      setSelectedImageIndex(index);
      setTimeout(() => {
        if (textSection) textSection.classList.add('animate-fade-in-left');
        if (imageSection) imageSection.classList.add('animate-fade-in-right');
      }, 50);
    }
  };

  return (
    <div
      ref={sectionRef}
      className="flex flex-row items-center justify-between my-10 opacity-0 transition-opacity duration-700 transform"
    >
      <div className="text-section flex flex-col gap-y-10 text-left p-5 opacity-100">
        <h2 className={imageData[selectedImageIndex].mainTextClassName || 'text-4xl font-bold mb-4'}>
          {imageData[selectedImageIndex].text}
        </h2>
        <p className={imageData[selectedImageIndex].subTextClassName || 'text-lg'}>
          {imageData[selectedImageIndex].subtext}
        </p>
        <div className="flex flex-row gap-x-2">
          {imageData.map((item, index) => (
            <div
              key={index}
              className={`relative  w-20 h-20 rounded-full overflow-hidden cursor-pointer ${
                index === selectedImageIndex ? 'w-40 h-40' : ''
              }`}
              onClick={() => handleImageClick(index)}
            >
              <Image src={item.imageUrl} alt={`Thumbnail ${index}`} fill className="cover" />
            </div>
          ))}
        </div>
      </div>

      <div className="image-section flex flex-row opacity-100 p-2 m-2 justify-end">
        <div className="relative w-60 h-60">
          <Image
            src={imageData[selectedImageIndex].imageUrl}
            alt="Main Image"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default AnimatedSection2;
