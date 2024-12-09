import { useState } from "react";
import { ArrowUpDown, Minus, Plus, Trash, Eye } from "lucide-react";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { decrementQuantity, incrementQuantity, removeFromCart } from "@/redux/slices/cartSlice";
import { Link } from "react-router-dom";
import { ModularTable } from "@/components/ModularTable";
import usePageTitle from "@/hooks/usePageTitle";
import { useAllCouponsQuery } from "@/redux/apis/couponApi";
import IsLoadingLoaderRTK from "@/components/dashboard/IsLoadingLoaderRTK";

const CartPage = () => {
  usePageTitle("Shopping Cart");
  const dispatch = useDispatch();
  const [coupon, setCoupon] = useState("");
  const [isDiscounted, setIsDiscounted] = useState(false);

  const { cartItems, total } = useSelector((state) => state.cart);
  // console.log("cartItems", cartItems)

  const { data: couponsList, isLoading:isCouponsListLoading } = useAllCouponsQuery()

  const isApplicableSubCategory = couponsList?.coupons?.filter((coupon) => {
    return coupon?.applicableSubcategories?.some((subcategory) =>
      cartItems.some((item) => item.subCategory === subcategory)
    );
  });

  console.log("Applicable Coupons:", isApplicableSubCategory);


  const discount = isDiscounted ? Math.round((total / 100) * 14) : 0;

  // Handle coupon apply and calculation of final amount
  const couponApplyHandler = (e) => {
    e.preventDefault();
    if (coupon === "FirstCoupon1") {
      toast.success("Congrats! You've got the discount 🎉");
      setIsDiscounted(true);
    } else {
      toast.error("Oops! This is an invalid coupon.");
      setIsDiscounted(false);
    }
  };

  // Calculate the final total including shipping, tax, and discount
  const finalTotal = Math.round(total - discount);

  const itemIncrementHandler = (itemId) => {
    const item = cartItems.find((item) => item._id === itemId);
    if (item) {
      if (item.quantity < item.stock) {
        dispatch(incrementQuantity(itemId));
      } else {
        toast.error("Sorry, this product is out of stock.");
      }
    }
  };

  const itemDecrementHandler = (itemId) => {
    dispatch(decrementQuantity(itemId));
  };

  const itemRemoveHandler = (itemId) => {
    console.log("itemId",itemId)
    dispatch(removeFromCart(itemId));
  };


  const columns = [
    {
      accessorKey: "image",
      header: "Image",
      cell: ({ row }) => (
        <div className="w-24 max-w-fit">
          <img
            src={row.original.image || "/placeholder.jpg"}
            alt={"Loading..."}
            className="transition-opacity w-full h-full duration-500 mx-auto rounded-md"
            placeholder="empty"
          />
        </div>
      ),
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "price",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => <div className="lowercase">{row.getValue("price")}</div>,
    },
    {
      accessorKey: "quantity",
      header: "Quantity",
      cell: ({ row }) => (
        <div className="border border-gray-400 flex items-center justify-center gap-3 w-fit px-3 py-1.5 rounded-md">
          <Minus
            size={15}
            onClick={() => itemDecrementHandler(row.original._id)}
            className="cursor-pointer"
          />
          <b>{row.original.quantity}</b>
          <Plus
            size={15}
            onClick={() => itemIncrementHandler(row.original._id)}
            className="cursor-pointer"
          />
        </div>
      ),
    },
    {
      accessorKey: "subtotal",
      header: "Sub-Total",
      cell: ({ row }) => <b>{row.original.subtotal?.toFixed(2)}</b>,
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => (
        <div className="flex items-center gap-4">
          <Link
            to={`/search/${row.original.productId}`}>
            <Eye
              size={17}
              className="cursor-pointer" />
          </Link>
          <Trash
          size={17}
          onClick={() => itemRemoveHandler(row.original._id)}
          className="cursor-pointer hover:text-myRed"
        />
        </div>
      ),
    },
  ]


  if (isCouponsListLoading) {
    return <IsLoadingLoaderRTK  h="90vh"/>
  }

  return (
    <>
      {/* {cartItems?.length >= 1 ? ( */}
      <div className="w-full md:w-[90%] mx-auto spacey-20 pb-4 px-2">
        {/* coupon informer */}
        <Card className="my-10 w-fit mx-auto p-4 font-semibold tracking-wide">
          <div className="animate-pulse text-center">
            Apply coupon <span className="text-myBlue">{"FirstCoupon1"}</span> to get <span className="text-myBlue">14% discount</span> on your total payment
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
          <Card className="col-span-7 md:col-span-5 p-4 ">
            <h1 className="heading">Cart Items</h1>
            <ModularTable
              columns={columns}
              data={cartItems}
              showPagination={true}
              filterPlaceholder="Search by name..."
            />
          </Card>

          <Card className="col-span-7 md:col-span-2 section-grant p-4 w-full">
            <h1 className="heading">Cart Total</h1>
            {/* payment calculating */}
            <div className="text-sm space-y-6 px-3">
              <div className="flex items-center justify-between">
                <p>Sub-total</p>
                <p className="font-semibold text-black dark:text-white">{Math.round(total?.toFixed(2))} Tk</p>
              </div>
              <div className="flex items-center justify-between">
                <p>Discount (-14%)</p>
                <p className="font-semibold text-black dark:text-white">{discount?.toFixed(2)} Tk</p>
              </div>
            </div>
            <hr className="hr mt-5 mb-2" />

            {/* coupon applying form */}
            <form onSubmit={couponApplyHandler} className="flex flex-col items-center gap-2 mb-4 w-full">
              <Input
                required
                type="text"
                placeholder="Enter the coupon code"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                className=" w-full"
              />
              <Button disabled={isDiscounted || total < 1 } type="submit" className="primary-btn">
                {isDiscounted ? "Coupon Applied" : "Apply Coupon"}
              </Button>
            </form>

            <div className="mt-8 flex items-end justify-between">
              <b>Total</b>
              <b>
                {isDiscounted ? (
                  <span className="flex flex-col items-end justify-between">
                    <span className="line-through">{Math.round(total?.toFixed(2))} Tk</span>
                    <span>{finalTotal} Tk</span>
                  </span>
                ) : (
                    <span>{Math.round(total?.toFixed(2))} Tk</span>
                )}
              </b>
            </div>
            <Link to={total < 1 ? "" : "/checkout"} state={{ cartItems, total, finalTotal, discount }}>
              <Button disabled={total < 1} className="w-full my-5">Proceed to checkout →</Button>
            </Link>
            <Link to={"/search"}>
              <Button className="w-full">← Continue Shopping</Button>
            </Link>
          </Card>
        </div>
      </div>
    </>
  );
};
export default CartPage;