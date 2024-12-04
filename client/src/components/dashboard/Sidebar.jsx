import { Link, useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenuSeparator, DropdownMenuShortcut } from "@/components/ui/dropdown-menu";
import { useLogOutUserMutation } from "@/redux/apis/authApi";
import { useEffect } from "react";
import { toast } from "sonner";
import { logout } from "@/redux/slices/authSlice";
import { Loader2, LogOut, Package2 } from "lucide-react";
import ThemeSwitch from "@/components/ThemeSwitch";

export default function Sidebar({ navItems }) {
    const location =  useLocation()
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state?.auth?.user);

    const [logOutUser, { data, isSuccess, isLoading, error }] = useLogOutUserMutation();

    const handleLogout = () => {
        logOutUser("");
    };

    useEffect(() => {
        if (error) {
            toast.error(error?.data?.message);
        }
        if (isSuccess) {
            dispatch(logout());
            toast.success(data?.message);
            navigate("/login");
        }
    }, [data?.message, navigate, dispatch, error, isSuccess]);

    return (
        <aside className="hidden w-[28%] border-r bg-muted/40 md:block min-h-screen">
            <div className="flex h-full max-h-screen flex-col gap-2">
                <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                    <Link to="/" className="flex items-center gap-2 font-semibold">
                        <Package2 className="h-6 w-6" />
                        <span>Acme Inc</span>
                    </Link>
                </div>
                <div className="flex flex-col justify-between w-full min-h-[90vh] h-full">
                    <div className="flex-1">
                        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                            {navItems.map((item, index) => (
                                <Link
                                    key={index}
                                    to={item.to}
                                    className={`flex items-center gap-3 rounded-lg px-3 py-2 ${location.pathname.includes(item.to) ? "text-white bg-black" : "text-muted-foreground"
                                        } transition-all hover:bg-gray-200 hover:text-primary`}
                                >
                                    <item.icon className="h-4 w-4" />
                                    {item.label}
                                </Link>
                            ))}
                        </nav>
                    </div>
                    <div className="mt-auto p-4">
                        <Card className="relative">
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" alt="user's avatar" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div className="absolute top-1 right-1">
                                <ThemeSwitch />
                            </div>
                            <CardTitle className="pl-6 mt-4">{user?.name || "User"}</CardTitle>
                            <DropdownMenuSeparator />
                            <CardContent className="mt-2 space-y-2">
                                {
                                    user.isAdmin === true && location.pathname.includes("admin") && <>
                                        <Link to={"/user/profile"}>Profile</Link>
                                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                                    </>
                                }
                                {
                                    user.isAdmin === true && location.pathname.includes("user") && <>
                                        <Link to={"/admin/dashboard"}>Admin Dashboard</Link>
                                        <DropdownMenuShortcut>⇧⌘D</DropdownMenuShortcut>
                                    </>
                                }
                                <DropdownMenuSeparator />
                                <Link to={"/"}>Back to home</Link>
                                <DropdownMenuShortcut>⇧⌘H</DropdownMenuShortcut>
                                <DropdownMenuSeparator />
                                <Button
                                    disabled={isLoading}
                                    onClick={handleLogout}
                                    className="w-full"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Please wait
                                        </>
                                    ) : (
                                        <>
                                            <LogOut />
                                            Logout
                                        </>
                                    )}
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </aside>
    );
}