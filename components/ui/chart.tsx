"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { name: "Line A", hours: 40 },
  { name: "Line B", hours: 30 },
  { name: "Line C", hours: 50 },
  { name: "Line D", hours: 25 },
  { name: "Line A", hours: 40 },
  { name: "Line B", hours: 30 },
  { name: "Line C", hours: 50 },
  { name: "Line D", hours: 25 },
];

const HoursChart = () => {
  return (
    <div className="bg-gray-800 rounded-xl shadow-md p-6 w-[520px] h-[330px]">
      <h2 className="text-white text-xl font-bold mb-4">
        Working Hours per Line
      </h2>

      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={data}>
          {/* <CartesianGrid strokeDasharray="3 3" stroke="#374151" /> */}

          <XAxis
            dataKey="name"
            stroke="#ffffff" // linia axei
            tick={{ fill: "#d1d5db" }} //textul axei
          />

          <YAxis
            stroke="#ffffff"
            tick={{ fill: "#d1d5db" }}
          />

          {/* hover */}
          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937",
              border: "1px solid #374151",
              borderRadius: "10px",
              color: "#ffffff",
            }}
            labelStyle={{ color: "#ffffff" }}
          /> 

          <Bar
            dataKey="hours"
            fill="#B2D6FC"
            // fill="#97D3CD"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HoursChart;