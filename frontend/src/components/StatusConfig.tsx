import {
  CheckCircle2,
  Sprout,
  AlertTriangle,
  Wind,
  FlameKindling,
  Skull,
} from 'lucide-react';
import type { HealthStatus } from '../types/simulation';

export const STATUS_CONFIG: Record<
  HealthStatus,
  { color: string; bg: string; border: string; icon: React.ReactNode; label: string }
> = {
  Excellent: { color: 'text-emerald-300', bg: 'bg-emerald-500/20', border: 'border-emerald-500/40', icon: <CheckCircle2 size={13} />, label: 'Excellent' },
  Good:      { color: 'text-green-300',   bg: 'bg-green-500/20',   border: 'border-green-500/40',   icon: <Sprout size={13} />,       label: 'Good' },
  Stressed:  { color: 'text-yellow-300',  bg: 'bg-yellow-500/20',  border: 'border-yellow-500/40',  icon: <AlertTriangle size={13} />, label: 'Stressed' },
  Wilting:   { color: 'text-orange-300',  bg: 'bg-orange-500/20',  border: 'border-orange-500/40',  icon: <Wind size={13} />,          label: 'Wilting' },
  RootRot:   { color: 'text-red-300',     bg: 'bg-red-500/20',     border: 'border-red-500/40',     icon: <FlameKindling size={13} />, label: 'Root Rot' },
  Diseased:  { color: 'text-rose-300',    bg: 'bg-rose-500/20',    border: 'border-rose-500/40',    icon: <Skull size={13} />,         label: 'Diseased' },
};