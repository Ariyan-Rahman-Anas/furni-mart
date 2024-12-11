import { Eye, Trash } from "lucide-react"
import { ModularTable } from '../../components/ModularTable';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import usePageTitle from "@/hooks/usePageTitle";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import useAddRemoveFromWishlist from "@/hooks/useAddRemoveFromWishlist";

const WishlistPage = () => {
  usePageTitle("Wishlist")
  const wishlistItems = useSelector(state => state.wishlist.wishlistItems)
  const { toggleWishlist } = useAddRemoveFromWishlist();
  const handleWishlist = (product) => {
    toggleWishlist(product);
  };

  const columns = [
    {
      accessorKey: "image",
      header: "Image",
      cell: ({ row }) => (
        <div className="w-24 max-w-fit">
          <img
            src={row.original.images?.[0]?.url || "/placeholder.jpg"}
            alt={"Loading..."}
            className="transition-opacity w-full h-full duration-500 rounded-md"
          />
        </div>
      ),
    },
    {
      accessorKey: "name",
      accessorFn: (row) => row?.name,
      header: "Name",
      cell: ({ row }) => <h1>{row.original?.name}</h1>,
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => <p>{row.original?.variants?.[0]?.price}</p>,
    },
    {
      accessorKey: "stock",
      header: "Stock",
      cell: ({ row }) => <p>{row.original?.variants?.[0]?.stock}</p>,
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => (
        <div className="flex items-center gap-4">
          <Link
            to={`/search/${row.original._id}`}>
            <Eye
              size={17}
              className="cursor-pointer" />
          </Link>
          <Button
            onClick={() => handleWishlist(row.original)}
            className="h-8 w-8 rounded-full  "
          >
            <Trash />
          </Button>
        </div>
      ),
    },
  ]

  return (
    <Card className="w-full md:w-[75%] mx-auto p-4 pt-0 my-10 ">
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