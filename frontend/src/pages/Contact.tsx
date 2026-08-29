import { useState } from "react";
import { useToastStore } from "../store/useToastStore";

export default function Contact() {
  const showToast = useToastStore((s) => s.showToast);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "Order & Shipping Inquiry", message: "" });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showToast("Message Sent", "Our concierge team will respond to your email within a few hours.", "success");
      setForm({ name: "", email: "", subject: "Order & Shipping Inquiry", message: "" });
    }, 600);
  }

  return (
    <div style={{ backgroundColor: "#0B0F19", minHeight: "100vh" }}>
      <section
        style={{
          padding: "100px 24px 60px",
          textAlign: "center",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          background: "linear-gradient(180deg, #080C16 0%, #0B0F19 100%)",
        }}
      >
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <p className="section-label" style={{ marginBottom: "12px" }}>CONCIERGE & STUDIO SUPPORT</p>
          <h1 className="hero-heading" style={{ marginBottom: "18px" }}>
            Get in Touch with Marb Studio
          </h1>
          <p style={{ fontSize: "16px", color: "#94A3B8", lineHeight: 1.8 }}>
            Whether you have questions regarding sizing, custom tailoring, private drop access, or order shipments.
          </p>
        </div>
      </section>

      <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "80px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: "60px", alignItems: "start" }}>
          {/* Contact Details */}
          <div>
            <p className="section-label" style={{ marginBottom: "10px" }}>CHANNELS</p>
            <h2 style={{ fontSize: "28px", fontWeight: 800, color: "#F8FAFC", marginBottom: "24px" }}>
              Studio Headquarters
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "28px", marginBottom: "40px" }}>
              <div>
                <p style={{ fontSize: "12px", color: "#64748B", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "4px" }}>Atelier Location</p>
                <p style={{ fontSize: "15px", fontWeight: 600, color: "#F8FAFC" }}>Marb Textile Solutions Industrial Park</p>
                <p style={{ fontSize: "14px", color: "#94A3B8" }}>Lahore, Punjab, Pakistan</p>
              </div>

              <div>
                <p style={{ fontSize: "12px", color: "#64748B", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "4px" }}>Electronic Inquiries</p>
                <p style={{ fontSize: "15px", fontWeight: 600, color: "#818CF8" }}>concierge@marbtextile.com</p>
                <p style={{ fontSize: "14px", color: "#94A3B8" }}>Response time: within 4 hours</p>
              </div>

              <div>
                <p style={{ fontSize: "12px", color: "#64748B", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "4px" }}>Official Website</p>
                <a href="https://www.marbtextile.com/" target="_blank" rel="noreferrer" style={{ fontSize: "15px", fontWeight: 600, color: "#818CF8", textDecoration: "underline" }}>
                  www.marbtextile.com
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="glass-card" style={{ padding: "36px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#F8FAFC", marginBottom: "20px" }}>
              Send a Direct Message
            </h3>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#CBD5E1", marginBottom: "6px", textTransform: "uppercase" }}>Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="Ali Khan"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="marb-input"
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#CBD5E1", marginBottom: "6px", textTransform: "uppercase" }}>Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="ali@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="marb-input"
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#CBD5E1", marginBottom: "6px", textTransform: "uppercase" }}>Topic</label>
                <select
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="marb-input"
                >
                  <option>Order & Shipping Inquiry</option>
                  <option>Sizing & Fit Advice</option>
                  <option>Custom Atelier Request</option>
                  <option>Press & Editorial</option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#CBD5E1", marginBottom: "6px", textTransform: "uppercase" }}>Message</label>
                <textarea
                  rows={4}
                  required
                  placeholder="How can we assist you today?"
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
                {loading ? "Sending Message…" : "Transmit Message →"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
