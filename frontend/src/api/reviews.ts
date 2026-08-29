import { apiClient } from "./client";

export interface ReviewItem {
  id: string;
  rating: number;
  review_text: string | null;
  is_verified_purchase: boolean;
  created_at: string;
  users: {
    first_name: string;
    last_name: string;
  };
}

export async function fetchProductReviews(productId: string): Promise<ReviewItem[]> {
  const { data } = await apiClient.get<{ success: boolean; data: ReviewItem[] }>(
    `/public/reviews/${productId}`
  );
  return data.data || [];
}

export async function submitProductReview(payload: {
  productId: string;
  rating: number;
  reviewText: string;
}): Promise<ReviewItem> {
  const { data } = await apiClient.post<{ success: boolean; data: ReviewItem }>(
    "/public/reviews",
    payload
  );
  return data.data;
}
