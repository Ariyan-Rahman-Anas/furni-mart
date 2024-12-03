import { Card, CardTitle } from "@/components/ui/card"
import { useUserListQuery } from "@/redux/apis/authApi"
import { ArrowLeftRight, Package, UsersRound } from "lucide-react"
import { Link } from "react-router-dom"
import { useAllProductsQuery } from "@/redux/apis/productApi"
import { useAllOrdersQuery } from "@/redux/apis/orderApi"

const TopCardsOverview = () => {

    const { data: allUser } = useUserListQuery()
    const { data: allProducts } = useAllProductsQuery()
    const { data: allOrders } = useAllOrdersQuery()

    return (
            <div className="w-full flex items-center flex-col md:flex-row justify-between gap-4 ">
                <Link to={"/admin/customers"} className="w-full" >
                    <Card className="p-4 flex items-end justify-between gap-x-8">
                        <div className="space-y-2">
                            <UsersRound />
                            <CardTitle>Total Users</CardTitle>
                        </div>
                        <h1 className="text-4xl font-semibold" >{allUser?.users?.length}</h1>
                    </Card>
                </Link>

            <Link to={"/admin/products"} className="w-full">
                    <Card className="p-4 flex items-end justify-between gap-x-8">
                        <div className="space-y-2">
                            <Package />
                            <CardTitle>Total Products</CardTitle>
                        </div>
                        <h1 className="text-4xl font-semibold" >{allProducts?.products?.length}</h1>
                    </Card>
                </Link>

            <Link to={"/admin/orders"} className="w-full">
                    <Card className="p-4 flex items-end justify-between gap-x-8">
                        <div className="space-y-2">
                            <ArrowLeftRight />
                            <CardTitle>Total Orders</CardTitle>
                        </div>
                        <h1 className="text-4xl font-semibold" >{allOrders?.orders?.length}</h1>
                    </Card>
                </Link>
            </div>
    )
}
export default TopCardsOverview