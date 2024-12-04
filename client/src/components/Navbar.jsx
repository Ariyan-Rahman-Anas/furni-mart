import {
    Loader2,
    LogIn,
    LogOut,
    ShoppingCartIcon,
    Heart,
    Search
} from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { Button } from "./ui/button"
import { useLogOutUserMutation } from "@/redux/apis/authApi"
import { toast } from "sonner"
import { logout } from "@/redux/slices/authSlice"
import { getActiveItemsLengthInCart } from "@/redux/slices/cartSlice"
import { useAnUserWishlistQuery } from "@/redux/apis/wishlistApi"
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import MobileNav from "./dashboard/MobileNav"
import { Home, LineChart, Package, ShoppingCart, Users } from "lucide-react";
import ThemeSwitch from "./ThemeSwitch"

const Navbar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
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

    const navItems = [
        { title: "Home", route: "/" },
        { title: "Categories", route: "" }
    ]

    const cartItems = useSelector(getActiveItemsLengthInCart)
    const { data: wishlistData } = useAnUserWishlistQuery(user?._id)
    const wishlistItems = wishlistData?.wishlist?.products?.length >= 1 ? wishlistData.wishlist.products?.length : 0

    // nav link for mobile nav
    const links = [
        { icon: <Home className="h-5 w-5" />, label: "Home", to: "/" },
        { icon: <Package className="h-5 w-5" />, label: "Products", to: "/search" },
        { icon: <ShoppingCart className="h-5 w-5" />, label: "Orders", to: "/cart" },
    ];

    // sheet/mobile nav closer function
    const handleUpgradeClick = () => {
        alert("Upgrade clicked!");
    };

    return (
        <nav className="sticky top-0 w-full shadow p-4 md:p-3 rounded-b-lg flex items-center justify-between bg-white z-50 dark:bg-black">
            <div className="md:hidden">
                <MobileNav links={links} onUpgradeClick={handleUpgradeClick} />
            </div>

            <Link
                to={"/"}
                className="text-3xl font-semibold "
            >FurnitureMart
            </Link>

            {/* middle side */}
            <div className="hidden md:block" >
                <ul className="flex items-center gap-4">
                    {navItems.map((item, index) => (
                        <li key={index} className="relative group">
                            <NavLink
                                to={item.route}
                                className={({ isActive }) =>
                                    isActive && location.pathname === item.route
                                        ? "border-b-2 border-b-black dark:text-white duration-500"
                                        : "border-b-2 border-b-transparent text-gray-800 dark:text-gray-300 duration-500"
                                }
                            >
                                {item.title}
                                <span className="absolute left-0 right-0 bottom-0 top-[1.35rem] h-[.14rem] w-full rounded-md bg-black transform scale-x-0 origin-bottom transition-transform group-hover:scale-x-100 duration-300"></span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>

            {/* right side area */}
            <div className="flex items-end gap-10">

                <Link to="/search" className="hidden md:block p-1.5 " >
                    <Search />
                </Link>
                <div className="hidden md:block ">
                    <ThemeSwitch />
                </div>
                <Link to="/wishlist" className="relative p-1 " >
                    <Heart />
                    <p className="absolute -top-[.75rem] -right-1 h-5 w-5 font-semibold rounded-sm text-sm text-white dark:text-black bg-black dark:bg-white leading-5 text-center " > {wishlistItems} </p>
                </Link>
                <Link to="/cart" className="relative p-1">
                    <ShoppingCartIcon />
                    <p className="absolute -top-[.75rem] -right-1 h-5 w-5 font-semibold rounded-sm text-sm text-white dark:text-black bg-black dark:bg-white leading-5 text-center ">{cartItems} </p>
                </Link>

                <div className="hidden md:block ">
                    {
                        user
                            ?
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Avatar>
                                        <AvatarImage src="https://github.com/shadcn.png" alt="user's avatar" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56">
                                    <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem>
                                            <Link to={"/user/profile"}>My Profile</Link>
                                            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            {
                                                user.isAdmin === true && <>
                                                    <Link to={"/admin/dashboard"}>Admin Dashboard</Link>
                                                    <DropdownMenuShortcut>⇧⌘D</DropdownMenuShortcut>
                                                </>
                                            }
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
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
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            :
                            <Link to={"/login"}  ><LogIn /> </Link>
                    }
                </div>
            </div>
        </nav>
    )
}
export default Navbar