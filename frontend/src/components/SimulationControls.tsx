import { Play, RotateCcw, FastForward } from 'lucide-react';
import type { EnvironmentalInputs } from '../types/simulation';

interface Props {
  inputs: EnvironmentalInputs;
  setInputs: (inputs: EnvironmentalInputs) => void;
  onRunStep: () => void;
  onRunMultiple: (days: number) => void;
  onReset: () => void;
  isLoading: boolean;
}

const levels = ['Low', 'Medium', 'High'] as const;

export default function SimulationControls({
  inputs, setInputs, onRunStep, onRunMultiple, onReset, isLoading
}: Props) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Environmental Controls</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Water */}
        <div>
          <label className="block text-sm font-medium mb-2">Water Level</label>
          <div className="flex gap-2">
            {levels.map(level => (
              <button
                key={level}
                onClick={() => setInputs({ ...inputs, water: level })}
                className={`flex-1 py-3 rounded-xl font-medium transition-all ${
                  inputs.water === level
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* Sunlight */}
        <div>
          <label className="block text-sm font-medium mb-2">Sunlight Level</label>
          <div className="flex gap-2">
            {levels.map(level => (
              <button
                key={level}
                onClick={() => setInputs({ ...inputs, sunlight: level })}
                className={`flex-1 py-3 rounded-xl font-medium transition-all ${
                  inputs.sunlight === level
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={onRunStep}
          disabled={isLoading}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold disabled:opacity-70"
        >
          <Play size={20} /> Run 1 Day
        </button>

        <button
          onClick={() => onRunMultiple(10)}
          disabled={isLoading}
          className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-xl font-semibold disabled:opacity-70"
        >
          <FastForward size={20} /> Run 10 Days
        </button>

        <button
          onClick={onReset}
          className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-xl font-semibold"
        >
          <RotateCcw size={20} /> Reset Simulation
        </button>
      </div>
    </div>
  );
}