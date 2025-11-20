# Simple Beginner Guide

## 🚀 Project Structure (Easy to Understand!)

```
mini-project-numberplate/
├── src/
│   ├── app/
│   │   ├── api/                    # Backend API routes
│   │   │   └── cars/
│   │   │       ├── route.js        # Get all cars, Create car
│   │   │       ├── search/
│   │   │       │   └── route.js    # Search cars
│   │   │       └── [plate]/
│   │   │           └── route.js    # Get/Update/Delete single car
│   │   ├── page.js                 # Home page
│   │   └── numberplate/
│   │       └── page.js             # Search page
│   └── components/                 # React components
│       ├── Header/
│       ├── Search/
│       ├── Main/
│       └── Footer/
├── docker-compose.yml              # MongoDB database
└── package.json                    # Dependencies
```

## 📖 How It Works

### 1. **Database (MongoDB)**
- All car data is stored in MongoDB
- Start database: `docker compose up`
- Runs on: `localhost:27017`

### 2. **Backend API (Next.js API Routes)**

Each file handles one thing - super simple!

#### `src/app/api/cars/route.js`
```javascript
// GET - Get all cars
// Example: fetch('/api/cars')

// POST - Create new car
// Example: fetch('/api/cars', { method: 'POST', body: JSON.stringify(carData) })
```

#### `src/app/api/cars/search/route.js`
```javascript
// GET - Search cars by plate or model
// Example: fetch('/api/cars/search?q=BMW')
```

#### `src/app/api/cars/[plate]/route.js`
```javascript
// GET - Get one car
// Example: fetch('/api/cars/AB12345')

// PUT - Update car
// Example: fetch('/api/cars/AB12345', { method: 'PUT', body: ... })

// DELETE - Delete car
// Example: fetch('/api/cars/AB12345', { method: 'DELETE' })
```

### 3. **Frontend (React Components)**

#### `src/components/Search/Search.jsx`
```javascript
// Simple fetch example:
const handleSearch = async (query) => {
  const response = await fetch(`/api/cars/search?q=${query}`);
  const data = await response.json();
  
  if (data.success) {
    // Show results
    console.log(data.data); // Array of cars
  }
};
```

## 🎯 Each API File Contains:

1. **Database Connection** - Connects to MongoDB
2. **Car Model** - Defines what a car looks like
3. **API Functions** - GET, POST, PUT, DELETE

**All in ONE file!** No complex folders, no confusing imports.

## 💡 How to Use

### Start the Project:
```bash
# 1. Start database
docker compose up

# 2. Start Next.js (in another terminal)
npm run dev

# 3. Open browser
http://localhost:3000
```

### Make API Calls from Frontend:
```javascript
// Search for cars
const searchCars = async (query) => {
  const res = await fetch(`/api/cars/search?q=${query}`);
  const data = await res.json();
  return data.data; // Returns array of cars
};

// Get all cars
const getAllCars = async () => {
  const res = await fetch('/api/cars');
  const data = await res.json();
  return data.data;
};

// Get one car
const getCar = async (plate) => {
  const res = await fetch(`/api/cars/${plate}`);
  const data = await res.json();
  return data.data;
};
```

## 📝 API Response Format

All APIs return the same simple format:

```javascript
// Success
{
  "success": true,
  "data": [...],      // Your data here
  "count": 2          // For search results
}

// Error
{
  "success": false,
  "error": "Error message"
}
```

## 🔑 Key Points for Beginners

1. **Each API route file is independent** - Everything you need is in one file
2. **Use `fetch()` from frontend** - Simple JavaScript fetch, no libraries needed
3. **MongoDB connection is automatic** - It connects when needed, you don't worry about it
4. **JSON responses** - Everything returns JSON, easy to work with

## 🛠️ Adding a New API Endpoint

Create a new file in `src/app/api/yourname/route.js`:

```javascript
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

// Copy connection code from any other route file

export async function GET(request) {
  try {
    await connectDB();
    
    // Your logic here
    const data = await Car.find();
    
    return NextResponse.json({
      success: true,
      data: data
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
```

That's it! Simple and easy to understand! 🎉
