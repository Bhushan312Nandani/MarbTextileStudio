require("dotenv").config();
const express = require("express");
const cors    = require("cors");
const helmet  = require("helmet");
const morgan  = require("morgan");
const rateLimit = require("express-rate-limit");

const app = express();

// Disable x-powered-by to prevent tech stack fingerprinting
app.disable("x-powered-by");

// Trust proxy for accurate client IP identification in rate-limiting (AWS / Vercel / Nginx)
app.set("trust proxy", 1);

// ── Security headers ────────────────────────────────────────────────────────
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  contentSecurityPolicy: false, // handled separately per env if needed
  hidePoweredBy: true,
}));

// ── CORS ────────────────────────────────────────────────────────────────────
const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:5173,http://localhost:3000")
  .split(",")
  .map((o) => o.trim());

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, Postman, server-to-server)
    if (!origin) return callback(null, true);
    // If CORS_ORIGIN is wildcard '*' or explicitly listed
    if (allowedOrigins.includes("*") || allowedOrigins.includes(origin)) return callback(null, true);
    // Allow all vercel deployment URLs (*.vercel.app)
    if (origin.endsWith(".vercel.app") || origin.includes("vercel.app")) return callback(null, true);
    // Allow localhost during development
    if (origin.startsWith("http://localhost:") || origin.startsWith("http://127.0.0.1:")) return callback(null, true);
    
    callback(new Error(`CORS: origin ${origin} not allowed`));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// ── Body parsers ─────────────────────────────────────────────────────────────
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// ── Logger ───────────────────────────────────────────────────────────────────
if (process.env.NODE_ENV !== "test") {
  app.use(morgan("dev"));
}

// ── Global rate limiter — 300 req / 15 min per IP ────────────────────────────
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 300,
    standardHeaders: true,
    legacyHeaders: false,
    message: { message: "Too many requests, please try again later." },
  })
);

// ── Auth-specific stricter limiter — 10 req / 15 min ────────────────────────
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { message: "Too many auth attempts, please try again in 15 minutes." },
});
app.use("/api/v1/public/auth/login",    authLimiter);
app.use("/api/v1/public/auth/register", authLimiter);

// ── Health check ─────────────────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Marb Studio API running", version: "1.0.0" });
});

// ── Mount main router ─────────────────────────────────────────────────────────
const mainRouter = require("./routes/index");
app.use("/api/v1", mainRouter);

// ── 404 handler ───────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.method} ${req.originalUrl} not found` });
});

// ── Central error handler — MUST be last ──────────────────────────────────────
const errorHandler = require("./middleware/error.middleware");
app.use(errorHandler);

module.exports = app;