const http = require('http');
const httpProxy = require('http-proxy');

// Reemplaza esto con la IP de tu VPS y el puerto donde corre tu VPN (ej: 80, 8080, 443)
const VPS_IP = 'http://66.154.119.67:22'; 

const proxy = httpProxy.createProxyServer({
    target: VPS_IP,
    ws: true, // Habilita WebSockets para la VPN
    changeOrigin: true
});

const server = http.createServer((req, res) => {
    // Maneja peticiones HTTP normales
    proxy.web(req, res, (e) => console.error('Error Proxy Web:', e.message));
});

// Maneja el túnel WebSocket de la VPN
server.on('upgrade', (req, socket, head) => {
    proxy.ws(req, socket, head, (e) => console.error('Error Proxy WS:', e.message));
});

// Escucha el puerto que Google nos asigne
const port = process.env.PORT || 8080;
server.listen(port, () => {
    console.log(`Enlace activo: Cloud Run -> VPS (${VPS_IP})`);
});

