import { Link, useNavigate } from "react-router-dom";
import { useCartStore } from "../../store/useCartStore";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const FREE_SHIPPING_THRESHOLD = 5000;

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const navigate = useNavigate();
  const { lines, removeLine, updateQuantity } = useCartStore();

  const subtotal = lines.reduce((sum, l) => sum + l.unitPrice * l.quantity, 0);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  if (!isOpen) return null;

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 999 }}>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0, 0, 0, 0.75)",
          backdropFilter: "blur(6px)",
          animation: "fadeIn 0.2s ease forwards",
        }}
      />

      {/* Drawer */}
      <div
        className="anim-slide-right"
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          width: "100%",
          maxWidth: "420px",
          backgroundColor: "#0F172A",
          borderLeft: "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: "-20px 0 50px rgba(0, 0, 0, 0.8)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "20px 24px",
            borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "16px", fontWeight: 700, color: "#F8FAFC", letterSpacing: "-0.01em" }}>
              Shopping Bag
            </span>
            <span
              style={{
                fontSize: "11px",
                fontWeight: 700,
                background: "rgba(99, 102, 241, 0.2)",
                color: "#818CF8",
                padding: "2px 8px",
                borderRadius: "12px",
              }}
            >
              {lines.reduce((n, l) => n + l.quantity, 0)}
            </span>
          </div>

          <button
            onClick={onClose}
            className="btn-ghost"
            style={{ padding: "6px", borderRadius: "8px" }}
            aria-label="Close cart"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div style={{ padding: "16px 24px", background: "#090D18", borderBottom: "1px solid rgba(255, 255, 255, 0.06)" }}>
          <p style={{ fontSize: "12px", color: remaining === 0 ? "#4ADE80" : "#CBD5E1", marginBottom: "8px", fontWeight: 500 }}>
            {remaining === 0 ? (
              <span>🎉 You have qualified for <strong>Free Worldwide Shipping</strong>!</span>
            ) : (
              <span>
                Add <strong style={{ color: "#F8FAFC" }}>Rs {remaining.toLocaleString()}</strong> more for <strong>Free Shipping</strong>
              </span>
            )}
          </p>
          <div style={{ width: "100%", height: "4px", background: "rgba(255, 255, 255, 0.1)", borderRadius: "2px", overflow: "hidden" }}>
            <div
              style={{
                width: `${progress}%`,
                height: "100%",
                background: "linear-gradient(90deg, #6366F1, #818CF8)",
                transition: "width 0.4s ease",
              }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px", display: "flex", flexDirection: "column", gap: "16px" }}>
          {lines.length === 0 ? (
            <div style={{ margin: "auto 0", textAlign: "center", padding: "40px 0" }}>
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  background: "rgba(255, 255, 255, 0.04)",
                  margin: "0 auto 16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#64748B",
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                </svg>
              </div>
              <p style={{ fontSize: "16px", fontWeight: 600, color: "#F8FAFC", marginBottom: "6px" }}>
                Your bag is empty
              </p>
              <p style={{ fontSize: "13px", color: "#64748B", marginBottom: "20px" }}>
                Discover our latest studio collection.
              </p>
              <Link
                to="/products"
                onClick={onClose}
                className="btn-accent"
                style={{ padding: "10px 24px", fontSize: "13px" }}
              >
                Explore Collection →
              </Link>
            </div>
          ) : (
            lines.map((line) => (
              <div
                key={line.variantId}
                style={{
                  display: "flex",
                  gap: "14px",
                  paddingBottom: "16px",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
                }}
              >
                <div
                  style={{
                    width: "72px",
                    height: "90px",
                    borderRadius: "8px",
                    overflow: "hidden",
                    background: "#131929",
                    flexShrink: 0,
                  }}
                >
                  <img
                    src="/images/product-hoodie.jpg"
                    alt={line.productTitle}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                    <p style={{ fontSize: "14px", fontWeight: 600, color: "#F8FAFC" }}>
                      {line.productTitle}
                    </p>
                    <button
                      onClick={() => removeLine(line.variantId)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#64748B",
                        cursor: "pointer",
                        padding: 0,
                        fontSize: "12px",
                      }}
                      title="Remove"
                    >
                      ✕
                    </button>
                  </div>

                  <p style={{ fontSize: "12px", color: "#94A3B8", marginBottom: "12px" }}>
                    {line.size} • {line.color}
                  </p>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <button
                        onClick={() => updateQuantity(line.variantId, Math.max(1, line.quantity - 1))}
                        style={{
                          width: "26px",
                          height: "26px",
                          borderRadius: "6px",
                          background: "rgba(255,255,255,0.06)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          color: "#F8FAFC",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "14px",
                        }}
                      >
                        −
                      </button>
                      <span style={{ fontSize: "13px", fontWeight: 600, color: "#F8FAFC", minWidth: "16px", textAlign: "center" }}>
                        {line.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(line.variantId, line.quantity + 1)}
                        style={{
                          width: "26px",
                          height: "26px",
                          borderRadius: "6px",
                          background: "rgba(255,255,255,0.06)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          color: "#F8FAFC",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "14px",
                        }}
                      >
                        +
                      </button>
                    </div>

                    <span style={{ fontSize: "14px", fontWeight: 700, color: "#F8FAFC" }}>
                      Rs {(line.unitPrice * line.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer with Checkout CTA */}
        {lines.length > 0 && (
          <div
            style={{
              padding: "20px 24px",
              background: "#090D18",
              borderTop: "1px solid rgba(255, 255, 255, 0.06)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "14px" }}>
              <span style={{ fontSize: "14px", color: "#94A3B8" }}>Estimated Subtotal</span>
              <span style={{ fontSize: "16px", fontWeight: 700, color: "#F8FAFC" }}>
                Rs {subtotal.toLocaleString()}
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <button
                onClick={() => {
                  onClose();
                  navigate("/checkout");
                }}
                className="btn-accent"
                style={{ width: "100%", justifyContent: "center", padding: "13px", fontSize: "14px", fontWeight: 700 }}
              >
                Proceed to Checkout →
              </button>

              <button
                onClick={() => {
                  onClose();
                  navigate("/cart");
                }}
                className="btn-outline"
                style={{ width: "100%", justifyContent: "center", padding: "11px", fontSize: "13px" }}
              >
                View Full Bag
              </button>
            </div>

            <p style={{ fontSize: "11px", color: "#64748B", textAlign: "center", marginTop: "12px" }}>
              Taxes and shipping calculated at checkout.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
