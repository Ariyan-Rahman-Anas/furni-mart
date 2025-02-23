import { ModularTable } from "@/components/ModularTable"
import { Eye, Trash } from "lucide-react"
import { Link } from "react-router-dom"
import DateFormatter from "@/components/DateFormatter"
import { Card, CardTitle } from "@/components/ui/card"
import IsLoadingLoaderRTK from "@/components/dashboard/IsLoadingLoaderRTK"
import { useAllOrdersQuery } from "@/redux/apis/orderApi"
import { Button } from "@/components/ui/button"
import useDelete from "@/hooks/useDelete"
import { useDeleteOrderMutation } from "@/redux/apis/orderApi"

const OrdersManagement = () => {
    const { data: allOrders, isLoading, error } = useAllOrdersQuery()
    const { handleDelete, isLoading: isDeleting } = useDelete(useDeleteOrderMutation)
    const onDeleteOrder = (id) => {
        handleDelete(id)
    }

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
            cell: ({ row }) => <DateFormatter date={row.original.createdAt} />,
        },
        {
            accessorKey: "action",
            header: "Action",
            cell: ({ row }) => (
                <div className="flex items-center gap-4">
                    <Link
                        to={`/admin/orders/${row.original?._id}`}>
                        <Eye
                            size={17}
                            className="cursor-pointer" />
                    </Link>
                    <Button
                        disabled={isDeleting}
                        onClick={() => onDeleteOrder(row.original._id)}
                        className="h-8 w-8 rounded-full  "
                    >
                        <Trash />
                    </Button>
                </div>
            ),
        },
    ]

    if (isLoading) {
        return <IsLoadingLoaderRTK h={"90vh"} />
    }

    return (
        <Card className="w-[98%] mx-auto my-2 md:w-full md:m-4 p-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-2">
                <CardTitle>Order Management</CardTitle>
                <CardTitle>Total Orders: {allOrders?.orders?.length >= 1 ? allOrders?.orders?.length : 0}</CardTitle>
            </div>
            {
                error && <Card className="w-fit mx-auto p-4 text-center " >
                    <p className="font-semibold text-sm">Oops!</p>
                    <h1 className="font-bold text-4xl mb-1">404</h1>
                    <p>{error?.data?.message}.</p>
                </Card>
            }
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