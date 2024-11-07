import React, { useState, useEffect } from 'react';
import UserLocation from './UserLocation.js'; // Import UserLocation component
import StopMarkers from './StopMarkers.js';
import StopNearMe from './StopsNearMe.js'; // Import StopNearMe to fetch stops
import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';

const apiKey = process.env.REACT_APP_MAP_KEY;
const mapId = process.env.REACT_APP_MAP_ID;

const MainMap = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [nearbyStops, setNearbyStops] = useState([]);

  // Handle user location fetched from UserLocation component
  const handleLocationFetched = (location) => {
    setUserLocation(location);
  };

  // Handle stops fetched from StopNearMe
  const handleStopsFetched = (stops) => {
    const stopsCoordinates = stops.map((stop) => ({
      lat: stop.location.coordinates[1], // latitude
      lng: stop.location.coordinates[0], // longitude
    }));
    setNearbyStops(stopsCoordinates);
  };

  return (
    <div>
      {userLocation ? (
        <>
          <input
            type="text"
            placeholder="Search your bus..."
            className="shadow-md rounded-lg p-2 mb-5 w-full focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          <div className="flex flex-col-reverse h-[600px] max-h-screen sm:flex-row">
            <div className="flex flex-col w-full shadow-lg sm:w-1/2">
              {/* Optionally display a list of stops */}
            </div>
            <div className="flex flex-col md:flex-row h-full w-full md:w-2/3 shadow-lg">
              <APIProvider apiKey={apiKey} onLoad={() => console.log('API Loaded')}>
                {userLocation && (
                  <div className="rounded-lg overflow-hidden w-full h-full ">
                    <Map
                      className="w-full h-full"
                      defaultZoom={15}
                      defaultCenter={userLocation}
                      mapId={mapId}
                      cameraControl={false}
                      clickableIcons={false}
                      disableDefaultUI={true}
                      fullscreenControl={true}
                      maxZoom={16}
                      minZoom={10}
                    >
                      {/* Display User Location */}
                      <AdvancedMarker position={userLocation}>
                        <img src="userLocationIcon.png" alt="User Location Icon" width={28} height={33} />
                      </AdvancedMarker>

                      {/* Display Nearby Stops */}
                      <StopMarkers stops={nearbyStops} />
                    </Map>
                  </div>
                )}
              </APIProvider>
            </div>
          </div>
        </>
      ) : (
        <p>Loading your location...</p>
      )}

      {/* Pass the location handler to UserLocation component */}
      <UserLocation onLocationFetched={handleLocationFetched} />

      {/* Pass the user location to StopNearMe to fetch stops */}
      {userLocation && <StopNearMe userLocation={userLocation} onStopsFetched={handleStopsFetched} />}
    </div>
  );
};

export default MainMap;
