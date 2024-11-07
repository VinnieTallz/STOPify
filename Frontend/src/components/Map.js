import React, { useState, useEffect } from 'react';
import BustStopList from './BusStopList.js';
import StopMarkers from './StopMarkers.js';
import UserLocation from './UserLocation.js';

import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';

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
    <div>
      <input
        type="text"
        placeholder="Search your bus..."
        className="shadow-md rounded-lg p-2 mb-5 w-full focus:outline-none focus:ring-2 focus:ring-sky-500"
      />

      <div className='flex flex-col-reverse h-[600px] max-h-screen sm:flex-row'>
        <div className="flex flex-col w-full shadow-lg sm:w-1/2  ">
          <BustStopList />
        </div>
        <div className="flex flex-col md:flex-row h-full w-full md:w-2/3 shadow-lg ">
          <APIProvider apiKey={'AIzaSyA4u5WHz6-4ldEWPwyrjjjhhtkOwVm1lyo'} onLoad={() => console.log("API Loaded")}>
            {userLocation && ( // Render the map when userLocation is available
              <div className="rounded-lg overflow-hidden w-full h-full ">
                <Map
                  className="w-full h-full"
                  defaultZoom={15}
                  defaultCenter={userLocation}
                  mapId={'ae7d99c514aec5fc'}
                  cameraControl={false}
                  clickableIcons={false}
                  disableDefaultUI={true}
                  fullscreenControl={true}
                  maxZoom={16}
                  minZoom={10}
                >
                  <AdvancedMarker position={userLocation}>
                    <img src="userLocationIcon.png" alt="User Location Icon" width={28} height={33} />
                  </AdvancedMarker>

                  <StopMarkers></StopMarkers>

                </Map>
              </div>
            )}
          </APIProvider>
          <UserLocation />
        </div>

      </div>

    </div>



  );
};

export default MainMap;