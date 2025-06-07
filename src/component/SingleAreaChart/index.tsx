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
import { CustomTooltip } from '../CustomTooltip';

interface ISingleAreaChartProps {
  title: string;
  subtitle?: string;
  data: any[]; // genérico para aceitar qualquer estrutura
  xKey: string; // nome do campo usado no eixo X
  yKey: string; // nome do campo com valor numérico
  color: string;
  tooltipTitle?: string;
}

export const SingleAreaChart: React.FC<ISingleAreaChartProps> = ({
  title,
  subtitle,
  data,
  xKey,
  yKey,
  color,
  tooltipTitle,
}) => {
  return (
    <div style={{ width: 600, height: 200 }}>
      <h2 style={{ margin: 0, padding: 0 }}>{title}</h2>
      {subtitle && <p style={{ marginTop: 0, color: '#666' }}>{subtitle}</p>}
      <ResponsiveContainer width="100%" height="80%">
        <AreaChart
          width={600}
          height={400}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xKey} />
          <YAxis domain={[0, 100]} />
          <Tooltip content={<CustomTooltip tooltipTitle={tooltipTitle} />} />
          <Area type="monotone" dataKey={yKey} stroke={color} fill={color} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
