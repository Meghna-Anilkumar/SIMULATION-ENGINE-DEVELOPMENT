import { EnvironmentalInputs, PlantState, HealthStatus } from '../entities/Simulation';

export class PlantGrowthRules {
  
  static evaluate(inputs: EnvironmentalInputs, current: Partial<PlantState>): PlantState {
    let growthDelta = 0;
    let stressDelta = 0;
    let status: HealthStatus = 'Good';
    let message = 'Conditions applied.';

    const { sunlight, water } = inputs;

    if (water === 'Medium' && sunlight === 'Medium') {
      growthDelta = 9;
      status = 'Excellent';
      message = 'Optimal conditions - Excellent growth!';
    } 
    else if (water === 'Low' && sunlight === 'High') {
      growthDelta = -4;
      stressDelta = 18;
      status = 'Stressed';
      message = 'High dehydration risk under strong sunlight';
    } 
    else if (water === 'High' && sunlight === 'Low') {
      growthDelta = -6;
      stressDelta = 15;
      status = 'RootRot';
      message = 'Root rot risk due to overwatering & low light';
    } 
    else if (water === 'Low' && sunlight === 'Low') {
      growthDelta = -2;
      stressDelta = 8;
      status = 'Wilting';
      message = 'Slow growth due to insufficient resources';
    } 
    else {
      growthDelta = 4;
      message = 'Moderate growth conditions';
    }

    const newGrowth = Math.min(100, Math.max(0, (current.growthLevel || 40) + growthDelta));
    const newStress = Math.min(100, Math.max(0, (current.stressLevel || 10) + stressDelta));

    let finalStatus: HealthStatus = status;
    if (newStress > 75) finalStatus = 'Diseased';
    else if (newStress > 50) finalStatus = 'Stressed';

    return {
      day: (current.day || 0) + 1,
      growthLevel: newGrowth,
      healthStatus: finalStatus,
      stressLevel: newStress,
      message,
      timestamp: new Date()
    };
  }
}