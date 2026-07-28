import Link from "next/link";
import type { Metadata } from "next";
import { getCountries, getCurrentYear } from "@/lib/db";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FlagImage from "@/components/FlagImage";
import emData from "@/data/earn-money-online.json";
import { seededShuffle } from "@/lib/shuffle";

const data = emData as unknown as { methods: { rank: number; title: string; category: string; difficulty: string }[] };

export const metadata: Metadata = {
  title: `Earn Money Online — ${data.methods.length} Ways in ${getCountries().length} Countries | BestPayingJobs`,
  description: `Discover ${data.methods.length} proven ways to earn money online in ${getCountries().length} countries. Compare earning potential, timeframes, platforms, and local currency estimates worldwide.`,
  keywords: [
    "earn money online",
    "work from home",
    "online income",
    "freelance jobs",
    "remote work opportunities",
    "make money online",
  ],
  alternates: {
    canonical: "https://www.bestpayingjobs.net/earn-money-online",
  },
  openGraph: {
    title: `Earn Money Online — ${data.methods.length} Ways in ${getCountries().length} Countries`,
    description: `Discover ${data.methods.length} proven ways to earn money online in ${getCountries().length} countries.`,
    images: [
      {
        url: "/og/default.webp",
        width: 1200,
        height: 750,
        alt: "Earn Money Online Worldwide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Earn Money Online — ${data.methods.length} Ways in ${getCountries().length} Countries`,
    description: `Discover ${data.methods.length} proven ways to earn money online in ${getCountries().length} countries.`,
    images: ["/og/default.webp"],
  },
};

const difficultyBadge: Record<string, string> = {
  "Easy": "bg-green-100 text-green-700",
  "Medium": "bg-yellow-100 text-yellow-700",
  "Hard": "bg-red-100 text-red-700",
};

export default function EarnMoneyOnlineIndex() {
  const year = getCurrentYear();
  const countries = getCountries();
  const topMethods = data.methods.slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <section className="bg-gradient-to-br from-emerald-50 via-white to-emerald-50 py-16 lg:py-20">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold mb-6">
            {data.methods.length} Proven Methods &middot; {countries.length} Countries
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-6">
            Earn Money Online
          </h1>
          <p className="text-lg sm:text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed mb-10">
            Discover {data.methods.length} proven ways to earn money online in {countries.length} countries.
            Compare earning potential in local currency, estimated time to first payout, and platforms to get started.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <p className="text-2xl font-bold text-emerald-600">{data.methods.length}</p>
              <p className="text-xs text-gray-400 mt-1">Proven Methods</p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <p className="text-2xl font-bold text-emerald-600">{countries.length}</p>
              <p className="text-xs text-gray-400 mt-1">Countries</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <p className="text-2xl font-bold text-emerald-600">{data.methods.filter((m) => m.difficulty === "Easy").length}</p>
              <p className="text-xs text-gray-400 mt-1">Beginner Friendly</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Overview</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {topMethods.map((method) => (
              <div key={method.rank} className="bg-white rounded-xl border border-gray-200 p-5 hover:border-emerald-200 hover:shadow-md transition-all">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 text-xs font-bold flex items-center justify-center shrink-0">
                    {method.rank}
                  </span>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${difficultyBadge[method.difficulty] || "bg-gray-100 text-gray-600"}`}>
                    {method.difficulty}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 text-sm">{method.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Browse by Country
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {seededShuffle(countries, "earn-money-online").map((c) => (
              <Link
                key={c.code}
                href={`/earn-money-online-${c.slug}`}
                className="group bg-white rounded-xl border border-gray-200 p-4 hover:border-emerald-300 hover:shadow-md hover:shadow-emerald-100/50 transition-all"
              >
                <div className="flex items-center gap-3">
                  <FlagImage slug={c.slug} name={c.name} className="w-8 h-8 rounded-sm shrink-0" />
                  <div>
                    <p className="font-semibold text-sm text-gray-900 group-hover:text-emerald-600 transition-colors">
                      {c.name}
                    </p>
                    <p className="text-xs text-gray-400">
                      Earn money online in {c.name}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
