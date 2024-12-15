import ResizableArea from "@/components/ResizableArea"
import usePageTitle from "@/hooks/usePageTitle"
import FeaturedProducts from "@/components/FeaturedProducts"

const HomePage = () => {
  usePageTitle("Home")

  return (
    <div className="px-2 space-y-20 ">
      <div className="w-full h-[40vh] md:h-[81vh] lg:h-[74vh] my-1.5 ">
        <ResizableArea />
      </div>
      <FeaturedProducts />
    </div>
  )
}

export default HomePage