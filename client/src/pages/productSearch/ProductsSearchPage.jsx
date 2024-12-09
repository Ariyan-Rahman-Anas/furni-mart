import { useState } from "react";
import ProductCard from "../../components/ProductCard";
import { Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    useCategoriesQuery,
    useSearchProductsQuery,
    useSubCategoriesQuery,
} from "@/redux/apis/productApi";
import { Label } from "@/components/ui/label";
import usePageTitle from "@/hooks/usePageTitle";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";


const ProductsSearchPage = () => {
    usePageTitle("Products Search")
    // const targetedCategory = location.state?.category

    const {
        data: categoryData,
        isLoading: categoryLoading,
        error: categoryError,
    } = useCategoriesQuery("");
    const {
        data: subCategoryData,
        isLoading: subCategoryLoading,
        error: subCategoryError,
    } = useSubCategoriesQuery("");

    const [search, setSearch] = useState("")
    const [sort, setSort] = useState("")
    const [price, setPrice] = useState(10)
    // const [category, setCategory] = useState(targetedCategory ? targetedCategory : "")
    const [category, setCategory] = useState("");
    const [subCategory, setSubCategory] = useState("");
    const [page, setPage] = useState(1)

    const {
        data: searchData,
        isLoading: searchProductsLoading,
        isSuccess: searchProductsIsSuccess,
        isError: searchProductsIsError,
        error: searchProductsError
    } = useSearchProductsQuery({
        search,
        sort,
        category,
        subCategory,
        page,
        price,
    })


    const skeletonArray = Array.from({ length: searchData?.products?.length || 4 });

    const resetFilters = () => {
        setSearch('');
        setSort('')
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-8 gap-4 px-2 mt-8 ">
            <aside className="col-span-8 md:col-span-2 p-4 space-y-5 ">
                <div className="flex flex-col gap-1">
                    <Label htmlFor="category-name" className="text-sm font-medium">
                        Category
                    </Label>
                    <select
                        id="category-name"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="py-2 px-4 outline-none rounded-md border dark:bg-gray-900 hover:bg-gray-200">
                        <option value="" className="capitalize">
                            All
                        </option>
                        {categoryLoading ? (
                            <option disabled>
                                <div className="flex justify-center items-center">
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                </div>
                            </option>
                        ) : categoryError ? (
                            <option disabled>Error loading categories</option>
                        ) : (
                            categoryData?.categories?.map((category, index) => (
                                <option key={index} value={category} className="capitalize">
                                    {category}
                                </option>
                            ))
                        )}
                    </select>
                </div>

                <div className="flex flex-col gap-1">
                    <Label htmlFor="category-name" className="text-sm font-medium">
                        Sub Category
                    </Label>
                    <select
                        id="category-name"
                        value={subCategory}
                        onChange={(e) => setSubCategory(e.target.value)}
                        className="py-2 px-4 outline-none rounded-md border dark:bg-gray-900 hover:bg-gray-200" >
                        <option value="" className="capitalize" >
                            All
                        </option>
                        {subCategoryLoading ? (
                            <option disabled>
                                <div className="flex justify-center items-center">
                                    <Loader2 className="mr-2 h-4 w-4 bg-red-500 animate-spin" />
                                </div>
                            </option>
                        ) : subCategoryError ? (
                            <option disabled>Error loading categories</option>
                        ) : (
                            subCategoryData?.subCategories?.map((category, index) => (
                                <option key={index} value={category} className="capitalize">
                                    {category}
                                </option>
                            ))
                        )}
                    </select>
                </div>

                <div>
                    <h4>Min Price: {price || ""}</h4>
                    <input
                        type="range"
                        min={10}
                        max={100000}
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        className="w-ful w-full h-2 bg-gray-300 rounded-lg appearance-black accent-black focus:outline-none"
                    />
                </div>
            </aside>

            <main className="col-span-8 md:col-span-6 p-4 ">
                <div className="flex items-center justify-between flex-col md:flex-row gap-4">
                    <div className="flex flex-col gap-1 w-full relative">
                        <Label className="text-sm font-semibold">Search</Label>
                        <Input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by product name"
                            className="border dark:bg-transparent hover:bg-gray-200 py-2 px-3 focus:outline-none rounded-md w-full"
                        />
                        {/* X Icon - Shows only when search Input has text */}
                        {search && (
                            <X
                                size={20}
                                onClick={() => setSearch('')}
                                className="absolute right-2 bottom-0.5 transform -translate-y-1/2 p-1 cursor-pointer text-white bg-black rounded-full duration-300 opacity-100"
                            />
                        )}
                    </div>

                    <div className="flex items-end w-full md:w-fit gap-4">
                        <div className="flex flex-col gap-1 w-full">
                            <Label className="text-sm font-medium">Sort</Label>
                            <select
                                value={sort}
                                onChange={(e) => setSort(e.target.value)}
                                className="border py-2 px-4 outline-none rounded-md dark:bg-gray-900 hover:bg-gray-200"
                            >
                                <option value="">Default</option>
                                <option value="asc">Price: Low to High</option>
                                <option value="dsc">Price: High to Low</option>
                            </select>
                        </div>
                        <Button
                            onClick={resetFilters}
                            className="danger-btn min-w-32"
                        >
                            Reset filters
                        </Button>
                    </div>
                </div>

                {/* display filtered and searched data */}
                <div className="my-8" >
                    {
                        searchProductsLoading
                            ? <div className="grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-4 place-items-center gap-4 ">
                                {
                                    skeletonArray.map((_, index) => (
                                        <ProductCardSkeleton key={index} />
                                    ))
                                }
                            </div> : searchProductsIsSuccess
                                ? <div
                                    className="grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-4 place-items-center gap-4" >
                                    {
                                        searchData?.products.map((product) => (
                                            <ProductCard key={product._id} isLoading={false} product={product} />
                                        ))
                                    }
                                </div>
                                : <div className="text-center">
                                    <h1 className="font-semibold text-3xl">Oops!</h1>
                                    <p>{searchProductsIsError && searchProductsError.data?.message}</p>
                                </div>
                    }
                </div>

                {/* products pagination  */}
                <div>
                    {searchData && searchData.totalPage > 1 && (
                        <article className="flex items-center justify-center gap-4">
                            <Button
                                disabled={page === 1}
                                onClick={() => setPage((prev) => prev - 1)}
                                className="primary-btn"
                            >
                                Prev
                            </Button>
                            {/* Render individual page buttons with number */}
                            {Array.from({ length: searchData.totalPage }, (_, index) => {
                                const pageNumber = index + 1;
                                return (
                                    <button
                                        key={pageNumber}
                                        onClick={() => setPage(pageNumber)}
                                        className={page === pageNumber
                                            ? "h-6 w-6 text-sm flex items-center justify-center rounded-full text-white dark:text-black bg-black dark:bg-white border border-black dark:border-white "
                                            : "h-6 w-6 text-sm flex items-center justify-center rounded-full text-black dark:text-white border-[.1rem] border-black dark:border-white "}
                                    >
                                        {pageNumber}
                                    </button>
                                );
                            })}
                            <Button
                                disabled={page === searchData.totalPage}
                                onClick={() => setPage((prev) => prev + 1)}
                                className="primary-btn"
                            >
                                Next
                            </Button>
                        </article>
                    )}
                </div>
            </main>
        </div>
    );
};
export default ProductsSearchPage;