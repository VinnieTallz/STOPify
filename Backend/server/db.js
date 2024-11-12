import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const mongo_uri = process.env.MONGO_URI || 'mongodb://localhost:27017/'
const dbName = process.env.DB_NAME || 'CalgaryTransit'  
// console.log(`Mongo URI: ${mongo_uri}, Database: ${dbName}`)

// const mongo_uri = "mongodb://localhost:27017/"
// console.log(mongo_uri)

let client = null  // start disconnected

export async function db() {
    if (client === null) {
        try {
            client = new MongoClient(mongo_uri)
            await client.connect()
        } catch (error) {
            console.error('Error connecting to MongoDB:', error)
            throw error
        }  
    }
    return client.db(dbName)
}

export async function collection(name) {
    const database = await db();
    return database.collection(name);
}

// Create the 2dsphere index when the app starts
export async function createGeospatialIndex() {
    const busStopsCollection = await collection('transitStops');
    await busStopsCollection.createIndex({ location: '2dsphere' });
    console.log("Geospatial index created on 'location' field.");
  }
  
  // Call the create index function once when the app starts
  createGeospatialIndex();

export async function disconnectDb() {
    if (client) {
        try {
            await client.close()
            client = null
        } catch (error) {
            console.error('Error disconnecting from MongoDB:', error)
        }
    }
}
