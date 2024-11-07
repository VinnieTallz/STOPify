import { ObjectId } from "mongodb"
import { collection } from "../db.js"

export async function findAllTransitStops(nameFragment) {
    const mongoQuery = {}
    if (nameFragment !== undefined) {
        mongoQuery.name = nameFragment
    }
    const transitStopsCollection = await collection('transitStops')
    const cursor = await transitStopsCollection.find(mongoQuery) // no query finds everything!
    const transitStops = await cursor.toArray()
    return transitStops
}

export async function findAllTransitStopCoordinates(stop_number) {
    console.log("hi")
    const mongoQuery = {}
    if (stop_number !== undefined) {
        mongoQuery.stop_number = stop_number
    }
    const transitStopsCollection = await collection('transitStops')
    console.log("line 23")
    const cursor = await transitStopsCollection.find(mongoQuery).project( {
        _id: 0, // Exclude the _id field
        coordinates: '$location.coordinates' // Extract coordinates
      }) // no query finds everything!
    console.log("line 27")

    const transitStops = await cursor.toArray()
    console.log(cursor)
    return transitStops
}

// find stops within a given radius from UserLocation (default is 0.5 km)
export const findStopsNearMe = async (latitude, longitude) => {
  try {
    const radiusInMeters = 500;  // 0.5 km = 500 meters

    // Perform geospatial query to find nearby stops
    const nearbyStops = await TransitStop.aggregate([
      {
        $geoNear: {
          near: { type: 'Point', coordinates: [longitude, latitude] },  // [longitude, latitude]
          distanceField: 'distance',
          maxDistance: radiusInMeters,  // Limit to 500 meters
          spherical: true,
        },
      },
    ]);
    return nearbyStops;  // Return the nearby stops
  } catch (error) {
    console.error("Error in findStopsNearMe:", error);
    throw new Error('Error fetching nearby stops');
  }
};
export async function findTransitStopById(id) {
    const transitStopsCollection  = await collection('transitStops')
    const singleTransitStop =  await transitStopsCollection.findOne({_id: new ObjectId(id)})
    return singleTransitStop
}

export async function createTransitStop(data) {
    const transitStopsCollection  = await collection('transitStops')
    const insertResult = await transitStopsCollection.insertOne(data)
    console.log('Inserted transitStop ', insertResult.insertedId)
    return await transitStopsCollection.findOne({ _id: insertResult.insertedId })
}
