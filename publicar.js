const mqtt = require("mqtt");

function publicarEnBroker(datos) {
  //Configuracion del broker MQTT
  const options = {
    host: "broker.emqx.io",
    port: 1883,
    protocol: "mqtt",
  };

  //Conectamos al broker
  const client = mqtt.connect(options);

  // Evento de conexión
  client.on("connect", () => {
    console.log("Conectado al broker MQTT");

    const claves = Object.entries(datos);
    let publicados = 0;

    claves.forEach(([clave, valor]) => {
      const topic = `casa/clima/${clave}`;

      console.log(clave, valor);

      client.publish(topic, valor, { qos: 0, retain: false }, (err) => {
        if (err) {
          console.error(`❌ Error al publicar en ${topic}:`, err);
        } else {
          console.log(`✅ Publicado en '${topic}': ${valor}`);
        }

        // Cerramos conexión cuando todos los mensajes fueron publicados
        publicados++;
        if (publicados === claves.length) {
          client.end();
        }
      });
    });
  });
}

module.exports = {publicarEnBroker};
