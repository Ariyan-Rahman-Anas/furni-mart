import { CircleCheck, Heart, ShoppingCart } from "lucide-react"
import payments from "./../../assets/images/payments.svg"
import { useSelector } from "react-redux"
import { toast } from "sonner"
import { useEffect, useState } from "react"
import { getActiveItemsInCart } from "@/redux/slices/cartSlice"
import { useSingleProductQuery } from "@/redux/apis/productApi"
import BannerCarousel from "@/components/BannerCarousel"
import { Card, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import OrderFeatures from "@/components/OrderFeatures"
import { useAddRemoveToCartHandler } from "@/hooks/useAddRemoveToCartHandler"
import { useParams } from "react-router-dom"
import usePageTitle from "@/hooks/usePageTitle"
import IsLoadingLoaderRTK from "@/components/dashboard/IsLoadingLoaderRTK"
import { useAProductReviewsQuery } from "@/redux/apis/reviewApi"
import DateFormatter from "@/components/DateFormatter"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { usePostReviewMutation } from "@/redux/apis/reviewApi"
import { useAnUserOrdersQuery } from "@/redux/apis/orderApi"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import RatingStars from "@/components/RatingStars"
import useAddRemoveFromWishlist from "@/hooks/useAddRemoveFromWishlist"

const ProductDetailsPage = () => {
    usePageTitle('Product Details');
    const {
        register,
        handleSubmit,
        reset,
    } = useForm();
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedVariant, setSelectedVariant] = useState(null);
    const user = useSelector(state => state?.auth?.user)
    const theme = useSelector(state => state.theme)
    const { id } = useParams()

    const { data: singleProduct, isLoading, } = useSingleProductQuery(id)
    const product = singleProduct?.product

    const { _id, name, category, subCategory, brand, images, color, variants, description, averageRating, reviewCount, createdAt } = product || {}

    const { isProductInWishlist, toggleWishlist } = useAddRemoveFromWishlist();

    const handleWishlist = () => {
        toggleWishlist(product);
    };

    const { data: productReviewData } = useAProductReviewsQuery(id)

    const { data: myOrdersData } = useAnUserOrdersQuery(user?.email)

    const productType = myOrdersData?.orders?.map(order => order.paymentInfo?.product_type)

    let orderedItems = []
    if (productType) {
        orderedItems = productType.map(item => {
            try {
                return JSON.parse(item);
            } catch (e) {
                toast.error("Failed to parsing JSON")
                return null;
            }
        }).filter(item => item !== null);
    }

    const isEligibleForPostReview = !!orderedItems?.some(items =>
        items?.some(item => item?.productId === id)
    );

    const [postReview, { data: postReviewData, isSuccess: isPosted, isLoading: isPosting, error: reviewPostingError }] = usePostReviewMutation()

    const onSubmit = async (formData) => {
        try {
            const payload = {
                ...formData,
                product: id,
                user: user?._id,
            }
            await postReview(payload).unwrap()
        } catch (error) {
            console.log("An error occurred during posting a review: ", error)
            toast.error("Failed to posting a review")
        }
    }
    useEffect(() => {
        if (reviewPostingError) {
            toast.error(reviewPostingError?.data?.message)
        }
        if (isPosted) {
            toast.success(postReviewData?.message)
            reset()
        }
    }, [isPosted, postReviewData?.message, reviewPostingError, reset])

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


    const features = ["Secure payment method", "Free Shipping & Fasted Delivery", "100% Money-back guarantee", "24/7 Customer support", "Secure payment method"]

    if (isLoading) {
        return <IsLoadingLoaderRTK h={"90vh"} />
    }

    return (
        <div className="w-full md:w-[90%] mx-auto p-2 md:p-4 md:pb20  space-y-20">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                <div
                    data-aos="zoom-in-up"
                    data-aos-duration="1000"
                    className="product-media col-span-12 md:col-span-6">
                    <Card>
                        <BannerCarousel images={images} autoplayDelay={4000} />
                    </Card>
                    <div className="mt-6 text-sm ">
                        <Button
                            onClick={() => handleWishlist(product)}
                            className="flex items-center gap-1 secondary-btn ">
                            {isProductInWishlist(product._id)
                                ? <>Remove from wishlist
                                    <Heart
                                        fill={theme === 'dark' ? 'black' : 'white'}
                                        className="cursor-pointer" />
                                </>
                                : <>Add to wishlist <Heart className="cursor-pointer" /></>}
                        </Button>
                    </div>
                </div>

                <div
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    className="col-span-12 md:col-span-6">
                    <h1 className="text-4xl mb-2" >{name}</h1>
                    <div className="flex items-center gap-2 font-semibold text-sm">
                        <RatingStars rating={averageRating} />
                        <p>{averageRating} out of 5</p>
                        <p>{`(${reviewCount} feedback)`}</p>
                    </div>
                    <div className="space-y-0.5 my-2 font-semibold text-gray-600 dark:text-gray-300 ">
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
                    {
                        !activeItemsInCart.find((item) => item?._id === product?._id)
                            ? <Button onClick={handleAddToCart} className="flex items-center gap-3 primary-btn">
                                <ShoppingCart /><span>Add to Cart</span>
                            </Button>
                            : <Button onClick={handleAddRemoveToCart} className="flex items-center gap-3 danger-btn">
                                <ShoppingCart /><span>Remove from Cart</span>
                            </Button>
                    }

                    <div
                        data-aos="fade-up"
                        data-aos-duration="1000"
                        className="space-y-2 mt-4 ">
                        <h1 className="font-semibold"><span className="text-2xl font-bold " >100%</span> Guaranteed safe checkout</h1>
                        <div>
                            <img src={payments} alt="payment methods" className="w-full h-full" />
                        </div>
                    </div>
                </div>
            </div>

            <div
                data-aos="fade-up"
                data-aos-duration="1000"
                className="description flex flex-col lg:flex-row items-start justify-between gap-10 ">
                <div className="w-full lg:w-[40%] ">
                    <CardTitle className="mb-3" >Description</CardTitle>
                    <p>{description} </p>
                </div>

                <div className="flex flex-col md:flex-row items-start justify-between w-full lg:w-[60%] gap-4 ">
                    <div className="w-full">
                        <CardTitle className="mb-3" >Features</CardTitle>
                        <div className="space-y-2 dark:text-gray-300 ">
                            {features?.map((feature, index) => <div key={index} className="flex items-center gap-2">
                                <CircleCheck color="blue" />
                                <p className="text-sm " >{feature}</p>
                            </div>)}
                        </div>
                    </div>
                    <div className="w-full">
                        <CardTitle className="mb-3" >Shipping Information</CardTitle>
                        <div className="space-y-2 dark:text-gray-300">
                            <p><span className="font-semibold text-black dark:text-white" >Courier:</span> 2-4 days, free shipping</p>
                            <p><span className="font-semibold text-black dark:text-white" >Local shipping:</span> upto one week, additional $19</p>
                            <p><span className="font-semibold text-black dark:text-white" >Ups ground:</span>  6-7 days, free shipping</p>
                            <p><span className="font-semibold text-black dark:text-white" >Ups fallback:</span> 10-12 days, $29</p>
                        </div>
                    </div>
                </div>
            </div>


            {/* review section */}
            <section className="flex flex-col md:flex-row items-start justify-between gap-6" >
                <Card className="w-full p-4 " >
                    <CardTitle>Leave a feedback</CardTitle>
                    <form action="" onSubmit={handleSubmit(onSubmit)} className="space-y-1 my-4 " >
                        <div>
                            <Label>Comment
                                <span className="text-myRed text-lg ">*</span>
                            </Label>
                            <Textarea placeholder="Write your comment.." {...register("comment", { required: true })} ></Textarea>
                        </div>
                        <div className="flex items-end gap-4" >
                            <div>
                                <Label>Rating
                                    <span className="text-myRed text-lg ">*</span>
                                </Label>
                                <Input
                                    type="number"
                                    id="rating"
                                    placeholder="Enter rating (1-5)"
                                    {...register("rating", { required: true })}
                                />
                            </div>
                            <Button type="submit" disabled={isPosting || !isEligibleForPostReview} >Submit</Button>
                        </div>
                    </form>
                    {
                        isEligibleForPostReview !== true ? <p className="text-sm" ><span className="font-semibold" >Note: </span> You can only leave a review for a product you have purchased, and each product can only be reviewed once.</p> : <p className="text-sm" ><span className="font-semibold" >Note: </span>Each product can only be reviewed once.</p>
                    }
                </Card>

                <Card className="w-full p-4">
                    {
                        !productReviewData || productReviewData?.reviews?.length < 1
                            ? <div>
                                No feedback yet
                            </div>
                            : productReviewData && productReviewData?.reviews?.length >= 1 && <div className="">
                                <CardTitle className="mb-4">Latest feedbacks</CardTitle>
                                {
                                    productReviewData?.reviews?.map(({ user, comment, rating, createdAt }, index) => <div key={index} className="pb-2 border-b relative">
                                        <p className="text-xs absolute top-3 right-3 " ><DateFormatter date={createdAt} /></p>
                                        <div className="pt-4 flex items-center gap-2">
                                            <Avatar>
                                                <AvatarImage src="https://github.com/shadcn.png" alt="user's avatar" />
                                                <AvatarFallback>CN</AvatarFallback>
                                            </Avatar>
                                            <h1 className="text-sm font-semibold" >{user?.name}</h1>
                                        </div>

                                        <div className="flex justify-end gap-2">
                                            <RatingStars rating={rating} />
                                        </div>
                                        <p className="text-sm" >{comment} </p>
                                    </div>)
                                }
                            </div>
                    }
                </Card>
            </section>

            <OrderFeatures />
        </div>
    )
}
export default ProductDetailsPage