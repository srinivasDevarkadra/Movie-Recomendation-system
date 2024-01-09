import "./style.scss";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";



export default function LangRev({data}) {
  return (
    <div>
    <BarChart
      width={1000}
      height={500}
      data={data}
      margin={{
        top: 100,
        right: 5,
        left: 200,
        bottom: 5
      }}
      barCategoryGap={20}
      barGap={2}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="language" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="budget" fill="#5ac0c07d" />
      <Bar dataKey="revenue" fill="#82ca9d" />
    </BarChart>
    </div>
  );
}
