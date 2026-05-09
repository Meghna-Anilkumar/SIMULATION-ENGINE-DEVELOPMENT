export type Level = 'Low' | 'Medium' | 'High';

export type HealthStatus =
  | 'Excellent'
  | 'Good'
  | 'Stressed'
  | 'Wilting'
  | 'RootRot'
  | 'Diseased';

export interface EnvironmentalInputs {
  sunlight: Level;
  water: Level;
}

export interface PlantState {
  day: number;
  growthLevel: number;
  healthStatus: HealthStatus;
  stressLevel: number;
  message: string;
  timestamp?: string;
}