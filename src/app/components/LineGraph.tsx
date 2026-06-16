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
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  });
};

export default function LineGraph({ data }: LineGraphProps) {
  return (
    // Tailwind classes handle the container scaling, background, border, and shadows
    <div className="w-full h-96 p-6 bg-white rounded-2xl border border-slate-100 shadow-sm dark:bg-slate-900 dark:border-slate-800">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
        >
          {/* Grid lines styled to match Tailwind borders */}
          <CartesianGrid 
            strokeDasharray="3 3" 
            className="stroke-slate-200 dark:stroke-slate-800" 
          />
          
          <XAxis 
            dataKey="time_in_ms" 
            type="number" 
            tickFormatter={formatXAxis}
            domain={[1781634870000, 'auto']} 
            allowDataOverflow={true} 
            tickLine={false}
            axisLine={false}
            dy={10}
            className="text-xs font-medium fill-slate-400 dark:fill-slate-500"
          />
          
          <YAxis 
            tickLine={false}
            axisLine={false}
            dx={-10}
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
