# 🧩 Tweetly — Node.js REST API

**Tweetly** is a clean, well-documented backend for managing users, posts, and comments with secure authentication and role-based access control (RBAC).

---

## ✨ Highlights
- **Authentication:** JWT-based auth with bcrypt password hashing
- **Authorization:** Role-based access (ADMIN, USER)
- **Features:** Create/read/update/delete posts and comments
- **ORM:** Sequelize (supports MySQL, PostgreSQL)

---

## 📚 Table of Contents
1. [Features](#-features)
2. [Quick Start](#-quick-start)
3. [Environment Variables](#-environment-variables)
4. [Project Structure](#-project-structure)
5. [API Overview](#-api-overview)
6. [Seeding](#-seeding)
7. [Contributing](#-contributing)
8. [License](#-license)

---

## 🚀 Features
- User registration and login
- Password hashing with **bcrypt**
- **JWT** authentication and middleware-protected routes
- **RBAC**: ADMIN and USER roles
- CRUD for posts and comments with ownership checks
- Seeders for roles and initial users

---

## ⚙️ Quick Start
Prerequisites:
- Node.js (v16+ recommended)
- npm or yarn
- A running SQL database (MySQL or PostgreSQL)

Steps:
```bash
# Clone & install
git clone <repo-url>
cd your-repo
npm install

# Create .env (see below)
# Run migrations / seed if available
npm run seed

# Start development server
npm run dev
```

> Tip: Use `npm run start` for production if configured.

---

## 🔐 Environment Variables
Create a `.env` file in the project root and set the following values:

```env
# Server
PORT=3000

# Database
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=your_database

# Security
JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=1d

# Optional
NODE_ENV=development
```

---

## 📁 Project Structure
A quick look at the repo layout (top-level):

```
.
├── app.js
├── bin/
│   └── www
├── config/
│   └── config.js
├── controllers/
├── models/
├── routes/
├── services/
├── validations/
├── public/
├── seeders/
├── package.json
└── README.md
```

> See the `/routes` and `/controllers` folders for available endpoints and their handlers.

---

## 🔍 API Overview
Common endpoints (examples):

- Auth
  - `POST /api/auth/register` — Register a new user
  - `POST /api/auth/login` — Authenticate and receive a JWT
  - `PUT /api/auth/promote/:userId` - Promote user as an admin (authenticated)
  - `DELETE /api/auth/deleteUser/:userId` - Delete user by admin (authenticated)
  - `GET /api/auth/getAllUser` - Admin can view all user (authenticated)

- Posts
  - `GET  /api/posts` — List all posts (authenticated)
  - `POST /api/posts` — Create a post (authenticated)
  - `GET  /api/posts/:id` — Get a single post (authenticated)
  - `PUT  /api/posts/:id` — Update a post (owner or admin) (authenticated)
  - `DELETE /api/posts/:id` — Delete a post (owner or admin) (authenticated)

- Comments
  - `GET /api/posts/:postId` - Get all comments on post
  - `POST   /api/posts/:postId` — Add a comment on post
  - `PUT /api/posts/:postId/:commentId` - Edit comment of perticular post
  - `DELETE /api/:postId/:commentId` — Delete a comment (owner / post owner / admin)

> For full documentation, check the `routes/` folder or add Swagger/OpenAPI docs.

---

## 🌱 Seeding
Seed initial roles and a demo user:

```bash
npm run seed
```

(Adjust seed script to match your project's package.json.)

---

## 🤝 Contributing
- Fork the repo
- Create a branch: `git checkout -b feature/your-feature`
- Commit your changes: `git commit -m "feat: add something"
- Push to the branch and create a PR

Please keep code style consistent and add tests where applicable.

---

## 📄 License
MIT — see `LICENSE` file for details.

---

If you'd like, I can also:
- Add a Table of Contents with links (done)
- Add badges (Node, build, license)
- Generate a basic Swagger/OpenAPI spec from existing routes

If you want any of those, tell me which one and I'll add it ✅
