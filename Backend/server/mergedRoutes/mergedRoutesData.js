import { ObjectId } from "mongodb"
import { collection } from "../db.js"

export async function findAllMergedRoutes(nameFragment) {
    const mongoQuery = {}
    if (nameFragment !== undefined) {
        mongoQuery.name = nameFragment
    }
    const mergedRouteCollection = await collection('mergedRoutes')
    const cursor = await mergedRouteCollection.find(mongoQuery) // no query finds everything!
    const mergedRoutes = await cursor.toArray()
    return mergedRoutes
}

export async function findAllMergedRouteCoordinates(bus_number) {
    const mongoQuery = {}
    if (bus_number !== undefined) {
        mongoQuery.bus_number = bus_number
    }
    const mergedRoutesCollection = await collection('mergedRoutes')
    const cursor = await mergedRoutesCollection.find(mongoQuery).project( {
        _id: 0, // Exclude the _id field
        coordinates: '$location.coordinates' // Extract coordinates
      }) // no query finds everything!

    const mergedRoutes = await cursor.toArray()
    return mergedRoutes
}

// find mergedroutes within a given radius from UserLocation (default is 0.5 km)
export const findMergedRoutesNearMe = async (latitude, longitude) => {
  try {
    const radiusInMeters = 500;  // 0.5 km = 500 meters

    // Perform geospatial query to find nearby mergedroutes
    const nearbyMergedRoutes = await mergedRoute.aggregate([
      {
        $geoNear: {
          near: { type: 'Point', coordinates: [longitude, latitude] },  // [longitude, latitude]
          distanceField: 'distance',
          maxDistance: radiusInMeters,  // Limit to 500 meters
          spherical: true,
        },
      },
    ]);
    return nearbyMergedRoutes;  // Return the nearby mergedroutes
  } catch (error) {
    console.error("Error in findMergedRoutesNearMe:", error);
    throw new Error('Error fetching nearby mergedRoutes');
  }
};
export async function findMergedRouteById(id) {
    const mergedRoutesCollection  = await collection('mergedRoutes')
    const singleMergedRoute =  await mergedRoutesCollection.findOne({_id: new ObjectId(id)})
    return singleMergedRoute
}