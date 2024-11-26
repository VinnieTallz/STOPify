import React, { useState, useEffect, useRef } from "react";
import AutocompleteSuggestions from "./AutoCompleteSuggestions.js";
import { useLayoutEffect } from "react"; // Import useLayoutEffect
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWalking, faBus } from '@fortawesome/free-solid-svg-icons';

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

const BusStopList = ({
  busStops,
  selectedStopNumber,
  userDestination,
  setUserDestination,
  onBusStopSelect,
  directions,
  loading,
  error,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBusStops, setFilteredBusStops] = useState(busStops);
  const listRef = useRef(null);
  const listItemRefs = useRef({});

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    if (debouncedSearchQuery.trim() === "") {
      setFilteredBusStops(busStops);
    } else {
      const searchQueryLower = debouncedSearchQuery.toLowerCase().trim();
      const filteredStops = busStops.filter((stop) => {
        const stopAddress = stop.stop_address
          ? stop.stop_address.toLowerCase()
          : "";
        const routeName = stop.route_name ? stop.route_name.toLowerCase() : "";
        const busNumber = stop.bus_number ? stop.bus_number.toLowerCase() : "";
        const stopNumber = stop.stop_number
          ? stop.stop_number.toLowerCase()
          : "";
        const community = stop.community ? stop.community.toLowerCase() : "";

        return (
          stopAddress.includes(searchQueryLower) ||
          routeName.includes(searchQueryLower) ||
          busNumber.includes(searchQueryLower) ||
          stopNumber.includes(searchQueryLower) ||
          community.includes(searchQueryLower)
        );
      });
      setFilteredBusStops(filteredStops);
    }
  }, [debouncedSearchQuery, busStops]);

  const handleBusStopClick = (stopNumber) => {
    onBusStopSelect(stopNumber); // Always update to the clicked stop
  };

  const stepIcons = {
    WALKING: "../../public/images/person-walking-solid.svg",
    TRANSIT: "../../public/images/bus.svg",
    // DRIVING: "/path/to/car-icon.png",
  };

  const relatedBusStops = selectedStopNumber
    ? filteredBusStops.filter((stop) => stop.stop_number === selectedStopNumber)
    : [];

  const uniqueStopNumbers = filteredBusStops.reduce((acc, stop) => {
    if (!acc[stop.stop_number]) {
      acc[stop.stop_number] = [];
    }
    acc[stop.stop_number].push(stop);
    return acc;
  }, {});

  const noResultsFound = filteredBusStops.length === 0;

  const handleSuggestionSelect = (suggestion) => {
    setSearchQuery(suggestion);
  };

  const scrollToTop = (stopNumber) => {
    if (!listRef.current) return;

    const selectedListItem = listItemRefs.current[stopNumber];

    if (selectedListItem) {
      selectedListItem.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useLayoutEffect(() => {
    // Replace useEffect with useLayoutEffect
    if (selectedStopNumber) {
      scrollToTop(selectedStopNumber);
    }
  }, [selectedStopNumber]);

  if (loading) {
    return <div>Loading your location and bus stops nearby..</div>;
  }

  if (error) {
    return <div>{error.message || JSON.stringify(error)}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto pt-0 px-2 mx-4 rounded-t-lg sm:h-max-content sm:rounded-l-lg overflow-hidden">
      {/* <input
        type="text"
        placeholder="Search for your destination.."
        className="shadow-md rounded-lg p-2 mb-5 w-full focus:outline-none focus:ring-1 focus:ring-sky-500"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      /> */}

      <AutocompleteSuggestions
        input={searchQuery}
        onSuggestionSelect={handleSuggestionSelect}
        userDestination={userDestination}
        setUserDestination={setUserDestination}
      />

    {/* Display directions if available */}
{directions.length > 0 ? (
  <div className="direction-instructions bg-white p-4 rounded-lg">
    <h3 className="text-lg text-center font-semibold mb-2 text-gray-700">
      Directions to {userDestination}
    </h3>
    <div className="space-y-4 p-3 h-full max-h-96 overflow-y-auto">
      {directions[0]?.steps.map((step, index) => {
        const travelMode = step.travel_mode;
        let icon;
        if (travelMode === 'WALKING') {
          icon = faWalking;
        } else if (travelMode === 'TRANSIT') {
          icon = faBus;  
        } else {
          icon = faWalking;
        }
        return (
          <div key={index} className="px-3">
            <div className="flex items-center">
            <FontAwesomeIcon icon={icon} className="text-xl mr-3" />
              <p>{`${step.instructions}`}</p>
            </div>
            <p>{`About: ${step.duration.text}`}</p>
            <p >{`Distance: ${step.distance.text}`}</p>
    
            <hr className="my-2 border-t-2 border-gray-300" />
          </div>
        );
      })}
    </div>
    </div>
      ) : (
        <>
          {noResultsFound && debouncedSearchQuery.trim() !== "" ? (
            <div className="text-center text-red-600 font-semibold">
              No bus stops found for your search.
            </div>
          ) : (
            <ul ref={listRef} className="space-y-4 overflow-y-auto p-3 h-full">
              {Object.entries(uniqueStopNumbers).map(([stopNumber, stops]) => (
                <li
                  key={stopNumber}
                  ref={(el) => (listItemRefs.current[stopNumber] = el)} // Assign ref to each list item
                  className={`cursor-pointer border-b-2 hover:bg-gray-200 hover:p-2 hover:rounded-lg transition-all py-1 h-auto ${
                    stopNumber === selectedStopNumber
                      ? "bg-blue-100 p-4 rounded-lg"
                      : ""
                  }`}
                  onClick={() => handleBusStopClick(stopNumber)}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-800 font-medium mr-4">
                      {stopNumber}
                    </span>
                    <span className="text-l font-medium text-gray-800 mr-4">
                      {stops[0]?.stop_address}
                    </span>
                    <span className="text-sm text-sky-500">Details</span>
                  </div>

                  {selectedStopNumber === stopNumber && (
                    <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-md h-60 overflow-y-auto">
                      <h3 className="text-lg font-semibold mb-2 text-gray-700">
                        Bus Stop {stopNumber} Details:
                      </h3>
                      {stops.map((stop) => (
                        <div key={stop._id} className="mb-4">
                          <p className="text-gray-600">
                            Bus No.: <strong>{stop.bus_number}</strong>
                          </p>
                          <p className="text-gray-600">
                            Community: <strong>{stop.community}</strong>
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default BusStopList;
