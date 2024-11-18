import React, { useCallback, useState } from "react";
import { InfoWindow, AdvancedMarker } from '@vis.gl/react-google-maps';

const StopMarkers = ({ busStops, selectedStopNumber, onMarkerClick }) => {
  const [infoWindowOpen, setInfoWindowOpen] = useState(null);

  const handleClick = useCallback((busStop) => {
    setInfoWindowOpen(infoWindowOpen === busStop ? null : busStop);
  }, [infoWindowOpen]);


  return busStops.map((busStop, index) => (
    <AdvancedMarker
      key={index}
      position={{
        lat: busStop.transit_location.coordinates[1],
        lng: busStop.transit_location.coordinates[0]
      }}
      clickable={true}
      onClick={() => onMarkerClick(busStop.stop_number)}
    >
      <img
        src="/images/bustop_blue.webp"
        alt="Bus Stop Icon"
        width={28}
        height={33}
      />

      {selectedStopNumber === busStop.stop_number && (
        <InfoWindow
          position={{
            lat: busStop.transit_location.coordinates[1],
            lng: busStop.transit_location.coordinates[0],
          }}
          onCloseClick={() => setInfoWindowOpen(null)}
        >
          <div>
            <p className="text-gray-600">
              <strong>Bus Number:</strong> {busStop.bus_number}
            </p>
            <p className="text-gray-600">
              <strong>Stop Address:</strong> {busStop.stop_address}
            </p>
            <p className="text-gray-600">
              <strong>Route Name:</strong> {busStop.route_name}
            </p>
          </div>
        </InfoWindow>
      )}
    </AdvancedMarker>
  ));
};

export default StopMarkers;
