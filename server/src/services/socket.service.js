// src/services/socket.service.js
import { Server } from 'socket.io';
import os from 'os';

let io;

export const initSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: "*", // Allow all origins for development
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', (socket) => {
    console.log(`🔌 Client connected: ${socket.id}`);

    // Send an immediate status update upon connection
    socket.emit('server-status', getServerStatus());

    socket.on('disconnect', () => {
      console.log(`❌ Client disconnected: ${socket.id}`);
    });
  });

  // Start the heartbeat (Report status every 5 seconds)
  setInterval(() => {
    const status = getServerStatus();
    io.emit('server-status', status); // Broadcast to ALL clients
  }, 5000);
};

const getServerStatus = () => {
  return {
    status: 'UP',
    timestamp: new Date().toISOString(),
    uptimeSeconds: process.uptime(),
    memoryUsage: process.memoryUsage(),
    system: {
      freeMemory: os.freemem(),
      totalMemory: os.totalmem(),
      load: os.loadavg() // 1, 5, and 15 min load averages
    },
    connectedClients: io ? io.engine.clientsCount : 0
  };
};