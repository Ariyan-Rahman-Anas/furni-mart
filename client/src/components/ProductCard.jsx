import { Eye, Heart, ShoppingCart, Star } from "lucide-react";
import { Card } from "./ui/card";
import { useSelector } from "react-redux";
import { useAddToWishlistMutation, useAnUserWishlistQuery } from "@/redux/apis/wishlistApi";
import { toast } from "sonner";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getActiveItemsInCart } from "@/redux/slices/cartSlice";
import ProductCardSkeleton from "./ProductCardSkeleton";
import IsLoadingLoaderRTK from "./dashboard/IsLoadingLoaderRTK";

const ProductCard = ({ isLoading, product }) => {
    const { _id, name, brand, images, variants, averageRating } = product || {};
    const user = useSelector((state) => state?.auth?.user);
    const theme = useSelector(state => state.theme)

    const [
        addToWishlist,
        { data, isLoading: loadingAddToWishlist, isSuccess, error },
    ] = useAddToWishlistMutation();
    const { data: anUserWishlist } = useAnUserWishlistQuery(user?._id);
    const activeItemsInWishlist = anUserWishlist?.wishlist?.products;

    const handleAddToWishlist = async (item) => {
        const payload = {
            user: user?._id,
            products: item,
        };

        try {
            await addToWishlist(payload);
        } catch (error) {
            toast.error("Failed to add to wishlist");
            console.error("Add to wishlist failed:", error);
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

    const activeItemsInCart = useSelector(getActiveItemsInCart);

    if (isLoading) {
        return <ProductCardSkeleton />;
    }

    return (
        <Card
            data-aos="zoom-in-up"
            data-aos-duration="1000"
            className="section-grant h[22rem] w-full rounded-lg flex items-center justify-center group relative overflow-hidden"
        >
            <div className="p-4">
                {/* Product Image */}
                <div>
                    <img
                        src={images?.[0]?.url || "/placeholder.jpg"}
                        alt={name || "Loading..."}
                        className="w-full h-full transition-opacity duration-500 mx-auto rounded-md"
                    />
                </div>

                {/* Product Details */}
                <div className="space-y-1.5">
                    <h2 className="text-base font-semibold">{name}</h2>
                    {
                         <div className="flex items-center gap-2 text-sm font-semibold">
                            <Star size={16} color={theme === "dark" ? "white" : "black"} fill={theme === "dark" ? "white" : "black"}/> <span>{averageRating}</span>
                        </div>
                    }
                    <div className="flex items-center justify-between">
                        <p className="text-base font-semibold">{brand}</p>
                        <p className="text-base font-semibold">${variants?.[0]?.price}.00</p>
                    </div>
                    <div className="flex items-center justify-between gap-6 shadow py-2 px-5 rounded-md">
                        <button>
                            {loadingAddToWishlist ? (
                                <IsLoadingLoaderRTK h="full" />
                            ) : !activeItemsInWishlist?.find(
                                (item) => item?.productId?._id === _id
                            ) ? (
                                <Heart
                                    // color="black"
                                    className="cursor-pointer"
                                    onClick={() => handleAddToWishlist(_id)}
                                />
                            ) : (
                                <Heart
                                    fill={theme === 'dark' ? 'white' : 'black'}
                                    className="cursor-pointer  "
                                    onClick={() => handleAddToWishlist(_id)}
                                />
                            )}
                        </button>
                        {activeItemsInCart.find((item) => item?._id === product?._id) && (
                            <ShoppingCart
                                color="black"
                                fill="black"
                                className="absolute top-3 right-3  flex items-center gap-3 primary-btn"
                            />
                        )}
                        <Link to={`/search/${_id}`} state={{ product }}>
                            <Eye className="cursor-pointer" />
                        </Link>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default ProductCard;