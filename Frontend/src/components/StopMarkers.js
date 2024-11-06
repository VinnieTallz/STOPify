import React from 'react';
import fetchData from './testDataStops';
import { AdvancedMarker } from '@vis.gl/react-google-maps';


const StopMarkers = () => {

  const fetchData = async () => {
    let testDataStops = [];

  try {
    const response = await fetch('http://localhost:3000/api/transitStops');

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



  let testDataStops = []
  console.log("Stop data: " + testDataStops)
  fetchData()
  return testDataStops.map((marker, index) => (
    <AdvancedMarker
      key={index} // Important: Add a unique key for each marker
      position={{ lat: marker[1], lng: marker[0] }}
    >
      <img
        src="/images/bustop_blue.webp"
        alt="User Location Icon"
        width={28}
        height={33}
      />
    </AdvancedMarker>
  ));
};

  
  export default StopMarkers;