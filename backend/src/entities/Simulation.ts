export type HealthStatus = 'Excellent' | 'Good' | 'Stressed' | 'Wilting' | 'RootRot' | 'Diseased';

export interface EnvironmentalInputs {
  sunlight: 'Low' | 'Medium' | 'High';
  water: 'Low' | 'Medium' | 'High';
  humidity?: 'Low' | 'Medium' | 'High';
}

export interface PlantState {
  day: number;
  growthLevel: number;
  healthStatus: HealthStatus;
  stressLevel: number;
  message: string;
  timestamp: Date;
}