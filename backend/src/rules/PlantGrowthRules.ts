import { EnvironmentalInputs, PlantState, HealthStatus } from '../entities/Simulation';

interface RuleResult {
  growthDelta: number;
  stressDelta: number;
  status: HealthStatus;
  message: string;
  isOptimal: boolean;
}


const RULES: Array<{
  condition: (i: EnvironmentalInputs) => boolean;
  result: Omit<RuleResult, 'isOptimal'> & { isOptimal?: boolean };
}> = [
  {
    condition: (i) => i.water === 'Medium' && i.sunlight === 'Medium',
    result: { growthDelta: 9, stressDelta: -3, status: 'Excellent', message: 'Optimal conditions — excellent growth!', isOptimal: true },
  },
  {
    condition: (i) => i.water === 'High' && i.sunlight === 'High',
    result: { growthDelta: 5, stressDelta: 5, status: 'Good', message: 'Good growth, slight overwatering risk' },
  },
  {
    condition: (i) => i.water === 'Low' && i.sunlight === 'High',
    result: { growthDelta: -4, stressDelta: 18, status: 'Stressed', message: 'High dehydration risk under strong sunlight' },
  },
  {
    condition: (i) => i.water === 'High' && i.sunlight === 'Low',
    result: { growthDelta: -6, stressDelta: 15, status: 'RootRot', message: 'Root rot risk — overwatering with low light' },
  },
  {
    condition: (i) => i.water === 'Low' && i.sunlight === 'Low',
    result: { growthDelta: -2, stressDelta: 8, status: 'Wilting', message: 'Slow growth — insufficient water and light' },
  },
  {
    condition: (i) => i.water === 'Medium' && i.sunlight === 'High',
    result: { growthDelta: 6, stressDelta: 2, status: 'Good', message: 'Strong sunlight with adequate water — good growth' },
  },
  {
    condition: (i) => i.water === 'High' && i.sunlight === 'Medium',
    result: { growthDelta: 4, stressDelta: 4, status: 'Good', message: 'Slightly overwatered but manageable' },
  },
  {
    condition: (i) => i.water === 'Low' && i.sunlight === 'Medium',
    result: { growthDelta: 1, stressDelta: 6, status: 'Stressed', message: 'Under-watered — moderate stress building' },
  },
];

const DEFAULT_RESULT: RuleResult = {
  growthDelta: 3,
  stressDelta: 0,
  status: 'Good',
  message: 'Moderate conditions — steady growth',
  isOptimal: false,
};


function applyJitter(value: number): number {
  const jitter = 1 + (Math.random() * 0.4 - 0.2); 
  return Math.round(value * jitter);
}

export class PlantGrowthRules {
  static evaluate(inputs: EnvironmentalInputs, current: Partial<PlantState>): PlantState {
    const matchedRule = RULES.find((r) => r.condition(inputs));
    const base: RuleResult = matchedRule
      ? { isOptimal: false, ...matchedRule.result }
      : DEFAULT_RESULT;

    const currentOptimalStreak = current.consecutiveOptimalDays ?? 0;
    const newOptimalStreak = base.isOptimal ? currentOptimalStreak + 1 : 0;


    const streakBonus = base.isOptimal ? Math.min(5, Math.floor(newOptimalStreak / 3)) : 0;

    const rawGrowthDelta = base.growthDelta + streakBonus;
    const jitteredGrowthDelta = applyJitter(rawGrowthDelta);
    const jitteredStressDelta = applyJitter(base.stressDelta);

    const newGrowth = Math.min(100, Math.max(0, (current.growthLevel ?? 40) + jitteredGrowthDelta));
    const newStress = Math.min(100, Math.max(0, (current.stressLevel ?? 10) + jitteredStressDelta));


    let finalStatus: HealthStatus = base.status;
    let finalMessage: string = base.message;

    if (newStress > 75) {
      finalStatus = 'Diseased';
      finalMessage = 'Plant is diseased — stress levels critical!';
    } else if (newStress > 50) {
      finalStatus = 'Stressed';
      finalMessage = `${base.message} (stress building)`;
    }

    return {
      day: (current.day ?? 0) + 1,
      growthLevel: newGrowth,
      healthStatus: finalStatus,
      stressLevel: newStress,
      consecutiveOptimalDays: newOptimalStreak,
      message: finalMessage,
      timestamp: new Date(),
    };
  }
}