import { useEffect } from "react";

function usePageTitle(title) {
    useEffect(() => {
        document.title = title ? `${title} | Well Wood` : "Well Wood";
    }, [title]);
}
export default usePageTitle;