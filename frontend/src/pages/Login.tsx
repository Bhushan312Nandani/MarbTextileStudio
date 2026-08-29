import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/auth";
import { useAuthStore } from "../store/useAuthStore";
import { useToastStore } from "../store/useToastStore";

export default function Login() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);
  const showToast = useToastStore((s) => s.showToast);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await login({ email, password });
      if (res && res.accessToken && res.user) {
        setAuth(res.accessToken, res.refreshToken, res.user);
        showToast("Welcome Back", `Signed in as ${res.user.first_name} ${res.user.last_name}`, "success");
        if (res.user.role === "ADMIN") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }
    } catch (err: any) {
      const msg =
        err.response?.data?.message ||
        "Invalid email or password. Please verify your credentials.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        backgroundColor: "#0B0F19",
        minHeight: "88vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }}
      />

      <div className="glass-card anim-scale-in" style={{ width: "100%", maxWidth: "420px", padding: "48px 40px" }}>
        {/* Brand Header */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <span style={{ fontWeight: 800, fontSize: "26px", letterSpacing: "-0.03em", color: "#F8FAFC" }}>marb</span>
            <span style={{ color: "#6366F1", fontSize: "26px", fontWeight: 800 }}>·</span>
          </Link>
          <h1 style={{ fontSize: "20px", fontWeight: 700, color: "#F8FAFC", marginTop: "16px", marginBottom: "6px" }}>
            Member Access
          </h1>
          <p style={{ fontSize: "14px", color: "#64748B" }}>Sign in to access your orders and saved studio pieces</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div>
            <label htmlFor="login-email" style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#CBD5E1", marginBottom: "8px", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Email Address
            </label>
            <input
              id="login-email"
              type="email"
              placeholder="name@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="marb-input"
            />
          </div>

          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <label htmlFor="login-password" style={{ fontSize: "11px", fontWeight: 700, color: "#CBD5E1", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                Password
              </label>
              <a href="#" style={{ fontSize: "11px", color: "#818CF8", textDecoration: "none" }}>Forgot?</a>
            </div>
            <div style={{ position: "relative" }}>
              <input
                id="login-password"
                type={showPwd ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="marb-input"
                style={{ paddingRight: "44px" }}
              />
              <button
                type="button"
                onClick={() => setShowPwd((s) => !s)}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#64748B",
                  padding: "4px",
                  display: "flex",
                  alignItems: "center",
                }}
                aria-label={showPwd ? "Hide password" : "Show password"}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {showPwd ? (
                    <>
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </>
                  ) : (
                    <>
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </>
                  )}
                </svg>
              </button>
            </div>
          </div>

          {error && (
            <div
              style={{
                background: "rgba(239,68,68,0.1)",
                border: "1px solid rgba(239,68,68,0.3)",
                borderRadius: "8px",
                padding: "10px 14px",
                fontSize: "13px",
                color: "#FCA5A5",
              }}
            >
              {error}
            </div>
          )}

          <button
            id="login-submit"
            type="submit"
            disabled={loading}
            className="btn-accent"
            style={{ justifyContent: "center", padding: "14px", fontSize: "14px", fontWeight: 700, marginTop: "6px", opacity: loading ? 0.7 : 1 }}
          >
            {loading ? "Signing in…" : "Sign In →"}
          </button>
        </form>

        <hr className="marb-divider" style={{ margin: "28px 0" }} />

        <p style={{ textAlign: "center", fontSize: "13px", color: "#64748B" }}>
          New to Marb Studio?{" "}
          <Link to="/register" style={{ color: "#6366F1", textDecoration: "none", fontWeight: 600 }}>
            Create an Account →
          </Link>
        </p>
      </div>
    </div>
  );
}
