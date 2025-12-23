const WebSocket = require('ws');

// Google Cloud Run asigna un puerto automáticamente en la variable PORT
const port = process.env.PORT || 8080;

const wss = new WebSocket.Server({ port }, () => {
    console.log(`Servidor VPN activo en el puerto: ${port}`);
});

wss.on('connection', (ws, req) => {
    const clientIp = req.socket.remoteAddress;
    console.log(`Cliente conectado desde: ${clientIp}`);

    // Mantiene la conexión viva
    ws.on('message', (message) => {
        // Aquí se procesa el tráfico de tu VPN
        // Simplemente retransmitimos o procesamos el buffer
    });

    ws.on('close', () => {
        console.log('Cliente desconectado');
    });

    ws.on('error', (error) => {
        console.error(`Error en conexión: ${error.message}`);
    });
});
