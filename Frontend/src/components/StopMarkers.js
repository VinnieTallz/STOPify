<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import { AdvancedMarker } from "@vis.gl/react-google-maps";

const StopMarkers = () => {
  let [testDataStops, settestDataStops] = useState([]);
  useEffect(() => {
    const fetchStops = async () => {
      try {
        const response = await fetch("/api/transitStops");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        settestDataStops(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchStops();
  }, []);

  console.log(testDataStops);
  return testDataStops.map((marker, index) =>
=======
import React from 'react';
import { AdvancedMarker } from '@vis.gl/react-google-maps';

const StopMarkers = ({ testDataStops }) => {
  // Make sure testDataStops is an array and handle cases where it might not be
  const markers = Array.isArray(testDataStops) ? testDataStops : [];

  return markers.map((marker, index) => (
>>>>>>> 77f170e2650f13c1d570f36935f4bd903ff47ae3
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
  );
};

export default StopMarkers;
