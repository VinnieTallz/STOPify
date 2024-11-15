import express from 'express';
import { collection } from '../db.js';

const router = express.Router();
// This mergedRoutes fetches bus mergedroute data nearby ( using geospatial query)
router.get('/nearby', async (req, res) => {
    try {
      const { lat, lng, radius } = req.query;
      
      if (!lat || !lng || !radius) {
        return res.status(400).json({ message: 'Missing required query parameters: lat, lng, radius' });
      }
      // Log the input parameters
    console.log(`Query parameters - Lat: ${lat}, Lng: ${lng}, Radius: ${radius}`);
  
      const busMergedRoutesCollection = await collection('mergedRoutes');
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
  
      const nearbyBusMergedRoutes = await busMergedRoutesCollection.find(query).toArray();
  
      // Log the results
      console.log('Nearby Bus mergedRoutes:', nearbyBusMergedRoutes);
  
      res.json(nearbyBusMergedRoutes);  // Send back the nearby bus mergedroutes
    } catch (err) {
      console.error('Error fetching nearby bus mergedroutes:', err);
      res.status(500).json({ message: 'Unable to fetch bus mergedroutes' });
    }
  });


  export default router
 console.log();