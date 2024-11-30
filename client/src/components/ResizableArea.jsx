import { useState, useEffect } from 'react'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import BannerCarousel from './BannerCarousel'
import CouponTimer from './CouponTimer'

const ResizableArea = () => {

  const THREE_DAYS_IN_MS = 13 * 24 * 60 * 60 * 1000;
  const NOW_IN_MS = new Date().getTime();

  const dateTimeAfterThreeDays = NOW_IN_MS + THREE_DAYS_IN_MS;

  const [isLargeScreen, setIsLargeScreen] = useState(false)

  // Check screen size
  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024)  // 1024px for large screen
    }

    handleResize()  // Check screen size on component mount
    window.addEventListener("resize", handleResize)  // Listen for resize events

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const images = [
  "/images/slide1.jpg",
  "/images/slide2.jpg",
  "/images/slide3.jpg",
  "/images/slide4.jpg",
  "/images/slide5.jpg",
];

  return (
    <ResizablePanelGroup
      direction={isLargeScreen ? "horizontal" : "vertical"}
      className="rounded-md flex gap-4 w-full z-10 "
    >
      <ResizablePanel defaultSize={70} className='border rounded-md ' >
        <div className="flex h-full items-center justify-center">
          <BannerCarousel images={images} autoplayDelay={4000} />
        </div>
      </ResizablePanel>

      {/* <ResizableHandle /> */}

      <ResizablePanel defaultSize={30}>
              <ResizablePanelGroup
                className=" flex gap-4"
              direction={isLargeScreen ? "vertical" : "horizontal"}
              >
          <ResizablePanel defaultSize={50} className="border rounded-md" >
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">Two</span>
            </div>
          </ResizablePanel>

          {/* <ResizableHandle /> */}

          <ResizablePanel defaultSize={50} className="border rounded-md ">
            <div className="flex h-full items-center justify-center p-6">
              {/* <span className="font-semibold">Three</span> */}

              <CouponTimer targetDate={dateTimeAfterThreeDays}    />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

export default ResizableArea
