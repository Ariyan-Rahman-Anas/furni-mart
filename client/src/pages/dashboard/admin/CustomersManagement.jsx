import { useUserListQuery } from "@/redux/apis/authApi"
import { ModularTable } from "@/components/ModularTable"
import { Card, CardTitle } from "@/components/ui/card"
import { Link } from "react-router-dom"
import { Eye, Trash } from "lucide-react"
import DateFormatter from "@/components/DateFormatter"

const CustomersManagement = () => {

    const { data: userList } = useUserListQuery()
    console.log("userList", userList)
    

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

  return (
      <Card className="w-full m-4 p-4 ">
          <CardTitle>Customer Management</CardTitle>
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