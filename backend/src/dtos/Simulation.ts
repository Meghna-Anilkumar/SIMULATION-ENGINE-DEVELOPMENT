import { IsIn } from 'class-validator';

const LEVELS = ['Low', 'Medium', 'High'] as const;
type Level = typeof LEVELS[number];

export class RunStepDto {
  @IsIn(LEVELS, { message: 'sunlight must be Low, Medium, or High' })
  sunlight!: Level;

  @IsIn(LEVELS, { message: 'water must be Low, Medium, or High' })
  water!: Level;
} 