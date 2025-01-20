import { Card } from "@/components/ui/card"
import { Cable, CircleDollarSign, Goal, PackageCheck, PencilRuler, Rocket } from "lucide-react"

const WhyChooseUs = () => {

    const benefits = [
        {
            icon: <PencilRuler size={50} />,
            title: "Customization",
            description: "We offer a wide range of customizable furniture pieces, making it easy for you to create your perfect home."
        },
        {
            icon: <PackageCheck size={50} />,
            title: "Quality",
            description: "Our team of experts ensures that all our products are of high quality and are made from the finest woods."
        },
        {
            icon: <Cable size={50} />,
            title: "Support",
            description: "We offer support and guidance to help you with any questions or concerns you may have."
        },
        {
            icon: <Rocket size={50} />,
            title: "Reliability",
            description: "We strive to provide excellent customer service and we're committed to our reputation."
        },
        {
            icon: <CircleDollarSign size={50} />,
            title: "Price",
            description: "We believe in fair trade and offer competitive prices, making it easy for you to buy furniture at the best prices."
        },
        {
            icon: <Goal size={50} />,
            title: "Affordability",
            description: "We understand that not everyone has access to affordable home improvement and we're committed to making it easy for you to buy furniture at a low price."
        }
    ]

    return (
        <div className="space-y-4">
            <div className="space-y-3">
                <h1 className="heading">Why Choose Well Wood?</h1>
                <p className="subheading">Your Home Deserves the Best – Here’s Why Thousands of Customers Trust Us!</p>
            </div>

            <div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {benefits.map(({icon, title, description}, index) => (
                        <Card key={index} className="p-4 space-y-2 text-center group hover:bg-gray-100 duration-1000 ">
                            <p className="text-4xl group-hover:animate-bounce mx-auto w-fit">{icon}</p>
                            <h2 className="text-xl font-semibold">{title}</h2>
                            <p className="text-gray-500 ">{description}</p>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default WhyChooseUs