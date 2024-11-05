import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

const uri = process.env.MONGO_URI; // MongoDB URI from the .env file
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export async function findStopsNearMe(UserLocation) {
  try {
    const database = client.db("CalgaryTransit"); // Use the correct database
    const transitStops = database.collection("transitStops");

    // Query for stops within 0.5 km of UserLocation
    const results = await transitStops
      .find({
        location: {
          $geoWithin: {
            $centerSphere: [
              [UserLocation.longitude, UserLocation.latitude],
              0.5 / 6378.1,
            ],
          },
        },
      })
      .toArray();

    return results;
  } finally {
    await client.close();
  }
}
