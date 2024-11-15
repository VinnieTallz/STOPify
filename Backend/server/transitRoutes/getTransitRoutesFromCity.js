import { collection, disconnectDb } from '../db.js';

async function fetchDataAndStore() {
    const transitRoutesCollection = await collection('transitRoutes');
    const transitRoutes = [];
    const totalOffsets = 8000; // Modify if necessary
    const batchSize = 1000;

    try {
        // Loop through offsets in batches
        for (let offset = 0; offset < totalOffsets; offset += batchSize) {
            const response = await fetch(`https://data.calgary.ca/resource/pm3p-838w.geojson?$offset=${offset}`);
            
            if (!response.ok) {
                console.error(`Failed to fetch data at offset ${offset}. Status: ${response.status}`);
                continue; // Skip to the next batch on error
            }
            
            const data = await response.json();

            // Ensure data is in GeoJSON format with a 'features' array
            if (data && data.type === 'FeatureCollection' && Array.isArray(data.features)) {
                // Map over the features array in the GeoJSON
                const routes = data.features.map((feature) => ({
                    bus_number: feature.properties.route_short_name,
                    stop_number: feature.properties.teleride_number,
                    stop_address: feature.properties.stop_name,
                    status: feature.properties.status,
                    route_name: feature.properties.route_long_name,
                    location: feature.geometry // GeoJSON point object
                }));
                
                transitRoutes.push(...routes);
            } else {
                console.error('Invalid GeoJSON data format.');
            }
        }

        // Batch insert only new routes
        const newRoutes = [];
        for (const route of transitRoutes) {
            const existingRoute = await transitRoutesCollection.findOne({ bus_number: route.bus_number });
            if (!existingRoute) {
                newRoutes.push(route);
            } else {
                console.log(`City transit route ${route.bus_number} already exists.`);
            }
        }

        if (newRoutes.length) {
            await transitRoutesCollection.insertMany(newRoutes);
            console.log(`${newRoutes.length} new transit routes added to the database.`);
        } else {
            console.log('No new transit routes to add.');
        }
    } catch (error) {
        console.error("Error fetching or storing transit routes:", error);
    } finally {
        await disconnectDb();
    }
}

await fetchDataAndStore();
