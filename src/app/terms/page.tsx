import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/LegalPage";

const UPDATED = "July 29, 2026";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms and conditions that govern your use of SalaryPedia by Singh Yogendra, including acceptable use, intellectual property and limitation of liability.",
  alternates: { canonical: "https://www.singhyogendra.com.np/terms" },
  robots: { index: true, follow: true },
};

export default function Terms() {
  return (
    <LegalPage
      title="Terms of Service"
      intro="By using SalaryPedia by Singh Yogendra you agree to these terms. Please read them before relying on anything published here."
      updated={UPDATED}
    >
      <h2>Acceptance of terms</h2>
      <p>
        By accessing or using SalaryPedia by Singh Yogendra (the &ldquo;Site&rdquo;), you agree to be bound by
        these Terms of Service and our <Link href="/privacy/">Privacy Policy</Link>. If you do not
        agree, please discontinue use of the Site.
      </p>

      <h2>What this site provides</h2>
      <p>
        The Site publishes salary estimates, cost-of-living comparisons, calculators and career
        guides covering 195 countries. All content is provided for{" "}
        <strong>general informational and educational purposes only</strong>. We are not an employer,
        a recruitment agency, or a licensed financial, tax, legal or immigration adviser, and nothing
        here constitutes professional advice. See our{" "}
        <Link href="/disclaimer/">disclaimer</Link> for detail.
      </p>

      <h2>No guarantee of accuracy</h2>
      <p>
        Salary figures are aggregated estimates derived from third-party research and are affected by
        experience, employer, sector, currency fluctuations and local market conditions. Actual
        compensation will differ. We make no warranty that the content is accurate, complete or
        current, and we may change or remove content at any time without notice.
      </p>

      <h2>Acceptable use</h2>
      <p>You agree not to:</p>
      <ul>
        <li>Scrape, harvest or bulk-copy content for republication without written permission</li>
        <li>Attempt to disrupt, overload or gain unauthorised access to the Site or its systems</li>
        <li>Use the Site in a way that breaches any applicable law or regulation</li>
        <li>Present our content as your own or remove attribution from it</li>
      </ul>

      <h2>Intellectual property</h2>
      <p>
        The design, original text, layout and compilation of data on this Site are owned by
        SalaryPedia by Singh Yogendra and protected by applicable intellectual-property laws. You may quote
        short excerpts for commentary, research or reporting provided you credit SalaryPedia
        with a visible link to the source page. Country names, flags and third-party trademarks
        remain the property of their respective owners.
      </p>

      <h2>Third-party links and advertising</h2>
      <p>
        The Site links to external resources and displays third-party advertising. We do not control
        and are not responsible for the content, products, services or practices of any third party.
        A link or advertisement is not an endorsement.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        The Site is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without warranties of
        any kind, express or implied. To the fullest extent permitted by law, SalaryPedia by Singh Yogendra and
        its operators shall not be liable for any direct, indirect, incidental, consequential or
        punitive damages &mdash; including lost earnings, lost opportunities or career decisions
        &mdash; arising from your use of, or reliance on, the Site.
      </p>

      <h2>Availability</h2>
      <p>
        We aim to keep the Site online but do not guarantee uninterrupted availability. We may
        suspend, withdraw or restrict all or part of the Site for maintenance or other reasons.
      </p>

      <h2>Changes to these terms</h2>
      <p>
        We may revise these terms from time to time. Continued use of the Site after changes are
        posted constitutes acceptance of the revised terms.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms? Reach us through our{" "}
        <Link href="/contact/">contact page</Link>.
      </p>
    </LegalPage>
  );
}
