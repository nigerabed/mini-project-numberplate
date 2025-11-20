// Simple Express Backend Server
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5001; // Changed to 5001 to avoid conflict

// Middleware
app.use(cors()); // Allow frontend to access backend
app.use(express.json()); // Parse JSON bodies

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://admin:admin123@localhost:27017/numberplate_db?authSource=admin';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Car Model (Schema)
const carSchema = new mongoose.Schema({
  plate: { type: String, required: true, unique: true },
  model: { type: String, required: true },
  fuel: String,
  consumption: String,
  euronorm: String,
  insurance: String,
  annualTax: String,
  taxType: String,
  image: String,
}, { timestamps: true });

const Car = mongoose.model('Car', carSchema);

// ========== API ROUTES ==========

// 1. GET all cars
app.get('/api/cars', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    
    const cars = await Car.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });
    
    const total = await Car.countDocuments();
    
    res.json({
      success: true,
      data: cars,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch cars' });
  }
});

// 2. Search cars
app.get('/api/cars/search', async (req, res) => {
  try {
    const query = req.query.q;
    
    if (!query) {
      return res.status(400).json({ success: false, error: 'Search query is required' });
    }
    
    // Search by plate or model name
    const cars = await Car.find({
      $or: [
        { plate: { $regex: query, $options: 'i' } },
        { model: { $regex: query, $options: 'i' } }
      ]
    });
    
    res.json({
      success: true,
      count: cars.length,
      data: cars
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, error: 'Search failed' });
  }
});

// 3. GET single car by plate
app.get('/api/cars/:plate', async (req, res) => {
  try {
    const car = await Car.findOne({ plate: req.params.plate });
    
    if (!car) {
      return res.status(404).json({ success: false, error: 'Car not found' });
    }
    
    res.json({
      success: true,
      data: car
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch car' });
  }
});

// 4. CREATE new car
app.post('/api/cars', async (req, res) => {
  try {
    const car = await Car.create(req.body);
    
    res.status(201).json({
      success: true,
      data: car
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, error: 'Failed to create car' });
  }
});

// 5. UPDATE car
app.put('/api/cars/:plate', async (req, res) => {
  try {
    const car = await Car.findOneAndUpdate(
      { plate: req.params.plate },
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!car) {
      return res.status(404).json({ success: false, error: 'Car not found' });
    }
    
    res.json({
      success: true,
      data: car
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, error: 'Failed to update car' });
  }
});

// 6. DELETE car
app.delete('/api/cars/:plate', async (req, res) => {
  try {
    const car = await Car.findOneAndDelete({ plate: req.params.plate });
    
    if (!car) {
      return res.status(404).json({ success: false, error: 'Car not found' });
    }
    
    res.json({
      success: true,
      message: 'Car deleted successfully'
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, error: 'Failed to delete car' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`📊 API endpoints:`);
  console.log(`   GET  http://localhost:${PORT}/api/cars`);
  console.log(`   GET  http://localhost:${PORT}/api/cars/search?q=BMW`);
  console.log(`   GET  http://localhost:${PORT}/api/cars/AB12345`);
});
