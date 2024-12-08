import { Link, useParams } from "react-router-dom"
import { useSingleOrderQuery } from "@/redux/apis/orderApi"
import { Card, CardTitle, CardFooter } from "@/components/ui/card"
import DateFormatter from "@/components/DateFormatter"

const MyOrderDetailsPage = () => {
    const { id } = useParams()
    const { data:orderDetails } = useSingleOrderQuery(id)

    const userData = orderDetails?.order?.paymentInfo
    let orderedItems = []
    if (orderDetails) {
        orderedItems = JSON.parse(orderDetails?.order?.paymentInfo?.product_type)
    }
    console.log("data", orderedItems)
    console.log("userData", userData)

  return (
      <Card className="w-[98%] mx-auto my-2 md:w-full md:m-4 p-4 space-y-4">
          <CardTitle className="underline">Order Details</CardTitle>
          <div>
              <DateFormatter date={orderDetails?.order?.createdAt} />
              <h4 className="text-sm "><span className="font-semibold" >Order Id: </span> <span className="tracking-widest">{orderDetails?.order?._id}</span> </h4>
              <h6><span className="font-semibold">Discounted:</span> {userData?.discount_amount}.00Tk </h6>
              <h5><span className="font-semibold">Paid:</span> {userData?.total_amount}.00TK</h5>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-4 space-y-2 ">
                  <CardTitle className="mb-4" >Customer Info</CardTitle>
                  <div>
                      <h1>{userData?.cus_name}</h1>
                      <h2>{userData?.cus_email}</h2>
                      <h3>{userData?.cus_phone}</h3>
                  </div>
                  <CardFooter>
                      <p><span className="font-semibold">Address:</span>  <span>{userData?.cus_add1}, {userData?.cus_state}, {userData?.cus_postcode}, {userData?.cus_city}, {userData?.cus_country}</span></p>
                  </CardFooter>
              </Card>
              <Card className="p-4">
                  <CardTitle className="mb-4" >Ordered Products Info</CardTitle>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {
                          orderedItems?.map(({ _id, name, quantity, price, productId }) => <Link key={_id} to={`/search/${productId}`}> <Card className="p-4 space-y-2" >
                              <CardTitle>{name}</CardTitle>
                              <div className="text-sm">
                                  <p> <span className="font-semibold">Quantity:</span> {quantity}</p>
                                  <p><span className="font-semibold"> Price:</span> {price}</p>
                              </div>
                          </Card> </Link>)
                      }
                  </div>
              </Card>
          </div>
    </Card>
  )
}

export default MyOrderDetailsPage