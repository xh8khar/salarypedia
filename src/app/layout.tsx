import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CURRENT_YEAR } from "@/lib/db";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://www.bestpayingjobs.net";

const layoutTitleDefault = `Best Paying Jobs in Every Country ${CURRENT_YEAR} | BestPayingJobs.net`;
const layoutTitleShort = `Best Paying Jobs in Every Country ${CURRENT_YEAR}`;
const layoutDesc = `Discover the highest paying jobs in every country. Compare salaries across 30+ career categories including AI, Finance, IT, Healthcare, Engineering and more. Updated for ${CURRENT_YEAR}.`;
const layoutDescShort = `Discover the highest paying jobs in every country. Compare salaries across 30+ career categories. Updated for ${CURRENT_YEAR}.`;

export const metadata: Metadata = {
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/favicon.svg",
    other: [
      { rel: "apple-touch-icon-precomposed", url: "/favicon.svg" },
    ],
  },
  title: {
    default: layoutTitleDefault,
    template: "%s | BestPayingJobs.net",
  },
  description: layoutDesc,
  keywords: [
    "best paying jobs",
    "highest salary jobs",
    "top paying careers",
    "salary comparison",
    "jobs by country",
    "high salary careers",
    `best paying jobs ${CURRENT_YEAR}`,
    "AI jobs salary",
    "highest paying professions",
    "salary by country",
    "global salary comparison",
    "career salary guide",
    "job salary data",
  ],
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: layoutTitleShort,
    description: layoutDescShort,
    url: siteUrl,
    siteName: "BestPayingJobs.net",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og/default.webp",
        width: 1200,
        height: 750,
        alt: "Best Paying Jobs in Every Country",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: layoutTitleShort,
    description: layoutDescShort,
    images: ["/og/default.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "BestPayingJobs.net",
    url: siteUrl,
    description:
      "Discover the highest paying jobs in every country. Compare salaries across 30+ career categories.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "BestPayingJobs.net",
    url: siteUrl,
    description: "Best Paying Jobs in Every Country",
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(webSiteSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
