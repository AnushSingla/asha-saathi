<p align="center">
  <img src="https://readme-typing-svg.herokuapp.com?size=28&color=29A8FF&center=true&vCenter=true&width=700&lines=ASHA+SAATHI+🚑;AI+Health+Assistant;MERN+%7C+Docker+%7C+CI%2FCD+%7C+Jenkins" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/STATUS-ACTIVE-green?style=for-the-badge" />
  <img src="https://img.shields.io/badge/DOCKER-AUTOMATED-blue?style=for-the-badge&logo=docker" />
  <img src="https://img.shields.io/badge/CI%2FCD-JENKINS-red?style=for-the-badge&logo=jenkins" />
  <img src="https://img.shields.io/badge/STACK-MERN-success?style=for-the-badge" />
</p>

---

# 🚀 ASHA-SAATHI — AI Health Assistant

ASHA-SAATHI is a MERN + AI powered platform designed to assist ASHA workers by providing:

- 📄 OCR-based medical report scanning  
- 🧠 AI-generated multilingual summaries  
- 🔊 Voice output (Hindi / Punjabi / English)  
- 🥗 Diet planning & home remedies  
- 🔍 Early disease detection  
- 🔄 Fully automated CI/CD using Jenkins  
- 🐳 Dockerized frontend + backend  

---

# 🛠️ Tech Stack

### **Frontend**
<img src="https://skillicons.dev/icons?i=react,tailwind,js" />

### **Backend**
<img src="https://skillicons.dev/icons?i=nodejs,express,mongodb" />

### **AI / Cloud**
<img src="https://skillicons.dev/icons?i=aws" />

### **DevOps**
<img src="https://skillicons.dev/icons?i=docker,jenkins,github,git,linux" />

---

# 📦 Project Structure

/server → Node.js + Express + AI services
/client → React + Tailwind
/Jenkinsfile → Jenkins CI/CD pipeline
/Dockerfile(s) → Multi-stage frontend & backend builds



---

# ⚡ How to Run the Project

---

# 🔹 METHOD 1 — Clone & Run Manually (Developer Mode)

### 1️⃣ Fork / Clone

```bash
git clone https://github.com/YOUR-USERNAME/asha-saathi.git
cd asha-saathi

🖥️ Backend Setup


cd backend
npm install
npm run dev

🌐 Frontend Setup


cd frontend
npm install
npm run dev

---

# 🔧 Environment Setup (Frontend)

The frontend requires a `.env` file to connect to Firebase and the backend API.  
Without it, authentication features will be disabled and API calls will fail.

### 1️⃣ Create a `.env` file inside the `client` directory

```bash
cd client
cp .env.example .env
```

> On Windows (Command Prompt):
> ```cmd
> copy .env.example .env
> ```

---

### 2️⃣ Copy variables from `.env.example`

Open `client/.env` — it will look like this:

```env
VITE_BACKEND_URL=http://localhost:5000

VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

---

### 3️⃣ Add your Firebase project credentials

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

> ⚠️ **All six Firebase variables are required.** If any are missing, Firebase will not initialise and Google Sign-In / email authentication will be unavailable. The rest of the app will still render normally.

---

### 4️⃣ Restart the development server

After saving your `.env` file, restart Vite so it picks up the new variables:

```bash
# Stop the running dev server (Ctrl + C), then:
npm run dev
```

> Vite only reads `.env` at startup — changes to the file require a restart to take effect.

---

➡️ App Runs On

Link -> https://asha-delta.vercel.app/


🔹 METHOD 2 — Run Using Docker Hub (No Setup Needed)

🐳 Pull Frontend Image

docker pull anushsingla/asha-saathi:frontend

Run Frontend

docker run -d -p 80:80 --name asha-frontend anushsingla/asha-saathi:frontend
🐳 Pull Backend Image


docker pull anushsingla/asha-saathi:backend

Run Backend

docker run -d -p 5000:5000 --name asha-backend anushsingla/asha-saathi:backend

🎯 App is Live At 

Frontend: Frontend-Staging-image

Backend: http://localhost:8000

🔗 CI/CD Pipeline (Jenkins)

✔ Auto-build Node.js + React
✔ Automated version bumping
✔ Docker build & push to Docker Hub
✔ SSH deploy to server
✔ GitHub Webhook triggers


⭐ Support
⭐ Star this repo
🍴 Fork it
🐛 Open issues
🚀 Contribute

 ```