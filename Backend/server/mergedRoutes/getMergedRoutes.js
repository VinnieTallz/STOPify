import { collection, disconnectDb } from '../db.js';

async function fetchAndMergeData() {
    const transitRoutesCollection = await collection('transitRoutes');
    const combinedData = [];
    const totalOffsets = 8000; // Modify if necessary
    const batchSize = 1000;

    try {
        // Fetch data from the first source (transitRoutes)
        for (let offset = 0; offset < totalOffsets; offset += batchSize) {
            const response1 = await fetch(`https://data.calgary.ca/resource/pm3p-838w.geojson?$offset=${offset}`);
            if (!response1.ok) {
                console.error(`Failed to fetch data from transitRoutes at offset ${offset}. Status: ${response1.status}`);
                continue;
            }

            const data1 = await response1.json();
            if (data1 && data1.type === 'FeatureCollection' && Array.isArray(data1.features)) {
                const routes1 = data1.features.map((feature) => ({
                    bus_number: feature.properties.route_short_name, // used to match with routeLines
                    stop_number: feature.properties.teleride_number,
                    stop_address: feature.properties.stop_name,
                    status: feature.properties.status,
                    route_name: feature.properties.route_long_name,
                    location: feature.geometry,
                }));
                combinedData.push(...routes1);
            } else {
                console.error('Invalid GeoJSON data format from transitRoutes.');
            }
        }

        // Fetch data from the second source (routeLines)
        for (let offset = 0; offset < totalOffsets; offset += batchSize) {
            const response2 = await fetch(`https://data.calgary.ca/resource/hpnd-riq4.geojson?$offset=${offset}`);
            if (!response2.ok) {
                console.error(`Failed to fetch data from routeLines at offset ${offset}. Status: ${response2.status}`);
                continue;
            }

            const data2 = await response2.json();
            if (data2 && data2.type === 'FeatureCollection' && Array.isArray(data2.features)) {
                const routes2 = data2.features.map((feature) => {
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

                // Attempt to merge the two collections
                for (const routeLine of routes2) {
                    const existingRoute = combinedData.find(route => route.route_line === routeLine.route_line);
                    if (existingRoute) {
                        existingRoute.route_shape = routeLine.route_shape;
                        existingRoute.community = routeLine.community;
                        existingRoute.city_globalid = routeLine.city_globalid;
                    } else {
                        combinedData.push(routeLine);  // If no match, add routeLine as new entry
                    }
                }
            } else {
                console.error('Invalid GeoJSON data format from routeLines.');
            }
        }

        // Insert or update combined data in transitRoutes collection
        for (const entry of combinedData) {
            const existingEntry = await transitRoutesCollection.findOne({ bus_number: entry.bus_number });
            if (existingEntry) {
                await transitRoutesCollection.updateOne(
                    { bus_number: entry.bus_number },
                    { $set: entry }
                );
                console.log(`Updated entry for bus number ${entry.bus_number}.`);
            } else {
                await transitRoutesCollection.insertOne(entry);
                console.log(`Inserted new entry for bus number ${entry.bus_number}.`);
            }
        }

        console.log('Data merge complete.');
    } catch (error) {
        console.error("Error fetching or merging data:", error);
    } finally {
        await disconnectDb();
    }
}

await fetchAndMergeData();
