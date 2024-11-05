import React from 'react';
import coordinatesArray from './testDataStops';
import { AdvancedMarker } from '@vis.gl/react-google-maps';

const StopMarkers = () => { 

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