import React, { useEffect, useState } from "react";
import { AdvancedMarker } from "@vis.gl/react-google-maps";

const StopMarkers = ({ busStops }) => {
  return busStops.map((busStops, index) =>
    <AdvancedMarker
      key={index}
      position={{
        lat: busStops.transit_location.coordinates[1],
        lng: busStops.transit_location.coordinates[0]
      }}
    >
      <img
        src="/images/bustop_blue.webp"
        alt="Bus Stop Icon"
        width={28}
        height={33}
      />
    </AdvancedMarker>
  );
};

export default StopMarkers;
