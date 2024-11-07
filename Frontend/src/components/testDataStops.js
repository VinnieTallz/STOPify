 // Initialize an empty array to store coordinates

const fetchData = async () => {
    let testDataStops = [];

  try {
    const response = await fetch('http://localhost:4000/api/transitStops');

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    // Extract coordinates and push into testDataStops
    data.forEach(stop => {
      testDataStops.push(stop.location.coordinates);
    });

    console.log(testDataStops); // Log the array of coordinates

  } catch (error) {
    console.error('Error fetching data:', error);
  }
  return testDataStops;
};

fetchData();

