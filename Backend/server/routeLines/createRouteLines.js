

import { disconnectDb } from "../db.js";
import { createRouteLine } from "./routeLineData.js";

if (process.argv.length < 4) {
    console.log('Usage: node createRouteLine <route_line> <lon,lat> [location]')
    process.exit(1)
}

const name = process.argv[2]
console.log(hello);

const coordinates = process.argv[3].split(',')
const lon = Number.parseFloat(coordinates[0])
const lat = Number.parseFloat(coordinates[1])
const location = { 
    type: "MultiLineString", 
    coordinates: parsedCoordinates
}

const address = process.argv[4]

await createRouteLine({
    bus_number,
    community,
    location,
})
await disconnectDb()