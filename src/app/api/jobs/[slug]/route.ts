import { NextResponse } from "next/server";
import countriesData from "@/data/countries.json";
import allJobsData from "@/data/all-jobs.json";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const country = (countriesData as Array<{ code: string; slug: string }>).find(
    (c) => c.slug === slug
  );
  if (!country) {
    return new NextResponse(null, { status: 404 });
  }

  const data = (allJobsData as Record<string, unknown>)[country.code];
  if (!data) {
    return new NextResponse(null, { status: 404 });
  }

  return NextResponse.json(data);
}
