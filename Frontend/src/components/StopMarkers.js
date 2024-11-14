import React, { useEffect, useState } from "react";
import { AdvancedMarker } from "@vis.gl/react-google-maps";

const StopMarkers = ({ busStops }) => {
  return busStops.map((busStops, index) =>
    <AdvancedMarker
      key={index}
      position={{
        lat: busStops.location.coordinates[1],
        lng: busStops.location.coordinates[0]
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
