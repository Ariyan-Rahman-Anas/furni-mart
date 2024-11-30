import { Card } from "./ui/card";

const ProductCardSkeleton = () => {
    return (
        <Card
            data-aos="zoom-in-up"
            data-aos-duration="1000"
            className="section-grant h-[22rem] w-full rounded-lg flex items-center justify-center group relative overflow-hidden"
        >
            <div className="w-full h-full flex flex-col items-center p-4 justify-between">
                {/* Skeleton for Image */}
                <div className="w-full h-[50%] bg-gray-300 rounded-md animate-pulse"></div>

                {/* Skeleton for Product Details */}
                <div className="mt-4 space-y-4 w-full">
                    {/* Skeleton for Product Name */}
                    <div className="h-4 bg-gray-300 rounded-md w-3/4 mx-auto animate-pulse"></div>

                    {/* Skeleton for Brand and Price */}
                    <div className="h-6 bg-gray-300 rounded-md w-full animate-pulse"></div>

                    {/* Skeleton for Buttons */}
                    <div className="flex items-center justify-between gap-6 bg border2 shadow border-black py-2 px-5 rounded-md">
                        <div className="h-6 w-8 bg-gray-300 rounded animate-pulse"></div>
                        <div className="h-6 w-8 bg-gray-300 rounded-full animate-pulse"></div>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default ProductCardSkeleton;