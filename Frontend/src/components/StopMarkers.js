import React, { useState, useEffect } from "react";
import { AdvancedMarker } from "@vis.gl/react-google-maps";

const StopMarkers = ({ stops }) => {
  return (
    <>
      {stops.map((stop, index) => (
        <AdvancedMarker key={index} position={stop} title="Bus Stop">
          <img src="busStopIcon.png" alt="Bus Stop Icon" width={28} height={33} />
        </AdvancedMarker>
      ))}
    </>
  );
};

export default StopMarkers;
