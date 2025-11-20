import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
  plate: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true,
    index: true
  },
  model: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  fuel: {
    type: String,
    required: true
  },
  consumption: {
    type: String,
    required: true
  },
  euronorm: {
    type: String,
    required: true
  },
  insurance: {
    type: String,
    required: true
  },
  annualTax: {
    type: String,
    required: true
  },
  taxType: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

// Create text index for search
carSchema.index({ plate: 'text', model: 'text' });

export default mongoose.models.Car || mongoose.model('Car', carSchema);
