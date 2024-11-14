import { collection, disconnectDb } from '../db.js';

async function fetchDataAndStore() {
    const routeLinesCollection = await collection('routeLines');
    const routeLines = [];
    const totalOffsets = 8000; // Modify if necessary
    const batchSize = 1000;

    try {
        // Loop through offsets in batches
        for (let offset = 0; offset < totalOffsets; offset += batchSize) {
            const response = await fetch(`https://data.calgary.ca/resource/hpnd-riq4.geojson?$offset=${offset}`);
            
            if (!response.ok) {
                console.error(`Failed to fetch data at offset ${offset}. Status: ${response.status}`);
                continue; // Skip to the next batch on error
            }
            
            const data = await response.json();

            // Ensure data is in GeoJSON format with a 'features' array
            if (data && data.type === 'FeatureCollection' && Array.isArray(data.features)) {
                // Map over the features array in the GeoJSON
                const routes = data.features.map((feature) => {
                    const multilineString = feature.geometry.coordinates;
                    const parsedCoordinates = multilineString.map(line => line.map(coord => ({
                        longitude: coord[0],
                        latitude: coord[1]
                    })));

                    return {
                        bus_number: feature.properties.route_short_name,
                        community: feature.properties.route_long_name,
                        city_globalid: feature.properties.globalid,
                        location: {
                            type: "MultiLineString",
                            coordinates: parsedCoordinates
                        }
                    };
                });
                
                routeLines.push(...routes);
            } else {
                console.error('Invalid GeoJSON data format.');
            }
        }

        // Batch insert only new routeLines
        const newRouteLines = [];
        for (const routeLine of routeLines) {
            const existingRouteLine = await routeLinesCollection.findOne({ city_globalid: routeLine.city_globalid });
            if (!existingRouteLine) {
                newRouteLines.push(routeLine);
            } else {
                console.log(`City routeLine ${routeLine.city_globalid} already exists.`);
            }
        }

        if (newRouteLines.length) {
            await routeLinesCollection.insertMany(newRouteLines);
            console.log(`${newRouteLines.length} new transit route lines added to the database.`);
        } else {
            console.log('No new transit route lines to add.');
        }
    } catch (error) {
        console.error("Error fetching or storing transit route lines:", error);
    } finally {
        await disconnectDb();
    }
}

await fetchDataAndStore();
