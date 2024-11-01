import React, { useState, useEffect } from 'react';
import { APIProvider, Map, } from '@vis.gl/react-google-maps';

const MainMap = () => {
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    const fetchUserLocation = () => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setUserLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          (error) => {
            console.error("Error getting user location:", error);
            // Set a default location if geolocation fails
            setUserLocation({ lat: 51.0447, lng: -114.0719 }); 
          }
        );
    };

    fetchUserLocation();
  }, []);

  return (
    <div className="flex justify-center items-center h-96 bg-gray-200">
      <APIProvider apiKey={'AIzaSyA4u5WHz6-4ldEWPwyrjjjhhtkOwVm1lyo'} onLoad={() => console.log('Map API has loaded.')}>
        {userLocation && ( // Render the map when userLocation is available
          <Map
            defaultZoom={16}
            defaultCenter={userLocation}
          >
          </Map>
        )}
      </APIProvider>
    </div>
  );
};

export default MainMap;


