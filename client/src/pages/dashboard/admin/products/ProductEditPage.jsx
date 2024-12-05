import { Card, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSingleProductQuery } from "@/redux/apis/productApi";
import IsLoadingLoaderRTK from "@/components/dashboard/IsLoadingLoaderRTK";
import { Trash } from "lucide-react";


const ProductEditPage = () => {
    const { id } = useParams()
    const { data: existingData, isLoading } = useSingleProductQuery(id)
    const { name, brand, category, subCategory, color, variants, description } = existingData?.product || {}

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        reset,
    } = useForm();
    const navigate = useNavigate();


    if (isLoading) {
        return <IsLoadingLoaderRTK h={"90vh"} />
    }

    return (
        <Card className="w-full p-4 m-4">
            <CardTitle className="mb-4 underline">Product Edit</CardTitle>
            <form
                //   onSubmit={handleSubmit(productCreateHandler)}
                className="space-y-4">
                {/* name => */}
                <div className="flex flex-col gap-1 w-full">
                    <Label className="text-sm font-medium">
                        Name<span className="text-myRed text-lg ">*</span>
                    </Label>
                    <Input defaultValue={name} type="text" placeholder="Name" {...register("name", { required: true })} />
                </div>

                {/* category => sub category */}
                <div className="flex flex-col md:flex-row gap-4" >
                    <div className="flex flex-col gap-1 w-full">
                        <Label className="text-sm font-medium">
                            Category<span className="text-myRed text-lg ">*</span>
                        </Label>
                        <select
                            // value={sort}
                            defaultValue={category}
                            // onChange={(e) => setSort(e.target.value)}
                            className="border py-1.5 px-4 outline-none rounded-md dark:bg-gray-900 hover:bg-gray-200"
                            {...register("category", { required: true })}
                        >
                            <option value="">Select Category</option>
                            <option value="Home Furniture">Home Furniture</option>
                            <option value="Office Furniture">Office Furniture</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                        <Label className="text-sm font-medium">Sub Category
                            <span className="text-myRed text-lg ">*</span>
                        </Label>
                        <select
                            // value={sort}
                            defaultValue={subCategory}
                            // onChange={(e) => setSort(e.target.value)}
                            className="border py-1.5 px-4 outline-none rounded-md dark:bg-gray-900 hover:bg-gray-200"
                            {...register("subCategory", { required: true })}
                        >
                            <option value="">Select Sub Category</option>
                            <option value="Almirah">Almirah</option>
                            <option value="Auditorium Chair">Auditorium Chair</option>
                            <option value="Bed">Bed</option>
                            <option value="Bed Room Chair">Bed Room Chair</option>
                            <option value="Bed Side Table">Bed Side Table</option>
                            <option value="Center Table">Center Table</option>
                            <option value="Chair Seater">Chair Seater</option>
                            <option value="Chest Of Drawer">Chest Of Drawer</option>
                            <option value="Classroom Chair">Classroom Chair</option>
                            <option value="Coat Stand">Coat Stand</option>
                            <option value="Computer Table">Computer Table</option>
                            <option value="Conference Table">Conference Table</option>
                            <option value="Director Table">Director Table</option>
                            <option value="Dining Chair">Dining Chair</option>
                            <option value="Dining Table">Dining Table</option>
                            <option value="Divan">Divan</option>
                            <option value="Drawer Unit">Drawer Unit</option>
                            <option value="Dressing Table">Dressing Table</option>
                            <option value="File Cabinet">File Cabinet</option>
                            <option value="Iron Stand">Iron Stand</option>
                            <option value="Magazine Shelf & Trolly">Magazine Shelf & Trolly</option>
                            <option value="Office Sofa">Office Sofa</option>
                            <option value="Office Table">Office Table</option>
                            <option value="Oven Stand">Oven Stand</option>
                            <option value="Reading Table">Reading Table</option>
                            <option value="Rocking Chair">Rocking Chair</option>
                            <option value="Showcase">Showcase</option>
                            <option value="Showpiece Stand">Showpiece Stand</option>
                            <option value="Side Board">Side Board</option>
                            <option value="Side Rack">Side Rack</option>
                            <option value="Shoe Shelf">Shoe Shelf</option>
                            <option value="Sofa">Sofa</option>
                            <option value="Swivel Chair">Swivel Chair</option>
                            <option value="Tea Trolly">Tea Trolly</option>
                            <option value="Telephone Table">Telephone Table</option>
                            <option value="TV Trolly">TV Trolly</option>
                            <option value="Visitor Chair">Visitor Chair</option>
                            <option value="Waiting Chair">Waiting Chair</option>
                            <option value="Work Station">Work Station</option>
                        </select>
                    </div>
                </div>

                {/* brand => colors => image */}
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex flex-col gap-1 w-full">
                        <Label className="text-sm font-medium">Brand
                            <span className="text-myRed text-lg ">*</span>
                        </Label>
                        <Input
                            type="text"
                            defaultValue={brand}
                            placeholder="Brand"
                            {...register("brand", { required: true })}
                        />
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                        <Label className="text-sm font-medium">Colors  (Separate by comma)
                            <span className="text-myRed text-lg ">*</span>
                        </Label>
                        <Input
                            type="text"
                            defaultValue={color}
                            placeholder="Colors"
                            {...register("colors", { required: true })}
                        />
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                        <Label htmlFor="image" className="text-sm font-medium">Image (Min: 1 - Max: 10)
                            <span className="text-myRed text-lg ">*</span>
                        </Label>
                        <Input
                            multiple
                            type="file"
                            accept="image/*"
                            //   onChange={photoHandler}
                            {...register("images", { required: true })}
                        />
                    </div>
                </div>

                {/* variant => */}
                <div className="flex flex-col md:flex-row gap-4 ">
                    {variants?.map(({ _id, dimensions, materials, size, weight, stock, price }, index) => (
                        <div key={_id} className="flex flex-col gap-1.5 w-full">
                            <Label className="text-sm font-medium">Variant-{index + 1}</Label>
                            <Card className="p-4 space-y-4 relative ">
                                <Trash size={17} className="absolute top-2 right-2 " />
                                {/* Materials */}
                                <div className="flex flex-col gap-1 w-full">
                                    <Label className="text-sm font-medium">Materials</Label>
                                    <Card className="flex items-center flex-col md:flex-row gap-4 p-4 ">
                                        <div className="flex flex-col gap-1 w-full">
                                            <Label className="text-sm font-medium">Primary
                                                <span className="text-myRed text-lg ">*</span>
                                            </Label>
                                            <Input
                                                type="text"
                                                placeholder="Primary materials"
                                                defaultValue={materials.primary}
                                                {...register(`variants[${index}].materials.primary`, { required: true })}
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1 w-full">
                                            <Label className="text-sm font-medium">Secondary</Label>
                                            <Input
                                                type="text"
                                                placeholder="Secondary materials"
                                                defaultValue={materials.secondary}
                                                {...register(`variants[${index}].materials.secondary`, { required: false })}
                                            />
                                        </div>
                                    </Card>
                                </div>

                                {/* Dimensions */}
                                <div className="flex flex-col gap-1 w-full">
                                    <Label className="text-sm font-medium">Dimensions (in inches)</Label>
                                    <Card className="flex flex-col md:flex-row items-center gap-4 p-4">
                                        <div className="flex flex-col gap-1 w-full">
                                            <Label className="text-sm font-medium">Length<span className="text-myRed text-lg ">*</span></Label>
                                            <Input
                                                type="number"
                                                placeholder="Length"
                                                defaultValue={dimensions.length}
                                                {...register(`variants[${index}].dimensions.length`, { required: true })}
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1 w-full">
                                            <Label className="text-sm font-medium">Width<span className="text-myRed text-lg ">*</span></Label>
                                            <Input
                                                type="number"
                                                placeholder="Width"
                                                defaultValue={dimensions.width}
                                                {...register(`variants[${index}].dimensions.width`, { required: true })}
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1 w-full">
                                            <Label className="text-sm font-medium">Height<span className="text-myRed text-lg ">*</span></Label>
                                            <Input
                                                type="number"
                                                placeholder="Height"
                                                defaultValue={dimensions.height}
                                                {...register(`variants[${index}].dimensions.height`, { required: true })}
                                            />
                                        </div>
                                    </Card>
                                </div>

                                {/* Size, Stock, Weight, Price */}
                                <div className={`${variants.length > 1 ? "grid grid-cols-2" : "grid grid-cols-4"} place-items-center gap-y-1.5 gap-x-4`}>
                                    <div className="flex flex-col gap-1 w-full">
                                        <Label className="text-sm font-medium">Size
                                            <span className="text-myRed text-lg "></span>
                                        </Label>
                                        <select
                                            defaultValue={size}
                                            className="border py-1.5 px-4 outline-none rounded-md dark:bg-gray-900 hover:bg-gray-200"
                                            {...register(`variants[${index}].size`, { required: false })}
                                        >
                                            <option value="">Select Size</option>
                                            <option value="Small">Small</option>
                                            <option value="Medium">Medium</option>
                                            <option value="Large">Large</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col gap-1 w-full">
                                        <Label className="text-sm font-medium">Stock<span className="text-myRed text-lg ">*</span></Label>
                                        <Input
                                            type="number"
                                            placeholder="Stock"
                                            defaultValue={stock}
                                            {...register(`variants[${index}].stock`, { required: true })}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1 w-full">
                                        <Label className="text-sm font-medium">Weight<span className="text-myRed text-lg ">*</span></Label>
                                        <Input
                                            type="number"
                                            placeholder="Weight"
                                            defaultValue={weight}
                                            {...register(`variants[${index}].weight`, { required: true })}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1 w-full">
                                        <Label className="text-sm font-medium">Price<span className="text-myRed text-lg ">*</span></Label>
                                        <Input
                                            type="number"
                                            placeholder="Price"
                                            defaultValue={price}
                                            {...register(`variants[${index}].price`, { required: true })}
                                        />
                                    </div>
                                </div>
                            </Card>
                        </div>
                    ))}
                </div>


                {/* description => */}
                <div className="flex flex-col gap-2 w-full">
                    <Label className="text-sm font-medium">Description
                        <span className="text-myRed text-lg ">*</span>
                    </Label>
                    <Textarea
                        placeholder="Type your message here."
                        defaultValue={description}
                        {...register("description", { required: true })} />
                </div>

                <Button
                    type="submit"
                    //   disabled={isLoading}
                    className="w-full">
                    {/* {isLoading ? (
                      <div className="flex items-center justify-center">
                          <div className="spinner"></div>
                          <span>Product Creating</span>
                      </div>
                  ) : (
                      "Create Product"
                  )} */}
                    Update Product
                </Button>
            </form>
        </Card>
    )
}

export default ProductEditPage