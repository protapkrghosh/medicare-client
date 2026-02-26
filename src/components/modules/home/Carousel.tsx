"use client";

import * as React from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import {
   Carousel,
   CarouselContent,
   CarouselItem,
} from "@/components/ui/carousel";

const slides = [
   "https://i.ibb.co.com/Tqrn2mYF/banner5.png",
   "https://i.ibb.co.com/tpVqNnLS/banner6.png",
   "https://i.ibb.co.com/Dft5Xpkc/banner2.png",
   "https://i.ibb.co.com/dsvjN4Z7/banner1.png",
   "https://i.ibb.co.com/ksWsQznL/banner4.png",
   "https://i.ibb.co.com/JT2bLmW/banner3.png",
];

export function HomeCarousel() {
   const [api, setApi] = React.useState<any>();
   const [current, setCurrent] = React.useState(0);

   React.useEffect(() => {
      if (!api) return;

      setCurrent(api.selectedScrollSnap());

      api.on("select", () => {
         setCurrent(api.selectedScrollSnap());
      });
   }, [api]);

   return (
      <div className="relative w-full">
         <Carousel
            setApi={setApi}
            opts={{ loop: true }}
            plugins={[
               Autoplay({
                  delay: 5000,
               }),
            ]}
            className="w-full"
         >
            <CarouselContent>
               {slides.map((src, index) => (
                  <CarouselItem key={index}>
                     <div className="relative w-full h-[75vh] min-h-75">
                        <Image
                           src={src}
                           alt={`banner-${index}`}
                           fill
                           priority
                           className="object-cover"
                        />
                     </div>
                  </CarouselItem>
               ))}
            </CarouselContent>
         </Carousel>

         {/* DOT INDICATORS */}
         <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
            {slides.map((_, index) => (
               <button
                  key={index}
                  onClick={() => api?.scrollTo(index)}
                  className={`h-3 w-3 rounded-full transition-all duration-300 cursor-pointer ${
                     current === index
                        ? "bg-[#0e7673]/50 scale-110"
                        : "bg-white/50"
                  }`}
               />
            ))}
         </div>
      </div>
   );
}
