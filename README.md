# WriteIt - Blog API

WriteIt is a RESTful blogging API built using **Express**, **TypeScript**, and **Prisma ORM** with **PostgreSQL** as the database. It provides a modular and scalable structure for handling blog operations such as user registration, authentication, post creation, and comments.

---

## 🧩 Features

* ✅ User registration & login (JWT-based auth)
* 📝 Create, update, delete blog posts
* 💬 Commenting system with nested replies
* 🔒 Auth middleware with token validation and blacklisting
* 🧪 Input validation using Zod
* 🌐 Swagger (OpenAPI) documentation
* 🏷️ Modular folder structure (User, Post, Comment modules)

---

## 📁 Project Structure

```bash
src/
├── app.ts                # Express app setup
├── server.ts             # Server bootstrap
├── lib/                  # Utility functions (hashing, JWT)
├── middlewares/          # Auth, error handling, validators
├── modules/
│   ├── users/
│   │   ├── user.controller.ts
│   │   ├── user.service.ts
│   │   ├── user.route.ts
│   │   ├── user.model.prisma
│   │   └── user.docs.ts
│   ├── posts/
│   └── comments/
├── prisma/
│   ├── schema.prisma     # Main Prisma schema file
│   └── migrations/
├── routes/
│   └── index.ts          # Centralized route importer
├── docs/
│   └── swagger.ts        # Swagger configuration
└── index.ts              # Entry point
```

---

## 🛠 Tech Stack

* **Node.js + Express**
* **TypeScript**
* **Prisma** ORM
* **PostgreSQL**
* **Redis** (for token blacklisting)
* **Zod** (request validation)
* **Swagger** (API docs)

---

## 🚀 Getting Started

### 1. Clone Repo

```bash
git clone https://github.com/your-username/writeit.git
cd writeit
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment

Create a `.env` file with the following:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/writeit
JWT_SECRET=your_jwt_secret
REDIS_URL=redis://localhost:6379
PORT=5000
```

### 4. Migrate DB

```bash
npx prisma migrate dev --name init
```

### 5. Start Server

```bash
npm run dev
```

---

## 🔐 Authentication

* JWT-based token authentication
* Login generates `accessToken`
* Protected routes require `Authorization: Bearer <token>`

### Token Blacklisting

Redis is used to track and expire blacklisted tokens.

---

## 📘 API Documentation

Once server is running:

* Visit [`http://localhost:3000/docs`](http://localhost:3000/docs) for Swagger UI
* OpenAPI docs are written in `*.docs.ts` files using JSDoc annotations

---

## ✅ Example Request

### Register

```json
POST /api/users/register
{
  "username": "johnDoe",
  "email": "john@example.com",
  "password": "MySecurePass123!"
}
```

## 👨‍💻 Author

Muhammed Lawal
[GitHub](https://github.com/your-username)
