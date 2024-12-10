import { Card, CardTitle } from "@/components/ui/card"
import { ModularTable } from "@/components/ModularTable"
import { Eye, Plus, Trash } from "lucide-react"
import { Link } from "react-router-dom"
import { useAllCouponsQuery } from "@/redux/apis/couponApi"
import DateFormatter from "@/components/DateFormatter"
import IsLoadingLoaderRTK from "@/components/dashboard/IsLoadingLoaderRTK"
import { Button } from "@/components/ui/button"
import useDelete from "@/hooks/useDelete"
import { useDeleteACouponMutation } from "@/redux/apis/couponApi"
import { useUpdateCouponMutation } from "@/redux/apis/couponApi"
import { useEffect } from "react"
import { toast } from "sonner"

const CouponsManagement = () => {
    const { data: allCouponsData, isLoading, error:couponsQueryError } = useAllCouponsQuery()
    const [updateCoupon, { data, isLoading: isUpdating, isSuccess, error }] = useUpdateCouponMutation()
    const { handleDelete, isLoading: isDeleting } = useDelete(useDeleteACouponMutation)
    
    const handleUpdateCouponStatus = (id, currentStatus) => {
        const newStatus = currentStatus === "active" ? "expired" : "active";
        updateCoupon({ id, status: newStatus })
    }

    const onDeleteCoupon = (id) => {
        handleDelete(id)
    }

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
            accessorKey: "usageLimit",
            header: "Limit",
            cell: ({ row }) => <p>{row.original.usageLimit}</p>
        },
        {
            accessorKey: "usageCount",
            header: "Applied",
            cell: ({ row }) => <p>{row.original.usageCount}</p>
        },
        {
            accessorKey: "date",
            header: "Created",
            cell: ({ row }) => <DateFormatter date={row.original.createdAt} />,
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => <Button
                disabled={isUpdating}
                onClick={() => handleUpdateCouponStatus(row.original._id, row.original?.status)}
                className={`${row.original?.status === "active" ? "bg-green-500" : "bg-red-500"} capitalize`}>
                {row.original?.status}
            </Button>,
        },
        {
            accessorKey: "action",
            header: "Action",
            cell: ({ row }) => (
                <div className="flex items-center gap-6">
                    <Link to={`/admin/coupons/${row.original._id}`}>
                        <Eye size={17} />
                    </Link>
                    <Button
                        disabled={isDeleting}
                        onClick={() => onDeleteCoupon(row.original._id)}
                        className="h-8 w-8 rounded-full  "
                    >
                        <Trash />
                    </Button>
                </div>
            ),
        },
    ]

    useEffect(() => {
        if (error) {
            toast.error(error?.data?.message)
        }
        if (isSuccess) {
            toast.success(data?.message)
        }
    }, [data?.message, isSuccess, error])

    if (isLoading) {
        return <IsLoadingLoaderRTK h={"90vh"} />
    }

    return (
        <Card className="w-[96%] mx-auto my-2 md:w-full p-4 md:m-4 relative">
            <div className="flex flex-col md:flex-row items-center justify-between gap-2">
            <CardTitle className="mb-2">Coupon Management</CardTitle>
                <CardTitle className="mb-2">Total Coupons: {allCouponsData?.coupons?.length >= 1 ? allCouponsData?.coupons?.length : 0}</CardTitle>
            </div>
            <Link to={"/admin/coupons/create"} className="absolute -top-1.5 md:-top-3  -right-1.5 md:-right-3">
                <Button className=" h-8 w-8 rounded-full">
                    <Plus />
                </Button>
            </Link>

            {
                couponsQueryError && <Card className="w-fit mx-auto p-4 text-center " >
                    <p className="font-semibold text-sm">Oops!</p>
                    <h1 className="font-bold text-4xl mb-1">404</h1>
                    <p>{couponsQueryError?.data?.message}.</p>
                </Card>
            }

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