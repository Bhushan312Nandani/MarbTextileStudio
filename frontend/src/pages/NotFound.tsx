import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div
      style={{
        backgroundColor: "#0B0F19",
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 24px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Glow */}
      <div
        style={{
          position: "absolute",
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }}
      />

      {/* 404 */}
      <p
        style={{
          fontSize: "clamp(80px, 18vw, 160px)",
          fontWeight: 900,
          lineHeight: 1,
          letterSpacing: "-0.04em",
          background: "linear-gradient(135deg, rgba(99,102,241,0.4) 0%, rgba(99,102,241,0.08) 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          marginBottom: "24px",
          userSelect: "none",
        }}
      >
        404
      </p>

      <Link to="/" style={{ textDecoration: "none", marginBottom: "20px" }}>
        <span style={{ fontWeight: 800, fontSize: "22px", letterSpacing: "-0.03em", color: "#F8FAFC" }}>marb</span>
        <span style={{ color: "#6366F1", fontSize: "22px", fontWeight: 800 }}>·</span>
      </Link>

      <h1
        style={{
          fontSize: "clamp(1.4rem, 3vw, 2rem)",
          fontWeight: 700,
          color: "#F8FAFC",
          marginBottom: "12px",
          letterSpacing: "-0.02em",
        }}
      >
        Page Not Found
      </h1>
      <p style={{ fontSize: "15px", color: "#64748B", maxWidth: "360px", lineHeight: 1.7, marginBottom: "36px" }}>
        The page you're looking for doesn't exist or has been moved. Let's get you back on track.
      </p>

      <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", justifyContent: "center" }}>
        <Link to="/" id="not-found-home" className="btn-accent" style={{ padding: "13px 28px" }}>
          Back to Home
        </Link>
        <Link to="/products" id="not-found-shop" className="btn-outline" style={{ padding: "13px 28px" }}>
          Browse Shop
        </Link>
      </div>
    </div>
  );
}
