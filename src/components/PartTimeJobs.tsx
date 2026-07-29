"use client";

import { useState, useRef, useCallback } from "react";
import { toPng } from "html-to-image";
import type { PartTimeJob } from "@/lib/part-time";
import RankedBarChart from "./RankedBarChart";
import ShareButtons from "./ShareButtons";

const fmt = (v: number) => {
  if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}M`;
  if (v >= 1_000) return `${(v / 1_000).toFixed(0)}K`;
  return v.toLocaleString();
};

const group = (v: number) => new Intl.NumberFormat("en-US").format(Math.round(v));

export default function PartTimeJobs({
  jobs,
  currency,
  countryName,
  year,
  countrySlug,
}: {
  jobs: PartTimeJob[];
  currency: string;
  countryName: string;
  year: number;
  countrySlug: string;
}) {
  const [copied, setCopied] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);

  const handleDownload = useCallback(async () => {
    if (!chartRef.current) return;
    try {
      const dataUrl = await toPng(chartRef.current, {
        backgroundColor: "#ffffff",
        pixelRatio: 2,
      });
      const link = document.createElement("a");
      link.download = `${countrySlug}-part-time-jobs.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to download chart", err);
    }
  }, [countrySlug]);

  const handleCopy = useCallback(() => {
    const text = jobs
      .map(
        (j) =>
          `${j.rank}. ${j.title} — ${fmt(j.monthlySalary)} ${currency}/mo (${fmt(j.hourlyRate)}/hr, ${j.weeklyHours} hrs/week)`
      )
      .join("\n");
    navigator.clipboard.writeText(
      `Top 10 Part-Time Jobs in ${countryName} for International Students (${year})\n${text}\n\nSource: BestPayingJobs.net`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [jobs, currency, countryName, year]);

  // Placed after the hooks: an early return above them would make the hook
  // order depend on the data, which React does not allow.
  if (jobs.length === 0) return null;

  const chartData = [...jobs].sort((a, b) => b.monthlySalary - a.monthlySalary);

  const shareUrl = `https://www.bestpayingjobs.net/part-time-jobs-in-${countrySlug}`;
  const shareTitle = `Part-Time Jobs in ${countryName} for International Students ${year} | BestPayingJobs.net`;

  return (
    <section id="parttimejobs" className="mb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            10 Highest Paying Part-time Jobs in {countryName} for International Students ({year})
          </h2>
          <p className="text-sm text-gray-400 mt-0.5">
            {jobs[0]?.weeklyHours ?? 20} hours per week &middot; Monthly salary in {currency}{" "}&middot; BestPayingJobs.net
          </p>
        </div>
        <div className="flex items-center gap-2">
          <ShareButtons url={shareUrl} title={shareTitle} />
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-gray-500 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:text-emerald-600 hover:border-emerald-200 transition-all shrink-0"
            title="Copy data to clipboard"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <span className="hidden sm:inline">{copied ? "Copied!" : "Copy"}</span>
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-gray-500 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:text-emerald-600 hover:border-emerald-200 transition-all shrink-0"
            title="Download chart as image"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span className="hidden sm:inline">Download</span>
          </button>
        </div>
      </div>

      <div
        ref={chartRef}
        className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 mb-5"
      >
        <RankedBarChart
          caption={`Monthly pay in ${currency} for the ten highest paying part-time jobs, highest first.`}
          items={chartData.map((j) => ({
            label: j.title,
            value: j.monthlySalary,
            valueLabel: `${group(j.monthlySalary)} ${currency}`,
            meta: `${group(j.hourlyRate)} ${currency}/hr · ${j.weeklyHours} hrs/week`,
          }))}
        />
        <p className="text-right text-[10px] text-gray-400 italic mt-3 select-none">
          BestPayingJobs.net
        </p>
      </div>
    </section>
  );
}
