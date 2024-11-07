// UserLocation.js
import { useState, useEffect } from 'react';

const UserLocation = ({ onLocationFetched }) => {
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    const fetchUserLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(location);
          onLocationFetched(location); // Pass location to the parent
        },
        (error) => {
          console.error('Error getting user location:', error);
          // Set a default location if geolocation fails
          const defaultLocation = { lat: 51.0447, lng: -114.0719 };
          setUserLocation(defaultLocation);
          onLocationFetched(defaultLocation); // Pass the default location
        }
      );
    };

    fetchUserLocation();
  }, [onLocationFetched]);

  return null; // No UI rendering needed, location is passed to parent
};

export default UserLocation;
