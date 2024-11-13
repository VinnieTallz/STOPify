import { Router } from "express";
import {
  createTransitRoute,
  findAllTransitRoutes,
  findRoutesNearMe,
  findTransitRouteById,
} from "./routeLineData.js";

const router = Router();

// Get a particular transitRoute by its ID
router.get("/:transitRouteId", async function (req, res) {
  const id = req.params.transitRouteId;
  console.log(req.params);
  try {
    const transitRoute = await findTransitRouteById(id);
    if (transitRoute === null) {
      res.sendStatus(404); // Not found
    } else {
      res.send(transitRoute); // Return the transit route data
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500); // Internal Server Error
  }
});

// List all transitRoutes
router.get("/", async function (req, res) {
  try {
    const transitRoutes = await findAllTransitRoutes();
    res.send(transitStops); // Return the list of all transit routes
  } catch (error) {
    console.log(error);
    res.sendStatus(500); // Internal Server Error
  }
});

// Get nearby transitRoutes based on latitude and longitude
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
  
      // Get routes within 0.5 km from the user's location
      const nearbyRoutes = await findRoutesNearMe(userLocation.latitude, userLocation.longitude);
      res.json(nearbyRoutes); // Return the nearby routes
    } catch (error) {
      console.error("Error fetching nearby routes:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
});

// Create a new transitRoute
router.post("/", async (req, res) => {
  console.log("Incoming POST on /api/transitRoutes with data");
  console.log(req.body);

  if (
    req.body.name &&
    req.body.location &&
    req.body.location.latitude &&
    req.body.location.longitude
  ) {
    const newTransitRoute = await createTransitRoute(req.body);
    return res.send(newTransitRoute); // Return the newly created transit route
  } else {
    return res
      .status(400)
      .json({
        error: "Name and valid location (latitude, longitude) are required.",
      }); // Bad Request
  }
});

export default router;
