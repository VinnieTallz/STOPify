import React, { useState, useEffect } from "react";
import BustStopList from "./BusStopList.js";
import StopMarkers from "./StopMarkers.js";
import Directions from "./Directions.js";

import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";

const MainMap = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [busStops, setBusStops] = useState([]);
  const [selectedStopNumber, setSelectedStopNumber] = useState(null);
  const [selectedStopDetails, setSelectedStopDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [busTimes, setBusTimes] = useState([]); 

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
        position => {
          if (!isMounted) return;

          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(location);
          fetchBusStops(location.lat, location.lng);
        },
        error => {
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

  useEffect(
    () => {
      if (selectedStopNumber !== null) {
        const details = busStops.find(
          stop => stop.stop_number === selectedStopNumber
        );
        setSelectedStopDetails(details);
      } else {
        setSelectedStopDetails(null);
      }
    },
    [selectedStopNumber, busStops]
  );

  const handleDirectionsResponse = (busTimes) => {
    if (Array.isArray(busTimes)) {
      setBusTimes(busTimes);  
    } else {
      console.error('Expected busTimes to be an array, but got:', busTimes);
      setBusTimes([]);  
    }
  };
  
  
  return (
    <div className="h-full w-full">
      <div className="flex flex-col-reverse h-full w-full sm:flex-row sm:h-[600px]">
        <div className="flex flex-col w-full shadow-lg sm:w-1/2  ">
          <BustStopList
            busStops={busStops}
            selectedStopNumber={selectedStopNumber}
            onBusStopSelect={setSelectedStopNumber}
            loading={loading}
            error={error}
          />
        </div>
        <div className="flex flex-col md:flex-row h-full w-full md:w-2/3 shadow-lg ">
          <APIProvider
            apiKey={"AIzaSyA4u5WHz6-4ldEWPwyrjjjhhtkOwVm1lyo"}
            onLoad={() => console.log("API Loaded")}
          >
            {userLocation && // Render the map when userLocation is available
              <div className="rounded-t-lg sm:rounded-r-lg overflow-hidden w-full h-[400px] sm:h-full">
                <Map
                  className="w-full h-full"
                  defaultZoom={15}
                  defaultCenter={userLocation}
                  mapId={"ae7d99c514aec5fc"}
                  cameraControl={false}
                  clickableIcons={false}
                  disableDefaultUI={true}
                  fullscreenControl={true}
                  maxZoom={16}
                  minZoom={10}
                >
                  <Directions userLocation={userLocation}  selectedStopNumber={selectedStopNumber} onDirectionsResponse={handleDirectionsResponse}  />
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
                  />
                </Map>
              </div>}
          </APIProvider>
        </div>
      </div>
    </div>
  );
};

export default MainMap;
