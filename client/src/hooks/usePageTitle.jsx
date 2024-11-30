import { useEffect } from "react";

function usePageTitle(title) {
    useEffect(() => {
        document.title = title ? `${title} | Furniture Mart` : "Furniture Mart";
    }, [title]);
}
export default usePageTitle;