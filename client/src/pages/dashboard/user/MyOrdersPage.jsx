import { useSelector } from "react-redux"
import { useAnUserOrdersQuery } from "@/redux/apis/orderApi"
import { Card } from "@/components/ui/card"
import DateFormatter from "@/components/DateFormatter"
import { toast } from "sonner"

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


  return (
    <Card className="min-h-screen w-full p-4 m-4 overflow-auto " >
      My Orders
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
        {
          data?.orders.map(order => <Card key={order._id} className="p-4 relative space-y-4 transform transition-transform hover:-translate-y-2 duration-300 " >
            <p className="text-sm bg-black w-fit text-white font-semibold px-3 py-1 rounded-md absolute top-3 right-3 " >{order.status} </p>
            <div>
              <h1 className="text-sm mt-6 "><span className="font-semibold">Order Id:</span> {order._id}</h1>
              <span className="font-semibold">Date: </span>
              <DateFormatter date={order.createdAt} />
            </div>
            <div>
              {/* <h3 className="text-xl font-medium " >{order.paymentInfo.product_name}</h3> */}
              <p ><span className="font-semibold" >Discount amount:</span> <span>{order.paymentInfo.discount_amount}.00 Tk</span> </p>
              <p ><span className="font-semibold" >Paid amount:</span> <span>{order.paymentInfo.total_amount}.00 Tk</span> </p>
            </div>
            <div>
              <h4 className="font-semibold">Delivery Address:</h4>
              <p>{order.paymentInfo.cus_add1}, {order.paymentInfo.cus_state}, {order.paymentInfo.cus_city}, {order.paymentInfo.ship_country} </p>
            </div>
          </Card> )
        }
      </div>
    </Card>
  )
}

export default MyOrdersPage