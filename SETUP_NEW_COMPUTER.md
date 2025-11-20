# 🚀 Setup on New Computer

## Prerequisites
- Install **Node.js** (v18 or higher)
- Install **Docker Desktop**
- Install **Git**

## Step-by-Step Setup

### 1. Clone the Project
```bash
git clone https://github.com/nigerabed/mini-project-numberplate.git
cd mini-project-numberplate
```

### 2. Install Dependencies

**Frontend:**
```bash
npm install
```

**Backend:**
```bash
cd backend
npm install
cd ..
```

### 3. Start Database (MongoDB)
```bash
docker compose up -d
```

This will:
- Download MongoDB image (first time only)
- Start MongoDB on port `27017`
- Create database: `numberplate_db`
- Username: `admin` / Password: `admin123`

### 4. Import Data to Database

**Option A: Using the seed script**
```bash
npm run seed
```

**Option B: Manual import (if you have a backup)**
```bash
# If you have a MongoDB dump
docker exec -i mini-project-numberplate-mongodb-1 mongorestore --username admin --password admin123 --authenticationDatabase admin --db numberplate_db /path/to/backup
```

### 5. Start Backend Server
```bash
cd backend
npm run dev
```
Backend runs on: `http://localhost:5001`

### 6. Start Frontend Server
**In a new terminal:**
```bash
npm run dev
```
Frontend runs on: `http://localhost:3000`

## 🎯 Quick Start (All Commands)

```bash
# 1. Clone and install
git clone https://github.com/nigerabed/mini-project-numberplate.git
cd mini-project-numberplate
npm install
cd backend && npm install && cd ..

# 2. Start database
docker compose up -d

# 3. Import data
npm run seed

# 4. Start backend (Terminal 1)
cd backend && npm run dev

# 5. Start frontend (Terminal 2 - open new terminal)
npm run dev
```

## ✅ Verify Setup

**Check database:**
```bash
docker ps
# Should show: mini-project-numberplate-mongodb-1
```

**Check backend:**
```bash
curl http://localhost:5001/api/cars/search?q=BMW
# Should return: {"success":true,"count":2,"data":[...]}
```

**Check frontend:**
Open browser: `http://localhost:3000`

## 🗄️ Database Info

- **Host:** `localhost:27017`
- **Database:** `numberplate_db`
- **Username:** `admin`
- **Password:** `admin123`
- **Collection:** `cars`

## 📦 Data Export (For Backup)

**Export current data:**
```bash
docker exec mini-project-numberplate-mongodb-1 mongodump --username admin --password admin123 --authenticationDatabase admin --db numberplate_db --out /tmp/backup

docker cp mini-project-numberplate-mongodb-1:/tmp/backup ./backup
```

**Import on new computer:**
```bash
# Copy backup folder to new computer
# Then run:
docker cp ./backup mini-project-numberplate-mongodb-1:/tmp/backup

docker exec mini-project-numberplate-mongodb-1 mongorestore --username admin --password admin123 --authenticationDatabase admin --db numberplate_db /tmp/backup/numberplate_db
```

## 🔧 Troubleshooting

**Database won't start:**
```bash
docker compose down
docker compose up -d
```

**Port already in use:**
```bash
# Check what's using the port
lsof -i:5001  # Backend
lsof -i:3000  # Frontend
lsof -i:27017 # MongoDB

# Kill process
kill -9 <PID>
```

**Data not showing:**
```bash
# Re-run seed script
npm run seed
```

## 🎉 Done!

Your project should now be running:
- MongoDB: `localhost:27017`
- Backend: `http://localhost:5001`
- Frontend: `http://localhost:3000`
