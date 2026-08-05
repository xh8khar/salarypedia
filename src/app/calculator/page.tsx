import Link from "next/link";
import type { Metadata } from "next";
import { CURRENT_YEAR } from "@/lib/db";
import calculators from "@/data/calculators.json";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdSlot from "@/components/AdSlot";

const calcTitle = `Free Salary Calculators ${CURRENT_YEAR}`;

export const metadata: Metadata = {
  title: calcTitle,
  description: "Use our free salary calculators: hourly rate, take-home pay, after-tax, raise, overtime, bonus, commission, affordability, FIRE, and more.",
  keywords: [
    "Singh Yogendra",
    "SalaryPedia by Singh Yogendra",
    "salary calculator",
    "free salary calculator",
    "pay calculator",
    "salary conversion tool",
    "wage calculator",
  ],
  alternates: {
    canonical: "https://www.singhyogendra.com.np/calculator",
  },
  openGraph: {
    title: calcTitle,
    description: "Use our free salary calculators: hourly rate, take-home pay, after-tax, raise, overtime, bonus, commission, and more.",
    images: [
      {
        url: "/og/default.webp",
        width: 1200,
        height: 750,
        alt: "Free Salary Calculators",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: calcTitle,
    description: "Use our free salary calculators: hourly rate, take-home pay, after-tax, raise, overtime, bonus, commission, and more.",
    images: ["/og/default.webp"],
  },
};

export default function CalculatorIndex() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 mx-auto w-full max-w-6xl px-4 py-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Free Salary Calculators
          </h1>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
            Make smarter career and financial decisions with our suite of free salary calculators. Convert, compare, and plan your earnings.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {calculators.map((calc) => (
            <Link
              key={calc.slug}
              href={`/calculator/${calc.slug}`}
              className="group bg-white rounded-xl border border-gray-200 p-6 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-100/50 transition-all"
            >
              <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center mb-4 group-hover:bg-emerald-100 transition-colors">
                <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={calc.icon} />
                </svg>
              </div>
              <h2 className="font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
                {calc.title}
              </h2>
              <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                {calc.subtitle}
              </p>
            </Link>
          ))}
        </div>
      </main>
      <div className="mx-auto max-w-5xl px-6 py-8">
        <AdSlot slot="top" />
      </div>

      <Footer />
    </div>
  );
}
