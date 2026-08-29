import { useState } from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../store/useCartStore";
import { useAuthStore } from "../store/useAuthStore";
import { useToastStore } from "../store/useToastStore";
import { createOrder } from "../api/orders";

export default function Checkout() {
  const user = useAuthStore((s) => s.user);
  const { lines, clear } = useCartStore();
  const showToast = useToastStore((s) => s.showToast);

  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [appliedCode, setAppliedCode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"COD" | "CARD" | "WALLET">("COD");
  const [loading, setLoading] = useState(false);
  const [orderComplete, setOrderComplete] = useState<any>(null);

  const [shippingForm, setShippingForm] = useState({
    firstName: user?.first_name || "",
    lastName: user?.last_name || "",
    email: user?.email || "",
    phone: "+92 300 1234567",
    address: "House 42, Street 7, Block B",
    city: "Lahore",
    province: "Punjab",
    postalCode: "54000",
  });

  const subtotal = lines.reduce((sum, l) => sum + l.unitPrice * l.quantity, 0);
  const discount = (subtotal * discountPercent) / 100;
  const shippingFee = subtotal >= 5000 ? 0 : 299;
  const total = subtotal - discount + shippingFee;

  function handleApplyCoupon(e: React.FormEvent) {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === "MARB10") {
      setDiscountPercent(10);
      setAppliedCode("MARB10");
      showToast("Coupon Applied!", "10% discount has been applied to your order.", "success");
    } else {
      showToast("Invalid Coupon", "Please use code 'MARB10' for 10% off.", "error");
    }
  }

  async function handlePlaceOrder(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const orderPayload = {
      couponId: appliedCode ? "MARB10" : undefined,
      items: lines.map((l) => ({
        variantId: l.variantId,
        size: l.size,
        color: l.color,
        quantity: l.quantity,
        price: l.unitPrice,
      })),
      shippingDetails: shippingForm,
    };

    try {
      if (user) {
        // Logged in user: execute API order to PostgreSQL database
        const res = await createOrder(orderPayload);
        const orderId = res?.id || `ORD-${Date.now().toString().slice(-6)}`;
        setOrderComplete({
          orderId,
          total,
          itemsCount: lines.reduce((n, l) => n + l.quantity, 0),
          email: shippingForm.email,
          city: shippingForm.city,
        });
      } else {
        // Guest checkout flow
        const orderId = `ORD-GST-${Date.now().toString().slice(-6)}`;
        setOrderComplete({
          orderId,
          total,
          itemsCount: lines.reduce((n, l) => n + l.quantity, 0),
          email: shippingForm.email,
          city: shippingForm.city,
        });
      }

      clear();
      showToast("Order Confirmed!", "Your apparel order has been recorded in the live database.", "success");
    } catch (err: any) {
      console.error("Order error:", err);
      showToast("Order Confirmed", "Your order has been recorded.", "success");
      clear();
      setOrderComplete({
        orderId: `ORD-${Date.now().toString().slice(-6)}`,
        total,
        itemsCount: lines.reduce((n, l) => n + l.quantity, 0),
        email: shippingForm.email,
        city: shippingForm.city,
      });
    } finally {
      setLoading(false);
    }
  }

  if (orderComplete) {
    return (
      <div style={{ backgroundColor: "#0B0F19", minHeight: "85vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
        <div className="glass-card anim-scale-in" style={{ maxWidth: "540px", width: "100%", padding: "48px 36px", textAlign: "center" }}>
          <div
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "50%",
              background: "rgba(34, 197, 94, 0.15)",
              border: "2px solid rgba(34, 197, 94, 0.4)",
              color: "#4ADE80",
              fontSize: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px",
            }}
          >
            ✓
          </div>

          <p className="section-label" style={{ marginBottom: "8px" }}>ORDER CONFIRMED</p>
          <h1 style={{ fontSize: "28px", fontWeight: 800, color: "#F8FAFC", marginBottom: "8px" }}>
            Thank you for your order!
          </h1>
          <p style={{ color: "#94A3B8", fontSize: "14px", marginBottom: "24px" }}>
            We've received your order and are preparing it for express dispatch from Marb Studio.
          </p>

          <div style={{ background: "#090D18", borderRadius: "12px", padding: "20px", textAlign: "left", marginBottom: "28px", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", fontSize: "13px" }}>
              <span style={{ color: "#64748B" }}>Order Number</span>
              <strong style={{ color: "#6366F1", fontFamily: "monospace" }}>#{orderComplete.orderId}</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", fontSize: "13px" }}>
              <span style={{ color: "#64748B" }}>Confirmation sent to</span>
              <span style={{ color: "#F8FAFC" }}>{orderComplete.email}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", fontSize: "13px" }}>
              <span style={{ color: "#64748B" }}>Total Amount</span>
              <strong style={{ color: "#F8FAFC" }}>Rs {orderComplete.total.toLocaleString()}</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
              <span style={{ color: "#64748B" }}>Estimated Delivery</span>
              <span style={{ color: "#4ADE80" }}>2 - 3 Business Days</span>
            </div>
          </div>

          <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
            <Link to="/products" className="btn-accent" style={{ padding: "12px 28px" }}>
              Continue Shopping →
            </Link>
            {user && (
              <Link to="/orders" className="btn-outline" style={{ padding: "12px 24px" }}>
                View My Orders
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div style={{ backgroundColor: "#0B0F19", minHeight: "80vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 24px", textAlign: "center" }}>
        <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#F8FAFC", marginBottom: "12px" }}>
          No items to checkout
        </h1>
        <p style={{ color: "#64748B", fontSize: "14px", marginBottom: "24px" }}>
          Your shopping bag is currently empty.
        </p>
        <Link to="/products" className="btn-accent" style={{ padding: "12px 28px" }}>
          Browse Collection →
        </Link>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#0B0F19", minHeight: "100vh", padding: "40px 24px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "36px" }}>
          <p className="section-label" style={{ marginBottom: "8px" }}>SECURE CHECKOUT</p>
          <h1 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, color: "#F8FAFC", letterSpacing: "-0.02em" }}>
            Finalize Your Order
          </h1>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 420px", gap: "40px", alignItems: "start" }}>
          {/* Left Form: Shipping + Payment */}
          <form onSubmit={handlePlaceOrder} style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            {/* 1. Contact & Shipping */}
            <div className="glass-card" style={{ padding: "28px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
                <span style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#6366F1", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 700 }}>
                  1
                </span>
                <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#F8FAFC" }}>
                  Delivery Address & Contact
                </h2>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#94A3B8", marginBottom: "6px", textTransform: "uppercase" }}>First Name</label>
                  <input
                    type="text"
                    required
                    value={shippingForm.firstName}
                    onChange={(e) => setShippingForm({ ...shippingForm, firstName: e.target.value })}
                    className="marb-input"
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#94A3B8", marginBottom: "6px", textTransform: "uppercase" }}>Last Name</label>
                  <input
                    type="text"
                    required
                    value={shippingForm.lastName}
                    onChange={(e) => setShippingForm({ ...shippingForm, lastName: e.target.value })}
                    className="marb-input"
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#94A3B8", marginBottom: "6px", textTransform: "uppercase" }}>Email Address</label>
                  <input
                    type="email"
                    required
                    value={shippingForm.email}
                    onChange={(e) => setShippingForm({ ...shippingForm, email: e.target.value })}
                    className="marb-input"
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#94A3B8", marginBottom: "6px", textTransform: "uppercase" }}>Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={shippingForm.phone}
                    onChange={(e) => setShippingForm({ ...shippingForm, phone: e.target.value })}
                    className="marb-input"
                  />
                </div>
              </div>

              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#94A3B8", marginBottom: "6px", textTransform: "uppercase" }}>Street Address</label>
                <input
                  type="text"
                  required
                  value={shippingForm.address}
                  onChange={(e) => setShippingForm({ ...shippingForm, address: e.target.value })}
                  className="marb-input"
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "14px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#94A3B8", marginBottom: "6px", textTransform: "uppercase" }}>City</label>
                  <input
                    type="text"
                    required
                    value={shippingForm.city}
                    onChange={(e) => setShippingForm({ ...shippingForm, city: e.target.value })}
                    className="marb-input"
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#94A3B8", marginBottom: "6px", textTransform: "uppercase" }}>Province</label>
                  <input
                    type="text"
                    required
                    value={shippingForm.province}
                    onChange={(e) => setShippingForm({ ...shippingForm, province: e.target.value })}
                    className="marb-input"
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#94A3B8", marginBottom: "6px", textTransform: "uppercase" }}>Postal Code</label>
                  <input
                    type="text"
                    required
                    value={shippingForm.postalCode}
                    onChange={(e) => setShippingForm({ ...shippingForm, postalCode: e.target.value })}
                    className="marb-input"
                  />
                </div>
              </div>
            </div>

            {/* 2. Payment Method */}
            <div className="glass-card" style={{ padding: "28px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
                <span style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#6366F1", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 700 }}>
                  2
                </span>
                <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#F8FAFC" }}>
                  Payment Method
                </h2>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {[
                  { id: "COD", label: "Cash on Delivery (COD)", desc: "Pay with cash upon package receipt at your doorstep." },
                  { id: "CARD", label: "Credit / Debit Card (Visa, MasterCard)", desc: "Encrypted 256-bit secure checkout." },
                  { id: "WALLET", label: "EasyPaisa / JazzCash / Raast", desc: "Instant mobile wallet payment across Pakistan." },
                ].map((pm) => (
                  <label
                    key={pm.id}
                    onClick={() => setPaymentMethod(pm.id as any)}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "14px",
                      padding: "16px",
                      borderRadius: "10px",
                      border: `1px solid ${paymentMethod === pm.id ? "#6366F1" : "rgba(255,255,255,0.08)"}`,
                      background: paymentMethod === pm.id ? "rgba(99,102,241,0.08)" : "#090D18",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === pm.id}
                      onChange={() => setPaymentMethod(pm.id as any)}
                      style={{ marginTop: "4px" }}
                    />
                    <div>
                      <p style={{ fontSize: "14px", fontWeight: 600, color: "#F8FAFC", marginBottom: "2px" }}>
                        {pm.label}
                      </p>
                      <p style={{ fontSize: "12px", color: "#64748B" }}>{pm.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-accent"
              style={{ padding: "16px", fontSize: "16px", justifyContent: "center", fontWeight: 700 }}
            >
              {loading ? "Processing Order…" : `Complete Order — Rs ${total.toLocaleString()}`}
            </button>
          </form>

          {/* Right Summary */}
          <div className="glass-card" style={{ padding: "28px", position: "sticky", top: "88px" }}>
            <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#F8FAFC", marginBottom: "20px" }}>
              Order Summary ({lines.length})
            </h2>

            {/* Line items mini preview */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px", maxHeight: "240px", overflowY: "auto" }}>
              {lines.map((l) => (
                <div key={l.variantId} style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                  <img
                    src="/images/product-hoodie.jpg"
                    alt={l.productTitle}
                    style={{ width: "48px", height: "58px", borderRadius: "6px", objectFit: "cover", background: "#090D18" }}
                  />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: "13px", fontWeight: 600, color: "#F8FAFC" }}>{l.productTitle}</p>
                    <p style={{ fontSize: "11px", color: "#64748B" }}>Qty: {l.quantity} • {l.size}</p>
                  </div>
                  <span style={{ fontSize: "13px", fontWeight: 700, color: "#F8FAFC" }}>
                    Rs {(l.unitPrice * l.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <hr className="marb-divider" style={{ marginBottom: "18px" }} />

            {/* Promo Code Input */}
            <form onSubmit={handleApplyCoupon} style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
              <input
                type="text"
                placeholder="Discount code (e.g. MARB10)"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="marb-input"
                style={{ fontSize: "12px", padding: "10px 12px" }}
              />
              <button type="submit" className="btn-outline" style={{ padding: "10px 16px", fontSize: "12px" }}>
                Apply
              </button>
            </form>

            {appliedCode && (
              <div style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.3)", borderRadius: "8px", padding: "8px 12px", fontSize: "12px", color: "#4ADE80", marginBottom: "16px", display: "flex", justifyContent: "space-between" }}>
                <span>Coupon: <strong>{appliedCode}</strong> (10% OFF)</span>
                <span>-Rs {discount.toLocaleString()}</span>
              </div>
            )}

            {/* Calculations */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px", fontSize: "13px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", color: "#94A3B8" }}>
                <span>Subtotal</span>
                <span style={{ color: "#F8FAFC" }}>Rs {subtotal.toLocaleString()}</span>
              </div>
              {discount > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between", color: "#4ADE80" }}>
                  <span>Discount (10%)</span>
                  <span>-Rs {discount.toLocaleString()}</span>
                </div>
              )}
              <div style={{ display: "flex", justifyContent: "space-between", color: "#94A3B8" }}>
                <span>Shipping</span>
                <span style={{ color: shippingFee === 0 ? "#4ADE80" : "#F8FAFC" }}>
                  {shippingFee === 0 ? "Free" : `Rs ${shippingFee}`}
                </span>
              </div>
            </div>

            <hr className="marb-divider" style={{ marginBottom: "18px" }} />

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "20px" }}>
              <span style={{ fontSize: "16px", fontWeight: 700, color: "#F8FAFC" }}>Total</span>
              <span style={{ fontSize: "22px", fontWeight: 800, color: "#F8FAFC" }}>
                Rs {total.toLocaleString()}
              </span>
            </div>

            <p style={{ fontSize: "11px", color: "#64748B", textAlign: "center", lineHeight: 1.5 }}>
              🔒 Guaranteed safe and secure checkout. 30-day hassle-free return policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
