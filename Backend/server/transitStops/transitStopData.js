import { ObjectId } from "mongodb"
import { collection } from "../db.js"

export async function findAllTransitStops(nameFragment) {
    const mongoQuery = {}
    if (nameFragment !== undefined) {
        mongoQuery.name = nameFragment
    }
    const transitStopsCollection = await collection('transitStops')
    const cursor = await transitStopsCollection.find(mongoQuery) // no query finds everything!
    const transitStops = await cursor.toArray()
    return transitStops
}

export async function findTransitStopById(id) {
    const transitStopsCollection  = await collection('transitStops')
    const singleTransitStop =  await transitStopsCollection.findOne({_id: new ObjectId(id)})
    return singleTransitStop
}

export async function createTransitStop(data) {
    const transitStopsCollection  = await collection('transitStops')
    const insertResult = await transitStopsCollection.insertOne(data)
    console.log('Inserted transitStop ', insertResult.insertedId)
    return await transitStopsCollection.findOne({ _id: insertResult.insertedId })
}