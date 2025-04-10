import usePageTitle from "@/hooks/usePageTitle"
import FeaturedProducts from "@/components/FeaturedProducts"
import BannerCarousel from "@/components/BannerCarousel"
import { useAllBannerQuery } from "@/redux/apis/bannerApi"
import IsLoadingLoaderRTK from "@/components/dashboard/IsLoadingLoaderRTK"
import CouponTimer from "@/components/CouponTimer"
import { useAllCouponsQuery } from "@/redux/apis/couponApi"
import PersonalizedRecommendations from "./sections/PersonalizedRecommendations"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import WhyChooseUs from "./sections/WhyChooseUs"
import CustomerReviews from "./sections/CustomerReviews"
import Newsletter from "./sections/Newsletter"
import Blog from "./sections/Blog"
import ModernFurniture from "./sections/ModernFurniture"
import SpecialOffers from "./sections/SpecialOffers"

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

  if (isLoading) {
    return <IsLoadingLoaderRTK h={"90vh"} />
  }

  return (
    <div className="px-2 space-y-24 md:space-y-28 ">
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

      <div className="space-y-6">
          <div className="space-y-3">
            <h1 className="heading ">Featured Products</h1>
            <p className="subheading" >Top Picks for Your Home – Discover Our Most Loved and Trending Furniture!</p>
          </div>         
        <FeaturedProducts />
        <div className="flex items-center justify-center ">
          <Link to={"/products"}>
            <Button>Explore all</Button>
          </Link>
        </div>
      </div>

      <ModernFurniture />

      <SpecialOffers />

      <PersonalizedRecommendations />

      <WhyChooseUs />

      <CustomerReviews />

      <Newsletter />

      <Blog />

    </div>
  )
}
export default HomePage