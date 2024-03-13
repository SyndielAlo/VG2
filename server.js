const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fetch = require('node-fetch'); // Added for fetching plant data

const app = express();
const PORT = process.env.PORT || 3001;

// CORS Configuration (adjust origin as needed)
const corsOptions = {
  origin: 'http://localhost:3000', // Replace with your frontend origin
  optionsSuccessStatus: 200,
  credentials: true // Allow cookies for authentication (if applicable)
};
app.use(cors(corsOptions));

// Body Parser Middleware (for handling request bodies)
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// Your Express application logic goes here
// ... (Replace with the following API route for fetching plant data)

app.get('/plants', async (req, res) => {
  try {
    const response = await fetch('https://trefle.io/api/v1/plants?token=F_Wdc2AdBSBYnCDF03NY0-dfed5l0V9Qb1vmuhv1sjg');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const plantData = await response.json();
    res.json(plantData); // Send plant data in JSON format
  } catch (error) {
    console.error('Error fetching plant data:', error);
    res.status(500).send('Error fetching plant data'); // Send error response
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

