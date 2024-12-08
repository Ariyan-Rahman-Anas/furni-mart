import { useSelector } from "react-redux"
import { useAnUserOrdersQuery } from "@/redux/apis/orderApi"
import { Card } from "@/components/ui/card"
import DateFormatter from "@/components/DateFormatter"
import { toast } from "sonner"
import { Link } from "react-router-dom"
import { CardTitle } from "@/components/ui/card"
import IsLoadingLoaderRTK from "@/components/dashboard/IsLoadingLoaderRTK"

const MyOrdersPage = () => {

  const user = useSelector(state => state?.auth?.user)

  const { data, isLoading, error } = useAnUserOrdersQuery(user.email)

  const stringifyToParse = data?.orders?.map(order => order?.paymentInfo?.product_type);

  if (stringifyToParse) {
    const orderedItems = stringifyToParse.map(item => {
      try {
        return JSON.parse(item); 
      } catch (e) {
        toast.error("Failed to parsing JSON")
        return null;
      }
    }).filter(item => item !== null); 
  }


  if (isLoading) {
    return <IsLoadingLoaderRTK h={"90vh"} />
  }

  return (
    <Card className="w-[98%] mx-auto my-2 md:w-full md:m-4 p-4">
      <CardTitle className="underline mb-4">My Orders</CardTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
        {
          data?.orders.map(({ _id, status, createdAt, paymentInfo }, index) => <Link key={index} to={`/user/orders/${_id}`} >
            <Card className="p-4 relative space-y-4 transform transition-transform hover:-translate-y-2 duration-300 " >
              <p className="text-sm bg-black w-fit text-white font-semibold px-3 py-1 rounded-md absolute top-3 right-3 " >{status} </p>
              <div>
                <h1 className="text-sm mt-6 "><span className="font-semibold">Order Id:</span> {_id}</h1>
                <span className="font-semibold">Date: </span>
                <DateFormatter date={createdAt} />
              </div>
              <div>
                <p ><span className="font-semibold" >Discount amount:</span> <span>{paymentInfo.discount_amount}.00 Tk</span> </p>
                <p ><span className="font-semibold" >Paid amount:</span> <span>{paymentInfo.total_amount}.00 Tk</span> </p>
              </div>
              <div>
                <h4 className="font-semibold">Delivery Address:</h4>
                <p>{paymentInfo.cus_add1}, {paymentInfo.cus_state}, {paymentInfo.cus_city}, {paymentInfo.ship_country} </p>
              </div>
            </Card> 
          </Link>)
        }
      </div>
    </Card>
  )
}

export default MyOrdersPage