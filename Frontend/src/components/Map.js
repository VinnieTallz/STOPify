import React, { useState, useEffect } from 'react';

import Card from './Card';

import { APIProvider, Map, AdvancedMarker} from '@vis.gl/react-google-maps';
//import userLocationIcon from '../Proj2/c13-project2-team4/Frontend/public/userLocationIcon.png';

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
  <div className="flex flex-col md:flex-row h-auto md:h-full ">
      
    <div className="flex flex-col w-full max-w-xs mx-auto">
      <div className="flex items-center mb-4">
        <img src="/images/bustop_blue.png" style={{ width: '30px' }} alt="Bus Stop Icon" />
        <h2 className="text-black text-2xl md:text-3xl font-bold ml-2">STOPify</h2>
      </div>
      <input
        type="text"
        placeholder="Search your bus..."
        className="border border-gray-300 rounded-full p-2 w-full focus:outline-none focus:ring-2 focus:ring-sky-500"
      />
      <div className="mt-4">
        <Card />
      </div>
    </div>

    
    <div className="w-full md:w-2/3 ">
        <APIProvider apiKey={'AIzaSyA4u5WHz6-4ldEWPwyrjjjhhtkOwVm1lyo'} onLoad={() => console.log(process.env.REACT_APP_MAP_ID)}>
        {userLocation && ( // Render the map when userLocation is available
          <div className="rounded-lg overflow-hidden w-full h-64 md:h-full">
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
          </Map>
        </div>
        )}
      </APIProvider>
        </div>  

  </div>
  );
};

export default MainMap;