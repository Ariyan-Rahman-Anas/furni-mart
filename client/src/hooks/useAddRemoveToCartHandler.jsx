import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, getActiveItemsInCart, removeFromCart } from "@/redux/slices/cartSlice";

export const useAddRemoveToCartHandler = (product) => {
    const dispatch = useDispatch();
    const activeItemsInCart = useSelector(getActiveItemsInCart); 
    
    const handleAddRemoveToCart = () => {
        const isProductInCart = activeItemsInCart.find(item => item._id === product._id);

        const cartItem = {
            _id: product._id,
            name: product.name,
            brand: product.brand,
            category: product.category,
            subCategory: product.subCategory,
            price: product.variant?.price,
            image: product.image,
            quantity: 1,
            subtotal: product.variant?.price,
            variantId: product.variant?._id,
            color:product.color,
            productId: product._id,
            stock: product.variant?.stock,
        };

        if (cartItem.stock <= 0) {
            return toast.error("Product not available, please try again later.");
        }

        if (!isProductInCart) {
            dispatch(addToCart(cartItem));
            toast.success("Added to Cart");
        }
        else {
            dispatch(removeFromCart(cartItem.productId));
            toast.success("Removed from Cart");
        }
    };

    return handleAddRemoveToCart;
};