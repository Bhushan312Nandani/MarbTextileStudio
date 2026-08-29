import { Link } from "react-router-dom";

export default function About() {
  return (
    <div style={{ backgroundColor: "#0B0F19", minHeight: "100vh" }}>
      {/* Hero Banner */}
      <section
        style={{
          position: "relative",
          padding: "100px 24px 70px",
          textAlign: "center",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          background: "linear-gradient(180deg, #080C16 0%, #0B0F19 100%)",
        }}
      >
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <p className="section-label" style={{ marginBottom: "12px" }}>ABOUT MARB STUDIO & MARB TEXTILE</p>
          <h1 className="hero-heading" style={{ marginBottom: "20px" }}>
            The Intersection of Industrial Mastery & Minimalist Art.
          </h1>
          <p style={{ fontSize: "16px", color: "#94A3B8", lineHeight: 1.8 }}>
            Born from decades of advanced textile manufacturing excellence at <a href="https://www.marbtextile.com/" target="_blank" rel="noreferrer" style={{ color: "#818CF8", textDecoration: "underline" }}>Marb Textile Solutions</a>, Marb Studio is the direct-to-consumer manifestation of pure textile innovation.
          </p>
        </div>
      </section>

      {/* Main Story & Mill Image */}
      <section style={{ maxWidth: "1280px", margin: "0 auto", padding: "80px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "50px", alignItems: "center", marginBottom: "80px" }}>
          <div style={{ borderRadius: "20px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)" }}>
            <img
              src="/images/process-craft.jpg"
              alt="Marb Textile Facility"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>

          <div>
            <p className="section-label" style={{ marginBottom: "10px" }}>ATELIER & VERTICAL MILL</p>
            <h2 className="section-heading" style={{ marginBottom: "20px" }}>
              From Raw Fiber to Finished Form
            </h2>
            <p style={{ fontSize: "15px", color: "#94A3B8", lineHeight: 1.8, marginBottom: "20px" }}>
              Unlike brands that rely on third-party stock blanks, Marb Studio engineers its garments from the raw fiber up. Leveraging our vertically integrated facilities in Pakistan, we spin custom combed yarns, weave bespoke high-density french terry fabrics, and apply eco-certified pigment dyes.
            </p>
            <p style={{ fontSize: "15px", color: "#94A3B8", lineHeight: 1.8, marginBottom: "32px" }}>
              Our heritage lies in engineering luxury apparel for top global fashion houses. Marb Studio is our uncompromising creative canvas.
            </p>

            <div style={{ display: "flex", gap: "24px" }}>
              <div>
                <p style={{ fontSize: "28px", fontWeight: 800, color: "#6366F1", marginBottom: "2px" }}>30+</p>
                <p style={{ fontSize: "12px", color: "#64748B", textTransform: "uppercase", letterSpacing: "0.08em" }}>Years Textile Heritage</p>
              </div>
              <div style={{ borderLeft: "1px solid rgba(255,255,255,0.08)", paddingLeft: "24px" }}>
                <p style={{ fontSize: "28px", fontWeight: 800, color: "#6366F1", marginBottom: "2px" }}>100%</p>
                <p style={{ fontSize: "12px", color: "#64748B", textTransform: "uppercase", letterSpacing: "0.08em" }}>Vertical Traceability</p>
              </div>
              <div style={{ borderLeft: "1px solid rgba(255,255,255,0.08)", paddingLeft: "24px" }}>
                <p style={{ fontSize: "28px", fontWeight: 800, color: "#6366F1", marginBottom: "2px" }}>Zero</p>
                <p style={{ fontSize: "12px", color: "#64748B", textTransform: "uppercase", letterSpacing: "0.08em" }}>Synthetic Fillers</p>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Pillars */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px", marginBottom: "80px" }}>
          {[
            { title: "Sustainable Sourcing", desc: "Long-staple organic cotton harvested with minimal water usage and verified fair-trade farming standards." },
            { title: "Precision Tailoring", desc: "Architectural boxy cuts, double-stitched reinforced seams, and weighted drape engineered to hold form." },
            { title: "Circular Commitment", desc: "Garments constructed for extreme longevity, natural biodegradability, and zero microplastic shedding." },
          ].map((pillar) => (
            <div key={pillar.title} className="glass-card" style={{ padding: "32px 24px" }}>
              <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#F8FAFC", marginBottom: "12px" }}>
                {pillar.title}
              </h3>
              <p style={{ fontSize: "14px", color: "#94A3B8", lineHeight: 1.7 }}>
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="glass-card" style={{ padding: "48px 36px", textAlign: "center", maxWidth: "800px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "24px", fontWeight: 800, color: "#F8FAFC", marginBottom: "12px" }}>
            Experience the Craftsmanship
          </h2>
          <p style={{ fontSize: "14px", color: "#94A3B8", marginBottom: "28px" }}>
            Explore our current season pieces or learn more about our industrial custom production.
          </p>
          <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/products" className="btn-accent" style={{ padding: "12px 28px" }}>
              Shop Collection →
            </Link>
            <Link to="/process" className="btn-outline" style={{ padding: "12px 28px" }}>
              Our Manufacturing Process
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
