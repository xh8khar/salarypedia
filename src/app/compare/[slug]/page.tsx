import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCountries, getCategories, getCountryBySlug } from "@/lib/db";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CountryCompare from "@/components/CountryCompare";

export async function generateStaticParams() {
  const countries = getCountries();
  const pairs: { slug: string }[] = [];
  for (let i = 0; i < Math.min(countries.length, 100); i++) {
    for (let j = i + 1; j < Math.min(countries.length, 100); j++) {
      pairs.push({ slug: `${countries[i].slug}-vs-${countries[j].slug}` });
    }
  }
  return pairs;
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const parts = slug.split("-vs-");
  if (parts.length !== 2) return {};
  const c1 = getCountryBySlug(parts[0]);
  const c2 = getCountryBySlug(parts[1]);
  if (!c1 || !c2) return {};

  return {
    title: `Salary Comparison: ${c1.name} vs ${c2.name} (2026) | BestPayingJobs.net`,
    description: `Compare salaries between ${c1.name} and ${c2.name} across 30+ career categories. See which country pays more for your profession.`,
    alternates: {
      canonical: `https://www.bestpayingjobs.net/compare/${slug}`,
    },
  };
}

export default async function CompareSlugPage({ params }: Props) {
  const { slug } = await params;
  const parts = slug.split("-vs-");
  if (parts.length !== 2) notFound();
  const c1 = getCountryBySlug(parts[0]);
  const c2 = getCountryBySlug(parts[1]);
  if (!c1 || !c2) notFound();

  const countries = getCountries();
  const categories = getCategories();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <section className="bg-gradient-to-br from-emerald-50 via-white to-emerald-50 py-16">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Salary Comparison: {c1.name} vs {c2.name}
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Compare salary ranges across all career categories between {c1.name} and {c2.name}.
          </p>
        </div>
      </section>
      <section className="py-12 bg-white flex-1">
        <div className="mx-auto max-w-6xl px-6">
          <CountryCompare
            countries={countries}
            categories={categories}
            initialSlug1={c1.slug}
            initialSlug2={c2.slug}
          />
        </div>
      </section>
      <Footer />
    </div>
  );
}
