import { Link } from "react-router-dom";
import { useCartStore } from "../../store/useCartStore";
import { useWishlistStore } from "../../store/useWishlistStore";
import { useToastStore } from "../../store/useToastStore";

export interface ProductCardData {
  id: string;
  title: string;
  price: number;
  image: string;
  badge?: "New" | "Sale" | "Limited";
  category?: string;
  colors?: string[];
}

interface Props {
  product: ProductCardData;
}

export default function ProductCard({ product }: Props) {
  const selectedSize = "M";
  const addLine = useCartStore((s) => s.addLine);
  const { isInWishlist, toggleItem } = useWishlistStore();
  const showToast = useToastStore((s) => s.showToast);

  const isLiked = isInWishlist(product.id);

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    addLine({
      variantId: `${product.id}-${selectedSize}`,
      productTitle: product.title,
      size: selectedSize,
      color: product.colors?.[0] ?? "Midnight Black",
      unitPrice: product.price,
      quantity: 1,
    });
    showToast("Added to Bag", `${product.title} (Size ${selectedSize}) has been added.`, "success");
  }

  function handleWishlist(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const added = toggleItem({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      category: product.category,
    });
    if (added) {
      showToast("Saved to Wishlist", `${product.title} added to your saved pieces.`, "success");
    } else {
      showToast("Removed from Wishlist", `${product.title} removed from saved pieces.`, "info");
    }
  }

  return (
    <Link to={`/products/${product.id}`} style={{ textDecoration: "none" }}>
      <div className="product-card">
        {/* Image Container */}
        <div style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden", background: "#0f1826" }}>
          <img
            src={product.image}
            alt={product.title}
            className="product-card-img"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />

          {/* Luxury Badge */}
          {product.badge && (
            <div style={{ position: "absolute", top: "12px", left: "12px" }}>
              <span
                style={{
                  background: product.badge === "Limited" ? "linear-gradient(135deg, #6366F1, #8B5CF6)" : product.badge === "Sale" ? "#EF4444" : "#1E293B",
                  color: "#fff",
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  padding: "4px 10px",
                  borderRadius: "20px",
                  border: "1px solid rgba(255,255,255,0.15)",
                }}
              >
                {product.badge === "Limited" ? "LIMITED DROP" : product.badge.toUpperCase()}
              </span>
            </div>
          )}

          {/* Wishlist Button */}
          <button
            id={`wishlist-btn-${product.id}`}
            onClick={handleWishlist}
            className={`wishlist-btn ${isLiked ? "liked" : ""}`}
            style={{
              position: "absolute",
              top: "12px",
              right: "12px",
              background: isLiked ? "rgba(99,102,241,0.25)" : "rgba(11,15,25,0.75)",
              color: isLiked ? "#818CF8" : "#94A3B8",
              borderColor: isLiked ? "#6366F1" : "rgba(255,255,255,0.15)",
            }}
            aria-label={isLiked ? "Remove from wishlist" : "Add to wishlist"}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>
        </div>

        {/* Info */}
        <div style={{ padding: "16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "4px" }}>
            <p style={{ fontSize: "11px", color: "#6366F1", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              {product.category || "Studio"}
            </p>
            <span style={{ fontSize: "11px", color: "#64748B" }}>450 GSM Organic</span>
          </div>

          <p style={{ fontSize: "15px", fontWeight: 600, color: "#F8FAFC", marginBottom: "6px" }}>
            {product.title}
          </p>

          <p style={{ fontSize: "16px", fontWeight: 700, color: "#F8FAFC", marginBottom: "14px" }}>
            Rs {product.price.toLocaleString()}
          </p>

          {/* Quick Add to Bag */}
          <button
            id={`add-to-cart-${product.id}`}
            onClick={handleAddToCart}
            className="btn-accent"
            style={{ width: "100%", justifyContent: "center", padding: "10px", fontSize: "13px", fontWeight: 600 }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/>
            </svg>
            Add to Bag
          </button>
        </div>
      </div>
    </Link>
  );
}
