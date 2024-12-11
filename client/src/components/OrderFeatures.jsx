import { RefreshCcw, SendToBack, ShoppingCart, Truck } from "lucide-react"
import { Card } from "./ui/card"

const OrderFeatures = () => {

    const features = [
        {
            icon: <SendToBack size={30} className="shadow border p-1 rounded-full " />,
            heading: "Instant Refunds",
            details: "Enjoy peace of mind with our super-fast, no-hassle refund process, credited instantly to your account!"
        },
        {
            icon: <Truck size={30} className="shadow border p-1 rounded-full " />,
            heading: "Quick Delivery",
            details: "Get your orders delivered swiftly right to your doorstep with our reliable delivery service."
        },
        {
            icon: <RefreshCcw size={30} className="shadow border p-1 rounded-full " />,
            heading: "Easy Returns",
            details: "Returning a product is simple and stress-free, with clear instructions and no extra charges involved."
        },
        {
            icon: <ShoppingCart size={30} className='shadow border p-1 rounded-full' />,
            heading: "Secure Shopping",
            details: "Shop safely and securely, knowing your personal information is fully protected with advanced encryption!"
        },
    ]

    return (
        <div
            data-aos="fade-down"
            data-aos-duration="1000"
            className="flex flex-col md:flex-row items-center justify-between gap-6">
            {
                features?.map((feature, index) => <Card key={index} className="section-grant p-4 w-full ">
                    <div className="flex items-center gap-2">
                        {feature.icon}
                        <h1 className="font-semibold text-lg ">{feature.heading} </h1>
                    </div>
                    <p className="text-sm mt-2 ">{feature.details}</p>
                </Card> )
            }
        </div>
    )
}
export default OrderFeatures