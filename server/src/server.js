import http from 'http';
import app from './app.js';
import dotenv from 'dotenv';
import { initSocket } from './services/socket.service.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

// 1. Create the raw HTTP server and pass the Express App to it
const server = http.createServer(app);

// 2. Initialize Socket.io with this server
initSocket(server);

// 3. Listen on the server (NOT app.listen)
server.listen(PORT, () => {
  console.log(`🚀 Service running on port ${PORT}`);
  console.log(`📡 WebSocket server active`);
});