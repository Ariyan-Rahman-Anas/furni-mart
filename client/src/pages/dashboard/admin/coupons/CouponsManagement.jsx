import { Card, CardTitle } from "@/components/ui/card"
import { ModularTable } from "@/components/ModularTable"
import { Eye, Plus, Trash } from "lucide-react"
import { Link } from "react-router-dom"
import { useAllCouponsQuery } from "@/redux/apis/couponApi"
import DateFormatter from "@/components/DateFormatter"
import IsLoadingLoaderRTK from "@/components/dashboard/IsLoadingLoaderRTK"
import { Button } from "@/components/ui/button"

const CouponsManagement = () => {
    const { data: allCouponsData, isLoading } = useAllCouponsQuery()
    console.log("allCouponsData", allCouponsData)

    const columns = [
        {
            accessorKey: "name",
            accessorFn: (row) => row?.code,
            header: "Code",
            cell: ({ row }) => <h1>{row.original?.code}</h1>,
        },
        {
            accessorKey: "discountType",
            header: "Type",
            cell: ({ row }) => <h1>{row.original?.discountType}</h1>,
        },
        {
            accessorKey: "discountValue",
            header: "Value",
            cell: ({ row }) => <h1>{row.original?.discountValue}</h1>,
        },
        {
            accessorKey: "date",
            header: "Created",
            cell: ({ row }) => <DateFormatter date={row.original.createdAt} />,
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => <p>{row.original?.status}</p>,
        },
        {
            accessorKey: "action",
            header: "Action",
            cell: ({ row }) => (
                <div className="flex items-center gap-6">
                    <Link to={`/admin/coupons/${row.original._id}`}>
                        <Eye size={17} />
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
        <Card className="w-[96%] mx-auto my-2 md:w-full p-4 md:m-4 relative">
            <div className="flex flex-col md:flex-row items-center justify-between gap-2">
            <CardTitle className="mb-2">Coupon Management</CardTitle>
            <CardTitle className="mb-2">Total Coupons: {allCouponsData?.coupons?.length}</CardTitle>
            </div>
            <Link to={"/admin/coupons/create"} className="absolute -top-1.5 md:-top-3  -right-1.5 md:-right-3">
                <Button className=" h-8 w-8 rounded-full">
                    <Plus />
                </Button>
            </Link>

            <ModularTable
                columns={columns}
                data={allCouponsData?.coupons}
                showPagination={true}
                filterPlaceholder="Search by code..."
            />
        </Card>
    )
}
export default CouponsManagement