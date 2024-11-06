import React from 'react';
import coordinatesArray from './testDataStops';
import { AdvancedMarker } from '@vis.gl/react-google-maps';

<<<<<<< HEAD
const StopMarkers = () => { 
=======
const StopMarkers = () => {
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
>>>>>>> 601dfcc5602815d4a5fad7d312bf7ab060da0a45

   const stopList= fetch ("http://localhost:3000/api/transitStops?stop_number=9686")

    return coordinatesArray.map((marker, index) => (
      <AdvancedMarker 
        key={index} // Important: Add a unique key for each marker
        position={{ lat: marker[1], lng: marker[0] }}
        gmpClickable="true">
        <img src="/images/bustop_blue.webp" alt="User Location Icon" width={30} height={35} />
      </AdvancedMarker>
    ));
  };
  
  export default StopMarkers;