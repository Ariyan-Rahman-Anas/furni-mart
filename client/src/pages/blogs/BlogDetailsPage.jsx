import { useLocation } from "react-router-dom"

const BlogDetailsPage = () => {

    const location = useLocation()
    const { title, content, images, slug, categories, tags, readingTime, views, createdAt } = location?.state?.blog || {}

  return (
      <div>
          <h1>{title} </h1>
    </div>
  )
}

export default BlogDetailsPage