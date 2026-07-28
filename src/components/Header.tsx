"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

type NavLink = { href: string; label: string; desc: string };

const groups: { label: string; links: NavLink[] }[] = [
  {
    label: "Salaries",
    links: [
      { href: "/jobs", label: "Categories", desc: "31 career fields, ranked by pay" },
      { href: "/global-ranking", label: "Global Ranking", desc: "Every country, highest to lowest" },
      { href: "/average-salary", label: "Average Salary", desc: "National averages and trends" },
      { href: "/cost-of-living", label: "Cost of Living", desc: "What your pay is really worth" },
    ],
  },
  {
    label: "Tools",
    links: [
      { href: "/calculator", label: "Calculators", desc: "20 salary and money calculators" },
      { href: "/take-home-pay", label: "Take-Home Pay", desc: "Salary after tax by country" },
      { href: "/salary-increase-letter", label: "Raise Letters", desc: "Templates that get answered" },
    ],
  },
  {
    label: "Earn More",
    links: [
      { href: "/part-time-jobs", label: "Part-Time Jobs", desc: "Flexible roles worth your time" },
      { href: "/earn-money-online", label: "Earn Online", desc: "Remote and freelance income" },
    ],
  },
];

const flatLinks = groups.flatMap((g) => g.links);

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // A drawer that stays open while the page scrolls behind it feels broken.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 glass transition-shadow duration-300 ${
        scrolled ? "border-b border-gray-200 shadow-sm shadow-gray-900/5" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between gap-4">
          <Logo />

          <nav className="hidden lg:flex items-center gap-1">
            {groups.map((group) => (
              <div key={group.label} className="relative group">
                <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100/70 transition-colors">
                  {group.label}
                  <svg className="w-3.5 h-3.5 text-gray-400 group-hover:rotate-180 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.4}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <div className="absolute left-0 top-full pt-2 w-[19rem] invisible opacity-0 translate-y-1 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 focus-within:visible focus-within:opacity-100 focus-within:translate-y-0 transition-all duration-200">
                  <div className="card rounded-2xl p-2 shadow-xl shadow-gray-900/10">
                    {group.links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block px-3 py-2.5 rounded-xl hover:bg-emerald-50 transition-colors"
                      >
                        <span className="block text-sm font-semibold text-gray-900">{link.label}</span>
                        <span className="block text-xs text-gray-500 mt-0.5 leading-snug">{link.desc}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            <Link href="/blog" className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100/70 transition-colors">
              Blog
            </Link>
          </nav>

          <div className="flex items-center gap-1.5">
            <ThemeToggle />
            <Link
              href="/#countries"
              className="hidden sm:inline-flex items-center gap-1.5 h-9 px-4 rounded-lg bg-gray-900 text-white text-sm font-semibold hover:bg-emerald-600 transition-colors"
            >
              Find your salary
            </Link>

            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden w-9 h-9 grid place-items-center rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                {open ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="lg:hidden fixed inset-x-0 top-16 bottom-0 bg-white border-t border-gray-200 overflow-y-auto overscroll-contain">
          <nav className="px-4 py-5 space-y-6">
            {groups.map((group) => (
              <div key={group.label}>
                <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                  {group.label}
                </p>
                {group.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between px-3 py-2.5 rounded-xl text-[15px] font-medium text-gray-800 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                  >
                    {link.label}
                    <svg className="w-4 h-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                ))}
              </div>
            ))}

            <div>
              <Link
                href="/blog"
                onClick={() => setOpen(false)}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-[15px] font-medium text-gray-800 hover:bg-emerald-50 transition-colors"
              >
                Blog
                <svg className="w-4 h-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <Link
              href="/#countries"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 h-12 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors"
            >
              Find your salary
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

export { flatLinks };
