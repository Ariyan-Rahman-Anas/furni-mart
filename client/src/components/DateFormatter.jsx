const DateFormatter = ({ date }) => {
    if (!date) return null;

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const daySuffix =
            day % 10 === 1 && day !== 11
                ? "st"
                : day % 10 === 2 && day !== 12
                    ? "nd"
                    : day % 10 === 3 && day !== 13
                        ? "rd"
                        : "th";

        const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(date);
        const year = date.getFullYear();

        return `${day}${daySuffix} ${month} ${year}`;
    };

    return <span>{formatDate(date)}</span>;
};

export default DateFormatter;