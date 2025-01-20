import { useSubCategoriesQuery, useGetProductsBySubCategoryQuery } from "@/redux/apis/productApi"
import ProductCard from "@/components/ProductCard"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import IsLoadingLoaderRTK from "@/components/dashboard/IsLoadingLoaderRTK"


const PersonalizedRecommendations = () => {

    const { data: subCategoryData } = useSubCategoriesQuery()
    const subcategories = subCategoryData?.subCategories

    const { data: bedData } = useGetProductsBySubCategoryQuery({ subCategory: subcategories?.[0] })
    const { data: almirahData } = useGetProductsBySubCategoryQuery({ subCategory: subcategories?.[1] })
    const { data: diningTableData } = useGetProductsBySubCategoryQuery({ subCategory: subcategories?.[2] })
    const { data: centerTableData, isLoading } = useGetProductsBySubCategoryQuery({
        subCategory: subcategories?.[3]})

    const recommendedProducts = [
        ...(bedData?.products || []),
        ...(almirahData?.products || []),
        ...(diningTableData?.products || []),
        ...(centerTableData?.products || [])
    ];
    if (isLoading) {
        return <IsLoadingLoaderRTK />
    }

    return (
        <div className="space-y-6">
            <div className="space-y-3">
                <h1 className="heading">Personalized Recommendations</h1>
                <p className="subheading">Handpicked just for you – Explore furniture that complements your style, space, and comfort!</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {
                    recommendedProducts?.map(product => <ProductCard key={product._id} product={product} />).slice(0, 6)
                }
            </div>
            <div className="flex items-center justify-center ">
                <Link to={"/products"}>
                    <Button>Explore all</Button>
                </Link>
            </div>
        </div>
    )
}
export default PersonalizedRecommendations