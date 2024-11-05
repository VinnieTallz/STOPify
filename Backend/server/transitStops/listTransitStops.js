import { findAllTransitStops } from "./transitStopData.js";
import { disconnectDb } from "../db.js";

let transitStops = await findAllTransitStops()
console.log(transitStops)
await disconnectDb()
