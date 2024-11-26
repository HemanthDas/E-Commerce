import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";

import {
  getProductById,
  ProductDTO,
  getProductByCategory,
  OtherProductDto,
} from "../../api/productApi";
import ProductBox from "../../Components/ProductBox";
import { decodeId } from "../../utils/Encoder";

export const Route = createFileRoute("/product/$productId")({
  component: ProductPage,
  loader: async ({ params }) => {
    const productId = decodeId(params.productId);
    if (!productId) {
      throw new Error("Product ID is required");
    }
    console.log(productId);
    return await getProductById(productId);
  },
});

function ProductPage() {
  const product = Route.useLoaderData<ProductDTO>();
  const {
    data: otherProducts,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["productsByCategory", product.category.id],
    queryFn: () => getProductByCategory(product.category.id),
  });
  const filteredProducts = otherProducts?.filter(
    (p: OtherProductDto) => p.id !== product.id
  );
  console.log(otherProducts);
  return (
    <div className="w-full h-full">
      <div className="container mx-auto p-4 sm:p-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="sm:col-span-1 flex justify-center items-center">
          <div
            className="w-full h-96 bg-center bg-contain bg-no-repeat"
            style={{
              backgroundImage: `url(${product.image})`,
            }}
            role="img"
            aria-label={product.name}
          ></div>
        </div>

        <div className="sm:col-span-2 flex flex-col">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-xl text-green-700 font-semibold mb-2">
            ₹{product.price.toLocaleString()}
          </p>
          <p className="text-gray-700 text-sm leading-6 mb-4">
            {product.description}
          </p>
          <div className="flex space-x-4 mt-4">
            <button className="px-6 py-2 bg-yellow-500 text-white font-medium rounded-lg hover:bg-yellow-600 focus:ring focus:ring-yellow-300">
              Add to Cart
            </button>
            <button className="px-6 py-2 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 focus:ring focus:ring-orange-300">
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-4 sm:p-8">
        <h2 className="text-2xl font-bold mb-4">Other Products</h2>

        {isLoading ? (
          <p>Loading other products...</p>
        ) : isError ? (
          <p className="text-red-500">Error: {error.message}</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {filteredProducts?.map((otherProduct: OtherProductDto) => (
              <ProductBox
                key={otherProduct.id}
                product_category_id={otherProduct.id}
                product_imageUrl={otherProduct.imageUrl}
                product_id={otherProduct.id}
                product_name={otherProduct.name}
                product_price={otherProduct.price}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductPage;
