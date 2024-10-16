export type AllProducts = {
  product_id: string;
  product_name: string;
  product_price: number;
  product_imageUrl: string;
  product_category_id: string;
};
export type AllCategories = {
  id: string;
  name: string;
  description: string;
};
export const getAllProducts = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/product/getAll`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
};
export const getAllCategories = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/category/all`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
};
export const getProductById = async (id: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/product/get/${id}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
};
