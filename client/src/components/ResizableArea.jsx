import { useState, useEffect } from 'react'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import BannerCarousel from './BannerCarousel'
import CouponTimer from './CouponTimer'
import { useAllBannerQuery } from '@/redux/apis/bannerApi'
import { useAllCouponsQuery } from '@/redux/apis/couponApi'

const ResizableArea = () => {
  
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


  
  const { data: bannersData, isLoading } = useAllBannerQuery()
  // console.log("bannersData", bannersData)

  const images = bannersData?.banners?.map(banner => banner?.images?.map(img => img?.url))


  const { data: couponsData } = useAllCouponsQuery()
  const activeCoupon = couponsData?.coupons?.filter(coupon => coupon.status === "active")


  return (
    <ResizablePanelGroup
      direction={isLargeScreen ? "horizontal" : "vertical"}
      className="rounded-md flex gap-4 w-full z-10 "
    >
      <ResizablePanel defaultSize={70} className='border rounded-md ' >
        <div className="flex h-full items-center justify-center">
          <BannerCarousel images={images} autoplayDelay={3000} />
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
              <CouponTimer targetDate={activeCoupon?.map(coupon => coupon?.expirationDate)}    />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

export default ResizableArea
