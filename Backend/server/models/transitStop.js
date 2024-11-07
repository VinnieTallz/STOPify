import mongoose from 'mongoose';

// Define the TransitStop schema
const transitStopSchema = new mongoose.Schema({
  stop_number: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  location: {
    type: { 
      type: String, 
      enum: ['Point'],  // Geospatial type
      required: true 
    },
    coordinates: {
      type: [Number],  // [longitude, latitude]
      required: true,
    },
  },
});

// Create a geospatial index on the location field
transitStopSchema.index({ location: '2dsphere' });

const TransitStop = mongoose.model('TransitStop', transitStopSchema);

export { TransitStop };
