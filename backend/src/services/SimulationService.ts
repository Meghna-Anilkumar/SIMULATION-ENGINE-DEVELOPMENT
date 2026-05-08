import { ISimulationService } from '../interfaces/ISimulationService';
import { ISimulationRepository } from '../interfaces/ISimulationRepository';
import { EnvironmentalInputs, PlantState } from '../entities/Simulation';
import { PlantGrowthRules } from '../rules/PlantGrowthRules';
import { SimulationRepository } from '../repositories/SimulationRepository';

export class SimulationService implements ISimulationService {
  private _repository: ISimulationRepository;

  constructor() {
    this._repository = new SimulationRepository();
  }

  async runStep(inputs: EnvironmentalInputs): Promise<PlantState> {
    const latestState = await this._repository.findLatest();

    const currentState: Partial<PlantState> = latestState || {
      day: 0,
      growthLevel: 40,
      stressLevel: 10,
      healthStatus: 'Good',
      message: 'Initial State',
      timestamp: new Date()
    };

    const newState = PlantGrowthRules.evaluate(inputs, currentState);
    await this._repository.save(newState);

    return newState;
  }

  async getHistory(): Promise<PlantState[]> {
    return await this._repository.findAll();
  }

  async resetSimulation(): Promise<void> {
    await this._repository.deleteAll();
  }
}