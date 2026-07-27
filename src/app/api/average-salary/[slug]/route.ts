import { NextResponse } from "next/server";
import { getAverageSalaryData, getAllCountrySlugs } from "@/lib/average-salary-data";

export async function generateStaticParams() {
  return getAllCountrySlugs().map((slug) => ({ slug }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const data = getAverageSalaryData(slug);

  if (!data) {
    return NextResponse.json(
      { error: "Country not found", slug },
      { status: 404 },
    );
  }

  return NextResponse.json(data);
}
