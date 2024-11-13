import { ObjectId } from "mongodb"
import { collection } from "../db.js"

export async function findAllTransitRoutes(nameFragment) {
    const mongoQuery = {}
    if (nameFragment !== undefined) {
        mongoQuery.name = nameFragment
    }
    const transitRoutesCollection = await collection('transitRoutes')
    const cursor = await transitRoutesCollection.find(mongoQuery) // no query finds everything!
    const transitRoutes = await cursor.toArray()
    return transitRoutes
}

export async function findAllTransitRouteCoordinates(bus_number) {
    const mongoQuery = {}
    if (bus_number !== undefined) {
        mongoQuery.bus_number = bus_number
    }
    const transitRoutesCollection = await collection('transitRoutes')
    console.log("line 23")
    const cursor = await transitRoutesCollection.find(mongoQuery).project( {
        _id: 0, // Exclude the _id field
        coordinates: '$location.coordinates' // Extract coordinates
      }) // no query finds everything!
    console.log("line 27")

    const transitRoutes = await cursor.toArray()
    console.log(cursor)
    return transitRoutes
}

// find routes within a given radius from UserLocation (default is 0.5 km)
export const findRoutesNearMe = async (latitude, longitude) => {
  try {
    const radiusInMeters = 500;  // 0.5 km = 500 meters

    // Perform geospatial query to find nearby routes
    const nearbyRoutes = await TransitRoute.aggregate([
      {
        $geoNear: {
          near: { type: 'Point', coordinates: [longitude, latitude] },  // [longitude, latitude]
          distanceField: 'distance',
          maxDistance: radiusInMeters,  // Limit to 500 meters
          spherical: true,
        },
      },
    ]);
    return nearbyRoutes;  // Return the nearby routes
  } catch (error) {
    console.error("Error in findRoutesNearMe:", error);
    throw new Error('Error fetching nearby routes');
  }
};
export async function findTransitRouteById(id) {
    const transitRoutesCollection  = await collection('transitRoutes')
    const singleTransitRoute =  await transitRoutesCollection.findOne({_id: new ObjectId(id)})
    return singleTransitRoute
}

export async function createTransitRoute(data) {
    const transitRoutesCollection  = await collection('transitRoutes')
    const insertResult = await transitRoutesCollection.insertOne(data)
    console.log('Inserted transitRoute ', insertResult.insertedId)
    return await transitsCollection.findOne({ _id: insertResult.insertedId })
}
