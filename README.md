# 🚀 Admin Management System

[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com/)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

> A powerful, secure, and scalable full-stack web application for managing administrative users with robust authentication and profile management capabilities.

## ✨ Features

### 🔐 Admin Authentication
- Secure login system with email and password
- Role-based access control
- Session management across devices

### 👥 User Management
- Add new admin users
- Remove admin privileges
- Comprehensive profile management
  
### 📋 Profile Information
- 👤 Name and surname
- 📅 Age
- 🆔 ID number
- 📸 Profile photo
- 👨‍💼 Company role (default: sysadmin)

## Layout
![image](https://github.com/user-attachments/assets/dbb368fe-a6bf-4d1f-bf43-429f56aca476)


## Credentials 
System-Admin: 
Email => salah@gmail.com
Password => Password@2025

Mini-admin:
Email => kabelo@gmail.com
Password => defaultPassword123

## 🛠️ Tech Stack

### Frontend
```
📱 HTML5 | CSS3 | JavaScript
⚛️ React (Vite)
🎨 Modern UI/UX
```

### Backend
```
🖥️ Node.js
⚡ Express.js
🔥 Firebase Admin SDK
🔒 bcrypt
🌐 CORS
```

### Testing & Development
```
🧪 Postman
🔄 Nodemon
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm/yarn
- Firebase account

### 📦 Installation

1. **Clone the repository**
```bash
git clone https://github.com/AlsonAfrica/Admin-Registration-Node.git
cd admin-management-system
```

2. **Set up backend**
```bash
cd backend
npm install
```

3. **Set up frontend**
```bash
cd registration-app
npm install
```

### 🏃‍♂️ Running the Application

**Backend Server**
```bash
cd backend
nodemon server.js  # Development
# OR
node server.js     # Production
```

**Frontend Development Server**
```bash
cd registration-app
npm run dev
```

## 💾 Data Persistence

Firebase Admin SDK provides robust data management:
- 📊 Firestore: Application data
- 📁 Storage: File management
- 🔐 Auth: Session handling

## 🔒 Security Features

- 🔑 Password hashing (bcrypt)
- 🛡️ Protected routes
- 📝 Session management
- 👮‍♂️ Role-based access

## 🧪 API Testing

Use Postman to test the following endpoints:
```
POST   /api/admin/login
POST   /api/admin/add
DELETE /api/admin/remove
GET    /api/admin/profile
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 💫 Support

For support, email: nhlakaniphoradebe337@gmail.com 

---

<div align="center">
Made with ❤️ Nhlakanipho Alson Radebe
</div>
