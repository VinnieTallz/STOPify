import { Router } from "express";
import {
  createTransitStop,
  findAllTransitStops,
  findStopsNearMe,
  findTransitStopById,
} from "./transitStopData.js";

const router = Router();

// Get a particular transitStop by its ID
router.get("/:transitStopId", async function (req, res) {
  const id = req.params.transitStopId;
  console.log(req.params);
  try {
    const transitStop = await findTransitStopById(id);
    if (transitStop === null) {
      res.sendStatus(404); // Not found
    } else {
      res.send(transitStop); // Return the transit stop data
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500); // Internal Server Error
  }
});

// List all transitStops
router.get("/", async function (req, res) {
  try {
    const transitStops = await findAllTransitStops();
    res.send(transitStops); // Return the list of all transit stops
  } catch (error) {
    console.log(error);
    res.sendStatus(500); // Internal Server Error
  }
});

// Get nearby transitStops based on latitude and longitude
// Get nearby transitStops based on latitude and longitude
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
  
      // Get stops within 0.5 km from the user's location
      const nearbyStops = await findStopsNearMe(userLocation.latitude, userLocation.longitude);
      res.json(nearbyStops); // Return the nearby stops
    } catch (error) {
      console.error("Error fetching nearby stops:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
});

// Create a new transitStop
router.post("/", async (req, res) => {
  console.log("Incoming POST on /api/transitStops with data");
  console.log(req.body);

  if (
    req.body.name &&
    req.body.location &&
    req.body.location.latitude &&
    req.body.location.longitude
  ) {
    const newTransitStop = await createTransitStop(req.body);
    return res.send(newTransitStop); // Return the newly created transit stop
  } else {
    return res
      .status(400)
      .json({
        error: "Name and valid location (latitude, longitude) are required.",
      }); // Bad Request
  }
});

export default router;
