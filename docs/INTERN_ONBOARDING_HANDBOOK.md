# Intern Onboarding Handbook: Apparel E-Commerce

Welcome to the Apparel E-Commerce project! This handbook contains everything you need to know to get started, set up your computer, understand your role, and start coding.

---

## Part 1: Project Setup & Configuration

Before you write any code, you need to set up the project on your computer.

### Prerequisites
Make sure you have installed the following on your computer:
1. [Node.js](https://nodejs.org/) (Version 18 or 20)
2. [Git](https://git-scm.com/)
3. [Docker Desktop](https://www.docker.com/products/docker-desktop/) (Required for running PostgreSQL easily)

### Clone the Repository
Open your terminal (or VS Code terminal) and run:
```bash
git clone https://github.com/Bhushan312Nandani/MarbTextileStudio.git
cd MarbTextileStudio/apparel-ecommerce
```

### Start the Database
We use Docker to run our PostgreSQL database so you don't have to install it manually.
```bash
docker-compose up -d
```

### Backend Setup
Open a terminal inside the `backend` folder:
```bash
cd backend
npm install
```

**Database Configuration (`.env`)**:
You need to connect your local code to the database.
1. Copy the `.env.example` file and rename it to `.env`.
2. Inside `.env`, make sure the `DATABASE_URL` is correct. It should look like this:
   `DATABASE_URL="postgresql://postgres:password@localhost:5432/apparel_ecommerce_db?schema=public"`

**Initialize the Database**:
```bash
npx prisma generate
npx prisma db push
```

**Start the Backend Server**:
```bash
npm run dev
```
*(The backend should now be running on `http://localhost:5000`)*.

### Frontend Setup
Open a **new** terminal window inside the `frontend` folder:
```bash
cd frontend
npm install
npm run dev
```
*(The frontend should now be running, usually on `http://localhost:5173`)*.

---

## Part 2: Workflow & Rules

### 🛑 STRICT RULES FOR GITHUB
1. **NEVER push directly to the `main` or `develop` branches.**
2. When you start working, always create a new branch: `git checkout -b feature/your-name-task-name`
3. When you finish, commit and push your code, then create a **Pull Request (PR)** on GitHub.
4. **DATABASE RULE**: If you are not Member 1, **DO NOT** edit `backend/prisma/schema.prisma` or `backend/prisma/migrations/`. 

---

## Part 3: Who Does What? (Find Your Role)

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

## Part 4: Daily Step-by-Step Git Process
1. **Get latest code:** `git checkout develop` then `git pull origin develop`
2. **Make your branch:** `git checkout -b feature/my-new-task`
3. **Write your code!**
4. **Save your work:** `git add .` then `git commit -m "Brief description of what I did"`
5. **Upload to GitHub:** `git push origin feature/my-new-task`
6. **Go to GitHub.com:** Click the green "Compare & pull request" button. Fill out the PR Template and wait for QA to test your code.
