import express from "express";
import ejs from "ejs";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const URL = "https://api.openweathermap.org/data/2.5/weather";
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

app.get("/", async (req, res) => {
  try {
    let city = req.query.city ? req.query.city.toLowerCase() : "";
    let found = Object.keys(locations).find((loc) => loc === city);
    let lat, lon;

    if (!found) {
      ({ lat, lon } = locations.riyadh);
      console.log("user Entered invalid city Runs Riyadh as default");
    } else {
      ({ lat, lon } = locations[found]);
    }
    const response = await axios.get(
      URL + `?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.API_KEY}`
    );
    // console.log(response.data);
    res.render("index.ejs", { content: response.data });
  } catch (error) {
    console.log(error.message);
    res.render("index.ejs", { content: error.response });
  }
});
app.get("/locations", (req, res) => {
  res.json(locations);
});
app.listen(PORT, () => {
  console.log(`Server are running on port ${PORT}`);
});
const locations = {
  "khamis mushait": { lat: 18.3015, lon: 42.73 },
  tabuk: { lat: 28.3972, lon: 36.5788 },
  alnamas: { lat: 19.12, lon: 42.13 },
  riyadh: { lat: 24.7136, lon: 46.6753 },
  cairo: { lat: 30.0444, lon: 31.2357 },
  "new york": { lat: 40.7128, lon: -74.006 },
  london: { lat: 51.5074, lon: -0.1278 },
  paris: { lat: 48.8566, lon: 2.3522 },
  tokyo: { lat: 35.6895, lon: 139.6917 },
  beijing: { lat: 39.9042, lon: 116.4074 },
  moscow: { lat: 55.7558, lon: 37.6173 },
  berlin: { lat: 52.52, lon: 13.405 },
  madrid: { lat: 40.4168, lon: -3.7038 },
  rome: { lat: 41.9028, lon: 12.4964 },
  istanbul: { lat: 41.0082, lon: 28.9784 },
  dubai: { lat: 25.276987, lon: 55.296249 },
  mumbai: { lat: 19.076, lon: 72.8777 },
  sydney: { lat: -33.8688, lon: 151.2093 },
  toronto: { lat: 43.65107, lon: -79.347015 },
  "los angeles": { lat: 34.0522, lon: -118.2437 },
  "mexico city": { lat: 19.4326, lon: -99.1332 },
  "buenos aires": { lat: -34.6037, lon: -58.3816 },
  "cape town": { lat: -33.9249, lon: 18.4241 },
  nairobi: { lat: -1.2921, lon: 36.8219 },
  seoul: { lat: 37.5665, lon: 126.978 },
  jakarta: { lat: -6.2088, lon: 106.8456 },
  bangkok: { lat: 13.7563, lon: 100.5018 },
};

export default locations;
