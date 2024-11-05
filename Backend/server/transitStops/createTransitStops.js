import { disconnectDb } from "../db.js";
import { createTransitStop } from "./transitStopData.js";

if (process.argv.length < 4) {
    console.log('Usage: node createTransitStop <name> <lon,lat> [address]')
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

await createTransitStop({
    stop_number,
    address,
    location,
})
await disconnectDb()