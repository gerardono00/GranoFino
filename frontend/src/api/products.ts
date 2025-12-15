import api from "./api";

export interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export const getProducts = async (): Promise<Product[]> => {
  const res = await api.get<Product[]>("/products");
  return res.data;
};

export const createProduct = (product: Product) =>
  api.post("/products", product);

export const updateProduct = (id: number, product: Product) =>
  api.put(`/products/${id}`, product);

export const deleteProduct = (id: number) =>
  api.delete(`/products/${id}`);
