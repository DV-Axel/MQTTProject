const axios = require("axios");


//Usamos una funcion basica para obetener las coordenadas
// de la ubicacion de la estacion
async function obtenerCoordenadas() {

  //http://ip-api.com/json/24.48.0.1 cuando tenga la ip especificada
  const res = await axios.get('http://ip-api.com/json/');

  //console.log('Coordenadas obtenidas:', res.data);
  
  const { lat, lon } = res.data;
  return { lat, lon };
}

module.exports = { obtenerCoordenadas };