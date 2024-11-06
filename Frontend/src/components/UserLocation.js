import { useState, useEffect } from 'react';

const UserLocation = () => {
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
            null
        )
}

export default UserLocation