<p align="center">
  <img src="https://readme-typing-svg.herokuapp.com?size=28&color=29A8FF&center=true&vCenter=true&width=700&lines=ASHA+SAATHI+🚑;AI+Health+Assistant;MERN+%7C+Groq+AI+%7C+Docker+%7C+Jenkins" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/STATUS-ACTIVE-green?style=for-the-badge" />
  <img src="https://img.shields.io/badge/DOCKER-AUTOMATED-blue?style=for-the-badge&logo=docker" />
  <img src="https://img.shields.io/badge/CI%2FCD-JENKINS-red?style=for-the-badge&logo=jenkins" />
  <img src="https://img.shields.io/badge/STACK-MERN-success?style=for-the-badge" />
  <img src="https://img.shields.io/badge/AI-GROQ-orange?style=for-the-badge" />
</p>

---

# 🚀 ASHA-SAATHI — AI Health Assistant

ASHA-SAATHI is a MERN + AI powered platform designed to assist ASHA (Accredited Social Health Activist) workers by providing:

- 📄 OCR-based medical report scanning (Tesseract.js)
- 🧠 AI-generated multilingual summaries via Groq AI (Hindi & English)
- 💊 Medication suggestions & home remedies from report analysis
- 🥗 Diet planning for rural patients
- 🔍 Early disease detection support
- 💰 Credit & payout system for ASHA workers based on reports processed
- 🔐 JWT + Firebase authentication (email/password & Google Sign-In)
- 🔄 Fully automated CI/CD using Jenkins
- 🐳 Dockerized frontend + backend

---

# 🛠️ Tech Stack

### **Frontend**
<img src="https://skillicons.dev/icons?i=react,tailwind,js,vite,firebase" />

- React 19 + React Router v6
- Tailwind CSS v4
- Firebase (Auth — email/password & Google)
- Vite

### **Backend**
<img src="https://skillicons.dev/icons?i=nodejs,express,mongodb" />

- Node.js + Express 5
- MongoDB + Mongoose
- Firebase Admin SDK
- JWT (jsonwebtoken) + bcryptjs
- Multer (file uploads)
- Tesseract.js (OCR)
- Groq AI via OpenAI-compatible SDK

### **DevOps**
<img src="https://skillicons.dev/icons?i=docker,jenkins,github,git,linux" />

---

# 📦 Project Structure

```
asha-saathi/
├── client/          → React + Tailwind (Vite)
├── server/          → Node.js + Express + AI services
│   ├── api/         → Groq AI client
│   ├── controllers/ → auth, upload (OCR + AI), payment
│   ├── middleware/  → JWT auth middleware
│   ├── models/      → User, Payment (Mongoose)
│   └── routes/      → /api/auth, /api/upload, /api/payment
├── docker-compose.yaml
└── Jenkinsfile      → Jenkins CI/CD pipeline
```

---

# ⚡ How to Run the Project

---

# 🔹 METHOD 1 — Clone & Run Manually (Developer Mode)

### 1️⃣ Fork / Clone

```bash
git clone https://github.com/YOUR-USERNAME/asha-saathi.git
cd asha-saathi
```

### 🖥️ Backend Setup

```bash
cd server
npm install
npm run dev
```

> Server runs on **http://localhost:8000**

### 🌐 Frontend Setup

```bash
cd client
npm install
npm run dev
```

> App runs on **http://localhost:5173**

---

# 🔧 Environment Setup

## Frontend — `client/.env`

Create a `.env` file inside the `client/` directory:

```env
VITE_BACKEND_URL=http://localhost:8000

VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

### Firebase credentials

1. Go to the [Firebase Console](https://console.firebase.google.com) and open your project.
2. Navigate to **Project Settings → General → Your apps → SDK setup and configuration**.
3. Select **Config** and copy the values into your `.env` file:

| Variable | Where to find it |
|---|---|
| `VITE_FIREBASE_API_KEY` | `apiKey` in the Firebase config object |
| `VITE_FIREBASE_AUTH_DOMAIN` | `authDomain` — usually `<project-id>.firebaseapp.com` |
| `VITE_FIREBASE_PROJECT_ID` | `projectId` |
| `VITE_FIREBASE_STORAGE_BUCKET` | `storageBucket` — usually `<project-id>.appspot.com` |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | `messagingSenderId` |
| `VITE_FIREBASE_APP_ID` | `appId` |

> ⚠️ All six Firebase variables are required. Missing values will disable Google Sign-In and email authentication.

---

## Backend — `server/.env`

Create a `.env` file inside the `server/` directory:

```env
MONGO_URL=mongodb+srv://<user>:<password>@cluster.mongodb.net/<dbname>
JWT_SECRET=your_jwt_secret_key

GROQ_KEY=your_groq_api_key

FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=
```

| Variable | Where to find it |
|---|---|
| `MONGO_URL` | MongoDB Atlas → Connect → Drivers |
| `JWT_SECRET` | Any random secret string |
| `GROQ_KEY` | [console.groq.com](https://console.groq.com) → API Keys |
| `FIREBASE_PROJECT_ID` / `CLIENT_EMAIL` / `PRIVATE_KEY` | Firebase Console → Project Settings → Service Accounts → Generate new private key |

---

### Restart dev servers after updating `.env`

```bash
# Vite only reads .env at startup — restart after changes
npm run dev
```

---

➡️ **Live App:** https://asha-delta.vercel.app/

---

# 🔹 METHOD 2 — Docker Compose (Recommended)

```bash
git clone https://github.com/YOUR-USERNAME/asha-saathi.git
cd asha-saathi

# Add server/.env with your secrets (see above), then:
docker compose up --build
```

| Service | URL |
|---|---|
| Frontend | http://localhost:3000 |
| Backend | http://localhost:8000 |

---

# 🔹 METHOD 3 — Run Using Docker Hub (No Build Needed)

### 🐳 Pull & Run Frontend

```bash
docker pull anushsingla/asha-saathi:frontend
docker run -d -p 3000:80 --name asha-frontend anushsingla/asha-saathi:frontend
```

### 🐳 Pull & Run Backend

```bash
docker pull anushsingla/asha-saathi:backend
docker run -d -p 8000:8000 --name asha-backend anushsingla/asha-saathi:backend
```

| Service | URL |
|---|---|
| Frontend | http://localhost:3000 |
| Backend | http://localhost:8000 |

---

# 🔗 CI/CD Pipeline (Jenkins)

✔ Auto-build Node.js + React on push  
✔ Automated version bumping  
✔ Docker build & push to Docker Hub  
✔ SSH deploy to server  
✔ GitHub Webhook triggers  

---

# ⭐ Support

- ⭐ Star this repo  
- 🍴 Fork it  
- 🐛 Open issues  
- 🚀 Contribute — see [CONTRIBUTING.md](CONTRIBUTING.md)
