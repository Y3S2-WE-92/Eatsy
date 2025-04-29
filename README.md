# Eatsy 🍔

**Eatsy** is a cloud-native, microservices-based Food Ordering and Delivery System developed as part of the **SE3020 Distributed Systems** course project (Y3S2-WE-92).

This project demonstrates scalable distributed system architecture using **Docker containerization**, **microservices separation**, and modern **web technologies** (React, Node.js, MongoDB, Nginx).

---

# 🏗️ Architecture Overview

- **Microservices**:
  - `user-service`
  - `restaurant-service`
  - `order-service`
  - `delivery-service`
  - `payment-service`
  - `notification-service`
- **Frontends**:
  - `web-client` (for Customers)
  - `admin-panel` (for Admins and Restaurant Owners)

Each service is isolated, independently deployable, and communicates over REST APIs.

---

# ⚙️ Setting up for Local Development (Without Docker)

> For easier development, you can run services separately using `npm`.

### 1. Clone the repository

```bash
git clone https://github.com/Y3S2-WE-92/Eatsy.git
cd eatsy
```

### 2. Install dependencies for each service and frontend

```bash
# Example for user-service
cd services/user-service
npm install

# Example for web-client
cd ../../web-client
npm install
```

✅ Repeat for each service (`restaurant-service`, `order-service`, etc.) and the frontends.

---

### 3. Environment Variables Setup

Inside each service directory:

- Create a `.env` file (for local development)
- Create a `.env.production` file (for Docker production)

Example `.env`:

```env
PORT=4000
MONGO_URI=mongodb://localhost:27017/userdb
JWT_SECRET=your_secret_key
```

Example `.env.production`:

```env
PORT=3000
MONGO_URI=mongodb://mongo:27017/userdb
JWT_SECRET=your_production_secret
```

---

### 4. Running Services Locally

Each backend service:

```bash
npm run dev
```

The web-client (React frontend):

```bash
npm run dev
```

The admin-panel (React frontend):

```bash
npm run dev
```

✅ Access web-client at [http://localhost:5173](http://localhost:5173) (or whatever Vite suggests).

✅ Backend APIs run on different ports (4000, 4001, 4002, etc.)

---

# 🐳 Running the Full System with Docker Compose

> **Production simulation with containers**

### 1. Build and Start all containers

At the root project directory:

```bash
docker-compose up --build
```

✅ This will:
- Build and start all microservices and frontends inside Docker containers
- Connect all services through an internal Docker network

---

# ✅ Notes:
- Don't forget to add your `.env` files **manually** — they are not versioned inside Git.
- Always run services individually during local development to save build time.
- Use Docker only when you want to test full system orchestration.

---

### 2. Accessing the App

| Component         | URL                                  |
|:------------------|:-------------------------------------|
| Web Client (Customer App) | [http://localhost:3000](http://localhost:3000) |
| Admin Panel        | [http://localhost:3001](http://localhost:3001) |
| User Service API   | [http://localhost:4000/api](http://localhost:4000/api) |
| Restaurant Service API | [http://localhost:4001/api](http://localhost:4001/api) |
| Order Service API  | [http://localhost:4002/api](http://localhost:4002/api) |
| Delivery Service API | [http://localhost:4003/api](http://localhost:4003/api) |
| Payment Service API | [http://localhost:4004/api](http://localhost:4004/api) |
| Notification Service API | [http://localhost:4005/api](http://localhost:4005/api) |

---

### 3. Stopping All Containers

```bash
docker-compose down
```

This will stop and remove all running containers.

---

# 📦 Technologies Used

- Frontend:
  - React.js
  - Vite
  - DaisyUI / TailwindCSS
- Backend:
  - Node.js
  - Express.js
  - MongoDB (Cloud Atlas)
- DevOps:
  - Docker
  - Docker Compose
  - Nginx

---

# 🛡️ Project Features

- Secure JWT Authentication for users (Admin, Customers, Restaurants, Delivery)
- Scalable Microservices Communication (REST APIs)
- MongoDB-based Storage for Users, Restaurants, Orders
- Payment Gateway Integration (PayHere, FriMi, or Stripe Sandbox)
- Real-time Notifications via Email/SMS for Orders and Deliveries
- Mobile Responsive Frontends (React + Vite)

---

# ✨ Project Status

✅ Microservices ready  
✅ Docker containerized  
✅ Frontend and Admin Panels separated  
✅ Ready for further production optimizations (Kubernetes, CI/CD pipelines)

---

# 🧑‍💻 Team Members

- **Pahan Abhayawardhane** (Team Leader)
- **Dilina Jayalath**
- **Dinithi Rajapaksha**
- **Sandali Dias**

---

GitHub Repository: [https://github.com/Y3S2-WE-92/Eatsy.git](https://github.com/Y3S2-WE-92/Eatsy.git)  
Demonstration Video: [https://youtu.be/uNSe-Z4WM6I](https://youtu.be/uNSe-Z4WM6I)