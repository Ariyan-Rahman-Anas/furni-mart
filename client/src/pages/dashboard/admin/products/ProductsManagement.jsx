import { useAllProductsQuery } from "@/redux/apis/productApi"
import { ModularTable } from "@/components/ModularTable"
import { ArrowUpDown, Eye, FilePenLine, Plus, Trash } from "lucide-react"
import { Link } from "react-router-dom"
import { Card, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import IsLoadingLoaderRTK from "@/components/dashboard/IsLoadingLoaderRTK"
import { useDeleteProductMutation } from "@/redux/apis/productApi"
import { useEffect } from "react"
import { toast } from "sonner"

const ProductsManagement = () => {
  const { data: allProducts, isLoading } = useAllProductsQuery()

  const [deleteProduct, {data, isSuccess, isLoading:isDeleting, error}] = useDeleteProductMutation()

  const handleDeleteProduct = (id) => {
    deleteProduct(id)
  }

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message)
    }
    if (isSuccess) {
      toast.success(data?.message)
    }
  }, [data?.message, error, isSuccess])
  
  const columns = [
    {
      accessorKey: "image",
      header: "Image",
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
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <h1>{row.original?.name}</h1>,
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => <p>{row.original?.category}</p>,
    },
    {
      accessorFn: (row) => row.variants?.[0]?.price, 
      id: "price",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price <ArrowUpDown />
        </Button>
      ),
      cell: ({ getValue }) => {
        const value = getValue(); 
        return <p>{value !== undefined && value !== null ? `$${value}` : "N/A"}</p>;
      },
    },
    {
      accessorKey: "stock",
      header: "Stock",
      cell: ({ row }) => <p>{row.original?.variants?.[0].stock}</p>,
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
          <Link to={`/admin/products/${row.original._id}`}>
            <FilePenLine size={17} />
          </Link>
          <Button
            disabled={isDeleting}
            onClick={() => handleDeleteProduct(row.original._id)}
            className="h-8 w-8 rounded-full  "
          >
            <Trash/>
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
      <CardTitle className="mb-2">Product Management</CardTitle>
      <Link to={"/admin/products/create"} className="absolute -top-2 -right-2">
        <Button className=" h-8 w-8 rounded-full">
        <Plus />
        </Button>
      </Link>

      <ModularTable
        columns={columns}
        data={allProducts?.products}
        showPagination={true}
        filterPlaceholder="Search by name..."
      />
    </Card>
  )
}
export default ProductsManagement