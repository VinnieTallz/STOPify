import React, { useState, useEffect } from 'react';


const BusStopList = () => {
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
          const limitedData = data.slice(0,10);
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
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(location);
          fetchBusStops(location.lat, location.lng);
        },
        (error) => {
          console.error("Error getting user location:", error);
          setError("Unable to retrieve your location.");
          setLoading(false);
        }
      );
    }

    getUserLocation(); 
  }, []); 

  // Render loading, error, or bus stops
  if (loading) {
    return <div>{JSON.stringify('Loading your location and bus StopMarkers..')}</div>;
  }

  if (error) {
    return <div>{error.message || JSON.stringify(error)}</div>;
  }

  
  const handleBusStopClick = (stopId) => {
    if (selectedBusStop && selectedBusStop._id === stopId) {
      setSelectedBusStop(null);
    } else {
      const stop = busStops.find((stop) => stop._id === stopId);
      setSelectedBusStop(stop);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 overflow-hidden">
    <h1 className="text-3xl font-semibold mb-4 text-center">Nearby Bus Stops</h1>
    <ul className="space-y-4 max-h-96 p-3 overflow-y-auto">
      {busStops.map((stop) => (
        <li
          key={stop._id}
          className="cursor-pointer border-b-2 pb-3 hover:bg-gray-100 transition-all"
          onClick={() => handleBusStopClick(stop._id)}
        >
          <div className="flex items-center justify-between">
            <span className="text-xl font-medium text-gray-800">{stop.address}</span>
            <span className="text-sm text-gray-500">Stop Number  {stop.stop_number}</span>
            <span className="text-sm text-sky-500"> Details</span>
          </div>
          {selectedBusStop && selectedBusStop._id === stop._id && (
            <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-md">
              <p className="text-gray-600"><strong>Location:</strong> {selectedBusStop.lat}, {selectedBusStop.lng}</p>
              
              <h4 className="text-md font-semibold mt-4 text-gray-700">Bus Routes:</h4>
              <ul className="list-disc pl-6 text-gray-600">
                {selectedBusStop.routes && selectedBusStop.routes.length > 0 ? (
                  selectedBusStop.routes.map((route, index) => (
                    <li key={index}>Route {route}</li>
                  ))
                ) : (
                  <li>No routes available</li>
                )}
              </ul>

              <h4 className="text-md font-semibold mt-4 text-gray-700">Next Arrivals:</h4>
              {selectedBusStop.arrivals && selectedBusStop.arrivals.length > 0 ? (
                <ul className="list-disc pl-6 text-gray-600">
                  {selectedBusStop.arrivals.map((arrival, index) => (
                    <li key={index}>
                      Route {arrival.route} at {arrival.arrivalTime}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No upcoming arrivals.</p>
              )}
            </div>
          )}
        </li>
      ))}
    </ul>
  </div>
  );
};

export default BusStopList;




