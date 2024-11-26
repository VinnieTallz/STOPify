import React, { useState, useEffect } from "react";
import BustStopList from "./BusStopList.js";
import StopMarkers from "./StopMarkers.js";
import Directions from "./Directions.js";
import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import AutocompleteSuggestions from "./AutoCompleteSuggestions.js";

const MainMap = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [userDestination, setUserDestination] = useState(null);
  const [busStops, setBusStops] = useState([]);
  const [selectedStopNumber, setSelectedStopNumber] = useState(null);
  const [selectedStopDetails, setSelectedStopDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [busTimes, setBusTimes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const mapID = process.env.REACT_APP_MAP_ID;
  const mapKey = process.env.REACT_APP_MAP_KEY;

  const prefix = "Calgary, "; // Prefix for the city

  // Function to fetch bus stops based on user's location
  useEffect(() => {
    let isMounted = true;
    const fetchBusStops = async (lat, lng) => {
      const radius = 5000;
      try {
        const response = await fetch(
          `http://localhost:3000/api/busStops/nearby?lat=${lat}&lng=${lng}&radius=${radius}`
        );

        if (response.status === 200) {
          if (!isMounted) return;
          const data = await response.json();
          const limitedData = data.slice(0, 20);
          setBusStops(limitedData);

          setLoading(false);
        } else {
          if (!isMounted) return;
          setError("Failed to fetch bus stops.");
          setLoading(false);
        }
      } catch (error) {
        if (!isMounted) return;
        console.error("Error fetching bus stops:", error);
        setError("Unable to retrieve bus stops.");
        setLoading(false);
      }
    };

    // Get user location and fetch bus stops
    const getUserLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          if (!isMounted) return;

          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(location);
          fetchBusStops(location.lat, location.lng);
        },
        (error) => {
          if (!isMounted) return;

          console.error("Error getting user location:", error);
          setUserLocation({ lat: 51.0447, lng: -114.0719 });
          fetchBusStops(51.0447, -114.0719);
          setLoading(false);
        }
      );
    };
    getUserLocation();
  }, []);

  useEffect(() => {
    if (selectedStopNumber !== null) {
      const details = busStops.find(
        (stop) => stop.stop_number === selectedStopNumber
      );
      setSelectedStopDetails(details);
    } else {
      setSelectedStopDetails(null);
    }
  }, [selectedStopNumber, busStops]);

  const handleDirectionsResponse = (busTimes) => {
    if (Array.isArray(busTimes)) {
      setBusTimes(busTimes);
    } else {
      console.error("Expected busTimes to be an array, but got:", busTimes);
      setBusTimes([]);
    }
  };
  // const handleSuggestionSelect = suggestion => {
  //   setUserDestination(suggestion);
  //   setSearchQuery(suggestion);
  // };

  // Handle selection of a suggestion from autocomplete
  const handleSuggestionSelect = (suggestion) => {
    setUserDestination(suggestion);
    setSearchQuery(suggestion.description);
  };

  // Handle input change with city prefix
  const handleInputChange = (e) => {
    let value = e.target.value;

    // Add the prefix if the input doesn't start with it
    if (!value.startsWith(prefix)) {
      value = prefix + value;
    }

    setSearchQuery(value); // Update search query
  };

  return (
    <div className="h-full w-full">
      <div className="flex flex-col-reverse h-full w-full sm:flex-row sm:h-[600px]" >
        <div className="flex flex-col w-full shadow-lg sm:w-1/2 px-5 rounded-lg" >
          <h1 className="text-3xl font-semibold my-4 text-center">
            Stops Near Me
          </h1>
          <input // Search input
            type="text"
            placeholder="Search for your destination.."
            className="shadow-md rounded-lg p-2 mb-5 mx-auto w-full focus:outline-none focus:ring-1 focus:ring-sky-500"
            style={{ width: '90%' }}
            value={searchQuery} // Correctly use searchQuery
            onChange={(e) => setSearchQuery(e.target.value)} // Correctly use setSearchQuery
          />
          <AutocompleteSuggestions
            input={searchQuery}
            onSuggestionSelect={handleSuggestionSelect}
            userDestination={userDestination}
            setUserDestination={setUserDestination}
            setSearchQuery={setSearchQuery}
          />

          <BustStopList
            busStops={busStops}
            userDestination={userDestination}
            setUserDestination={setUserDestination}
            selectedStopNumber={selectedStopNumber}
            onBusStopSelect={setSelectedStopNumber}
            loading={loading}
            error={error}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            directions={busTimes}
          />
        </div>
        <div className="flex flex-col md:flex-row h-full w-full md:w-2/3 shadow-lg  ">
          <APIProvider apiKey={mapKey} onLoad={() => console.log("API Loaded")}>
            {userLocation && ( // Render the map when userLocation is available
              <div className="rounded-t-lg rounded-b-lg shadow-lg sm:rounded-r-lg overflow-hidden w-full h-[400px] sm:h-full">
                <Map
                  className="w-full h-full"
                  defaultZoom={15}
                  defaultCenter={userLocation}
                  mapId={mapID}
                  cameraControl={false}
                  clickableIcons={false}
                  disableDefaultUI={true}
                  fullscreenControl={true}
                  maxZoom={16}
                  minZoom={10}
                >
                  <Directions
                    userLocation={userLocation}
                    userDestination={userDestination}
                    selectedStopNumber={selectedStopNumber}
                    onDirectionsResponse={handleDirectionsResponse}
                  />
                  <AdvancedMarker position={userLocation}>
                    <img
                      src="userLocationIcon.png"
                      alt="User Location Icon"
                      width={28}
                      height={33}
                    />
                  </AdvancedMarker>

                  <StopMarkers
                    busStops={busStops}
                    selectedStopNumber={selectedStopNumber}
                    onMarkerClick={setSelectedStopNumber}
                    busTimes={busTimes}
                    userDestination={userDestination}
                  />
                </Map>
              </div>
            )}
          </APIProvider>
        </div>
      </div>
    </div>
  );
};

export default MainMap;
