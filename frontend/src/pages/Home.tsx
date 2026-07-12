import { Link } from "react-router-dom";

// Owner: Member 5 (Home Page UI, Day 3 of the sprint plan).
// This is a placeholder — replace with dynamic product fetching + real design.
export default function Home() {
  return (
    <section className="text-center py-20">
      <h1 className="text-3xl font-semibold tracking-tight mb-3">
        Marb Textile Studio
      </h1>
      <p className="text-gray-600 mb-6">
        Home page placeholder — build the real hero + featured products here.
      </p>
      <Link
        to="/products"
        className="inline-block px-5 py-2 border border-black text-sm rounded hover:bg-black hover:text-white transition-colors"
      >
        Browse Products
      </Link>
    </section>
  );
}
