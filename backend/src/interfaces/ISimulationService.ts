import { PlantState, EnvironmentalInputs } from '../entities/Simulation';

export interface ISimulationService {
  runStep(inputs: EnvironmentalInputs): Promise<PlantState>;
  getHistory(): Promise<PlantState[]>;
  resetSimulation(): Promise<void>;
}