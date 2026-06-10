# 🚀 RoleGuard Backend – JWT Authentication & RBAC API

RoleGuard Backend is a **Node.js + Express + MongoDB** based REST API that implements **secure user authentication**, **JWT-based authorization**, **Role-Based Access Control (RBAC)**, and **CRUD operations on a secondary entity (Tasks)**.

This project demonstrates real-world backend development best practices and learning

---

## 📌 Features Implemented

### ✅ Authentication & Authorization
- User registration and login  
- Password hashing using **bcrypt**  
- JWT token generation on login  
- JWT verification middleware for protected routes  

---

### ✅ Role-Based Access Control (RBAC)
- Two roles:
  - `user` → limited access  
  - `admin` → admin-only APIs  
- Role stored inside JWT payload  
- Admin-only routes protected using middleware.  

---

### ✅ Secondary Entity (Tasks)
- Clear **User → Tasks (One-to-Many)** relationship  
- Each task belongs to a user  
- Only the owner can update or delete their tasks  

---

### ✅ CRUD APIs
- Create Task  
- Get All Tasks (user-specific)  
- Get Task by ID  
- Update Task  
- Delete Task  

---

### ✅ API Versioning
All APIs are versioned using:


---

### ✅ Error Handling & Validation
- Input validation using **Joi**  
- Meaningful HTTP status codes:
  - `400` → Bad Request  
  - `401` → Unauthorized  
  - `403` → Forbidden  
  - `404` → Not Found  
  - `500` → Internal Server Error  

---

### ✅ API Documentation
- Fully documented using **Postman Collection**  
- Easy to test APIs locally  

---

## 🛠 Tech Stack
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB (Atlas)  
- **ODM**: Mongoose  
- **Authentication**: JWT  
- **Password Hashing**: bcrypt  
- **Validation**: Joi  
- **API Testing**: Postman  

---

## 📂 Project Structure

```text
RoleGuard/
├── app.js
├── config/
│   └── db.js
├── controllers/
│   ├── authController.js
│   ├── taskController.js
│   └── adminController.js
├── middleware/
│   ├── auth.js
│   └── admin.js
├── models/
│   ├── User.js
│   └── Task.js
├── routes/
│   ├── auth.js
│   ├── tasks.js
│   └── admin.js
├── validator/
│   └── authValidator.js
├── postman/
│   └── RoleGuard.postman_collection.json
├── package.json
└── README.md
```

---

### 🔑 Auth APIs
| Method | Endpoint | Description |
|------|---------|-------------|
| POST | `/api/v1/auth/register` | Register new user |
| POST | `/api/v1/auth/login` | Login & get JWT |

---

### 📋 Task APIs (Protected)
| Method | Endpoint | Description |
|------|---------|-------------|
| POST | `/api/v1/tasks` | Create task |
| GET | `/api/v1/tasks` | Get user tasks |
| GET | `/api/v1/tasks/:id` | Get task by ID |
| PATCH | `/api/v1/tasks/:id` | Update task |
| DELETE | `/api/v1/tasks/:id` | Delete task |

---

### 🛡 Admin APIs (Admin Only)
| Method | Endpoint | Description |
|------|---------|-------------|
| GET | `/api/v1/admin/users` | Get all users |
| GET | `/api/v1/admin/tasks` | Get all tasks |

---

## 🔑 Authentication Flow (JWT)

1. User logs in  
2. Server generates JWT containing:
   - `userId`
   - `role`
3. Token is sent to client  
4. Client sends token in request headers:


5. Middleware verifies token for protected routes  

---

## ⚙️ Environment Setup

### 1️⃣ Clone Repository
```bash
git clone https://github.com/sohail19go27/RoleGuard-Backend.git
cd RoleGuard-Backend
```

## ⚙️ Setup & Installation

### 1️⃣ Install Dependencies

```bash 
    npm install

PORT=4000 
MONGO_URI=your_mongodb_connection_string 
JWT_SECRET=your_secret_key 
```

## ▶️ Run Server

### 4️⃣ Start the Server 
npm start

---

## 📮 Postman API Documentation 

The Postman collection is included in the repository:


### How to Use
1. Open **Postman**
2. Click **Import**
3. Import the JSON collection file
4. Call the **Login API**
5. JWT token is automatically saved to the environment
6. Use protected APIs with `{{token}}`


---

## 🧠 Assignment Highlights

✔ Secure authentication with JWT  
✔ Clean role-based authorization  
✔ Proper database relationships  
✔ API versioning  
✔ Error handling & validation  
✔ Postman documentation  

---

## 👤 Author 

**Sohail Ahmad.**  
Full Stack Developer(MERN/SpringBoot) 
