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

const INFLOW_COLOR = '#0097A7'
const OUTFLOW_COLOR = '#4DB6AC'
const TOTAL_COLOR = '#005F64'
const LEGEND_COLOR = 'rgba(0,0,0,0.6)'

function getSeriesData(series, name) {
  return series.find((s) => s.name === name)?.data ?? []
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null
  const d = payload[0].payload
  return (
    <div
      style={{
        background: '#FFFFFF',
        border: '1px solid rgba(0,0,0,0.12)',
        borderRadius: 8,
        padding: '8px 12px',
        fontSize: 12,
        minWidth: 140,
      }}
    >
      <div style={{ marginBottom: 6, fontWeight: 500, color: 'rgba(0,0,0,0.87)' }}>
        {label}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', color: 'rgba(0,0,0,0.6)' }}>
        <span>月底總數</span>
        <span style={{ color: 'rgba(0,0,0,0.87)', fontWeight: 500 }}>{d.total} 人</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', color: INFLOW_COLOR, marginTop: 2 }}>
        <span>新入住</span>
        <span>+{d.newIn} 人</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', color: OUTFLOW_COLOR }}>
        <span>退住</span>
        <span>-{d.newOut} 人</span>
      </div>
      <div
        style={{
          borderTop: '1px dashed rgba(0,0,0,0.12)',
          margin: '6px 0 4px',
        }}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', color: 'rgba(0,0,0,0.6)' }}>
        <span>住院</span>
        <span>{d.hospitalized} 人</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', color: 'rgba(0,0,0,0.6)' }}>
        <span>請假</span>
        <span>{d.onLeave} 人</span>
      </div>
    </div>
  )
}

export default function MovementWaterfallChart({
  months,
  series,
  baseline,
  height = 260,
}) {
  const inflow = getSeriesData(series, '新入住')
  const outflow = getSeriesData(series, '退住')
  const hospitalized = getSeriesData(series, '住院')
  const onLeave = getSeriesData(series, '請假')

  const data = months.reduce((acc, month, i) => {
    const prevTotal = i === 0 ? baseline : acc[i - 1].total
    const newIn = inflow[i] ?? 0
    const newOut = outflow[i] ?? 0
    const total = prevTotal + newIn - newOut
    acc.push({
      month,
      prevTotal,
      inflowRange: [prevTotal, prevTotal + newIn],
      outflowRange: [prevTotal - newOut, prevTotal],
      total,
      newIn,
      newOut,
      hospitalized: hospitalized[i] ?? 0,
      onLeave: onLeave[i] ?? 0,
    })
    return acc
  }, [])

  return (
    <ResponsiveContainer width="100%" height={height}>
      <ComposedChart data={data} margin={{ top: 16, right: 16, bottom: 0, left: -8 }}>
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
          tickFormatter={(v) => `${v} 人`}
          domain={['dataMin - 2', 'dataMax + 2']}
          allowDecimals={false}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.04)' }} />
        <Legend
          iconType="circle"
          iconSize={8}
          wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
          formatter={(value) => <span style={{ color: LEGEND_COLOR }}>{value}</span>}
        />
        <Bar
          dataKey="inflowRange"
          name="新入住"
          fill={INFLOW_COLOR}
          maxBarSize={12}
          radius={[2, 2, 0, 0]}
          isAnimationActive={false}
        />
        <Bar
          dataKey="outflowRange"
          name="退住"
          fill={OUTFLOW_COLOR}
          maxBarSize={12}
          radius={[0, 0, 2, 2]}
          isAnimationActive={false}
        />
        <Line
          type="linear"
          dataKey="total"
          name="月底總數"
          stroke={TOTAL_COLOR}
          strokeWidth={1.5}
          strokeDasharray="4 3"
          dot={{ r: 2.5, fill: TOTAL_COLOR, strokeWidth: 0 }}
          activeDot={{ r: 4, strokeWidth: 0 }}
          isAnimationActive={false}
        />
      </ComposedChart>
    </ResponsiveContainer>
  )
}
