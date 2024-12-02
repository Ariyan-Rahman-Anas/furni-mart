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
const DashboardLayout = lazy(() => import("../pages/dashboard/DashboardLayout"));
const AdminDashboardOverviewPage = lazy(() => import("../pages/dashboard/admin/AdminDashboardOverviewPage"));
const ProductsManagement = lazy(() => import("../pages/dashboard/admin/ProductsManagement"));
const OrdersManagement = lazy(() => import("../pages/dashboard/admin/OrdersManagement"));
const CustomersManagement = lazy(() => import("../pages/dashboard/admin/CustomersManagement"));


// User profile components
const UserProfileOverviewPage = lazy(() => import("../pages/dashboard/user/UserProfileOverviewPage"));
const MyOrdersPage = lazy(() => import("../pages/dashboard/user/MyOrdersPage"));


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
                    <DashboardLayout />
                </Suspense>
            // {/* </ProtectedRoute> */}
        ),
        children: [
            { path: "dashboard", element: <AdminDashboardOverviewPage /> },
            { path: "products", element: <ProductsManagement /> },
            { path: "orders", element: <OrdersManagement /> },
            { path: "customers", element: <CustomersManagement /> },
        ]
    },
    {
        path: "/user",
        element: (
            // <ProtectedRoute requiredRole="admin">
            <Suspense fallback={<Loader />}>
                <DashboardLayout />
            </Suspense>
            // {/* </ProtectedRoute> */}
        ),
        children: [
            { path: "profile", element: <UserProfileOverviewPage /> },
            { path: "orders", element: <MyOrdersPage /> },
        ]
    }
])
export default MainRoute;