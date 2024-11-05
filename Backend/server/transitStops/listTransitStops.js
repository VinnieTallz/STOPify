import { findAllTransitStopCoordinates, findAllTransitStopCoordinates } from "./transitStopData.js";
import { disconnectDb } from "../db.js";

let transitStops = await findAllTransitStopCoordinates()
console.log(transitStops)
await disconnectDb()
