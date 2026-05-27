import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const COLORS = [
  '#0097A7',
  '#00838F',
  '#00796B',
  '#26A69A',
  '#4DB6AC',
  '#80CBC4',
  '#B2DFDB',
]

export default function HorizontalBarChart({ data, color, height = 240, unit = '人', yAxisWidth = 108 }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart
        layout="vertical"
        data={data}
        margin={{ top: 4, right: 40, bottom: 0, left: 0 }}
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
          formatter={(value) => [`${value} ${unit}`, '數量']}
        />
        <Bar dataKey="value" radius={[0, 4, 4, 0]} maxBarSize={20}>
          {data.map((_, index) => (
            <Cell key={index} fill={color ?? COLORS[index % COLORS.length]} />
          ))}
          <LabelList
            dataKey="value"
            position="right"
            style={{ fontSize: 12, fill: 'rgba(0,0,0,0.6)' }}
            formatter={(v) => `${v} ${unit}`}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
