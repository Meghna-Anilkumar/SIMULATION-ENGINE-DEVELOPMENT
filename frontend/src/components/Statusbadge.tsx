import type { HealthStatus } from '../types/simulation';
import { STATUS_CONFIG } from './StatusConfig';

interface Props {
  status: HealthStatus;
}

export default function StatusBadge({ status }: Props) {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.Good;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${cfg.bg} ${cfg.color} ${cfg.border}`}
    >
      {cfg.icon}
      {cfg.label}
    </span>
  );
}