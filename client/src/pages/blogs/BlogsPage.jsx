import { useReadBlogsQuery } from "@/redux/apis/blogApi"
import BlogHeader from "./sections/BlogHeader"
import BlogCardSkeleton from "@/components/skeletons/BlogCardSkeleton"
import BlogCard from "@/components/BlogCard"

const BlogsPage = () => {

  const { data, isLoading } = useReadBlogsQuery()

  return (
    <div className="my-8 space-y-6 px-2 ">
      <BlogHeader />

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full text-sm ">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => <BlogCardSkeleton key={i} />)
          : data?.blogs.map(blog => <BlogCard key={blog._id} blog={blog} />)}
      </div>

    </div>
  )
}
export default BlogsPage