import { useState, useEffect } from 'react';
import { Leaf, RotateCcw, Activity, AlertTriangle, X } from 'lucide-react';
import { simulationApi } from '../services/api';
import type { PlantState, EnvironmentalInputs, HealthStatus } from '../types/simulation';
import SimulationControls from '../components/SimulationControls';
import PlantStatusCard from '../components/PlantStatusCard';
import GrowthChart from '../components/GrowthChart';
import HistoryLog from '../components/HistoryLog';

const DEFAULT_STATE: PlantState = {
  day: 0,
  growthLevel: 0,
  healthStatus: 'Good' as HealthStatus,
  stressLevel: 0,
  message: '',
};

function ResetConfirmModal({
  onConfirm,
  onCancel,
  isResetting,
}: {
  onConfirm: () => void;
  onCancel: () => void;
  isResetting: boolean;
}) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={!isResetting ? onCancel : undefined}
      />
      {/* Modal */}
      <div className="relative w-full max-w-sm rounded-2xl bg-[#0e1a2b] border border-white/10 shadow-2xl shadow-black/60 p-6 flex flex-col gap-5">
        {/* Close button */}
        {!isResetting && (
          <button
            onClick={onCancel}
            className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center rounded-lg text-gray-500 hover:text-gray-300 hover:bg-white/10 transition-all"
          >
            <X size={15} />
          </button>
        )}
        {/* Icon + Title */}
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
            <AlertTriangle size={22} className="text-rose-400" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-white">Reset Simulation?</h2>
            <p className="text-sm text-gray-400 mt-1 leading-relaxed">
              This will permanently erase all simulated days and plant history. This action cannot be undone.
            </p>
          </div>
        </div>
        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            disabled={isResetting}
            className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-medium text-gray-300 hover:text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isResetting}
            className="flex-1 px-4 py-2.5 rounded-xl bg-rose-500/90 hover:bg-rose-500 border border-rose-400/20 text-sm font-semibold text-white transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isResetting ? (
              <>
                <RotateCcw size={14} className="animate-spin" />
                Resetting…
              </>
            ) : (
              'Reset'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [inputs, setInputs] = useState<EnvironmentalInputs>({
    sunlight: 'Medium',
    water: 'Medium',
  });
  const [history, setHistory] = useState<PlantState[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [runningMode, setRunningMode] = useState<'step' | 'multi' | null>(null);
  const [showResetModal, setShowResetModal] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const fetchHistory = async () => {
    try {
      const res = await simulationApi.getHistory();
      setHistory(res.data.data ?? []);
    } catch {
      // silently ignore
    }
  };

  useEffect(() => {
    void (async () => {
      await fetchHistory();
    })();
  }, []);

  const runStep = async () => {
    setIsLoading(true);
    setRunningMode('step');
    try {
      await simulationApi.runStep(inputs);
      await fetchHistory();
    } catch {
      alert('Error running simulation step');
    } finally {
      setIsLoading(false);
      setRunningMode(null);
    }
  };

  const runMultiple = async (days: number) => {
    setIsLoading(true);
    setRunningMode('multi');
    try {
      for (let i = 0; i < days; i++) {
        await simulationApi.runStep(inputs);
      }
      await fetchHistory();
    } catch {
      alert('Error running multiple days');
    } finally {
      setIsLoading(false);
      setRunningMode(null);
    }
  };

  const handleResetConfirm = async () => {
    setIsResetting(true);
    try {
      await simulationApi.reset();
      setHistory([]);
      setShowResetModal(false);
    } catch {
      alert('Reset failed');
    } finally {
      setIsResetting(false);
    }
  };

  const current: PlantState = history[history.length - 1] ?? DEFAULT_STATE;

  return (
    <div className="min-h-screen bg-[#080f1a] text-white font-sans">
      {/* Background glow */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(16,185,129,0.06)_0%,transparent_60%),radial-gradient(ellipse_at_bottom_right,rgba(59,130,246,0.05)_0%,transparent_60%)] pointer-events-none" />

      {/* Reset confirm modal */}
      {showResetModal && (
        <ResetConfirmModal
          onConfirm={handleResetConfirm}
          onCancel={() => setShowResetModal(false)}
          isResetting={isResetting}
        />
      )}

      {/* Header */}
      <header className="relative border-b border-white/[0.07] bg-[#080f1a]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <Leaf size={18} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">FieldSense</h1>
              <p className="text-[11px] text-emerald-400/80 -mt-0.5 tracking-wider uppercase">
                Simulation Engine
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {history.length > 0 && (
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-gray-400">
                <Activity size={12} className="text-emerald-400" />
                <span>{history.length} days simulated</span>
              </div>
            )}
            <button
              onClick={() => setShowResetModal(true)}
              disabled={isResetting}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-rose-500/10 border border-white/10 hover:border-rose-500/30 text-gray-400 hover:text-rose-400 transition-all duration-200 text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white/5 disabled:hover:border-white/10 disabled:hover:text-gray-400"
            >
              <RotateCcw size={14} className={isResetting ? 'animate-spin' : ''} />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main layout */}
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 py-6 grid grid-cols-1 xl:grid-cols-12 gap-5">
        {/* Left column */}
        <div className="xl:col-span-4 flex flex-col gap-5">
          <SimulationControls
            inputs={inputs}
            setInputs={setInputs}
            onRunStep={runStep}
            onRunMultiple={runMultiple}
            onReset={() => setShowResetModal(true)}
            isLoading={isLoading}
            runningMode={runningMode}
            isResetting={isResetting}
          />
          <PlantStatusCard current={current} />
        </div>

        {/* Right column */}
        <div className="xl:col-span-8 flex flex-col gap-5">
          <GrowthChart history={history} />
          <HistoryLog history={history} />
        </div>
      </main>
    </div>
  );
}