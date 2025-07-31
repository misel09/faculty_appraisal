# 🎓 Faculty Appraisal System

A Smart Solution to Manage, Review & Evaluate Faculty Performance  
**Simplifying academic reviews through digitization and intelligent workflows.**

![Version](https://img.shields.io/badge/Version-1.0.0-blueviolet)
![Status](https://img.shields.io/badge/Status-Active-green)
![Backend](https://img.shields.io/badge/Backend-Node.js-yellow)
![Database](https://img.shields.io/badge/Database-MongoDB-brightgreen)
![Frontend](https://img.shields.io/badge/Frontend-HTML/CSS/JS-blue)

---

## 📌 About the Project

The **Faculty Appraisal System** is a web-based application designed for educational institutions to digitize their faculty performance review process. Faculty members can log in, submit achievements, and upload supporting documents. Admins can view, evaluate, and provide feedback using a centralized dashboard.

This system improves transparency, ensures proper documentation, and reduces manual effort in managing yearly appraisals.

---

## 🌟 Key Features

### 🧑‍🏫 Faculty Panel
- Submit detailed appraisal (Teaching, Research, Service, Awards)
- Upload documents/images as proof
- Easy-to-use web forms
- Status tracking of submission

### 🧑‍💼 Admin Panel
- View all submissions with filters
- Download supporting documents
- Provide ratings & comments
- Organize and export data

### 💡 System Capabilities
- REST API-based backend
- MongoDB-powered data storage
- File uploads using Multer
- JWT Authentication
- MVC structure for maintainability

---

## 🛠 Tech Stack

| Layer         | Technologies                         |
|---------------|--------------------------------------|
| Frontend      | HTML, CSS, JavaScript (React Optional) |
| Backend       | Node.js, Express.js                  |
| Database      | MongoDB + Mongoose                   |
| File Handling | Multer                               |
| Authentication| JWT                                  |
| Middleware    | dotenv, bcrypt, cors, body-parser    |

---

## 🔐 .env Configuration

Create a `.env` file in the `/backend` directory with the following:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secure_jwt_secret
NODE_ENV=development

