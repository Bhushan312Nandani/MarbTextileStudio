# Apparel E-Commerce Project

## Tech Stack

* PostgreSQL
* Prisma ORM
* Express.js
* React + TypeScript
* Docker

## Setup

### Clone Repository

```bash
git clone <repository-url>
cd apparel-ecommerce
```

### Start Database

```bash
docker compose up -d
```

### Backend Setup

```bash
cd backend
npm install
```

### Configure Environment

Create `.env` from `.env.example`.

### Run Prisma

```bash
npx prisma generate
npx prisma db pull
```

## Team Responsibilities

* Member 1: Database Architect
* Member 2: Public API Developer
* Member 3: Admin API Developer
* Member 4: Security Specialist
* Member 5: Team Lead / QA
