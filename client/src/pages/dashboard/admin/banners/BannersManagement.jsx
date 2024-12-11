import { Card, CardTitle } from "@/components/ui/card"
import { useAllBannerQuery } from "@/redux/apis/bannerApi"
import { Button } from "@/components/ui/button"
import { Eye, FilePenLine, Plus, Trash } from "lucide-react"
import { Link } from "react-router-dom"
import { ModularTable } from "@/components/ModularTable"
import IsLoadingLoaderRTK from "@/components/dashboard/IsLoadingLoaderRTK"
import DateFormatter from "@/components/DateFormatter"
import { useDeleteBannerMutation } from "@/redux/apis/bannerApi"
import useDelete from "@/hooks/useDelete"

const BannersManagement = () => {

    const { data: bannersData, isLoading, error } = useAllBannerQuery()
    const { handleDelete, isLoading: isDeleting } = useDelete(useDeleteBannerMutation)
    const onDeleteBanner = (id) => {
        handleDelete(id)
    }
    

    const columns = [
        {
            accessorKey: "banner",
            header: "Banner",
            cell: ({ row }) => (
                <div className="w-24 max-w-fit">
                    <img
                        src={row.original?.images?.[0].url || "/placeholder.jpg"}
                        alt={"Loading..."}
                        className="transition-opacity w-full h-full duration-500 rounded-md"
                    />
                </div>
            ),
        },
        {
            accessorKey: "title",
            header: "Title",
            cell: ({ row }) => <h1>{row.original?.title}</h1>,
        },
        {
            accessorKey: "description",
            header: "Description",
            cell: ({ row }) => <h1>{row.original?.description}</h1>,
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
                        to={`/admin/banners/${row.original?._id}`}>
                        <Eye
                            size={17}
                            className="cursor-pointer" />
                    </Link>
                    <Link to={`/admin/banners/${row.original._id}`}>
                        <FilePenLine size={17} />
                    </Link>
                    <Button
                        disabled={isDeleting}
                        onClick={() => onDeleteBanner(row.original._id)}
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
      <Card className="w-[96%] mx-auto my-2 md:w-full md:m-4 p-4 relative">
          <div className="flex flex-col md:flex-row items-center justify-between gap-2" >
              <CardTitle className="mb-2">Banners Management</CardTitle>
              <CardTitle className="mb-2">Total Banners: {bannersData?.banners?.length >= 1 ? bannersData?.banners?.length : 0}</CardTitle>
          </div>
          <Link to={"/admin/products/create"} className="absolute -top-1.5 md:-top-3  -right-1.5 md:-right-3">
              <Button className=" h-8 w-8 rounded-full">
                  <Plus />
              </Button>
          </Link>

          {
              error && <Card className="w-fit mx-auto p-4 text-center " >
                  <p className="font-semibold text-sm">Oops!</p>
                  <h1 className="font-bold text-4xl mb-1">404</h1>
                  <p>{error?.data?.message}.</p>
              </Card>
          }

          <ModularTable
              columns={columns}
              data={bannersData?.banners}
              showPagination={true}
              filterPlaceholder="Search by name..."
          />

      </Card>
  )
}
export default BannersManagement