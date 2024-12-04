import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Loader from "@/components/Loader";
import ProtectedRoute from "./ProtectedRoutes";

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
const ProductsManagement = lazy(() => import("../pages/dashboard/admin/products/ProductsManagement"));
const CreateProductPage = lazy(() => import("../pages/dashboard/admin/products/CreateProductPage"));
const OrdersManagement = lazy(() => import("../pages/dashboard/admin/OrdersManagement"));
const PendingOrdersPage = lazy(() => import("../pages/dashboard/admin/PendingOrdersPage"));
const CustomersManagement = lazy(() => import("../pages/dashboard/admin/CustomersManagement"));
const CouponsManagement = lazy(() => import("../pages/dashboard/admin/coupons/CouponsManagement"));
const CreateCouponPage = lazy(() => import("../pages/dashboard/admin/coupons/CreateCouponPage"));
const CouponDetailsPage = lazy(() => import("../pages/dashboard/admin/coupons/CouponDetailsPage"));


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
            { path: "/registration", element: <ProtectedRoute isPublic={true} > <RegistrationPage /> </ProtectedRoute> },
            { path: "/login", element: <ProtectedRoute isPublic={true} ><LoginPage /></ProtectedRoute> },
            { path: "/search", element: <ProductSearchPage /> },
            { path: "/search/:id", element: <ProductDetailsPage /> },
            { path: "/cart", element: <ProtectedRoute><CartPage /></ProtectedRoute> },
            { path: "/wishlist", element: <ProtectedRoute><WishlistPage /></ProtectedRoute> },
            { path: "/checkout", element: <ProtectedRoute><CheckoutPage /></ProtectedRoute> },
            { path: "/payment-success", element: <ProtectedRoute><PaymentSuccessPage /></ProtectedRoute>},
            { path: "/payment-failed", element: <ProtectedRoute><PaymentFailedPage /></ProtectedRoute> },
            { path: "/payment-cancel", element: <ProtectedRoute><PaymentCancelPage /></ProtectedRoute>},
        ]
    },
    {
        path: "/admin",
        element: (
            <ProtectedRoute isAdmin={true} >
                <Suspense fallback={<Loader />}>
                    <DashboardLayout />
                </Suspense>
            </ProtectedRoute>
        ),
        children: [
            { path: "dashboard", element: <AdminDashboardOverviewPage /> },
            { path: "products", element: <ProductsManagement /> },
            { path: "products/create", element: <CreateProductPage /> },
            { path: "products", element: <ProductsManagement /> },
            { path: "orders", element: <OrdersManagement /> },
            { path: "pending", element: <PendingOrdersPage /> },
            { path: "customers", element: <CustomersManagement /> },
            { path: "coupons", element: <CouponsManagement /> },
            { path: "coupons/create", element: <CreateCouponPage /> },
            { path: "coupons/:id", element: <CouponDetailsPage /> },
        ]
    },
    {
        path: "/user",
        element: (
            <ProtectedRoute isAdmin={false}>
            <Suspense fallback={<Loader />}>
                <DashboardLayout />
            </Suspense>
            </ProtectedRoute> 
        ),
        children: [
            { path: "profile", element: <UserProfileOverviewPage /> },
            { path: "orders", element: <MyOrdersPage /> },
        ]
    }
])
export default MainRoute;