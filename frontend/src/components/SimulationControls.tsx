import { Play, FastForward, Sun, Droplets, RotateCcw } from 'lucide-react';
import type { EnvironmentalInputs, Level } from '../types/simulation';
import LevelSelector from './LevelSelector';

const SUNLIGHT_CONFIG: Record<Level, { icon: string; desc: string; active: string }> = {
  Low:    { icon: '🌑', desc: 'Shade',    active: 'bg-slate-600 border-slate-400 text-white shadow-lg shadow-slate-500/30' },
  Medium: { icon: '⛅', desc: 'Partial',  active: 'bg-amber-500 border-amber-300 text-white shadow-lg shadow-amber-500/40' },
  High:   { icon: '☀️', desc: 'Full sun', active: 'bg-orange-500 border-orange-300 text-white shadow-lg shadow-orange-500/40' },
};

const WATER_CONFIG: Record<Level, { icon: string; desc: string; active: string }> = {
  Low:    { icon: '💧', desc: 'Dry',       active: 'bg-sky-800 border-sky-500 text-white shadow-lg shadow-sky-700/30' },
  Medium: { icon: '🫧', desc: 'Moist',     active: 'bg-blue-500 border-blue-300 text-white shadow-lg shadow-blue-500/40' },
  High:   { icon: '🌊', desc: 'Saturated', active: 'bg-indigo-500 border-indigo-300 text-white shadow-lg shadow-indigo-500/40' },
};

interface Props {
  inputs: EnvironmentalInputs;
  setInputs: (inputs: EnvironmentalInputs) => void;
  onRunStep: () => void;
  onRunMultiple: (days: number) => void;
  onReset: () => void;
  isLoading: boolean;
  runningMode: 'step' | 'multi' | null;
  isResetting: boolean;
}

export default function SimulationControls({
  inputs,
  setInputs,
  onRunStep,
  onRunMultiple,
  onReset,
  isLoading,
  runningMode,
  isResetting,
}: Props) {
  return (
    <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] p-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <div className="w-7 h-7 rounded-lg bg-amber-500/20 flex items-center justify-center">
          <Sun size={14} className="text-amber-400" />
        </div>
        <h2 className="font-semibold text-sm tracking-wide">Environmental Controls</h2>
      </div>

      {/* Selectors */}
      <div className="flex flex-col gap-6">
        <LevelSelector
          label="Sunlight"
          value={inputs.sunlight}
          onChange={(v) => setInputs({ ...inputs, sunlight: v })}
          config={SUNLIGHT_CONFIG}
          accent="text-amber-500"
        />
        <LevelSelector
          label="Water"
          value={inputs.water}
          onChange={(v) => setInputs({ ...inputs, water: v })}
          config={WATER_CONFIG}
          accent="text-blue-400"
        />
      </div>

      {/* Buttons */}
      <div className="mt-6 flex flex-col gap-3">
        {/* Run 1 Day */}
        <button
          onClick={onRunStep}
          disabled={isLoading || isResetting}
          className="group w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-500 hover:to-green-400 text-white font-semibold text-sm shadow-lg shadow-emerald-600/25 hover:shadow-emerald-500/40 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {runningMode === 'step' ? (
            <>
              <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              Simulating…
            </>
          ) : (
            <>
              <Play size={16} className="group-hover:scale-110 transition-transform" />
              Run 1 Day
            </>
          )}
        </button>

        {/* Simulate 10 Days */}
        <button
          onClick={() => onRunMultiple(10)}
          disabled={isLoading || isResetting}
          className="group w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-500 hover:from-violet-500 hover:to-purple-400 text-white font-semibold text-sm shadow-lg shadow-violet-600/25 hover:shadow-violet-500/40 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {runningMode === 'multi' ? (
            <>
              <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              Simulating…
            </>
          ) : (
            <>
              <FastForward size={16} className="group-hover:scale-110 transition-transform" />
              Simulate 10 Days
            </>
          )}
        </button>

        {/* Reset */}
        <button
          onClick={onReset}
          disabled={isResetting}
          className="group w-full flex items-center justify-center gap-2.5 py-3 rounded-xl bg-white/5 hover:bg-rose-500/10 border border-white/10 hover:border-rose-500/30 text-gray-400 hover:text-rose-400 text-sm font-medium transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white/5 disabled:hover:border-white/10 disabled:hover:text-gray-400"
        >
          <RotateCcw size={14} className={isResetting ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-300'} />
          Reset Simulation
        </button>
      </div>

      {/* Hint */}
      <p className="mt-4 text-[11px] text-gray-600 text-center">
        <Droplets size={10} className="inline mr-1" />
        Inputs apply from the next step onward
      </p>
    </div>
  );
}