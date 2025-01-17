import { Card } from '@/components/ui/card';
import { useEffect, useState } from 'react';


const ProductImaCarousel = ({ images }) => {


    console.log({images})

    const [currentSlider, setCurrentSlider] = useState(0);
    // if you don't want to change the slider automatically then you can just remove the useEffect
    useEffect(() => {
        const intervalId = setInterval(() => setCurrentSlider(currentSlider === images?.length - 1 ? 0 : currentSlider + 1), 5000);
        return () => clearInterval(intervalId);
    }, [currentSlider, images?.length]);

    return (
        <div>
            <div className="flex flex-row-reverse justify-between h-60 md:h-96 ">
                <div className="w-full transform overflow-hidden rounded-lg before:bg-black/50 sm:h96 md:h[540px] lg:gap-10">
                    {images?.map((img, index) => {
                        const { url} = img;
                        return (
                            <Card className={`${index === currentSlider ? 'visible opacity-100' : 'invisible opacity-0'} absolute inset-0 duration-500 ease-linear`} key={`index_${index}`}>
                                <img
                                    src={url}
                                    alt="Furniture Mart's product image"
                                    loading='lazy'
                                    className={`h-full w-full duration-500 ease-linear ${index === currentSlider ? 'scale-100' : 'scale-105'}`}
                                />
                            </Card>
                        );
                    })}
                </div>
                {/* slider container */}
                <div className="flex flex-col items-center justify-center gap-3 p-2">
                    {images?.map((img, index) => {
                        const { url } = img;
                        return (
                            <img
                                onClick={() => setCurrentSlider(index)}
                                src={url}
                                alt="Furniture Mart's product image"
                                key={index}
                                loading='lazy'
                                className={`h-6 w-10 sm:h-8 md:h-12 md:w-20 ${currentSlider === index ? 'opacity-100 ring-2 ring-black/50' : 'opacity-60'} box-content cursor-pointer rounded-md md:rounded-lg`}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    )
}

export default ProductImaCarousel