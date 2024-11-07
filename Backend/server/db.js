import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

// Use the environment variable for Mongo URI if available, fallback to localhost if not
const mongo_uri = process.env.MONGO_URI || "mongodb://localhost:27017/";

let client = null; // start disconnected

export async function db() {
    if (client === null) {
        client = new MongoClient(mongo_uri);
        await client.connect();
        
        // Ensure the 'location' field has a 2dsphere index
        await createGeospatialIndex();
    }
    return client.db();
}

// Ensure the 'location' field has a 2dsphere index
async function createGeospatialIndex() {
    const transitStopsCollection = await collection('transitStops');
    const indexExists = await transitStopsCollection.indexExists('location_2dsphere');
    
    if (!indexExists) {
        await transitStopsCollection.createIndex({ location: '2dsphere' });
        console.log("2dsphere index created on 'location' field.");
    } else {
        console.log("2dsphere index already exists on 'location' field.");
    }
}

export async function collection(name) {
    const database = await db();
    return database.collection(name);
}

export async function disconnectDb() {
    if (client) {
        await client.close();
        client = null;
    }
}
