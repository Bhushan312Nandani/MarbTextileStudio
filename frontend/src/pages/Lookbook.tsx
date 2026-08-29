import { Link } from "react-router-dom";

const LOOKS = [
  {
    title: "The Monochrome Abstract",
    subtitle: "Heavyweight 450 GSM organic loopback fleece combined with tonal dimensional graphics.",
    image: "/images/hero-bg.jpg",
    featuredProducts: ["Abstract Hood", "Motion Pant"],
  },
  {
    title: "Utilitarian Motion",
    subtitle: "Water-resistant matte ripstop fabric engineered for modern urban movement.",
    image: "/images/product-jacket.jpg",
    featuredProducts: ["Motion Jacket", "Studio Cap"],
  },
  {
    title: "Signature Brushstrokes",
    subtitle: "Hand-finished abstract textiles created in our atelier in limited numbering.",
    image: "/images/collection-signature.jpg",
    featuredProducts: ["Signature Hood", "Form Tee"],
  },
];

export default function Lookbook() {
  return (
    <div style={{ backgroundColor: "#0B0F19", minHeight: "100vh" }}>
      {/* Editorial Header */}
      <section style={{ padding: "80px 24px 40px", maxWidth: "1280px", margin: "0 auto", textAlign: "center" }}>
        <p className="section-label" style={{ marginBottom: "12px" }}>EDITORIAL DROP • FALL/WINTER 2026</p>
        <h1 className="hero-heading" style={{ marginBottom: "20px" }}>
          The Form of Formlessness
        </h1>
        <p style={{ maxWidth: "580px", margin: "0 auto 32px", fontSize: "16px", color: "#94A3B8", lineHeight: 1.8 }}>
          A visual exploration of heavy organic textiles, structured minimalist draping, and abstract geometry engineered for everyday life.
        </p>
        <Link to="/products" className="btn-accent" style={{ padding: "14px 36px", fontSize: "14px", fontWeight: 700 }}>
          Shop The Lookbook Collection →
        </Link>
      </section>

      {/* Editorial Sections */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px 80px", display: "flex", flexDirection: "column", gap: "60px" }}>
        {LOOKS.map((look, idx) => (
          <div
            key={look.title}
            className="glass-card"
            style={{
              display: "grid",
              gridTemplateColumns: idx % 2 === 0 ? "1.2fr 1fr" : "1fr 1.2fr",
              overflow: "hidden",
              borderRadius: "20px",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div style={{ order: idx % 2 === 0 ? 1 : 2, minHeight: "450px", overflow: "hidden" }}>
              <img
                src={look.image}
                alt={look.title}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.6s ease" }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              />
            </div>

            <div
              style={{
                order: idx % 2 === 0 ? 2 : 1,
                padding: "56px 44px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                background: "#0E1526",
              }}
            >
              <p className="section-label" style={{ marginBottom: "12px" }}>LOOK 0{idx + 1}</p>
              <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, color: "#F8FAFC", marginBottom: "16px", letterSpacing: "-0.02em" }}>
                {look.title}
              </h2>
              <p style={{ fontSize: "15px", color: "#94A3B8", lineHeight: 1.8, marginBottom: "28px" }}>
                {look.subtitle}
              </p>

              <div style={{ marginBottom: "32px" }}>
                <p style={{ fontSize: "11px", fontWeight: 700, color: "#64748B", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "10px" }}>
                  Featured In This Look
                </p>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {look.featuredProducts.map((p) => (
                    <span
                      key={p}
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        padding: "6px 14px",
                        borderRadius: "20px",
                        fontSize: "12px",
                        color: "#CBD5E1",
                        fontWeight: 600,
                      }}
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <Link to="/products" className="btn-outline" style={{ padding: "12px 28px", fontSize: "13px" }}>
                  Shop Featured Pieces →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
