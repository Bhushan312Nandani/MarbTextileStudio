import { useToastStore } from "../../store/useToastStore";

export default function ToastContainer() {
  const { toasts, removeToast } = useToastStore();

  if (toasts.length === 0) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        maxWidth: "380px",
        width: "100%",
        pointerEvents: "none",
      }}
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="anim-slide-right"
          style={{
            pointerEvents: "auto",
            background: "rgba(15, 23, 42, 0.95)",
            backdropFilter: "blur(16px)",
            border: `1px solid ${
              toast.type === "error"
                ? "rgba(239, 68, 68, 0.4)"
                : toast.type === "info"
                ? "rgba(99, 102, 241, 0.4)"
                : "rgba(34, 197, 94, 0.4)"
            }`,
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.6)",
            borderRadius: "12px",
            padding: "14px 18px",
            display: "flex",
            alignItems: "flex-start",
            gap: "12px",
          }}
        >
          <div
            style={{
              width: "22px",
              height: "22px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              marginTop: "2px",
              background:
                toast.type === "error"
                  ? "rgba(239, 68, 68, 0.2)"
                  : toast.type === "info"
                  ? "rgba(99, 102, 241, 0.2)"
                  : "rgba(34, 197, 94, 0.2)",
              color:
                toast.type === "error"
                  ? "#EF4444"
                  : toast.type === "info"
                  ? "#6366F1"
                  : "#22C55E",
            }}
          >
            {toast.type === "error" ? "✕" : toast.type === "info" ? "ℹ" : "✓"}
          </div>

          <div style={{ flex: 1 }}>
            <p style={{ fontSize: "14px", fontWeight: 600, color: "#F8FAFC", marginBottom: toast.message ? "2px" : "0" }}>
              {toast.title}
            </p>
            {toast.message && (
              <p style={{ fontSize: "12px", color: "#94A3B8", lineHeight: 1.4 }}>
                {toast.message}
              </p>
            )}
          </div>

          <button
            onClick={() => removeToast(toast.id)}
            style={{
              background: "transparent",
              border: "none",
              color: "#64748B",
              cursor: "pointer",
              padding: "2px",
              fontSize: "14px",
              lineHeight: 1,
            }}
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
