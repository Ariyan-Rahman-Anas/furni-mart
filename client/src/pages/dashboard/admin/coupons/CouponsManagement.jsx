import { Card, CardTitle } from "@/components/ui/card"
import { ModularTable } from "@/components/ModularTable"
import { Eye, Plus, Trash } from "lucide-react"
import { Link } from "react-router-dom"
import { useAllCouponsQuery } from "@/redux/apis/couponApi"
import DateFormatter from "@/components/DateFormatter"
import { CouponDetailsDialog } from "@/components/dashboard/admin/coupons/CouponDetailsDialog"

const CouponsManagement = () => {
    const { data: allCouponsData } = useAllCouponsQuery()
    console.log("allCouponsData", allCouponsData)

    const columns = [
        {
            accessorKey: "name",
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
                    <CouponDetailsDialog couponId={row.original?._id}/>
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
        <Card className="w-full p-4 m-4 relative">
            <CardTitle className="mb-2">Coupon Management</CardTitle>
            <Link to={"/admin/coupons/create"} className="absolute -top-2 -right-2"><Plus className="h-8 w-8 p-1 text-white bg-black rounded-full" /></Link>


            <ModularTable
                columns={columns}
                data={allCouponsData?.coupons}
                showPagination={true}
                filterPlaceholder="Search by name..."
            />
        </Card>
    )
}
export default CouponsManagement