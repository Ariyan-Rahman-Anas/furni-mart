import { Card, CardTitle } from "@/components/ui/card"
import IsLoadingLoaderRTK from "@/components/dashboard/IsLoadingLoaderRTK"
import DateFormatter from "@/components/DateFormatter"
import { ModularTable } from "@/components/ModularTable"
import { Eye, Trash } from "lucide-react"
import { Link } from "react-router-dom"
import { usePendingOrdersQuery } from "@/redux/apis/orderApi"

const PendingOrdersPage = () => {

    const { data: pendingOrdersData, isLoading, error } = usePendingOrdersQuery()

    const columns = [
        {
            accessorKey: "name",
            accessorFn: (row) => row.initiateData?.cus_name,
            header: "Name",
            cell: ({ row }) => <h1>{row.original?.initiateData.cus_name}</h1>,
        },
        {
            accessorKey: "cell",
            header: "Cell",
            cell: ({ row }) => <h1>{row.original?.initiateData.cus_phone}</h1>,
        },
        {
            accessorKey: "email",
            header: "Email",
            cell: ({ row }) => <h1>{row.original?.initiateData.cus_email}</h1>,
        },
        {
            accessorKey: "amount",
            header: "Amount",
            cell: ({ row }) => <p>{row.original?.initiateData.total_amount}</p>,
        },
        {
            accessorKey: "discount",
            header: "Discount",
            cell: ({ row }) => <p>{row.original?.initiateData.discount_amount}</p>,
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
          {
              error && error?.data?.message
                  ? <div className="text-center space-y-2">
                      <CardTitle className="text-2xl" >Oops!</CardTitle>
                      <p>{error.data.message} </p>
                  </div>
                  : 
                  <>
                    <CardTitle>Order Management</CardTitle>
                      <ModularTable
                          columns={columns}
                          data={pendingOrdersData?.pendingOrders}
                          showPagination={true}
                          filterPlaceholder="Search by name..."
                      />
                  </>
          }
      </Card>
  )
}
export default PendingOrdersPage