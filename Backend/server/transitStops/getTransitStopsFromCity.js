import { collection, disconnectDb } from '../db.js'

// fetch JSON data
const response = await fetch('https://data.calgary.ca/resource/muzh-c9qc.json?$query=SELECT%20%60teleride_number%60%2C%20%60stop_name%60%2C%20%60status%60%2C%20%60globalid%60%2C%20%60point%60')
if (response.status!==200) {
    throw new Error('Request to data.calgary.ca failed')
}
const cityTransitStops = await response.json()

const transitStops = cityTransitStops.map((cityTransitStop) => {
    return {
        stop_number: cityTransitStop.teleride_number,
        address: cityTransitStop.stop_name,
        city_globalid: cityTransitStop.globalid,
        location: cityTransitStop.point
    }
})

// write to mongo
const transitStopsCollection = await collection('transitStops')
for (let i=0; i < transitStops.length; i++) {
    let cityTransitStop = transitStops[i]
    const existingTransitStop = await transitStopsCollection.findOne({ 
        city_globalid: cityTransitStop.city_globalid
    })
    if (!existingTransitStop) {
        console.log('Creating transitStop', cityTransitStop)
        await transitStopsCollection.insertOne(cityTransitStop)
    }
    else {
        console.log('City transitStop', cityTransitStop.city_globalid, 'already exists')
    }
}
await disconnectDb()