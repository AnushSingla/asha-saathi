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