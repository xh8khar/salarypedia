type Item = { title: string; value: string };

/**
 * Continuous marquee of top-paying roles. The list is rendered twice so the
 * -50% translation in the `marquee` keyframes loops without a visible seam.
 */
export default function SalaryTicker({ items }: { items: Item[] }) {
  if (items.length === 0) return null;

  return (
    <div className="relative border-t border-chalk/10 bg-ink-2/60 backdrop-blur-sm">
      <div className="marquee overflow-hidden mask-fade-x py-3">
        <div className="marquee-track flex w-max items-center gap-8">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center gap-8" aria-hidden={copy === 1}>
              {items.map((item) => (
                <span key={item.title} className="flex items-center gap-2.5 whitespace-nowrap">
                  <span className="w-1.5 h-1.5 rounded-full bg-jade/70 shrink-0" />
                  <span className="text-[13px] font-medium text-chalk/70">{item.title}</span>
                  <span className="numeric text-[13px] font-bold text-jade">{item.value}</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
