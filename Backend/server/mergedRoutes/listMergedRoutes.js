import { findAllMergedRouteCoordinates } from "./mergedRoutesData.js";
import { disconnectDb } from "../db.js";

let mergedRoutes = await findAllMergedRouteCoordinates()
console.log(mergedRoutes)

await disconnectDb()
