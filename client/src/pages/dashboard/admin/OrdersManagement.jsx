import { useAllOrdersQuery } from "@/redux/apis/orderApi"
import { ModularTable } from "@/components/ModularTable"
import { Eye, Trash } from "lucide-react"
import { Link } from "react-router-dom"
import DateFormatter from "@/components/DateFormatter"
import { Card, CardTitle } from "@/components/ui/card"

const OrdersManagement = () => {

    const { data: allOrders } = useAllOrdersQuery()
    console.log("allOrders", allOrders)


    const columns = [
        {
            accessorKey: "name",
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

    return (
        <Card className="w-full m-4 p-4 ">
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