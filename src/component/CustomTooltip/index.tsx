import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

interface ISingleAreaChartProps {
  title: string;
  subtitle?: string;
  data: any[];
  xKey: string;
  yKey: string;
  color: string;
  tooltipTitle?: string;
}

export const CustomTooltip = ({
  active,
  payload,
  label,
  tooltipTitle,
}: {
  active?: boolean;
  payload?: any[];
  label?: string;
  tooltipTitle?: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{ backgroundColor: '#fff', border: '1px solid #ccc', padding: 10, color: '#000' }}
      >
        <p style={{ margin: 0 }}>{label}</p>
        <p style={{ margin: 0 }}>
          {tooltipTitle ?? 'Valor'}: {payload[0].value}
        </p>
      </div>
    );
  }

  return null;
};
