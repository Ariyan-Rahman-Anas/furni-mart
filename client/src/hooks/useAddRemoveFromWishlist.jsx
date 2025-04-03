import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "@/redux/slices/wishlistSlice";
import { toast } from "sonner";

const useAddRemoveFromWishlist = () => {
    const dispatch = useDispatch();
    const wishlist = useSelector((state) => state.wishlist.wishlistItems);

    const isProductInWishlist = (productId) =>
        wishlist.some((item) => item.id === productId);

    const toggleWishlist = (product) => {
        if (isProductInWishlist(product.id)) {
            dispatch(removeFromWishlist(product.id));
            toast.success("Removed from Wishlist")
        } else {
            dispatch(addToWishlist(product));
            toast.success("Added to Wishlist")
        }
    };

    return { wishlist, isProductInWishlist, toggleWishlist };
};
export default useAddRemoveFromWishlist;