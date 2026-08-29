import { apiClient } from "./client";

export interface ProductVariant {
  id: string;
  sku: string;
  size: string;
  color: string;
  price: string | number;
  stock_quantity: number;
}

export interface ProductImage {
  id: string;
  image_url: string;
  is_primary: boolean;
}

export interface ProductReview {
  id: string;
  rating: number;
  review_text: string | null;
  created_at: string;
  users: {
    first_name: string;
    last_name: string;
  };
}

export interface Product {
  id: string;
  title: string;
  description: string | null;
  material?: string | null;
  gender?: string | null;
  season?: string | null;
  categories?: { id: string; name: string };
  brands?: { id: string; name: string };
  product_images: ProductImage[];
  product_variants: ProductVariant[];
  reviews?: ProductReview[];
}

export interface ProductsResponse {
  success: boolean;
  products: Product[];
  total: number;
  page: number;
  pages: number;
}

export async function getProducts(params?: {
  category?: string;
  sort?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
}) {
  const { data } = await apiClient.get<ProductsResponse>("/public/products", {
    params,
  });
  return data.products || [];
}

export async function getProductById(id: string) {
  const { data } = await apiClient.get<{ success: boolean; data: Product }>(
    `/public/products/${id}`
  );
  return data.data;
}

export async function searchProducts(q: string) {
  const { data } = await apiClient.get<{ success: boolean; data: Product[] }>(
    "/public/products/search",
    { params: { q } }
  );
  return data.data || [];
}
