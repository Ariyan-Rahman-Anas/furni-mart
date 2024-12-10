import { useUserListQuery } from "@/redux/apis/authApi"
import { ModularTable } from "@/components/ModularTable"
import { Card, CardTitle } from "@/components/ui/card"
import { Trash } from "lucide-react"
import DateFormatter from "@/components/DateFormatter"
import IsLoadingLoaderRTK from "@/components/dashboard/IsLoadingLoaderRTK"
import { Button } from "@/components/ui/button"
import { useDeleteUserMutation } from "@/redux/apis/authApi"
import useDelete from "@/hooks/useDelete"

const CustomersManagement = () => {
    const { data: userList, isLoading:isLoadingUserList, error } = useUserListQuery()

    const { handleDelete, isLoading: isDeleting } = useDelete(useDeleteUserMutation)
    const onDeleteUser = (id) => {
        handleDelete(id)
    }

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
            accessorKey: "phone",
            header: "Phone",
            cell: ({ row }) => <p>{row.original?.phone}</p>,
        },
        {
            accessorKey: "address",
            header: "Address",
            cell: ({ row }) => <p>{row.original?.address}</p>,
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
                    <Button
                        disabled={isDeleting}
                        onClick={() => onDeleteUser(row.original._id)}
                        className="h-8 w-8 rounded-full  "
                    >
                        <Trash />
                    </Button>
                </div>
            ),
        },
    ]

    if (isLoadingUserList) {
        return <IsLoadingLoaderRTK h={"90vh"} />
    }

    return (
        <Card className="w-[98%] mx-auto my-2 md:w-full md:m-4 p-4 ">
            <div className="flex flex-col md:flex-row items-center justify-between gap-2">
            <CardTitle>Customer Management</CardTitle>
                <CardTitle>Total Customers: {userList?.users?.length >= 1 ? userList?.users?.length : 0}</CardTitle>
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
                data={userList?.users}
                showPagination={true}
                filterPlaceholder="Search by name..."
            />
        </Card>
    )
}
export default CustomersManagement