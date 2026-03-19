const net = require('net');
const readline = require('readline');

const HOST = 'AQUI_LA_IP_DEL_SERVIDOR'; // Ej: 100.x.x.x (Tailscale)
const PORT = 12345;

const client = net.createConnection({ host: HOST, port: PORT }, () => {
    console.log('Conectado al servidor');
});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Recibir mensajes
client.on('data', (data) => {
    console.log(data.toString());
});

// Enviar mensajes
rl.on('line', (input) => {
    client.write(input);
});

// Desconexión
client.on('end', () => {
    console.log('Desconectado del servidor');
    process.exit();
});

client.on('error', (err) => {
    console.log('Error:', err.message);
});