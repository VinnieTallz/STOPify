import express from 'express';
import { collection } from '../db.js';

const router = express.Router();
// This route fetches bus stops nearby (probably using geospatial query)
router.get('/nearby', async (req, res) => {
    try {
      const { lat, lng, radius } = req.query;
      
      if (!lat || !lng || !radius) {
        return res.status(400).json({ message: 'Missing required query parameters: lat, lng, radius' });
      }
      // Log the input parameters
    console.log(`Query parameters - Lat: ${lat}, Lng: ${lng}, Radius: ${radius}`);
  
      const busStopsCollection = await collection('transitStops');
    // Log the query going to MongoDB
    const query = {
        location: {
          $nearSphere: {
            $geometry: { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
            $maxDistance: parseInt(radius),
          }
        }
      };
      console.log('MongoDB Query:', query);
  
      const nearbyBusStops = await busStopsCollection.find(query).toArray();
  
      // Log the results
      console.log('Nearby Bus Stops:', nearbyBusStops);
  
      res.json(nearbyBusStops);  // Send back the nearby bus stops
    } catch (err) {
      console.error('Error fetching nearby bus stops:', err);
      res.status(500).json({ message: 'Unable to fetch bus stops' });
    }
  });


  export default router
 