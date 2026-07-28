import Link from "next/link";

/** The mark from /favicon.svg, so the tab icon, header and footer all match. */
function Mark({ className = "w-9 h-9" }: { className?: string }) {
  return (
    <span
      className={`relative grid place-items-center rounded-[5px] bg-emerald-600 shadow-sm shadow-emerald-600/25 overflow-hidden shrink-0 ${className}`}
    >
      <svg viewBox="0 0 24 24" className="w-[72%] h-[72%]" fill="none" aria-hidden="true">
        <path
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          stroke="#fff"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export default function Logo({
  compact = false,
  onDark = false,
  href = "/",
}: {
  compact?: boolean;
  /** Use on the ink footer, where the wordmark needs to read light. */
  onDark?: boolean;
  href?: string;
}) {
  return (
    <Link href={href} className="group flex items-center gap-2.5 shrink-0" aria-label="BestPayingJobs home">
      <Mark />
      {!compact && (
        <span
          className={`font-display text-[17px] font-extrabold tracking-tight leading-none ${
            onDark ? "text-chalk" : "text-gray-900"
          }`}
        >
          BestPayingJobs
          <span className={onDark ? "text-jade" : "text-emerald-600"}>.net</span>
        </span>
      )}
    </Link>
  );
}
