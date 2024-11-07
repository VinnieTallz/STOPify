import { useState, useEffect } from 'react';

const StopNearMe = ({ userLocation, onStopsFetched }) => {
  const [loading, setLoading] = useState(true);
  const [fetchFailed, setFetchFailed] = useState(false); // Track if fetch has failed

  useEffect(() => {
    const fetchNearbyStops = async () => {
      if (!userLocation || fetchFailed) return; // Don't fetch if location is not provided or previous fetch failed

      setLoading(true); // Set loading state to true when starting the fetch

      try {
        const response = await fetch(
          `/api/transitStops/nearby?lat=${userLocation.lat}&lng=${userLocation.lng}&radius=500` // 500 meters for 0.5 km
        );
        if (!response.ok) {
          throw new Error('Error fetching nearby stops');
        }

        const data = await response.json();
        onStopsFetched(data); // Pass the fetched stops back to the parent
        setLoading(false); // Stop loading after data is fetched
      } catch (error) {
        console.error('Error fetching nearby stops:', error);
        setFetchFailed(true); // Set fetchFailed to true when there's an error
        setLoading(false); // Stop loading if the fetch fails
      }
    };

    fetchNearbyStops();
  }, [userLocation, onStopsFetched, fetchFailed]); // Dependency includes fetchFailed

  // Display loading message if still loading or fetch has failed
  return loading ? <div>Loading nearby stops...</div> : (fetchFailed ? <div>Failed to fetch nearby stops</div> : null);
};

export default StopNearMe;
