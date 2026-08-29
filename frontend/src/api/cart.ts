import { apiClient } from "./client";

export interface CartProduct {
  id: string;
  title: string;
  image: string | null;
}

export interface CartItem {
  cartItemId: string;
  variantId: string;
  quantity: number;
  size: string;
  color: string;
  sku: string;
  price: number;
  stock: number;
  product: CartProduct;
  lineTotal: number;
}

export interface CartData {
  cartId?: string;
  items: CartItem[];
  subtotal: number;
}

export async function fetchCart(): Promise<CartData> {
  const { data } = await apiClient.get<{ success: boolean; data: CartData }>("/public/cart");
  return data.data;
}

export async function addToCartApi(variantId: string, quantity: number = 1): Promise<CartData> {
  const { data } = await apiClient.post<{ success: boolean; data: CartData }>("/public/cart/items", {
    variantId,
    quantity,
  });
  return data.data;
}

export async function updateCartItemApi(variantId: string, quantity: number): Promise<CartData> {
  const { data } = await apiClient.put<{ success: boolean; data: CartData }>(
    `/public/cart/items/${variantId}`,
    { quantity }
  );
  return data.data;
}

export async function removeCartItemApi(variantId: string): Promise<CartData> {
  const { data } = await apiClient.delete<{ success: boolean; data: CartData }>(
    `/public/cart/items/${variantId}`
  );
  return data.data;
}

export async function clearCartApi(): Promise<CartData> {
  const { data } = await apiClient.delete<{ success: boolean; data: CartData }>("/public/cart");
  return data.data;
}
