import { useState } from "react";

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  category?: string;
}

export default function SizeGuideModal({ isOpen, onClose, category = "Hoodies" }: SizeGuideModalProps) {
  const [unit, setUnit] = useState<"in" | "cm">("in");

  if (!isOpen) return null;

  const measurements = unit === "in" ? [
    { size: "XS", chest: "36 - 38", length: "26.5", sleeve: "33.0" },
    { size: "S",  chest: "38 - 40", length: "27.5", sleeve: "34.0" },
    { size: "M",  chest: "40 - 42", length: "28.5", sleeve: "35.0" },
    { size: "L",  chest: "42 - 44", length: "29.5", sleeve: "36.0" },
    { size: "XL", chest: "44 - 46", length: "30.5", sleeve: "37.0" },
    { size: "XXL",chest: "46 - 48", length: "31.5", sleeve: "38.0" },
  ] : [
    { size: "XS", chest: "91 - 96",   length: "67.3", sleeve: "83.8" },
    { size: "S",  chest: "96 - 101",  length: "69.8", sleeve: "86.3" },
    { size: "M",  chest: "101 - 106", length: "72.4", sleeve: "88.9" },
    { size: "L",  chest: "106 - 112", length: "74.9", sleeve: "91.4" },
    { size: "XL", chest: "112 - 117", length: "77.5", sleeve: "93.9" },
    { size: "XXL",chest: "117 - 122", length: "80.0", sleeve: "96.5" },
  ];

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
      <div
        onClick={onClose}
        style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(6px)" }}
      />

      <div
        className="glass-card anim-scale-in"
        style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          maxWidth: "560px",
          backgroundColor: "#0F172A",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          padding: "32px",
          borderRadius: "16px",
          boxShadow: "0 25px 60px rgba(0, 0, 0, 0.8)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <div>
            <p className="section-label" style={{ marginBottom: "4px" }}>STUDIO SIZING</p>
            <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#F8FAFC" }}>
              {category} Fit Guide
            </h2>
          </div>

          <button onClick={onClose} className="btn-ghost" style={{ padding: "6px" }}>
            ✕
          </button>
        </div>

        {/* Unit Toggle */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <p style={{ fontSize: "13px", color: "#94A3B8" }}>
            Garment dimensions (Relaxed Contemporary Boxy Cut)
          </p>
          <div style={{ display: "flex", background: "rgba(255,255,255,0.06)", borderRadius: "8px", padding: "3px" }}>
            <button
              onClick={() => setUnit("in")}
              style={{
                background: unit === "in" ? "#6366F1" : "transparent",
                color: unit === "in" ? "#fff" : "#94A3B8",
                border: "none",
                borderRadius: "6px",
                padding: "4px 12px",
                fontSize: "12px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Inches
            </button>
            <button
              onClick={() => setUnit("cm")}
              style={{
                background: unit === "cm" ? "#6366F1" : "transparent",
                color: unit === "cm" ? "#fff" : "#94A3B8",
                border: "none",
                borderRadius: "6px",
                padding: "4px 12px",
                fontSize: "12px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              CM
            </button>
          </div>
        </div>

        {/* Table */}
        <div style={{ overflowX: "auto", marginBottom: "24px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "13px" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", color: "#64748B" }}>
                <th style={{ padding: "10px" }}>SIZE</th>
                <th style={{ padding: "10px" }}>CHEST ({unit.toUpperCase()})</th>
                <th style={{ padding: "10px" }}>BODY LENGTH</th>
                <th style={{ padding: "10px" }}>SLEEVE</th>
              </tr>
            </thead>
            <tbody>
              {measurements.map((m) => (
                <tr key={m.size} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <td style={{ padding: "12px 10px", fontWeight: 700, color: "#6366F1" }}>{m.size}</td>
                  <td style={{ padding: "12px 10px", color: "#F8FAFC" }}>{m.chest}</td>
                  <td style={{ padding: "12px 10px", color: "#CBD5E1" }}>{m.length}</td>
                  <td style={{ padding: "12px 10px", color: "#CBD5E1" }}>{m.sleeve}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ background: "rgba(255,255,255,0.03)", padding: "14px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.06)" }}>
          <p style={{ fontSize: "12px", color: "#94A3B8", lineHeight: 1.5 }}>
            💡 <strong>Model specs:</strong> Male model is 6'1" (185cm), 75kg wearing Size Large for an oversized studio look. For a classic tailored fit, we recommend taking one size down.
          </p>
        </div>
      </div>
    </div>
  );
}
