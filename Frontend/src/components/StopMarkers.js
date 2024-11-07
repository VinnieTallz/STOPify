import React from 'react';
import { AdvancedMarker } from '@vis.gl/react-google-maps';

const StopMarkers = ({ testDataStops }) => {
  // Make sure testDataStops is an array and handle cases where it might not be
  const markers = Array.isArray(testDataStops) ? testDataStops : [];

  return markers.map((marker, index) => (
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
