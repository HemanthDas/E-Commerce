import { createFileRoute } from "@tanstack/react-router";
import { getProductById } from "../../api/productApi";

const ProductPage = () => {
  const product = Route.useLoaderData();
  console.log(product);
  return <div>done</div>;
};
export const Route = createFileRoute("/product/$productId")({
  component: ProductPage,
  loader: async ({ params }) => {
    const productId = window.atob(params.productId);
    return await getProductById(productId);
  },
});
