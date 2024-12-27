import { Card, CardTitle } from '@/components/ui/card';
import { useAllCouponsQuery } from '@/redux/apis/couponApi';
import CouponTimer from '@/components/CouponTimer';

const CouponInfo = () => {

  const { data } = useAllCouponsQuery()
  const { code,
    discountType,
    discountValue, expirationDate } = data?.coupons.find(coupon => coupon.status === "active") || {}

  return (
    <Card className="p-4" >
      <CardTitle>Active Coupon</CardTitle>

      <h1 className='font-semibold'>{code}</h1>
      <div className='flex items-center gap-2 mb-2 '>
        <h2>{discountType}</h2>
        <h2>{  discountValue}</h2>
        <p>{}</p>
      </div>

      <CouponTimer targetDate={expirationDate} />
    </Card>
  )
}
export default CouponInfo