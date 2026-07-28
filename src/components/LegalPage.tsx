import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

/**
 * Shared shell for the policy/company pages. Keeps the long-form pages
 * consistent without pulling in a typography plugin.
 */
export default function LegalPage({
  title,
  intro,
  updated,
  children,
}: {
  title: string;
  intro: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <section className="relative isolate overflow-hidden bg-ink">
        <div className="absolute inset-0 text-chalk/60 bg-grid mask-fade pointer-events-none" />
        <div className="relative mx-auto w-full max-w-3xl px-6 pt-8 pb-12">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-chalk/45 mb-7">
            <Link href="/" className="hover:text-chalk transition-colors">Home</Link>
            <span aria-hidden="true">/</span>
            <span className="text-chalk/75">{title}</span>
          </nav>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-chalk leading-tight">
            {title}
          </h1>
          <p className="mt-4 text-chalk/60 leading-relaxed">{intro}</p>
          <p className="mt-5 inline-block px-3 py-1 rounded-full bg-chalk/10 text-chalk/60 text-xs font-medium">
            Last updated: {updated}
          </p>
        </div>
      </section>

      <main className="flex-1 mx-auto w-full max-w-3xl px-6 py-12">
        <div
          className="
            [&>h2]:font-display [&>h2]:text-xl [&>h2]:font-bold [&>h2]:text-gray-900
            [&>h2]:mt-10 [&>h2]:mb-3 [&>h2:first-child]:mt-0
            [&>h3]:font-semibold [&>h3]:text-gray-900 [&>h3]:mt-6 [&>h3]:mb-2
            [&>p]:text-[15px] [&>p]:text-gray-600 [&>p]:leading-relaxed [&>p]:mb-4
            [&>ul]:mb-4 [&>ul]:space-y-2 [&>ul]:pl-1
            [&_li]:text-[15px] [&_li]:text-gray-600 [&_li]:leading-relaxed
            [&_li]:relative [&_li]:pl-5
            [&_li]:before:content-[''] [&_li]:before:absolute [&_li]:before:left-0
            [&_li]:before:top-[0.6em] [&_li]:before:w-1.5 [&_li]:before:h-1.5
            [&_li]:before:rounded-full [&_li]:before:bg-emerald-500
            [&_a]:text-emerald-600 [&_a]:font-medium hover:[&_a]:underline
            [&_strong]:text-gray-900 [&_strong]:font-semibold
          "
        >
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
}
