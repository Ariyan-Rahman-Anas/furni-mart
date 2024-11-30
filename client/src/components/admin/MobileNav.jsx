import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { Loader2, LogIn, LogOut, Menu } from "lucide-react";
import { Card, CardContent, CardTitle } from "../ui/card";
import { useDispatch, useSelector } from "react-redux";
import {  DropdownMenuSeparator, DropdownMenuShortcut } from "./../../components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./../../components/ui/avatar";
import { useLogOutUserMutation } from "./../../redux/apis/authApi";
import { toast } from "sonner";
import { logout } from "./../../redux/slices/authSlice";

/**
 * @param {Object} props
 * @param {Array} props.links - Array of links, each with {icon: JSX.Element, label: string, to: string}
 * @param {Function} props.onUpgradeClick - Callback for the upgrade button
 */
export default function MobileNav({ links = [], onUpgradeClick }) {

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
                            className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                        >
                            {icon}
                            {label}
                        </Link>
                    ))}
                </nav>

                {/* CTA Section (Upgrade to Pro) */}
                <div className="mt-auto">
                    {
                        user
                            ? <Card>
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <CardTitle className="pl-6 mt-4 " >{user.name}</CardTitle>
                                <DropdownMenuSeparator />

                                <CardContent className="mt-2 space-y-2 ">
                                    <Link to={"/profile"}>My Profile</Link>
                                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>

                                    <DropdownMenuSeparator />
                                    {
                                        user.isAdmin === true && <>
                                            <Link to={"/admin/dashboard"}>Admin Dashboard</Link>
                                            <DropdownMenuShortcut>⇧⌘D</DropdownMenuShortcut>
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