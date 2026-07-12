# Apparel E-Commerce Team Workflow

## Project Architecture

### Shared Database

Member 1 will host the PostgreSQL database.

All team members must connect to the same database.

No member should create local schema changes directly.

Schema updates must be approved by Member 1.

---

## Technology Stack

Backend:

* Node.js
* Express.js
* TypeScript
* Prisma ORM
* PostgreSQL

Frontend:

* React
* TypeScript
* Vite
* Tailwind CSS

Testing:

* Postman
* Thunder Client

Version Control:

* GitHub

---

## Member 1 – Database Architect

Responsibilities:

* Maintain PostgreSQL database.
* Maintain Prisma schema.
* Create migrations.
* Create seed data.
* Share DATABASE_URL with team.
* Document all tables and relationships.

Files Owned:

backend/prisma/schema.prisma

backend/prisma/migrations/

Database Documentation

No other member should directly modify schema.prisma without approval.

---

## Member 2 – Public API Developer

Responsibilities:

* Product APIs
* Category APIs
* Brand APIs
* Search APIs
* Reviews APIs

Folder Ownership:

src/routes/public/

src/controllers/public/

src/services/public/

Required APIs:

GET /products

GET /products/:id

GET /products/search

GET /categories

GET /brands

GET /reviews

---

## Member 3 – Admin API Developer

Responsibilities:

* Product Management
* Category Management
* Coupon Management
* Order Management

Folder Ownership:

src/routes/admin/

src/controllers/admin/

src/services/admin/

Required APIs:

POST /admin/products

PUT /admin/products/:id

DELETE /admin/products/:id

POST /admin/categories

PUT /admin/categories/:id

DELETE /admin/categories/:id

---

## Member 4 – Security Specialist

Responsibilities:

* JWT Authentication
* Refresh Tokens
* Role Authorization
* Password Hashing
* Security Middleware

Folder Ownership:

src/middleware/

src/auth/

src/utils/security/

Required Features:

JWT Login

JWT Refresh Token

Role Guards

Rate Limiting

Helmet

CORS Configuration

Password Hashing

---

## Member 5 – Team Lead / QA

Responsibilities:

* Postman Collection
* API Documentation
* Testing
* Bug Tracking
* Sprint Management

Files Owned:

docs/

postman/

QA Reports

Testing Reports

---

## Git Workflow

Main Branch:
main

Development Branch:
develop

Feature Branches:

feature/public-api

feature/admin-api

feature/security

feature/frontend

Rules:

1. Never push directly to main.
2. Create pull request to develop.
3. QA must verify before merge.
4. Member 1 must approve database changes.

---

## Database Usage Rules

All members must use the same DATABASE_URL.

Example:

DATABASE_URL=postgresql://username:password@host:5432/apparel_ecommerce

Never hardcode credentials.

Store credentials only in .env.

Do not commit .env to GitHub.

Use .env.example instead.

---

## API Testing

Every API must have:

* Success Test
* Validation Test
* Unauthorized Test
* Error Test

Testing Tools:

* Postman
* Thunder Client

---

## Daily Standup

Each member must report:

* Completed Tasks
* Current Task
* Blockers

Duration: 10 minutes daily.
