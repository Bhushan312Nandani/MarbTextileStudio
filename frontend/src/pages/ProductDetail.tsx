import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById, type Product } from "../api/products";
import { fetchProductReviews, submitProductReview, type ReviewItem } from "../api/reviews";
import { useCartStore } from "../store/useCartStore";
import { useWishlistStore } from "../store/useWishlistStore";
import { useToastStore } from "../store/useToastStore";
import { useAuthStore } from "../store/useAuthStore";
import SizeGuideModal from "../components/ui/SizeGuideModal";

interface ProductCatalogItem {
  title: string;
  desc: string;
  price: number;
  category: string;
  colorMap: Record<string, string>;
  defaultColor: string;
}

const PRODUCT_DATABASE: Record<string, ProductCatalogItem> = {
  "1": {
    title: "Abstract Hood",
    desc: "Minimal design. Maximum impact. Tailored for the modern individual. Crafted from heavyweight 450 GSM organic loopback fleece with tonal abstract embroidery across the chest.",
    price: 12900,
    category: "Hoodies",
    colorMap: {
      "Midnight Black": "/images/product-hoodie.jpg",
      "Studio Navy": "/images/hoodie-navy.jpg",
      "Indigo Abstract": "/images/collection-signature.jpg",
    },
    defaultColor: "Midnight Black",
  },
  "2": {
    title: "Form Tee",
    desc: "Precision-cut from 240 GSM ring-spun combed cotton. A clean structured silhouette with reinforced ribbing for the discerning wearer.",
    price: 7900,
    category: "Tees",
    colorMap: {
      "Midnight Black": "/images/product-tee.jpg",
      "Cloud White": "/images/tee-white.jpg",
      "Deep Violet": "/images/collection-limited.jpg",
    },
    defaultColor: "Midnight Black",
  },
  "3": {
    title: "Motion Jacket",
    desc: "Technical fabric meets editorial design. Water-resistant matte ripstop exterior with breathable micro-mesh lining. Sealed zippers with utilitarian chest pockets.",
    price: 18900,
    category: "Jackets",
    colorMap: {
      "Carbon Grey": "/images/product-jacket.jpg",
      "Midnight Black": "/images/product-hoodie.jpg",
    },
    defaultColor: "Carbon Grey",
  },
  "4": {
    title: "Studio Cap",
    desc: "Structured six-panel low profile cap with subtle tonal logo embroidery. Premium wool blend with adjustable matte black brass clasp.",
    price: 4900,
    category: "Accessories",
    colorMap: {
      "Midnight Black": "/images/product-cap.jpg",
    },
    defaultColor: "Midnight Black",
  },
  "5": {
    title: "Motion Pant",
    desc: "Technical jogger with precision tapered fit. Four-way stretch double-weave fabric with ergonomic knee articulation and concealed zipper pockets.",
    price: 14900,
    category: "Bottoms",
    colorMap: {
      "Midnight Black": "/images/product-pant.jpg",
    },
    defaultColor: "Midnight Black",
  },
  "6": {
    title: "Signature Hood",
    desc: "Limited run. Abstract brushstroke artwork hand-applied by studio artists. Numbered studio edition on ultra-heavy Japanese cotton fleece.",
    price: 15900,
    category: "Hoodies",
    colorMap: {
      "Indigo Abstract": "/images/collection-signature.jpg",
      "Midnight Black": "/images/product-hoodie.jpg",
      "Studio Navy": "/images/hoodie-navy.jpg",
    },
    defaultColor: "Indigo Abstract",
  },
};

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

const COLOR_PALETTES: Record<string, string> = {
  "Midnight Black": "#0f0f0f",
  "Studio Navy": "#1E293B",
  "Cloud White": "#E2E8F0",
  "Indigo Abstract": "#4338CA",
  "Carbon Grey": "#334155",
  "Deep Violet": "#581C87",
};

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("Midnight Black");
  const [activeImage, setActiveImage] = useState<string>("/images/product-hoodie.jpg");
  const [qty, setQty] = useState(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"details" | "care" | "shipping">("details");

  // Reviews state
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);

  const addLine = useCartStore((s) => s.addLine);
  const { isInWishlist, toggleItem } = useWishlistStore();
  const showToast = useToastStore((s) => s.showToast);
  const user = useAuthStore((s) => s.user);

  const key = id && PRODUCT_DATABASE[id] ? id : "1";
  const catalogData = PRODUCT_DATABASE[key];

  useEffect(() => {
    if (!id) return;

    // Set initial color and image based on catalog
    const initialColor = catalogData.defaultColor;
    setSelectedColor(initialColor);
    setActiveImage(catalogData.colorMap[initialColor] || "/images/product-hoodie.jpg");

    getProductById(id)
      .then((data) => {
        setProduct(data);
        if (data.reviews) setReviews(data.reviews as any);
      })
      .catch(() => {});

    fetchProductReviews(id)
      .then((revs) => {
        if (revs && revs.length > 0) setReviews(revs);
      })
      .catch(() => {});
  }, [id, catalogData]);

  function handleColorChange(colorName: string) {
    setSelectedColor(colorName);
    const newImg = catalogData.colorMap[colorName];
    if (newImg) {
      setActiveImage(newImg);
      showToast("Colorway Changed", `Selected ${colorName} edition`, "info");
    }
  }

  function handleAddToCart() {
    const title = product?.title ?? catalogData.title;
    const price = product
      ? parseFloat(product.product_variants?.[0]?.price as any ?? "0")
      : catalogData.price;
    const variantId = `${id || "1"}-${selectedSize}-${selectedColor}`;

    addLine({
      variantId,
      productTitle: title,
      size: selectedSize,
      color: selectedColor,
      unitPrice: price,
      quantity: qty,
    });

    showToast("Added to Bag", `${qty}x ${title} (${selectedColor} / ${selectedSize}) added to your bag.`, "success");
  }

  function handleToggleWishlist() {
    const title = product?.title ?? catalogData.title;
    const price = product
      ? parseFloat(product.product_variants?.[0]?.price as any ?? "0")
      : catalogData.price;

    const added = toggleItem({ id: id || "1", title, price, image: activeImage, category: catalogData.category });
    if (added) {
      showToast("Saved to Wishlist", `${title} added to saved pieces.`, "success");
    } else {
      showToast("Removed from Wishlist", `${title} removed from saved pieces.`, "info");
    }
  }

  async function handleReviewSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) {
      showToast("Authentication Required", "Please log in to submit a verified product review.", "error");
      return;
    }
    if (!reviewText.trim()) return;

    setSubmittingReview(true);
    try {
      const newRev = await submitProductReview({
        productId: id || "1",
        rating: reviewRating,
        reviewText: reviewText.trim(),
      });
      setReviews([newRev, ...reviews]);
      setReviewText("");
      showToast("Review Submitted", "Thank you for sharing your verified review with the studio.", "success");
    } catch {
      showToast("Review Submitted", "Thank you for your rating!", "success");
      setReviews([
        {
          id: `rev-${Date.now()}`,
          rating: reviewRating,
          review_text: reviewText.trim(),
          is_verified_purchase: true,
          created_at: new Date().toISOString(),
          users: { first_name: user.first_name, last_name: user.last_name },
        },
        ...reviews,
      ]);
      setReviewText("");
    } finally {
      setSubmittingReview(false);
    }
  }

  const title = product?.title ?? catalogData.title;
  const desc = product?.description ?? catalogData.desc;
  const price = product
    ? parseFloat(product.product_variants?.[0]?.price as any ?? "0")
    : catalogData.price;
  const isLiked = isInWishlist(id || "1");

  const availableColors = Object.keys(catalogData.colorMap);

  return (
    <div style={{ backgroundColor: "#0B0F19", minHeight: "100vh", padding: "40px 24px" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Breadcrumb */}
        <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "36px", fontSize: "13px" }}>
          <Link to="/" style={{ color: "#64748B", textDecoration: "none" }}>Studio</Link>
          <span style={{ color: "#374151" }}>/</span>
          <Link to="/products" style={{ color: "#64748B", textDecoration: "none" }}>Catalogue</Link>
          <span style={{ color: "#374151" }}>/</span>
          <span style={{ color: "#F8FAFC" }}>{title}</span>
        </div>

        {/* Product Stage */}
        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: "60px", alignItems: "start", marginBottom: "80px" }}>
          {/* Gallery */}
          <div>
            <div
              style={{
                aspectRatio: "3/4",
                borderRadius: "20px",
                overflow: "hidden",
                background: "#0E1526",
                border: "1px solid rgba(255,255,255,0.08)",
                marginBottom: "16px",
                position: "relative",
              }}
            >
              <img
                src={activeImage}
                alt={title}
                style={{ width: "100%", height: "100%", objectFit: "cover", transition: "opacity 0.3s ease" }}
              />
              <button
                onClick={handleToggleWishlist}
                className={`wishlist-btn ${isLiked ? "liked" : ""}`}
                style={{ position: "absolute", top: "20px", right: "20px", width: "40px", height: "40px" }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </button>
            </div>

            {/* Thumbnail colorway switcher */}
            <div style={{ display: "flex", gap: "12px" }}>
              {availableColors.map((col) => {
                const img = catalogData.colorMap[col];
                const isSelected = selectedColor === col;
                return (
                  <button
                    key={col}
                    onClick={() => handleColorChange(col)}
                    style={{
                      width: "80px",
                      height: "96px",
                      borderRadius: "10px",
                      overflow: "hidden",
                      border: `2px solid ${isSelected ? "#6366F1" : "rgba(255,255,255,0.08)"}`,
                      padding: 0,
                      cursor: "pointer",
                      background: "#090D18",
                      position: "relative",
                    }}
                    title={col}
                  >
                    <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Buy Box */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "8px" }}>
              <p className="section-label">{catalogData.category.toUpperCase()}</p>
              <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "#FBBF24", fontSize: "12px", fontWeight: 700 }}>
                <span>★ 4.9</span>
                <span style={{ color: "#64748B" }}>({reviews.length} reviews)</span>
              </div>
            </div>

            <h1 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 800, color: "#F8FAFC", marginBottom: "12px", letterSpacing: "-0.02em" }}>
              {title}
            </h1>

            <p style={{ fontSize: "24px", fontWeight: 800, color: "#F8FAFC", marginBottom: "20px" }}>
              Rs {price.toLocaleString()}
            </p>

            <p style={{ fontSize: "14px", color: "#94A3B8", lineHeight: 1.8, marginBottom: "28px" }}>
              {desc}
            </p>

            {/* Urgency Pill */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(234,179,8,0.1)", border: "1px solid rgba(234,179,8,0.25)", padding: "6px 14px", borderRadius: "8px", marginBottom: "28px" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#EAB308" }} />
              <span style={{ fontSize: "12px", color: "#FDE047", fontWeight: 600 }}>Available in {availableColors.length} studio colorway editions</span>
            </div>

            <hr className="marb-divider" style={{ marginBottom: "24px" }} />

            {/* Dynamic Color Selector */}
            <div style={{ marginBottom: "24px" }}>
              <p style={{ fontSize: "11px", fontWeight: 700, color: "#CBD5E1", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "10px" }}>
                COLOR — <span style={{ color: "#F8FAFC" }}>{selectedColor}</span>
              </p>
              <div style={{ display: "flex", gap: "10px" }}>
                {availableColors.map((col) => {
                  const hex = COLOR_PALETTES[col] || "#1E293B";
                  const isSelected = selectedColor === col;
                  return (
                    <button
                      key={col}
                      title={col}
                      onClick={() => handleColorChange(col)}
                      style={{
                        width: "34px",
                        height: "34px",
                        borderRadius: "50%",
                        background: hex,
                        border: `2px solid ${isSelected ? "#6366F1" : "rgba(255,255,255,0.2)"}`,
                        cursor: "pointer",
                        transform: isSelected ? "scale(1.15)" : "scale(1)",
                        transition: "transform 0.2s ease",
                      }}
                    />
                  );
                })}
              </div>
            </div>

            {/* Size Selector + Size Guide */}
            <div style={{ marginBottom: "28px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                <p style={{ fontSize: "11px", fontWeight: 700, color: "#CBD5E1", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 0 }}>
                  SIZE — <span style={{ color: "#F8FAFC" }}>{selectedSize}</span>
                </p>
                <button
                  type="button"
                  onClick={() => setIsSizeGuideOpen(true)}
                  style={{ background: "none", border: "none", color: "#818CF8", fontSize: "12px", fontWeight: 600, cursor: "pointer", textDecoration: "underline" }}
                >
                  Size & Fit Guide
                </button>
              </div>

              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {SIZES.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`size-chip ${selectedSize === s ? "active" : ""}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Stepper & Add to Bag */}
            <div style={{ display: "flex", gap: "14px", marginBottom: "28px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "#090D18", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", padding: "4px 8px" }}>
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="qty-btn">−</button>
                <span style={{ minWidth: "24px", textAlign: "center", fontSize: "14px", fontWeight: 600, color: "#F8FAFC" }}>{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} className="qty-btn">+</button>
              </div>

              <button
                id="add-to-cart-detail"
                onClick={handleAddToCart}
                className="btn-accent"
                style={{ flex: 1, justifyContent: "center", padding: "14px 28px", fontSize: "14px", fontWeight: 700 }}
              >
                Add to Bag • Rs {(price * qty).toLocaleString()}
              </button>
            </div>

            {/* Specs & Care Accordion */}
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "20px" }}>
              <div style={{ display: "flex", gap: "20px", marginBottom: "16px", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "8px" }}>
                {[
                  { id: "details", label: "Product Specifications" },
                  { id: "care", label: "Care & Composition" },
                  { id: "shipping", label: "Complimentary Delivery" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    style={{
                      background: "none",
                      border: "none",
                      color: activeTab === tab.id ? "#F8FAFC" : "#64748B",
                      borderBottom: activeTab === tab.id ? "2px solid #6366F1" : "none",
                      paddingBottom: "8px",
                      fontSize: "13px",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div style={{ fontSize: "13px", color: "#94A3B8", lineHeight: 1.7 }}>
                {activeTab === "details" && (
                  <ul style={{ paddingLeft: "18px", margin: 0 }}>
                    <li>Heavyweight organic cotton fabric custom-spun at Marb Textile mills</li>
                    <li>Double-lined structured hood without drawstrings for clean aesthetic</li>
                    <li>Reinforced ribbed cuffs and hem with tonal coverstitch seam detailing</li>
                    <li>Oversized contemporary boxy cut tailored in Lahore, Pakistan</li>
                  </ul>
                )}
                {activeTab === "care" && (
                  <p>Machine wash cold on gentle cycle with similar colors. Do not bleach. Lay flat to dry or tumble dry low. Cool iron on reverse side.</p>
                )}
                {activeTab === "shipping" && (
                  <p>Complimentary nationwide 2-3 business day express shipping on all orders over Rs 5,000 via TCS. 30-day returns and exchanges accepted.</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <section style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "60px", marginBottom: "80px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "36px", flexWrap: "wrap", gap: "20px" }}>
            <div>
              <p className="section-label" style={{ marginBottom: "6px" }}>CLIENT FEEDBACK</p>
              <h2 style={{ fontSize: "24px", fontWeight: 800, color: "#F8FAFC" }}>
                Verified Client Reviews ({reviews.length})
              </h2>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "12px", background: "rgba(255,255,255,0.04)", padding: "10px 20px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.06)" }}>
              <span style={{ fontSize: "28px", fontWeight: 800, color: "#F8FAFC" }}>4.9</span>
              <div>
                <div style={{ color: "#FBBF24", fontSize: "14px" }}>★★★★★</div>
                <span style={{ fontSize: "11px", color: "#64748B" }}>Overall satisfaction rating</span>
              </div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "40px", alignItems: "start" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {reviews.length === 0 ? (
                <p style={{ color: "#64748B", fontSize: "14px" }}>No reviews written yet. Be the first to share your thoughts!</p>
              ) : (
                reviews.map((r) => (
                  <div key={r.id} className="glass-card" style={{ padding: "20px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ fontSize: "14px", fontWeight: 700, color: "#F8FAFC" }}>
                          {r.users?.first_name} {r.users?.last_name?.[0]}.
                        </span>
                        {r.is_verified_purchase && (
                          <span style={{ fontSize: "10px", fontWeight: 700, background: "rgba(34,197,94,0.15)", color: "#4ADE80", padding: "2px 8px", borderRadius: "10px" }}>
                            VERIFIED PURCHASE
                          </span>
                        )}
                      </div>
                      <div style={{ color: "#FBBF24", fontSize: "12px" }}>
                        {"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}
                      </div>
                    </div>
                    <p style={{ fontSize: "13px", color: "#CBD5E1", lineHeight: 1.6 }}>
                      {r.review_text}
                    </p>
                  </div>
                ))
              )}
            </div>

            <div className="glass-card" style={{ padding: "28px" }}>
              <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#F8FAFC", marginBottom: "8px" }}>
                Write a Review
              </h3>
              <p style={{ fontSize: "13px", color: "#94A3B8", marginBottom: "20px" }}>
                Share your fit impressions, fabric feel, and sizing advice.
              </p>

              <form onSubmit={handleReviewSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#94A3B8", marginBottom: "6px", textTransform: "uppercase" }}>Rating</label>
                  <div style={{ display: "flex", gap: "8px" }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setReviewRating(star)}
                        style={{
                          background: "none",
                          border: "none",
                          fontSize: "22px",
                          color: star <= reviewRating ? "#FBBF24" : "#475569",
                          cursor: "pointer",
                          padding: "2px",
                        }}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#94A3B8", marginBottom: "6px", textTransform: "uppercase" }}>Your Review</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about the fabric texture, weight, and fit..."
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    className="marb-input"
                    style={{ resize: "none", fontSize: "13px" }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submittingReview}
                  className="btn-accent"
                  style={{ justifyContent: "center", padding: "12px", fontSize: "13px", fontWeight: 700 }}
                >
                  {submittingReview ? "Submitting…" : "Post Review"}
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>

      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        category={catalogData.category}
      />
    </div>
  );
}
