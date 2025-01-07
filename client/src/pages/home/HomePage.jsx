import usePageTitle from "@/hooks/usePageTitle"
import FeaturedProducts from "@/components/FeaturedProducts"
import { CardTitle } from "@/components/ui/card"
import BannerCarousel from "@/components/BannerCarousel"
import { useAllBannerQuery } from "@/redux/apis/bannerApi"
import IsLoadingLoaderRTK from "@/components/dashboard/IsLoadingLoaderRTK"
import CouponTimer from "@/components/CouponTimer"
import { useAllCouponsQuery } from "@/redux/apis/couponApi"
import { ChevronRight } from "lucide-react"

const HomePage = () => {
  usePageTitle("Home")

  const { data: bannersData, isLoading } = useAllBannerQuery()
  const images = bannersData?.banners?.map(banner => banner?.images?.map(img => img?.url))

  const { data: couponsData } = useAllCouponsQuery()
  const activeCoupon = couponsData?.coupons?.filter(coupon => coupon.status === "active")

// Current date and time
const currentDate = new Date();

// Convert the string to a Date object
const givenDate = new Date(activeCoupon?.map(coupon => coupon?.expirationDate));

  if(isLoading){
    return <IsLoadingLoaderRTK h={"90vh"}/>
  }

  return (
    <div className="px-2 space-y-20 ">
      <div>
        <div className="w-full my-1.5">
          <BannerCarousel images={images} autoplayDelay={3000} />
        </div>

        {
          currentDate < givenDate && <div className="flex items-center justify-center shadow hover:shadow-md dark:shadow-white w-full md:w-fit p-4 rounded-md duration-500 ">
          <CouponTimer targetDate={activeCoupon?.map(coupon => coupon?.expirationDate)} />
        </div>
        }
      </div>
      
      <div className="p-4 rounded-lg shadow-sm border-2 border-dashed ">
        <div className="mb-4 flex items-center justify-between">
          <CardTitle className="border-b-2 border-dotted w-fit ">Featured Products</CardTitle>
          <div className="flex items-center gap-2">
            <CardTitle className="border-dotted w-fit ">See all</CardTitle>
          <ChevronRight size={17} /> 
          </div>
        </div>
        <FeaturedProducts />
      </div>
    </div>
  )
}
export default HomePage