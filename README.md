# Apparel E-Commerce Store

Welcome to the Apparel E-Commerce project! This repository contains both our Backend (Node.js/Express) and Frontend (React/Vite).

If you are an intern joining the team, please read this entire document carefully. We have made the setup process as simple as possible so you can start writing code immediately!

---

## 📖 Must Read First!
Before doing anything else, please read the **[Intern Workflow Guide](docs/INTERN_WORKFLOW_GUIDE.md)**. 
It tells you exactly:
- What your specific role is.
- Which folders you are allowed to edit.
- How to properly use Git and GitHub to submit your work without breaking the project.

---

## 🛠️ Project Setup & Configuration

Follow these steps exactly to get the project running on your computer.

### Step 1: Install Prerequisites
Make sure you have installed the following on your computer:
1. [Node.js](https://nodejs.org/) (Version 18 or 20)
2. [Git](https://git-scm.com/)
3. [Docker Desktop](https://www.docker.com/products/docker-desktop/) (Required for running PostgreSQL easily)

### Step 2: Clone the Repository
Open your terminal (or VS Code terminal) and run:
```bash
git clone https://github.com/Bhushan312Nandani/MarbTextileStudio.git
cd MarbTextileStudio/apparel-ecommerce
```

### Step 3: Start the Database
We use Docker to run our PostgreSQL database so you don't have to install it manually.
```bash
docker-compose up -d
```
*(This starts the database in the background).*

### Step 4: Backend Setup
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
   *(Ask Member 1 if you are unsure).*

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

### Step 5: Frontend Setup
Open a **new** terminal window inside the `frontend` folder:
```bash
cd frontend
npm install
npm run dev
```
*(The frontend should now be running, usually on `http://localhost:5173`)*.

---

## 🚀 Ready to Code?
If you have both the backend and frontend running without errors, congratulations! 

Now:
1. Go back to the **[Intern Workflow Guide](docs/INTERN_WORKFLOW_GUIDE.md)** to find your task.
2. Create your branch (`git checkout -b feature/my-task`).
3. Start coding!

---

## 🆘 Need Help?
If you run into any setup issues, reach out to the **Team Lead / QA (Member 5)** or the **Project Manager**. Do not suffer in silence!
