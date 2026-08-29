import { useEffect, useState, useMemo } from "react";
import ProductCard, { type ProductCardData } from "../components/ui/ProductCard";
import { getProducts } from "../api/products";

const ALL_MOCK: ProductCardData[] = [
  { id: "1", title: "Abstract Hood", price: 12900, image: "/images/product-hoodie.jpg", badge: "New", category: "Hoodies" },
  { id: "2", title: "Form Tee", price: 7900, image: "/images/product-tee.jpg", badge: undefined, category: "Tees" },
  { id: "3", title: "Motion Jacket", price: 18900, image: "/images/product-jacket.jpg", badge: "New", category: "Jackets" },
  { id: "4", title: "Studio Cap", price: 4900, image: "/images/product-cap.jpg", badge: undefined, category: "Accessories" },
  { id: "5", title: "Motion Pant", price: 14900, image: "/images/product-pant.jpg", badge: undefined, category: "Bottoms" },
  { id: "6", title: "Signature Hood", price: 15900, image: "/images/collection-signature.jpg", badge: "Limited", category: "Hoodies" },
  { id: "7", title: "Studio Essentials Set", price: 22900, image: "/images/collection-essentials.jpg", badge: undefined, category: "Bundles" },
  { id: "8", title: "Limited Edition Tee", price: 11900, image: "/images/collection-limited.jpg", badge: "Limited", category: "Tees" },
];

const CATEGORIES = ["All", "Hoodies", "Tees", "Jackets", "Bottoms", "Accessories", "Bundles"];
const SIZES = ["All", "XS", "S", "M", "L", "XL"];

export default function ProductList() {
  const [products, setProducts] = useState<ProductCardData[]>(ALL_MOCK);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedSize, setSelectedSize] = useState("All");
  const [maxPrice, setMaxPrice] = useState(25000);
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc">("featured");
  const [searchQ, setSearchQ] = useState("");
  const [gridCols, setGridCols] = useState<3 | 4>(3);

  useEffect(() => {
    getProducts()
      .then((data) => {
        if (data && data.length > 0) {
          setProducts(
            data.map((p) => ({
              id: p.id,
              title: p.title,
              price: parseFloat(p.product_variants?.[0]?.price as any ?? "0"),
              image: p.product_images?.find((i) => i.is_primary)?.image_url ?? "/images/product-hoodie.jpg",
              category: p.categories?.name,
            }))
          );
        }
      })
      .catch(() => {});
  }, []);

  const displayed = useMemo(() => {
    let list = [...products];
    if (activeCategory !== "All") list = list.filter((p) => p.category === activeCategory);
    if (searchQ.trim()) list = list.filter((p) => p.title.toLowerCase().includes(searchQ.toLowerCase()));
    list = list.filter((p) => p.price <= maxPrice);

    if (sortBy === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") list.sort((a, b) => b.price - a.price);

    return list;
  }, [products, activeCategory, maxPrice, sortBy, searchQ]);

  function handleResetFilters() {
    setActiveCategory("All");
    setSelectedSize("All");
    setMaxPrice(25000);
    setSearchQ("");
    setSortBy("featured");
  }

  return (
    <div style={{ backgroundColor: "#0B0F19", minHeight: "100vh" }}>
      {/* Editorial Category Banner */}
      <div
        style={{
          background: "linear-gradient(180deg, #080C16 0%, #0B0F19 100%)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          padding: "48px 24px 32px",
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <p className="section-label" style={{ marginBottom: "10px" }}>MARB STUDIO PERMANENT CATALOGUE</p>
          <h1 className="section-heading" style={{ marginBottom: "8px" }}>
            The Full Collection
          </h1>
          <p style={{ color: "#94A3B8", fontSize: "14px" }}>
            Showing {displayed.length} studio pieces engineered for daily rotation.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "36px 24px" }}>
        {/* Top Control Bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
            marginBottom: "32px",
            background: "#0E1526",
            padding: "16px 20px",
            borderRadius: "14px",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {/* Search bar */}
          <div style={{ position: "relative", flex: 1, minWidth: "220px", maxWidth: "360px" }}>
            <svg
              style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
              width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              type="text"
              placeholder="Search garments, textures…"
              value={searchQ}
              onChange={(e) => setSearchQ(e.target.value)}
              className="marb-input"
              style={{ paddingLeft: "38px", fontSize: "13px", padding: "10px 12px 10px 38px" }}
            />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="marb-input"
              style={{ width: "auto", fontSize: "13px", padding: "10px 14px", cursor: "pointer" }}
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>

            {/* Grid density toggle */}
            <div style={{ display: "flex", background: "rgba(255,255,255,0.06)", borderRadius: "8px", padding: "3px" }}>
              <button
                onClick={() => setGridCols(3)}
                style={{
                  background: gridCols === 3 ? "#6366F1" : "transparent",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  padding: "6px 12px",
                  fontSize: "12px",
                  cursor: "pointer",
                }}
              >
                Editorial (3)
              </button>
              <button
                onClick={() => setGridCols(4)}
                style={{
                  background: gridCols === 4 ? "#6366F1" : "transparent",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  padding: "6px 12px",
                  fontSize: "12px",
                  cursor: "pointer",
                }}
              >
                Compact (4)
              </button>
            </div>
          </div>
        </div>

        {/* Layout: Sidebar Filter + Products Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: "36px", alignItems: "start" }}>
          {/* Left Sidebar Filter */}
          <aside className="glass-card" style={{ padding: "24px", position: "sticky", top: "88px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#F8FAFC", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                Filter Pieces
              </h3>
              <button
                onClick={handleResetFilters}
                style={{ background: "none", border: "none", color: "#818CF8", fontSize: "11px", cursor: "pointer", fontWeight: 600 }}
              >
                Reset
              </button>
            </div>

            {/* Category Filter */}
            <div style={{ marginBottom: "24px" }}>
              <p style={{ fontSize: "11px", fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "10px" }}>
                Category
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    style={{
                      textAlign: "left",
                      background: activeCategory === cat ? "rgba(99,102,241,0.15)" : "transparent",
                      color: activeCategory === cat ? "#818CF8" : "#CBD5E1",
                      border: "none",
                      padding: "8px 12px",
                      borderRadius: "6px",
                      fontSize: "13px",
                      fontWeight: activeCategory === cat ? 700 : 500,
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "space-between",
                      transition: "all 0.15s ease",
                    }}
                  >
                    <span>{cat}</span>
                    {activeCategory === cat && <span>✓</span>}
                  </button>
                ))}
              </div>
            </div>

            <hr className="marb-divider" style={{ marginBottom: "20px" }} />

            {/* Price Filter Slider */}
            <div style={{ marginBottom: "24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span style={{ fontSize: "11px", fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  Max Price
                </span>
                <span style={{ fontSize: "12px", fontWeight: 700, color: "#F8FAFC" }}>
                  Rs {maxPrice.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min={4000}
                max={25000}
                step={1000}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                style={{ width: "100%", accentColor: "#6366F1", cursor: "pointer" }}
              />
            </div>

            <hr className="marb-divider" style={{ marginBottom: "20px" }} />

            {/* Size Filter Chips */}
            <div>
              <p style={{ fontSize: "11px", fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "10px" }}>
                Size
              </p>
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                {SIZES.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    style={{
                      background: selectedSize === sz ? "#6366F1" : "rgba(255,255,255,0.06)",
                      color: selectedSize === sz ? "#fff" : "#94A3B8",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "6px",
                      padding: "4px 10px",
                      fontSize: "11px",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Right Product Grid */}
          <div>
            {displayed.length === 0 ? (
              <div className="glass-card" style={{ padding: "60px 24px", textAlign: "center" }}>
                <p style={{ fontSize: "18px", fontWeight: 700, color: "#F8FAFC", marginBottom: "8px" }}>
                  No garments match your filters
                </p>
                <p style={{ fontSize: "13px", color: "#64748B", marginBottom: "20px" }}>
                  Try relaxing your price range or selecting another category.
                </p>
                <button onClick={handleResetFilters} className="btn-accent" style={{ padding: "10px 24px", fontSize: "13px" }}>
                  Reset Filters
                </button>
              </div>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: gridCols === 3 ? "repeat(auto-fill, minmax(260px, 1fr))" : "repeat(auto-fill, minmax(210px, 1fr))",
                  gap: "24px",
                }}
              >
                {displayed.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
