import { Card, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import { Trash } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";
import { useCreateProductMutation } from "@/redux/apis/productApi";

const ProductEditPage = () => {
    const navigate = useNavigate();

    const [createProduct, { isLoading: isCreating, isSuccess, error, data }] = useCreateProductMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        reset,
    } = useForm({
        defaultValues: {
            variants: [
                {
                    materials: { primary: "", secondary: "" },
                    dimensions: { length: "", width: "", height: "" },
                    size: "",
                    stock: "",
                    weight: "",
                    price: "",
                },
            ],
        },
    });

    // FieldArray for Variants
    const { fields, append, remove } = useFieldArray({
        control,
        name: "variants",
    });

    // Handle API response
    useEffect(() => {
        if (error) {
            toast.error(error?.data?.message || "An unknown error occurred.");
        }
        if (isSuccess) {
            toast.success(data?.message || "Product Created successfully!");
            navigate("/admin/products");
        }
    }, [data?.message, error, isSuccess, navigate]);

    const onSubmit = async (formData) => {
        try {
            const formDataObj = new FormData();

            // Append form data
            Object.keys(formData).forEach((key) => {
                if (key === "images") {
                    Array.from(formData.images || []).forEach((file) => formDataObj.append("images", file));
                } else if (key === "variants") {
                    formDataObj.append("variants", JSON.stringify(formData.variants));
                } else {
                    formDataObj.append(key, formData[key]);
                }
            });
            await createProduct(formDataObj).unwrap();
        } catch (err) {
            console.error("Error create product:", err);
            toast.error("An error occurred during creating product");
        }
    };

    return (
        <Card className="w-[96%] mx-auto my-2 md:w-full md:m-4 p-4">
            <CardTitle className="mb-4 underline">Product Create</CardTitle>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                {/* Name => */}
                <div className="flex flex-col gap-1 w-full">
                    <Label className="text-sm font-medium">
                        Name<span className="text-myRed text-lg">*</span>
                    </Label>
                    <Input type="text" placeholder="Name" {...register("name", { required: true })} />
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

                {/* variants => */}
                <div
                    className={`${fields.length > 1 ? "grid grid-cols-1 md:grid-cols-2" : "grid grid-cols-1"
                        } gap-4`}
                >
                    {
                        fields?.map((_, index) => (
                            <div key={index} className="flex flex-col gap-1 w-full  ">
                                <CardTitle className="text-sm font-medium">Variants-{index + 1}</CardTitle>
                                <Card className="p-4 space-y-4 relative">
                                    {fields.length > 1 && (
                                        <Trash
                                            size={17}
                                            className="absolute top-2 right-2 cursor-pointer text-red-500"
                                            onClick={() => remove(index)}
                                        />
                                    )}

                                    {/* Materials => */}
                                    <div className="flex flex-col gap-1 w-full">
                                        <Label className="text-sm font-medium">Materials</Label>
                                        <Card className="flex items-center flex-col md:flex-row gap-4 p-4 ">
                                            <div className="flex flex-col gap-1 w-full">
                                                <Label className="text-sm font-medium">Primary
                                                    <span className="text-myRed text-lg ">*</span>
                                                </Label>
                                                <Input
                                                    type="text"
                                                    placeholder="Primary materials "
                                                    {...register(`variants.${index}.materials.primary`, { required: true })}
                                                />
                                            </div>
                                            <div className="flex flex-col gap-1 w-full">
                                                <Label className="text-sm font-medium">Secondary
                                                    <span className="text-myRed text-lg "></span>
                                                </Label>
                                                <Input
                                                    type="text"
                                                    placeholder="Secondary materials"
                                                    {...register(`variants.${index}.materials.secondary`, { required: false })}
                                                />
                                            </div>
                                        </Card>
                                    </div>

                                    {/* Dimensions => */}
                                    <div className="flex flex-col gap-1 w-full">
                                        <Label className="text-sm font-medium">Dimensions (in inches) </Label>
                                        <Card className="flex flex-col md:flex-row items-center gap-4 p-4">
                                            <div className="flex flex-col gap-1 w-full">
                                                <Label className="text-sm font-medium">Length
                                                    <span className="text-myRed text-lg ">*</span>
                                                </Label>
                                                <Input
                                                    type="number"
                                                    placeholder="Length"
                                                    {...register(`variants.${index}.dimensions.length`, { required: true })}
                                                />
                                            </div>
                                            <div className="flex flex-col gap-1 w-full">
                                                <Label className="text-sm font-medium">Width
                                                    <span className="text-myRed text-lg ">*</span>
                                                </Label>
                                                <Input
                                                    type="number"
                                                    placeholder="Width"
                                                    {...register(`variants.${index}.dimensions.width`, { required: true })}
                                                />
                                            </div>
                                            <div className="flex flex-col gap-1 w-full">
                                                <Label className="text-sm font-medium">Height
                                                    <span className="text-myRed text-lg ">*</span>
                                                </Label>
                                                <Input
                                                    type="number"
                                                    placeholder="Height"
                                                    {...register(`variants.${index}.dimensions.height`, { required: true })}

                                                />
                                            </div>
                                        </Card>
                                    </div>

                                    {/* size => stock => weight => price */}
                                    <div
                                        className={`${fields.length > 1 ? "grid grid-cols-2" : "grid grid-cols-2 md:grid-cols-4"} gap-x-4 gap-y-2 `}
                                    >
                                        <div className="flex flex-col gap-1 w-full">
                                            <Label className="text-sm font-medium">Size
                                                <span className="text-myRed text-lg "></span>
                                            </Label>
                                            <select
                                                className="border py-1.5 px-4 outline-none rounded-md dark:bg-gray-900 hover:bg-gray-200"
                                                {...register(`variants.${index}.size`, { required: true })}
                                            >
                                                <option value="">Select Size</option>
                                                <option value="Small">Small</option>
                                                <option value="Medium">Medium</option>
                                                <option value="Large">Large</option>
                                            </select>
                                        </div>

                                        <div className="flex flex-col gap-1 w-full">
                                            <Label className="text-sm font-medium">Stock
                                                <span className="text-myRed text-lg ">*</span>
                                            </Label>
                                            <Input
                                                type="number"
                                                placeholder="Stock"
                                                {...register(`variants.${index}.stock`, { required: true })}
                                            />
                                        </div>

                                        <div className="flex flex-col gap-1 w-full">
                                            <Label className="text-sm font-medium">Weight
                                                <span className="text-myRed text-lg ">*</span>
                                            </Label>
                                            <Input
                                                type="number"
                                                placeholder="Weight"
                                                {...register(`variants.${index}.weight`, { required: true })}
                                            />
                                        </div>

                                        <div className="flex flex-col gap-1 w-full">
                                            <Label className="text-sm font-medium">Price
                                                <span className="text-myRed text-lg ">*</span>
                                            </Label>
                                            <Input
                                                type="number"
                                                placeholder="Price"
                                                {...register(`variants.${index}.price`, { required: true })}
                                            />
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        ))
                    }
                </div>

                <div className="text-right">
                    <Button
                        onClick={() =>
                            append({
                                materials: { primary: "", secondary: "" },
                                dimensions: { length: "", width: "", height: "" },
                                size: "",
                                stock: "",
                                weight: "",
                                price: "",
                            })
                        }
                    >
                        Add Variant
                    </Button>
                </div>

                {/* Description */}
                <div className="flex flex-col gap-1">
                    <Label className="text-sm font-medium">Description
                        <span className="text-myRed text-lg ">*</span>
                    </Label>
                    <Textarea placeholder="Description" {...register("description", { required: true })} />
                </div>

                {/* Submit Button */}
                <Button type="submit" disabled={isCreating} className="w-full">
                    {isCreating ? "Creating..." : "Create Product"}
                </Button>
            </form>
        </Card>
    );
};
export default ProductEditPage;