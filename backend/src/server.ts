import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

import simulationRouter from './routes/SimulationRoutes';
import { SimulationRoutes } from './constants/routeConstants';
import { connectDB } from './config/database';

dotenv.config();

const app = express();


app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));


app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use(SimulationRoutes.BASE, simulationRouter);



const startServer = async () => {
  try {
    await connectDB();

    const PORT = process.env.PORT || 5000;
    
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();