
# 🧠 Cybernetic Feedback System

A containerized web app for collecting citizen feedback, analyzing sentiment, and showing policy insights in real time.

---

## 🚀 How to Run

### 1. Prerequisites
- Docker + Docker Compose installed

### 2. Clone and Run
```bash
git clone https://github.com/your-repo/cybernetic-feedback.git
cd cybernetic-feedback
docker-compose up --build
```

---

## 📂 Project Structure

```
.
├── backend/       # Flask API (sentiment analysis)
├── frontend/      # React + Tailwind UI
├── docker-compose.yml
└── README.md
```

---

## 🌐 Access the App

- **Frontend**: http://localhost:3000  
- **Backend API**: http://localhost:5000

---

## 🔁 API Endpoints

- `POST /submit_feedback`  
  `{ "feedback": "your text" }`

- `GET /policy_dashboard`  
  Returns current average sentiment and feedback stats

---

## ✅ Features

- Real-time sentiment tracking
- Trend chart via Chart.js
- Nginx reverse proxy to avoid CORS
- Fully containerized (frontend + backend)

---

## 🧹 Reset Everything
```bash
docker-compose down --volumes --remove-orphans
docker-compose up --build
```

---

## 📌 Notes

- All data is stored in memory (not persistent)
- TextBlob handles sentiment analysis
- Tailwind + shadcn/ui used for styling

---