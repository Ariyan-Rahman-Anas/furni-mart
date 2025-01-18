import { Eye, Heart, ShoppingCart, Star } from "lucide-react";
import { Card } from "./ui/card";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getActiveItemsInCart } from "@/redux/slices/cartSlice";
import ProductCardSkeleton from "./ProductCardSkeleton";
import useAddRemoveFromWishlist from "@/hooks/useAddRemoveFromWishlist";

const ProductCard = ({ isLoading, product }) => {
    const { _id, name, brand, images, variants, averageRating } = product || {};
    const theme = useSelector(state => state.theme)

    const activeItemsInCart = useSelector(getActiveItemsInCart);

    const { isProductInWishlist, toggleWishlist } = useAddRemoveFromWishlist();

    const handleWishlist = () => {
        toggleWishlist(product);
    };

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
                            <Star size={16} color={theme === "dark" ? "white" : "black"} fill={theme === "dark" ? "white" : "black"} /> <span>{averageRating}</span>
                        </div>
                    }
                    <div className="flex items-center justify-between">
                        <p className="text-base font-semibold">{brand}</p>
                        <p className="text-base font-semibold">${variants?.[0]?.price}.00</p>
                    </div>
                    <div className="flex items-center justify-between gap-6 shadow py-2 px-5 rounded-md">
                        <button onClick={handleWishlist}>
                            {isProductInWishlist(product._id)
                                ? <Heart
                                    fill={theme === 'dark' ? 'white' : 'black'}
                                    className="cursor-pointer" />
                                : <Heart className="cursor-pointer" />}
                        </button>

                        {activeItemsInCart.find((item) => item?._id === product?._id) && (
                            <ShoppingCart
                                color="black"
                                fill="black"
                                className="absolute top-3 right-3  flex items-center gap-3 primary-btn"
                            />
                        )}
                        <Link to={`/products/${_id}`} state={{ product }}>
                            <Eye className="cursor-pointer" />
                        </Link>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default ProductCard;