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
    <AdvancedMarker
      key={index} // Important: Add a unique key for each marker
      position={{ lat: marker[0], lng: marker[1] }}
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
