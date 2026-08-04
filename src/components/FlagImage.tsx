import { flagUrl } from "@/lib/flag";

/**
 * Flags render as circles site-wide. Callers only control size/layout, so any
 * `rounded-*` they pass is dropped rather than fighting the circle — otherwise
 * the winner would depend on stylesheet order.
 */
export default function FlagImage({
  slug,
  name,
  className = "w-6 h-6 inline-block",
}: {
  slug: string;
  name: string;
  className?: string;
}) {
  const layout = className.replace(/\brounded-\S+/g, "").trim();

  // Flags are wider than tall; object-cover centre-crops them instead of squashing.
  // The ring keeps white-heavy flags (Japan, Finland) from dissolving into the page.
  const hasRing = /\bring(-|\b)/.test(layout);
  const classes = [layout, "rounded-full object-cover", hasRing ? "" : "ring-1 ring-gray-200"]
    .filter(Boolean)
    .join(" ");

  return (
    <img
      src={flagUrl(slug)}
      alt={`${name} flag | SalaryPedia by Singh Yogendra`}
      title={`Flag of ${name}`}
      className={classes}
      loading="lazy"
    />
  );
}
