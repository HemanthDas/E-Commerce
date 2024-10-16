import { Link } from "@tanstack/react-router";
import { AllProducts } from "../api/productApi";

const ProductBox = (product: AllProducts) => {
  const encodeId = (id: string) => window.btoa(id);
  return (
    <Link
      to={`/product/${encodeId(product.product_id)}`}
      key={product.product_id}
      className="bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 w-full max-w-[350px] h-[350px] min-w-[300px] flex flex-col justify-between mx-auto my-2"
    >
      <div className="h-[180px] flex items-center justify-center mb-4">
        <img
          src={product.product_imageUrl}
          alt={product.product_name || "Product Image"}
          className="max-h-full max-w-full object-contain p-2 transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="text-xl font-semibold text-gray-800 mb-2 text-center px-2 flex-1">
        {product.product_name}
      </div>
      <div className="text-lg text-green-600 text-center px-2 mb-4">
        ${product.product_price}
      </div>
    </Link>
  );
};

export default ProductBox;
