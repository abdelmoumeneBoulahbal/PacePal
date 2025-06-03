# 🏃‍♂️ Pacepal

Pacepal is a web application designed to help people stay active by making group running sessions easy to organize and join. Whether you're a beginner or a regular runner, Pacepal offers a supportive, social space to plan and participate in casual runs based on your pace, location, and availability.

---

## 🚀 Features

- Create and customize group runs  
- Search and join upcoming runs  
- Organizer control: accept/reject participants  
- Track your running activity  
- Friendly and beginner-focused environment  

---

## 🛠️ Tech Stack

### Frontend (React)

- **React 18**
- **Vite** (for fast dev/build)
- **React Router DOM**
- **FontAwesome** (icons)
- **Lucide React** (icons)
- **Recharts** (charts)
- **RSuite** (UI components)
- **PropTypes**  
- **React Fast Marquee**  
- ESLint + Vite Plugins

### Backend (Node.js)

- **Node.js**
- **Express 5**
- **PostgreSQL** (via `pg`)
- **dotenv** (for environment config)
- **bcrypt** (password hashing)
- **UUID** (unique IDs)
- **Zod** (input validation)
- **CORS**
- **Nodemon** (for dev)

---

## 📦 Installation

### 1. Clone the repository
```bash
git clone https://github.com/your-username/pacepal.git
cd pacepal

# Setup frontend
cd frontend
npm install
npm run dev

# ⚠️ Note: An active internet connection is required to connect to the Neon database

# Setup backend
cd ../backend
npm install
npm run dev
