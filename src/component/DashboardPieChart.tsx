import React, { FC } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, SectorProps, Legend } from 'recharts';

interface DataItem {
  name: string;
  value: number;
}

interface DashboardPieChartProps {
  data: DataItem[];
  colors: string[];
  title: string;
}

interface RenderActiveShapeProps extends SectorProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  startAngle: number;
  endAngle: number;
  fill: string;
  payload: DataItem;
  percent: number;
  value: number;
  name: string;
}

const renderActiveShape = (props: RenderActiveShapeProps) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#999">{`${(
        percent * 100
      ).toFixed(2)}%`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`QTD: ${value}`}
      </text>
    </g>
  );
};

export const DashboardPieChart: FC<DashboardPieChartProps> = ({ data, colors, title }) => {
  const [activeIndex, setActiveIndex] = React.useState<number>(0);

  const onPieEnter = (_: DataItem, index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="w-full text-center">
      <h2 className="p-0 m-0">{title}</h2> {/* Título do gráfico */}
      <ResponsiveContainer width="100%" height={350}>
        <PieChart width={200} height={200}>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape as (props: any) => JSX.Element}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={100}
            dataKey="value"
            onMouseEnter={onPieEnter}
          >
            {data?.map((_, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
