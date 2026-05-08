import { useState, useEffect } from 'react';
import SimulationControls from '../components/SimulationControls';
import GrowthChart from '../components/GrowthChart';
import { simulationApi } from '../services/api';
import type { PlantState, EnvironmentalInputs, HealthStatus } from '../types/simulation';

const getStatusColor = (status: HealthStatus) => {
  switch (status) {
    case 'Excellent': return 'bg-emerald-500';
    case 'Good': return 'bg-green-500';
    case 'Stressed': return 'bg-yellow-500';
    case 'Wilting': return 'bg-orange-500';
    case 'RootRot': return 'bg-red-500';
    case 'Diseased': return 'bg-rose-700';
    default: return 'bg-gray-500';
  }
};

export default function Dashboard() {
  const [history, setHistory] = useState<PlantState[]>([]);
  const [currentInputs, setCurrentInputs] = useState<EnvironmentalInputs>({
    sunlight: 'Medium',
    water: 'Medium',
  });
  const [isLoading, setIsLoading] = useState(false);

  const fetchHistory = async () => {
    try {
      const res = await simulationApi.getHistory();
      setHistory(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const runStep = async () => {
    setIsLoading(true);
    try {
      await simulationApi.runStep(currentInputs);
      await fetchHistory();
    } catch (err) {
      alert("Error running simulation step");
    } finally {
      setIsLoading(false);
    }
  };

  const runMultiple = async (days: number) => {
    setIsLoading(true);
    try {
      for (let i = 0; i < days; i++) {
        await simulationApi.runStep(currentInputs);
      }
      await fetchHistory();
    } catch (err) {
      alert("Error running multiple days");
    } finally {
      setIsLoading(false);
    }
  };

  const reset = async () => {
    if (!confirm("Reset entire simulation?")) return;
    setIsLoading(true);
    try {
      await simulationApi.reset();
      setHistory([]);
    } catch (err) {
      alert("Reset failed");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const latest = history[history.length - 1];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-emerald-800 mb-2">FieldSense Simulation Engine</h1>
          <p className="text-emerald-700">Interactive Plant Growth Simulator</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls */}
          <div className="lg:col-span-5">
            <SimulationControls
              inputs={currentInputs}
              setInputs={setCurrentInputs}
              onRunStep={runStep}
              onRunMultiple={runMultiple}
              onReset={reset}
              isLoading={isLoading}
            />
          </div>

          {/* Current Status */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Current Plant Status</h2>
              
              {latest ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div>
                    <p className="text-sm text-gray-500">Day</p>
                    <p className="text-4xl font-bold">{latest.day}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Growth</p>
                    <p className="text-4xl font-bold text-emerald-600">{latest.growthLevel}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Stress</p>
                    <p className="text-4xl font-bold text-red-600">{latest.stressLevel}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Health</p>
                    <div className={`inline-block px-4 py-2 rounded-full text-white font-medium ${getStatusColor(latest.healthStatus)}`}>
                      {latest.healthStatus}
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">No simulation data yet. Run first day.</p>
              )}

              {latest && <p className="mt-6 text-gray-600 italic">"{latest.message}"</p>}
            </div>
          </div>

          {/* Chart */}
          <div className="lg:col-span-12 bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Growth & Stress Progression</h2>
            {history.length > 0 ? (
              <GrowthChart history={history} />
            ) : (
              <div className="h-96 flex items-center justify-center text-gray-400">
                Run simulation to see growth chart
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}