import { Eye, Trash } from "lucide-react"
import { ModularTable } from '../../components/ModularTable';
import { useSelector } from "react-redux";
import { useAnUserWishlistQuery, useRemoveFromWishlistMutation } from "@/redux/apis/wishlistApi";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "sonner";

const WishlistPage = () => {
  // usePageTitle("Wishlist")

  const user = useSelector(state => state?.auth?.user)

  const { data: wishlistData, isLoading, error: wishlistQueryError } = useAnUserWishlistQuery(user?._id)
  const wishlistItems = wishlistData?.wishlist.products || []

  console.log("wishlistData", wishlistData)


  const [removeFromWishlist, { data, isSuccess, error }] = useRemoveFromWishlistMutation()
  const handleRemoveWishlistItem = (id) => {
    const payload = {
      userId: user._id,
      productId:id
    }
    removeFromWishlist(payload)
  }
  useEffect(() => {
    if (error?.data) {
      toast.error(error?.data?.message, { duration: 3000 });
    }

    if (isSuccess) {
      toast.success(data?.message, { duration: 3000 });
    }
  }, [error, isSuccess, data?.message]);

  console.log("data", data)


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
      header: "Name",
      cell: ({ row }) => <b>{row.original.productId?.name}</b>,
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => <b>{row.original.productId?.variants[0].price}</b>,
    },
    {
      accessorKey: "stock",
      header: "Stock",
      cell: ({ row }) => <b>{row.original.productId?.variants[0].stock}</b>,
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
          <Trash
            size={17}
            onClick={() => handleRemoveWishlistItem(row.original.productId._id)}
            className="cursor-pointer hover:text-myRed"
          />
        </div>
      ),
    },
  ]


  return (
    <div className="w-full md:w-[75%] mx-auto pt-10 pb-4 space-y-16 ">
      <ModularTable
        columns={columns}
        data={wishlistItems}
        showPagination={false}
      />
    </div>
  )
}

export default WishlistPage