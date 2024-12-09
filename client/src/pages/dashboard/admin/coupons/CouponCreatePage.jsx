import { Card, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "react-hook-form"

const CouponCreatePage = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm()

  return (
    <Card className="w-[98%] mx-auto my-2 md:w-full md:m-4 p-4">
      <CardTitle className="mb-4 underline">Create New Coupon </CardTitle>
      <form
        // onSubmit={handleSubmit(onSubmit)}
        className="space-y-4">

        {/* code => type */}
        <div  className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex flex-col gap-1 w-full">
            <Label className="text-sm font-medium">
              Code<span className="text-myRed text-lg">*</span>
            </Label>
            <Input type="text" placeholder="Coupon code" {...register("code", { required: true })} />
          </div>

          <div className="flex flex-col gap-1 w-full">
            <Label className="text-sm font-medium">
              Discount type<span className="text-myRed text-lg">*</span>
            </Label>
            <select
              className="border py-1.5 px-4 outline-none rounded-md"
              {...register("discountType", { required: true })}
            >
              <option value="">Select Discount type</option>
              <option value="flat">flat</option>
              <option value="percentage">Percentage</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-1 w-full">
          <Label className="text-sm font-medium">
            Discount Value<span className="text-myRed text-lg">*</span>
          </Label>
          <Input type="number" placeholder="Coupon discount value" {...register("discountValue", { required: true })} />
        </div>

        {/* Category => Subcategory => */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-col gap-1 w-full">
            <Label className="text-sm font-medium">
              Category<span className="text-myRed text-lg">*</span>
            </Label>
            <select
              className="border py-1.5 px-4 outline-none rounded-md"
              {...register("category", { required: true })}
            >
              <option value="">Select Category</option>
              <option value="Home Furniture">Home Furniture</option>
              <option value="Office Furniture">Office Furniture</option>
            </select>
          </div>

          <div className="flex flex-col gap-1 w-full">
            <Label className="text-sm font-medium">
              Sub Category<span className="text-myRed text-lg">*</span>
            </Label>
            <select
              className="border py-1.5 px-4 outline-none rounded-md"
              {...register("subCategory", { required: true })}
            >
              <option value="">Select Sub Category</option>
              <option value="Almirah">Almirah</option>
            </select>
          </div>
        </div>

        {/* Brand => Color => Images => */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-col gap-1 w-full">
            <Label className="text-sm font-medium">
              Brand<span className="text-myRed text-lg">*</span>
            </Label>
            <Input type="text"
              placeholder="Brand"
              {...register("brand", { required: true })} />
          </div>

          <div className="flex flex-col gap-1 w-full">
            <Label className="text-sm font-medium">
              Colors<span className="text-myRed text-lg">*</span>
            </Label>
            <Input
              type="text"
              placeholder="Colors"
              {...register("color", { required: true })} />
          </div>

          <div className="flex flex-col gap-1 w-full">
            <Label className="text-sm font-medium">
              Images<span className="text-myRed text-lg">*</span>
            </Label>
            <Input multiple type="file" accept="image/*" {...register("images")} />
          </div>
        </div>


        {/* Description */}
        <div className="flex flex-col gap-1">
          <Label className="text-sm font-medium">Description
            <span className="text-myRed text-lg ">*</span>
          </Label>
          <Textarea placeholder="Description" {...register("description", { required: true })} />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          // disabled={isCreating}
          className="w-full">
          {/* {isCreating ? "Creating..." : "Create Product"} */}
          Create
        </Button>
      </form>
    </Card>
  )
}
export default CouponCreatePage