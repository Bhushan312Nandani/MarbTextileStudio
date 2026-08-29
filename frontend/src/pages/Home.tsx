import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard, { type ProductCardData } from "../components/ui/ProductCard";
import { getProducts } from "../api/products";
import { useToastStore } from "../store/useToastStore";

const MOCK_PRODUCTS: ProductCardData[] = [
  { id: "1", title: "Abstract Hood",   price: 12900, image: "/images/product-hoodie.jpg",  badge: "New",     category: "Hoodies" },
  { id: "2", title: "Form Tee",        price:  7900, image: "/images/product-tee.jpg",     badge: undefined, category: "Tees" },
  { id: "3", title: "Motion Jacket",   price: 18900, image: "/images/product-jacket.jpg",  badge: "New",     category: "Jackets" },
  { id: "4", title: "Studio Cap",      price:  4900, image: "/images/product-cap.jpg",     badge: undefined, category: "Accessories" },
  { id: "5", title: "Motion Pant",     price: 14900, image: "/images/product-pant.jpg",    badge: undefined, category: "Bottoms" },
  { id: "6", title: "Signature Hood",  price: 15900, image: "/images/collection-signature.jpg", badge: "Limited", category: "Hoodies" },
];

const PRESS = [
  { quote: "A masterclass in heavyweight textile engineering and minimalist geometry.", source: "HYPEBEAST" },
  { quote: "Redefining the contemporary luxury wardrobe with raw artistic integrity.", source: "VOGUE MAN" },
  { quote: "The silhouette is boxy, structured and effortlessly elevated.", source: "COMPLEX" },
];

export default function Home() {
  const [products, setProducts] = useState<ProductCardData[]>(MOCK_PRODUCTS);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const showToast = useToastStore((s) => s.showToast);

  useEffect(() => {
    getProducts()
      .then((data) => {
        if (data && data.length > 0) {
          const mapped: ProductCardData[] = data.map((p) => ({
            id: p.id,
            title: p.title,
            price: p.product_variants?.[0]
              ? parseFloat(p.product_variants[0].price as any)
              : 9999,
            image:
              p.product_images?.find((i) => i.is_primary)?.image_url ??
              "/images/product-hoodie.jpg",
            category: p.categories?.name,
          }));
          setProducts(mapped);
        }
      })
      .catch(() => {});
  }, []);

  function handleNewsletterSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      showToast("VIP Invitation Sent", "You've been added to the Marb Studio private drop list.", "success");
      setNewsletterEmail("");
    }
  }

  return (
    <div style={{ backgroundColor: "#0B0F19" }}>
      {/* ══════════════════════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════════════════════ */}
      <section
        style={{
          position: "relative",
          minHeight: "92vh",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url('/images/hero-bg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center right",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div className="hero-overlay" style={{ position: "absolute", inset: 0 }} />

        <div
          style={{
            position: "relative",
            zIndex: 10,
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 24px",
            width: "100%",
          }}
        >
          <div style={{ maxWidth: "620px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.3)", padding: "6px 14px", borderRadius: "20px", marginBottom: "20px" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#6366F1" }} />
              <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.15em", color: "#C7D2FE", textTransform: "uppercase" }}>
                FALL / WINTER 2026 DROP LIVE
              </span>
            </div>

            <h1 className="hero-heading anim-fade-in-up" style={{ marginBottom: "20px" }}>
              Abstract by Design.
              <br />
              <span className="gradient-text">Engineered Luxury.</span>
            </h1>

            <p
              className="anim-fade-in-up delay-100"
              style={{
                fontSize: "16px",
                color: "#CBD5E1",
                lineHeight: 1.8,
                marginBottom: "36px",
                maxWidth: "460px",
              }}
            >
              Heavyweight organic textiles, structured minimalist silhouettes, and numbered artisan drops crafted for the contemporary individual.
            </p>

            <div className="anim-fade-in-up delay-200" style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
              <Link to="/products" className="btn-accent" style={{ fontSize: "14px", padding: "14px 34px", fontWeight: 700, textDecoration: "none" }}>
                Shop Collection →
              </Link>
              <Link to="/lookbook" className="btn-outline" style={{ fontSize: "14px", padding: "14px 30px", fontWeight: 600, textDecoration: "none" }}>
                Explore Lookbook
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          PRESS / REVIEWS TICKER
      ══════════════════════════════════════════════════════ */}
      <section
        style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          background: "#080C16",
          padding: "32px 24px",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "32px",
          }}
        >
          {PRESS.map((item) => (
            <div key={item.source} style={{ textAlign: "center", padding: "0 16px" }}>
              <p style={{ fontSize: "14px", color: "#94A3B8", fontStyle: "italic", marginBottom: "10px", lineHeight: 1.6 }}>
                "{item.quote}"
              </p>
              <p style={{ fontSize: "11px", fontWeight: 800, color: "#6366F1", letterSpacing: "0.18em" }}>
                {item.source}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FEATURED PRODUCTS
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding: "90px 24px", maxWidth: "1280px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: "44px",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <div>
            <p className="section-label" style={{ marginBottom: "8px" }}>SEASON 04 ARRIVALS</p>
            <h2 className="section-heading">Featured Pieces</h2>
          </div>
          <Link
            to="/products"
            style={{
              fontSize: "14px",
              color: "#818CF8",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontWeight: 700,
            }}
          >
            View Entire Catalogue →
          </Link>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "24px",
          }}
        >
          {products.slice(0, 6).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          THE ATELIER PHILOSOPHY / MATERIAL EXCELLENCE
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding: "80px 24px", background: "#090D18", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 56px" }}>
            <p className="section-label" style={{ marginBottom: "10px" }}>THE CRAFTSMANSHIP</p>
            <h2 className="section-heading" style={{ marginBottom: "16px" }}>
              Material Standards & Innovation
            </h2>
            <p style={{ fontSize: "15px", color: "#94A3B8", lineHeight: 1.7 }}>
              Every garment is created from custom-spun yarns, pre-shrunk heavyweight fabrics, and finished with artisanal detailing.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "28px",
            }}
          >
            {[
              {
                num: "01",
                title: "450+ GSM Organic Fleece",
                desc: "Custom-developed loopback terry with ultra-dense surface knitting for unparalleled drape and lifelong shape retention.",
              },
              {
                num: "02",
                title: "Relaxed Boxy Fit Architecture",
                desc: "Dropped shoulders, widened chest circumferences, and shortened torso lengths designed for seamless layering.",
              },
              {
                num: "03",
                title: "Numbered Edition Drops",
                desc: "Each seasonal piece is manufactured in strictly limited quantities with unique inner atelier labeling.",
              },
            ].map((pillar) => (
              <div key={pillar.num} className="glass-card" style={{ padding: "36px 28px" }}>
                <span style={{ fontSize: "18px", fontWeight: 800, color: "#6366F1", fontFamily: "monospace", display: "block", marginBottom: "16px" }}>
                  {pillar.num}
                </span>
                <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#F8FAFC", marginBottom: "12px" }}>
                  {pillar.title}
                </h3>
                <p style={{ fontSize: "14px", color: "#94A3B8", lineHeight: 1.7 }}>
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          EDITORIAL LOOKBOOK SPOTLIGHT
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding: "90px 24px", maxWidth: "1280px", margin: "0 auto" }}>
        <div
          style={{
            position: "relative",
            borderRadius: "24px",
            overflow: "hidden",
            background: "linear-gradient(135deg, #131A2E 0%, #1F2937 100%)",
            border: "1px solid rgba(99,102,241,0.2)",
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr",
            alignItems: "center",
          }}
        >
          <div style={{ padding: "64px 48px", zIndex: 10 }}>
            <p className="section-label" style={{ marginBottom: "12px" }}>LOOKBOOK • AUTUMN/WINTER 2026</p>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 800, color: "#F8FAFC", marginBottom: "20px", lineHeight: 1.15 }}>
              The Form of Formlessness
            </h2>
            <p style={{ color: "#CBD5E1", fontSize: "15px", lineHeight: 1.8, marginBottom: "32px", maxWidth: "420px" }}>
              Explore our full digital lookbook featuring editorial styling, fabric close-ups, and contemporary streetwear silhouettes.
            </p>
            <Link to="/lookbook" className="btn-accent" style={{ padding: "14px 32px", fontSize: "14px", fontWeight: 700, textDecoration: "none" }}>
              View Lookbook →
            </Link>
          </div>

          <div style={{ height: "100%", minHeight: "400px" }}>
            <img
              src="/images/collection-signature.jpg"
              alt="Editorial Lookbook"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          VIP NEWSLETTER SIGNUP
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding: "0 24px 90px" }}>
        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            textAlign: "center",
            background: "#0E1526",
            borderRadius: "20px",
            border: "1px solid rgba(255,255,255,0.08)",
            padding: "56px 36px",
          }}
        >
          <p className="section-label" style={{ marginBottom: "8px" }}>EXCLUSIVE STUDIO ACCESS</p>
          <h2 style={{ fontSize: "28px", fontWeight: 800, color: "#F8FAFC", marginBottom: "12px" }}>
            Join the Private Drop List
          </h2>
          <p style={{ color: "#94A3B8", fontSize: "14px", marginBottom: "28px", maxWidth: "460px", margin: "0 auto 28px" }}>
            Receive password-protected early access to limited capsule releases, studio exhibitions, and private member events.
          </p>

          <form onSubmit={handleNewsletterSubmit} style={{ display: "flex", gap: "10px", maxWidth: "480px", margin: "0 auto" }}>
            <input
              type="email"
              required
              placeholder="Enter your email address"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="marb-input"
              style={{ flex: 1 }}
            />
            <button type="submit" className="btn-accent" style={{ padding: "12px 24px", fontSize: "14px", fontWeight: 700 }}>
              Join List
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
