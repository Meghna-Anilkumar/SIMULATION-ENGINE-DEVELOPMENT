import mongoose, { Schema, Document } from 'mongoose';
import { PlantState } from '../entities/Simulation';

export interface ISimulationDocument extends Document, PlantState {}

const SimulationSchema = new Schema<ISimulationDocument>({
  day: { type: Number, required: true },
  growthLevel: { type: Number, required: true, min: 0, max: 100 },
  healthStatus: { 
    type: String, 
    enum: ['Excellent', 'Good', 'Stressed', 'Wilting', 'RootRot', 'Diseased'],
    required: true 
  },
  stressLevel: { type: Number, required: true, min: 0, max: 100 },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

export const SimulationModel = mongoose.model<ISimulationDocument>(
  'Simulation', 
  SimulationSchema
);