import { apiClient } from "./client";

export interface Category {
  id: string;
  name: string;
  description: string | null;
}

export async function getCategories() {
  const { data } = await apiClient.get<{ data: Category[] }>("/public/categories");
  return data.data;
}
