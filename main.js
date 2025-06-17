const { obtenerCoordenadas } = require("./coordenadas");
const { consultarAPIClima } = require("./consultaAPI");
const { publicarEnBroker } = require("./publicar");

async function main() {
  try {
    //Obtenemos las coordenadas de la estacion
    const coordenadas = await obtenerCoordenadas();

    //Mediante las coordenadas obtenidas, consultamos la API del clima
    const datosClima = await consultarAPIClima(
      coordenadas.lat,
      coordenadas.lon
    );

    //Ahora podemos formatear los datos obtenidos y dejarlos a nuestro gusto
    const tempCelsius = (datosClima.main.temp - 273.15).toFixed(2); // Convertir de Kelvin a Celsius
    const tempMaxCelsius = (datosClima.main.temp_max - 273.15).toFixed(2); // Convertir de Kelvin a Celsius
    const tempMinCelsius = (datosClima.main.temp_min - 273.15).toFixed(2); // Convertir de Kelvin a Celsius
    const humedad = datosClima.main.humidity + "%";

    //Metemos todo en un arreglo para mandarlo a publicador
    const datosFormateados = {
      tempratura: tempCelsius + "°C",
      tempMaxCelsius: tempMaxCelsius + "°C",
      tempMinCelsius: tempMinCelsius + "°C",
      humedad: humedad
    };

    //Publicamos los datos formateados en el broker MQTT
    publicarEnBroker(datosFormateados)

  } catch (error) {
    console.error("Error en la ejecucion del programa:", error.message);
  }
}

//El main ejecuta la funcion de arriba
//Queda asi para poder usar por fuera una async function y tener el try-catch
main();
