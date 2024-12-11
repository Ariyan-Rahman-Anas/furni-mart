import { Star, StarHalf } from "lucide-react";
import { useSelector } from "react-redux";

const RatingStars = ({ rating }) => {
    const theme = useSelector(state => state?.theme)
    const stars = [];

    for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(rating)) {
            stars.push(<Star color={theme === "dark" ? "white" : "black"} fill={theme === "dark" ? "white" : "black"} key={i} size={13} />);
        } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
            stars.push(<StarHalf key={i} size={13} />);
        } else {
            stars.push(<Star key={i} size={13} />);
        }
    }

    return <div className="rating-stars flex items-center  gap-1 ">{stars}</div>;
};
export default RatingStars;