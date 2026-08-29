import { Link } from "react-router-dom";

const CAPSULES = [
  {
    title: "Season 04: The Form of Formlessness",
    season: "FALL / WINTER 2026",
    desc: "Heavyweight 450+ GSM loopback terry hoodies, oversized washed cotton tees, and structured utilitarian technical outerwear.",
    image: "/images/hero-bg.jpg",
    piecesCount: 6,
    link: "/products?category=Hoodies",
  },
  {
    title: "Signature Atelier Series",
    season: "LIMITED NUMBERED DROP",
    desc: "Individually numbered drops hand-finished by master textile artisans with subtle indigo discharge brushwork.",
    image: "/images/collection-signature.jpg",
    piecesCount: 3,
    link: "/products?category=Hoodies",
  },
  {
    title: "Raw Studio Essentials",
    season: "PERMANENT COLLECTION",
    desc: "Core daily foundation pieces. 240 GSM combed cotton tees and low-profile structured wool-cotton caps.",
    image: "/images/collection-essentials.jpg",
    piecesCount: 5,
    link: "/products?category=Tees",
  },
  {
    title: "Utilitarian Motion",
    season: "TECHNICAL APPAREL",
    desc: "Water-resistant matte nylon ripstop jackets and articulated four-way stretch pants designed for urban commuting.",
    image: "/images/product-jacket.jpg",
    piecesCount: 4,
    link: "/products?category=Jackets",
  },
];

export default function Collections() {
  return (
    <div style={{ backgroundColor: "#0B0F19", minHeight: "100vh" }}>
      {/* Header */}
      <section
        style={{
          padding: "100px 24px 60px",
          textAlign: "center",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          background: "linear-gradient(180deg, #080C16 0%, #0B0F19 100%)",
        }}
      >
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <p className="section-label" style={{ marginBottom: "12px" }}>CURATED ARCHIVE</p>
          <h1 className="hero-heading" style={{ marginBottom: "18px" }}>
            Studio Capsule Collections
          </h1>
          <p style={{ fontSize: "16px", color: "#94A3B8", lineHeight: 1.8 }}>
            Explore our themed drops, permanent studio basics, and limited numbered artisan editions.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section style={{ maxWidth: "1280px", margin: "0 auto", padding: "60px 24px 90px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
            gap: "32px",
          }}
        >
          {CAPSULES.map((cap) => (
            <div
              key={cap.title}
              className="glass-card"
              style={{
                borderRadius: "20px",
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.08)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div style={{ height: "300px", position: "relative", overflow: "hidden" }}>
                <img
                  src={cap.image}
                  alt={cap.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "16px",
                    left: "16px",
                    background: "rgba(11,15,25,0.85)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    padding: "4px 12px",
                    borderRadius: "20px",
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    color: "#C7D2FE",
                  }}
                >
                  {cap.season}
                </div>
              </div>

              <div style={{ padding: "32px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#F8FAFC", marginBottom: "10px" }}>
                    {cap.title}
                  </h2>
                  <p style={{ fontSize: "14px", color: "#94A3B8", lineHeight: 1.7, marginBottom: "24px" }}>
                    {cap.desc}
                  </p>
                </div>

                <Link
                  to={cap.link}
                  className="btn-accent"
                  style={{ justifyContent: "center", padding: "12px", fontSize: "13px", fontWeight: 700 }}
                >
                  Explore {cap.piecesCount} Pieces →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
