import axios from 'axios';
import type { EnvironmentalInputs } from '../types/simulation';

const API_BASE_URL = import.meta.env.VITE_API_URL as string;

export const simulationApi = {
  runStep: (inputs: EnvironmentalInputs) =>
    axios.post(`${API_BASE_URL}/step`, inputs),

  getHistory: () =>
    axios.get(`${API_BASE_URL}/history`),

  reset: () =>
    axios.post(`${API_BASE_URL}/reset`),
};