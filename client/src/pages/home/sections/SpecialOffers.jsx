import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useAllProductsQuery } from "@/redux/apis/productApi"
import ProductCard from "@/components/ProductCard"
import ProductCardSkeleton from "@/components/skeletons/ProductCardSkeleton"

const SpecialOffers = () => {
  const { data, isLoading } = useAllProductsQuery("");

  const newProducts = data?.products?.filter(product => product?.tag === "new")
  const dealProducts = data?.products?.filter(product => product?.tag === "deal")
  const limitedProducts = data?.products?.filter(product => product?.tag === "limited")

  // Placeholder array for skeletons when loading
  const skeletonArray = Array.from({ length: data?.products?.length || 4 });

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h1 className="heading">Don’t Miss Our Special Offers!</h1>
        <p className="subheading">Shop exclusive deals and save big on your favorite furniture pieces!</p>
      </div>

      <Tabs defaultValue="new-arrival" className="w-full text-center ">
        <TabsList className="w-full md:w-1/2 mx-auto grid grid-cols-3">
          <TabsTrigger value="new-arrival">New Arrival</TabsTrigger>
          <TabsTrigger value="best-deal">Best Deal</TabsTrigger>
          <TabsTrigger value="limited-stock">Limited Stock</TabsTrigger>
        </TabsList>

        <TabsContent value="new-arrival">
          <Card>
            <CardHeader>
              <CardTitle>Fresh Finds. Timeless Style.</CardTitle>
              <CardDescription>
                Explore our latest collection of premium furniture crafted to bring elegance and comfort into your space. Designed to impress, built to last.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {isLoading
                  ? // Show skeleton cards while loading
                  skeletonArray.map((_, index) => (
                    <ProductCardSkeleton key={index} isLoading={true} product={null} />
                  ))
                  : // Show actual product cards when data is available
                  newProducts?.slice(0,5)?.map((product) => (
                    <ProductCard key={product._id} isLoading={false} product={product} />
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="best-deal">
          <Card>
            <CardHeader>
              <CardTitle>Smart Choices. Unbeatable Prices.</CardTitle>
              <CardDescription>
                Discover hand-picked furniture sets at exclusive prices. Style meets savings—shop the best deals of the season.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {isLoading
                  ? // Show skeleton cards while loading
                  skeletonArray.map((_, index) => (
                    <ProductCardSkeleton key={index} isLoading={true} product={null} />
                  ))
                  : // Show actual product cards when data is available
                  dealProducts?.slice(0, 5)?.map((product) => (
                    <ProductCard key={product._id} isLoading={false} product={product} />
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="limited-stock">
          <Card>
            <CardHeader>
              <CardTitle>Going Fast. Don’t Miss Out.</CardTitle>
              <CardDescription>
                These customer favorites are almost gone. Secure yours before they’re out of stock.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {isLoading
                  ? // Show skeleton cards while loading
                  skeletonArray.map((_, index) => (
                    <ProductCardSkeleton key={index} isLoading={true} product={null} />
                  ))
                  : // Show actual product cards when data is available
                  limitedProducts?.slice(0, 5)?.map((product) => (
                    <ProductCard key={product._id} isLoading={false} product={product} />
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
export default SpecialOffers