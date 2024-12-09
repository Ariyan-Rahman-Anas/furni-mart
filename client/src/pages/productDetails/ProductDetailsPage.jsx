import { CircleCheck, Heart, ShoppingCart } from "lucide-react"
import payments from "./../../assets/images/payments.svg"
import { useSelector } from "react-redux"
import { toast } from "sonner"
import { useEffect, useState } from "react"
import { getActiveItemsInCart } from "@/redux/slices/cartSlice"
import { useSingleProductQuery } from "@/redux/apis/productApi"
import BannerCarousel from "@/components/BannerCarousel"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import OrderFeatures from "@/components/OrderFeatures"
import { useAddRemoveToCartHandler } from "@/hooks/useAddRemoveToCartHandler"
import { Link, useParams } from "react-router-dom"
import { useAddToWishlistMutation, useAnUserWishlistQuery } from "@/redux/apis/wishlistApi"
import usePageTitle from "@/hooks/usePageTitle"
import IsLoadingLoaderRTK from "@/components/dashboard/IsLoadingLoaderRTK"

const ProductDetailsPage = () => {
    usePageTitle('Product Details');

    const user = useSelector(state => state?.auth?.user)
    const theme = useSelector(state => state.theme)
    const { id } = useParams()

    const { data: singleProduct, isLoading, } = useSingleProductQuery(id)
    const product = singleProduct?.product

    const { _id, name, category, subCategory, brand, images, color, variants, description, createdAt } = product || {}

    const features = ["Secure payment method", "Free Shipping & Fasted Delivery", "100% Money-back guarantee", "24/7 Customer support", "Secure payment method"]

    const [addToWishlist, { data, isSuccess, isLoading: addToWishListLoading, error }] = useAddToWishlistMutation();
    const { data: anUserWishlist } = useAnUserWishlistQuery(user?._id)
    const activeItemsInWishlist = anUserWishlist?.wishlist?.products

    const addToWishlistHandler = async (item) => {
        const payload = {
            user: user?._id,
            products: item
        };
        try {
            await addToWishlist(payload);
        } catch (error) {
            toast.error("Failed to add to wishlist");
        }
    };

    useEffect(() => {
        if (error?.data) {
            toast.error(error?.data?.message);
        }
        if (isSuccess) {
            toast.success(data?.message);
        }
    }, [data?.message, error?.data, isSuccess]);

    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedVariant, setSelectedVariant] = useState(null);

    // Convert the color string into an array
    const colors = color?.split(",")?.map((item) => item.trim());

    const handleColorSelect = (color) => {
        setSelectedColor(color);
    };
    const handleVariantSelect = (item) => {
        setSelectedVariant(item);
    };

    const activeItemsInCart = useSelector(getActiveItemsInCart);
    const dataForCart = {
        _id,
        name,
        category,
        subCategory,
        brand,
        image: images?.[0]?.url,
        color: selectedColor,
        variant: selectedVariant,
        price: selectedVariant?.price
    }

    const handleAddRemoveToCart = useAddRemoveToCartHandler(dataForCart);

    const handleAddToCart = () => {
        if (!selectedColor) {
            toast.error("Please select a color before adding to cart.");
            return;
        }
        if (!selectedVariant) {
            toast.error("Please select a variant before adding to cart.");
            return;
        }
        handleAddRemoveToCart();
    };

    if (isLoading) {
        return <IsLoadingLoaderRTK h={"90vh"} />
    }

    return (
        <div className="p-2 md:p-4 md:pb20  space-y-20">
            <div className="w-full md:w-[90%] mx-auto grid grid-cols-1 md:grid-cols-12 gap-8">
                <div
                    data-aos="zoom-in-up"
                    data-aos-duration="1000"
                    className="product-media pt-4 col-span-12 md:col-span-6">
                    <Card>
                        <BannerCarousel images={images} autoplayDelay={4000} />
                    </Card>
                    <div className="mt-6 text-sm ">
                        {
                            !activeItemsInWishlist?.find(item => item?.productId?._id === product?._id)
                                ?
                                <Button
                                    onClick={() => addToWishlistHandler(product?._id)}
                                    className="flex items-center gap-1 secondary-btn ">
                                    {
                                        addToWishListLoading
                                            ? <> Add to wishlist <IsLoadingLoaderRTK /> </>
                                            : <> <span>Add to wishlist</span> <Heart /> </>
                                    }
                                </Button>
                                :
                                <Link to={`/wishlist`} className="flex items-center w-fit gap-1 secondary-btn ">
                                    <Button>
                                        <span>Check Wishlist</span><Heart color={theme === "dark" ? "black" : "white"} fill={theme === "dark" ? "black" : "white"} />
                                    </Button>
                                </Link>
                        }
                    </div>
                </div>

                <div
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    className="col-span-12 md:col-span-6 space-y-6">
                    <div className="section-grant p-4 md:p-6 ">
                        <h1 className="text-4xl mb-4" >{name}</h1>
                        <div className="space-y-2 font-semibold text-gray-600 dark:text-gray-300 ">
                            <p>Brand: <span className="text-black dark:text-white">{brand}</span> </p>
                            <p>Category: <span className="capitalize text-black dark:text-white">{category}</span> </p>
                            <p>sub-category: <span className="capitalize text-black dark:text-white">{subCategory}</span> </p>
                            <p>Release Date: <span className="capitalize text-black dark:text-white">{createdAt?.slice(0, 10)}</span> </p>
                            
                            <p>Availability: <span className={`${variants?.[0].stock <= 10 ? "text-myRed" : "text-green-500"}`} >
                                {
                                    variants?.[0].stock < 1 ? "Not available, please check variants below" : variants?.[0].stock <= 10 ? "Low Stock" : "In Stock"
                                }
                            </span></p>
                        </div>
                        <div className="flex items-center gap-6 my-7 ">
                            <p className="text-3xl font-semibold">${variants?.[0].price}</p>
                            <p className="text-xl font-semibold py-2 px-5 rounded-md text-white dark:text-black bg-black dark:bg-white ">0% OFF </p>
                        </div>

                        <Card className="p-4 my-4 space-y-2 text-sm ">
                            <h3 className="font-semibold text-base ">Colors:</h3>
                            <div className="flex flex-wrap items-center gap-3">
                                {colors?.map((color, index) => (
                                    <Button
                                        key={index}
                                        className={`${selectedColor === color ? "selected text-white " : "text-black"}  capitalize `}
                                        style={{
                                            backgroundColor: selectedColor === color ? color : "#fff",
                                        }}
                                        onClick={() => handleColorSelect(color)}
                                    >
                                        {color}
                                    </Button>
                                ))}
                            </div>
                            {selectedColor && (
                                <div style={{ marginTop: "10px" }}>
                                    <p> <span className="font-semibold">Selected Color:</span> {selectedColor}</p>
                                </div>
                            )}
                        </Card>

                        <Card className="p-4 my-4">
                            <h3 className="font-semibold">Variants:</h3>
                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
                                {variants?.map((item, index) => (
                                    <Card
                                        key={index}
                                        className={`py-2 px-3 space-y-2 text-sm relative cursor-pointer ${selectedVariant === item ? "border-2 border-primary" : ""
                                            }`}
                                        onClick={() => handleVariantSelect(item)}
                                    >
                                        <div>
                                            <h4 className="font-semibold">Dimensions:</h4>
                                            <div className="flex items-center gap-3">
                                                <p>H: {item.dimensions.height} </p>
                                                <p>L: {item.dimensions.length} </p>
                                                <p>W: {item.dimensions.width} </p>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold">Materials:</h4>
                                            <div className="ml-8 flex flex-col gap3">
                                                <p>Primary: {item.materials.primary} </p>
                                                <p>Secondary: {item.materials.secondary || "N/A"} </p>
                                            </div>
                                        </div>
                                        <p className="absolute top-0 right-2 text-xs font-semibold bg-black text-white py-0.5 px-2 rounded-md">
                                            {
                                                item.stock < 1 ? "Not available" : item.stock <= 10 ? "Low Stock" : "In Stock"
                                            }
                                        </p>
                                        <div>
                                            {
                                                item?.size && <p><span className="font-semibold">Size:</span> {item?.size}</p>
                                            }
                                            <p><span className="font-semibold">Weight:</span> {item?.weight} KG</p>
                                            <p><span className="font-semibold">Price:</span> ${item?.price}</p>
                                        </div>
                                    </Card>
                                ))}
                            </div>

                            {selectedVariant && (
                                <Card className="p-4 mt-6 text-sm">
                                    <h3 className="font-semibold mb-1 ">Selected Variant Details:</h3>
                                    <div className="space-y-1">
                                        <p><span className="font-semibold" >Price:</span> ${selectedVariant.price}</p>
                                        <p><span className="font-semibold" >Stock:</span> {selectedVariant.stock} items available</p>
                                        <p>
                                            <span className="font-semibold">Dimensions:</span> H: {selectedVariant.dimensions.height},
                                            L: {selectedVariant.dimensions.length}, W: {selectedVariant.dimensions.width}
                                        </p>
                                        <p>
                                            <span className="font-semibold" >Materials: </span>
                                            Primary: {selectedVariant.materials.primary},
                                            Secondary: {selectedVariant.materials.secondary || "N/A"}
                                        </p>
                                        <p><span className="font-semibold" >Weight:</span> {selectedVariant.weight} KG</p>
                                    </div>
                                </Card>
                            )}
                        </Card>

                        <p className="my-2 tracking-wide leading-6" >{description?.slice(0, 200)}...read more</p>
                        <div>
                            {
                                !activeItemsInCart.find((item) => item?._id === product?._id)
                                    ? <Button onClick={handleAddToCart} className="flex items-center gap-3 primary-btn">
                                        <ShoppingCart /><span>Add to Cart</span>
                                    </Button>
                                    : <Button onClick={handleAddRemoveToCart} className="flex items-center gap-3 danger-btn">
                                        <ShoppingCart /><span>Remove from Cart</span>
                                    </Button>
                            }
                        </div>
                    </div>

                    <div
                        data-aos="fade-up"
                        data-aos-duration="1000"
                        className="section-grant p-4 space-y-2 ">
                        <h1 className="font-semibold"><span className="textmyBlue text-2xl font-bold " >100%</span> Guaranteed safe checkout</h1>
                        <div>
                            <img src={payments} alt="payment methods" className="w-full h-full" />
                        </div>
                    </div>
                </div>
            </div>

            <div
                data-aos="fade-up"
                data-aos-duration="1000"
                className="description section-grant p-4 w-full md:w-[90%] mx-auto md:p-6 flex flex-col lg:flex-row items-start justify-between gap-10 ">
                <div className="w-full lg:w-[40%] ">
                    <h1 className="text-xl font-semibold mb-3" >Description</h1>
                    <p>{description} </p>
                </div>

                <div className="flex items-start justify-between w-full lg:w-[60%] ">
                    <div className="w-full font-semibold ">
                        <h1 className="text-xl font-semibold mb-3" >Features</h1>
                        <div className="space-y-4 textgray-600 dark:text-gray-300 ">
                            {features?.map((feature, index) => <div key={index} className="flex items-center gap-2">
                                <CircleCheck color="blue" />
                                <p>{feature}</p>
                            </div>)}
                        </div>
                    </div>
                    <div className="w-full">
                        <h1 className="text-xl font-semibold mb-3" >Shipping Information</h1>
                        <div className="space-y-4 textgray-600 dark:text-gray-300">
                            <p><span className="font-semibold text-black dark:text-white" >Courier:</span> 2-4 days, free shipping</p>
                            <p><span className="font-semibold text-black dark:text-white" >Local shipping:</span> upto one week, additional $19</p>
                            <p><span className="font-semibold text-black dark:text-white" >Ups ground:</span>  6-7 days, free shipping</p>
                            <p><span className="font-semibold text-black dark:text-white" >Ups fallback:</span> 10-12 days, $29</p>
                        </div>
                    </div>
                </div>
            </div>
            <OrderFeatures />
        </div>
    )
}
export default ProductDetailsPage