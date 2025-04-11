import { useReadBlogsQuery } from "@/redux/apis/blogApi"
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import BlogCard from "@/components/BlogCard";
import BlogCardSkeleton from "@/components/skeletons/BlogCardSkeleton";

const Blog = () => {
    const { data, isLoading } = useReadBlogsQuery()

    return (
        <div className="space-y-6 flex flex-col items-center justify-center relative ">
            <div className="space-y-3">
                <h1 className="heading">Inspiration and Tips for Your Home</h1>
                <p className="subheading">Explore Our Blog for Expert Advice, Styling Ideas, and Furniture Care Tips!</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full text-sm ">
                {isLoading
                    ? Array.from({ length: 4 }).map((_, i) => <BlogCardSkeleton key={i} />)
                    : data?.blogs.map(blog => <BlogCard key={blog._id} blog={blog} />)}
            </div>

            <Link to={"/blogs"}>
                <Button>Explore more</Button>
            </Link>
        </div>
    )
}
export default Blog 