import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import catRoutes from './routes/cat.routes.js'
import peopleRoutes from './routes/people.routes.js';
import adoptionRoutes from './routes/adoption.routes.js';

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
app.use('/api/cats', catRoutes);
app.use('/api/people', peopleRoutes);
app.use('/api/adoptions', adoptionRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

export default app;