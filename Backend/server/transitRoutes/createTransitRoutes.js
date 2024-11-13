

import { disconnectDb } from "../db.js";
import { createTransitRoute } from "./transitRouteData.js";

if (process.argv.length < 4) {
    console.log('Usage: node createTransitRoute <bus_number> <lon,lat> [location]')
    process.exit(1)
}

const name = process.argv[2]
console.log(hello);

const coordinates = process.argv[3].split(',')
const lon = Number.parseFloat(coordinates[0])
const lat = Number.parseFloat(coordinates[1])
const location = { 
    type: "Point", 
    coordinates: [ lon, lat ] 
}

const address = process.argv[4]

await createTransitRoute({
    bus_number,
    route_name,
    stop_number,
    location,
})
await disconnectDb()