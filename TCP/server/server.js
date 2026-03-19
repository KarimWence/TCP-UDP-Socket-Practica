const net = require('net');

const PORT = 12345;
let clients = [];

const server = net.createServer((socket) => {
  console.log('🟢 Cliente conectado');

  clients.push(socket);

  socket.write('Bienvenido al chat TCP\n');

  socket.on('data', (data) => {
    const message = data.toString().trim();
    console.log('📩 Mensaje:', message);

    // Enviar mensaje a todos menos al que lo envió
    clients.forEach((client) => {
      if (client !== socket) {
        client.write(`👤 Otro usuario: ${message}\n`);
      }
    });
  });

  socket.on('end', () => {
    console.log('🔴 Cliente desconectado');
    clients = clients.filter(c => c !== socket);
  });

  socket.on('error', (err) => {
    console.log('⚠️ Error:', err.message);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor escuchando en puerto ${PORT}`);
});