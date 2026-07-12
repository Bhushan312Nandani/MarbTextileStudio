# 5-Day Project Sprint Plan: Apparel E-Commerce

This document outlines the detailed 5-day work plan for our 5-member team. The goal is to build a professional, fully functional Apparel E-Commerce website while ensuring strict version control, database integrity, and excellent collaboration.

## Git Branch Naming Convention
To maintain consistency during collaboration, all members must use the following branch naming format:
`feature/<member-role>-<task-description>`
*Example: `feature/admin-api-add-products` or `feature/frontend-home-page`*

---

## 📅 Day 1: Project Setup, Architecture & Database
**Goal**: Establish the foundation of the project, including local environments, database schema, and project skeleton.

* **Member 1 (Database Architect)**:
  * Install PostgreSQL and set up the `apparel_ecommerce_db`.
  * Define the Prisma schema (`backend/prisma/schema.prisma`) for Users, Products, Categories, Brands, Reviews, and Orders based on the ERD.
  * Run initial Prisma migrations and create seed data.
  * Share the `DATABASE_URL` format and `.env.example` with the team.
* **Member 2 (Public API Developer)**:
  * Set up Express.js project skeleton (routing, basic middleware).
  * Stub out Public API controllers and routes (`GET /products`, `GET /categories`).
* **Member 3 (Admin API Developer)**:
  * Set up Admin API controllers and routes skeletons (`POST /admin/products`, `POST /admin/categories`).
* **Member 4 (Security Specialist)**:
  * Implement standard security middleware (Helmet, CORS).
  * Design JWT Auth flow structure and install necessary packages (bcrypt, jsonwebtoken).
* **Member 5 (Team Lead / QA)**:
  * Create the initial Postman Collection workspace.
  * Document the agreed-upon API structures in `docs/` and establish QA reporting templates.

---

## 📅 Day 2: Core APIs & Frontend Initialization
**Goal**: Develop core functionalities (Auth, Products) and set up the Frontend React app.

* **Member 1 (Database Architect)**:
  * Review any schema change requests.
  * Optimize database queries and indexes if necessary.
* **Member 2 (Public API Developer)**:
  * Implement `GET /products` (with pagination/filtering) and `GET /products/:id`.
  * Write unit tests for the implemented endpoints.
* **Member 3 (Admin API Developer)**:
  * Initialize the Frontend React (Vite) application (`npx create-vite@latest frontend --template react-ts`).
  * Set up Tailwind CSS, routing (React Router), and global state management (Zustand/Redux).
* **Member 4 (Security Specialist)**:
  * Implement User Registration and Login endpoints.
  * Implement Password Hashing (bcrypt) and JWT token generation.
* **Member 5 (Team Lead / QA)**:
  * Test Public APIs and Auth APIs using Postman.
  * Report bugs to Member 2 and Member 4.

---

## 📅 Day 3: Advanced APIs & Frontend Integration
**Goal**: Finish all API development and begin connecting the frontend to the backend.

* **Member 1 (Database Architect)**:
  * Provide support for complex Prisma queries (e.g., aggregating reviews or calculating order totals).
* **Member 2 (Public API Developer)**:
  * Implement `GET /products/search`, `GET /brands`, and `GET /reviews`.
* **Member 3 (Admin API Developer)**:
  * Implement Admin APIs: Product CRUD, Category Management, and Order Management.
* **Member 4 (Security Specialist)**:
  * Implement Role-Based Access Control (RBAC) middleware to protect Admin APIs.
  * Implement Refresh Tokens and Rate Limiting.
* **Member 5 (Team Lead / QA)**:
  * Design the Frontend UI Shell (Navbar, Footer, Layout).
  * Build the Home Page UI with dynamic product fetching.

---

## 📅 Day 4: E-Commerce Features & Security Auditing
**Goal**: Complete the user flow (Cart, Checkout) and audit security.

* **Member 1 (Database Architect)**:
  * Finalize database backup scripts (`backup.sql`) and ensure data persistence in Docker.
* **Member 2 (Public API Developer)**:
  * Assist Frontend integration of Public APIs (Product Listing, Searching).
* **Member 3 (Admin API Developer)**:
  * Build Frontend Admin Dashboard UI (to manage products and view orders).
* **Member 4 (Security Specialist)**:
  * Perform a security audit on all endpoints.
  * Ensure no sensitive data (like passwords) is returned in API responses.
* **Member 5 (Team Lead / QA)**:
  * Build Cart and Checkout UI flows.
  * Conduct End-to-End (E2E) testing of the purchasing process.

---

## 📅 Day 5: Final Polish, QA, & Deployment Preparation
**Goal**: Ensure everything is bug-free, looks professional, and is ready for submission.

* **Member 1 (Database Architect)**:
  * Clean up seed data to ensure it looks professional for the final presentation.
* **Member 2 (Public API Developer)**:
  * Fix any bugs reported in Public APIs.
  * Finalize API documentation in Postman.
* **Member 3 (Admin API Developer)**:
  * Polish the Admin Dashboard UI (add charts, improve styling).
* **Member 4 (Security Specialist)**:
  * Verify CI/CD pipeline checks are passing on all recent PRs.
* **Member 5 (Team Lead / QA)**:
  * Perform a full system walkthrough.
  * Ensure the design is highly premium and aesthetic.
  * Generate final reports and coordinate the final merge into the `main` branch.
