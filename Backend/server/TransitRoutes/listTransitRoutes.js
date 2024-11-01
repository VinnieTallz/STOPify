import { findAllTransitRoutes } from "./TransitRouteData.js";
import { disconnectDb } from "../db.js";

let transitRoutes = await findAllTransitRoutes()
console.log(transitRoutes)
await disconnectDb()
