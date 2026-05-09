import { useState, useEffect } from 'react';
import { Leaf, RotateCcw, Activity } from 'lucide-react';
import { simulationApi } from './services/api';
import type { PlantState, EnvironmentalInputs, HealthStatus } from './types/simulation';
import SimulationControls from './components/SimulationControls';
import PlantStatusCard from './components/PlantStatusCard';
import GrowthChart from './components/GrowthChart';
import HistoryLog from './components/HistoryLog';
import ResetConfirmModal from './components/ResetConfirmModal';

const DEFAULT_STATE: PlantState = {
  day: 0,
  growthLevel: 0,
  healthStatus: 'Good' as HealthStatus,
  stressLevel: 0,
  message: '',
};

export default function App() {
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
      console.error('Failed to fetch history');
    }
  };

  useEffect(() => {
    void (async () => { await fetchHistory(); })();
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

      {/* Reset modal */}
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

        <div className="xl:col-span-8 flex flex-col gap-5">
          <GrowthChart history={history} />
          <HistoryLog history={history} />
        </div>
      </main>
    </div>
  );
}