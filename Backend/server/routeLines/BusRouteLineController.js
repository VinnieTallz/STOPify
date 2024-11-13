import express from 'express';
import { collection } from '../db.js';

const router = express.Router();
// This routeLine fetches bus routeLiness nearby (probably using geospatial query)
router.get('/nearby', async (req, res) => {
    try {
      const { lat, lng, radius } = req.query;
      
      if (!lat || !lng || !radius) {
        return res.status(400).json({ message: 'Missing required query parameters: lat, lng, radius' });
      }
      // Log the input parameters
    console.log(`Query parameters - Lat: ${lat}, Lng: ${lng}, Radius: ${radius}`);
  
      const busRouteLinesCollection = await collection('routeLines');
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
  
      const nearbyBusRouteLines = await busRouteLinesCollection.find(query).toArray();
  
      // Log the results
      console.log('Nearby Bus RouteLines:', nearbyBusRouteLines);
  
      res.json(nearbyBusRouteLines);  // Send back the nearby bus routeLines
    } catch (err) {
      console.error('Error fetching nearby bus routeLines:', err);
      res.status(500).json({ message: 'Unable to fetch bus routeLines' });
    }
  });


  export default router
 