import { ObjectId } from "mongodb"
import { collection } from "../db.js"

export async function findAllRouteLines(nameFragment) {
    const mongoQuery = {}
    if (nameFragment !== undefined) {
        mongoQuery.name = nameFragment
    }
    const routeLineCollection = await collection('routeLines')
    const cursor = await routeLineCollection.find(mongoQuery) // no query finds everything!
    const routeLines = await cursor.toArray()
    return routeLines
}

export async function findAllRouteLineCoordinates(bus_number) {
    console.log("hi")
    const mongoQuery = {}
    if (route_number !== undefined) {
        mongoQuery.bus_number = bus_number
    }
    const routeLinesCollection = await collection('routeLines')
    console.log("line 23")
    const cursor = await routeLinesCollection.find(mongoQuery).project( {
        _id: 0, // Exclude the _id field
        coordinates: '$location.coordinates' // Extract coordinates
      }) // no query finds everything!
    console.log("line 27")

    const routeLines = await cursor.toArray()
    console.log(cursor)
    return routeLines
}

// find routelines within a given radius from UserLocation (default is 0.5 km)
export const findRouteLinesNearMe = async (latitude, longitude) => {
  try {
    const radiusInMeters = 500;  // 0.5 km = 500 meters

    // Perform geospatial query to find nearby routelines
    const nearbyRouteLines = await routeLine.aggregate([
      {
        $geoNear: {
          near: { type: 'Point', coordinates: [longitude, latitude] },  // [longitude, latitude]
          distanceField: 'distance',
          maxDistance: radiusInMeters,  // Limit to 500 meters
          spherical: true,
        },
      },
    ]);
    return nearbyRouteLines;  // Return the nearby routelines
  } catch (error) {
    console.error("Error in findRouteLinesNearMe:", error);
    throw new Error('Error fetching nearby routelines');
  }
};
export async function findRouteLineById(id) {
    const routeLinesCollection  = await collection('routeLines')
    const singleRouteLine =  await routeLinesCollection.findOne({_id: new ObjectId(id)})
    return singleRouteLine
}

export async function createRouteLine(data) {
    const routeLinesCollection  = await collection('routeLines')
    const insertResult = await routeLinesCollection.insertOne(data)
    console.log('Inserted routeLine ', insertResult.insertedId)
    return await routeLinesCollection.findOne({ _id: insertResult.insertedId })
}
