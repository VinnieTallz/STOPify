import express from 'express';
import { collection } from '../db.js';
import { ObjectId } from 'mongodb';


const router = express.Router();


//fetches bus stops nearby (probably using geospatial query)
router.get('/nearby', async (req, res) => {
    try {
      const { lat, lng, radius } = req.query;
      
      if (!lat || !lng || !radius) {
        return res.status(400).json({ message: 'Missing required query parameters: lat, lng, radius' });
      }
    // console.log(`Query parameters - Lat: ${lat}, Lng: ${lng}, Radius: ${radius}`);
  
    const busStopsCollection = await collection('mergedRoutes');
    const query = {
        location: {
          $nearSphere: {
            $geometry: { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
            $maxDistance: parseInt(radius),
          }
        }
      };
    //   console.log('MongoDB Query:', query);
  
      const nearbyBusStops = await busStopsCollection.find(query).toArray();

    //   console.log('Nearby Bus Stops:', nearbyBusStops);
  
      res.json(nearbyBusStops); 
    } catch (err) {
      console.error('Error fetching nearby bus stops:', err);
      res.status(500).json({ message: 'Unable to fetch bus stops' });
    }
  });


  
  // to get bus information for a specific bus stop
router.get("/:id/info", async function (req, res) {
    const stopId = req.params.id;
    // console.log("stop id",stopId);
    try {
        // Ensure the stopId is a valid ObjectId string
          if (!ObjectId.isValid(stopId)) {
            return res.status(400).json({ error: 'Invalid stop ID format' });
        }
        const objectId = new ObjectId(stopId); // Convert the string to ObjectId
        const busStopsCollection = await collection('transitStops');
        const busInfo = await busStopsCollection.find({ _id: objectId }).toArray();
        if (busInfo === null) {
            res.status(404).json({ error: 'Bus information not found for this stop' });
          } else {
            res.send(busInfo); 
          }
        } catch (error) {
          console.error('Error fetching bus information:', error);
          res.status(500).json({ error: 'Error fetching bus information', message: error.message });
        }
});

export default router
