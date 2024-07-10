"use client"
import { useEffect, useRef } from 'react';
import Image from 'next/image';

interface AnimatedSectionProps {
  text: string;
  subtext: string;
  textClassName?: string;
  subtextClassName?: string;
  imageSrc: string;
  imageAlt: string;
}

const AnimatedSection = ({
  text,
  subtext,
  textClassName = 'text-4xl font-bold mb-4',
  subtextClassName = 'text-lg',
  imageSrc,
  imageAlt
}: AnimatedSectionProps) => {
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

  return (
    <div
      ref={sectionRef}
      className="flex flex-row items-center justify-between my-10 opacity-0 transition-opacity duration-700 transform"
    >
      <div className="text-section flex-1 text-left p-5">
        <h2 className={textClassName}>{text}</h2>
        <p className={subtextClassName}>{subtext}</p>
      </div>
      <div className="image-section flex-1 relative w-60 h-60">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
};

export default AnimatedSection;
