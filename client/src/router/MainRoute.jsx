import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Loader from "@/components/Loader";
import ProtectedRoute from "./ProtectedRoutes";
import NotFoundPage from "@/pages/NotFoundPage";

const App = lazy(() => import("./../App"));
const HomePage = lazy(() => import("./../pages/home/HomePage"));
const AboutPage = lazy(() => import("./../pages/about/AboutPage"));
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
const PrivacyPolicyPage = lazy(() => import("../pages/privacyPolicy/PrivacyPolicyPage"));
const TermsAndConditionsPage = lazy(() => import("../pages/termsAndConditions/TermsAndConditionsPage"));
const RefundAndEPPage = lazy(() => import("../pages/refundAndEP/RefundAndEPPage"));



// Admin dashboard components
const DashboardLayout = lazy(() => import("../pages/dashboard/DashboardLayout"));
const AdminDashboardOverviewPage = lazy(() => import("../pages/dashboard/admin/AdminDashboardOverviewPage"));
const ProductsManagement = lazy(() => import("../pages/dashboard/admin/products/ProductsManagement"));
const ProductCreatePage = lazy(() => import("../pages/dashboard/admin/products/ProductCreatePage"));
const ProductEditPage = lazy(() => import("../pages/dashboard/admin/products/ProductEditPage"));
const OrdersManagement = lazy(() => import("../pages/dashboard/admin/orders/OrdersManagement"));
const OrderDetailsPage = lazy(() => import("../pages/dashboard/admin/orders/OrderDetailsPage"));
const PendingTransactionsManagement = lazy(() => import("../pages/dashboard/admin/PendingTransactionsManagement"));
const CustomersManagement = lazy(() => import("../pages/dashboard/admin/CustomersManagement"));
const CouponsManagement = lazy(() => import("../pages/dashboard/admin/coupons/CouponsManagement"));
const CreateCouponPage = lazy(() => import("../pages/dashboard/admin/coupons/CouponCreatePage"));
const CouponDetailsPage = lazy(() => import("../pages/dashboard/admin/coupons/CouponDetailsPage"));
const ReviewsManagement = lazy(() => import("../pages/dashboard/admin/ReviewsManagement"));
const BannersManagement = lazy(() => import("../pages/dashboard/admin/banners/BannersManagement"));
const BannerEditPage = lazy(() => import("../pages/dashboard/admin/banners/BannerEditPage"));


// User profile components
const UserProfileOverviewPage = lazy(() => import("../pages/dashboard/user/UserProfileOverviewPage"));
const MyOrdersPage = lazy(() => import("../pages/dashboard/user/orders/MyOrdersPage"));
const MyOrderDetailsPage = lazy(() => import("../pages/dashboard/user/orders/MyOrderDetailsPage"));


const MainRoute = createBrowserRouter([
    {
        path: "/",
        element: <Suspense fallback={<Loader />} >
            <App />
        </Suspense>,
        errorElement:<NotFoundPage />,  
        children: [
            { path: "/", element: <HomePage /> },
            { path: "/about", element: <AboutPage /> },
            { path: "/registration", element: <ProtectedRoute isPublic={true} > <RegistrationPage /> </ProtectedRoute> },
            { path: "/login", element: <ProtectedRoute isPublic={true} ><LoginPage /></ProtectedRoute> },
            { path: "/products", element: <ProductSearchPage /> },
            { path: "/products/:id", element: <ProductDetailsPage /> },
            { path: "/cart", element: <ProtectedRoute><CartPage /></ProtectedRoute> },
            { path: "/wishlist", element: <WishlistPage /> },
            { path: "/checkout", element: <ProtectedRoute><CheckoutPage /></ProtectedRoute> },
            { path: "/payment-success", element: <ProtectedRoute><PaymentSuccessPage /></ProtectedRoute>},
            { path: "/payment-failed", element: <ProtectedRoute><PaymentFailedPage /></ProtectedRoute> },
            { path: "/payment-cancel", element: <ProtectedRoute><PaymentCancelPage /></ProtectedRoute>},
            { path: "/privacy-policy", element: <ProtectedRoute><PrivacyPolicyPage /></ProtectedRoute>},
            { path: "/terms-conditions", element: <ProtectedRoute><TermsAndConditionsPage /></ProtectedRoute>},
            { path: "/refund-exchange", element: <ProtectedRoute><RefundAndEPPage /></ProtectedRoute>},
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
            { path: "products/create", element: <ProductCreatePage /> },
            { path: "products/:id", element: <ProductEditPage /> },
            { path: "orders", element: <OrdersManagement /> },
            { path: "pending", element: <PendingTransactionsManagement /> },
            { path: "customers", element: <CustomersManagement /> },
            { path: "coupons", element: <CouponsManagement /> },
            { path: "coupons/create", element: <CreateCouponPage /> },
            { path: "orders/:id", element: <OrderDetailsPage /> },
            { path: "coupons/:id", element: <CouponDetailsPage /> },
            { path: "reviews", element: <ReviewsManagement /> },
            { path: "banners", element: <BannersManagement /> },
            { path: "banners/:id", element: <BannerEditPage /> },
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
            { path: "orders/:id", element: <MyOrderDetailsPage /> },
            { path: "*", element: <NotFoundPage /> },
        ]
    },
])
export default MainRoute;