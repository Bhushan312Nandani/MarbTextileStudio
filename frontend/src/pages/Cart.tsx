import { Link } from "react-router-dom";
import { useCartStore } from "../store/useCartStore";

// Owner: Member 5 (Cart / Checkout UI — Day 4 sprint).
export default function Cart() {
  const { lines, removeLine, updateQuantity, clear } = useCartStore();

  const subtotal  = lines.reduce((sum, l) => sum + l.unitPrice * l.quantity, 0);
  const shipping  = subtotal >= 500000 ? 0 : 29900; // free over Rs 5000 (in paisa equivalent)
  const total     = subtotal + shipping;

  if (lines.length === 0) {
    return (
      <div
        style={{
          backgroundColor: "#0B0F19",
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
          padding: "40px 24px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            background: "rgba(99,102,241,0.1)",
            border: "1px solid rgba(99,102,241,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "8px",
          }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#6366F1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
        </div>
        <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#F8FAFC" }}>Your cart is empty</h1>
        <p style={{ color: "#64748B", fontSize: "15px" }}>Looks like you haven't added anything yet.</p>
        <Link to="/products" id="cart-browse-products" className="btn-accent" style={{ padding: "13px 30px" }}>
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#0B0F19", minHeight: "100vh", padding: "40px 24px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: "36px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <p className="section-label" style={{ marginBottom: "8px" }}>MARB STUDIO</p>
            <h1 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 700, color: "#F8FAFC", letterSpacing: "-0.02em" }}>
              Your Cart ({lines.length} {lines.length === 1 ? "item" : "items"})
            </h1>
          </div>
          <button
            id="cart-clear-all"
            onClick={clear}
            className="btn-ghost"
            style={{ color: "#EF4444", fontSize: "13px" }}
          >
            Clear all
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "32px", alignItems: "start" }}>

          {/* ── Cart Lines ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {lines.map((line) => (
              <div
                key={line.variantId}
                className="glass-card"
                style={{ padding: "20px", display: "flex", gap: "16px", alignItems: "center" }}
              >
                {/* Image placeholder */}
                <div
                  style={{
                    width: "90px",
                    height: "110px",
                    borderRadius: "10px",
                    background: "#0f1826",
                    flexShrink: 0,
                    overflow: "hidden",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <img
                    src="/images/product-hoodie.jpg"
                    alt={line.productTitle}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>

                {/* Details */}
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: "15px", fontWeight: 600, color: "#F8FAFC", marginBottom: "4px" }}>
                    {line.productTitle}
                  </p>
                  <p style={{ fontSize: "12px", color: "#64748B", marginBottom: "14px" }}>
                    {line.size} / {line.color}
                  </p>

                  {/* Qty stepper */}
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <button
                      className="qty-btn"
                      id={`cart-qty-dec-${line.variantId}`}
                      onClick={() => {
                        if (line.quantity > 1) updateQuantity(line.variantId, line.quantity - 1);
                        else removeLine(line.variantId);
                      }}
                    >
                      −
                    </button>
                    <span style={{ fontSize: "14px", fontWeight: 600, color: "#F8FAFC", minWidth: "20px", textAlign: "center" }}>
                      {line.quantity}
                    </span>
                    <button
                      className="qty-btn"
                      id={`cart-qty-inc-${line.variantId}`}
                      onClick={() => updateQuantity(line.variantId, line.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Price + remove */}
                <div style={{ textAlign: "right" }}>
                  <p style={{ fontSize: "16px", fontWeight: 700, color: "#F8FAFC", marginBottom: "10px" }}>
                    Rs {(line.unitPrice * line.quantity).toLocaleString()}
                  </p>
                  <button
                    id={`cart-remove-${line.variantId}`}
                    onClick={() => removeLine(line.variantId)}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "#EF4444",
                      fontSize: "12px",
                      cursor: "pointer",
                      padding: 0,
                      fontFamily: "Inter, sans-serif",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
                    onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* ── Order Summary ── */}
          <div className="glass-card" style={{ padding: "28px", position: "sticky", top: "88px" }}>
            <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#F8FAFC", marginBottom: "20px" }}>
              Order Summary
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: "14px", color: "#94A3B8" }}>Subtotal</span>
                <span style={{ fontSize: "14px", color: "#F8FAFC", fontWeight: 600 }}>Rs {subtotal.toLocaleString()}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: "14px", color: "#94A3B8" }}>Shipping</span>
                <span style={{ fontSize: "14px", color: shipping === 0 ? "#6366F1" : "#F8FAFC", fontWeight: 600 }}>
                  {shipping === 0 ? "Free" : `Rs ${shipping.toLocaleString()}`}
                </span>
              </div>
            </div>

            <hr className="marb-divider" style={{ marginBottom: "16px" }} />

            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "24px" }}>
              <span style={{ fontSize: "16px", fontWeight: 700, color: "#F8FAFC" }}>Total</span>
              <span style={{ fontSize: "18px", fontWeight: 800, color: "#F8FAFC" }}>Rs {total.toLocaleString()}</span>
            </div>

            <button
              id="cart-checkout-btn"
              className="btn-accent"
              style={{ width: "100%", justifyContent: "center", padding: "15px", fontSize: "15px" }}
            >
              Proceed to Checkout
            </button>

            <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", justifyContent: "center" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6366F1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <span style={{ fontSize: "12px", color: "#64748B" }}>Secure checkout powered by Marb Studio</span>
              </div>
              <p style={{ fontSize: "12px", color: "#374151", textAlign: "center" }}>30-day easy returns · Free shipping on Rs 5,000+</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
