# 🚀 Separate Backend & Frontend Guide

## 📁 Project Structure

```
mini-project-numberplate/
├── backend/              # Express Backend (Port 5001)
│   ├── server.js        # All backend code in ONE file
│   ├── package.json
│   └── .env
│
├── src/                 # Next.js Frontend (Port 3000)
│   ├── app/
│   │   ├── page.js     # Home page
│   │   └── layout.js
│   └── components/
│       ├── Search/     # Uses fetch to backend
│       ├── Header/
│       └── Footer/
│
└── docker-compose.yml   # MongoDB database
```

## 🎯 How to Run

### Step 1: Start Database
```bash
docker compose up
```
MongoDB runs on: `localhost:27017`

### Step 2: Start Backend (Port 5001)
```bash
cd backend
npm run dev
```
Backend runs on: `http://localhost:5001`

### Step 3: Start Frontend (Port 3000)
```bash
# In a new terminal, from root folder
npm run dev
```
Frontend runs on: `http://localhost:3000`

## 🔌 API Endpoints (Backend: Port 5001)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cars` | Get all cars |
| GET | `/api/cars/search?q=BMW` | Search cars |
| GET | `/api/cars/AB12345` | Get single car |
| POST | `/api/cars` | Create new car |
| PUT | `/api/cars/AB12345` | Update car |
| DELETE | `/api/cars/AB12345` | Delete car |

## 💻 Frontend Calls Backend

**Example in `Search.jsx`:**
```javascript
// Frontend (Port 3000) → Backend (Port 5001)
const response = await fetch('http://localhost:5001/api/cars/search?q=BMW');
const data = await response.json();

if (data.success) {
  console.log(data.data); // Array of cars
}
```

## 📝 Backend Code (backend/server.js)

Everything in **ONE simple file**:

```javascript
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Allow frontend to call backend
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://...');

// Define Car model
const Car = mongoose.model('Car', carSchema);

// API routes
app.get('/api/cars', async (req, res) => {
  const cars = await Car.find();
  res.json({ success: true, data: cars });
});

// Start server
app.listen(5001);
```

## 🔑 Key Points

### 1. **Two Separate Servers**
- **Backend (Express):** Port 5001 - Handles database & API
- **Frontend (Next.js):** Port 3000 - Shows UI to users

### 2. **CORS Enabled**
Backend uses `cors()` so frontend can call it from different port

### 3. **Simple fetch()**
Frontend uses regular JavaScript fetch to call backend:
```javascript
fetch('http://localhost:5001/api/cars/search?q=BMW')
```

### 4. **No Complex Layers**
- Backend: Everything in `backend/server.js`
- Frontend: React components use simple fetch
- Database: MongoDB in Docker

## 🛠️ Development Workflow

```bash
# Terminal 1 - Database
docker compose up

# Terminal 2 - Backend
cd backend
npm run dev

# Terminal 3 - Frontend
npm run dev
```

## 📦 What Each Does

### Backend (Express - Port 5001)
- Connects to MongoDB
- Provides REST API endpoints
- Returns JSON responses
- Handles database operations

### Frontend (Next.js - Port 3000)
- Shows user interface
- Sends fetch requests to backend
- Displays data from backend
- Handles user interactions

### Database (MongoDB - Port 27017)
- Stores all car data
- Accessed only by backend
- Runs in Docker container

## ✅ Benefits

1. **Simple to understand** - Each part has one job
2. **Easy to debug** - Check backend logs separately
3. **Can deploy separately** - Backend on one server, frontend on another
4. **No mixing** - Backend is pure Express, Frontend is pure React

That's it! Super simple and beginner-friendly! 🎉
