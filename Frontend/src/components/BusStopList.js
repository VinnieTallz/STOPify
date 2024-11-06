import React, { useState, useEffect } from 'react';

const BusStopList = () => {
  const [userLocation, setUserLocation] = useState(null); // State to store the user's location
  const [busStops, setBusStops] = useState([]); // State to store the bus stops
  const [loading, setLoading] = useState(true); // Loading state to show while data is fetching
  const [error, setError] = useState(null); // Error state to handle potential errors

  // Function to fetch bus stops based on user's location
  useEffect(() => {
    async function fetchBusStops(lat, lng) {
      const radius = 5000; // Set the radius for nearby bus stops (in meters)
      try {
        const response = await fetch(
          `http://localhost:3000/api/transitStops/nearby?lat=${lat}&lng=${lng}&radius=${radius}`
        );
        
        if (response.status === 200) {
          const data = await response.json();
          setBusStops(data); // Store the bus stops in state
          setLoading(false); // Set loading to false when data is fetched
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
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(location); // Set the user's location
          fetchBusStops(location.lat, location.lng); // Fetch bus stops based on location
        },
        (error) => {
          console.error("Error getting user location:", error);
          setError("Unable to retrieve your location.");
          setLoading(false);
        }
      );
    }

    getUserLocation(); // Call the function to get user location
  }, []); // Empty dependency array to run this effect only once when component mounts

  // Render loading, error, or bus stops
  if (loading) {
    return <div>Loading your location and bus stops...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="h-80 w-90 border border-gray-300 rounded-lg p-2 overflow-hidden" >
      
      {busStops.length === 0 ? (

        <p>No bus stops found nearby. Please check your location or try again later.</p>
      ) : (
        <ul className="list-none m-0 p-0 max-h-64 overflow-y-auto">
      
          {busStops.map((stop) => (
            <li key={stop._id} className="py-1 h10 bg-gray-200 flex items-center justify-center hover:bg-gray-100" >
             
              <h3>{stop.stop_number}</h3>
              <p>{stop.address}</p>
              {/* Optionally show more details like distance, routes served, etc. */}
            </li>
            
          ))}
        </ul>
      )}
    </div>
  );
};

export default BusStopList;
