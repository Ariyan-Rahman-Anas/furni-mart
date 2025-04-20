import BlogCardSkeleton from "@/components/skeletons/BlogCardSkeleton"
import BlogCard from "@/components/BlogCard"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSearchBlogQuery } from "@/redux/apis/blogApi"
import { Card, CardTitle } from "@/components/ui/card";
import usePageTitle from "@/hooks/usePageTitle";

const BlogsPage = () => {
  usePageTitle("Blogs")
    const [filter, setFilter] = useState("");
    const [search, setSearch] = useState("");
    const { register, handleSubmit } = useForm();
  
    const onSubmit = (data) => {
      setSearch(data.search)
    };
  
  const { data: blogSearchResult, isError, error, isLoading: searchingBlogs } = useSearchBlogQuery({ search, popular: filter });
  
  return (
    <div className="my-8 space-y-6 px-2">
      <section className="space-y-3">
        <div className="space-y-3 text-center">
          <h1 className="heading">The WellWood Journal</h1>
          <p className="subheading">
            Design stories, practical tips, and curated ideas to transform your everyday spaces.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full md:w-5/6 mx-auto flex flex-col md:flex-row items-center gap-2"
        >
          <div className="flex items-center gap-2 md:gap-2 w-full">
            <Input
              type="text"
              placeholder="Search..."
              {...register("search", { required: false })}
            />
            <Input type="submit" value="Search" className="cursor-pointer bg-black dark:bg-white text-white dark:text-black px-4 md:px-5 w-fit font-medium " />
          </div>
          <Select onValueChange={(val) => setFilter(val)} >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sort by</SelectLabel>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </form>
      </section>

      {/* Error and Empty States */}
      {isError ? (
        <Card className="p-4 text-center w-full md:w-1/3 mx-auto">
          <CardTitle>Oops!</CardTitle>
              <p className="mt-4">{error?.data?.message || "Something went wrong"}</p>
        </Card>
      ) : blogSearchResult?.blogs.length < 1 && !searchingBlogs ? (
        <Card className="p-4 max-w-lg mx-auto text-center">
          No blogs found.
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full text-sm">
          {searchingBlogs
            ? Array.from({ length: 4 }).map((_, i) => (
              <BlogCardSkeleton key={i} />
            ))
            : blogSearchResult?.blogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
        </div>
      )}
    </div>
  )
}
export default BlogsPage