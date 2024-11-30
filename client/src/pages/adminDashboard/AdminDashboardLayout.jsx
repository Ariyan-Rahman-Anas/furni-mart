import MobileNav from "@/components/admin/MobileNav"
import Sidebar from "@/components/admin/Sidebar"
import { Home, LineChart, Package, ShoppingCart, Users } from "lucide-react";
import { Outlet } from "react-router-dom"

const AdminDashboardLayout = () => {


    const links = [
        { icon: <Home className="h-5 w-5" />, label: "Dashboard", to: "/admin/dashboard" },
        { icon: <ShoppingCart className="h-5 w-5" />, label: "Orders", to: "/orders" },
        { icon: <Package className="h-5 w-5" />, label: "Products", to: "/admin/products" },
        { icon: <Users className="h-5 w-5" />, label: "Customers", to: "/customers" },
        { icon: <LineChart className="h-5 w-5" />, label: "Analytics", to: "/analytics" },
    ];

    const handleUpgradeClick = () => {
        alert("Upgrade clicked!");
    };


    return (
        <div className="flex flex-col md:flex-row items-start justify-between ">
            <Sidebar />
            <MobileNav links={links} onUpgradeClick={handleUpgradeClick} />
            <Outlet></Outlet>
        </div>
    )
}
export default AdminDashboardLayout