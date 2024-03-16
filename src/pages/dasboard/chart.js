import React, { useRef, useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-luxon';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const SensorLineChart = ({ sensorData }) => {
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);
  const [liveUpdate, setLiveUpdate] = useState(true); // Start with live update enabled

  useEffect(() => {
    let intervalId;

    if (liveUpdate) {
      intervalId = setInterval(() => {
        // Fetch new sensor data here (simulate with random data for demonstration)
        const newSensorData = generateRandomSensorData();

        // Update the chart with the new data
        updateChart(newSensorData);
      }, 5000); // Update every 5 seconds (adjust interval as needed)
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [liveUpdate]);

  useEffect(() => {
    if (sensorData && sensorData.length > 0) {
      if (chartInstance.current !== null) {
        chartInstance.current.destroy();
      }

      const dates = sensorData.map(entry => entry.date);
      const temperatureData = sensorData.map(entry => entry.temperature);
      const humidityData = sensorData.map(entry => entry.humidity);
      const co2Data = sensorData.map(entry => entry.co2);

      chartInstance.current = new Chart(chartContainer.current, {
        type: 'line',
        data: {
          labels: dates,
          datasets: [
            {
              label: 'Temperature',
              data: temperatureData,
              borderColor: 'red',
              fill: true, // Convert to area graph by setting fill to true
            },
            {
              label: 'Humidity',
              data: humidityData,
              borderColor: 'blue',
              fill: true, // Convert to area graph by setting fill to true
            },
            {
              label: 'CO2',
              data: co2Data,
              borderColor: 'green',
              fill: true, // Convert to area graph by setting fill to true
            },
          ],
        },
        options: {
          // Chart options
          responsive: true, // Enable responsiveness
          maintainAspectRatio: false, // Disable aspect ratio
          scales: {
            x: {
              type: 'time',
              time: {
                unit: 'day', // Set the time unit for the x-axis (date)
              },
            },
          },
          plugins: {
            title: {
              display: true,
              text: 'Sensor Data', // Add a title to the graph
            },
          },
        },
      });
    }

    return () => {
      if (chartInstance.current !== null) {
        chartInstance.current.destroy();
      }
    };
  }, [sensorData]);

  const updateChart = newData => {
    if (chartInstance.current) {
      const dates = newData.map(entry => entry.date);
      const temperatureData = newData.map(entry => entry.temperature);
      const humidityData = newData.map(entry => entry.humidity);
      const co2Data = newData.map(entry => entry.co2);

      chartInstance.current.data.labels = dates;
      chartInstance.current.data.datasets[0].data = temperatureData;
      chartInstance.current.data.datasets[1].data = humidityData;
      chartInstance.current.data.datasets[2].data = co2Data;

      chartInstance.current.update();
    }
  };

  const toggleLiveUpdate = () => {
    setLiveUpdate(!liveUpdate);
  };

  const generateRandomSensorData = () => {
    // Generate random data for demonstration purposes
    const newData = [];
    const now = new Date();

    for (let i = 0; i < 7; i++) {
      newData.push({
        date: new Date(now.getFullYear(), now.getMonth(), now.getDate() + i),
        temperature: Math.random() * 100,
        humidity: Math.random() * 100,
        co2: Math.random() * 100,
      });
    }

    return newData;
  };

  return (
    <Card style={{ width: 'calc(100% - 10px)', height: 'calc(90% - 10px)', margin: '10px' }}>
      <CardContent style={{ width: '100%', height: '100%', padding: 0 }}>
        <canvas ref={chartContainer} style={{ width: '100%', height: '100%' }} />
      </CardContent>
    </Card>
  );
};

export default SensorLineChart;