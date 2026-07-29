import RankedBarChart from "./RankedBarChart";

interface JobData {
  rank: number;
  title: string;
  salaryMin: number;
  salaryMax: number;
}

const group = (n: number) => new Intl.NumberFormat("en-US").format(Math.round(n));

export default function CountrySalaryChart({
  jobs,
  currency,
}: {
  jobs: JobData[];
  currency: string;
}) {
  const data = jobs
    .map((j) => ({
      title: j.title,
      min: j.salaryMin,
      max: j.salaryMax,
      avg: Math.round((j.salaryMin + j.salaryMax) / 2),
    }))
    .sort((a, b) => b.avg - a.avg);

  return (
    <RankedBarChart
      caption={`Average monthly salary in ${currency} for the ten highest paying jobs, highest first.`}
      items={data.map((d) => ({
        label: d.title,
        value: d.avg,
        valueLabel: `${group(d.avg)} ${currency}`,
        // The min–max range used to be reachable only through a hover tooltip,
        // which is no use on a touchscreen. It is printed on every row now.
        meta: `${group(d.min)} – ${group(d.max)}`,
      }))}
    />
  );
}
