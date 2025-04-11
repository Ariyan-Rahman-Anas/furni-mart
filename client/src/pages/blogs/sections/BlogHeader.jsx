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
        <h1 className="heading" >Our Blog</h1>
        <p className="subheading" >Short summary about what users can expect.</p>
      </div>

      <div>
        <form className="w-full md:w-5/6 mx-auto flex items-center gap-4">
          <Input type="text" placeholder="Search..." />
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Fruits</SelectLabel>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
                <SelectItem value="grapes">Grapes</SelectItem>
                <SelectItem value="pineapple">Pineapple</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          
        </form>
      </div>
    </section>
  )
}
export default BlogHeader