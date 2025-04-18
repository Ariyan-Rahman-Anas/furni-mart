import { Card, CardTitle, CardDescription } from "@/components/ui/card"
import IsLoadingLoaderRTK from "@/components/dashboard/IsLoadingLoaderRTK"
import { useCategoryCountsQuery, useSubcategoryCountsQuery } from "@/redux/apis/productApi"

const ProductInventory = () => {
    const { data: categoryCountsData } = useCategoryCountsQuery()
    const { data: subcategoryCountsData, isLoading } = useSubcategoryCountsQuery()

    if (isLoading) {
        return <IsLoadingLoaderRTK h={"90vh"} />
    }

    return (
        <Card className=" space-y-4 p-4 ">
            <CardTitle>Product Inventory</CardTitle>
            <Card className="p-4 space-y-2 ">
                <CardTitle>Category</CardTitle>
                <CardDescription className="ml-6">
                    {
                        categoryCountsData?.categoryCounts?.map(({ _id, productCount }, index) => <div key={index} className="flex items-center justify-between gap-2" >
                            <CardTitle>{_id}</CardTitle>
                            <p className="text-xl font-semibold ">{productCount} </p>
                        </div>)
                    }
                </CardDescription>
            </Card>
            <Card className="p-4 space-y-2 ">
                <CardTitle>Sub Category</CardTitle>
                <CardDescription className="ml-6">
                    {
                        subcategoryCountsData?.subCategoryCounts?.map(({ _id, productCount }, index) => <div key={index} className="flex items-center justify-between gap-2" >
                            <CardTitle>{_id}</CardTitle>
                            <p className="text-xl font-semibold ">{productCount} </p>
                        </div>)
                    }
                </CardDescription>
            </Card>
        </Card>
    )
}

export default ProductInventory