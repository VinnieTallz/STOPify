import { disconnectDb } from "../db.js";
import { createTransitRoute } from "./TransitRouteData.js";

if (process.argv.length < 4) {
    console.log('Usage: node createTransitRoute <name> <lon,lat> [address]')
    process.exit(1)
}

const name = process.argv[2]

const coordinates = process.argv[3].split(',')
const lon = Number.parseFloat(coordinates[0])
const lat = Number.parseFloat(coordinates[1])
const location = { 
    type: "Point", 
    coordinates: [ lon, lat ] 
}

const address = process.argv[4]

await createTransitRoute({
    name,
    location,
    address
})
await disconnectDb()