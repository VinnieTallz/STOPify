import express from 'express';
import { collection } from '../db.js';

const router = express.Router();
// This route fetches bus routes nearby (probably using geospatial query)
router.get('/nearby', async (req, res) => {
    try {
      const { lat, lng, radius } = req.query;
      
      if (!lat || !lng || !radius) {
        return res.status(400).json({ message: 'Missing required query parameters: lat, lng, radius' });
      }
      // Log the input parameters
    console.log(`Query parameters - Lat: ${lat}, Lng: ${lng}, Radius: ${radius}`);
  
      const busRoutesCollection = await collection('transitRoutes');
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
  
      const nearbyBusRoutes = await busRoutesCollection.find(query).toArray();
  
      // Log the results
      console.log('Nearby Bus Routes:', nearbyBusRoutes);
  
      res.json(nearbyBusRoutes);  // Send back the nearby bus routes
    } catch (err) {
      console.error('Error fetching nearby bus routes:', err);
      res.status(500).json({ message: 'Unable to fetch bus routes' });
    }
  });


  export default router
 