import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: process.env.NODE_ENV === "development" ? undefined : "export",
  images: { unoptimized: true },
  trailingSlash: true,
  async redirects() {
    return [
      {
        source: "/best-paying-jobs-in/:slug",
        destination: "/best-paying-jobs-in-:slug",
        permanent: true,
      },
      {
        source: "/salary-in/:slug",
        destination: "/salary-in-:slug",
        permanent: true,
      },
      {
        source: "/part-time-jobs-in/:slug",
        destination: "/part-time-jobs-in-:slug",
        permanent: true,
      },
      {
        source: "/cost-of-living/:slug",
        destination: "/cost-of-living-:slug",
        permanent: true,
      },
      {
        source: "/take-home-pay/:slug",
        destination: "/take-home-pay-:slug",
        permanent: true,
      },
      {
        source: "/average-salary/:slug",
        destination: "/average-salary-:slug",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/best-paying-jobs-in-:slug",
        destination: "/best-paying-jobs-in/:slug",
      },
      {
        source: "/category/:slug",
        destination: "/jobs/:slug",
      },
      {
        source: "/salary-in-:slug",
        destination: "/salary-in/:slug",
      },
      {
        source: "/part-time-jobs-in-:slug",
        destination: "/part-time-jobs-in/:slug",
      },
      {
        source: "/cost-of-living-:slug",
        destination: "/cost-of-living/:slug",
      },
      {
        source: "/take-home-pay-:slug",
        destination: "/take-home-pay/:slug",
      },
      {
        source: "/average-salary-:slug",
        destination: "/average-salary/:slug",
      },
      {
        source: "/api/jobs/:path*",
        destination: "/api/jobs/:path*.json",
      },
      {
        source: "/api/average-salary/:path*",
        destination: "/api/average-salary/:path*.json",
      },
    ];
  },
};

export default nextConfig;
