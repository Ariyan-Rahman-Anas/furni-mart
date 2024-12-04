import { Card, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const PaymentCancelPage = () => {
  return (
    <div className="w-full min-h-[86vh] px-2 flex items-center justify-center">
      <Card className="p-4 text-center space-y-3 ">
        <CardTitle className="text-2xl font-bold text-red-500">Payment Cancelled</CardTitle>
        <CardDescription className="space-y-1">
          <p>
            It seems you have canceled the payment. If this was unintentional, you can try again anytime.
          </p>
          <p>
            If you have any questions or need assistance, feel free to reach out to our support team.
          </p>
        </CardDescription>
          <p>{`We're here to help!`}</p>
        <CardFooter>
          <Link to="/cart"> <Button>Go Back to Cart</Button> </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

export default PaymentCancelPage