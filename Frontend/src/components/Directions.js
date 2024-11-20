import { APIProvider, useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";

const Directions = ({ userLocation }) => {
  const map = useMap();
  const routesLibrary = useMapsLibrary("routes");

  const [directionsService, setDirectionsService] = useState();
  const [directionsRenderer, setDirectionsRenderer] = useState();
  const [routes, setRoutes] = useState([]);

  useEffect(
    () => {
      if (!routesLibrary | !map) return;
      setDirectionsService(new routesLibrary.DirectionsService());
      setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));
    },
    [routesLibrary, map]
  );
  console.log(userLocation.lat);
  console.log(userLocation.lng);

  useEffect(
    () => {
      if (!directionsRenderer | !directionsService) return;

      directionsService
        .route({
          origin: userLocation,
          destination: "101 9 Ave SW, Calgary, AB",
          travelMode: "TRANSIT"
        })
        .then(response => {
          directionsRenderer.setDirections(response);
          setRoutes(response.routes);
        });
    },
    [directionsService, directionsRenderer]
  );
  console.log("routes object:" + routes);
  return null;
};

export default Directions;
