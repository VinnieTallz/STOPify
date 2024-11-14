import { Router } from "express";
import {
  findAllMergedRoutes,
  findMergedRoutesNearMe,
  findMergedRouteById,
} from "./mergedRouteData.js";

const router = Router();

// Get a particular mergedroute by its ID
router.get("/:routeLineId", async function (req, res) {
  const id = req.params.routeLineId;
  console.log(req.params);
  try {
    const routeLine = await findRouteLineById(id);
    if (routeLine === null) {
      res.sendStatus(404); // Not found
    } else {
      res.send(routeLine); // Return the routeline data
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500); // Internal Server Error
  }
});

// List all routelines
router.get("/", async function (req, res) {
  try {
    const routeLines = await findAllRouteLines();
    res.send(routeLines); // Return the list of all routelines
  } catch (error) {
    console.log(error);
    res.sendStatus(500); // Internal Server Error
  }
});

// Get nearby routeLines based on latitude and longitude
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
  
      // Get routelines within 0.5 km from the user's location
      const nearbyRouteLines = await findRouteLinesNearMe(userLocation.latitude, userLocation.longitude);
      res.json(nearbyRouteLines); // Return the nearby routelines
    } catch (error) {
      console.error("Error fetching nearby routeLines:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
});

// Create a new routeLine
router.post("/", async (req, res) => {
  console.log("Incoming POST on /api/routeLines with data");
  console.log(req.body);

  if (
    req.body.name &&
    req.body.location &&
    req.body.location.latitude &&
    req.body.location.longitude
  ) {
    const newRouteLine = await createRouteLine(req.body);
    return res.send(newRouteLine); // Return the newly created routeline
  } else {
    return res
      .status(400)
      .json({
        error: "Name and valid location (latitude, longitude) are required.",
      }); // Bad Request
  }
});

export default router;
