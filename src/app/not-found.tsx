import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="text-center max-w-md">
          <p className="text-7xl font-bold text-emerald-600 mb-4">404</p>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Page Not Found
          </h1>
          <p className="text-gray-500 mb-8">
            The page you are looking for does not exist or has been moved. Try searching for salary data by country.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors"
            >
              Browse All Countries
            </Link>
            <Link
              href="/global-ranking"
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 hover:border-emerald-300 transition-colors"
            >
              Global Salary Ranking
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
