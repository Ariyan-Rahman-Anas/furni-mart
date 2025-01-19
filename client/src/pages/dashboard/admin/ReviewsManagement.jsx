import { Card, CardTitle } from "@/components/ui/card"
import { useAllReviewQuery } from "@/redux/apis/reviewApi"
import IsLoadingLoaderRTK from "@/components/dashboard/IsLoadingLoaderRTK"
import { ModularTable } from "@/components/ModularTable"
import { Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import DateFormatter from "@/components/DateFormatter"
import useDelete from "@/hooks/useDelete"
import { useDeleteReviewMutation } from "@/redux/apis/reviewApi"
import ReviewDetailsModal from "@/components/dashboard/admin/reviews/ReviewDetailsModal"

const ReviewsManagement = () => {
    const { data: reviewsList, isLoading, error } = useAllReviewQuery()
    console.log({error})

    const { handleDelete, isLoading: isDeleting } = useDelete(useDeleteReviewMutation)
    const onDeleteReview = (id) => {
        handleDelete(id)
    }

    const columns = [
        {
            accessorKey: "name",
            accessorFn: (row) => row?.product?.name,
            header: "Product",
            cell: ({ row }) => <h1>{row.original?.product?.name}</h1>,
        },
        {
            accessorKey: "reviewer",
            header: "Reviewer",
            cell: ({ row }) => <h1>{row.original?.user?.name}</h1>,
        },
        {
            accessorKey: "reviewer's email",
            header: "Reviewer's email",
            cell: ({ row }) => <h1>{row.original?.user?.email}</h1>,
        },
        {
            accessorKey: "reviewer's phone",
            header: "Reviewer's phone",
            cell: ({ row }) => <h1>{row.original?.user?.phone}</h1>,
        },
        {
            accessorKey: "rating",
            header: "Rating",
            cell: ({ row }) => <p>{row.original?.rating}</p>,
        },
        {
            accessorKey: "data",
            header: "Data",
            cell: ({ row }) => <DateFormatter date={row.original?.createdAt} />,
        },
        {
            accessorKey: "action",
            header: "Action",
            cell: ({ row }) => (
                <div className="flex items-center gap-4">
                    <ReviewDetailsModal reviewData={row.original} />
                    <Button
                        disabled={isDeleting}
                        onClick={() => onDeleteReview(row.original._id)}
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
        <Card className="w-[98%] mx-auto my-2 md:w-full md:m-4 p-4" >
            <div className="mb-4 flex flex-col md:flex-row items-center justify-between ">
                <CardTitle>Reviews Management</CardTitle>
                <CardTitle>Total Reviews: {reviewsList?.reviews?.length >= 1 ? reviewsList?.reviews?.length : 0}</CardTitle>
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
                data={reviewsList?.reviews}
                showPagination={true}
                filterPlaceholder="Search by product name..."
            />
        </Card>
    )
}
export default ReviewsManagement