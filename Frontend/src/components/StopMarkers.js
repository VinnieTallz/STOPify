import React from "react";
import testDataStops from "./testDataStops";
import { AdvancedMarker } from "@vis.gl/react-google-maps";

const StopMarkers = () => {
  return listTransitStops.map((marker, index) => (
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
