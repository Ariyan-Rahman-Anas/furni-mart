import { Card, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const PaymentFailedPage = () => {
  return (
    <div className="w-full min-h-[86vh] px-2 flex items-center justify-center">
      <Card className="p-4 text-center space-y-3 ">
        <CardTitle className="text-2xl font-bold text-red-500">Payment Failed</CardTitle>
        <CardDescription className="space-y-1" >
          <p>Unfortunately, your payment could not be processed at this time. This might be due to a technical issue or insufficient funds.</p>
          <p>Please check your payment details and try again. If the issue persists, don't hesitate to contact our support team for assistance.</p>
        </CardDescription>
        <p>{`We're here to help!`}</p>
        <CardFooter>
          <Link to="/cart"> <Button>Retry Payment</Button> </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
export default PaymentFailedPage