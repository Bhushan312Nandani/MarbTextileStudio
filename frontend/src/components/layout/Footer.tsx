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
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <Link to="/" style={{ textDecoration: "none" }} className="flex items-baseline select-none">
                <span style={{ fontWeight: 800, fontSize: "24px", letterSpacing: "-0.03em", color: "#F8FAFC" }}>
                  marb
                </span>
                <span style={{ color: "#6366F1", fontSize: "24px", fontWeight: 800 }}>·</span>
              </Link>
              <span
                style={{
                  fontSize: "9.5px",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  padding: "2px 8px",
                  borderRadius: "100px",
                  background: "rgba(99, 102, 241, 0.12)",
                  color: "#A5B4FC",
                  border: "1px solid rgba(99, 102, 241, 0.25)",
                }}
              >
                Atelier
              </span>
            </div>

            <p style={{ fontSize: "13px", color: "#94A3B8", lineHeight: 1.7, maxWidth: "280px" }}>
              The direct-to-consumer luxury atelier of{" "}
              <a
                href="https://www.marbtextile.com/"
                target="_blank"
                rel="noreferrer"
                style={{
                  color: "#818CF8",
                  fontWeight: 600,
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "2px",
                }}
                className="hover:underline"
              >
                Marb Textile Solutions
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7" />
                  <path d="M7 7h10v10" />
                </svg>
              </a>
              . Heavyweight minimalist garments and numbered drops.
            </p>

            {/* Premium Vector Social Icons */}
            <div style={{ display: "flex", gap: "10px", paddingTop: "6px" }}>
              {[
                {
                  name: "Instagram",
                  href: "https://www.instagram.com/marbtextile",
                  svg: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                  ),
                },
                {
                  name: "Facebook",
                  href: "https://www.facebook.com/marbtextile",
                  svg: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  ),
                },
                {
                  name: "LinkedIn",
                  href: "https://www.linkedin.com/company/marb-textile-solutions",
                  svg: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect width="4" height="12" x="2" y="9" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  ),
                },
                {
                  name: "Official Website",
                  href: "https://www.marbtextile.com/",
                  svg: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                      <path d="M2 12h20" />
                    </svg>
                  ),
                },
              ].map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  title={s.name}
                  aria-label={s.name}
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "10px",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#94A3B8",
                    textDecoration: "none",
                    transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(99, 102, 241, 0.15)";
                    e.currentTarget.style.borderColor = "rgba(99, 102, 241, 0.4)";
                    e.currentTarget.style.color = "#FFFFFF";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                    e.currentTarget.style.color = "#94A3B8";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {s.svg}
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
