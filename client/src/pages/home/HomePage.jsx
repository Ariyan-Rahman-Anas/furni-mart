import usePageTitle from "@/hooks/usePageTitle"
import FeaturedProducts from "@/components/FeaturedProducts"
import { CardTitle } from "@/components/ui/card"
import BannerCarousel from "@/components/BannerCarousel"
import { useAllBannerQuery } from "@/redux/apis/bannerApi"
import IsLoadingLoaderRTK from "@/components/dashboard/IsLoadingLoaderRTK"
import CouponTimer from "@/components/CouponTimer"
import { useAllCouponsQuery } from "@/redux/apis/couponApi"

const HomePage = () => {
  usePageTitle("Home")

  const { data: bannersData, isLoading } = useAllBannerQuery()
  const images = bannersData?.banners?.map(banner => banner?.images?.map(img => img?.url))

  const { data: couponsData } = useAllCouponsQuery()
  const activeCoupon = couponsData?.coupons?.filter(coupon => coupon.status === "active")

  if(isLoading){
    return <IsLoadingLoaderRTK h={"90vh"}/>
  }

  return (
    <div className="px-2 space-y-20 ">
      <div>
        <div className="w-full my-1.5">
          <BannerCarousel images={images} autoplayDelay={3000} />
        </div>

        <div className="flex items-center justify-center shadow hover:shadow-md dark:shadow-white w-full md:w-fit p-4 rounded-md duration-500 ">
          <CouponTimer targetDate={activeCoupon?.map(coupon => coupon?.expirationDate)} />
        </div>
      </div>
      
      <div className="p-4 rounded-lg shadow-sm border-2 border-dashed ">
        <CardTitle className="mb-4 border-b-2 border-dotted w-fit ">Featured Products</CardTitle>
        <FeaturedProducts />
      </div>
    </div>
  )
}
export default HomePage