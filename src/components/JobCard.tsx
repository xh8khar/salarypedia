import type { Job } from "@/lib/db";

function formatSalary(n: number): string {
  return new Intl.NumberFormat("en-US").format(n);
}

export default function JobCard({
  job,
  currency,
  max,
}: {
  job: Job;
  currency: string;
  /** Highest salary in the same list, used to scale the meter bar. */
  max?: number;
}) {
  const share = max && max > 0 ? Math.max(8, Math.round((job.salaryMax / max) * 100)) : null;
  const isTop = job.rank <= 3;

  return (
    <li className="group flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-3 hover:bg-emerald-50/60 transition-colors">
      <span
        className={`w-7 h-7 rounded-lg grid place-items-center text-[11px] font-extrabold shrink-0 transition-colors ${
          isTop
            ? "bg-emerald-600 text-white"
            : "bg-gray-100 text-gray-500 group-hover:bg-emerald-100 group-hover:text-emerald-700"
        }`}
      >
        {job.rank}
      </span>

      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold text-gray-900 truncate">{job.title}</span>
        {share !== null && (
          <span className="meter mt-1.5 block max-w-[14rem]">
            <span style={{ width: `${share}%` }} />
          </span>
        )}
      </span>

      <span className="numeric text-sm font-bold text-emerald-600 shrink-0 whitespace-nowrap">
        {currency} {formatSalary(job.salaryMax)}
      </span>
    </li>
  );
}
