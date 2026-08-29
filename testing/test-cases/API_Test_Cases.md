# Marb Studio — Backend API & Integration Test Cases

## Summary
Comprehensive test matrix covering Authentication, Catalog, Cart, Checkout, Reviews, Security, and Admin Management.

---

### 1. Authentication & Security (Member 4)
| Test ID | Endpoint | Method | Expected Status | Description |
|---|---|---|---|---|
| **AUTH-01** | `/public/auth/register` | `POST` | `201 Created` | Successful customer registration with hashed password. |
| **AUTH-02** | `/public/auth/register` | `POST` | `409 Conflict` | Rejects duplicate email registration. |
| **AUTH-03** | `/public/auth/login` | `POST` | `200 OK` | Valid customer credentials return `accessToken` & `refreshToken`. |
| **AUTH-04** | `/public/auth/login` | `POST` | `401 Unauthorized` | Invalid password rejected. |
| **AUTH-05** | `/public/auth/refresh` | `POST` | `200 OK` | Valid refresh token rotates and returns fresh JWT. |
| **AUTH-06** | `/public/auth/me` | `GET` | `401 Unauthorized` | Rejects unauthenticated request without Bearer token. |
| **AUTH-07** | `/public/auth/me` | `GET` | `200 OK` | Returns authenticated user profile and addresses. |

---

### 2. Public Catalog (Member 2)
| Test ID | Endpoint | Method | Expected Status | Description |
|---|---|---|---|---|
| **PROD-01** | `/public/products` | `GET` | `200 OK` | Returns paginated list of active products with images & variants. |
| **PROD-02** | `/public/products?category=Hoodies` | `GET` | `200 OK` | Filters products by category name. |
| **PROD-03** | `/public/products/search?q=Hood` | `GET` | `200 OK` | Full-text query matches product title and description. |
| **PROD-04** | `/public/products/:id` | `GET` | `200 OK` | Returns complete product detail, variants, and reviews. |
| **CAT-01** | `/public/categories` | `GET` | `200 OK` | Returns list of categories with active product counts. |

---

### 3. Cart & Checkout (Member 3)
| Test ID | Endpoint | Method | Expected Status | Description |
|---|---|---|---|---|
| **CART-01** | `/public/cart` | `GET` | `200 OK` | Fetches authenticated user's cart with line total and subtotal. |
| **CART-02** | `/public/cart/items` | `POST` | `200 OK` | Adds item variant with quantity check against stock. |
| **CART-03** | `/public/cart/items/:variantId` | `PUT` | `200 OK` | Updates line quantity with stock validation. |
| **CART-04** | `/public/cart/items/:variantId` | `DELETE` | `200 OK` | Removes variant from user cart. |
| **ORD-01** | `/public/orders` | `POST` | `201 Created` | Creates order from cart, decrements variant inventory, creates payment & shipment records. |
| **ORD-02** | `/public/orders` | `GET` | `200 OK` | Returns past order history for logged-in user. |

---

### 4. Admin Management & RBAC (Member 1 & 3)
| Test ID | Endpoint | Method | Expected Status | Description |
|---|---|---|---|---|
| **ADM-01** | `/admin/stats` | `GET` | `403 Forbidden` | Rejects access when requested by CUSTOMER role. |
| **ADM-02** | `/admin/stats` | `GET` | `200 OK` | Returns revenue, order counts, product metrics for ADMIN. |
| **ADM-03** | `/admin/products` | `GET` | `200 OK` | Lists all products with full variants and stock quantities. |
| **ADM-04** | `/admin/orders/:id/status` | `PUT` | `200 OK` | Updates order status and syncs courier tracking info. |
| **ADM-05** | `/admin/categories` | `POST` | `201 Created` | Admin creates a new apparel category. |

---

### 5. Verified Reviews
| Test ID | Endpoint | Method | Expected Status | Description |
|---|---|---|---|---|
| **REV-01** | `/public/reviews/:productId` | `GET` | `200 OK` | Publicly views all customer reviews and ratings. |
| **REV-02** | `/public/reviews` | `POST` | `201 Created` | Submits review; automatically marks `is_verified_purchase` if user ordered the item. |
