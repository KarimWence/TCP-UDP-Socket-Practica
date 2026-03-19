const dgram = require("dgram");
const client = dgram.createSocket("udp4");

const SERVER_IP = "127.0.0.1";
const SERVER_PORT = 41234;

const mensajeTexto = process.argv[2] || "Hola servidor UDP!";
const mensaje = Buffer.from(mensajeTexto);

client.send(mensaje, SERVER_PORT, SERVER_IP, (err) => {
  if (err) console.error(err);
  else console.log("Mensaje enviado:", mensajeTexto);
});

client.on("message", (msg) => {
  console.log("Servidor responde:", msg.toString());
  client.close();
});
