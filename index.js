import express from "express";
import ejs from "ejs";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const URL = "http://api.weatherstack.com/current";
const PORT = process.env.PORT || 3000;

app.get("/", async (req, res) => {
  let city = "Riyadh";
  try {
    const response = await axios.get(
      URL + `?access_key=${process.env.API_KEY}&query=${city}`
    );
    console.log(response.data);
    res.render("index.ejs", { content: response.data });
  } catch (error) {
    console.log(error.response.data);
    res.render("index.ejs", { content: error.response.data });

  }
});

app.listen(PORT, () => {
  console.log(`Server are running on port ${PORT}`);
});
