import { MongoClient } from "mongodb";
import dotenv from 'dotenv'
dotenv.config()

const mongo_uri = "mongodb://localhost:27017/"
console.log(mongo_uri)
let client = null  // start disconnected

export async function db() {
    if (client === null) {
        client = new MongoClient(mongo_uri)
        await client.connect()
    }
    return client.db()
}

export async function collection(name) {
    const database = await db()
    return database.collection(name)
}

export async function disconnectDb() {
    if (client) {
        await client.close()
        client = null
    }
}


