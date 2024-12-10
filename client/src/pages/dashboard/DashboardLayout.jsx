import MobileNav from "@/components/dashboard/MobileNav";
import Sidebar from "@/components/dashboard/Sidebar";
import { Home, LineChart, MessageSquareHeart, Package, ShoppingCart, Users } from "lucide-react";
import { Outlet, useLocation } from "react-router-dom"

const DashboardLayout = () => {
    const location = useLocation()
    const adminLayout = location.pathname.includes("admin")
    const userLayout = location.pathname.includes("user")

    // sidebar navItems
    const adminNavItems = [
        { to: "/admin/dashboard", label: "Dashboard", icon: Home, active: true },
        { to: "/admin/customers", label: "Customers", icon: Users, active: false },
        { to: "/admin/products", label: "Products", icon: Package, active: false },
        { to: "/admin/orders", label: "Orders", icon: ShoppingCart, active: false },
        { to: "/admin/pending", label: "Pending Transactions", icon: ShoppingCart, active: false },
        { to: "/admin/coupons", label: "Coupons", icon: ShoppingCart, active: false },
        { to: "/admin/reviews", label: "Reviews", icon: MessageSquareHeart, active: false },
    ];
    const userNavItems = [
        { to: "/user/profile", label: "Profile", icon: Home, active: false },
        { to: "/user/orders", label: "My Orders", icon: ShoppingCart, active: false },
    ];


    // links for mobile nav
    const adminLinksForMobileNav = [
        { icon: <Home className="h-5 w-5" />, label: "Dashboard", to: "/admin/dashboard" },
        { icon: <Users className="h-5 w-5" />, label: "Customers", to: "/admin/customers" },
        { icon: <Package className="h-5 w-5" />, label: "Products", to: "/admin/products" },
        { icon: <ShoppingCart className="h-5 w-5" />, label: "Orders", to: "/admin/orders" },
        { icon: <ShoppingCart className="h-5 w-5" />, label: "Pending Orders", to: "/admin/pending" },
        { icon: <ShoppingCart className="h-5 w-5" />, label: "Coupons", to: "/admin/coupons" },
        { icon: <MessageSquareHeart className="h-5 w-5" />, label: "Reviews", to: "/admin/reviews" },
    ];
    const userLinksForMobileNav = [
        { icon: <Home className="h-5 w-5" />, label: "Profile", to: "/user/profile" },
        { icon: <ShoppingCart className="h-5 w-5" />, label: "Orders", to: "/user/orders" },
    ];

    // in small devices, sheet/navbar closer function 
    const handleUpgradeClick = () => {
        alert("Upgrade clicked!");
    };

    return (
        <div className="flex flex-col md:flex-row items-start justify-between max-h-screen overflow-auto ">

            { adminLayout && <Sidebar navItems={adminNavItems} />}
            {userLayout && <Sidebar navItems={userNavItems} />}

            {adminLayout && <MobileNav links={adminLinksForMobileNav} onUpgradeClick={handleUpgradeClick} />}
            {userLayout && <MobileNav links={userLinksForMobileNav} onUpgradeClick={handleUpgradeClick} />}

            <Outlet></Outlet>
        </div>
    )
}
export default DashboardLayout