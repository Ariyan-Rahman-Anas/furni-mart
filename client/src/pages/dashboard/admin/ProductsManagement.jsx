import { useAllProductsQuery } from "@/redux/apis/productApi"
import { ModularTable } from "@/components/ModularTable"
import { ArrowUpDown, Eye, Trash } from "lucide-react"
import { Link } from "react-router-dom"
import { Card, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const ProductsManagement = () => {

  const { data: allProducts, isLoading, error } = useAllProductsQuery()
  console.log("allProducts", allProducts)
  
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
      accessorFn: (row) => row.variants?.[0]?.price, // Extract the nested price
      id: "price", // Unique ID for the column
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
    <Card className="min-h-screen w-full p-4 m-4">
      <CardTitle>Product Management</CardTitle>

      <ModularTable
        columns={columns}
        data={allProducts?.products}
        showPagination={true}
      />
    </Card>
  )
}
export default ProductsManagement