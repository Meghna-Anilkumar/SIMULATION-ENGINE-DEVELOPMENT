import { useState, useEffect } from 'react';
import axios from 'axios';
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
} from 'chart.js';
import { Leaf, Droplet, Sun, RotateCcw, Play } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const API_BASE = import.meta.env.VITE_API_URL as string;

type PlantState = {
  day: number;
  growthLevel: number;
  healthStatus: string;
  stressLevel: number;
  message: string;
};

const statusColors: Record<string, string> = {
  Excellent: 'bg-green-500',
  Good: 'bg-emerald-500',
  Stressed: 'bg-yellow-500',
  Wilting: 'bg-orange-500',
  RootRot: 'bg-red-500',
  Diseased: 'bg-rose-600',
};

function App() {
  const [sunlight, setSunlight] = useState<'Low' | 'Medium' | 'High'>('Medium');
  const [water, setWater] = useState<'Low' | 'Medium' | 'High'>('Medium');
  const [history, setHistory] = useState<PlantState[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const fetchHistory = async () => {
    const res = await axios.get(`${API_BASE}/history`);
    setHistory(res.data.data || []);
  };


  useEffect(() => {
    void (async () => {
      await fetchHistory();
    })();
  }, []);

  const runStep = async () => {
    setIsRunning(true);
    await axios.post(`${API_BASE}/step`, { sunlight, water });
    await fetchHistory();
    setIsRunning(false);
  };

  const runMultiple = async (days: number) => {
    setIsRunning(true);
    for (let i = 0; i < days; i++) {
      await axios.post(`${API_BASE}/step`, { sunlight, water });
    }
    await fetchHistory();
    setIsRunning(false);
  };

  const resetSimulation = async () => {
    await axios.post(`${API_BASE}/reset`);
    setHistory([]);
  };


  const currentState: PlantState = history[history.length - 1] ?? {
    growthLevel: 30,
    healthStatus: 'Good',
    stressLevel: 20,
    day: 0,
    message: '',
  };

  const chartData = {
    labels: history.map((h) => `Day ${h.day}`),
    datasets: [
      {
        label: 'Growth Level',
        data: history.map((h) => h.growthLevel),
        borderColor: '#4ade80',
        backgroundColor: 'rgba(74, 222, 128, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Stress Level',
        data: history.map((h) => h.stressLevel),
        borderColor: '#f87171',
        backgroundColor: 'rgba(248, 113, 113, 0.1)',
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-green-950 to-emerald-950 text-white">
      <header className="border-b border-white/10 bg-black/30 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">FieldSense</h1>
              <p className="text-xs text-green-400 -mt-1">Simulation Engine</p>
            </div>
          </div>
          <button
            onClick={resetSimulation}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Sun className="text-amber-400" /> Environmental Conditions
            </h2>

            <div className="mb-8">
              <label className="text-sm text-green-400 mb-3 block">SUNLIGHT</label>
              <div className="grid grid-cols-3 gap-3">
                {(['Low', 'Medium', 'High'] as const).map((level) => (
                  <button
                    key={level}
                    onClick={() => setSunlight(level)}
                    className={`py-4 rounded-2xl font-medium transition-all ${
                      sunlight === level
                        ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/50'
                        : 'bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm text-green-400 mb-3 block">WATER</label>
              <div className="grid grid-cols-3 gap-3">
                {(['Low', 'Medium', 'High'] as const).map((level) => (
                  <button
                    key={level}
                    onClick={() => setWater(level)}
                    className={`py-4 rounded-2xl font-medium transition-all flex items-center justify-center gap-2 ${
                      water === level
                        ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/50'
                        : 'bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    <Droplet className="w-5 h-5" />
                    {level}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-10 space-y-3">
              <button
                onClick={runStep}
                disabled={isRunning}
                className="w-full py-4 bg-green-600 hover:bg-green-500 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all disabled:opacity-70"
              >
                <Play className="w-5 h-5" />
                RUN ONE DAY
              </button>

              <button
                onClick={() => runMultiple(10)}
                disabled={isRunning}
                className="w-full py-4 bg-white/10 hover:bg-white/20 rounded-2xl font-semibold transition-all"
              >
                SIMULATE 10 DAYS
              </button>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
            <h3 className="text-lg font-medium mb-4">Current Status</h3>
            <div className="flex justify-between items-center mb-6">
              <div>
                <p className="text-sm text-gray-400">Day</p>
                <p className="text-4xl font-bold">{currentState.day}</p>
              </div>
              <div className={`px-5 py-2 rounded-full text-sm font-medium text-white ${statusColors[currentState.healthStatus] ?? 'bg-gray-500'}`}>
                {currentState.healthStatus}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-1.5">
                  <span>Growth</span>
                  <span className="font-medium">{currentState.growthLevel}%</span>
                </div>
                <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 rounded-full transition-all"
                    style={{ width: `${currentState.growthLevel}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1.5">
                  <span>Stress</span>
                  <span className="font-medium text-red-400">{currentState.stressLevel}%</span>
                </div>
                <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-red-500 rounded-full transition-all"
                    style={{ width: `${currentState.stressLevel}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 h-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">Plant Growth Progression</h2>
              <p className="text-green-400 text-sm">Real-time Simulation</p>
            </div>

            {history.length > 0 ? (
              <div className="h-[520px]">
                <Line
                  data={chartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { position: 'top' } },
                    scales: {
                      y: { min: 0, max: 100, grid: { color: 'rgba(255,255,255,0.1)' } },
                      x: { grid: { color: 'rgba(255,255,255,0.1)' } },
                    },
                  }}
                />
              </div>
            ) : (
              <div className="h-[520px] flex items-center justify-center text-center">
                <div>
                  <Leaf className="w-20 h-20 mx-auto text-green-600/30 mb-4" />
                  <p className="text-xl text-gray-400">Start simulation to see growth curve</p>
                </div>
              </div>
            )}

            {currentState.message && (
              <div className="mt-6 p-4 bg-white/10 rounded-2xl text-sm border-l-4 border-green-500">
                💡 {currentState.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;