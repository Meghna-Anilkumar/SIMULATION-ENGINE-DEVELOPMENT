import { PlantState, EnvironmentalInputs } from '../entities/Simulation';

export interface ISimulationRepository {
  save(state: PlantState): Promise<PlantState>;
  findAll(): Promise<PlantState[]>;
  findLatest(): Promise<PlantState | null>;
  deleteAll(): Promise<void>;
}