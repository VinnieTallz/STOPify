import React, { useState, useEffect } from "react";
import BustStopList from "./BusStopList.js";
import StopMarkers from "./StopMarkers.js";
import UserLocation from "./UserLocation.js";

import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";

const MainMap = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [busStops, setBusStops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBusStop, setSelectedBusStop] = useState(null);

  // Function to fetch bus stops based on user's location
  useEffect(() => {
    async function fetchBusStops(lat, lng) {
      const radius = 5000;
      try {
        const response = await fetch(
          `http://localhost:3000/api/busStops/nearby?lat=${lat}&lng=${lng}&radius=${radius}`
        );

        if (response.status === 200) {
          const data = await response.json();
          const limitedData = data.slice(0, 10);
          setBusStops(limitedData);
          setLoading(false);
        } else {
          setError("Failed to fetch bus stops.");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching bus stops:", error);
        setError("Unable to retrieve bus stops.");
        setLoading(false);
      }
    }

    // Get user location and fetch bus stops
    function getUserLocation() {
      navigator.geolocation.getCurrentPosition(
        position => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(location);
          fetchBusStops(location.lat, location.lng);
        },
        error => {
          console.error("Error getting user location:", error);
          setUserLocation({ lat: 51.0447, lng: -114.0719 });
          fetchBusStops("51.0447", "-114.0719");
          setLoading(false);
        }
      );
    }

    getUserLocation();
  }, []);

  return (
    <div className="h-full w-full">
      <input
        type="text"
        placeholder="Search your bus..."
        className="shadow-md rounded-lg p-2 mb-5 w-full focus:outline-none focus:ring-2 focus:ring-sky-500"
      />

      <div className="flex flex-col-reverse h-full w-full sm:flex-row sm:h-[600px]">
        <div className="flex flex-col w-full shadow-lg sm:w-1/2  ">
          <BustStopList />
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
                  <AdvancedMarker position={userLocation}>
                    <img
                      src="userLocationIcon.png"
                      alt="User Location Icon"
                      width={28}
                      height={33}
                    />
                  </AdvancedMarker>

                  <StopMarkers busStops={busStops} />
                </Map>
              </div>}
          </APIProvider>
          <UserLocation />
        </div>
      </div>
    </div>
  );
};

export default MainMap;
