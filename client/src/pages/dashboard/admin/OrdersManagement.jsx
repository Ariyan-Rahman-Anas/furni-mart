import { ModularTable } from "@/components/ModularTable"
import { Eye, Trash } from "lucide-react"
import { Link } from "react-router-dom"
import DateFormatter from "@/components/DateFormatter"
import { Card, CardTitle } from "@/components/ui/card"
import IsLoadingLoaderRTK from "@/components/dashboard/IsLoadingLoaderRTK"
import { useAllOrdersQuery } from "@/redux/apis/orderApi"

const OrdersManagement = () => {

    const { data: allOrders, isLoading } = useAllOrdersQuery()
    console.log("allOrders", allOrders)


    const columns = [
        {
            accessorKey: "name",
            accessorFn: (row) => row.paymentInfo?.cus_name,
            header: "Name",
            cell: ({ row }) => <h1>{row.original?.paymentInfo.cus_name}</h1>,
        },
        {
            accessorKey: "price",
            header: "Price",
            cell: ({ row }) => <p>{row.original?.paymentInfo.total_amount}</p>,
        },
        {
            accessorKey: "discount",
            header: "Discount",
            cell: ({ row }) => <p>{row.original?.paymentInfo.discount_amount}</p>,
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => <p>{row?.original?.status}</p>,
        },
        {
            accessorKey: "date",
            header: "Date",
            cell: ({ row }) => <DateFormatter date={row.original.createdAt}/>,
        },
        {
            accessorKey: "action",
            header: "Action",
            cell: ({ row }) => (
                <div className="flex items-center gap-4">
                    <Link
                        to={`/search/${row.original?._id}`}>
                        <Eye
                            size={17}
                            className="cursor-pointer" />
                    </Link>
                    <Trash
                        size={17}
                        // onClick={() => handleRemoveWishlistItem(row.original.productId._id)}
                        className="cursor-pointer hover:text-myRed"
                    />
                </div>
            ),
        },
    ]

    if (isLoading) {
        return <IsLoadingLoaderRTK h={"90vh"} />
    }

    return (
        <Card className="w-[98%] mx-auto my-2 md:w-full md:m-4 p-4 ">
            <CardTitle>Order Management</CardTitle>
            <ModularTable
                columns={columns}
                data={allOrders?.orders}
                showPagination={true}
                filterPlaceholder="Search by name..."
            />
        </Card>
    )
}
export default OrdersManagement