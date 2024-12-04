import { Link, useParams } from "react-router-dom"
import { useGetSingleCouponQuery } from "@/redux/apis/couponApi"
import { Card, CardTitle } from "@/components/ui/card"
import IsLoadingLoaderRTK from "@/components/dashboard/IsLoadingLoaderRTK"

const CouponDetailsPage = () => {
  const { id } = useParams()
  const { data: couponData, isLoading } = useGetSingleCouponQuery(id)
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

  console.log(couponData?.coupon)


  if (isLoading) {
    return <IsLoadingLoaderRTK h={"90vh"}/>
  }

  return (
    <Card className="w-[98%] mx-auto my-2 md:w-full p-4 md:m-4 ">
      <CardTitle className="underline mb-4" >Coupon Details </CardTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4 space-y-1.5 ">
          <CardTitle>Code: {code}</CardTitle>
          <p>Discount Type: {discountType}</p>
          <p>Discount Value: {discountValue}</p>
          <p>Minimum Order Value: {minOrderValue}</p>
          <p>Usage Limit: {usageLimit}</p>
          <p>Usage Count: {usageCount}</p>
        </Card>
        <div className="space-y-4">
          <Card className="p-4 space-y-3 ">
            <CardTitle>Applicable Subcategories: </CardTitle> 
            <ol className="list-decimal list-inside " >
              {applicableSubcategories?.map((subcategory, index) => <li key={index}> {subcategory}</li>)}
            </ol>
          </Card>
          <Card className="p-4 space-y-3" >
            <CardTitle>applicableProducts</CardTitle>
            <ol className="list-decimal list-inside" >
              {
                applicableProducts?.map(({_id, name}, index)=> <li key={index}> <Link to={`/search/${_id} `} >{name}</Link></li> )
              }
            </ol>
          </Card>
        </div>
      </div>
    </Card>
  )
}

export default CouponDetailsPage