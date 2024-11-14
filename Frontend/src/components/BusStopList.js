import React, { useState } from "react";

const BusStopList = ({ busStops, loading, error }) => {
  const [selectedStopNumber, setSelectedStopNumber] = useState(null); // Track the selected stop number
  const [filteredBusStops, setFilteredBusStops] = useState([]);

  // Render loading, error, or bus stops
  if (loading) {
    return (
      <div>
        {JSON.stringify("Loading your location and bus StopMarkers..")}
      </div>
    );
  }

  if (error) {
    return (
      <div>
        {error.message || JSON.stringify(error)}
      </div>
    );
  }

  // Handle click event on a bus stop to toggle the details
  const handleBusStopClick = stopNumber => {
    if (selectedStopNumber === stopNumber) {
      setSelectedStopNumber(null);
      setFilteredBusStops([]);
    } else {
      const matchingBusStops = busStops.filter(
        stop => stop.stop_number === stopNumber
      );
      setSelectedStopNumber(stopNumber);
      setFilteredBusStops(matchingBusStops);
    }
  };

  const uniqueBusStops = busStops.filter(
    (stop, index, self) =>
      index === self.findIndex(s => s.stop_number === stop.stop_number)
  );

  return (
    <div className="max-w-4xl mx-auto p-4 rounded-t-lg sm:rounded-l-lg overflow-hidden">
      <h1 className="text-3xl font-semibold mb-4 text-center">
        Bus Stops List
      </h1>
      <ul className="space-y-4 max-h-80 sm:max-h-full overflow-y-auto p-3">
        {uniqueBusStops.map(stop =>
          <li
            key={stop._id}
            className="cursor-pointer border-b-2 hover:bg-gray-200 hover:p-2 hover:rounded-lg transition-all py-1 h10 "
            onClick={() => handleBusStopClick(stop.stop_number)}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-800 font-medium mr-4 ">
                {" "}{stop.stop_number}
              </span>
              <span className="text-l font-medium text-gray-800 mr-4">
                {stop.stop_address}
              </span>
              <span className="text-sm text-sky-500"> Details</span>
            </div>

            {selectedStopNumber === stop.stop_number &&
              <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-md h-60 overflow-y-auto">
                <h3 className="text-lg font-semibold mb-2 text-gray-700">
                  Details for Bus Stop Number {stop.stop_number}:
                </h3>

                {/* Display all bus stops with the same stop number */}
                {filteredBusStops.map(filteredStop =>
                  <div key={filteredStop._id} className="mb-4">
                    <p className="text-gray-600">
                      <strong>Bus Number:</strong> {filteredStop.bus_number}
                    </p>
                    <p className="text-gray-600">
                      <strong>Stop Address:</strong> {filteredStop.stop_address}
                    </p>
                    <p className="text-gray-600">
                      <strong>Route Name:</strong> {filteredStop.route_name}
                    </p>
                    <p className="text-gray-600">
                      <strong>Status:</strong>{" "}
                      <span className="text-green-600 font-medium">
                        {filteredStop.status}
                      </span>
                    </p>

                    {/* <h4 className="text-md font-semibold mt-4 text-gray-700">Location:</h4>
                  <p className="text-gray-600">{`Latitude: ${filteredStop.location.lat}, Longitude: ${filteredStop.location.lng}`}</p> */}
                  </div>
                )}
              </div>}
          </li>
        )}
      </ul>
    </div>
  );
};

export default BusStopList;
