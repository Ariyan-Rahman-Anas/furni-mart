import { ChevronRight, Clock, Eye } from "lucide-react";
import DateFormatter from "./DateFormatter";
import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
    
    const { title, content, images, slug, categories, tags, readingTime, views, createdAt } = blog || {}

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

  return (
      <div className="shadow border rounded-md py-2 px-3 overflow-hidden" >
          <div className="flex items-center justify-between">
              <p className="bg-gray-300 text-black text-xs rounded-md px-2.5 py-1 font-medium  " >{categories?.[0]}</p>
              <p>{tags?.[0]}</p>
          </div>
          <div className="h-[200px] w-full my-1 ">
              <img src={images?.[0]?.url} alt={title} className="w-full h-full rounded-md object-cover " />
          </div>
          <div className="flex items-center justify-between">
              <p>{readingTime} Min read</p>
              <div className="flex items-center gap-1" >
                  <Eye size={17} />
                  <p className="font-medium" >{views}</p>
              </div>
          </div>
          <h3 className="text-lg font-semibold my-2 ">{title}</h3>
              <p className="text-gray-600 leading-relaxed " >{formatContent(content.slice(0, 110))}</p>
          <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-gray-600 ">
                  <Clock size={17} />
                  <DateFormatter date={createdAt} />
              </div>
              <Link to={`/blogs/${slug}`} state={{blog}} className="flex items-center gap-1">
                  <p>Read more</p>
                  <ChevronRight size={17} />
              </Link>
          </div>
      </div>
  )
}
export default BlogCard