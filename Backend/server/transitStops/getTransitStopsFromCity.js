import { collection, disconnectDb } from '../db.js';

async function fetchDataAndStore() {
    const transitStopsCollection = await collection('transitStops');
    const transitStops = [];
    const totalOffsets = 8000; // Modify if necessary
    const batchSize = 1000;

    try {
        // Loop through offsets in batches
        for (let offset = 0; offset < totalOffsets; offset += batchSize) {
            const response = await fetch(`https://data.calgary.ca/resource/muzh-c9qc.json?$offset=${offset}`);
            
            if (!response.ok) {
                console.error(`Failed to fetch data at offset ${offset}. Status: ${response.status}`);
                continue; // Skip to the next batch on error
            }
            
            const data = await response.json();
            
            // Map JSON data to desired format
            const stops = data.map((cityTransitStop) => ({
                stop_number: cityTransitStop.teleride_number,
                address: cityTransitStop.stop_name,
                city_globalid: cityTransitStop.globalid,
                location: cityTransitStop.point,
            }));
            
            transitStops.push(...stops);
        }

        // Batch insert only new stops
        const newStops = [];
        for (const stop of transitStops) {
            const existingStop = await transitStopsCollection.findOne({ city_globalid: stop.city_globalid });
            if (!existingStop) {
                newStops.push(stop);
            } else {
                console.log(`City transit stop ${stop.city_globalid} already exists.`);
            }
        }

        if (newStops.length) {
            await transitStopsCollection.insertMany(newStops);
            console.log(`${newStops.length} new transit stops added to the database.`);
        } else {
            console.log('No new transit stops to add.');
        }
    } catch (error) {
        console.error("Error fetching or storing transit stops:", error);
    } finally {
        await disconnectDb();
    }
}

await fetchDataAndStore();
