import { useEffect, useState } from "react";
import { ArrowUpDown, Minus, Plus, Trash, Eye } from "lucide-react";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { decrementQuantity, incrementQuantity, removeFromCart } from "@/redux/slices/cartSlice";
import { Link } from "react-router-dom";
import { ModularTable } from "@/components/ModularTable";
import usePageTitle from "@/hooks/usePageTitle";
import { useAllCouponsQuery } from "@/redux/apis/couponApi";
import IsLoadingLoaderRTK from "@/components/dashboard/IsLoadingLoaderRTK";
import { useApplyCouponForDiscountMutation } from "@/redux/apis/couponApi";
import { useForm } from "react-hook-form";

const CartPage = () => {
  usePageTitle("Shopping Cart");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm()

  const dispatch = useDispatch();
  const [isDiscounted, setIsDiscounted] = useState(false);

  const { cartItems, total } = useSelector((state) => state.cart);
  console.log("Cart items", cartItems)

  const { data: couponsList, isLoading: isCouponsListLoading } = useAllCouponsQuery()
  
  console.log("couponsList", couponsList)

  const { expirationDate, discountType, discountValue } = couponsList?.coupons?.find(coupon => coupon?.status === "active") || {}
  console.log("discount Value", discountValue)
  console.log("discount discountType", discountType)

  const isApplicableSubCategory = couponsList?.coupons?.filter((coupon) => {
    return (
      coupon?.status === "active" &&
      (coupon?.applicableSubcategories?.includes("allSubcategories") ||
        coupon?.applicableSubcategories?.some((subcategory) =>
          cartItems.some((item) => item.subCategory === subcategory)
        ))
    );
  });
  console.log("isApplicableSubCategory", isApplicableSubCategory)

  const isApplicableProducts = couponsList?.coupons?.filter((coupon) => {
    return (
      coupon?.status === "active" &&
      coupon?.applicableProducts?.some((product) =>
        cartItems.some((item) => item._id === product)
      )
    );
  });

  // let matchedCartItems = []

  const [matchedCartItems, setMatchedCartItems] = useState([])

  useEffect(() => {
    if (cartItems.filter((item) =>
      couponsList?.coupons?.some((coupon) =>
        coupon?.status === "active" &&
        coupon?.applicableProducts?.includes(item._id)
      )
    )) {
      setMatchedCartItems(matchedCartItems)
    }

    if (cartItems.filter((item) =>
      couponsList?.coupons?.some((coupon) =>
        coupon?.status === "active" &&
        coupon?.applicableSubcategories?.includes(item?.subCategory)
      )
    )) {
      setMatchedCartItems(matchedCartItems)
    }
  }, [cartItems, matchedCartItems, couponsList?.coupons])

  //  matchedCartItems = cartItems.filter((item) =>
  //   couponsList?.coupons?.some((coupon) =>
  //     coupon?.status === "active" &&
  //     coupon?.applicableProducts?.includes(item._id)
  //   )
  //  );
//    matchedCartItems = cartItems.filter((item) =>
//     couponsList?.coupons?.some((coupon) =>
//       coupon?.status === "active" &&
//    coupon?.applicableSubcategories?.includes(item?.subCategory)
//   )
// );
  // coupon?.applicableProducts?.includes(item._id)

  console.log("Matched Cart Items:", matchedCartItems);

  const discount = isDiscounted
    ? discountType === "flat"
      ? discountValue
      : discountType === "percentage"
        ? Math.round((total / 100) * discountValue)
        : 0
    : 0;

  // Handle coupon apply and calculation of final amount
  const [applyCouponForDiscount, { data: couponAppliedData, isLoading: isApplying, isSuccess: isApplied, error:couponApplyingError }] = useApplyCouponForDiscountMutation()

  const onSubmit = async (formData) => {
    try {
      const payload = {
        ...formData,
      };
      await applyCouponForDiscount(payload).unwrap();
    } catch (error) {
      console.error("Error creating coupon:", error);
      toast.error("An error occurred during coupon creation");
    }
  };

  useEffect(() => {
    if (couponApplyingError) {
      setIsDiscounted(false);
      toast.error(couponApplyingError?.data?.message)
    }
    if (isApplied) {
      setIsDiscounted(true);
      toast.success(couponAppliedData?.message)
    }
  }, [couponAppliedData?.message, couponApplyingError, isApplied])

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
    console.log("itemId", itemId)
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
            to={`/products/${row.original.productId}`}>
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
    return <IsLoadingLoaderRTK h="90vh" />
  }

  return (
    <>
      <div className="w-full md:w-[90%] mx-auto px-2">
        {/* coupon informer */}
        {
          isApplicableSubCategory?.length >= 1 && <Card className="my-6 w-fit mx-auto p-4 text-base tracking-wide">
            <div className="text-center">
              {
                isApplicableSubCategory?.map(({ code, discountValue, discountType }, index) => <p key={index}>Apply coupon <span className="font-semibold text-lg">{code}</span> to get  <span className="font-semibold text-lg">{discountValue}{discountType === "flat" ? "Tk" : "%"} </span> discount on your total payment</p>)
              }
            </div>
          </Card>
        }

        {
          isApplicableProducts?.length >= 1 && <Card className="my-6 w-fit mx-auto p-4 text-base tracking-wide">
            <div className="text-center">
              {
                isApplicableProducts?.map(({ code, discountValue, discountType }, index) => <p key={index}>Apply coupon <span className="font-semibold text-lg">{code}</span> to get  <span className="font-semibold text-lg">{discountValue} {discountType === "flat" ? "Tk" : "%"} </span> discount on your total payment</p>)
              }
            </div>
          </Card>
        }

        <div className="grid grid-cols-1 md:grid-cols-7 gap-6 mt-6">
          <Card className="col-span-7 md:col-span-5 p-4 ">
            <CardTitle>Cart Items</CardTitle>
            <ModularTable
              columns={columns}
              data={cartItems}
              showPagination={true}
              filterPlaceholder="Search by name..."
            />
          </Card>

          <Card className="col-span-7 md:col-span-2 section-grant p-4 w-full">
            <CardTitle>Cart Total</CardTitle>
            {/* payment calculating */}
            <div className="text-sm space-y-6 px-3">
              <div className="flex items-center justify-between">
                <p>Sub-total</p>
                <p className="font-semibold text-black dark:text-white">{Math.round(total?.toFixed(2))} Tk</p>
              </div>
              <div className="flex items-center justify-between">
                <p>Discount ({discountValue}{discountType==="flat" ? "TK" : "%"})</p>
                <p className="font-semibold text-black dark:text-white">{discount?.toFixed(2)} Tk</p>
              </div>
            </div>
            <hr className="hr mt-5 mb-2" />

            

            {
              isApplicableProducts?.length >= 1 || isApplicableSubCategory?.length >= 1 ? <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col items-center gap-2 mb-4 w-full">
                <Input
                  type="text"
                  placeholder="Enter the coupon code"
                  className=" w-full"
                  {...register("code", { required: true })}
                />
                <Button disabled={isDiscounted || total < 1 || isApplying} type="submit" className="primary-btn">
                  {isDiscounted ? "Coupon Applied" : "Apply Coupon"}
                </Button>
              </form> : ""
            }

            {/* coupon applying form */}
            

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
            <Link to={"/products"}>
              <Button className="w-full">← Continue Shopping</Button>
            </Link>
          </Card>
        </div>
      </div>
    </>
  );
};
export default CartPage;