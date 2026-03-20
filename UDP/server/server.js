const dgram = require("dgram");

const servidor = dgram.createSocket("udp4");

const PUERTO = 41234;

servidor.on("message", (msg, rinfo) => {
  const perder = Math.random() < 0.3;

  if (perder) {
    console.log("⚠️ Paquete PERDIDO");
    return;
  }

  console.log(`Mensaje recibido: ${msg}`);
  console.log(`De: ${rinfo.address}:${rinfo.port}`);

  const respuesta = Buffer.from(`Mensaje: ${msg} \n recibido correctamente`);

  servidor.send(respuesta, rinfo.port, rinfo.address, (err) => {
    if (err) {
      console.error("Error al enviar respuesta:", err);
    } else {
      console.log("Respuesta enviada al cliente\n");
    }
  });
});

servidor.on("listening", () => {
  const direccion = servidor.address();
  console.log(
    `Servidor UDP escuchando en ${direccion.address}:${direccion.port}`,
  );
});

servidor.bind(PUERTO);
