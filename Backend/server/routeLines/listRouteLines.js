import { findAllTransitRouteCoordinates } from "./routeLineData.js";
import { disconnectDb } from "../db.js";

let transitRoutes = await findAllTransitRouteCoordinates()
console.log(transitRoutes)
await disconnectDb()
