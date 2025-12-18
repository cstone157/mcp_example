const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const errorHandler = require('./middleware/errorHandler');
const partRoutes = require('./routes/parts');
const warehouseRoutes = require('./routes/warehouses');
const inventoryRoutes = require('./routes/inventory');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// API Documentation
app.get('/api', (req, res) => {
  res.json({
    version: '1.0.0',
    title: 'Inventory Tracking Service',
    description: 'REST API for tracking parts, warehouses, and inventory',
    endpoints: {
      parts: {
        create: 'POST /api/parts',
        getAll: 'GET /api/parts?limit=100&offset=0',
        getOne: 'GET /api/parts/:id',
        update: 'PUT /api/parts/:id',
        delete: 'DELETE /api/parts/:id',
        search: 'GET /api/parts/search?q=keyword',
      },
      warehouses: {
        create: 'POST /api/warehouses',
        getAll: 'GET /api/warehouses?limit=100&offset=0',
        getOne: 'GET /api/warehouses/:id',
        getCapacity: 'GET /api/warehouses/:id/capacity',
        update: 'PUT /api/warehouses/:id',
        delete: 'DELETE /api/warehouses/:id',
      },
      inventory: {
        create: 'POST /api/inventory',
        getAll: 'GET /api/inventory?limit=100&offset=0',
        getOne: 'GET /api/inventory/:id',
        getByWarehouse: 'GET /api/inventory/warehouse/:warehouseId',
        getByPart: 'GET /api/inventory/part/:partId',
        getLowStock: 'GET /api/inventory/low-stock',
        getDistribution: 'GET /api/inventory/distribution/:partId',
        update: 'PUT /api/inventory/:id',
        delete: 'DELETE /api/inventory/:id',
        increment: 'POST /api/inventory/:id/increment',
        decrement: 'POST /api/inventory/:id/decrement',
      },
    },
  });
});

// Routes
app.use('/api/parts', partRoutes);
app.use('/api/warehouses', warehouseRoutes);
app.use('/api/inventory', inventoryRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found', message: `Route ${req.method} ${req.path} not found` });
});

// Error handler
app.use(errorHandler);

// Start server
const server = app.listen(PORT, () => {
  console.log(`Inventory Tracking Service running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`API Documentation: http://localhost:${PORT}/api`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

module.exports = app;
