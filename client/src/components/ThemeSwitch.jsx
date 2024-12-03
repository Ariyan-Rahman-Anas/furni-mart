import { useDispatch, useSelector } from "react-redux"
import { toggleTheme } from "@/redux/slices/themeSlice"
import { useEffect } from "react"
import { MoonIcon, SunMedium } from "lucide-react"

const ThemeSwitch = () => {
    const dispatch = useDispatch()
    const theme = useSelector(state => state.theme)

    const toggleThemeHandler = () => {
        dispatch(toggleTheme());
    };

    // Apply theme class to the root <html> element whenever the theme changes
    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [theme]);

    return (
        <button onClick={toggleThemeHandler} className="text-black dark:text-white bg-white dark:bg-black hover:bg-gray-200 dark:hover:bg-gray-700 p-1.5 rounded-md " >
            {theme === "dark" ? <SunMedium /> : <MoonIcon />}
        </button>
    )
}
export default ThemeSwitch