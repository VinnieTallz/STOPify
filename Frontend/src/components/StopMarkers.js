import React, { useCallback } from "react";
import { AdvancedMarker } from "@vis.gl/react-google-maps";

const StopMarkers = ({ busStops }) => {
  const handleClick = useCallback((ev: google.maps.MapMouseEvent) => {
    //When a markers is clicked, send a message to console
    console.log("marker clicked:");
  });

  return busStops.map((busStops, index) =>
    <AdvancedMarker
      key={index}
      position={{
        lat: busStops.location.coordinates[1],
        lng: busStops.location.coordinates[0]
      }}
      clickable={true}
      onClick={handleClick}
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
