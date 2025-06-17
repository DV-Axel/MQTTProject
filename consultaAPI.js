// archivo: clima.js
const axios = require("axios");
const API_KEY = "5a877c56fe2f4ea7737b5f40e7c280d2"; // APIKEY de openweather

async function consultarAPIClima(lat, lon) {

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;


  try {
    const response = await axios.get(url);
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error al obtener el clima:", error.message);
    throw error; // para que quien la llame pueda manejar el error
  }
}

module.exports = { consultarAPIClima };