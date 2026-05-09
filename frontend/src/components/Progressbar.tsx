interface Props {
  value: number;
  color: string;
}

export default function ProgressBar({ value, color }: Props) {
  return (
    <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
      <div
        className={`h-full rounded-full transition-all duration-700 ease-out ${color}`}
        style={{ width: `${value}%` }}
      />
    </div>
  );
}