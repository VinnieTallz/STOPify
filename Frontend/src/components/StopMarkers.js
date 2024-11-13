import React, { useEffect, useState } from "react";
import { AdvancedMarker } from "@vis.gl/react-google-maps";

const StopMarkers = () => {
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

  return busStops.map((busStops, index) =>
    <AdvancedMarker
      key={index}
      position={{
        lat: busStops.location.coordinates[1],
        lng: busStops.location.coordinates[0]
      }}
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
