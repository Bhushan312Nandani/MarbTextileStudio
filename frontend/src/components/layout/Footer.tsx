import { useState } from "react";
import { Link } from "react-router-dom";
import { useToastStore } from "../../store/useToastStore";

const footerCols = [
  {
    heading: "Shop Studio",
    links: [
      { label: "All Garments", to: "/products" },
      { label: "Capsule Collections", to: "/collections" },
      { label: "Hoodies & Sweats", to: "/products?category=Hoodies" },
      { label: "Outerwear & Jackets", to: "/products?category=Jackets" },
      { label: "Tees & Base Layers", to: "/products?category=Tees" },
    ],
  },
  {
    heading: "Editorial & Mill",
    links: [
      { label: "Lookbook Fall/Winter", to: "/lookbook" },
      { label: "About Marb Studio", to: "/about" },
      { label: "Vertical Process", to: "/process" },
      { label: "B2B Sourcing & Collab", to: "/collab" },
      { label: "Marb Textile Parent Site", href: "https://www.marbtextile.com/" },
    ],
  },
  {
    heading: "Client Care",
    links: [
      { label: "Concierge & Contact", to: "/contact" },
      { label: "Track My Order", to: "/orders" },
      { label: "Saved Wishlist", to: "/wishlist" },
      { label: "Size & Fit Guide", to: "/products" },
    ],
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const showToast = useToastStore((s) => s.showToast);
  const year = new Date().getFullYear();

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (email.trim()) {
      showToast("VIP Invitation Confirmed", "You will receive private drop codes and atelier updates.", "success");
      setEmail("");
    }
  }

  return (
    <footer
      style={{
        backgroundColor: "#070B14",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        paddingTop: "70px",
        paddingBottom: "36px",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "48px",
            marginBottom: "60px",
          }}
        >
          {/* Brand Col */}
          <div>
            <Link to="/" style={{ textDecoration: "none" }}>
              <span style={{ fontWeight: 800, fontSize: "24px", letterSpacing: "-0.03em", color: "#F8FAFC" }}>
                marb
              </span>
              <span style={{ color: "#6366F1", fontSize: "24px", fontWeight: 800 }}>·</span>
            </Link>
            <p style={{ marginTop: "14px", fontSize: "13px", color: "#64748B", lineHeight: 1.8, maxWidth: "260px" }}>
              The direct consumer luxury atelier of <a href="https://www.marbtextile.com/" target="_blank" rel="noreferrer" style={{ color: "#818CF8", textDecoration: "underline" }}>Marb Textile Solutions</a>. Heavyweight minimalist garments and numbered drops.
            </p>

            {/* Social Icons */}
            <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
              {[
                { name: "Instagram", href: "https://www.instagram.com/marbtextile", icon: "📸" },
                { name: "Facebook", href: "https://www.facebook.com/marbtextile", icon: "👥" },
                { name: "LinkedIn", href: "https://www.linkedin.com/company/marb-textile-solutions", icon: "💼" },
                { name: "Website", href: "https://www.marbtextile.com/", icon: "🌐" },
              ].map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  title={s.name}
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "8px",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#F8FAFC",
                    fontSize: "14px",
                    textDecoration: "none",
                    transition: "background 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(99,102,241,0.3)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links Cols */}
          {footerCols.map(({ heading, links }) => (
            <div key={heading}>
              <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#F8FAFC", marginBottom: "18px" }}>
                {heading}
              </p>
              {links.map((link: any) =>
                link.href ? (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="footer-link"
                    style={{ display: "block" }}
                  >
                    {link.label} ↗
                  </a>
                ) : (
                  <Link key={link.label} to={link.to} className="footer-link" style={{ display: "block" }}>
                    {link.label}
                  </Link>
                )
              )}
            </div>
          ))}

          {/* Newsletter */}
          <div>
            <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#F8FAFC", marginBottom: "18px" }}>
              Private Member List
            </p>
            <p style={{ fontSize: "13px", color: "#64748B", marginBottom: "16px", lineHeight: 1.6 }}>
              Receive early access codes to seasonal drops before public releases.
            </p>
            <form onSubmit={handleSubscribe} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <input
                type="email"
                required
                placeholder="name@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="marb-input"
                style={{ fontSize: "13px", padding: "10px 14px" }}
              />
              <button type="submit" className="btn-accent" style={{ justifyContent: "center", padding: "10px 18px", fontSize: "13px", fontWeight: 700 }}>
                Join Private List
              </button>
            </form>
          </div>
        </div>

        <hr className="marb-divider" style={{ marginBottom: "28px" }} />

        <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "center", justifyContent: "space-between" }}>
          <p style={{ fontSize: "12px", color: "#475569" }}>
            © {year} Marb Studio / Marb Textile Solutions. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: "24px" }}>
            {["Privacy Charter", "Terms of Sale", "Accessibility", "Shipping Policy"].map((item) => (
              <a
                key={item}
                href="#"
                style={{ fontSize: "12px", color: "#475569", textDecoration: "none" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#94A3B8")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#475569")}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
