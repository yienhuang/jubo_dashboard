import { useMediaQuery, useTheme } from '@mui/material'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

export default function AreaLineChart({
  months,
  data,
  color = '#0097A7',
  yAxisSuffix = '',
  height = 240,
}) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const chartData = months.map((month, i) => ({ month, value: data[i] }))

  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart
        data={chartData}
        margin={{ top: 4, right: 16, bottom: isMobile ? 16 : 0, left: -8 }}
      >
        <defs>
          <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.15} />
            <stop offset="95%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.08)" vertical={false} />
        <XAxis
          dataKey="month"
          tick={
            isMobile
              ? { fontSize: 11, fill: 'rgba(0,0,0,0.6)', angle: -45, textAnchor: 'end' }
              : { fontSize: 12, fill: 'rgba(0,0,0,0.6)' }
          }
          tickLine={false}
          axisLine={{ stroke: 'rgba(0,0,0,0.12)' }}
          height={isMobile ? 44 : 30}
        />
        <YAxis
          tick={{ fontSize: isMobile ? 11 : 12, fill: 'rgba(0,0,0,0.6)' }}
          tickLine={false}
          axisLine={false}
          tickFormatter={(v) => `${v}${yAxisSuffix}`}
          domain={['auto', 'auto']}
        />
        <Tooltip
          contentStyle={{
            borderRadius: 8,
            border: '1px solid rgba(0,0,0,0.12)',
            boxShadow: 'none',
            fontSize: 12,
          }}
          itemStyle={{ color: 'rgba(0,0,0,0.87)' }}
          formatter={(value) => [`${value}${yAxisSuffix}`, '營收']}
        />
        <Area
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={2}
          fill="url(#areaGradient)"
          dot={false}
          activeDot={{ r: 4, strokeWidth: 0 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
