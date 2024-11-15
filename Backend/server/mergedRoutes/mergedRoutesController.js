import { Router } from "express";
import {
  findAllMergedRoutes,
  findMergedRoutesNearMe,
  findMergedRouteById,
} from "./mergedRoutesData.js";

const router = Router();

// Get a particular mergedroute by its ID
router.get("/:mergedRouteId", async function (req, res) {
  const id = req.params.mergedRouteId;
  console.log(req.params);
  try {
    const mergedRoute = await findMergedRouteById(id);
    if (mergedRoute === null) {
      res.sendStatus(404); // Not found
    } else {
      res.send(mergedRoute); // Return the mergedroute data
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500); // Internal Server Error
  }
});

// List all mergedRoutes
router.get("/", async function (req, res) {
  try {
    const mergedRoutes = await findAllMergedRoutes();
    res.send(mergedRoutes); // Return the list of all mergedroutes
  } catch (error) {
    console.log(error);
    res.sendStatus(500); // Internal Server Error
  }
});

// Get nearby mergedroutes based on latitude and longitude
router.get("/nearby", async (req, res) => {
    const { latitude, longitude } = req.query;
  
    if (!latitude || !longitude) {
      return res.status(400).json({ error: "Latitude and longitude are required" });
    }
  
    try {
      const userLocation = {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      };
  
      // Get mergedroutes within 0.5 km from the user's location
      const nearbyMergedRoutes = await findMergedRoutesNearMe(userLocation.latitude, userLocation.longitude);
      res.json(nearbyMergedRoutes); // Return the nearby mergedroutes
    } catch (error) {
      console.error("Error fetching nearby mergedRoutes:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;
