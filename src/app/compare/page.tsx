import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SalaryCompare from "@/components/SalaryCompare";
import { buildComparePayload } from "@/lib/compare";
import { getCountries, getCurrentYear, CURRENT_YEAR } from "@/lib/db";
import { faqPageSchema } from "@/lib/schema";

const siteUrl = "https://www.bestpayingjobs.net";

const title = `Compare Salaries Between Countries ${CURRENT_YEAR}`;
const description = `Compare average salaries and cost of living between any two of 195 countries. See which pays more, adjusted for what money actually buys locally. Updated for ${CURRENT_YEAR}.`;

export const metadata: Metadata = {
  title: `${title} | BestPayingJobs.net`,
  description,
  keywords: [
    "compare salaries between countries",
    "salary comparison by country",
    "country salary comparison tool",
    "compare cost of living countries",
    "which country pays more",
    `salary comparison ${CURRENT_YEAR}`,
  ],
  alternates: { canonical: `${siteUrl}/compare` },
  openGraph: {
    title,
    description,
    url: `${siteUrl}/compare`,
    type: "website",
    images: [{ url: "/og/default.webp", width: 1200, height: 750, alt: title }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og/default.webp"],
  },
};

const faqs = [
  {
    q: "How do you compare salaries between two countries?",
    a: "Convert both to a common basis before comparing — a gross figure in one currency tells you nothing about another. This tool normalises average pay across countries to produce the percentage difference, then adjusts it a second time for the local cost of living, which is what determines your actual standard of living.",
  },
  {
    q: "Why is a higher salary not always better?",
    a: "Because what the money buys varies enormously. A salary that looks generous in an expensive capital can leave less disposable income than a smaller one where housing costs a third as much. That is why this comparison reports both nominal pay and cost-of-living adjusted purchasing power.",
  },
  {
    q: "What is a cost of living index?",
    a: "It expresses local prices as a percentage of a reference country, where 100 is the baseline. An index of 50 means goods and services cost roughly half as much, so the same salary stretches about twice as far.",
  },
  {
    q: "Are these figures before or after tax?",
    a: "Before tax. They are gross estimates, and income tax plus social contributions vary from around fifteen percent to over forty depending on the country. Use the take-home pay pages for an after-tax view of a specific country.",
  },
  {
    q: "Where does the salary data come from?",
    a: "Figures are based on published research from the Economic Research Institute (ERI) and SalaryExpert, combined with cost-of-living indices and currency exchange rates. All numbers are estimates that vary with experience, employer, sector and location.",
  },
];

export default function ComparePage() {
  const payload = buildComparePayload();
  const year = getCurrentYear();
  const countries = getCountries();

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Compare Salaries", item: `${siteUrl}/compare` },
    ],
  };

  const appSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: title,
    url: `${siteUrl}/compare`,
    description,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema(faqs)) }} />
      <Header />

      <section className="relative isolate overflow-hidden bg-ink">
        <div className="absolute inset-0 text-chalk/60 bg-grid mask-fade pointer-events-none" />
        <div className="relative mx-auto w-full max-w-4xl px-6 pt-8 pb-12">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-chalk/45 mb-7">
            <Link href="/" className="hover:text-chalk transition-colors">Home</Link>
            <span aria-hidden="true">/</span>
            <span className="text-chalk/75">Compare</span>
          </nav>

          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-chalk leading-[1.1]">
            Compare Salaries Between Countries
          </h1>
          <p className="mt-5 text-lg text-chalk/60 leading-relaxed max-w-2xl">
            Pick any two of {countries.length}{" "}
            countries to see which pays more &mdash; and whether it still pays more once local
            living costs are taken into account.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="px-2.5 py-1 rounded-full bg-jade/15 text-jade text-xs font-bold">{year}</span>
            <span className="px-2.5 py-1 rounded-full bg-chalk/10 text-chalk/70 text-xs font-medium">
              {countries.length} countries
            </span>
            <span className="px-2.5 py-1 rounded-full bg-chalk/10 text-chalk/70 text-xs font-medium">
              Free, no sign-up
            </span>
          </div>
        </div>
      </section>

      <main className="flex-1 mx-auto w-full max-w-4xl px-6 py-10">
        {/* Direct answer near the top — the format Google lifts for snippets. */}
        <p className="text-[17px] leading-relaxed text-gray-700 mb-8 border-l-2 border-emerald-500 pl-5">
          To compare salaries between two countries, convert both to a common basis and then adjust
          for local cost of living. A higher gross salary does not always mean a higher standard of
          living: pay that looks strong in an expensive city can leave less disposable income than a
          smaller salary somewhere housing costs far less.
        </p>

        <SalaryCompare payload={payload} />

        <section className="mt-14">
          <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">
            Frequently asked questions
          </h2>
          <div className="space-y-3">
            {faqs.map((f) => (
              <details key={f.q} className="group card p-5 open:bg-emerald-50/30">
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none text-[16px] font-semibold text-gray-900">
                  {f.q}
                  <svg className="w-4 h-4 text-gray-400 shrink-0 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.4}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-3 text-[15px] text-gray-600 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
