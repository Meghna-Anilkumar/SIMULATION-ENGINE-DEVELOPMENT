import { Droplets } from 'lucide-react';
import type { PlantState, HealthStatus } from '../types/simulation';
import { STATUS_CONFIG } from './StatusConfig';

interface Props {
  history: PlantState[];
}

export default function HistoryLog({ history }: Props) {
  if (history.length === 0) return null;

  const recent = [...history].reverse().slice(0, 15);

  return (
    <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] p-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-7 h-7 rounded-lg bg-purple-500/20 flex items-center justify-center">
          <Droplets size={14} className="text-purple-400" />
        </div>
        <h2 className="font-semibold text-sm tracking-wide">Recent History</h2>
        <span className="ml-auto text-[11px] text-gray-600">{history.length} entries</span>
      </div>

      {/* Rows */}
      <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
        {recent.map((h) => {
          const cfg = STATUS_CONFIG[h.healthStatus as HealthStatus] ?? STATUS_CONFIG.Good;
          return (
            <div
              key={h.day}
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors text-xs"
            >
              <span className="text-gray-600 w-12 tabular-nums shrink-0">Day {h.day}</span>
              <div className="flex items-center gap-1.5 w-24 shrink-0">
                <span className={cfg.color}>{cfg.icon}</span>
                <span className={`${cfg.color} font-medium`}>{cfg.label}</span>
              </div>
              <div className="flex items-center gap-3 ml-auto text-gray-500 shrink-0">
                <span className="text-emerald-500 tabular-nums">↑ {h.growthLevel}%</span>
                <span className="text-red-500 tabular-nums">⚡ {h.stressLevel}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}