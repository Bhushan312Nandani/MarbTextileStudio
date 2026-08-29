# 🖥️ Marb Studio — Complete Local Development Guide

Welcome to the **Marb Studio** local developer setup and execution guide. This document provides step-by-step instructions to run, develop, test, and debug the entire full-stack platform on your local machine.

---

## 📋 System Requirements & Prerequisites

Before starting, verify you have the following installed on your machine:
- **Node.js**: `v18.x`, `v20.x`, or `v22.x` (LTS recommended)
- **npm**: `v9.x` or newer
- **Docker Desktop**: *(Optional but recommended for running PostgreSQL locally without manual configuration)*
- **Git**: Latest version

---

## 🗂️ Project Architecture & Folder Structure

```text
MarbTextileStudio/
├── apparel-ecommerce/
│   ├── backend/               # Node.js + Express + Prisma REST API
│   │   ├── prisma/            # Prisma Schema & Database Seeder (seed.js)
│   │   ├── src/               # Controllers, Services, Middlewares, Routes
│   │   └── package.json
│   ├── frontend/              # React 19 + Vite + TypeScript + Tailwind CSS
│   │   ├── src/               # Pages, Components, State Store (Zustand)
│   │   └── package.json
│   ├── scripts/               # Developer automation & AES-256 Vault CLI
│   ├── testing/               # Postman Collections & API Test Cases
│   ├── docker-compose.yml     # Local PostgreSQL database container
│   ├── render.yaml            # Render Cloud Blueprint definition
│   └── secrets.vault.enc      # AES-256-GCM Encrypted credentials vault
└── local-guide.md             # This guide
```

---

## 🚀 Quick Start (5 Minutes)

### Step 1: Start the Local PostgreSQL Database
If using Docker, start the isolated PostgreSQL database with:
```powershell
cd apparel-ecommerce
docker-compose up -d
```
> This starts PostgreSQL on `localhost:5432` with database `apparel_ecommerce_db`, username `postgres`, and password `password`.

---

### Step 2: Configure & Run the Backend API

1. **Navigate to backend folder**:
   ```powershell
   cd apparel-ecommerce/backend
   npm install
   ```

2. **Setup Local Environment Variables (`.env`)**:
   Create a file named `.env` inside `backend/` with:
   ```env
   PORT=5000
   NODE_ENV=development
   DATABASE_URL="postgresql://postgres:password@localhost:5432/apparel_ecommerce_db?schema=public"
   JWT_SECRET="marb_super_secret_jwt_key_local_dev_2026"
   JWT_REFRESH_SECRET="marb_super_secret_refresh_jwt_key_2026"
   JWT_EXPIRE="15m"
   REFRESH_TOKEN_EXPIRE="7d"
   CORS_ORIGIN="http://localhost:5173,http://localhost:3000"
   ```

3. **Initialize Database Schema & Generate Prisma Client**:
   ```powershell
   npx prisma generate
   npx prisma db push
   ```

4. **Seed Initial Store Data & Test Accounts**:
   ```powershell
   npm run seed
   ```
   *(Creates categories, products, inventory variants, reviews, and pre-configured Admin + Customer accounts).*

5. **Start the Backend Server**:
   ```powershell
   npm run dev
   ```
   > 🚀 Backend starts on **`http://localhost:5000`** with real-time logs and auto-reload.

---

### Step 3: Configure & Run the Frontend (React / Vite)

Open a **separate terminal window**:

1. **Navigate to frontend folder**:
   ```powershell
   cd apparel-ecommerce/frontend
   npm install
   ```

2. **Setup Frontend Environment Variables (`.env`)**:
   Create a file named `.env` inside `frontend/`:
   ```env
   VITE_API_BASE_URL="http://localhost:5000/api/v1"
   ```

3. **Start Frontend Dev Server**:
   ```powershell
   npm run dev
   ```
   > 🌐 Frontend opens on **`http://localhost:5173`**.

---

## 🔑 Default Local Accounts & Credentials

| Role | Email | Password | Access / Permissions |
| :--- | :--- | :--- | :--- |
| **👑 Administrator** | `admin@marbtextile.test` | `Admin@123` | Full access to `/admin` dashboard, product/category management, revenue stats, order status updates. |
| **👤 Customer Account** | `customer@marbtextile.test` | `Customer@123` | Browsing, Add to Cart, Saved Wishlist, Checkout, Order Tracking. |

---

## 🛠️ Useful Developer Commands

### Database & Prisma
```powershell
# View and edit database tables in an interactive visual UI:
npx prisma studio

# Re-push schema after modifying schema.prisma:
npx prisma db push

# Re-run initial seed data:
npm run seed
```

### Production Build Verification
```powershell
# Frontend production build test:
cd frontend
npm run build

# Backend production run:
cd backend
npm start
```

---

## ❓ Troubleshooting FAQ

1. **Database connection failed (`P1001: Can't reach database server`)?**
   - Check if Docker container is running: `docker ps`.
   - Start container: `docker-compose up -d`.
   - Verify `DATABASE_URL` in `backend/.env`.

2. **CORS error in browser console?**
   - Verify `backend/.env` has `CORS_ORIGIN="http://localhost:5173"` or includes your dev port.

3. **Port 5000 or 5173 already in use?**
   - Backend: Change `PORT=5001` in `backend/.env` and update frontend `.env` to `http://localhost:5001/api/v1`.
