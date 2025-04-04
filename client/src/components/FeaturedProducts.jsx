import { useAllProductsQuery } from "@/redux/apis/productApi";
import ProductCard from "./ProductCard";

const FeaturedProducts = () => {
  const { data, isLoading } = useAllProductsQuery("");

  const featuredProducts = data?.products?.filter(product => product?.isFeatured === true)

  // Placeholder array for skeletons when loading
  const skeletonArray = Array.from({ length: data?.products?.length || 3 });

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {isLoading
        ? // Show skeleton cards while loading
          skeletonArray.map((_, index) => (
            <ProductCard key={index} isLoading={true} product={null} />
          ))
        : // Show actual product cards when data is available
        featuredProducts?.map((product) => (
            <ProductCard key={product._id} isLoading={false} product={product} />
          ))}
    </div>
  );
};

export default FeaturedProducts;