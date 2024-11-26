import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";

const Directions = ({
  userLocation,
  userDestination,
  onDirectionsResponse,
  selectedStopNumber
}) => {
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
  console.log("STOPify 2024");

  useEffect(
    () => {
      if (!directionsRenderer | !directionsService | !userDestination) return;

      directionsService
        .route({
          origin: userLocation,
          destination: userDestination,
          travelMode: "TRANSIT"
        })
        .then(response => {
          directionsRenderer.setDirections(response);
          setRoutes(response.routes);
        });
    },
    [directionsService, directionsRenderer, userDestination]
  );

  useEffect(
    () => {
      if (routes.length == 0) {
        return;
      }
      const routeData = routes[0].legs[0];
      console.log('routedata',routeData);

      const arrivalTime = routeData.arrival_time.text;
      const departureTime = routeData.departure_time.text;
      const duration = routeData.duration.text;
      const steps = routeData.steps;
      


      const busTimes = [
        {
          stopNumber: selectedStopNumber,
          arrivalTime,
          departureTime,
          duration,
          steps
        }
      ];
      // console.log('Bus Times:', busTimes);
      onDirectionsResponse(busTimes);
    },
    [selectedStopNumber, routes]
  );
  return null;
};

export default Directions;
