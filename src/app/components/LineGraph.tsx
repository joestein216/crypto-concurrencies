"use client";

import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer 
} from 'recharts';

// Define the shape of your live API data
export interface ChartDataItem {
  time_in_ms: number;
  pair: string;
  observed_price: string;
}

interface LineGraphProps {
  data: ChartDataItem[];
}

const formatXAxis = (tickItem: number): string => {
  // If your timestamp is in seconds, multiply by 1000 for JavaScript Date
  const date = new Date(tickItem);
  return date.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export default function LineGraph({ data }: LineGraphProps) {
  return (
    // Tailwind classes handle the container scaling, background, border, and shadows
    <div className="w-[650px] h-fit p-6 bg-white rounded-2xl border border-slate-100 shadow-sm dark:bg-slate-900 dark:border-slate-800">
      <ResponsiveContainer width={500} height={400}>
        <LineChart
          data={data}
          margin={{ top: 40, right: 10, left: 20, bottom: 80 }}
        >
          <text x={300} y={20} textAnchor="middle" fontWeight="bold" className="text-lg fill-slate-900 dark:fill-slate-100">
            {data[0]?.pair} Price Over Time
          </text>
          {/* Grid lines styled to match Tailwind borders */}
          <CartesianGrid 
            strokeDasharray="3 3" 
            className="stroke-slate-200 dark:stroke-slate-800" 
          />
          
          <XAxis 
            dataKey="time_in_ms" 
            type="number" 
            tickFormatter={formatXAxis}
            domain={['dataMin', 'dataMax']} 
            allowDataOverflow={true} 
            tickLine={false}
            axisLine={false}
            dy={5}
            angle={-45} 
            tick={{ fontSize: 12, textAnchor: 'end' }} 
            height={60}
            className="text-xs font-medium fill-slate-400 dark:fill-slate-500"
          />
          
          <YAxis 
            type="number" 
            domain={['auto', 'auto']} 
            allowDataOverflow={true}
            interval="equidistantPreserveStart"
            tickLine={false}
            axisLine={false}
            width={60}
            dx={2}
            className="text-xs font-medium fill-slate-400 dark:fill-slate-500"
          />
          
          {/* Blue Line (Revenue) */}
          <Line
            type="monotone"
            dataKey="observed_price"
            stroke="#3b82f6" 
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 4, strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
