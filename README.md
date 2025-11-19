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

/backend → Node.js + Express + AI services
/frontend → React + Tailwind
/Jenkinsfile → Jenkins CI/CD pipeline
/Dockerfile(s) → Multi-stage frontend & backend builds

yaml
Copy code

---

# ⚡ How to Run the Project

---

# 🔹 METHOD 1 — Clone & Run Manually (Developer Mode)

### 1️⃣ Fork / Clone

```bash
git clone https://github.com/YOUR-USERNAME/asha-saathi.git
cd asha-saathi
🖥️ Backend Setup
bash
Copy code
cd backend
npm install
npm run dev
🌐 Frontend Setup
bash
Copy code
cd frontend
npm install
npm run dev
➡️ App Runs On
Frontend → http://localhost:5173

Backend → http://localhost:5000

🔹 METHOD 2 — Run Using Docker Hub (No Setup Needed)
🐳 Pull Frontend Image
bash
Copy code
docker pull anushsingla/asha-saathi:frontend
Run Frontend
bash
Copy code
docker run -d -p 80:80 --name asha-frontend anushsingla/asha-saathi:frontend
🐳 Pull Backend Image
bash
Copy code
docker pull anushsingla/asha-saathi:backend
Run Backend
bash
Copy code
docker run -d -p 5000:5000 --name asha-backend anushsingla/asha-saathi:backend
🎯 App is Live At
Frontend: http://localhost

Backend: http://localhost:5000

🔗 CI/CD Pipeline (Jenkins)
✔ Auto-build Node.js + React
✔ Automated version bumping
✔ Docker build & push to Docker Hub
✔ SSH deploy to server
✔ GitHub Webhook triggers

<p align="center"> <img src="https://skillicons.dev/icons?i=jenkins,docker,git" /> </p>
📸 Screenshots
(Add your images inside /screenshots folder)

markdown
Copy code
/screenshots
  - home.png
  - ocr.png
  - ai-summary.png
  - voice-output.png
⭐ Support
⭐ Star this repo
🍴 Fork it
🐛 Open issues
🚀 Contribute

<p align="center"> Made with ❤️ for ASHA Workers </p> ```