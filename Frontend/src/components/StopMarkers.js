import React, { useState, useCallback, useEffect } from "react";
import { InfoWindow, AdvancedMarker } from '@vis.gl/react-google-maps';

const StopMarkers = ({ busStops, selectedStopNumber, onMarkerClick, busTimes, userDestination }) => {

  const [infoWindowOpen, setInfoWindowOpen] = useState(null);
  const [relevantBusTimes, setReleventBusTimes] = useState([]);

  // Handle marker click: toggle selectedStopNumber
  const handleMarkerClick = useCallback((busStop) => {
    // Toggle selected stop number on click
    const newSelectedStopNumber = selectedStopNumber === busStop.stop_number ? null : busStop.stop_number;
    onMarkerClick(newSelectedStopNumber); // Update the parent with the toggled stop number
  }, [selectedStopNumber, onMarkerClick]);

  // Group bus stops by stop_number to show all related stops in the InfoWindow
  const groupedStops = busStops.reduce((acc, stop) => {
    if (!acc[stop.stop_number]) {
      acc[stop.stop_number] = [];
    }
    acc[stop.stop_number].push(stop);
    return acc;
  }, {});

useEffect (() =>{
  const temp = Array.isArray(busTimes)
  ? busTimes.filter(time => String(time.stopNumber) === String(selectedStopNumber))
  : [];

  setReleventBusTimes(temp);

},[selectedStopNumber, busTimes]);

// Check if relevantBusTimes is empty
// if (relevantBusTimes.length === 0) {
//   console.log("No relevant bus times found for stop number", selectedStopNumber);
// }
if (userDestination){return}

  return busStops.map((busStop, index) => (
    <AdvancedMarker
      key={index}
      position={{
        lat: busStop.location.coordinates[1],
        lng: busStop.location.coordinates[0]
      }}
      clickable={true}
      onClick={() => handleMarkerClick(busStop)} // Toggle selection on marker click
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
            lat: busStop.location.coordinates[1],
            lng: busStop.location.coordinates[0],
          }}
          onCloseClick={() => onMarkerClick(null)} // Close the InfoWindow when the close button is clicked
        >
          <div className="max-w-sm sm:max-w-md lg:max-w-lg bg-white p-4 rounded-lg shadow-xl border border-gray-200">   
            <h4 className="text-gray-800 font-semibold">Bus Stop Details:</h4>
            
            {/* Loop through all bus stops with the same stop_number and display their details */}
            {groupedStops[busStop.stop_number]?.map((relatedStop, stopIndex) => (
              <div key={stopIndex} className="mb-2">
                <p className="text-gray-600">
                  <strong>Bus Number:</strong> {relatedStop.bus_number}
                </p>

                {/* Show bus times for the selected bus stop */}
                {relevantBusTimes.length > 0 ? (
                  relevantBusTimes.map((relatedStop, busTimeIndex) => (
                    <div key={busTimeIndex}>
                      <p className="text-gray-600"><strong>Departure Time:</strong> {relatedStop.departureTime}</p>
                      <p className="text-gray-600"><strong>Arrival Time:</strong> {relatedStop.arrivalTime}</p>
                      <p className="text-gray-600"><strong>Duration:</strong> {relatedStop.duration}</p>
                    </div>
                  ))
                ) : (
                  <p>No bus times available.</p>
                )}

                <p className="text-gray-600">
                  <strong>Stop Address:</strong> {relatedStop.stop_address}
                </p>
                <p className="text-gray-600">
                  <strong>Community:</strong> {relatedStop.community}
                </p>
              </div>
            ))}
          </div>
        </InfoWindow>
      )}
    </AdvancedMarker>
  ));
};

export default StopMarkers;
