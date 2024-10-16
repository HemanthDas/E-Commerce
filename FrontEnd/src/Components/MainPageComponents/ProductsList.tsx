import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import {
  AllProducts,
  AllCategories,
  getAllCategories,
  getAllProducts,
} from "../../api/productApi";
import ProductBox from "../productBox";

const ProductsList = () => {
  const { data, isLoading } = useQuery<AllProducts[]>({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  const { data: categoryList, isLoading: isCategoryLoading } = useQuery<
    AllCategories[]
  >({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });

  const groupedProducts = useMemo(() => {
    if (!data) return {};
    return data.reduce((acc: Record<string, AllProducts[]>, product) => {
      const { product_category_id } = product;
      if (!acc[product_category_id]) acc[product_category_id] = [];
      acc[product_category_id].push(product);
      return acc;
    }, {});
  }, [data]);

  const categoryNameMap = useMemo(() => {
    if (!categoryList) return {};
    return categoryList.reduce((acc: Record<string, string>, category) => {
      acc[category.id] = category.name;
      return acc;
    }, {});
  }, [categoryList]);

  if (isLoading || isCategoryLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-50 p-6 rounded-lg shadow-md">
      {Object.entries(groupedProducts).map(
        ([categoryId, products]: [string, AllProducts[]]) => (
          <div key={categoryId} className="mb-12">
            <h2 className="font-bold mb-4 text-center text-2xl underline-offset-1">
              {categoryNameMap[categoryId]?.toUpperCase() ||
                `Category ID: ${categoryId}`}
            </h2>
            <div className="flex flex-row space-x-3 overflow-auto">
              {products.map((product) => (
                <ProductBox key={product.product_id} {...product} />
              ))}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default ProductsList;
