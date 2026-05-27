import { useState } from 'react'
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

export default function TrendLineChart({
  months,
  series,
  yAxisSuffix = '',
  height = 200,
  yDomain,
}) {
  const [activeSeries, setActiveSeries] = useState(null)

  const data = months.map((month, i) => ({
    month,
    ...series.reduce((acc, s) => ({ ...acc, [s.name]: s.data[i] }), {}),
  }))

  function handleLegendClick(payload, _index, event) {
    event.stopPropagation()
    setActiveSeries((prev) => (prev === payload.value ? null : payload.value))
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart
        data={data}
        margin={{ top: 4, right: 16, bottom: 0, left: -8 }}
        onClick={() => setActiveSeries(null)}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.08)" vertical={false} />
        <XAxis
          dataKey="month"
          tick={{ fontSize: 12, fill: 'rgba(0,0,0,0.6)' }}
          tickLine={false}
          axisLine={{ stroke: 'rgba(0,0,0,0.12)' }}
        />
        <YAxis
          tick={{ fontSize: 12, fill: 'rgba(0,0,0,0.6)' }}
          tickLine={false}
          axisLine={false}
          tickFormatter={(v) => `${v}${yAxisSuffix}`}
          domain={yDomain}
        />
        <Tooltip
          contentStyle={{
            borderRadius: 8,
            border: '1px solid rgba(0,0,0,0.12)',
            boxShadow: 'none',
            fontSize: 12,
          }}
          itemStyle={{ color: 'rgba(0,0,0,0.87)' }}
          formatter={(value, name) => [`${value}${yAxisSuffix}`, name]}
        />
        <Legend
          iconType="circle"
          iconSize={8}
          wrapperStyle={{ fontSize: 12, paddingTop: 8, cursor: 'pointer' }}
          onClick={handleLegendClick}
          formatter={(value) => {
            const isDimmed = activeSeries !== null && activeSeries !== value
            return (
              <span
                style={{
                  color: isDimmed ? 'rgba(0,0,0,0.25)' : 'rgba(0,0,0,0.6)',
                  transition: 'color 0.2s',
                }}
              >
                {value}
              </span>
            )
          }}
        />
        {series.map((s) => {
          const isDimmed = activeSeries !== null && activeSeries !== s.name
          return (
            <Line
              key={s.name}
              type="monotone"
              dataKey={s.name}
              stroke={s.color}
              strokeWidth={s.dashed ? 1.5 : 2}
              strokeDasharray={s.dashed ? '4 4' : undefined}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 0 }}
              strokeOpacity={isDimmed ? 0.15 : 1}
            />
          )
        })}
      </LineChart>
    </ResponsiveContainer>
  )
}
