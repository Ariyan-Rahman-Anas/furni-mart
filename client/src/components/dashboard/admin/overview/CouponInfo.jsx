import { Card, CardTitle } from '@/components/ui/card';
import { useAllCouponsQuery } from '@/redux/apis/couponApi';
import CouponTimer from '@/components/CouponTimer';

const CouponInfo = () => {

  const { data } = useAllCouponsQuery()
  const { code,
    discountType,
    discountValue, expirationDate } = data?.coupons.find(coupon => coupon.status === "active") || {}
  const activc = data?.coupons.find(coupon => coupon.status === "active")
  console.log("Active coupon", activc)

  return (
    <Card className="p-4" >
      <CardTitle>Active Coupon</CardTitle>

      <div>
        <h1>{code}</h1>
        <h2>{discountType}</h2>
        <h2>{  discountValue}</h2>
        <p>{}</p>
      </div>

      <CouponTimer targetDate={expirationDate} />
    </Card>
  )
}
export default CouponInfo