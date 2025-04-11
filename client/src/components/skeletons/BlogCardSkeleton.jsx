const BlogCardSkeleton = () => {
    return (
        <div className="shadow border rounded-md py-2 px-3 animate-pulse">
            <div className="flex items-center justify-between mb-2 gap-4">
                <div className="bg-gray-300 rounded-md h-5 w-2/6" />
                <div className="bg-gray-300 rounded-md h-5 w-full" />
            </div>

            <div className="h-[200px] w-full my-1 bg-gray-200 rounded-md"/>

            <div className="flex bg-red500 items-center justify-between mt-2 mb-1 gap-4">
                <div className="h-4 w-full bg-gray-300 rounded" />
                <div className="h-4 w-2/6 bg-gray-300 rounded" />
            </div>

            <div className="h-6 bg-gray-300 rounded w-full my-3" />

            <div className="space-y-2 mb-3">
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-5/6" />
            </div>

            <div className="flex items-center justify-between gap-4">
                <div className="h-4 w-full bg-gray-300 rounded" />
                <div className="h-4 w-full bg-gray-300 rounded" />
            </div>
        </div>
    );
};
export default BlogCardSkeleton;