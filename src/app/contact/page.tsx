import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/LegalPage";

const UPDATED = "July 29, 2026";

// Update this if you prefer a different inbox — it is the address shown publicly
// and the one AdSense reviewers will use to reach the site owner.
const CONTACT_EMAIL = "contact@bestpayingjobs.net";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with BestPayingJobs.net about data corrections, partnership enquiries, privacy requests or general questions.",
  alternates: { canonical: "https://www.bestpayingjobs.net/contact" },
  robots: { index: true, follow: true },
};

const reasons = [
  {
    title: "Data corrections",
    body: "Spotted a salary figure, currency or country detail that looks wrong? Send us the page URL and what you expected — these get priority.",
  },
  {
    title: "Privacy requests",
    body: "Access, export or deletion requests under GDPR, CCPA or similar. See our privacy policy for what we actually hold.",
  },
  {
    title: "Press and partnerships",
    body: "Citing our data, or interested in working together? Tell us what you have in mind.",
  },
  {
    title: "Everything else",
    body: "General questions, broken links, accessibility issues or feedback on the site.",
  },
];

export default function Contact() {
  return (
    <LegalPage
      title="Contact Us"
      intro="Questions, corrections or feedback — we read everything that comes in."
      updated={UPDATED}
    >
      <h2>Email us</h2>
      <p>
        The fastest way to reach us is by email. We aim to reply within a few business days.
      </p>

      {/* Rendered outside the prose styling so it reads as a primary action. */}
      <div className="my-6 card rim p-6 text-center">
        <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Email</p>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="mt-2 inline-block font-display text-lg sm:text-xl font-bold text-emerald-600 hover:underline break-all"
        >
          {CONTACT_EMAIL}
        </a>
        <p className="mt-3 text-sm text-gray-500">
          Please include the page URL if your message is about a specific figure.
        </p>
      </div>

      <h2>What to get in touch about</h2>
      <div className="grid gap-3 sm:grid-cols-2 my-5">
        {reasons.map((r) => (
          <div key={r.title} className="card p-4">
            <p className="text-sm font-semibold text-gray-900">{r.title}</p>
            <p className="mt-1.5 text-[13px] text-gray-500 leading-relaxed">{r.body}</p>
          </div>
        ))}
      </div>

      <h2>Before you write</h2>
      <p>
        A few things we get asked often, answered elsewhere on the site:
      </p>
      <ul>
        <li>
          <strong>Where do the numbers come from?</strong> See{" "}
          <Link href="/about/">about us</Link> for our sources and method.
        </li>
        <li>
          <strong>Why does this salary look too high or low?</strong> All figures are modelled
          estimates &mdash; our <Link href="/disclaimer/">disclaimer</Link> explains what moves them.
        </li>
        <li>
          <strong>What data do you collect about me?</strong> Very little; our{" "}
          <Link href="/privacy/">privacy policy</Link> has the detail.
        </li>
      </ul>

      <p>
        We cannot provide individual career, financial, tax or immigration advice, and we are not a
        recruiter &mdash; we do not place candidates or forward CVs to employers.
      </p>
    </LegalPage>
  );
}
