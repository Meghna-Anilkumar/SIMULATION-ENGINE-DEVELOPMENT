import { EnvironmentalInputs } from "../entities/Simulation";

export interface RunStepDto extends EnvironmentalInputs {}

export interface SimulationResponse {
  success: boolean;
  message: string;
  data?: any;
}