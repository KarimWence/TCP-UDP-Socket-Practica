const http = require("http");
const dgram = require("dgram");
const url = require("url");

const udpClient = dgram.createSocket("udp4");

const SERVER_IP = "127.0.0.1";
const SERVER_PORT = 41234;

http
  .createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

    const parsedUrl = url.parse(req.url, true);

    if (parsedUrl.pathname === "/enviar") {
      const mensaje = parsedUrl.query.msg || "";

      const buffer = Buffer.from(mensaje);

      udpClient.send(buffer, SERVER_PORT, SERVER_IP);

      udpClient.once("message", (msg) => {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end(msg.toString());
      });
    } else {
      res.writeHead(404);
      res.end("Not found");
    }
  })
  .listen(3000, () => {
    console.log("Bridge en http://localhost:3000");
  });
