const net = require('net');

const PORT = 12345;
let clients = [];

const server = net.createServer((socket) => {
  console.log('Cliente conectado');

  clients.push(socket);

  socket.on('data', (data) => {
    const message = data.toString().trim();

    console.log('Mensaje recibido:', message);

    // Enviar a todos los clientes excepto el emisor
    clients.forEach((client) => {
      if (client !== socket) {
        client.write(message + '\n');
      }
    });
  });

  socket.on('end', () => {
    console.log('Cliente desconectado');
    clients = clients.filter((client) => client !== socket);
  });

  socket.on('error', (err) => {
    console.log('Error:', err.message);
  });
});

// IMPORTANTE: permitir conexiones externas
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});