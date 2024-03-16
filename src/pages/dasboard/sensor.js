import React from 'react';
import { Typography, Box, Card, Stack } from '@mui/material';
import DeviceThermostatTwoToneIcon from '@mui/icons-material/DeviceThermostatTwoTone';
import CloudQueueTwoToneIcon from '@mui/icons-material/CloudQueueTwoTone';
import WaterDropOutlinedIcon from '@mui/icons-material/WaterDropOutlined';


const SensorData = ({ temperature, humidity, co2, uv }) => {
  // Function to format time to 12-hour format
  const formatTime = (date) => {
    return date.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
  };

  // Function to format date to "January 3, 2024" format
  const formatDate = (date) => {
    return date.toLocaleString('en-US', {
      weekday: 'long', // Display the name of the day
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Get current date and time
  const currentDate = new Date();
  const currentTime = formatTime(currentDate);
  const formattedDate = formatDate(currentDate);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, marginTop: 5, marginLeft: 2, marginRight: 2 }}>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '50%' }}>
        <Card sx={{ flexDirection: 'column', backgroundColor: "yellow", border: "2px solid #12372A", borderRadius: "8px", width: '100%' }}>
          <Typography variant="h6" gutterBottom marginTop={2}>
            Temperature: {temperature} °C
          </Typography>
          <Stack direction="row" spacing={2}>
            <DeviceThermostatTwoToneIcon sx={{ fontSize: 60 }} />
          </Stack>
        </Card>

        <Card sx={{ flexDirection: 'column', backgroundColor: "yellow", border: "2px solid #12372A", borderRadius: "8px", width: '100%' }}>
          <Typography variant="h6" gutterBottom marginTop={2}>
            Humidity: {humidity} %
          </Typography>
          <Stack direction="row" spacing={2}>
            <WaterDropOutlinedIcon sx={{ fontSize: 50 }} />
          </Stack>
        </Card>

        <Card sx={{ flexDirection: 'column', backgroundColor: "yellow", border: "2px solid #12372A", borderRadius: "8px", width: '100%' }}>
          <Typography variant="h6" gutterBottom marginTop={2}>
            CO2: {co2} ppm
          </Typography>
          <Stack direction="row" spacing={2}>
            <CloudQueueTwoToneIcon sx={{ fontSize: 50 }} />
          </Stack>
        </Card>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '50%' }}>
      <Card sx={{ backgroundColor: 'rgba(255, 215, 0, 0.1)', border: '1px solid gold', borderRadius: '8px', padding: '14px' }}>
        <Typography
          variant="h6"
          gutterBottom
          marginTop={2}
          sx={{
            fontWeight: 'bold', // Make font thicker
            color: 'black', // Fill font with black color
            WebkitTextStroke: '1px gold', // Add gold font border
            WebkitTextFillColor: 'black', // Fill font with black color to cover the border
          }}
>
            {formattedDate} {/* Display formatted date */}
          </Typography>
          <Typography variant="h6" gutterBottom marginTop={2}>
            {currentTime} {/* Display current time */}
          </Typography>
        </Card>
      </Box>

    </Box>
  );
};

export default SensorData;