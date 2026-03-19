const net = require('net');
const readline = require('readline');

const HOST = '100.110.207.26';
const PORT = 12345;

const client = net.createConnection({ host: HOST, port: PORT }, () => {
  console.log('✅ Conectado al servidor');
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Recibir mensajes
client.on('data', (data) => {
  console.log('\n📨 ' + data.toString());
});

// Enviar mensajes
rl.on('line', (input) => {
  client.write(input);
});

// Detectar desconexión
client.on('end', () => {
  console.log('❌ Desconectado del servidor');
  process.exit();
});

client.on('error', (err) => {
  console.log('⚠️ Error:', err.message);
});