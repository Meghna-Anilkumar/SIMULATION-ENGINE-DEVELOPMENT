import { SimulationModel } from '../models/SimulationSchema';
import { PlantState } from '../entities/Simulation';
import { ISimulationRepository } from '../interfaces/ISimulationRepository';

export class SimulationRepository implements ISimulationRepository {
  private _model = SimulationModel;

  async save(state: PlantState): Promise<PlantState> {
    const newRecord = new this._model(state);
    return await newRecord.save();
  }

  async findAll(): Promise<PlantState[]> {
    return await this._model.find().sort({ day: 1 }).lean();
  }

  async findLatest(): Promise<PlantState | null> {
    return await this._model.findOne().sort({ day: -1 }).lean();
  }

  async deleteAll(): Promise<void> {
    await this._model.deleteMany({});
  }
}