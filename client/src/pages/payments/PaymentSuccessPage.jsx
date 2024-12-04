import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { resetCart } from "@/redux/slices/cartSlice";
import { Card, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";

function PaymentSuccessPage() {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    // Check if the success query parameter is present
    if (params.get("success") === "true") {
      // Dispatch the resetCart action
      dispatch(resetCart());
    }
  }, [dispatch, location.search]);

  return (
    <div className="w-full min-h-[86vh] px-2 flex items-center justify-center ">
      <Card className="p-4 text-center space-y-3 ">
        <CardTitle>Payment Successful!</CardTitle>
        <CardDescription className="space-y-1">
          <p>Your order has been placed successfully. Thank you for shopping with us!</p>
          <p>If you have any questions or need assistance, feel free to contact our support team at any time.</p>
        </CardDescription>
        <CardFooter>
          <p>Enjoy your purchase, and we look forward to serving you again soon!</p>
        </CardFooter>
      </Card>
    </div>
  );
}
export default PaymentSuccessPage;