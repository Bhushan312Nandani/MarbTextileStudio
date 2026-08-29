# 📖 Marb Studio — Full-Stack Platform User & Security Guide

---

## 🌟 Executive Overview

**Marb Studio** is a modern, high-performance, full-stack luxury apparel e-commerce platform built with an editorial aesthetic and enterprise-grade architecture.

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS, Zustand state management, glassmorphism design system.
- **Backend**: Node.js, Express 5, Prisma ORM, PostgreSQL, bcrypt password hashing, dual JWT authentication (Access + Refresh token rotation).
- **Hosting / Deployments**: Frontend live on **Vercel**, Backend live on **Render**, Cloud Database on **Neon PostgreSQL**.

---

## 👑 1. Admin Portal & Management Operations

### Accessing the Admin Dashboard
- **URL**: `http://localhost:5173/admin` (or `https://frontend-one-theta-52.vercel.app/admin`)
- **Default Admin Login**:
  - **Email**: `admin@marbtextile.test`
  - **Password**: `Admin@123`
  - **Role**: `ADMIN`

### Admin Capabilities:
1. **Analytics & Performance**: Real-time gross revenue, order volume, catalog inventory levels, and average order value.
2. **Product Catalog Management**: Create, view, update, and manage apparel items, size/color variants, pricing, stock levels, and primary lookbook imagery.
3. **Category Architecture**: Manage collections (Hoodies, Tees, Jackets, Bottoms, Accessories, Bundles).
4. **Order Fulfillment**: Track all customer orders, transition statuses (`PENDING` ➔ `CONFIRMED` ➔ `PROCESSING` ➔ `SHIPPED` ➔ `DELIVERED`), and review shipping addresses.
5. **Customer Management**: View registered user accounts and order histories.

---

## 🛍️ 2. Customer Experience & Storefront Features

- **Default Test Customer**:
  - **Email**: `customer@marbtextile.test`
  - **Password**: `Customer@123`
- **Dynamic Catalogue & Filtering**: Multi-attribute filtering (Category, Size XS–XL, Price Range slider, Sort by Price/Featured).
- **Interactive Product Details**: Size guide modal with measurement matrix, dynamic stock badge indicators, lookbook image galleries, and real customer reviews.
- **Persistent Slide-Over Cart Drawer**: Real-time line item quantity increment/decrement and price calculation.
- **Promo Coupon Engine**: Embedded support for promotional codes (e.g. `MARB10` for 10% instant discount).
- **Customer Wishlist & Saved Pieces**: Bookmark favorite apparel pieces across sessions.
- **Checkout & Order Tracking**: Multi-step checkout with address validation and live status tracker (`/orders`).

---

## 🔐 3. Secret Management & Security Strategy

### The Zero-Leakage Policy
To ensure enterprise security, **NO plain-text secrets, production database credentials, or private API keys are ever committed to GitHub**.

1. **Git Protection (`.gitignore`)**:
   - All `.env`, `.env.*` (local, staging, production) are strictly ignored by Git.
   - Only sanitized template `.env.example` files containing dummy placeholders are kept in source control.

2. **Password Security**:
   - Customer and Admin passwords are never stored in plain text.
   - Passwords are salted and hashed using **bcrypt (10 rounds)** before being written to PostgreSQL.

3. **JWT Authentication & Token Rotation**:
   - **Access Token**: Short-lived (15 minutes), signed with `JWT_SECRET`.
   - **Refresh Token**: Long-lived (7 days), signed with `JWT_REFRESH_SECRET`, stored securely and rotated automatically upon expiration.

---

## 🔒 4. Encrypted Secret Vault (AES-256-GCM)

We have built a dedicated **Encrypted Secret Vault Tool** located at `scripts/vault.js`.

This allows you to safely backup, share, or store all your production environment secrets on GitHub in an **indecipherable military-grade encrypted file (`secrets.vault.enc`)**.

### How to Lock / Encrypt Your Secrets:
Run the vault encryption command:
```powershell
node scripts/vault.js encrypt
```
- You will be prompted to enter your **Master Passphrase**.
- It encrypts your `backend/.env` and `frontend/.env` using **AES-256-GCM** with **PBKDF2 (100,000 SHA-512 rounds)**.
- The output file `secrets.vault.enc` is created.
- **You can safely push `secrets.vault.enc` to GitHub**. Nobody on GitHub can open, read, or crack this file without your Master Passphrase.

### How to Unlock / Decrypt Your Secrets:
Whenever you clone the repository on a new machine or need to restore your environment variables:
```powershell
node scripts/vault.js decrypt
```
- Enter your **Master Passphrase**.
- The script automatically verifies cryptographic integrity and restores `backend/.env` and `frontend/.env` instantly!

---

## 🌐 5. Deployment Architecture

| Tier | Provider | Configuration / URL |
| :--- | :--- | :--- |
| **Frontend** | **Vercel** | [https://frontend-one-theta-52.vercel.app](https://frontend-one-theta-52.vercel.app) |
| **Backend API** | **Render** | Node.js Web Service (`render.yaml` Blueprint) |
| **Database** | **Neon / Cloud Postgres** | Cloud PostgreSQL Serverless Database |

---

## 🧪 6. API Testing Suite

- **Postman API Collection**: [testing/postman/Marb_Studio_API.json](file:///a:/Marb-Developer/apparel-ecommerce/testing/postman/Marb_Studio_API.json)
- **Automated Test Scenarios**: [testing/test-cases/API_Test_Cases.md](file:///a:/Marb-Developer/apparel-ecommerce/testing/test-cases/API_Test_Cases.md)
