import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/LegalPage";

const UPDATED = "July 29, 2026";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "Salary figures on SalaryPedia by Singh Yogendra are estimates for general information only and are not financial, legal or career advice.",
  alternates: { canonical: "https://www.singhyogendra.com.np/disclaimer" },
  robots: { index: true, follow: true },
};

export default function Disclaimer() {
  return (
    <LegalPage
      title="Disclaimer"
      intro="Everything published here is general information, not professional advice. Please read this before acting on any figure you find on this site."
      updated={UPDATED}
    >
      <h2>Salary figures are estimates</h2>
      <p>
        Every salary range, average and ranking on this Site is an <strong>estimate</strong> compiled
        from third-party research and public sources. Figures are modelled, not measured, and they do
        not represent a job offer, a guaranteed wage, or the pay of any specific employer.
      </p>
      <p>Real compensation varies substantially with:</p>
      <ul>
        <li>Years of experience, seniority and specialisation</li>
        <li>Employer size, sector and funding</li>
        <li>City or region within a country, and local labour demand</li>
        <li>Qualifications, certifications and language skills</li>
        <li>Currency exchange rates, inflation and the date data was gathered</li>
      </ul>

      <h2>Currency conversion</h2>
      <p>
        Cross-country comparisons are converted to a common currency using stored exchange rates.
        Rates move constantly, so converted values are indicative only and will drift from live
        market rates. Cost-of-living adjusted figures use index data that is itself an approximation.
      </p>

      <h2>Not professional advice</h2>
      <p>
        Content on this Site is for general informational and educational purposes only. It is
        <strong> not</strong> financial, investment, tax, legal, immigration, or career advice, and
        no professional relationship is created by your use of the Site. Take-home pay and tax
        calculators are simplified models that ignore many real-world deductions, allowances,
        credits and local rules.
      </p>
      <p>
        Before making a career, relocation, financial or tax decision, consult a qualified
        professional licensed in your jurisdiction.
      </p>

      <h2>Calculators</h2>
      <p>
        Our calculators are illustrative tools. They run in your browser using the assumptions we
        state on each page. Results should be treated as rough guidance, never as a definitive
        figure for budgeting, negotiation or filing.
      </p>

      <h2>Data sources</h2>
      <p>
        Salary research on this Site draws on published data including the{" "}
        <a href="https://www.erieri.com" target="_blank" rel="noopener noreferrer">
          Economic Research Institute (ERI)
        </a>{" "}
        and{" "}
        <a href="https://www.salaryexpert.com" target="_blank" rel="noopener noreferrer">
          SalaryExpert
        </a>
        . We are not affiliated with, endorsed by, or sponsored by these organisations. Any errors in
        interpretation or presentation are ours.
      </p>

      <h2>External links</h2>
      <p>
        We link to third-party websites for convenience. We do not control their content and are not
        responsible for their accuracy, availability or practices. Inclusion of a link is not an
        endorsement.
      </p>

      <h2>No liability</h2>
      <p>
        To the fullest extent permitted by law, SalaryPedia by Singh Yogendra accepts no liability for any loss
        or damage arising from reliance on information published here. Your use of the Site is at
        your own risk. See our <Link href="/terms/">Terms of Service</Link> for the full limitation
        of liability.
      </p>

      <h2>Reporting an error</h2>
      <p>
        We want the data to be as good as it can be. If a figure looks wrong, please tell us via the{" "}
        <Link href="/contact/">contact page</Link> and we will review it.
      </p>
    </LegalPage>
  );
}
