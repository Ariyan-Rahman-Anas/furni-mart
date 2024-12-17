import ResizableArea from "@/components/ResizableArea"
import usePageTitle from "@/hooks/usePageTitle"
import FeaturedProducts from "@/components/FeaturedProducts"
import { Card, CardTitle } from "@/components/ui/card"

const HomePage = () => {
  usePageTitle("Home")

  return (
    <div className="px-2 space-y-20 ">
      <div className="w-full h-[40vh] md:h-[81vh] lg:h-[74vh] my-1.5 ">
        <ResizableArea />
      </div>
      <div className="p-4 rounded-lg shadow-sm border-2 border-dotted ">
        <CardTitle className="mb-4 border-b-2 border-dotted w-fit ">Featured Products</CardTitle>
        <FeaturedProducts />
      </div>
    </div>
  )
}

export default HomePage