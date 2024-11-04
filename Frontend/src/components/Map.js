import React, { useState, useEffect } from 'react';
import Card from './Card';
import StopMarkers from './StopMarkers';

import { APIProvider, Map, AdvancedMarker} from '@vis.gl/react-google-maps';

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
    <div className="flex flex-col md:flex-row h-auto md:h-96">
        <div className='w-full md:w-1/3 p-4'>
            <div className='flex items-center'>
                <img src='/images/bustop_blue.png' style={{ width: '30px' }} alt="Bus Stop Icon" />
                <h2 className="text-black text-2xl md:text-3xl text-center font-bold ml-2 stopify-title">STOPify</h2>
            </div>

                <input
                    type="text"
                    placeholder="Search your bus..."
                    className="border border-gray-300 rounded-full p-2 my-4 w-full" 
                />
    
            <div>
                <Card/>
            </div>
        </div>

        <div className='w-full md:w-2/3'>
        <APIProvider apiKey={'AIzaSyA4u5WHz6-4ldEWPwyrjjjhhtkOwVm1lyo'} onLoad={() => console.log("API Loaded")}>
        {userLocation && ( // Render the map when userLocation is available
          
          <Map
          className="rounded-lg overflow-hidden h-96 w-full"
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
        )}
      </APIProvider>
       
        </div>     
 
  </div>
  );
};

export default MainMap;