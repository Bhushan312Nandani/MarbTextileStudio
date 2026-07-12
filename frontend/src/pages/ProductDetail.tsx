import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById, type Product } from "../api/products";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [status, setStatus] = useState<"loading" | "error" | "ready">("loading");

  useEffect(() => {
    if (!id) return;
    getProductById(id)
      .then((data) => {
        setProduct(data);
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }, [id]);

  if (status === "loading") return <p className="text-gray-500">Loading…</p>;
  if (status === "error" || !product)
    return <p className="text-gray-500">Couldn't load this product yet.</p>;

  return (
    <div className="grid sm:grid-cols-2 gap-8">
      <div className="aspect-[3/4] bg-gray-100 rounded" />
      <div>
        <h1 className="text-2xl font-semibold mb-2">{product.title}</h1>
        <p className="text-gray-600 mb-6">{product.description}</p>
        <div className="space-y-2">
          {product.product_variants?.map((v) => (
            <div key={v.id} className="text-sm text-gray-700">
              {v.size} / {v.color} — Rs {v.price} ({v.stock_quantity} in stock)
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
