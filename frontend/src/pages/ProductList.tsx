import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts, type Product } from "../api/products";

// Owner: Member 2 (Public API) + Member 5 (UI). Wired to GET /public/products —
// will show real data as soon as product.service.js is implemented.
export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [status, setStatus] = useState<"loading" | "error" | "ready">("loading");

  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(data);
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }, []);

  if (status === "loading") return <p className="text-gray-500">Loading products…</p>;
  if (status === "error")
    return (
      <p className="text-gray-500">
        Couldn't load products yet — this is expected until GET /public/products is implemented.
      </p>
    );
  if (products.length === 0) return <p className="text-gray-500">No products yet.</p>;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <Link
          key={product.id}
          to={`/products/${product.id}`}
          className="block border border-gray-200 rounded p-3 hover:shadow-sm transition-shadow"
        >
          <div className="aspect-[3/4] bg-gray-100 rounded mb-2" />
          <p className="text-sm font-medium">{product.title}</p>
        </Link>
      ))}
    </div>
  );
}
