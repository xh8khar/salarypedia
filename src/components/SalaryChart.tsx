import RankedBarChart from "./RankedBarChart";

type BarItem = {
  label: string;
  value: number;
  valueLabel?: string;
};

function fmt(n: number): string {
  return new Intl.NumberFormat("en-US").format(n);
}

function Watermark() {
  return (
    <p className="text-right text-[10px] text-gray-400 italic mt-3">BestPayingJobs.net</p>
  );
}

/**
 * These series are ordered rather than ranked — education levels and
 * experience bands have a natural sequence — so the numbered badges are off.
 */
function BarChart({ items, maxValue }: { items: BarItem[]; maxValue?: number }) {
  return (
    <div>
      <RankedBarChart items={items} max={maxValue} showRank={false} />
      <Watermark />
    </div>
  );
}

/**
 * Salary distribution as columns rising from a shared baseline.
 *
 * The colour runs cool-to-warm across the percentiles so the spread is legible
 * at a glance, and each column keeps its own height — the previous version
 * anchored the fill to the top of a fixed-height box, which made the minimum
 * and the maximum look identical.
 */
function DistributionChart({ items, maxValue }: { items: BarItem[]; maxValue: number }) {
  const ramp = [
    ["--color-gold-600", "--color-gold-400"],
    ["--color-gold-500", "--color-gold-300"],
    ["--color-emerald-500", "--color-emerald-300"],
    ["--color-emerald-600", "--color-emerald-400"],
    ["--color-emerald-700", "--color-emerald-500"],
    ["--color-emerald-800", "--color-emerald-600"],
  ];

  return (
    <div>
      <div className="flex items-end justify-between gap-1.5 sm:gap-3">
        {items.map((item, i) => {
          const pct = maxValue > 0 ? (item.value / maxValue) * 100 : 0;
          const [dark, light] = ramp[i % ramp.length];
          return (
            <div key={item.label} className="min-w-0 flex-1 flex flex-col items-center">
              <span className="numeric text-[10px] sm:text-xs font-bold text-gray-900 mb-1.5 text-center leading-tight">
                {item.valueLabel ?? fmt(item.value)}
              </span>
              <div className="col-track w-full h-28 sm:h-40">
                <div
                  className="col-fill"
                  style={{
                    height: `${Math.max(pct, 3)}%`,
                    backgroundImage: `linear-gradient(to top, var(${dark}), var(${light}))`,
                  }}
                />
              </div>
              <span className="text-[10px] sm:text-xs text-gray-500 mt-1.5 font-medium text-center leading-tight">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
      <Watermark />
    </div>
  );
}

function GenderChart({
  maleValue,
  femaleValue,
  currency,
  maleLabel,
  femaleLabel,
}: {
  maleValue: number;
  femaleValue: number;
  currency: string;
  maleLabel?: string;
  femaleLabel?: string;
}) {
  const max = Math.max(maleValue, femaleValue);
  const gap = maleValue > 0 ? Math.round((1 - femaleValue / maleValue) * 100) : 0;

  const columns = [
    {
      label: maleLabel ?? "Male",
      value: maleValue,
      delta: `+${gap}%`,
      deltaClass: "text-blue-600",
      gradient: "linear-gradient(to top, #1d4ed8, #60a5fa)",
    },
    {
      label: femaleLabel ?? "Female",
      value: femaleValue,
      delta: `-${gap}%`,
      deltaClass: "text-pink-600",
      gradient: "linear-gradient(to top, #be185d, #f472b6)",
    },
  ];

  return (
    <div>
      <div className="flex items-end justify-center gap-6 sm:gap-16">
        {columns.map((col) => (
          <div key={col.label} className="flex flex-col items-center">
            <span className="numeric text-base sm:text-xl font-bold text-gray-900 whitespace-nowrap">
              {fmt(col.value)} {currency}
            </span>
            <div className="col-track w-24 sm:w-28 h-32 sm:h-36 mt-2">
              <div
                className="col-fill"
                style={{
                  height: `${max > 0 ? (col.value / max) * 100 : 0}%`,
                  backgroundImage: col.gradient,
                }}
              />
            </div>
            <span className="text-sm font-semibold text-gray-600 mt-2">{col.label}</span>
            <span className={`text-xs font-bold ${col.deltaClass}`}>{col.delta}</span>
          </div>
        ))}
      </div>
      <Watermark />
    </div>
  );
}

export { BarChart, DistributionChart, GenderChart };
