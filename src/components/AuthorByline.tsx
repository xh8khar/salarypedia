import { type Author, authorInitials } from "@/lib/authors";

/** Compact byline for the article header. */
export function AuthorByline({
  author,
  published,
  updated,
  readTime,
  onDark = false,
}: {
  author: Author;
  published: string;
  updated?: string;
  readTime: string;
  onDark?: boolean;
}) {
  const fmt = (iso: string) =>
    new Date(iso).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
      <span
        className={`grid place-items-center w-10 h-10 rounded-full text-[13px] font-bold shrink-0 ${
          onDark ? "bg-jade/20 text-jade" : "bg-emerald-100 text-emerald-700"
        }`}
        aria-hidden="true"
      >
        {authorInitials(author.name)}
      </span>
      <span className="min-w-0">
        <span className={`block text-sm font-semibold ${onDark ? "text-chalk" : "text-gray-900"}`}>
          {author.name}
        </span>
        <span className={`block text-xs ${onDark ? "text-chalk/50" : "text-gray-500"}`}>
          <time dateTime={published}>{fmt(published)}</time>
          {updated && updated !== published && (
            <>
              {" · Updated "}
              <time dateTime={updated}>{fmt(updated)}</time>
            </>
          )}
          {" · "}
          {readTime}
        </span>
      </span>
    </div>
  );
}

/** Fuller "about the author" panel for the end of an article. */
export function AuthorCard({ author, policy }: { author: Author; policy: string }) {
  return (
    <aside className="card rim p-6">
      <div className="flex items-start gap-4">
        <span
          className="grid place-items-center w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 text-sm font-bold shrink-0"
          aria-hidden="true"
        >
          {authorInitials(author.name)}
        </span>
        <div className="min-w-0">
          <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
            Written by
          </p>
          <p className="mt-1 font-display text-base font-bold text-gray-900">{author.name}</p>
          <p className="text-xs text-gray-500">{author.jobTitle}</p>
          <p className="mt-3 text-sm text-gray-600 leading-relaxed">{author.bio}</p>

          {author.credentials.length > 0 && (
            <ul className="mt-4 space-y-1.5">
              {author.credentials.map((c) => (
                <li key={c} className="flex gap-2.5 text-[13px] text-gray-600 leading-relaxed">
                  <svg className="w-3.5 h-3.5 mt-1 text-emerald-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          )}

          <p className="mt-4 pt-4 border-t border-gray-100 text-xs text-gray-400 leading-relaxed">
            {policy}
          </p>
        </div>
      </div>
    </aside>
  );
}
