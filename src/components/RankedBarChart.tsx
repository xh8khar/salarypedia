import type { CSSProperties } from "react";

export interface RankedBarItem {
  /** Row label — a job title, country, or education level. */
  label: string;
  /** Drives both bar length and colour intensity. */
  value: number;
  /** Printed at the end of the row. Defaults to a grouped number. */
  valueLabel?: string;
  /** Optional second line under the label, e.g. a salary range. */
  meta?: string;
  /** Leading glyph such as a flag emoji. */
  glyph?: string;
}

const group = (n: number) => new Intl.NumberFormat("en-US").format(Math.round(n));

function badgeClass(rank: number): string {
  if (rank === 1) return "bg-gold-400 text-ink";
  if (rank <= 3) return "bg-emerald-600 text-white";
  return "bg-gray-100 text-gray-500";
}

/**
 * Horizontal bar chart built from DOM rather than a plotting library.
 *
 * Every figure is real text, so the chart survives with JavaScript off, can be
 * selected and read by crawlers, and needs no measured container — which is
 * what broke the previous SVG version on phones, where fixed axis margins ate
 * the entire plotting area. The label and its number sit above the bar so the
 * bar itself gets the full column width at any viewport.
 */
export default function RankedBarChart({
  items,
  max,
  showRank = true,
  dense = false,
  caption,
}: {
  items: RankedBarItem[];
  /** Scale against this instead of the largest item in the set. */
  max?: number;
  /** Numbered badges. Turn off for ordered-but-unranked series like education. */
  showRank?: boolean;
  /** Tighter rows where vertical space is scarce. */
  dense?: boolean;
  /** Describes the chart for screen readers. */
  caption?: string;
}) {
  const top = max ?? Math.max(...items.map((i) => i.value), 0);

  return (
    <div>
      {caption && <p className="sr-only">{caption}</p>}
      <ol className={dense ? "space-y-2.5" : "space-y-3.5"}>
        {items.map((item, i) => {
          const share = top > 0 ? Math.min(item.value / top, 1) : 0;
          const rank = i + 1;
          return (
            <li key={item.label}>
              <div className="flex items-center gap-2.5 mb-1.5">
                {showRank && (
                  <span
                    className={`w-6 h-6 rounded-lg grid place-items-center text-[11px] font-extrabold shrink-0 ${badgeClass(rank)}`}
                    aria-hidden="true"
                  >
                    {rank}
                  </span>
                )}
                <span className="min-w-0 flex-1 leading-tight">
                  <span className="block text-[13px] sm:text-sm font-semibold text-gray-900">
                    {item.glyph && <span className="mr-1.5">{item.glyph}</span>}
                    {item.label}
                  </span>
                  {item.meta && (
                    <span className="numeric block text-[11px] text-gray-400 mt-0.5">
                      {item.meta}
                    </span>
                  )}
                </span>
                <span className="numeric shrink-0 text-[13px] sm:text-sm font-bold text-emerald-600 whitespace-nowrap">
                  {item.valueLabel ?? group(item.value)}
                </span>
              </div>
              <span className={`bar-track ${dense ? "h-2" : "h-2.5 sm:h-3"}`}>
                <span
                  className="bar-fill"
                  style={
                    {
                      width: `${Math.max(share * 100, 3)}%`,
                      "--t": String(share),
                    } as CSSProperties
                  }
                />
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
