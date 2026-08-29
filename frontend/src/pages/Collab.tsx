import { useState } from "react";
import { useToastStore } from "../store/useToastStore";

export default function Collab() {
  const showToast = useToastStore((s) => s.showToast);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    brandName: "",
    contactName: "",
    email: "",
    projectType: "Custom Apparel Sourcing",
    estimatedQuantity: "500 - 2,000 units",
    message: "",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showToast(
        "Inquiry Received",
        "Our B2B manufacturing director will review your specs and contact you within 24 hours.",
        "success"
      );
      setForm({
        brandName: "",
        contactName: "",
        email: "",
        projectType: "Custom Apparel Sourcing",
        estimatedQuantity: "500 - 2,000 units",
        message: "",
      });
    }, 800);
  }

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
          <p className="section-label" style={{ marginBottom: "12px" }}>B2B SOURCING & PRIVATE LABEL</p>
          <h1 className="hero-heading" style={{ marginBottom: "18px" }}>
            Custom Apparel Manufacturing & Brand Collaborations
          </h1>
          <p style={{ fontSize: "16px", color: "#94A3B8", lineHeight: 1.8 }}>
            Partner with <a href="https://www.marbtextile.com/" target="_blank" rel="noreferrer" style={{ color: "#818CF8", textDecoration: "underline" }}>Marb Textile Solutions</a> to manufacture bespoke heavyweight hoodies, custom wash tees, technical outwear, and accessories for your brand.
          </p>
        </div>
      </section>

      {/* Content & Form */}
      <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "80px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "60px", alignItems: "start" }}>
          {/* Left Info */}
          <div>
            <p className="section-label" style={{ marginBottom: "10px" }}>WHY PARTNER WITH MARB</p>
            <h2 style={{ fontSize: "28px", fontWeight: 800, color: "#F8FAFC", marginBottom: "20px" }}>
              Enterprise Capacity, Luxury Atelier Precision
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "24px", marginBottom: "40px" }}>
              {[
                { title: "Custom Yarn & GSM Development", desc: "Choose from 180 to 600 GSM custom fabrics, french terry, fleece, waffle, and ribbed weaves." },
                { title: "Artisanal Dye & Wash Facilities", desc: "Specialty pigment overdyeing, acid washes, vintage sun-fades, and discharge screen printing." },
                { title: "Global Export Compliance", desc: "OEKO-TEX Standard 100, GOTS certified organic fibers, and worldwide direct freight forwarding." },
              ].map((item) => (
                <div key={item.title}>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#F8FAFC", marginBottom: "6px" }}>
                    ✓ {item.title}
                  </h3>
                  <p style={{ fontSize: "13px", color: "#94A3B8", lineHeight: 1.6 }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <div style={{ background: "#090D18", padding: "20px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.06)" }}>
              <p style={{ fontSize: "12px", color: "#64748B", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "4px" }}>Direct B2B Liaison</p>
              <p style={{ fontSize: "14px", fontWeight: 700, color: "#F8FAFC" }}>sourcing@marbtextile.com</p>
              <p style={{ fontSize: "13px", color: "#94A3B8" }}>+92 42 3578 9900 (Mon - Fri)</p>
            </div>
          </div>

          {/* Right Inquiry Form */}
          <div className="glass-card" style={{ padding: "36px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#F8FAFC", marginBottom: "8px" }}>
              Submit Production Inquiry
            </h3>
            <p style={{ fontSize: "13px", color: "#94A3B8", marginBottom: "24px" }}>
              Fill out your garment requirements below for tech pack evaluations and quote proposals.
            </p>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#CBD5E1", marginBottom: "6px", textTransform: "uppercase" }}>Brand Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Archetype NYC"
                    value={form.brandName}
                    onChange={(e) => setForm({ ...form, brandName: e.target.value })}
                    className="marb-input"
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#CBD5E1", marginBottom: "6px", textTransform: "uppercase" }}>Contact Person</label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={form.contactName}
                    onChange={(e) => setForm({ ...form, contactName: e.target.value })}
                    className="marb-input"
                  />
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#CBD5E1", marginBottom: "6px", textTransform: "uppercase" }}>Work Email</label>
                <input
                  type="email"
                  required
                  placeholder="john@brand.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="marb-input"
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#CBD5E1", marginBottom: "6px", textTransform: "uppercase" }}>Project Type</label>
                  <select
                    value={form.projectType}
                    onChange={(e) => setForm({ ...form, projectType: e.target.value })}
                    className="marb-input"
                  >
                    <option>Custom Apparel Sourcing</option>
                    <option>Capsule Drop Collaboration</option>
                    <option>Private Label Blanks</option>
                    <option>Fabric & Milling Wholesale</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#CBD5E1", marginBottom: "6px", textTransform: "uppercase" }}>Estimated Units</label>
                  <select
                    value={form.estimatedQuantity}
                    onChange={(e) => setForm({ ...form, estimatedQuantity: e.target.value })}
                    className="marb-input"
                  >
                    <option>300 - 500 units</option>
                    <option>500 - 2,000 units</option>
                    <option>2,000 - 10,000 units</option>
                    <option>10,000+ units</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#CBD5E1", marginBottom: "6px", textTransform: "uppercase" }}>Garment Specifications & Notes</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe your desired silhouette, GSM weight, target delivery timeline..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="marb-input"
                  style={{ resize: "none" }}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-accent"
                style={{ justifyContent: "center", padding: "14px", fontSize: "14px", fontWeight: 700, marginTop: "8px" }}
              >
                {loading ? "Transmitting Specs…" : "Submit Sourcing Inquiry →"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
