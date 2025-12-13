import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import partRoutes from './routes/part.routes.js'
import warehouseRoutes from './routes/warehouse.routes.js';
import warehousePartRoutes from './routes/warehousePart.routes.js';

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Health Check Route (Vital for Kubernetes/AWS)
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', service: process.env.SERVICE_NAME });
});

// Mount Routes
app.use('/api/part', partRoutes);
app.use('/api/warehouse', warehouseRoutes);
app.use('/api/warehousePart', warehousePartRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

export default app;