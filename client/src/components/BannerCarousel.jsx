// "use client"

// import React from "react"
// import { Card, CardContent } from "@/components/ui/card"
// import Autoplay from "embla-carousel-autoplay"
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel"


// const BannerCarousel = () => {
//   const plugin = React.useRef(
//     Autoplay({ delay: 3000, stopOnInteraction: true })
//   )

//   return (
//     <Carousel
//       plugins={[plugin.current]}
//       className="w-full"
//       onMouseEnter={plugin.current.stop}
//       onMouseLeave={plugin.current.reset}
//     >
//       <CarouselContent>
//         {Array.from({ length: 5 }).map((_, index) => (
//           <CarouselItem key={index}>
//               <Card className="border-0 shadow-none ">
//               <CardContent className="flex aspect-square items-center justify-center p-6">
//                 {/* here should be slider's images */}
//                 <span className="text-4xl font-semibold">{index + 1}</span> 
//                 </CardContent>
//               </Card>
//           </CarouselItem>
//         ))}
//       </CarouselContent>
//       <CarouselPrevious />
//       <CarouselNext />
//     </Carousel>
//   )
// }

// export default BannerCarousel





import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// type BannerCarouselProps = {
//   images: string[]; // Array of image URLs
//   autoplayDelay?: number; // Optional delay for autoplay (in ms)
// };

const BannerCarousel = ({
  images,
  autoplayDelay = 3000, // Default to 3 seconds
}) => {
  const plugin = React.useRef(
    Autoplay({ delay: autoplayDelay, stopOnInteraction: true })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {images?.map((image, index) => (
          <CarouselItem key={index}>
            <Card className="border-0 shadow-none">
              <CardContent className="flex aspect-square items-center justify-center p-6">
                {/* Slider images */}
                <img
                  src={image.url}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover rounded-md"
                />
                {index+1}
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default BannerCarousel;