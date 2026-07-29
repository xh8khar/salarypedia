"use client";

import { useEffect, useMemo, useState } from "react";
import { iconFor } from "@/lib/category-icons";
import type { CompareCategory, CompareCountry, CountryJobsApi } from "@/lib/compare";

/* Fetched country job sets are cached for the page's lifetime so switching
   back to a previously selected country is instant and costs no request. */
const cache = new Map<string, CountryJobsApi>();

async function loadJobs(slug: string, signal: AbortSignal): Promise<CountryJobsApi> {
  const hit = cache.get(slug);
  if (hit) return hit;
  const res = await fetch(`/api/jobs/${slug}.json`, { signal });
  if (!res.ok) throw new Error(`Could not load salary data (${res.status})`);
  const json = (await res.json()) as CountryJobsApi;
  cache.set(slug, json);
  return json;
}

const fmt = (n: number) => new Intl.NumberFormat("en-US").format(Math.round(n));

/** Ratio of two figures rendered the way a reader can actually parse. */
function gapLabel(x: number, y: number): { text: string; leader: "a" | "b" | null } {
  if (x <= 0 || y <= 0) return { text: "—", leader: null };
  const leader = x >= y ? "a" : "b";
  const ratio = Math.max(x, y) / Math.min(x, y);
  if (ratio < 1.01) return { text: "≈ equal", leader: null };
  if (ratio >= 3) {
    const m = ratio >= 10 ? Math.round(ratio) : Math.round(ratio * 10) / 10;
    return { text: `${m}×`, leader };
  }
  return { text: `+${Math.round((ratio - 1) * 100)}%`, leader };
}

export default function CategoryComparison({
  a,
  b,
  categories,
}: {
  a: CompareCountry;
  b: CompareCountry;
  categories: CompareCategory[];
}) {
  const pairKey = `${a.s}|${b.s}`;

  /* The result carries the pair it belongs to, so "loading" is derived by
     comparing keys rather than set at the top of the effect. That keeps the
     effect free of synchronous state writes and makes a stale response for a
     previous pair impossible to display. */
  const [result, setResult] = useState<{
    key: string;
    dataA?: CountryJobsApi;
    dataB?: CountryJobsApi;
    error?: string;
  } | null>(null);

  const [query, setQuery] = useState("");
  const [openCat, setOpenCat] = useState<string | null>(categories[0]?.slug ?? null);

  useEffect(() => {
    const ctrl = new AbortController();
    const key = `${a.s}|${b.s}`;
    Promise.all([loadJobs(a.s, ctrl.signal), loadJobs(b.s, ctrl.signal)])
      .then(([dataA, dataB]) => {
        if (!ctrl.signal.aborted) setResult({ key, dataA, dataB });
      })
      .catch((e: unknown) => {
        // An abort means the user changed country mid-flight — a newer effect
        // is already handling it, so this is not an error condition.
        if (ctrl.signal.aborted) return;
        setResult({ key, error: e instanceof Error ? e.message : "Could not load salary data" });
      });
    return () => ctrl.abort();
  }, [a.s, b.s]);

  const settled = result?.key === pairKey ? result : null;
  const dataA = settled?.dataA ?? null;
  const dataB = settled?.dataB ?? null;
  const error = settled?.error ?? "";
  const status: "loading" | "ready" | "error" = !settled
    ? "loading"
    : settled.error
      ? "error"
      : "ready";

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q || !dataA) return categories;
    return categories.filter((cat) => {
      if (cat.name.toLowerCase().includes(q)) return true;
      return (dataA.jobs[cat.slug] ?? []).some((j) => j.title.toLowerCase().includes(q));
    });
  }, [query, categories, dataA]);

  if (status === "loading") {
    return (
      <div className="card p-8 text-center">
        <div className="inline-flex items-center gap-3 text-sm text-gray-500">
          <span className="w-4 h-4 rounded-full border-2 border-gray-200 border-t-emerald-500 animate-spin" />
          Loading all 310 roles for {a.n} and {b.n}…
        </div>
      </div>
    );
  }

  if (status === "error" || !dataA || !dataB) {
    return (
      <div className="card p-6 text-sm text-gray-600">
        <p className="font-semibold text-gray-900 mb-1">Could not load the detailed comparison</p>
        <p className="text-gray-500">{error || "Please try again."}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="relative mb-5">
        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search a job title or category…"
          aria-label="Filter jobs and categories"
          className="w-full h-12 pl-12 pr-4 rounded-xl border border-gray-200 bg-white text-[15px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/15 transition-shadow"
        />
      </div>

      {visible.length === 0 && (
        <p className="card p-6 text-sm text-gray-500 text-center">
          Nothing matches &ldquo;{query}&rdquo;.
        </p>
      )}

      <div className="space-y-3">
        {visible.map((cat) => {
          const jobsA = dataA.jobs[cat.slug] ?? [];
          const jobsB = dataB.jobs[cat.slug] ?? [];
          if (jobsA.length === 0) return null;

          const q = query.trim().toLowerCase();
          const rows = jobsA
            .map((ja, i) => ({ ja, jb: jobsB[i] }))
            .filter(({ ja }) =>
              !q || cat.name.toLowerCase().includes(q) || ja.title.toLowerCase().includes(q)
            );
          if (rows.length === 0) return null;

          // A filtered search should reveal its matches rather than make the
          // reader open every category by hand.
          const isOpen = q ? true : openCat === cat.slug;

          return (
            <section key={cat.slug} className="card overflow-hidden">
              <h3>
                <button
                  type="button"
                  onClick={() => setOpenCat(isOpen && !q ? null : cat.slug)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center gap-3 px-4 sm:px-5 py-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 grid place-items-center shrink-0">
                    <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      {iconFor(cat.slug).map((d) => (
                        <path key={d} d={d} />
                      ))}
                    </svg>
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[15px] font-bold text-gray-900">{cat.name}</span>
                    <span className="block text-xs text-gray-400">{rows.length} roles compared</span>
                  </span>
                  <svg
                    className={`w-4 h-4 text-gray-400 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.4}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </h3>

              {isOpen && (
                <div className="border-t border-gray-200 overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <caption className="sr-only">
                      {cat.name} salaries in {a.n} compared with {b.n}, monthly and in each
                      country&rsquo;s own currency
                    </caption>
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th scope="col" className="px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider text-gray-400">Role</th>
                        <th scope="col" className="px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider text-gray-400 text-right whitespace-nowrap">{a.n} ({a.cur})</th>
                        <th scope="col" className="px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider text-gray-400 text-right whitespace-nowrap">{b.n} ({b.cur})</th>
                        <th scope="col" className="px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider text-gray-400 text-right whitespace-nowrap">Gap</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {rows.map(({ ja, jb }) => {
                        // Convert to a shared basis purely to rank them; only
                        // local-currency figures are ever displayed.
                        const usdA = ja.salaryMax / (a.fx || 1);
                        const usdB = (jb?.salaryMax ?? 0) / (b.fx || 1);
                        const gap = gapLabel(usdA, usdB);
                        return (
                          <tr key={ja.title} className="hover:bg-emerald-50/40 transition-colors">
                            <td className="px-4 py-2.5 text-sm font-medium text-gray-900">{ja.title}</td>
                            <td className={`px-4 py-2.5 numeric text-sm text-right whitespace-nowrap ${gap.leader === "a" ? "font-bold text-emerald-600" : "text-gray-600"}`}>
                              {fmt(ja.salaryMax)}
                            </td>
                            <td className={`px-4 py-2.5 numeric text-sm text-right whitespace-nowrap ${gap.leader === "b" ? "font-bold text-emerald-600" : "text-gray-600"}`}>
                              {jb ? fmt(jb.salaryMax) : "—"}
                            </td>
                            <td className="px-4 py-2.5 numeric text-xs text-right text-gray-400 whitespace-nowrap">
                              {gap.text}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
