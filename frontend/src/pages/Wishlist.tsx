import { Link } from "react-router-dom";
import { useWishlistStore } from "../store/useWishlistStore";
import { useCartStore } from "../store/useCartStore";
import { useToastStore } from "../store/useToastStore";

export default function Wishlist() {
  const { items, removeItem, clearWishlist } = useWishlistStore();
  const addLine = useCartStore((s) => s.addLine);
  const showToast = useToastStore((s) => s.showToast);

  function handleMoveToBag(item: any) {
    addLine({
      variantId: `${item.id}-default`,
      productTitle: item.title,
      size: "M",
      color: "Midnight Black",
      unitPrice: item.price,
      quantity: 1,
    });
    removeItem(item.id);
    showToast("Moved to Bag", `${item.title} has been moved to your bag.`, "success");
  }

  return (
    <div style={{ backgroundColor: "#0B0F19", minHeight: "100vh", padding: "40px 24px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "36px", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <p className="section-label" style={{ marginBottom: "8px" }}>SAVED PIECES</p>
            <h1 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, color: "#F8FAFC", letterSpacing: "-0.02em" }}>
              My Wishlist ({items.length})
            </h1>
          </div>

          {items.length > 0 && (
            <button
              onClick={clearWishlist}
              className="btn-ghost"
              style={{ fontSize: "13px", color: "#EF4444" }}
            >
              Clear Wishlist
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="glass-card" style={{ padding: "60px 24px", textAlign: "center" }}>
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "50%",
                background: "rgba(99, 102, 241, 0.1)",
                color: "#6366F1",
                fontSize: "24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
              }}
            >
              ♡
            </div>
            <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#F8FAFC", marginBottom: "8px" }}>
              Your wishlist is empty
            </h2>
            <p style={{ fontSize: "14px", color: "#64748B", marginBottom: "24px" }}>
              Save your favorite items by tapping the heart icon on any piece.
            </p>
            <Link to="/products" className="btn-accent" style={{ padding: "12px 28px" }}>
              Explore Collection →
            </Link>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: "24px",
            }}
          >
            {items.map((item) => (
              <div key={item.id} className="product-card">
                <div style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden", background: "#0f1826" }}>
                  <img
                    src={item.image || "/images/product-hoodie.jpg"}
                    alt={item.title}
                    className="product-card-img"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  <button
                    onClick={() => removeItem(item.id)}
                    style={{
                      position: "absolute",
                      top: "12px",
                      right: "12px",
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      background: "rgba(0,0,0,0.7)",
                      color: "#fff",
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    title="Remove from wishlist"
                  >
                    ✕
                  </button>
                </div>

                <div style={{ padding: "16px" }}>
                  <p style={{ fontSize: "11px", color: "#6366F1", fontWeight: 700, textTransform: "uppercase", marginBottom: "4px" }}>
                    {item.category || "Studio"}
                  </p>
                  <p style={{ fontSize: "15px", fontWeight: 600, color: "#F8FAFC", marginBottom: "6px" }}>
                    {item.title}
                  </p>
                  <p style={{ fontSize: "16px", fontWeight: 700, color: "#F8FAFC", marginBottom: "16px" }}>
                    Rs {item.price.toLocaleString()}
                  </p>

                  <button
                    onClick={() => handleMoveToBag(item)}
                    className="btn-accent"
                    style={{ width: "100%", justifyContent: "center", padding: "10px", fontSize: "13px" }}
                  >
                    Move to Bag →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
