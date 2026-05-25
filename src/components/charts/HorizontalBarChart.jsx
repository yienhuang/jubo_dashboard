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

export default function HorizontalBarChart({ data, color, height = 240 }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart
        layout="vertical"
        data={data}
        margin={{ top: 4, right: 48, bottom: 0, left: 8 }}
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
          width={108}
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
          formatter={(value) => [`${value} 人`, '人數']}
        />
        <Bar dataKey="value" radius={[0, 4, 4, 0]} maxBarSize={20}>
          {data.map((_, index) => (
            <Cell key={index} fill={color ?? COLORS[index % COLORS.length]} />
          ))}
          <LabelList
            dataKey="value"
            position="right"
            style={{ fontSize: 12, fill: 'rgba(0,0,0,0.6)' }}
            formatter={(v) => `${v} 人`}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
