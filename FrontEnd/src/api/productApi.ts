export interface AllProducts {
  product_id: string;
  product_name: string;
  product_price: number;
  product_imageUrl: string;
  product_category_id: string;
}
export interface AllCategories {
  id: string;
  name: string;
  description: string;
}
export interface ProductDTO {
  id: string;
  name: string;
  price: number;
  quantity: number;
  description: string;
  category: AllCategories;
  image: string;
}
export interface OtherProductDto {
  id: string;
  name: string;
  price: number;
  quantity: number;
  description: string;
  categoryId: string;
  imageUrl: string;
}
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

export const getProductByCategory = async (categoryId: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/product/category?category=${categoryId}`
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
