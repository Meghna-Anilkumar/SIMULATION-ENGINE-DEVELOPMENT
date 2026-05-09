import { Activity } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Leaf } from 'lucide-react';
import type { PlantState } from '../types/simulation';

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement,
  Title, Tooltip, Legend, Filler
);

interface Props {
  history: PlantState[];
}

export default function GrowthChart({ history }: Props) {
  const sparse = history.length > 20;

  const chartData = {
    labels: history.map((h) => `D${h.day}`),
    datasets: [
      {
        label: 'Growth',
        data: history.map((h) => h.growthLevel),
        borderColor: '#34d399',
        backgroundColor: 'rgba(52,211,153,0.08)',
        tension: 0.4,
        fill: true,
        pointRadius: sparse ? 0 : 4,
        pointHoverRadius: 6,
        pointBackgroundColor: '#34d399',
        borderWidth: 2.5,
      },
      {
        label: 'Stress',
        data: history.map((h) => h.stressLevel),
        borderColor: '#f87171',
        backgroundColor: 'rgba(248,113,113,0.08)',
        tension: 0.4,
        fill: true,
        pointRadius: sparse ? 0 : 4,
        pointHoverRadius: 6,
        pointBackgroundColor: '#f87171',
        borderWidth: 2.5,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { intersect: false, mode: 'index' as const },
    plugins: {
      legend: {
        position: 'top' as const,
        labels: { color: '#9ca3af', font: { size: 12 }, boxWidth: 12, padding: 20 },
      },
      tooltip: {
        backgroundColor: 'rgba(15,23,42,0.95)',
        titleColor: '#f1f5f9',
        bodyColor: '#94a3b8',
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
      },
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        grid: { color: 'rgba(255,255,255,0.05)' },
        ticks: { color: '#6b7280', stepSize: 25 },
        border: { display: false },
      },
      x: {
        grid: { display: false },
        ticks: { color: '#6b7280', maxTicksLimit: 12 },
        border: { display: false },
      },
    },
  };

  const peakGrowth = history.length > 0 ? Math.max(...history.map((h) => h.growthLevel)) : 0;
  const peakStress = history.length > 0 ? Math.max(...history.map((h) => h.stressLevel)) : 0;

  return (
    <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] p-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-blue-500/20 flex items-center justify-center">
            <Activity size={14} className="text-blue-400" />
          </div>
          <h2 className="font-semibold text-sm tracking-wide">Growth Progression</h2>
        </div>

        {history.length > 0 && (
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 rounded bg-emerald-400 inline-block" />
              Peak growth:
              <strong className="text-emerald-400 ml-1">{peakGrowth}%</strong>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 rounded bg-red-400 inline-block" />
              Peak stress:
              <strong className="text-red-400 ml-1">{peakStress}%</strong>
            </span>
          </div>
        )}
      </div>

      {/* Chart or empty state */}
      {history.length > 0 ? (
        <div className="h-72 sm:h-96 xl:h-[420px]">
          <Line data={chartData} options={chartOptions} />
        </div>
      ) : (
        <div className="h-72 sm:h-96 xl:h-[420px] flex flex-col items-center justify-center gap-4 text-center">
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
            <Leaf size={28} className="text-emerald-700" />
          </div>
          <div>
            <p className="text-gray-400 font-medium">No data yet</p>
            <p className="text-gray-600 text-sm mt-1">Run the simulation to see growth curves</p>
          </div>
        </div>
      )}
    </div>
  );
}