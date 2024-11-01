import { ObjectId } from "mongodb"
import { collection } from "../db.js"

export async function findAllTransitRoutes(nameFragment) {
    const mongoQuery = {}
    if (nameFragment !== undefined) {
        mongoQuery.name = nameFragment
    }
    const transitRoutesCollection = await collection('transitroutes')
    const cursor = await transitRoutesCollection.find(mongoQuery) // no query finds everything!
    const transitRoutes = await cursor.toArray()
    return transitRoutes
}

export async function findTransitRouteById(id) {
    const transitRoutesCollection  = await collection('transitroutes')
    const singleTransitRoute =  await transitRoutesCollection.findOne({_id: new ObjectId(id)})
    return singleTransitRoute
}

export async function createTransitRoute(data) {
    const transitRoutesCollection  = await collection('transitroutes')
    const insertResult = await transitRoutesCollection.insertOne(data)
    console.log('Inserted transitRoute ', insertResult.insertedId)
    return await transitRoutesCollection.findOne({ _id: insertResult.insertedId })
}