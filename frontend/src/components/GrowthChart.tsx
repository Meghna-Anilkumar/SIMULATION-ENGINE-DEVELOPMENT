import { Line } from 'react-chartjs-2';
import type { PlantState } from '../types/simulation';
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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface Props {
  history: PlantState[];
}

export default function GrowthChart({ history }: Props) {
  const data = {
    labels: history.map(h => `Day ${h.day}`),
    datasets: [
      {
        label: 'Growth Level (%)',
        data: history.map(h => h.growthLevel),
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Stress Level (%)',
        data: history.map(h => h.stressLevel),
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
    },
    scales: {
      y: { min: 0, max: 100 },
    },
  };

  return <Line data={data} options={options} />;
}