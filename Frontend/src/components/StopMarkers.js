import React from 'react';
<<<<<<< HEAD
import fetchData from './testDataStops';
=======
>>>>>>> 8eb5d2273325203a86a0a2c8b4f7a101cd22bf51
import { AdvancedMarker } from '@vis.gl/react-google-maps';

const StopMarkers = ({ testDataStops }) => {
  // Make sure testDataStops is an array and handle cases where it might not be
  const markers = Array.isArray(testDataStops) ? testDataStops : [];

<<<<<<< HEAD
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
=======
  return markers.map((marker, index) => (
>>>>>>> 8eb5d2273325203a86a0a2c8b4f7a101cd22bf51
    <AdvancedMarker
      key={index}
      position={{ lat: marker[1], lng: marker[0] }}
    >
      <img
        src="/images/bustop_blue.webp"
        alt="Bus Stop Icon"
        width={28}
        height={33}
      />
    </AdvancedMarker>
  ));
};

export default StopMarkers;
