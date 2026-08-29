import { apiClient } from "./client";

export interface AdminStats {
  totalProducts: number;
  totalOrders: number;
  totalUsers: number;
  totalRevenue: number;
  recentOrders: Array<{
    id: string;
    grand_total: string | number;
    status: string;
    created_at: string;
    users: {
      first_name: string;
      last_name: string;
      email: string;
    };
  }>;
  lowStockVariants: Array<{
    id: string;
    sku: string;
    size: string;
    color: string;
    stock_quantity: number;
    products: {
      title: string;
    };
  }>;
}

export async function getAdminStats(): Promise<AdminStats> {
  const { data } = await apiClient.get<{ success: boolean; data: AdminStats }>("/admin/stats");
  return data.data;
}

export async function getAdminProducts(params?: { page?: number; limit?: number; search?: string }) {
  const { data } = await apiClient.get("/admin/products", { params });
  return data?.data ?? data;
}

export async function getAdminOrders(params?: { page?: number; limit?: number; status?: string }) {
  const { data } = await apiClient.get("/admin/orders", { params });
  return data?.data ?? data;
}

export async function updateOrderStatus(orderId: string, status: string, trackingNumber?: string) {
  const { data } = await apiClient.put(`/admin/orders/${orderId}/status`, {
    status,
    trackingNumber,
  });
  return data;
}

export async function deleteAdminProduct(productId: string) {
  const { data } = await apiClient.delete(`/admin/products/${productId}`);
  return data;
}
