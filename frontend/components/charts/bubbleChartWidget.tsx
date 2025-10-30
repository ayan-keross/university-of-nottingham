"use client";
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function BubbleChartWidget({ config, state }) {
const dummyData = [
    { x: 10, y: 20, size: 200 },
    { x: 15, y: 35, size: 300 },
    { x: 40, y: 25, size: 100 },
    { x: 30, y: 45, size: 400 },
  ];
  const data = config || dummyData;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <XAxis
          dataKey="x"
          name="Business Continuity"
          type="number"
        />
        <YAxis
          dataKey="y"
          name="Strategic Importance"
          type="number"
        />
        <ZAxis dataKey="size" range={[50, 400]} name="Impact Scale" />
        <Tooltip
          cursor={{ strokeDasharray: "3 3" }}
          formatter={(val, name) => [`${val}`, name]}
        />
        <Scatter
          data={data}
          shape="circle"
        />
      </ScatterChart>
    </ResponsiveContainer>
  );
}
