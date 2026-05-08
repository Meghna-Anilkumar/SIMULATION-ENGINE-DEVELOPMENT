import { Request, Response } from 'express';
import { ISimulationService } from '../interfaces/ISimulationService';
import { SimulationService } from '../services/SimulationService';
import { HttpStatusCode } from '../enums/StatusCode';
import { SimulationMessages } from '../constants/messages';
import { RunStepDto } from '../dtos/Simulation';

export class SimulationController {
  private _service: ISimulationService;

  constructor() {
    this._service = new SimulationService();
  }

  runStep = async (req: Request<{}, {}, RunStepDto>, res: Response) => {
    try {
      const result = await this._service.runStep(req.body);
      res.status(HttpStatusCode.OK).json({
        success: true,
        message: SimulationMessages.STEP_PROCESSED,
        data: result
      });
    } catch (error: any) {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        message: error.message || SimulationMessages.INVALID_INPUTS,
      });
    }
  };

  getHistory = async (_req: Request, res: Response) => {
    try {
      const history = await this._service.getHistory();
      res.status(HttpStatusCode.OK).json({
        success: true,
        message: SimulationMessages.HISTORY_RETRIEVED,
        data: history
      });
    } catch (error) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: SimulationMessages.SERVER_ERROR,
      });
    }
  };

  reset = async (_req: Request, res: Response) => {
    try {
      await this._service.resetSimulation();
      res.status(HttpStatusCode.OK).json({
        success: true,
        message: SimulationMessages.SIMULATION_RESET,
      });
    } catch (error) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: SimulationMessages.SERVER_ERROR,
      });
    }
  };
}