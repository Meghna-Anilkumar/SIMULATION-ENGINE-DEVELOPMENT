interface LevelConfig {
  icon: string;
  desc: string;
  active: string;
}

interface Props<T extends string> {
  label: string;
  value: T;
  onChange: (v: T) => void;
  config: Record<string, LevelConfig>;
  accent: string;
}

export default function LevelSelector<T extends string>({
  label,
  value,
  onChange,
  config,
  accent,
}: Props<T>) {
  return (
    <div>
      <p className={`text-xs font-semibold tracking-widest uppercase mb-3 ${accent}`}>
        {label}
      </p>
      <div className="grid grid-cols-3 gap-2">
        {(Object.keys(config) as T[]).map((level) => {
          const cfg = config[level as string];
          const isActive = value === level;
          return (
            <button
              key={level}
              onClick={() => onChange(level)}
              className={`flex flex-col items-center gap-1 py-3 px-2 rounded-xl border text-sm font-medium transition-all duration-200 ${
                isActive
                  ? cfg.active
                  : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:border-white/20 hover:text-gray-200'
              }`}
            >
              <span className="text-lg leading-none">{cfg.icon}</span>
              <span className="text-xs font-semibold">{level}</span>
              <span className={`text-[10px] ${isActive ? 'opacity-80' : 'opacity-50'}`}>
                {cfg.desc}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}