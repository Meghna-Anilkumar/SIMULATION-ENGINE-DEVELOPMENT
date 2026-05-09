# 🌱 Simulation Engine Development

A full-stack simulation platform that models plant growth behavior over time based on environmental conditions like sunlight and water levels.

This project was developed as part of the Full Stack Engineering Assignment from Revin Krishi.

---

## 🚀 Live Demo

### Frontend
https://simulation-engine-development.vercel.app

### Backend
https://simulation-engine-development.onrender.com

---

## ✨ Features

- Interactive plant growth simulation
- Time-based state evolution
- Dynamic backend rule engine
- Growth and health tracking
- Simulation history management
- Growth visualization using charts
- Reset and replay functionality
- Extensible architecture for future variables and rules

---

## 🛠️ Tech Stack

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- Axios
- Chart.js

### Backend
- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose

---

## 📂 Project Structure
SIMULATION ENGINE DEVELOPMENT/
│
├── frontend/
├── backend/

┌───────────────────────────────────────────────┐
│                  FRONTEND                     │
│        React + TypeScript + Vite              │
│───────────────────────────────────────────────│
│                                               │
│  Components                                   │
│  ├── Simulation Controls                      │
│  ├── Growth Charts                            │
│  ├── History Timeline                         │
│  └── Plant Status Card                        │
│                                               │
│  Services                                     │
│  └── Axios API Layer                          │
│                                               │
└───────────────────────────────────────────────┘
                        │
                        │ HTTP Requests
                        ▼
┌───────────────────────────────────────────────┐
│                  BACKEND                      │
│        Node.js + Express + TypeScript         │
│───────────────────────────────────────────────│
│                                               │
│  Routes                                       │
│  └── Simulation Routes                        │
│                                               │
│  Controllers                                  │
│  └── Handle API Requests                      │
│                                               │
│  Services                                     │
│  └── Simulation Service                       │
│                                               │
│  Rule Engine                                  │
│  └── PlantGrowthRules                         │
│                                               │
│  Repositories                                 │
│  └── Database Operations                      │
│                                               │
│  DTOs & Validation                            │
│  └── Input Validation                         │
│                                               │
└───────────────────────────────────────────────┘
                        │
                        │ Mongoose
                        ▼
┌───────────────────────────────────────────────┐
│                 DATABASE                      │
│                 MongoDB Atlas                 │
│───────────────────────────────────────────────│
│                                               │
│  Simulation Collection                        │
│  ├── day                                      │
│  ├── growthLevel                              │
│  ├── stressLevel                              │
│  ├── healthStatus                             │
│  ├── consecutiveOptimalDays                   │
│  ├── message                                  │
│  └── timestamp                                │
│                                               │
└───────────────────────────────────────────────┘

⚙️ Installation
Clone Repository:
git clone https://github.com/Meghna-Anilkumar/SIMULATION-ENGINE-DEVELOPMENT

Backend Setup:
cd backend
npm install

Create .env:
PORT=5000
MONGODB_URI=your_mongodb_uri
FRONTEND_URL=http://localhost:5173

Run backend:
npm run dev

Frontend Setup:
cd frontend
npm install

Create .env:
VITE_API_URL=http://localhost:5000/api/simulation

Run frontend:
npm run dev

🌿 Simulation Rules:
Low water + High sunlight → Plant stress increases
Medium water + Medium sunlight → Optimal growth
High water + Low sunlight → Root rot risk
Consistent optimal conditions → Accelerated growth

☁️ Deployment:
Frontend: Vercel,
Backend: Render,
Database: MongoDB Atlas
