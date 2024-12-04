import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth", // Smooth scrolling
        });
    }, [pathname]); // Run this effect when the route changes
    return null
}

export default ScrollToTop