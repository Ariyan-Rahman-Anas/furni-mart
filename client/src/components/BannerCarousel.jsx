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
              <div className="flex  items-center justify-center h-auto lg:h-[86.5vh] ">
                {/* Slider images */}
                <img
                  src={image?.url || image}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full rounded-md"
                />
              </div>
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