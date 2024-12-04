import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { Loader2, LogIn, LogOut, Menu } from "lucide-react";
import { Card, CardContent, CardTitle } from "../ui/card";
import { useDispatch, useSelector } from "react-redux";
import { DropdownMenuSeparator, DropdownMenuShortcut } from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useLogOutUserMutation } from "../../redux/apis/authApi";
import { toast } from "sonner";
import { logout } from "../../redux/slices/authSlice";
import ThemeSwitch from "@/components/ThemeSwitch";

/**
 * @param {Object} props
 * @param {Array} props.links - Array of links, each with {icon: JSX.Element, label: string, to: string}
 * @param {Function} props.onUpgradeClick - Callback for the upgrade button
 */
export default function MobileNav({ links = [], onUpgradeClick }) {
    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [isSheetOpen, setSheetOpen] = React.useState(false);

    // Handles link click to navigate and close the sheet
    const handleLinkClick = () => {
        setSheetOpen(false);
    };

    const user = useSelector(state => state?.auth?.user)


    const [logOutUser, { data, isSuccess, isLoading, error }] = useLogOutUserMutation()
    const handleLogout = () => {
        logOutUser("")
    }

    useEffect(() => {
        if (error) {
            toast.error(error?.data?.message)
        }
        if (isSuccess) {
            dispatch(logout())
            toast.success(data?.message)
            navigate("/login")
        }
    }, [data?.message, navigate, dispatch, error, isSuccess])


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
                            className={`flex items-center gap-3 rounded-lg px-3 py-2 ${location.pathname.includes(to) ? "bg-gray-200 text-primary" : "text-muted-foreground"
                                } transition-all hover:bg-gray-100 hover:text-primary`}
                        >
                            {icon}
                            {label}
                        </Link>
                    ))}
                </nav>

                {/* logged in user account*/}
                <div className="mt-auto relative ">
                    {
                        user
                            ? <Card>
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" alt="user's avatar" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <div className="absolute top-1 right-1 " >
                                    <ThemeSwitch />
                                </div>
                                <CardTitle className="pl-6 mt-4 " >{user.name}</CardTitle>
                                <DropdownMenuSeparator />

                                <CardContent className="mt-2 space-y-2 ">
                                    <Link to={"/user/profile"}>My Profile</Link>
                                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>

                                    <DropdownMenuSeparator />
                                    {
                                        user.isAdmin === true && <>
                                            <Link to={"/admin/dashboard"}>Admin Dashboard</Link>
                                            <DropdownMenuShortcut>⇧⌘D</DropdownMenuShortcut>
                                        </>
                                    }
                                    {
                                        location.pathname.includes("user") && <>
                                            <DropdownMenuSeparator />
                                            <Link to={"/"}>Back to home</Link>
                                            <DropdownMenuShortcut>⇧⌘H</DropdownMenuShortcut>
                                        </>
                                    }
                                    {
                                        location.pathname.includes("admin") && <>
                                            <DropdownMenuSeparator />
                                            <Link to={"/"}>Back to home</Link>
                                            <DropdownMenuShortcut>⇧⌘H</DropdownMenuShortcut>
                                        </>
                                    }
                                    <DropdownMenuSeparator />
                                    <Button
                                        disabled={isLoading}
                                        onClick={handleLogout}
                                        className="w-full absolut bottom-0 left-0 ">
                                        {
                                            isLoading ? (
                                                <>
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                    Please wait
                                                </>
                                            ) : <> <LogOut />Logout </>
                                        }
                                    </Button>
                                </CardContent>
                            </Card>
                            : <Link to={"/login"}>
                                <Button className="w-full" >
                                    Login<LogIn />
                                </Button>
                            </Link>
                    }
                </div>
            </SheetContent>
        </Sheet>
    );
}