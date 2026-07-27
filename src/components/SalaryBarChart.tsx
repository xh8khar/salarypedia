interface BarItem {
  label: string;
  value: number;
  valueLabel: string;
  pct?: number;
  color?: string;
}

interface Props {
  items: BarItem[];
  maxValue?: number;
  currency?: string;
  compact?: boolean;
}

const COLORS = ["bg-emerald-500", "bg-emerald-400", "bg-emerald-600", "bg-emerald-300", "bg-emerald-700"];

export default function SalaryBarChart({ items, maxValue, compact }: Props) {
  const max = maxValue ?? Math.max(...items.map((i) => i.value));
  return (
    <div className="space-y-2">
      {items.map((item, idx) => {
        const pct = item.pct ?? (max > 0 ? Math.round((item.value / max) * 100) : 0);
        const color = item.color ?? COLORS[idx % COLORS.length];
        return (
          <div key={item.label} className="flex items-center gap-3">
            <span className={`${compact ? "w-24 text-[11px]" : "w-28 text-xs"} text-gray-600 font-medium shrink-0 text-right`}>
              {item.label}
            </span>
            <div className={`flex-1 bg-gray-100 rounded-full overflow-hidden ${compact ? "h-5" : "h-6"}`}>
              <div
                className={`${color} h-full rounded-full transition-all duration-700 flex items-center ${compact ? "px-2" : "px-3"}`}
                style={{ width: `${Math.max(pct, compact ? 3 : 2)}%` }}
              >
                <span className={`text-white font-semibold ${compact ? "text-[10px]" : "text-xs"} whitespace-nowrap`}>
                  {item.valueLabel}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
