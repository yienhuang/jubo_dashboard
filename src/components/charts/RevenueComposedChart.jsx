import { useMediaQuery, useTheme } from '@mui/material'
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const YOY_COLOR = '#CDDC39'
const LEGEND_COLOR = 'rgba(0,0,0,0.6)'

export default function RevenueComposedChart({ months, series, yoy, height = 240 }) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const data = months.map((month, i) => ({
    month,
    ...series.reduce((acc, s) => ({ ...acc, [s.name]: s.data[i] }), {}),
    YoY: yoy[i],
  }))

  const tickFontSize = isMobile ? 11 : 12

  return (
    <ResponsiveContainer width="100%" height={height}>
      <ComposedChart
        data={data}
        margin={{ top: 4, right: isMobile ? 0 : 8, bottom: isMobile ? 16 : 0, left: -8 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.08)" vertical={false} />
        <XAxis
          dataKey="month"
          tick={
            isMobile
              ? { fontSize: tickFontSize, fill: 'rgba(0,0,0,0.6)', angle: -45, textAnchor: 'end' }
              : { fontSize: tickFontSize, fill: 'rgba(0,0,0,0.6)' }
          }
          tickLine={false}
          axisLine={{ stroke: 'rgba(0,0,0,0.12)' }}
          height={isMobile ? 44 : 30}
        />
        <YAxis
          yAxisId="left"
          tick={{ fontSize: tickFontSize, fill: 'rgba(0,0,0,0.6)' }}
          tickLine={false}
          axisLine={false}
          tickFormatter={(v) => `${v}萬`}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          hide={isMobile}
          width={44}
          tick={{ fontSize: tickFontSize, fill: 'rgba(0,0,0,0.6)' }}
          tickLine={false}
          axisLine={false}
          tickFormatter={(v) => `${v}%`}
          domain={[0, 'dataMax + 4']}
        />
        <Tooltip
          contentStyle={{
            borderRadius: 8,
            border: '1px solid rgba(0,0,0,0.12)',
            boxShadow: 'none',
            fontSize: 12,
          }}
          itemStyle={{ color: 'rgba(0,0,0,0.87)' }}
          formatter={(value, name) => {
            if (value == null) return ['—', name]
            return name === 'YoY' ? [`${value}%`, name] : [`${value} 萬`, name]
          }}
        />
        <Legend
          iconType="circle"
          iconSize={8}
          wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
          formatter={(value) => <span style={{ color: LEGEND_COLOR }}>{value}</span>}
        />
        {series.map((s) => (
          <Bar
            key={s.name}
            yAxisId="left"
            dataKey={s.name}
            stackId="a"
            fill={s.color}
            maxBarSize={26}
          />
        ))}
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="YoY"
          stroke={YOY_COLOR}
          strokeWidth={2}
          dot={{ r: 3, fill: YOY_COLOR }}
          activeDot={{ r: 5 }}
          connectNulls
        />
      </ComposedChart>
    </ResponsiveContainer>
  )
}
