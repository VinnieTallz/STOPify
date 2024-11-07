// Initialize an empty array to store coordinates

import { useEffect, useState } from "react";

let [testDataStops, settestDataStops] = useState([]);
useEffect(() => {
  const fetchStops = async () => {
    try {
      const response = await fetch("/api/transitStops");

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      settestDataStops(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
}, []);

//fetchData();

export default fetchData;
