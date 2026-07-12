import { apiClient } from "./client";

/**
 * Thin wrappers around backend/src/routes/public/product.routes.js.
 * Response shapes here match what product.service.js is scaffolded to return.
 */

export interface ProductVariant {
  id: string;
  size: string;
  color: string;
  price: string;
  stock_quantity: number;
}

export interface Product {
  id: string;
  title: string;
  description: string | null;
  product_images: { id: string; image_url: string; is_primary: boolean }[];
  product_variants: ProductVariant[];
}

export async function getProducts() {
  const { data } = await apiClient.get<{ data: Product[] }>("/public/products");
  return data.data;
}

export async function getProductById(id: string) {
  const { data } = await apiClient.get<{ data: Product }>(`/public/products/${id}`);
  return data.data;
}
