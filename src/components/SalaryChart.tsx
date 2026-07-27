import React from "react";

type BarItem = {
  label: string;
  value: number;
  valueLabel?: string;
};

function fmt(n: number): string {
  return new Intl.NumberFormat("en-US").format(n);
}

function BarChart({ items, maxValue, colors, compact }: {
  items: BarItem[];
  maxValue?: number;
  colors?: string[];
  compact?: boolean;
}) {
  const max = maxValue ?? Math.max(...items.map(i => i.value));
  const barColors = colors ?? ["#059669", "#10b981", "#34d399", "#6ee7b7", "#a7f3d0", "#d1fae5"];

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => {
        const pct = max > 0 ? (item.value / max) * 100 : 0;
        return (
          <div key={item.label} className="flex items-center gap-3">
            <span className={`${compact ? "w-16 text-[10px]" : "w-24 text-xs"} shrink-0 text-right font-medium text-gray-600 leading-tight`}>
              {item.label}
            </span>
            <div className="flex-1 relative h-6 sm:h-7 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.max(pct, 2)}%`, background: `linear-gradient(90deg, ${barColors[i % barColors.length]}, ${barColors[(i + 1) % barColors.length]})` }}
              />
            </div>
            <span className={`${compact ? "w-20" : "w-28"} shrink-0 text-xs sm:text-sm font-semibold text-gray-900 text-right`}>
              {item.valueLabel ?? fmt(item.value)}
            </span>
          </div>
        );
      })}
      <div className="text-right text-[10px] text-gray-400 italic">
        BestPayingJobs.net
      </div>
    </div>
  );
}

function DistributionChart({ items, maxValue }: {
  items: BarItem[];
  maxValue: number;
}) {
  const max = maxValue;
  const colors = ["#dc2626", "#f59e0b", "#eab308", "#10b981", "#059669", "#047857"];

  return (
    <div>
      <div className="flex items-end justify-center gap-2 sm:gap-3 mb-1">
        {items.map((item, i) => {
          const pct = max > 0 ? (item.value / max) * 100 : 0;
          return (
            <div key={item.label} className="flex flex-col items-center">
              <span className="text-[10px] sm:text-xs font-bold text-gray-700 mb-1">{item.valueLabel ?? fmt(item.value)}</span>
              <div className="w-10 sm:w-14 bg-gray-100 rounded-t-lg overflow-hidden" style={{ height: "100px" }}>
                <div
                  className="w-full rounded-t-lg transition-all duration-500"
                  style={{ height: `${Math.max(pct, 2)}%`, background: `linear-gradient(to top, ${colors[i]}, ${colors[i]}dd)` }}
                />
              </div>
              <span className="text-[10px] sm:text-xs text-gray-500 mt-1 font-medium">{item.label}</span>
            </div>
          );
        })}
      </div>
      <div className="text-right text-[10px] text-gray-400 italic mt-2">
        BestPayingJobs.net
      </div>
    </div>
  );
}

function GenderChart({ maleValue, femaleValue, currency, maleLabel, femaleLabel }: {
  maleValue: number;
  femaleValue: number;
  currency: string;
  maleLabel?: string;
  femaleLabel?: string;
}) {
  const max = Math.max(maleValue, femaleValue);
  const gap = Math.round((1 - femaleValue / maleValue) * 100);
  const maleH = max > 0 ? (maleValue / max) * 100 : 0;
  const femaleH = max > 0 ? (femaleValue / max) * 100 : 0;

  return (
    <div>
      <div className="flex items-end justify-center gap-8 sm:gap-16">
        <div className="flex flex-col items-center">
          <span className="text-lg sm:text-xl font-bold text-gray-900">{fmt(maleValue)} {currency}</span>
          <div className="w-20 sm:w-24 bg-blue-50 rounded-lg overflow-hidden mt-2" style={{ height: "120px" }}>
            <div
              className="w-full rounded-lg transition-all duration-500"
              style={{ height: `${maleH}%`, background: "linear-gradient(to top, #1d4ed8, #3b82f6)" }}
            />
          </div>
          <span className="text-sm font-semibold text-gray-600 mt-2">{maleLabel ?? "Male"}</span>
          <span className="text-xs font-bold text-blue-500">+{gap}%</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-lg sm:text-xl font-bold text-gray-900">{fmt(femaleValue)} {currency}</span>
          <div className="w-20 sm:w-24 bg-pink-50 rounded-lg overflow-hidden mt-2" style={{ height: "120px" }}>
            <div
              className="w-full rounded-lg transition-all duration-500"
              style={{ height: `${femaleH}%`, background: "linear-gradient(to top, #be185d, #ec4899)" }}
            />
          </div>
          <span className="text-sm font-semibold text-gray-600 mt-2">{femaleLabel ?? "Female"}</span>
          <span className="text-xs font-bold text-pink-500">-{gap}%</span>
        </div>
      </div>
      <div className="text-right text-[10px] text-gray-400 italic mt-2">
        BestPayingJobs.net
      </div>
    </div>
  );
}

export { BarChart, DistributionChart, GenderChart };
