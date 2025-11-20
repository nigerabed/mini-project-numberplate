const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://admin:admin123@localhost:27017/numberplate_db?authSource=admin';

// Import the Car model schema
const carSchema = new mongoose.Schema({
  plate: { type: String, required: true, unique: true, uppercase: true, trim: true },
  model: { type: String, required: true, trim: true },
  fuel: { type: String, required: true },
  consumption: { type: String, required: true },
  euronorm: { type: String, required: true },
  insurance: { type: String, required: true },
  annualTax: { type: String, required: true },
  taxType: { type: String, required: true },
  image: { type: String, default: '' }
}, { timestamps: true });

const Car = mongoose.model('Car', carSchema);

async function seedDatabase() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Read the JSON file
    const jsonPath = path.join(__dirname, '../src/carData/cardata.json');
    const carData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

    console.log(`📊 Found ${carData.length} cars in JSON file`);

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await Car.deleteMany({});

    // Insert new data
    console.log('📥 Inserting car data...');
    const result = await Car.insertMany(carData);
    console.log(`✅ Successfully inserted ${result.length} cars into MongoDB`);

    // Display sample data
    const sampleCar = await Car.findOne();
    console.log('\n📋 Sample car data:');
    console.log(JSON.stringify(sampleCar, null, 2));

    // Count total
    const count = await Car.countDocuments();
    console.log(`\n✅ Total cars in database: ${count}`);
    
    console.log('\n🎉 Database seeding completed successfully!');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('\n👋 Database connection closed');
    process.exit(0);
  }
}

seedDatabase();
