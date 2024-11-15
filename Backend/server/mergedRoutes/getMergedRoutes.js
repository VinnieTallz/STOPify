import { collection, disconnectDb } from '../db.js';

async function fetchAndMergeData() {
    const transitRoutesCollection = await collection('transitRoutes');
    const routeLinesCollection = await collection('routeLines');
    const mergedRoutesCollection = await collection('mergedRoutes'); // Ensuring we reference the correct collection

    const combinedData = [];

    try {
        // Fetch data from transitRoutes collection
        const transitRoutes = await transitRoutesCollection.find().toArray();
        console.log(`Fetched ${transitRoutes.length} entries from transitRoutes collection.`);

        // Fetch data from routeLines collection
        const routeLines = await routeLinesCollection.find().toArray();
        console.log(`Fetched ${routeLines.length} entries from routeLines collection.`);

        // Merge transitRoutes and routeLines based on bus_number
        for (const transitRoute of transitRoutes) {
            const matchingRouteLine = routeLines.find(routeLine => routeLine.bus_number === transitRoute.bus_number);

            if (matchingRouteLine) {
                // Combine properties from both sources into a single object
                combinedData.push({
                    bus_number: transitRoute.bus_number,
                    stop_number: transitRoute.stop_number,
                    stop_address: transitRoute.stop_address,
                    route_name: transitRoute.route_name,
                    community: matchingRouteLine.community,
                    transit_location: transitRoute.location,
                    route_line_location: matchingRouteLine.location
                });
            } else {
                // If no matching routeLine, add transitRoute data only
                combinedData.push({
                    bus_number: transitRoute.bus_number,
                    stop_number: transitRoute.stop_number,
                    stop_address: transitRoute.stop_address,
                    route_name: transitRoute.route_name,
                    transit_location: transitRoute.location
                });
            }
        }

        // Log the count of combined data to be pushed
        console.log(`Preparing to insert/update ${combinedData.length} entries into mergedRoutes collection.`);

        // Insert merged data into mergedRoutes collection
        for (const entry of combinedData) {
            const existingEntry = await mergedRoutesCollection.findOne({ bus_number: entry.bus_number });
            if (existingEntry) {
                await mergedRoutesCollection.updateOne(
                    { bus_number: entry.bus_number },
                    { $set: entry }
                );
                console.log(`Updated merged entry for bus number ${entry.bus_number}.`);
            } else {
                await mergedRoutesCollection.insertOne(entry);
                console.log(`Inserted new merged entry for bus number ${entry.bus_number}.`);
            }
        }

        console.log('Data merge complete and stored in mergedRoutes collection.');
    } catch (error) {
        console.error("Error fetching or merging data:", error);
    } finally {
        await disconnectDb();
    }
}

await fetchAndMergeData();
