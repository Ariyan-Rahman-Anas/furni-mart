import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const BlogHeader = () => {
  return (
    <section className="space-y-3">
      <div className="space-y-3">
        <h1 className="heading" >The WellWood Journal</h1>
        <p className="subheading" >Design stories, practical tips, and curated ideas to transform your everyday spaces.</p>
      </div>

      <div>
        <form className="w-full md:w-5/6 mx-auto flex items-center gap-4">
          <Input type="text" placeholder="Search..." />
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select one</SelectLabel>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          
        </form>
      </div>
    </section>
  )
}
export default BlogHeader