// import {
//     Home,
//     LineChart,
//     Menu,
//     Package,
//     Package2,
//     ShoppingCart,
//     Users,
// } from "lucide-react";
// // import { Badge } from "./badge";
// import { Link } from "react-router-dom";
// import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
// import { Button } from "../ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

// export default function MobileNav() {
//     return (
//         <Sheet>
//             <SheetTrigger asChild>
//                 <Button variant="outline" size="icon" className="shrink-0 md:hidden">
//                     <Menu className="h-5 w-5" />
//                     <span className="sr-only">Toggle navigation menu</span>
//                 </Button>
//             </SheetTrigger>
//             <SheetContent side="left" className="flex flex-col">
//                 <nav className="grid gap-2 text-lg font-medium">
//                     <Link
//                         to="#"
//                         className="flex items-center gap-2 text-lg font-semibold"
//                     >
//                         <Package2 className="h-6 w-6" />
//                         <span className="sr-only">Acme Inc</span>
//                     </Link>
//                     <Link
//                         to="#"
//                         className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
//                     >
//                         <Home className="h-5 w-5" />
//                         Dashboard
//                     </Link>
//                     <Link
//                         to="#"
//                         className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
//                     >
//                         <ShoppingCart className="h-5 w-5" />
//                         Orders
//                         {/* <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
//                             6
//                         </Badge> */}
//                     </Link>
//                     <Link
//                         to="/admin/products"
//                         className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
//                     >
//                         <Package className="h-5 w-5" />
//                         Products
//                     </Link>
//                     <Link
//                         to="#"
//                         className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
//                     >
//                         <Users className="h-5 w-5" />
//                         Customers
//                     </Link>
//                     <Link
//                         to="#"
//                         className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
//                     >
//                         <LineChart className="h-5 w-5" />
//                         Analytics
//                     </Link>
//                 </nav>
//                 <div className="mt-auto">
//                     <Card>
//                         <CardHeader>
//                             <CardTitle>Upgrade to Pro</CardTitle>
//                             <CardDescription>
//                                 Unlock all features and get unlimited access to our support
//                                 team.
//                             </CardDescription>
//                         </CardHeader>
//                         <CardContent>
//                             <Button size="sm" className="w-full">
//                                 Upgrade
//                             </Button>
//                         </CardContent>
//                     </Card>
//                 </div>
//             </SheetContent>
//         </Sheet>
//     );
// }








import React from "react";
import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

/**
 * Reusable MobileNav Component
 * @param {Object} props
 * @param {Array} props.links - Array of links, each with {icon: JSX.Element, label: string, to: string}
 * @param {Function} props.onUpgradeClick - Callback for the upgrade button
 */
export default function MobileNav({ links = [], onUpgradeClick }) {
    const [isSheetOpen, setSheetOpen] = React.useState(false);

    // Handles link click to navigate and close the sheet
    const handleLinkClick = () => {
        setSheetOpen(false); // Close the sheet
    };

    return (
        <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle navigation menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
                <nav className="grid gap-2 text-lg font-medium">
                    {links.map(({ icon, label, to }, index) => (
                        <Link
                            key={index}
                            to={to}
                            onClick={handleLinkClick}
                            className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                        >
                            {icon}
                            {label}
                        </Link>
                    ))}
                </nav>

                {/* CTA Section (Upgrade to Pro) */}
                <div className="mt-auto">
                    <Card>
                        <CardHeader>
                            <CardTitle>Upgrade to Pro</CardTitle>
                            <CardDescription>
                                Unlock all features and get unlimited access to our support team.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button
                                size="sm"
                                className="w-full"
                                onClick={onUpgradeClick} // Handle upgrade button click
                            >
                                Upgrade
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </SheetContent>
        </Sheet>
    );
}