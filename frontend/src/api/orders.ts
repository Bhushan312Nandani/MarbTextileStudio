import { apiClient } from "./client";

export interface OrderItem {
  id: string;
  quantity: number;
  unit_price: string | number;
  product_variants: {
    sku: string;
    size: string;
    color: string;
    products: {
      id: string;
      title: string;
      product_images?: { image_url: string }[];
    };
  };
}

export interface Order {
  id: string;
  subtotal: string | number;
  discount_amount: string | number;
  shipping_fee: string | number;
  tax_amount: string | number;
  grand_total: string | number;
  status: string;
  created_at: string;
  order_items: OrderItem[];
  payments?: { status: string; payment_method: string } | null;
  shipments?: { status: string; tracking_number?: string; courier_name?: string } | null;
}

export async function createOrder(payload: {
  shippingAddressId?: string;
  couponId?: string;
}): Promise<Order> {
  const { data } = await apiClient.post<{ success: boolean; data: Order }>(
    "/public/orders",
    payload
  );
  return data.data;
}

export async function getOrders(): Promise<Order[]> {
  const { data } = await apiClient.get<{ success: boolean; data: Order[] }>("/public/orders");
  return data.data || [];
}

export async function getOrderById(id: string): Promise<Order> {
  const { data } = await apiClient.get<{ success: boolean; data: Order }>(`/public/orders/${id}`);
  return data.data;
}
