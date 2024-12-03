import { useParams } from "react-router-dom"
import { useGetSingleCouponQuery } from "@/redux/apis/couponApi"
import { Card, CardTitle } from "@/components/ui/card"

const CouponDetailsPage = () => {
  const { id } = useParams()
  const { data: couponData } = useGetSingleCouponQuery(id)
  const {
    code,
    discountType,
    discountValue,
    minOrderValue,
    expirationDays,
    expirationHours,
    expirationMinutes,
    usageLimit,
    usageCount,
    applicableSubcategories,
    applicableProducts,
    status
  } = couponData?.coupon || {}
  return (
    <Card className="w-[98%] mx-auto my-2 md:w-full p-4 md:m-4 ">
      <CardTitle className="underline mb-4" >Coupon Details </CardTitle>
    </Card>
  )
}

export default CouponDetailsPage