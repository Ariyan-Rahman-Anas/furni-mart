import { useEffect, useState } from "react"
import { Card, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import IsLoadingLoaderRTK from "@/components/dashboard/IsLoadingLoaderRTK"
import MultiSelectDropdown from "@/components/MultiSelectDropdown"
import { toast } from "sonner"
import { useCreateCouponMutation } from "@/redux/apis/couponApi"
import { useNavigate } from "react-router-dom"
import { useAllProductsQuery, useSubCategoriesQuery } from "@/redux/apis/productApi"

const CouponCreatePage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm()

  const navigate = useNavigate()
  const [createCoupon, {data:couponCreateData, isLoading:isCreating, isSuccess, error}] = useCreateCouponMutation()
  const { data: subCategoriesData, isLoading: isSubCategoriesLoading } = useSubCategoriesQuery()
  const {data:productsData} = useAllProductsQuery()

  const [selectedSubCategories, setSelectedSubCategories] = useState([])
  const [selectedProducts, setSelectedProducts] = useState([])
  const [mode, setMode] = useState("")

  const handleSubCategoriesChange = (selectedValues) => {
    setSelectedSubCategories(selectedValues)
  }
  const handleProductsChange = (selectedValues) => {
    setSelectedProducts(selectedValues)
  }

  const subCategoryOptions = subCategoriesData?.subCategories?.map((subCategory) => ({
    value: subCategory,
    label: subCategory,
  }))

  const productOptions = productsData?.products?.map(product => ({
    value: product?.name,
    label: product?.name,
    id: product._id,
  }))

  const onSubmit = async (formData) => {
    try {
      const payload = {
        ...formData,
        applicableSubcategories: mode === "allSubcategories"
          ? "allSubcategories"
          : mode === "specificSubcategories"
            ? selectedSubCategories
            : [],
        applicableProducts: mode === "specificProducts"
          ? selectedProducts?.map(
            (selectedProduct) => productOptions?.find(
              (option) => option?.value === selectedProduct
            )?.id
          )
          : [],
      };
      await createCoupon(payload).unwrap();
    } catch (error) {
      console.error("Error creating coupon:", error);
      toast.error("An error occurred during coupon creation");
    }
  };


  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message || "An unknown error occurred.");
    }
    if (isSuccess) {
      toast.success(couponCreateData?.message || "Coupon Created");
      navigate("/admin/coupons");
    }
  }, [couponCreateData?.message, error, isSuccess, navigate]);


  if (isSubCategoriesLoading) {
    return <IsLoadingLoaderRTK h="90vh" />
  }

  return (
    <Card className="w-[98%] mx-auto my-2 md:w-full md:m-4 p-4">
      <CardTitle className="mb-4 underline">Create New Coupon </CardTitle>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4">

        {/* code => type */}
        <div  className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex flex-col gap-0.5 w-full">
            <Label className="text-sm font-medium">
              Code<span className="text-myRed">*</span>
            </Label>
            <Input type="text" placeholder="Coupon code" {...register("code", { required: true })} />
          </div>

          <div className="flex flex-col gap-0.5 w-full">
            <Label className="text-sm font-medium">
              Discount type<span className="text-myRed">*</span>
            </Label>
            <select
              className="border py-1.5 px-4 outline-none rounded-md dark:bg-gray-950 "
              {...register("discountType", { required: true })}
            >
              <option value="">Select Discount type</option>
              <option value="flat">flat</option>
              <option value="percentage">percentage</option>
            </select>
          </div>
        </div>

        {/* discount value => min order value => */}
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex flex-col gap-0.5 w-full">
            <Label className="text-sm font-medium">
              Discount Value<span className="text-myRed">*</span>
            </Label>
            <Input type="number" placeholder="Coupon discount value" {...register("discountValue", { required: true })} />
          </div>

          <div className="flex flex-col gap-0.5 w-full">
            <Label className="text-sm font-medium">
              Minimum Order Value<span className=""></span>
            </Label>
            <Input type="number" placeholder="Coupon discount value" {...register("minOrderValue", { required: true })} />
          </div>
        </div>

        {/* applicable subcategories => applicable products => */}
        <div className="flex flex-col md:flex-row items-start gap-4">
          <div className="flex flex-col gap-0.5 w-full">
            <Label className="text-sm font-medium">Applicable Mode</Label>
            <select
              className="border w-full py-1.5 px-4 outline-none rounded-md dark:bg-gray-950 "
              {...register("mode", {
                required: true,
                onChange: (e) => setMode(e.target.value),
              })}
            >
              <option value="">Select Mode</option>
              <option value="allSubcategories">All Subcategories</option>
              <option value="specificSubcategories">Specific Subcategories</option>
              <option value="specificProducts">Specific Products</option>
            </select>
          </div>

          {mode === "specificSubcategories" && (
            <div className="flex flex-col gap-0.5 w-full">
              <Label className="text-sm font-medium">Specific Subcategories</Label>
              <MultiSelectDropdown
                options={subCategoryOptions}
                value={selectedSubCategories}
                onChange={handleSubCategoriesChange}
                placeholder="Select subcategories"
              />
            </div>
          )}

          {mode === "specificProducts" && (
            <div className="flex flex-col gap-0.5 w-full">
              <Label className="text-sm font-medium">Specific Products</Label>
              <MultiSelectDropdown
                options={productOptions}
                value={selectedProducts}
                onChange={handleProductsChange}
                placeholder="Select products"
              />
            </div>
          )}
        </div>
        
        {/* expiration days => hours => minutes */}
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex flex-col gap-0.5 w-full">
            <Label className="text-sm font-medium"> Expiration Days </Label>
            <Input type="number" placeholder="Days" defaultValue={0} {...register("expirationDays", { required: false })} />
          </div>

          <div className="flex flex-col gap-0.5 w-full">
            <Label className="text-sm font-medium">
              Expiration Hours<span className="text-myRed">*</span>
            </Label>
            <Input type="number" placeholder="Hours" {...register("expirationHours", { required: true })} />
          </div>

          <div className="flex flex-col gap-0.5 w-full">
            <Label className="text-sm font-medium">Expiration Minutes </Label>
            <Input type="number" placeholder="Minutes" defaultValue={0} {...register("expirationMinutes", { required: false })} />
          </div>
        </div>

        {/* usage Limit => usageCount => status */}
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex flex-col gap-0.5 w-full">
            <Label className="text-sm font-medium"> Usage Limit</Label>
            <Input type="number" placeholder="Limit" defaultValue={50} {...register("usageLimit", { required: false })} />
          </div>

          <div className="flex flex-col gap-0.5 w-full">
            <Label className="text-sm font-medium">Usage Count </Label>
            <Input type="number" placeholder="Count" defaultValue={0} {...register("usageCount", { required: false })} />
          </div>

          <div className="flex flex-col gap-0.5 w-full">
            <Label className="text-sm font-medium">Status</Label>
            <select
              defaultValue={"expired"}
              className="border py-1.5 px-4 outline-none rounded-md dark:bg-gray-950 "
              {...register("status", { required: false })}
            >
              <option value="">Select status</option>
              {/* <option value="active">active</option> */}
              <option value="expired">expired</option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isCreating}
          className="w-full">
          {isCreating ? "Creating..." : "Create Coupon"}
        </Button>
      </form>
    </Card>
  )
}
export default CouponCreatePage