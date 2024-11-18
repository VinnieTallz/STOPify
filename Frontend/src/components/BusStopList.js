import React, { useState, useEffect } from "react";

// Custom Hook for Debouncing
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const BusStopList = ({ busStops, loading, error }) => {
  const [selectedStopNumber, setSelectedStopNumber] = useState(null); 
  const [searchQuery, setSearchQuery] = useState(""); 
  const [filteredBusStops, setFilteredBusStops] = useState(busStops); 

  // Use debounced search query to avoid filtering on every keystroke
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  // Filter bus stops based on debounced search query
  useEffect(() => {
    if (debouncedSearchQuery.trim() === "") {
      setFilteredBusStops(busStops); 
    } else {
      const searchQueryLower = debouncedSearchQuery.toLowerCase().trim();  
      const filteredStops = busStops.filter((stop) => {
        const stopAddress = stop.stop_address ? stop.stop_address.toLowerCase() : '';
        const routeName = stop.route_name ? stop.route_name.toLowerCase() : '';
        const busNumber = stop.bus_number ? stop.bus_number.toLowerCase() : '';
        const stopNumber = stop.stop_number ? stop.stop_number.toLowerCase() : '';
        const community = stop.community ? stop.community.toLowerCase() : '';
      
        return (
          stopAddress.includes(searchQueryLower) ||
          routeName.includes(searchQueryLower) ||
          busNumber.includes(searchQueryLower) ||
          stopNumber.includes(searchQueryLower)||
          community.includes(searchQueryLower)

        );
      });
      setFilteredBusStops(filteredStops); 
    }
  }, [debouncedSearchQuery, busStops]);

  // Render loading, error, or bus stops
  if (loading) {
    return <div>Loading your location and bus StopMarkers..</div>;
  }

  if (error) {
    return <div>{error.message || JSON.stringify(error)}</div>;
  }

  // Handle click event on a bus stop to toggle the details
  const handleBusStopClick = (stopNumber) => {
    if (selectedStopNumber === stopNumber) {
      setSelectedStopNumber(null); 
    } else {
      setSelectedStopNumber(stopNumber); 
    }
  };

  // Filter bus stops with the selected stop number
  const relatedBusStops = selectedStopNumber
    ? filteredBusStops.filter(stop => stop.stop_number === selectedStopNumber)
    : [];

  // Group bus stops by stop_number to display unique stop numbers
  const uniqueStopNumbers = filteredBusStops.reduce((acc, stop) => {
    if (!acc[stop.stop_number]) {
      acc[stop.stop_number] = [];
    }
    acc[stop.stop_number].push(stop);
    return acc;
  }, {});

  // Check if no results are found after filtering
  const noResultsFound = filteredBusStops.length === 0;

  return (
    <div className="max-w-4xl mx-auto pt-0 px-2 mx-4 rounded-t-lg sm:rounded-l-lg overflow-hidden">
      <h1 className="text-3xl font-semibold mb-4 text-center">Bus Stops Near Me</h1>
      <input
        type="text"
        placeholder="Search by community, stop address, bus number ..."
        className="shadow-md rounded-lg p-2 mb-5 w-full focus:outline-none focus:ring-1 focus:ring-sky-500"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Show message if no bus stops match the search query */}
      {noResultsFound && debouncedSearchQuery.trim() !== "" ? (
        <div className="text-center text-red-600 font-semibold">
          No bus stop found for "{debouncedSearchQuery}"
        </div>
      ) : (
        <ul className="space-y-4 max-h-80 sm:max-h-full overflow-y-auto p-3">
          {Object.keys(uniqueStopNumbers).map((stopNumber) => (
            <li
              key={stopNumber}
              className="cursor-pointer border-b-2 hover:bg-gray-200 hover:p-2 hover:rounded-lg transition-all py-1 h10"
              onClick={() => handleBusStopClick(stopNumber)}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-800 font-medium mr-4">
                  {stopNumber}
                </span>
                <span className="text-l font-medium text-gray-800 mr-4">
                  {uniqueStopNumbers[stopNumber][0].stop_address} 
                </span>
                <span className="text-sm text-sky-500"> Details</span>
              </div>
              {selectedStopNumber === stopNumber && (
                <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-md h-60 overflow-y-auto">
                  <h3 className="text-lg font-semibold mb-2 text-gray-700">
                    Details for Bus Stop Number {stopNumber}:
                  </h3>

                  {/* Show all bus stops with the same stop_number */}
                  {uniqueStopNumbers[stopNumber].map((relatedStop) => (
                    <div key={relatedStop._id} className="mb-4">
                      <p className="text-gray-600">
                        <strong>Bus Number:</strong> {relatedStop.bus_number}
                      </p>
                      <p className="text-gray-600">
                        <strong>Stop Address:</strong> {relatedStop.stop_address}
                      </p>
                      <p className="text-gray-600">
                        <strong>Community:</strong> {relatedStop.community}
                      </p>
                      <p className="text-gray-600">
                        <strong>Route Name:</strong> {relatedStop.route_name}
                      </p>
                      <p className="text-gray-600">
                        <strong>Status:</strong>{" "}
                        <span className="text-green-600 font-medium">
                          {relatedStop.status}
                        </span>
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BusStopList;
