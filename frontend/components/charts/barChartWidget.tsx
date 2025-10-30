import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export function BarChartWidget({ api,config, state }) {
    const dummyData = [
    { label: 'Q1', value: 4000 },
    { label: 'Q2', value: 3000 },
    { label: 'Q3', value: 2000 },
    { label: 'Q4', value: 2780 },
  ];
  const data = config || dummyData;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <XAxis dataKey="label" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" />
      </BarChart>
    </ResponsiveContainer>
  );
}
