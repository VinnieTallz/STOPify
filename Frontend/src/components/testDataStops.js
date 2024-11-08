// Initialize an empty array to store coordinates

import { useEffect, useState } from "react";

<<<<<<< HEAD
let [testDataStops, settestDataStops] = useState([]);
useEffect(() => {
  const fetchStops = async () => {
    try {
      const response = await fetch("/api/transitStops");
=======
  try {
    const response = await fetch('http://localhost:4000/api/transitStops');
<<<<<<< HEAD
>>>>>>> d6f45387c481f992cd6c04fea1cfeb1a03f13db9
=======
>>>>>>> 77f170e2650f13c1d570f36935f4bd903ff47ae3

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
