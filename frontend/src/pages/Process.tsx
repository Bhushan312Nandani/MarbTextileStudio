import { Link } from "react-router-dom";

const STEPS = [
  {
    step: "01",
    title: "Raw Fiber & Sustainable Sourcing",
    desc: "We exclusively select premium extra-long staple combed organic cotton. Raw fibers are hand-graded for purity, tensile strength, and consistent strand uniformity.",
  },
  {
    step: "02",
    title: "Precision Ring Spinning",
    desc: "Our automated spinning lines twist fibers into high-count combed yarns, minimizing loose hairiness and maximizing tensile durability under everyday wear.",
  },
  {
    step: "03",
    title: "Circular High-Density Knitting",
    desc: "Using advanced German and Japanese circular knitting machinery, we construct ultra-dense 450+ GSM loopback french terry and 240 GSM single jersey with zero fabric bias.",
  },
  {
    step: "04",
    title: "Eco-Certified Pigment Dyeing",
    desc: "Fabrics are dyed in closed-loop water systems using low-impact reactive dyes and vintage enzyme washes, resulting in rich color depth without toxic effluent discharge.",
  },
  {
    step: "05",
    title: "Laser Cutting & Atelier Assembly",
    desc: "Every garment panel is precision laser-cut to eliminate dimensional distortion, then assembled by master artisans using industrial 4-needle 6-thread flatlock stitching.",
  },
  {
    step: "06",
    title: "100% Quality Assurance & Numbering",
    desc: "Every finished piece undergoes 14 inspection checkpoints for stitch integrity, seam tension, and colorfastness before receiving its atelier label and eco-packaging.",
  },
];

export default function Process() {
  return (
    <div style={{ backgroundColor: "#0B0F19", minHeight: "100vh" }}>
      {/* Header */}
      <section
        style={{
          position: "relative",
          padding: "100px 24px 60px",
          textAlign: "center",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          background: "linear-gradient(180deg, #080C16 0%, #0B0F19 100%)",
        }}
      >
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <p className="section-label" style={{ marginBottom: "12px" }}>VERTICAL MANUFACTURING PROCESS</p>
          <h1 className="hero-heading" style={{ marginBottom: "18px" }}>
            The Architecture of Textile Excellence
          </h1>
          <p style={{ fontSize: "16px", color: "#94A3B8", lineHeight: 1.8 }}>
            How raw organic cotton is transformed into the world's most durable and structured contemporary garments.
          </p>
        </div>
      </section>

      {/* Hero Process Image */}
      <section style={{ maxWidth: "1280px", margin: "0 auto", padding: "60px 24px 80px" }}>
        <div
          style={{
            position: "relative",
            height: "440px",
            borderRadius: "24px",
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.08)",
            marginBottom: "70px",
          }}
        >
          <img
            src="/images/process-craft.jpg"
            alt="Textile Machine"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(180deg, transparent 40%, rgba(11,15,25,0.95) 100%)",
            }}
          />
          <div style={{ position: "absolute", bottom: "32px", left: "36px", right: "36px" }}>
            <p className="section-label" style={{ marginBottom: "6px" }}>AUTOMATED CIRCULAR KNITTING</p>
            <p style={{ fontSize: "20px", fontWeight: 700, color: "#F8FAFC" }}>
              High-Precision German Weaving & Tension Control
            </p>
          </div>
        </div>

        {/* 6 Step Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "28px",
            marginBottom: "80px",
          }}
        >
          {STEPS.map((s) => (
            <div key={s.step} className="glass-card" style={{ padding: "36px 28px" }}>
              <span
                style={{
                  fontSize: "24px",
                  fontWeight: 800,
                  color: "#6366F1",
                  fontFamily: "monospace",
                  display: "block",
                  marginBottom: "16px",
                }}
              >
                STEP {s.step}
              </span>
              <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#F8FAFC", marginBottom: "12px" }}>
                {s.title}
              </h3>
              <p style={{ fontSize: "14px", color: "#94A3B8", lineHeight: 1.7 }}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{ textAlign: "center" }}>
          <Link to="/products" className="btn-accent" style={{ padding: "14px 36px", fontSize: "14px", fontWeight: 700 }}>
            Shop The Manufactured Pieces →
          </Link>
        </div>
      </section>
    </div>
  );
}
