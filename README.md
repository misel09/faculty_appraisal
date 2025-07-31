# 🎓 Faculty Appraisal System

A Smart Web Application to Digitize and Streamline Faculty Performance Reviews
**Built with React, Node.js, Express, and MongoDB**

![Version](https://img.shields.io/badge/Version-1.0.0-blueviolet)
![Status](https://img.shields.io/badge/Status-Active-green)
![Backend](https://img.shields.io/badge/Backend-Node.js-yellow)
![Frontend](https://img.shields.io/badge/Frontend-React-blue)
![Database](https://img.shields.io/badge/Database-MongoDB-brightgreen)

---

## 📘 Overview

The **Faculty Appraisal System** enables faculty members to submit detailed performance reports including teaching hours, research, services, awards, and more. Admins can view these submissions, evaluate them, provide feedback, and store everything securely in a centralized system.

This project replaces manual paperwork with a secure, efficient digital solution — perfect for institutions aiming for transparency, accountability, and ease of access.

---

## 🌟 Features

### 👨‍🏫 Faculty Panel

* Submit appraisals across categories (Teaching, Research, Service)
* Upload certificates, documents, or images
* Responsive form interface with validation
* View and track submission status

### 👨‍💼 Admin Panel

* View faculty submissions in detail
* Provide feedback and remarks
* Download uploaded documents
* Search/filter submissions by year or department

### 🔐 Security & Workflow

* Role-based authentication (Faculty/Admin)
* JSON Web Tokens (JWT) for secure sessions
* Encrypted password storage (bcrypt)
* MongoDB with Mongoose ORM for flexible schema design

---

## 💠 Tech Stack

| Layer    | Technologies                 |
| -------- | ---------------------------- |
| Frontend | React, HTML, CSS, JavaScript |
| Backend  | Node.js, Express.js          |
| Database | MongoDB + Mongoose           |
| Auth     | JWT, bcrypt                  |
| Uploads  | Multer (for file uploads)    |
| Config   | dotenv (for env variables)   |

---

## 🔐 `.env` Configuration (Backend)

Create a `.env` file in your `/backend` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

---

## 🚀 Installation & Run

### ✨ Backend Setup

```bash
cd backend
npm install
npm start
```

### ✨ Frontend Setup

```bash
cd frontend
npm install
npm start
```

Make sure your backend is running on `http://localhost:5000` and that your frontend calls the correct API base URL.

---

## 📷 UI Screenshots

| Homepage                                | Faculty Dashboard                                         | Event Form                        |
| --------------------------------------- | --------------------------------------------------------- | --------------------------------- |
| ![Homepage](./screenshots/homepage.png) | ![Faculty Dashboard](./screenshots/faculty_dashboard.png) | ![Event](./screenshots/event.png) |

| Publication Form                              | Admin View                                  | Form Submission                                       | Report View                         |
| --------------------------------------------- | ------------------------------------------- | ----------------------------------------------------- | ----------------------------------- |
| ![Publication](./screenshots/publication.png) | ![Admin View](./screenshots/admin_view.png) | ![Form Submission](./screenshots/form_submission.png) | ![Report](./screenshots/report.png) |

> *Add these images in a **`/screenshots`** folder inside the root project directory.*

---

## 🛡 Security & Best Practices

* Store all sensitive info in environment variables
* Hash passwords with bcrypt before storing
* Use JWT to maintain secure sessions
* Use validation for all forms
* Sanitize user input to prevent XSS/Injection

---


## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💼 Developed By

**Patel Misel**
 3rd Year B.Tech Student (Information Technology)
