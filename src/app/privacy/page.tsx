import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/LegalPage";

const UPDATED = "July 29, 2026";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How BestPayingJobs.net collects, uses and protects your information, including cookies, analytics and third-party advertising.",
  alternates: { canonical: "https://www.bestpayingjobs.net/privacy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPolicy() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro="This policy explains what information BestPayingJobs.net collects, why we collect it, and the choices you have."
      updated={UPDATED}
    >
      <h2>Overview</h2>
      <p>
        BestPayingJobs.net (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) publishes salary and
        career reference data. You can browse the entire site without creating an account or
        submitting personal details. We do not sell your personal information.
      </p>

      <h2>Information we collect</h2>
      <h3>Information you provide</h3>
      <p>
        We only receive personal information when you choose to send it &mdash; for example, if you
        email us a question via our <Link href="/contact/">contact page</Link>. We use it solely to
        respond to you.
      </p>

      <h3>Information collected automatically</h3>
      <p>
        Like most websites, our servers and analytics tools record standard technical data when you
        visit:
      </p>
      <ul>
        <li>IP address and approximate region (used in aggregate, not to identify you)</li>
        <li>Browser type, operating system and device category</li>
        <li>Pages viewed, referring page and time spent</li>
      </ul>

      <h3>Calculator inputs</h3>
      <p>
        Our salary calculators run entirely in your browser. Figures you enter are used to render
        the result on your screen and are <strong>not</strong> transmitted to or stored on our
        servers.
      </p>

      <h2>Cookies and similar technologies</h2>
      <p>
        Cookies are small files stored on your device. We use them to remember display preferences
        (such as your light or dark theme choice) and to understand how the site is used. You can
        block or delete cookies in your browser settings; the site will continue to work, though
        some preferences will not persist.
      </p>

      <h2>Advertising and third parties</h2>
      <p>
        We display advertising to keep this site free. Third-party vendors, <strong>including
        Google</strong>, use cookies to serve ads based on your prior visits to this and other
        websites.
      </p>
      <ul>
        <li>
          Google&rsquo;s use of advertising cookies enables it and its partners to serve ads to you
          based on your visit to our site and/or other sites on the internet.
        </li>
        <li>
          You may opt out of personalised advertising by visiting{" "}
          <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">
            Google Ads Settings
          </a>
          .
        </li>
        <li>
          You can opt out of third-party vendor cookies for personalised advertising at{" "}
          <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">
            aboutads.info/choices
          </a>{" "}
          or{" "}
          <a href="https://optout.networkadvertising.org/" target="_blank" rel="noopener noreferrer">
            optout.networkadvertising.org
          </a>
          .
        </li>
      </ul>
      <p>
        Third-party advertisers and analytics providers operate under their own privacy policies. We
        do not control the cookies they set.
      </p>

      <h2>Your rights</h2>
      <p>
        Depending on where you live, you may have the right to access, correct, export or delete
        personal information we hold about you, and to object to certain processing. Visitors in the
        European Economic Area and the United Kingdom have these rights under the GDPR; California
        residents have comparable rights under the CCPA/CPRA, including the right to opt out of the
        sale or sharing of personal information. Because we hold very little personal data, most
        requests are satisfied by clearing your cookies &mdash; but you are welcome to{" "}
        <Link href="/contact/">contact us</Link> and we will respond.
      </p>

      <h2>Data retention and security</h2>
      <p>
        Aggregated analytics data is retained only as long as it is useful for understanding site
        performance. We take reasonable technical measures to protect the limited data we hold, but
        no method of transmission over the internet is completely secure.
      </p>

      <h2>Children&rsquo;s privacy</h2>
      <p>
        This site is intended for a general audience and is not directed at children under 13. We do
        not knowingly collect personal information from children.
      </p>

      <h2>External links</h2>
      <p>
        Our pages link to third-party sites such as data sources and job platforms. We are not
        responsible for the content or privacy practices of those sites.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this policy as the site evolves. Material changes will be reflected in the
        &ldquo;last updated&rdquo; date above.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy? Reach us through our{" "}
        <Link href="/contact/">contact page</Link>.
      </p>
    </LegalPage>
  );
}
