import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

export default function ClusteredHorizontalBarChart({
  data,
  series,
  height = 360,
  unit = '',
  yAxisWidth = 108,
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart
        layout="vertical"
        data={data}
        margin={{ top: 4, right: 24, bottom: 0, left: 8 }}
        barCategoryGap="20%"
      >
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="rgba(0,0,0,0.08)"
          horizontal={false}
        />
        <XAxis
          type="number"
          tick={{ fontSize: 12, fill: 'rgba(0,0,0,0.6)' }}
          tickLine={false}
          axisLine={{ stroke: 'rgba(0,0,0,0.12)' }}
        />
        <YAxis
          type="category"
          dataKey="name"
          width={yAxisWidth}
          tick={{ fontSize: 12, fill: 'rgba(0,0,0,0.6)' }}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          contentStyle={{
            borderRadius: 8,
            border: '1px solid rgba(0,0,0,0.12)',
            boxShadow: 'none',
            fontSize: 12,
          }}
          itemStyle={{ color: 'rgba(0,0,0,0.87)' }}
          formatter={(value, _key, ctx) => [
            unit ? `${value} ${unit}` : value,
            ctx?.payload?.[ctx.dataKey] != null ? ctx.name : ctx.name,
          ]}
        />
        <Legend
          iconType="circle"
          iconSize={8}
          wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
          formatter={(value) => (
            <span style={{ color: 'rgba(0,0,0,0.6)' }}>{value}</span>
          )}
        />
        {series.map((s) => (
          <Bar
            key={s.dataKey}
            dataKey={s.dataKey}
            name={s.label}
            fill={s.color}
            maxBarSize={14}
            radius={[0, 4, 4, 0]}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  )
}
