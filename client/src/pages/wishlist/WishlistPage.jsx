import { Eye, Trash } from "lucide-react"
import { ModularTable } from '../../components/ModularTable';
import { useSelector } from "react-redux";
import { useAnUserWishlistQuery, useRemoveFromWishlistMutation } from "@/redux/apis/wishlistApi";
import { Link } from "react-router-dom";
import usePageTitle from "@/hooks/usePageTitle";
import { Card } from "@/components/ui/card";
import IsLoadingLoaderRTK from "@/components/dashboard/IsLoadingLoaderRTK";
import { Button } from "@/components/ui/button";
import useDelete from "@/hooks/useDelete";

const WishlistPage = () => {
  usePageTitle("Wishlist")
  const user = useSelector(state => state?.auth?.user)

  const { data: wishlistData, isLoading:wishlistQueryLoading } = useAnUserWishlistQuery(user?._id)
  const wishlistItems = wishlistData?.wishlist.products || []

  const {handleDelete, isLoading } = useDelete(useRemoveFromWishlistMutation)

  const handleRemoveWishlistItem = (id) => {
    const payload = {
      userId: user._id,
      productId: id
    }
    handleDelete(payload)
  }

  const columns = [
    {
      accessorKey: "image",
      header: "Image",
      cell: ({ row }) => (
        <div className="w-24 max-w-fit">
          <img
            src={row.original.productId?.images[0].url || "/placeholder.jpg"}
            alt={"Loading..."}
            className="transition-opacity w-full h-full duration-500 rounded-md"
          />
        </div>
      ),
    },
    {
      accessorKey: "name",
      accessorFn: (row) => row?.productId?.name,
      header: "Name",
      cell: ({ row }) => <h1>{row.original.productId?.name}</h1>,
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => <p>{row.original.productId?.variants[0].price}</p>,
    },
    {
      accessorKey: "stock",
      header: "Stock",
      cell: ({ row }) => <p>{row.original.productId?.variants[0].stock}</p>,
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => (
        <div className="flex items-center gap-4">
          <Link
            to={`/search/${row.original?.productId?._id}`}>
            <Eye
              size={17}
              className="cursor-pointer" />
          </Link>
          <Button
            disabled={isLoading}
            onClick={() => handleRemoveWishlistItem(row.original.productId._id)}
            className="h-8 w-8 rounded-full  "
          >
            <Trash />
          </Button>
        </div>
      ),
    },
  ]

  if (wishlistQueryLoading) {
    return <IsLoadingLoaderRTK h="90vh" />
  }

  return (
    <Card className="w-full md:w-[75%] mx-auto p-4 my-10 ">
      <ModularTable
        columns={columns}
        data={wishlistItems}
        showPagination={true}
        filterPlaceholder="Search by name..."
      />
    </Card>
  )
}
export default WishlistPage