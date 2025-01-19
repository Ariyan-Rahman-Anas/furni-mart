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
import { toast } from "sonner"
import { logout } from "@/redux/slices/authSlice"
import { getActiveItemsLengthInCart } from "@/redux/slices/cartSlice"
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import MobileNav from "./dashboard/MobileNav"
import { Home, Package, ShoppingCart } from "lucide-react";
import ThemeSwitch from "./ThemeSwitch"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "./ui/navigation-menu"
import { useLogOutUserMutation } from "@/redux/apis/authApi"
import { useCategoriesQuery, useSubCategoriesQuery } from "@/redux/apis/productApi"

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
    const wishlist = useSelector(state=>state.wishlist.wishlistItems)
    const wishlistItems = wishlist?.length >= 1 ? wishlist.length : 0

    // nav link for mobile nav
    const links = [
        { icon: <Home className="h-5 w-5" />, label: "Home", to: "/" },
        { icon: <Package className="h-5 w-5" />, label: "Products", to: "/products" },
        { icon: <Package className="h-5 w-5" />, label: "Products", to: "/products" },
        { icon: <ShoppingCart className="h-5 w-5" />, label: "Orders", to: "/cart" },
    ];

    // sheet/mobile nav closer function
    const handleUpgradeClick = () => {
        alert("Upgrade clicked!");
    };


    const {
        data: subCategoryData,
        isLoading: subCategoryLoading,
        error: subCategoryError,
    } = useSubCategoriesQuery("");
    const {
        data: categoryData,
        // isLoading: subCategoryLoading,
        // error: subCategoryError,
    } = useCategoriesQuery("");


    return (
        <nav className="sticky top-0 w-full shadow p-4 md:p-3 rounded-b-lg flex items-center justify-between bg-white z-50 dark:bg-black">
            <div className="flex items-center gap-2">
                <div className="lg:hidden">
                    <MobileNav links={links} onUpgradeClick={handleUpgradeClick} />
                </div>

                <Link
                    to={"/"}
                    className="text-3xl font-semibold "
                >FurnitureMart
                </Link>
            </div>

            {/* middle side */}
            <div className="hidden lg:block" >
                {/* <ul className="flex items-center gap-4">
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
                </ul> */}


                {/* .... */}
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavLink
                                to={"/"}
                                className={({ isActive }) =>
                                    isActive && location.pathname === "/"
                                        ? "px-4 py-2 rounded-md font-semibold text-sm bg-accent text-accent-foreground "
                                        : "px-4 py-2 rounded-md font-semibold text-sm hover:bg-accent hover:text-accent-foreground "
                                }
                            >
                                Home
                            </NavLink>
                        </NavigationMenuItem>


                        <NavigationMenuItem>
                            <NavLink
                                to={"/products"}
                                className={({ isActive }) =>
                                    isActive && location.pathname === "/"
                                        ? "px-4 py-2 rounded-md font-semibold text-sm bg-accent text-accent-foreground "
                                        : "px-4 py-2 rounded-md font-semibold text-sm hover:bg-accent hover:text-accent-foreground "
                                }
                            >
                                Products
                            </NavLink>
                        </NavigationMenuItem>


                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Category</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid w-[400px] gap-3 p-4 md:grid-cols-2">
                                    {categoryData?.categories?.map((category, index) => (
                                        <li key={index} className="hover:bg-accent hover:text-accent-foreground px-2 py-1 rounded-md">
                                            <Link to={"/products"} state={{ category }}>{category}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Sub-Category</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid w-[400px] gap3 p-2 md:grid-cols-3">
                                    {subCategoryData?.subCategories?.map((subCategory, index) => (
                                        <li key={index} className="hover:bg-accent hover:text-accent-foreground px-2 py-1 rounded-md">
                                            <Link to={"/products"} state={{ subCategory }}>{subCategory}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
                {/* .... */}
            </div>

            {/* right side area */}
            <div className="flex items-end gap-10">
                <div className="hidden lg:block ">
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

                <div className="hidden lg:block ">
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