import { useUserListQuery } from "@/redux/apis/authApi"
import { ModularTable } from "@/components/ModularTable"
import { Card, CardTitle } from "@/components/ui/card"
import { Link } from "react-router-dom"
import { Eye, Trash } from "lucide-react"
import DateFormatter from "@/components/DateFormatter"
import IsLoadingLoaderRTK from "@/components/dashboard/IsLoadingLoaderRTK"

const CustomersManagement = () => {
    const { data: userList, isLoading } = useUserListQuery()

    const columns = [
        {
            accessorKey: "name",
            header: "Name",
            cell: ({ row }) => <h1>{row.original?.name}</h1>,
        },
        {
            accessorKey: "email",
            header: "Email",
            cell: ({ row }) => <p>{row.original?.email}</p>,
        },
        {
            accessorKey: "isVerified",
            header: "IsVerified",
            cell: ({ row }) => <p>{row.original?.isVerified ? "Yes" : "No"}</p>,
        },
        {
            accessorKey: "isAdmin",
            header: "IsAdmin",
            cell: ({ row }) => <p>{row.original?.isAdmin ? "Yes" : "No"}</p>,
        },
        {
            accessorKey: "registered",
            header: "Registered",
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
            <div className="flex flex-col md:flex-row items-center justify-between gap-2">
            <CardTitle>Customer Management</CardTitle>
            <CardTitle>Total Customers: {userList?.users?.length}</CardTitle>
            </div>
            <ModularTable
                columns={columns}
                data={userList?.users}
                showPagination={true}
                filterPlaceholder="Search by name..."
            />
        </Card>
    )
}
export default CustomersManagement