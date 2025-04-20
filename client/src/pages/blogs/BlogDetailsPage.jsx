import BlogCard from "@/components/BlogCard"
import { Card, CardTitle } from "@/components/ui/card"
import { Clock, Eye } from "lucide-react"
import { useLocation } from "react-router-dom"
import { useReadBlogsQuery } from "@/redux/apis/blogApi"
import IsLoadingLoaderRTK from "@/components/dashboard/IsLoadingLoaderRTK"

const BlogDetailsPage = () => {
  const location = useLocation()
  const { title, content, images, categories, tags, readingTime, views, createdAt } = location?.state?.blog || {}

  // formatting the content text
  const formatContent = (text) => {
    const lines = text.split("\\n");
    return lines.map((line, i) => (
      <p key={i} className="mb-4">
        {line.split(/\*\*(.*?)\*\*/g).map((part, index) =>
          index % 2 === 1 ? <strong key={index}>{part}</strong> : part
        )}
      </p>
    ));
  };

  // fetching data for showing on related blogs
  const { data, isLoading } = useReadBlogsQuery()

  if (isLoading) {
    return <IsLoadingLoaderRTK h={"90vh"} />
  }

  return (
    <div className="mx-auto px-4 pt-6 space-y-20">
      {/* blog details */}
      <div className="w-full md:w-2/3 mx-auto">
        <div className="space-y-2 text-center">
          <p className="text-sm font-medium text-gray-500">{categories?.[0]}</p>
          <h1 className="text-4xl font-bold leading-tight">{title}</h1>
          <div className="flex items-center justify-center gap-4 text-gray-500 text-sm">
            <div className="flex items-center gap-1"><Clock size={16} /> <p>{new Date(createdAt).toLocaleDateString()}</p></div>
            <p>{readingTime} min read</p>
            <div className="flex items-center gap-1"><Eye size={16} /> <p>{views}</p></div>
          </div>
        </div>

        {images?.[0]?.url && (
          <img
            src={images[0].url}
            alt={title}
            loading="lazy"
            className="w-full rounded-lg object-cover h[400px] my-4 "
          />
        )}

        <div className="prose">
          {formatContent(content)}
        </div>

        <div className="flex flex-wrap gap-2 pt-6">
          {tags?.map((tag, idx) => (
            <span key={idx} className="bg-gray-300 text-sm px-3 py-1 rounded-full text-gray-700">#{tag}</span>
          ))}
        </div>
      </div>

      {/* related blogs */}
      <div className="pt-6 border-t">
        <CardTitle className="mb-4">You might also like</CardTitle>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data?.blogs?.length > 0 ? (
            data.blogs.map((relatedBlog) => (
              <BlogCard key={relatedBlog._id} blog={relatedBlog} />
            ))
          ) : (
            <Card className="p-4 text-center text-gray-500">No related blogs found.</Card>
          )}
        </div>
      </div>
    </div>
  )
}
export default BlogDetailsPage