import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/LegalPage";
import { getCountries, getCategories, getCurrentYear } from "@/lib/db";

const UPDATED = "July 29, 2026";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "SalaryPedia by Singh Yogendra publishes free, comparable salary data for 195 countries so people can find out what their work is worth anywhere in the world.",
  alternates: { canonical: "https://www.singhyogendra.com.np/about" },
  robots: { index: true, follow: true },
};

export default function About() {
  const countries = getCountries();
  const categories = getCategories();
  const year = getCurrentYear();

  return (
    <LegalPage
      title="About Us"
      intro="We publish free, comparable salary data so anyone can find out what their work is worth — in their own country and everywhere else."
      updated={UPDATED}
    >
      <h2>What we do</h2>
      <p>
        SalaryPedia by Singh Yogendra is an independent reference site for salary and career data. We collect
        published compensation research, normalise it into a consistent structure, and present it so
        that a role in one country can be compared fairly against the same role in another.
      </p>
      <p>
        The site currently covers <strong>{countries.length} countries</strong> across{" "}
        <strong>{categories.length} career categories</strong>, alongside cost-of-living
        comparisons, take-home pay estimates and {year} career guides.
      </p>

      <h2>Why we built it</h2>
      <p>
        Pay information is unevenly distributed. People negotiating a first job, considering a move
        abroad, or changing field often have no reliable sense of the going rate &mdash; while the
        organisation across the table usually does. Closing part of that gap, for free and without a
        sign-up wall, is the point of this site.
      </p>

      <h2>Where our data comes from</h2>
      <p>
        Salary research draws on published sources including the{" "}
        <a href="https://www.erieri.com" target="_blank" rel="noopener noreferrer">
          Economic Research Institute (ERI)
        </a>{" "}
        and{" "}
        <a href="https://www.salaryexpert.com" target="_blank" rel="noopener noreferrer">
          SalaryExpert
        </a>
        , combined with cost-of-living indices and stored currency exchange rates. We are independent
        of and not affiliated with those organisations.
      </p>
      <p>
        Figures are <strong>estimates</strong>, not offers or guarantees. We are explicit about this
        because a salary range presented with false precision is worse than no range at all &mdash;
        please read our <Link href="/disclaimer/">disclaimer</Link> before acting on any number.
      </p>

      <h2>How the site is funded</h2>
      <p>
        Access is free and requires no account. The site is supported by third-party advertising,
        which lets us keep every page open to everyone. Advertising never determines which roles,
        countries or figures we publish. Our{" "}
        <Link href="/privacy/">privacy policy</Link> explains what advertising partners collect and
        how to opt out of personalised ads.
      </p>

      <h2>Corrections</h2>
      <p>
        We would rather be corrected than be wrong. If a figure looks off, or a country or role is
        missing, tell us via the <Link href="/contact/">contact page</Link> and we will review it.
      </p>
    </LegalPage>
  );
}
