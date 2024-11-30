import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Loader from "@/components/Loader";

const App = lazy(() => import("./../App"));
const HomePage = lazy(() => import("./../pages/home/HomePage"));
const RegistrationPage = lazy(() => import("./../pages/registration/RegistrationPage"));
const LoginPage = lazy(() => import("./../pages/login/LoginPage"));
const ProductSearchPage = lazy(() => import("../pages/productSearch/ProductsSearchPage"));
const CartPage = lazy(() => import("../pages/cart/CartPage"));
const ProductDetailsPage = lazy(() => import("../pages/productDetails/ProductDetailsPage"));
const WishlistPage = lazy(() => import("../pages/wishlist/WishlistPage"));
const CheckoutPage = lazy(() => import("../pages/checkout/CheckoutPage"));
const PaymentSuccessPage = lazy(() => import("../pages/payments/PaymentSuccessPage"));
const PaymentFailedPage = lazy(() => import("../pages/payments/PaymentFailedPage"));
const PaymentCancelPage = lazy(() => import("../pages/payments/PaymentCancelPage"));



// Admin dashboard components
const AdminDashboardLayout = lazy(() => import("./../pages/adminDashboard/AdminDashboardLayout"));
const AdminDashboardOverviewPage = lazy(() => import("./../pages/adminDashboard/AdminDashboardOverviewPage"));
const ProductsMS = lazy(() => import("./../pages/AdminDashboard/ProductsMS"));


const MainRoute = createBrowserRouter([
    {
        path: "/",
        element: <Suspense fallback={<Loader />} >
            <App />
        </Suspense>,
        children: [
            { path: "/", element: <HomePage /> },
            { path: "/registration", element: <RegistrationPage /> },
            { path: "/login", element: <LoginPage /> },
            { path: "/search", element: <ProductSearchPage /> },
            { path: "/search/:id", element: <ProductDetailsPage /> },
            { path: "/cart", element: <CartPage /> },
            { path: "/wishlist", element: <WishlistPage /> },
            { path: "/checkout", element: <CheckoutPage /> },
            { path: "/payment-success", element: <PaymentSuccessPage />},
            { path: "/payment-failed", element: <PaymentFailedPage />},
            { path: "/payment-cancel", element: <PaymentCancelPage />},
        ]
    },
    {
        path: "/admin",
        element: (
            // <ProtectedRoute requiredRole="admin">
                <Suspense fallback={<Loader />}>
                    <AdminDashboardLayout />
                </Suspense>
            // {/* </ProtectedRoute> */}
        ),
        children: [
            { path: "dashboard", element: <AdminDashboardOverviewPage /> },
            { path: "products", element: <ProductsMS /> },
        ]
    }
])
export default MainRoute;