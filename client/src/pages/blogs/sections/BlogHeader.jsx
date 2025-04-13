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
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchBlogQuery } from "@/redux/apis/blogApi";
import BlogSearchResults from "./BlogSearchResults";

const BlogHeader = () => {
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log("Search Input:", data.search);
    setSearch(data.search)
    console.log("Selected Filter:", filter);
    // You can now call an API or filter blogs here
  };

  const { data } = useSearchBlogQuery({ search, filter });
  
  <BlogSearchResults results={data} />

  return (
    <section className="space-y-3">
      <div className="space-y-3 text-center">
        <h1 className="heading">The WellWood Journal</h1>
        <p className="subheading">
          Design stories, practical tips, and curated ideas to transform your everyday spaces.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full md:w-5/6 mx-auto flex items-center gap-4">
        <Input
          type="text"
          placeholder="Search..."
          {...register("search", { required: false })}
        />
        <Select onValueChange={(val) => setFilter(val)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter"/>
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
  );
};

export default BlogHeader;