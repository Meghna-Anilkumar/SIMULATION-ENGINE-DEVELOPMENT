import { TrendingUp, Sprout, AlertTriangle } from 'lucide-react';
import type { PlantState, HealthStatus } from '../types/simulation';
import StatusBadge from './Statusbadge';
import ProgressBar from './Progressbar';

interface Props {
  current: PlantState;
}

export default function PlantStatusCard({ current }: Props) {
  return (
    <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] p-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-5">
        <div className="w-7 h-7 rounded-lg bg-green-500/20 flex items-center justify-center">
          <TrendingUp size={14} className="text-green-400" />
        </div>
        <h2 className="font-semibold text-sm tracking-wide">Plant Status</h2>
      </div>

      {/* Day + badge */}
      <div className="flex items-end justify-between mb-6">
        <div>
          <p className="text-[11px] uppercase tracking-widest text-gray-500 mb-0.5">Current day</p>
          <p className="text-5xl font-bold tabular-nums tracking-tight">{current.day}</p>
        </div>
        <StatusBadge status={current.healthStatus as HealthStatus} />
      </div>

      {/* Progress bars */}
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-xs mb-2">
            <span className="text-gray-400 flex items-center gap-1.5">
              <Sprout size={11} className="text-emerald-400" />
              Growth
            </span>
            <span className="font-semibold text-emerald-400">{current.growthLevel}%</span>
          </div>
          <ProgressBar
            value={current.growthLevel}
            color="bg-gradient-to-r from-emerald-600 to-green-400"
          />
        </div>

        <div>
          <div className="flex justify-between text-xs mb-2">
            <span className="text-gray-400 flex items-center gap-1.5">
              <AlertTriangle size={11} className="text-red-400" />
              Stress
            </span>
            <span className="font-semibold text-red-400">{current.stressLevel}%</span>
          </div>
          <ProgressBar
            value={current.stressLevel}
            color="bg-gradient-to-r from-red-600 to-rose-400"
          />
        </div>
      </div>

      {/* Engine message */}
      {current.message ? (
        <div className="mt-5 p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-400 leading-relaxed">
          <span className="text-emerald-400 font-semibold">Engine: </span>
          {current.message}
        </div>
      ) : (
        <div className="mt-5 p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-500 text-center">
          No simulation data yet
        </div>
      )}
    </div>
  );
}