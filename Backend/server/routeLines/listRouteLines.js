import { findAllRouteLineCoordinates } from "./routeLineData.js";
import { disconnectDb } from "../db.js";

let routeLines = await findAllRouteLineCoordinates()
console.log(routeLines)
await disconnectDb()
