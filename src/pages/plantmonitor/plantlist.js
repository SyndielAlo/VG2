// PlantList.js

import React, { useState, useEffect } from 'react';

const PlantList = () => {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/plants');
        if (!response.ok) {
          throw new Error('Failed to fetch plants');
        }
        const data = await response.json();
        setPlants(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPlants();
  }, []);

  return (
    <div>
      <h1>Plant List</h1>
      <ul>
        {plants.map((plant) => (
          <li key={plant.id}>{plant.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default PlantList;
