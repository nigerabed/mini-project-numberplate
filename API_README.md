# Numberplate Lookup System - Backend API

This project now includes a MongoDB backend API for searching Danish vehicle registration data.

## 🚀 Features

- **MongoDB Database**: Stores car registration data
- **RESTful API**: Next.js API routes for searching cars
- **Docker Setup**: Containerized MongoDB instance
- **Search Functionality**: Search by number plate or car model

## 📋 Prerequisites

- Node.js (v18+)
- Docker & Docker Compose
- npm or yarn

## 🛠️ Setup Instructions

### 1. Start MongoDB with Docker

```bash
docker-compose up -d
```

This will start MongoDB on port 27017 with:
- Username: `admin`
- Password: `admin123`
- Database: `numberplate_db`

### 2. Install Dependencies

```bash
npm install
```

### 3. Seed the Database

Populate MongoDB with initial car data:

```bash
npm run seed
```

This will insert all car data from `src/carData/cardata.json` into MongoDB.

### 4. Start the Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 🔌 API Endpoints

### Search Cars
```
GET /api/cars/search?q={query}
```

**Parameters:**
- `q` - Search query (plate number or car model)

**Example:**
```bash
curl http://localhost:3000/api/cars/search?q=AB12345
```

**Response:**
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "_id": "...",
      "plate": "AB12345",
      "model": "Toyota Corolla",
      "fuel": "Benzin",
      "consumption": "19 km/l",
      "euronorm": "Euro V",
      "insurance": "Tryg Forsikring",
      "annualTax": "1500 kr",
      "taxType": "Grøn ejerafgift",
      "image": "https://...",
      "createdAt": "...",
      "updatedAt": "..."
    }
  ]
}
```

### Get All Cars
```
GET /api/cars?limit={limit}&skip={skip}
```

**Parameters:**
- `limit` - Number of results (default: 50)
- `skip` - Number to skip for pagination (default: 0)

**Example:**
```bash
curl http://localhost:3000/api/cars?limit=10
```

### Add New Car
```
POST /api/cars
Content-Type: application/json
```

**Body:**
```json
{
  "plate": "XY98765",
  "model": "Volvo V90",
  "fuel": "Diesel",
  "consumption": "18 km/l",
  "euronorm": "Euro VI",
  "insurance": "Tryg Forsikring",
  "annualTax": "2200 kr",
  "taxType": "Grøn ejerafgift",
  "image": "https://..."
}
```

## 🗄️ Database Schema

**Car Collection:**
```javascript
{
  plate: String (unique, indexed),
  model: String (indexed),
  fuel: String,
  consumption: String,
  euronorm: String,
  insurance: String,
  annualTax: String,
  taxType: String,
  image: String,
  timestamps: true
}
```

## 🐳 Docker Commands

**Start MongoDB:**
```bash
docker-compose up -d
```

**Stop MongoDB:**
```bash
docker-compose down
```

**View logs:**
```bash
docker-compose logs -f mongodb
```

**Connect to MongoDB shell:**
```bash
docker exec -it numberplate-mongodb mongosh -u admin -p admin123 --authenticationDatabase admin
```

## 📝 Environment Variables

Create a `.env.local` file (already created):

```
MONGODB_URI=mongodb://admin:admin123@localhost:27017/numberplate_db?authSource=admin
NODE_ENV=development
```

## 🔄 Re-seeding Database

To clear and re-populate the database:

```bash
npm run seed
```

## 📦 Project Structure

```
├── docker-compose.yml          # Docker configuration
├── scripts/
│   └── seed.js                 # Database seeding script
├── src/
│   ├── app/
│   │   └── api/
│   │       └── cars/
│   │           ├── route.js    # GET/POST all cars
│   │           └── search/
│   │               └── route.js # Search endpoint
│   ├── lib/
│   │   └── mongodb.js          # Database connection
│   ├── models/
│   │   └── Car.js              # Mongoose model
│   └── components/
│       └── Search/
│           └── Search.jsx      # Updated to use API
```

## 🎯 Next Steps

- Add pagination to search results
- Implement car detail pages
- Add authentication for POST/PUT/DELETE operations
- Add data validation and error handling
- Implement caching with Redis
- Add API rate limiting

## 🐛 Troubleshooting

**MongoDB connection issues:**
```bash
# Check if MongoDB is running
docker ps

# Restart MongoDB
docker-compose restart mongodb
```

**Seed script fails:**
```bash
# Ensure MongoDB is running
docker-compose ps

# Check MongoDB logs
docker-compose logs mongodb
```

## 📄 License

MIT
