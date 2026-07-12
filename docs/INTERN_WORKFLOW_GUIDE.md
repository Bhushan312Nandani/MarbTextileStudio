# Intern Team Workflow & Directory Guide

Welcome to the Apparel E-Commerce project! This guide will tell you exactly what your role is, where you should write your code, and how to use GitHub properly.

---

## 🛑 STRICT RULES FOR GITHUB
1. **NEVER push directly to the `main` or `develop` branches.**
2. When you start working, always create a new branch: `git checkout -b feature/your-name-task-name`
3. When you finish, commit and push your code, then create a **Pull Request (PR)** on GitHub.
4. **DATABASE RULE**: If you are not Member 1, **DO NOT** edit `backend/prisma/schema.prisma` or `backend/prisma/migrations/`. 
   *(Note for Project Manager: GitHub "CODEOWNERS" is enabled. If anyone tries to modify the database files in a Pull Request, GitHub will automatically block the merge unless Member 1 approves it).*

---

## 🧑‍💻 Who Does What? (Find Your Role)

### Member 1: Database Architect (DB Admin)
**Your Job:** Manage the database tables (Users, Products, Orders, etc.).
**Where you will work:**
- `backend/prisma/schema.prisma` -> Add or modify tables here.
- `backend/prisma/migrations/` -> Auto-generated when you run migration commands.
- `backend/prisma/seed.ts` -> Write code to insert dummy data for testing.
**Daily Workflow:** Run `npx prisma migrate dev` to update the DB, and inform the team!

### Member 2: Public API Developer (Customer APIs)
**Your Job:** Write the APIs that normal customers will use (e.g., viewing products, searching, reading reviews).
**Where you will work:**
- `backend/src/routes/public/` -> Define the API URLs (e.g., `router.get('/products')`).
- `backend/src/controllers/public/` -> Write the logic to handle the request and send the response.
- `backend/src/services/public/` -> Write the database queries (using Prisma) to fetch data from `products`, `categories`, `brands`, etc.

### Member 3: Admin API & Frontend Developer
**Your Job:** Write the APIs that the store owner uses (adding products, managing orders) AND set up the React frontend.
**Where you will work (Backend):**
- `backend/src/routes/admin/` -> Define URLs for admins (e.g., `router.post('/admin/products')`).
- `backend/src/controllers/admin/` & `backend/src/services/admin/`.
**Where you will work (Frontend):**
- `frontend/src/` -> Initialize Vite + React here. Create components for the UI.

### Member 4: Security Specialist
**Your Job:** Make the app secure! Handle user login, passwords, and permissions.
**Where you will work:**
- `backend/src/middleware/auth.middleware.js` -> Code to check if a user is logged in (verify JWT token).
- `backend/src/routes/public/auth.routes.js` -> Login and Signup URLs.
- `backend/src/utils/` -> Functions for hashing passwords (bcrypt) and generating tokens.

### Member 5: Team Lead / QA (Tester)
**Your Job:** Test everyone's code and make sure the project works flawlessly.
**Where you will work:**
- `testing/postman/` -> Create and save Postman collections to test all APIs.
- `testing/test-cases/` -> Write markdown files explaining what you tested and what bugs you found.
- GitHub -> Review Pull Requests and approve them if the code works.

---

## 🚀 Daily Step-by-Step Git Process
1. **Get latest code:** `git checkout develop` then `git pull origin develop`
2. **Make your branch:** `git checkout -b feature/my-new-task`
3. **Write your code!**
4. **Save your work:** `git add .` then `git commit -m "Brief description of what I did"`
5. **Upload to GitHub:** `git push origin feature/my-new-task`
6. **Go to GitHub.com:** Click the green "Compare & pull request" button. Fill out the PR Template and wait for QA to test your code.
