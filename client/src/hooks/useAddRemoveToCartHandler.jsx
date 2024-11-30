import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, getActiveItemsInCart, removeFromCart } from "@/redux/slices/cartSlice";

export const useAddRemoveToCartHandler = (product) => {
    console.log("product from hook", product)
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
            price: product.variant.price,
            image: product.image,
            quantity: 1,
            subtotal: product.variant.price,
            variantId: product.variant._id,
            color:product.color,
            productId: product._id,
            stock: product.variant.stock,
        };

        if (cartItem.stock <= 0) {
            return toast.error("Not enough product available in stock. Please try later.");
        }

        if (!isProductInCart) {
            dispatch(addToCart(cartItem));
            toast.success("Product added to cart");
        }
        else {
            dispatch(removeFromCart(cartItem.productId));
            toast.error("Product removed from cart");
        }
    };

    return handleAddRemoveToCart;
};