import { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { useCartStore } from "../../store/useCartStore";
import { useWishlistStore } from "../../store/useWishlistStore";

interface NavbarProps {
  onOpenCart?: () => void;
  announcementVisible?: boolean;
  onCloseAnnouncement?: () => void;
}

export default function Navbar({
  onOpenCart,
  announcementVisible = true,
  onCloseAnnouncement,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const cartCount = useCartStore((s) =>
    s.lines.reduce((n, l) => n + l.quantity, 0)
  );
  const wishlistCount = useWishlistStore((s) => s.items.length);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setUserDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { label: "Shop All",    to: "/products" },
    { label: "Collections", to: "/collections" },
    { label: "Lookbook",    to: "/lookbook" },
    { label: "Process",     to: "/process" },
    { label: "About",       to: "/about" },
    { label: "Collab",      to: "/collab" },
  ];

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
        {/* ── Sleek Announcement Banner ── */}
        {announcementVisible && (
          <div
            className="relative flex items-center justify-center px-4 py-2 text-xs select-none"
            style={{
              background: "linear-gradient(90deg, #0d1322 0%, #1e1b4b 50%, #0d1322 100%)",
              borderBottom: "1px solid rgba(99, 102, 241, 0.2)",
              color: "#E2E8F0",
              letterSpacing: "0.03em",
              minHeight: "34px",
            }}
          >
            <div className="flex items-center gap-2 text-center flex-wrap justify-center text-[11px] md:text-xs">
              <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px]">
                ✦
              </span>
              <span className="text-slate-300">
                Complimentary Nationwide Express Shipping on orders over <strong className="text-white font-semibold">Rs 5,000</strong>
              </span>
              <span className="hidden sm:inline text-indigo-400/40">•</span>
              <span className="inline-flex items-center gap-1.5 text-slate-300">
                Use code
                <span
                  style={{
                    background: "rgba(253, 224, 71, 0.15)",
                    color: "#FDE047",
                    border: "1px solid rgba(253, 224, 71, 0.3)",
                    padding: "1px 6px",
                    borderRadius: "4px",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    fontSize: "10.5px",
                    fontFamily: "monospace",
                  }}
                >
                  MARB10
                </span>
                for 10% off
              </span>
            </div>

            {onCloseAnnouncement && (
              <button
                onClick={onCloseAnnouncement}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white rounded transition-colors"
                aria-label="Dismiss banner"
                title="Dismiss"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
          </div>
        )}

        {/* ── Main Glass Navigation ── */}
        <div className="glass-nav">
          <nav
            className="flex items-center justify-between px-6 md:px-10 lg:px-16"
            style={{ height: "64px", maxWidth: "1400px", margin: "0 auto" }}
          >
          {/* ── Logo ── */}
          <Link to="/" className="flex items-baseline gap-0.5 select-none" style={{ textDecoration: "none" }}>
            <span
              style={{
                fontWeight: 800,
                fontSize: "22px",
                letterSpacing: "-0.03em",
                color: "#F8FAFC",
                lineHeight: 1,
              }}
            >
              marb
            </span>
            <span style={{ color: "#6366F1", fontSize: "22px", fontWeight: 800, lineHeight: 1 }}>
              ·
            </span>
          </Link>

          {/* ── Desktop nav links ── */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map(({ label, to }) => (
              <NavLink
                key={label}
                to={to}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors duration-200 ${
                    isActive ? "text-white font-semibold" : "text-slate-400 hover:text-white"
                  }`
                }
                style={{ textDecoration: "none" }}
              >
                {label}
              </NavLink>
            ))}
          </div>

          {/* ── Right side icons ── */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <button
              id="navbar-search-btn"
              onClick={() => setSearchOpen((o) => !o)}
              className="btn-ghost p-2 rounded-lg"
              aria-label="Search"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </button>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              id="navbar-wishlist-link"
              className="relative btn-ghost p-2 rounded-lg"
              aria-label={`Wishlist (${wishlistCount} items)`}
              style={{ textDecoration: "none" }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              {wishlistCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "2px",
                    right: "2px",
                    background: "#6366F1",
                    color: "#fff",
                    fontSize: "10px",
                    fontWeight: 700,
                    width: "16px",
                    height: "16px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    lineHeight: 1,
                  }}
                >
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart with Drawer Trigger */}
            <button
              onClick={onOpenCart}
              id="navbar-cart-link"
              className="relative btn-ghost p-2 rounded-lg"
              aria-label={`Cart (${cartCount} items)`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              {cartCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "2px",
                    right: "2px",
                    background: "#6366F1",
                    color: "#fff",
                    fontSize: "10px",
                    fontWeight: 700,
                    width: "16px",
                    height: "16px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    lineHeight: 1,
                  }}
                >
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </button>

            {/* Account Dropdown */}
            {user ? (
              <div className="relative hidden md:block" ref={dropdownRef}>
                <button
                  onClick={() => setUserDropdownOpen((o) => !o)}
                  className="btn-ghost flex items-center gap-2 p-2 rounded-lg"
                  style={{ fontSize: "13px", fontWeight: 600, color: "#F8FAFC" }}
                >
                  <span style={{ width: "26px", height: "26px", borderRadius: "50%", background: "rgba(99,102,241,0.2)", border: "1px solid #6366F1", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", color: "#A5B4FC" }}>
                    {user.first_name?.[0] || "U"}
                  </span>
                  <span>{user.first_name}</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </button>

                {userDropdownOpen && (
                  <div
                    className="glass-card anim-scale-in"
                    style={{
                      position: "absolute",
                      right: 0,
                      top: "calc(100% + 8px)",
                      width: "210px",
                      padding: "8px",
                      boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
                      zIndex: 100,
                    }}
                  >
                    <div style={{ padding: "8px 12px", borderBottom: "1px solid rgba(255,255,255,0.06)", marginBottom: "4px" }}>
                      <p style={{ fontSize: "13px", fontWeight: 700, color: "#F8FAFC" }}>{user.first_name} {user.last_name}</p>
                      <p style={{ fontSize: "11px", color: "#64748B", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user.email}</p>
                    </div>

                    <Link
                      to="/orders"
                      onClick={() => setUserDropdownOpen(false)}
                      className="footer-link"
                      style={{ padding: "8px 12px", margin: 0, borderRadius: "6px", fontSize: "13px", display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}
                    >
                      <span>📦</span> My Orders & Tracking
                    </Link>

                    <Link
                      to="/wishlist"
                      onClick={() => setUserDropdownOpen(false)}
                      className="footer-link"
                      style={{ padding: "8px 12px", margin: 0, borderRadius: "6px", fontSize: "13px", display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}
                    >
                      <span>♡</span> Saved Pieces ({wishlistCount})
                    </Link>

                    {user.role === "ADMIN" && (
                      <Link
                        to="/admin"
                        onClick={() => setUserDropdownOpen(false)}
                        className="footer-link"
                        style={{ padding: "8px 12px", margin: 0, borderRadius: "6px", fontSize: "13px", color: "#818CF8", display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}
                      >
                        <span>👑</span> Admin Control Panel
                      </Link>
                    )}

                    <hr className="marb-divider" style={{ margin: "4px 0" }} />

                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                      }}
                      style={{
                        width: "100%",
                        textAlign: "left",
                        padding: "8px 12px",
                        background: "none",
                        border: "none",
                        color: "#EF4444",
                        fontSize: "13px",
                        cursor: "pointer",
                        borderRadius: "6px",
                      }}
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="hidden md:flex btn-ghost p-2 rounded-lg" aria-label="Account" style={{ textDecoration: "none" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                </svg>
              </Link>
            )}

            {/* Shop Now CTA */}
            <Link to="/products" id="navbar-shop-now" className="hidden sm:inline-flex btn-accent" style={{ padding: "8px 18px", fontSize: "13px" }}>
              Shop Now
            </Link>

            {/* Mobile hamburger */}
            <button
              id="navbar-mobile-menu-btn"
              className="flex lg:hidden btn-ghost p-2 rounded-lg"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>
          </div>
        </nav>

        {/* ── Search bar (dropdown) ── */}
        {searchOpen && (
          <div
            style={{
              background: "rgba(15,24,40,0.98)",
              borderTop: "1px solid rgba(255,255,255,0.06)",
              padding: "16px 24px",
            }}
          >
            <form onSubmit={handleSearch} className="flex items-center gap-3" style={{ maxWidth: "640px", margin: "0 auto" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input
                autoFocus
                id="navbar-search-input"
                type="text"
                placeholder="Search hoodies, jackets, tees, lookbooks…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  flex: 1,
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  color: "#F8FAFC",
                  fontSize: "14px",
                  fontFamily: "Inter, sans-serif",
                }}
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="btn-ghost"
                style={{ padding: "4px 8px", fontSize: "12px" }}
              >
                ESC
              </button>
            </form>
          </div>
        )}
        </div>
      </header>

      {/* ── Mobile Drawer ── */}
      {mobileOpen && (
        <div className="mobile-drawer">
          <div
            className="mobile-drawer-overlay"
            onClick={() => setMobileOpen(false)}
          />
          <div className="mobile-drawer-panel">
            <div className="flex items-center justify-between mb-6">
              <span style={{ fontWeight: 800, fontSize: "18px", color: "#F8FAFC", letterSpacing: "-0.02em" }}>
                marb<span style={{ color: "#6366F1" }}>·</span>
              </span>
              <button
                onClick={() => setMobileOpen(false)}
                className="btn-ghost p-2 rounded-lg"
                aria-label="Close menu"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            {navLinks.map(({ label, to }) => (
              <Link
                key={label}
                to={to}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: "block",
                  padding: "14px 12px",
                  fontSize: "16px",
                  fontWeight: 500,
                  color: "#CBD5E1",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                  textDecoration: "none",
                }}
              >
                {label}
              </Link>
            ))}

            <Link
              to="/wishlist"
              onClick={() => setMobileOpen(false)}
              style={{
                display: "block",
                padding: "14px 12px",
                fontSize: "16px",
                fontWeight: 500,
                color: "#CBD5E1",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                textDecoration: "none",
              }}
            >
              Saved Pieces ({wishlistCount})
            </Link>

            <Link
              to="/contact"
              onClick={() => setMobileOpen(false)}
              style={{
                display: "block",
                padding: "14px 12px",
                fontSize: "16px",
                fontWeight: 500,
                color: "#CBD5E1",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                textDecoration: "none",
              }}
            >
              Concierge & Contact
            </Link>

            {user && (
              <Link
                to="/orders"
                onClick={() => setMobileOpen(false)}
                style={{
                  display: "block",
                  padding: "14px 12px",
                  fontSize: "16px",
                  fontWeight: 500,
                  color: "#CBD5E1",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                  textDecoration: "none",
                }}
              >
                My Orders
              </Link>
            )}

            <div style={{ marginTop: "auto", paddingTop: "24px", display: "flex", flexDirection: "column", gap: "12px" }}>
              {user ? (
                <button
                  onClick={() => {
                    logout();
                    setMobileOpen(false);
                  }}
                  className="btn-outline"
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  Sign Out
                </button>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMobileOpen(false)} className="btn-outline" style={{ width: "100%", justifyContent: "center", textDecoration: "none" }}>
                    Sign In
                  </Link>
                  <Link to="/register" onClick={() => setMobileOpen(false)} className="btn-accent" style={{ width: "100%", justifyContent: "center", textDecoration: "none" }}>
                    Create Account
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
