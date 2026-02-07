const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

const NASA_API_KEY = process.env.NASA_API_KEY;

// Route to fetch near-earth objects
app.get("/api/asteroids", async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0];

    const response = await axios.get(
      `https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${today}&api_key=${NASA_API_KEY}`
    );

    const asteroids = Object.values(response.data.near_earth_objects)[0];

    const formatted = asteroids.slice(0, 6).map(a => ({
      name: a.name,
      missDistance: Math.round(a.close_approach_data[0].miss_distance.kilometers),
      velocity: Math.round(a.close_approach_data[0].relative_velocity.kilometers_per_hour),
  diameter: Math.round(
    (a.estimated_diameter.meters.estimated_diameter_max +
      a.estimated_diameter.meters.estimated_diameter_min) / 2
  ),
      risk: a.is_potentially_hazardous_asteroid ? "High" : "Low"
    }));

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch asteroid data" });
  }
});

app.listen(5000, () => console.log("🚀 Backend running on http://localhost:5000"));
