import RankedBarChart from "./RankedBarChart";

interface ChartData {
  country: string;
  salary: number;
  flag: string;
}

export default function CategorySalaryChart({ data }: { data: ChartData[] }) {
  return (
    <RankedBarChart
      dense
      caption="Average annual salary by country, highest first."
      items={data.map((d) => ({
        label: d.country,
        glyph: d.flag,
        value: d.salary,
        valueLabel: `$${Math.round(d.salary / 1000)}k`,
      }))}
    />
  );
}
