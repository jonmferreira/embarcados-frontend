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
import { LoadingSpinner } from '../LoadingSpinner';
import { useSensorStore } from '../../pages/Home/hooks';
import { ProgressSpinner } from 'primereact/progressspinner';

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
  const { loading } = useSensorStore();

  return (
    <div style={{ width: 600, height: 200 }}>
      <h3 style={{ margin: 0, padding: 0 }}>{title}</h3>
      {subtitle && <p style={{ margin: 0, color: '#666' }}>{subtitle}</p>}

      {loading ? (
        <ProgressSpinner
          style={{ width: '50px', height: '50px', background: 'white' }}
          strokeWidth="8"
          fill="white"
          animationDuration=".5s"
        />
      ) : (
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
      )}
    </div>
  );
};
