import { Card, CardTitle, CardFooter } from "@/components/ui/card";
import IsLoadingLoaderRTK from "@/components/dashboard/IsLoadingLoaderRTK";
import { Link, useParams } from "react-router-dom";
import { useSingleOrderQuery } from "@/redux/apis/orderApi";
import { toast } from "sonner";
import DateFormatter from "@/components/DateFormatter";
import { Button } from "@/components/ui/button";
import ReactDOMServer from "react-dom/server";
import OrderInvoice from "@/components/OrderInvoice";

const OrderDetailsPage = () => {
    const { id } = useParams()
    const { data: orderDetailsData, isLoading } = useSingleOrderQuery(id);

    const { cus_name, cus_email, cus_phone, cus_add1,
        cus_city, cus_country, cus_postcode, cus_state,
        discount_amount, total_amount } = orderDetailsData?.order?.paymentInfo || {};

    const productType = orderDetailsData?.order?.paymentInfo?.product_type;

    let orderedProducts = [];
    try {
        // Parse `product_type` into an array
        orderedProducts = productType ? JSON.parse(productType) : [];
    } catch (error) {
        toast.error("Failed to parse product_type JSON");
        console.error("Error parsing product_type:", error);
    }

    if (isLoading) {
        return <IsLoadingLoaderRTK h={"90vh"} />
    }

    // Function to handle print invoice
    const handlePrintInvoice = () => {
        const invoiceWindow = window.open("", "Print Invoice");
        if (!invoiceWindow) {
            toast.error("Failed to open print window");
            return;
        }

        const invoiceHTML = ReactDOMServer.renderToString(
            <OrderInvoice orderDetails={orderDetailsData} orderedProducts={orderedProducts} />
        );

        // Add styles and content to the new window
        invoiceWindow.document.write(`
      <html>
        <head>
          <title>Invoice</title>
          <!-- Include TailwindCSS CDN -->
            <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1, h2 { color: #333; }
            hr { border: 1px solid #ccc; }
          </style>
        </head>
        <body>
          ${invoiceHTML}
          <script>
            window.onload = function() {
              window.print();
            };
          </script>
        </body>
      </html>
    `);

        invoiceWindow.document.close();
    };

    return (
        <Card className="w-[98%] mx-auto my-2 md:w-full md:m-4 p-4 space-y-4 " >
            <CardTitle className="underline" >Order Details</CardTitle>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-2" >
                <div>
                    <DateFormatter date={orderDetailsData?.order?.createdAt} />
                    <h4 className="text-sm "><span className="font-semibold" >Order Id: </span> <span className="tracking-widest">{orderDetailsData?.order?._id}</span> </h4>
                    <h6><span className="font-semibold">Discounted:</span> {discount_amount}.00Tk </h6>
                    <h5><span className="font-semibold">Paid:</span> {total_amount}.00TK</h5>
                </div>
                <Button onClick={handlePrintInvoice}>Print Invoice</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="p-4 space-y-2 ">
                    <CardTitle className="mb-4" >Customer Info</CardTitle>
                    <div>
                        <h1>{cus_name}</h1>
                        <h2>{cus_email}</h2>
                        <h3>{cus_phone}</h3>
                    </div>
                    <CardFooter>
                        <p><span className="font-semibold">Address:</span>  <span>{cus_add1}, {cus_state}, {cus_postcode}, {cus_city}, {cus_country}</span></p>
                    </CardFooter>
                </Card>
                <Card className="p-4">
                    <CardTitle className="mb-4" >Ordered Products Info</CardTitle>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {
                            orderedProducts?.map(({ _id, name, quantity, price }) => <Link key={_id} to={`/search/${_id}`}> <Card className="p-4 space-y-2" >
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
    );
};

export default OrderDetailsPage;